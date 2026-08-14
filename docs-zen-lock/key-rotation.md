---
sidebar_label: Key Rotation
---

# Key Rotation

How to rotate the age master key with zero pod downtime, using zen-lock's dual-key grace window.

## The Dual-Key Model

Rotation can't be instantaneous: ZenLock resources in Git and in the cluster are encrypted with the **old** public key, and they must all be re-encrypted with the **new** one before the old key can be destroyed. zen-lock handles this with a two-key decrypt state machine:

- **Active key** — the new key; all new encryption uses it
- **Previous key** — the old key, kept only for decrypting not-yet-re-encrypted ZenLocks

While both are configured, the webhook tries the active key first and falls back to the previous one (a "grace hit"). A leader-elected controller re-encrypts every ZenLock with the active key in the background. When no grace hits remain, the previous key is safe to remove.

Rotation phases: `idle` → `rotating` → `idle` (with a `deprecated` marker when the previous key is removed).

## Step by Step

### 1. Generate the new keypair

```bash
zen-lock rotate --previous-key /path/to/current.key --output /tmp/rotation/
# writes:
#   /tmp/rotation/age-identity   (new active private key)
#   /tmp/rotation/age-previous   (old private key)
#   /tmp/rotation/rotation.yaml  (timestamp + both public keys — commit this)
```

### 2. Load both keys into the cluster

```bash
kubectl create secret generic zen-lock-master-key \
  --namespace zen-lock-system \
  --from-file=key.txt=/tmp/rotation/age-identity \
  --from-file=age-previous=/tmp/rotation/age-previous \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl rollout restart deployment/zen-lock-webhook -n zen-lock-system
```

Both webhook and controller now run in dual-key mode (`ROTATION: rotating` in `kubectl get zenlock -o wide`).

### 3. Wait for re-encryption

The rotation controller (leader replica only) re-encrypts every ZenLock with the active key:

```bash
kubectl get zenlocks -o wide
# NAME             PHASE   ROTATION   GRACEHITS   ...
# db-credentials   Ready   rotating   2
```

Monitor progress with metrics (see [Operations](./operations)) — the signal to watch is:

```
zenlock_rotation_safe_to_deprecate == 1
```

meaning zero grace hits across the fleet and re-encryption complete.

:::tip Update Git too
Re-encryption changes ciphertext in the cluster's ZenLocks. If you manage ZenLocks in Git, re-encrypt and commit the updated manifests during this window (encrypt with the new public key), so your repo doesn't resurrect old-key ciphertext on the next sync.
:::

### 4. Deprecate the previous key

```bash
zen-lock deprecate --namespace zen-lock-system
```

The command verifies the active key is the one you expect and prints the exact `kubectl` commands to drop `age-previous` from the Secret. After removing it and restarting the webhook, `ROTATION` returns to `idle`.

### 5. Rollback (if something goes wrong mid-rotation)

If re-encryption hasn't completed and you need the old key as primary again:

1. Restore the old key as `key.txt` and the new key as `age-previous` (swap active/previous) — this keeps dual-key decrypt working in both directions
2. If rotation **had** completed, simply restore the old key alone as `key.txt`; every ZenLock was already re-encrypted with the new key though, so prefer completing forward over rolling back

## What Rotates and What Doesn't

| Rotated by this procedure | Not rotated |
|---------------------------|-------------|
| The age master key (and thus all ZenLock ciphertext) | Individual secret *values* — rotating a credential means encrypting a new value into the ZenLock |
| CSI provider key (same Secret) | The [custody key](./high-availability#key-custody) used by the retrieval server — separate key, rotated independently |

## Suggested Alerts

- `ZenLockRotationStalled` — in `rotating` phase but no re-encryptions succeeding
- `ZenLockRotationTooLong` — more than 72 hours in `rotating`

Both rules ship in `deploy/prometheus/prometheus-rules.yaml` in the zen-lock repository.

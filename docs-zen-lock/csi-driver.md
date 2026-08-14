---
sidebar_label: CSI Driver
---

# CSI Driver

zen-lock can deliver secrets as **files mounted directly into pods** through the [Secrets Store CSI driver](https://secrets-store-csi-driver.sigs.k8s.io/) — with **no Kubernetes Secret object ever created**.

:::note Deployment status
The CSI provider is implemented and hardened (identity verification via TokenReview, fail-closed authorization, atomic mounts), and passes the Kind mount-conformance suite in CI. It is cleared for **restricted, trusted-node canary** deployments. It is not yet cleared for broad node deployment — see [Security trade-offs](#security-trade-offs).
:::

## How It Differs From Webhook Injection

| | Webhook injection | CSI driver |
|---|---|---|
| Delivery | Ephemeral Secret mounted as a volume | Files on a read-only tmpfs mount (mode `0400`) |
| Secret object in the cluster | Yes, for the pod's lifetime | **Never** |
| Readable by Secret RBAC holders | Yes | No |
| Authorization | Pod ServiceAccount at admission | Projected token + TokenReview + `allowedSubjects` per mount |
| Where the provider runs | zen-lock-system only | DaemonSet on each **trusted node** |
| Pod scheduling constraint | None | Workload must land on a trusted node |

## Prerequisites

1. zen-lock controller/webhook installed (see [Installation](./installation)) — CRDs and the `zen-lock-master-key` Secret are shared by both modes.
2. Secrets Store CSI driver **v1.4+**, installed with a `zen-lock` token request so the driver can mint audience-scoped service-account tokens for mounting pods:

```bash
helm upgrade --install csi-secrets-store \
  secrets-store-csi-driver/secrets-store-csi-driver \
  --set tokenRequests[0].audience=zen-lock \
  --set tokenRequests[0].expirationSeconds=3600 \
  --set syncSecret.enabled=false \
  --set enableSecretRotation=true \
  --set secretRotationInterval=30s
```

:::warning The token request is mandatory
Without the `zen-lock` audience tokenRequest, the driver never mints the projected token the provider requires, and **every mount fails closed** with `FailedPrecondition`. This is configured at the upstream driver's Helm boundary, not by patching the CSIDriver object afterward.
:::

## Install the Provider

The provider is a DaemonSet that only schedules onto nodes you have explicitly trusted:

```bash
# 1. Label the nodes allowed to decrypt secrets
kubectl label nodes --all \
  zen-lock.security.zen-mesh.io/csi-trusted=true --overwrite
# (in practice, label only the node pool that needs CSI delivery)

# 2. Install the provider (manifests and chart are part of the distribution
#    package — see Installation)
kubectl apply -f config/csi-provider/
# or, with the provided chart:
helm install zen-lock-csi-provider zen-lock-csi-provider \
  --namespace zen-lock-system --create-namespace
```

Key Helm values (`zen-lock-csi-provider` chart):

| Value | Default | Purpose |
|-------|---------|---------|
| `ageIdentity.secretName` | `zen-lock-master-key` | Secret holding the age private key |
| `ageIdentity.activeKey` | `key.txt` | Key within that Secret |
| `trustedNodeLabel.key` / `.value` | `zen-lock.security.zen-mesh.io/csi-trusted` / `true` | Node selector for the DaemonSet |
| `provider.audience` | `zen-lock` | Token audience verified on every mount |
| `scheduleOnControlPlane` | `false` | Whether provider pods run on control-plane nodes |
| `networkPolicy.enabled` | `false` | Egress lockdown (requires explicit `apiServerCIDRs`) |

There is **no catch-all toleration**: nodes must be labeled explicitly, and the provider reads the private key only from a **projected file** (`ZEN_LOCK_PRIVATE_KEY_FILE`, mode `0400`) — the inline env-var form is rejected for the provider.

## Consume a ZenLock via CSI

A `SecretProviderClass` names the ZenLock and optional key allowlist:

```yaml title="secretproviderclass.yaml"
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: app-config
  namespace: default
spec:
  provider: zen-lock
  parameters:
    zenlockName: app-secret        # ZenLock to project (required)
    keys: "API_KEY"                # optional comma-separated allowlist
```

The pod references it through a CSI volume and must satisfy three conditions: its ServiceAccount is in the ZenLock's `allowedSubjects`, and it schedules onto a trusted node:

```yaml title="pod.yaml (excerpt)"
spec:
  serviceAccountName: app-sa                 # must be in allowedSubjects
  nodeSelector:
    zen-lock.security.zen-mesh.io/csi-trusted: "true"
  containers:
    - name: app
      image: my-app:1.4.2
      volumeMounts:
        - name: secrets
          mountPath: /mnt/secrets
          readOnly: true
  volumes:
    - name: secrets
      csi:
        driver: secrets-store.csi.k8s.io
        readOnly: true
        volumeAttributes:
          secretProviderClass: app-config
```

Omit `parameters.keys` to project every key; if a listed key is absent from the ZenLock, the mount **fails atomically** — nothing is partially projected.

## Authorization Per Mount

Every mount goes through three fail-closed checks:

1. **Identity**: the provider reads the pod's exact `zen-lock`-audience projected token and submits a `TokenReview`. The token must authenticate as the ServiceAccount the CSI pod-info reports, with matching pod name and UID.
2. **Authorization**: that ServiceAccount must be in the ZenLock's `allowedSubjects`. Empty or absent `allowedSubjects` denies every pod — there is no bypass.
3. **Decryption**: only then is the ZenLock fetched and decrypted.

Error semantics:

| gRPC error | Meaning |
|------------|---------|
| `PermissionDenied` | ServiceAccount not in `allowedSubjects`, forged/mismatched token |
| `FailedPrecondition` | No projected token, TokenReview unavailable, provider missing its private key |
| `NotFound` | ZenLock doesn't exist in the namespace |
| `InvalidArgument` | Corrupt ciphertext, missing key, unsafe key name — mount fails atomically |

## Security Trade-offs

CSI mode removes the plaintext Secret object, but it changes the trust boundary in the other direction:

- **Node compromise is out of scope.** The provider runs on the node and holds (in memory) the cluster age identity; a compromised trusted node or provider can decrypt **every ZenLock**, not just the ones mounted there. This is a strictly wider blast radius than webhook mode for a node-level attacker. That is why the provider only runs on explicitly labeled nodes and why broad deployment is gated on KMS-backed key custody.
- **Plaintext still exists** in provider memory and on the mounted tmpfs during the pod's lifetime — CSI mode changes *where* plaintext lives, not whether it exists.
- Trusted node pools should be correspondingly hardened: restricted egress, minimal host access, controlled node-label RBAC (`zen-lock.security.zen-mesh.io/csi-trusted` on a node is decrypt-everything capability).

## Coexistence and Migration

Webhook and CSI modes run side by side indefinitely — delivery is chosen per workload:

- Webhook workloads keep the `zen-lock/inject` annotation.
- CSI workloads switch to a `SecretProviderClass` and the trusted-node selector.

Because both modes decrypt the same ZenLock resources with the same master key, migrating a workload is a manifest change only — no re-encryption, no downtime for other pods.

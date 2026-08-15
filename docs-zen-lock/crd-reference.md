---
sidebar_label: CRD Reference
slug: zen-lock/crd-reference
---

# CRD Reference

Complete reference for all Custom Resource Definitions (CRDs) managed by zen-lock.

## Overview

zen-lock manages three CRDs:

| CRD | Kind | Purpose |
|-----|------|---------|
| `zenlocks.security.zen-mesh.io` | `ZenLock` | Encrypted secret storage |
| `zenlockcustodies.security.zen-mesh.io` | `ZenLockCustody` | Signing key custody (Zen Trust) |
| `noncebuckets.security.zen-mesh.io` | `NonceBucket` | Replay attack prevention |

**API Version:** `security.zen-mesh.io/v1beta1`

**Short names:** `zenlock`, `zl`

---

## ZenLock

The primary CRD for storing encrypted secrets. Contains only ciphertext — the API server and etcd never see plaintext.

### Schema

```yaml
apiVersion: security.zen-mesh.io/v1beta1
kind: ZenLock
metadata:
  name: <string>          # Required; unique in namespace
  namespace: <string>      # Required
  labels: <map>
  annotations: <map>
spec:
  algorithm: age          # Required; currently only "age" supported
  encryptedData:          # Required; map of key -> base64 ciphertext
    <key>: <value>
  allowedSubjects:        # Optional; ServiceAccounts allowed to receive this secret
    - kind: ServiceAccount  # Required; only ServiceAccount in v1beta1
      name: <string>        # Required
      namespace: <string>   # Optional; defaults to ZenLock namespace
status:
  phase: Ready|Error     # Current state
  lastRotation: <time>   # Last key rotation timestamp
  conditions:            # Detailed conditions
    - type: <string>
      status: True|False|Unknown
      reason: <string>
      message: <string>
      lastTransitionTime: <time>
  rotation:               # Key rotation state
    phase: idle|rotating|deprecated
    activeKeyId: <string>
    previousKeyId: <string>
    rotatedAt: <time>
    deprecatedAt: <time>
    graceHits: <integer>
    reencrypted: <integer>
    pending: <integer>
    safeToDeprecate: <boolean>
```

### Fields Reference

#### spec

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `spec.algorithm` | string | Yes | Encryption algorithm. Currently only `age` is supported. |
| `spec.encryptedData` | map[string]string | Yes | Map of secret keys to base64-encoded age ciphertext. |
| `spec.allowedSubjects` | []SubjectReference | No | List of ServiceAccounts authorized to receive this secret. Empty = deny all. |

#### spec.allowedSubjects[]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `kind` | string | Yes | Must be `ServiceAccount`. |
| `name` | string | Yes | Name of the ServiceAccount. |
| `namespace` | string | No | Namespace of the ServiceAccount. Defaults to the ZenLock's namespace. |

#### status

| Field | Type | Description |
|-------|------|-------------|
| `status.phase` | string | `Ready` or `Error`. |
| `status.lastRotation` | time | Last key rotation timestamp. |
| `status.conditions[]` | []ZenLockCondition | Detailed state conditions. |
| `status.rotation` | RotationStatus | Current rotation state (see Key Rotation). |

### Example

```yaml
apiVersion: security.zen-mesh.io/v1beta1
kind: ZenLock
metadata:
  name: db-credentials
  namespace: production
spec:
  algorithm: age
  encryptedData:
    username: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM=
    password: cGFzc3dvcmQxMjM0NTY3ODkwYWJjZGVmZ2g=
  allowedSubjects:
    - kind: ServiceAccount
      name: my-app
      namespace: production
status:
  phase: Ready
```

### Short Names

```bash
kubectl get zenlock <name>
kubectl get zl <name>
```

---

## ZenLockCustody

Holds AGE-encrypted signing keys for Zen Trust. Each object stores exactly one custody key entry — ciphertext only, so the API server never sees plaintext key material.

:::note Internal use
ZenLockCustody is primarily used by Zen Mesh internally for Zen Trust signing key custody. It's listed here for completeness.
:::

### Schema

```yaml
apiVersion: security.zen-mesh.io/v1beta1
kind: ZenLockCustody
metadata:
  name: <string>          # Derived: {tenant}-{keyRef}-v{version}
  namespace: <string>
spec:
  tenantId: <string>      # Required; tenant identifier
  keyReference: <string>  # Required; key identifier within tenant
  version: <integer>      # Required; monotonic version number
  algorithm: <string>    # Required; e.g., "ES256"
  usage: <string>         # Required; e.g., "ZCC_SIGNING"
  encryptedPrivateKey: <string>  # AGE-encrypted, base64-encoded PEM key
  activationTime: <time>  # Required; when key becomes usable
  expiryTime: <time>      # Optional; zero = never expires
  status: active|revoked|retired|expired|pending  # Required
  provenance: <string>    # Optional; audit metadata
status:
  phase: <string>        # Controller's observation
```

### Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `spec.tenantId` | string | Yes | Tenant identifier (1-253 chars). |
| `spec.keyReference` | string | Yes | Key identifier within tenant (1-253 chars). |
| `spec.version` | integer | Yes | Monotonic version number per tenant+reference. |
| `spec.algorithm` | string | Yes | Signing algorithm (e.g., "ES256"). |
| `spec.usage` | string | Yes | Key usage (e.g., "ZCC_SIGNING"). |
| `spec.encryptedPrivateKey` | string | Yes | AGE-encrypted, base64-encoded PEM private key (1-32KB). |
| `spec.activationTime` | time | Yes | When the key becomes usable. |
| `spec.expiryTime` | time | No | When the key expires. Zero means no expiry. |
| `spec.status` | string | Yes | Lifecycle state: `active`, `revoked`, `retired`, `expired`, or `pending`. |
| `spec.provenance` | string | No | Audit metadata (origin information). |

### Object Naming

ZenLockCustody objects are named deterministically:

```
<tenant-id>-<key-ref>-v<version>
```

Example: `acme-corp-signing-key-v1`

---

## NonceBucket

Stores accepted replay-attack prevention nonces. Buckets are sharded by minute to keep objects small and enable efficient cleanup.

### Schema

```yaml
apiVersion: security.zen-mesh.io/v1beta1
kind: NonceBucket
metadata:
  name: nonce-<bucket-start-utc>  # e.g., nonce-2026-08-15t14-30-00z
  namespace: <string>
spec:
  bucketStart: <string>    # RFC3339 UTC start of bucket window
  expiresAt: <time>        # When bucket can be pruned
  nonces:                  # Optional; map of nonce digests
    <hex-digest>:
      acceptedAt: <time>
      peerDigest: <string>  # Short digest of authenticated peer
```

### Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `spec.bucketStart` | string | Yes | RFC3339 UTC timestamp marking the start of the bucket's time window. |
| `spec.expiresAt` | time | Yes | When the entire bucket can be pruned. |
| `spec.nonces` | map[string]NonceRecord | No | Map of accepted nonce hex digests to their acceptance metadata. |

### Object Naming

```
nonce-<bucket-start-utc>
```

Example: `nonce-2026-08-15t14-30-00z`

### Design Notes

- Buckets are sharded by minute to limit object size
- Nonces are SHA-256 digests — no raw identity material stored
- Expired buckets are pruned automatically
- Write-once per nonce; updates use JSON Patch

---

## Short Names

```bash
# Get all ZenLocks
kubectl get zenlocks
kubectl get zl

# Get all ZenLockCustodies
kubectl get zenlockcustodies

# Get all NonceBuckets
kubectl get noncebuckets
```

## API Discovery

```bash
# List all zen-lock CRDs
kubectl get crd | grep security.zen-mesh.io

# Describe a CRD
kubectl describe crd zenlocks.security.zen-mesh.io
```

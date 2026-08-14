---
sidebar_label: zen-lock
---

# zen-lock — Secrets and Credential Lifecycle

zen-lock is Zen Mesh's secret management layer: a Kubernetes-native secret manager that stores sensitive material as **age-encrypted ciphertext only**. Enrollment credentials, HMAC signing keys, and mTLS certificate material are never stored in plaintext — not in etcd, not in Git, not in backups.

zen-lock ships with every Zen Mesh edge installation (enabled by default in the `zen-agent` Helm chart) and can also be installed standalone in any Kubernetes cluster. Its container images are published publicly as part of the Zen solution.

## How It Fits Into Zen Mesh

| Operation | Who Triggers It | What Happens |
|-----------|----------------|--------------|
| Enrollment | Dashboard → agent | age-encrypted bundle stored as ciphertext |
| Certificate issuance | Agent ↔ control plane | mTLS material delivered ephemerally into egress pods |
| HMAC key storage | Control plane → agent | Delivery signing keys stored as encrypted ZenLock resources |
| Secret rotation | Automatic | Keys rotate on schedule through a dual-key grace window |

## How Delivery Works

Decryption happens at **pod admission**, not in a sidecar:

1. A pod creation request hits the Kubernetes API server
2. zen-lock's mutating webhook intercepts it and checks the `zen-lock/inject` annotation
3. The webhook verifies the pod's ServiceAccount against the ZenLock's `allowedSubjects`
4. The ZenLock resource is decrypted and delivered — either as a short-lived Secret volume (webhook mode) or as read-only files through the Secrets Store CSI driver (CSI mode, no Secret object)

Plaintext exists only where it must: in the workload's mounted volume and memory. Persistent storage (etcd, Git, backups) contains only ciphertext.

## Where to Read More

Complete documentation lives in the dedicated zen-lock section of this site:

- [zen-lock Overview](/zen-lock/) — what it is, when to use it, security claims
- [How It Works](/zen-lock/how-it-works) — architecture and delivery modes
- [Using Secrets](/zen-lock/using-secrets) — protecting your own application secrets
- [CSI Driver](/zen-lock/csi-driver) — file delivery without a Secret object
- [High Availability](/zen-lock/high-availability) — multi-replica operation, Kubernetes API key custody
- [Key Rotation](/zen-lock/key-rotation) — zero-downtime master-key rotation
- [Security Properties](/zen-lock/security-properties) — threat model and explicit non-claims
- [Operations](/zen-lock/operations) — metrics, alerts, troubleshooting

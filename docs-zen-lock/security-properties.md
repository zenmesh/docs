---
sidebar_label: Security Properties
---

# Security Properties

What zen-lock protects against, what it doesn't, and how it fits into Zen Mesh's overall security model.

## Threats zen-lock Mitigates

### etcd Compromise

If an attacker gains read access to your cluster's etcd database:

| What they get | What they DON'T get |
|---------------|---------------------|
| zen-lock CRDs (ciphertext) | Plaintext enrollment credentials |
| K8s Secrets (non-zen-lock) | Plaintext HMAC keys |
| Pod specs, ConfigMaps | Plaintext mTLS private keys |
| Service accounts, RBAC | Zen Mesh delivery credentials |

**Without the age private key (held by the control plane), ciphertext is useless.**

### Backup Compromise

Backups of your cluster (Velero, etcd snapshots, etc.) contain only ciphertext. A leaked backup does not expose Zen Mesh credentials.

### Git Repository Compromise

If you commit zen-lock CRDs to Git (supported workflow), a compromised repo reveals only ciphertext.

### Insider Threat (Cluster Admin)

A cluster administrator with `kubectl` access can:
- ✅ Read zen-lock CRDs (ciphertext — not useful)
- ✅ List pods, services, ConfigMaps
- ❌ Read plaintext secrets (only in pod memory, requires exec into pod)
- ❌ Extract the age private key (never stored in the cluster)

## What zen-lock Does NOT Protect Against

| Threat | Why zen-lock doesn't help | Mitigation |
|--------|--------------------------|------------|
| Pod exec by cluster admin | Admin can exec into running pod and read mounted secrets | RBAC, admission policies |
| Compromised control plane | Control plane holds the age private key | Control plane security, mTLS, SPIFFE |
| Memory dump of running pod | Plaintext exists in pod memory during runtime | Node security, container isolation |
| Network sniffing within cluster | Pod-to-pod traffic may be unencrypted | Network policies, service mesh |
| Stolen enrollment bundle | Bundle is encrypted, but valid during TTL | Short TTL (30 min), one-time use |

## zen-lock in the Zen Mesh Security Stack

zen-lock is one layer of a defense-in-depth model:

```
Layer 1: Network isolation — outbound-only, no inbound ports
Layer 2: mTLS — all internal paths (bridge↔egress, egress↔target)
Layer 3: HMAC — replay protection, tamper detection on events
Layer 4: SPIFFE/SPIRE — workload identity, automatic cert rotation
Layer 5: zen-lock — zero-knowledge secret storage
Layer 6: RBAC — 4-level role-based access control
Layer 7: Audit — tamper-detection via hash chains
```

No single layer is sufficient on its own. zen-lock specifically addresses the **storage** threat: ensuring that persistent data (etcd, backups, Git) never contains plaintext secrets.

## Compliance Notes

| Requirement | zen-lock Contribution |
|-------------|----------------------|
| **SOC2 CC6.1** (logical access) | Secrets not readable from etcd/API server |
| **SOC2 CC6.3** (data encryption) | age encryption at rest |
| **PCI DSS 3.4** (render PAN unreadable) | Sensitive fields encrypted before storage |
| **HIPAA** (ePHI protection) | Encryption at rest with access controls |
| **SR&ED evidence** | Cryptographic implementation is R&D-eligible work |

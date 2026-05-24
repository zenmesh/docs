# ZenLock and Credential Lifecycle Ownership

**Status:** Active — clarifies ZenLock's role vs. credential lifecycle owners
**Related:** [Security Capability Validation](/docs/security/security-capability-validation)

---

## Overview

ZenLock is Zen Mesh's encrypted secret **custody, distribution, and audit support** system. It is a critical component — but it is not the universal rotation engine.

Each credential type in Zen Mesh has its own **lifecycle owner** that performs rotation. ZenLock provides custody, distribution, and audit for the underlying secret material.

## Credential Lifecycle Owners

| Credential Type | Lifecycle Owner | ZenLock Role |
|---|---|---|
| **HMAC keys** | `HMACKeyRotationController` (zen-back workers) | Stores/distributes key material via `KeyRotationStore` → `ZenLockTenantSecretBackend` |
| **TLS certificates** | `cert-manager` (auto-renewal, 24h default) | Distributes cert material where applicable |
| **JWKs (JWT signing)** | JWT/JWKS lifecycle in SaaS/back | Custody of signing key material |
| **X.509 SVIDs** | `cert-manager` (renewal) + future SPIRE Workload API | No SVID ownership; SVIDs managed by cert-manager |
| **Cluster HMAC keys** | Enrollment lifecycle | ZenLock stores enrollment key material |

## What ZenLock Does

- **Encrypted custody** — All secrets encrypted at rest using industry-standard encryption
- **Controlled distribution** — Secrets securely distributed to authorized components
- **Audit trail** — Every secret access logged with tamper-evident audit support
- **Rotation support** — Rotation workflows can use ZenLock to protect and distribute new secret material

## What ZenLock Does NOT Do

- Does NOT rotate HMAC keys (that's `HMACKeyRotationController`)
- Does NOT rotate TLS certificates (that's `cert-manager`)
- Does NOT rotate JWKs (that's the JWT service)
- Does NOT own SVID lifecycle
- Does NOT perform canary deployment or automatic rollback for credentials
- Does NOT replace cert-manager or SPIRE

## Correct Wording

✅ **"ZenLock provides encrypted secret custody, distribution, and audit support."**

✅ **"Rotation workflows use ZenLock to protect and distribute new secret material."**

✅ **"Credential rotation is owned by the relevant lifecycle — HMAC, TLS/certificates, JWKs, and future SVID flows — with ZenLock protecting and distributing the underlying secret material where applicable."**

❌ ~~"ZenLock rotates all credentials."~~

❌ ~~"ZenLock performs automatic rotation."~~

❌ ~~"ZenLock owns SVID lifecycle."~~

❌ ~~"ZenLock handles canary deployment and automatic rollback."~~

## Source of Truth

| Component | File | Role |
|---|---|---|
| HMAC rotation | `src/saas/back/src/services/security_hmac_key_rotation_controller.go` | Rotation controller |
| Key rotation store | `src/saas/back/src/security/key_rotation_store.go` | Uses ZenLockTenantSecretBackend |
| ZenLock validation | `src/saas/back/src/security/encryption_validation.go:239` | `validateZenLockCoverage` |
| ZenLock backend | `src/saas/back/src/security/keystore.go:79` | `NewZenLockTenantSecretBackend` |
| CA signer | `src/saas/back/k8s/cert-manager-ca-issuer.yaml` | Cert-manager issuer (not ZenLock) |
| CAP-003 | `src/saas/customer-api/evidence/evidence.go:126` | "ZenLock secret management" status=implemented |

## Non-Claims

- No claim ZenLock rotates all credentials
- No claim ZenLock owns any specific credential lifecycle
- No claim ZenLock performs zero-downtime rotation for all secrets
- No claim ZenLock is a universal secret manager for third-party tools

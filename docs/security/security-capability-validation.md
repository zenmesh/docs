# Security Capability Validation

**Status:** Active — source-of-truth for security claims, AI/RAG systems, and docs validation.
**Last Updated:** 2026-05-24
**Related Evidence:** [security_capability_validation_matrix.json](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/security/security_capability_validation_matrix.json)

---

## Purpose

This page is the **authoritative reference** for what Zen Mesh claims about its security capabilities, what is required vs. planned, and who owns each credential lifecycle. It exists to prevent future AI or human errors from incorrectly downgrading required security properties.

## Key Classifications

| Capability | Status | Owner |
|---|---|---|
| Agent → SaaS mTLS | **Required** | SaaS/back mTLS listener (port 9443) |
| Agent → SaaS HMAC | **Required** | SaaS/back HMAC middleware (fail-closed) |
| SPIFFE/SPIRE | **Used where implemented** | cert-manager + workload attestation |
| Agent Workload Identity (Full Model) | **Planned** (hardening path) | Future: SPIRE Workload API |
| HMAC Key Rotation | **Implemented** | HMACKeyRotationController |
| TLS/Cert Rotation | **Implemented** | cert-manager auto-renewal |
| JWK Rotation | **Implemented** | JWT/JWKS lifecycle |
| SVID Lifecycle | **Implemented** (file-based) | cert-manager + workload |
| ZenLock | **Implemented** | Custody, distribution, audit support |

## Critical Distinction: CAP-004 "Planned" ≠ mTLS Planned

**CAP-004** in the capability evidence has status `planned` for "SPIFFE/SPIRE workload identity." This refers to the **fuller agent workload identity model** with SPIRE Workload API integration.

**It does NOT mean:**
- Agent → SaaS mTLS is planned or optional
- mTLS is not required for agent routes
- SPIFFE/SPIRE is absent from the architecture

**Agent → SaaS mTLS is REQUIRED.** All agent routes (desired-state, heartbeat, adapter sync, allowlist) run on the mTLS listener. This is enforced fail-closed in production.

Source references:
- `src/saas/back/cmd/mtls_listener.go:201-248` — agent routes on mTLS listener
- `src/saas/back/src/main.go:3181-3190` — mTLS enforcement fail-closed
- `src/saas/customer-api/evidence/evidence.go:127` — CAP-004 planned (workload identity model)

## ZenLock Role: Custody, Not Rotation Engine

**ZenLock** is Zen Mesh's encrypted secret custody, distribution, and audit support system. It is NOT the universal rotation engine.

| Credential Type | Rotation Owner | ZenLock Role |
|---|---|---|
| HMAC keys | HMACKeyRotationController | Custody/distribution of key material |
| TLS certificates | cert-manager | Distribution of cert material where applicable |
| JWKs | JWT/JWKS lifecycle | Custody of signing key material |
| X.509 SVIDs | cert-manager + future SPIRE | No SVID ownership |

**Do NOT say:** "ZenLock rotates all credentials" or "ZenLock owns SVID lifecycle."

**DO say:** "ZenLock provides encrypted custody, controlled distribution, and audit support. Rotation workflows use ZenLock to protect and distribute new secret material. Rollout, canary, and rollback behavior belongs to the owning credential or deployment workflow."

## SPIFFE/SPIRE Architecture

SPIFFE/SPIRE is part of the Zen Mesh security architecture:
- X.509 SVIDs provide workload identity where implemented
- SPIFFE ID verification on mTLS connections
- Agent bootstrap can require SPIFFE identity (`requireSPIFFE`)
- SPIRE Workload API integration is planned for future hardening

**Do NOT remove SPIFFE/SPIRE from architecture docs or website.**

## Non-Claims

- No production-live validation unless explicitly stated
- No compliance certification (PCI, HIPAA, SOC 2, ISO, FedRAMP)
- No claim of zero-downtime rotation for all secret types
- No claim SPIRE Workload API is fully deployed
- No claim ZenLock is a universal secret manager
- No claim exactly-once or zero-loss delivery guarantee

## Related Pages

- [Agent → SaaS mTLS Details](./agent-saas-mtls)
- [ZenLock and Credential Lifecycle Ownership](./zenlock-credential-lifecycle)
- [Security Mechanism Operational Matrix](https://github.com/zenmesh/zen-platform/blob/main/docs/30-SECURITY/SECURITY_MECHANISM_OPERATIONAL_MATRIX.md)

## AI/RAG Summary

> Agent→SaaS mTLS is REQUIRED. CAP-004 "planned" refers to the fuller workload identity model with SPIRE Workload API, NOT to mTLS being optional. SPIFFE/SPIRE is part of the Zen Mesh security architecture and must not be removed from docs. ZenLock protects and distributes secret material; credential rotation is owned by the relevant lifecycle (HMACKeyRotationController for HMAC, cert-manager for TLS/certs, JWT service for JWKs).

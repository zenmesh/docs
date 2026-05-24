---
sidebar_label: Non-Claims
---

# Non-Claims

The following capabilities are **explicitly not claimed**. See `/ai/evidence/v1/non-claims.json` for the full machine-readable list.

## Runtime

| Claim | Status | Scope |
|---|---|---|
| Exactly-once delivery | not_claimed | Delivery guarantees are scenario-specific; no global guarantee |
| Zero-loss delivery | not_claimed | All proofs are local/mock |
| General at-least-once delivery | not_claimed | ALO proven only for listed local/mock scenarios |
| CP outage autonomy | not_claimed | Outage proof is local/mock only |
| Global relay HA or failover | not_claimed | Failover is one primary → one secondary only |
| Private-edge autonomy | not_claimed | Uses mock_data, not real customer data |
| Global topology convergence | not_claimed | All convergence proofs are local/mock |

## Trust

| Claim | Status | Scope |
|---|---|---|
| Generic zero-trust | not_claimed | Trust is scoped to specific mechanisms (enrollment, mTLS, HMAC, ZenLock) |
| Production zero-trust | not_claimed | All proofs are local/mock |
| Production mTLS/cert rotation | not_claimed | No live execution evidence exists |
| SVID/SPIFFE rotation | not_claimed | SPIRE not deployed |
| Emergency revocation | not_claimed | No automated revocation playbook |
| Trust bundle rotation | not_claimed | No implementation exists |
| Merkle auth/replay/identity/delivery | not_claimed | Merkle is used for evidence integrity/state comparison only |

## Compliance

| Claim | Status | Scope |
|---|---|---|
| PCI DSS compliant | not_claimed | No PCI validation performed |
| HIPAA compliant | not_claimed | No BAA or covered-entity determination |
| FedRAMP authorized | not_claimed | No FedRAMP authorization |
| SOC 2 certified | not_claimed | No SOC 2 audit performed |
| ISO certified | not_claimed | No ISO certification |

## Cross-Cutting

| Claim | Status |
|---|---|
| No secrets exposed in evidence artifacts | Verified by automated git grep scan across all evidence JSON and validators |
| No secret printing in validators/tests | FORBIDDEN_SECRET_PATTERNS guard in all validation scripts |
| No production readiness claimed | All statuses explicitly scoped |

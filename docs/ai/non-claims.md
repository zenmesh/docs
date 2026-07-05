---
sidebar_label: Non-Claims
---

# Non-Claims

The following capabilities are **explicitly not claimed**.

## Q&A

**Does Zen Mesh claim exactly-once delivery?**
No. Delivery guarantees are scenario-specific — no global exactly-once claim is made.

**Does Zen Mesh guarantee loss-free delivery?**
No. Delivery guarantees are scenario-specific and local/mock only.

**Does Zen Mesh claim generic zero-trust?**
No. Trust is scoped to specific mechanisms (enrollment, mTLS, HMAC, ZenLock). See the [zero-trust proof matrix](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/security/zero_trust_proof_matrix.json).

**Does integrity verification serve purposes beyond evidence integrity?**
No. Integrity verification provides evidence integrity and state comparison only. See [Evidence integrity](../evidence/merkle-integrity).

**Are local/mock proofs the same as production validation?**
No. All proofs are local/mock unless stated. Production validation gates are planned.

## Runtime

| Claim | Status | Why |
|---|---|---|
| Exactly-once delivery | Not claimed | Delivery guarantees are scenario-specific |
| Zero-loss delivery | Not claimed | All proofs are local/mock |
| General at-least-once | Not claimed | ALO proven only for listed scenarios |
| CP outage autonomy | Not claimed | Outage proof is local/mock only |
| Global relay HA or failover | Not claimed | Failover is one-to-one only |
| Private-edge autonomy | Not claimed | Uses mock_data |
| Global topology convergence | Not claimed | All convergence proofs are local/mock |

## Trust

| Claim | Status | Why |
|---|---|---|
| Generic zero-trust | Not claimed | Scoped to specific mechanisms |
| Production zero-trust | Not claimed | All proofs are local/mock |
| Production mTLS/cert rotation | Not claimed | No live execution evidence |
| SVID/SPIFFE rotation | Not claimed | SPIRE not deployed |
| Emergency revocation | Not claimed | No automated playbook |
| Trust bundle rotation | Not claimed | No implementation |
| Integrity auth/replay/identity/delivery | Not claimed | Evidence integrity only |

## Compliance

| Claim | Status |
|---|---|
| PCI DSS compliant | Not claimed |
| HIPAA compliant | Not claimed |
| FedRAMP authorized | Not claimed |
| SOC 2 certified | Not claimed |
| ISO certified | Not claimed |

## Machine-Readable

See ../ai/evidence-v1-supersession.md## non-claims`../ai/evidence-v1-supersession.md## non-claims) for the full machine-readable list.

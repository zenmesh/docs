---
sidebar_label: Non-Claims
---

# Non-Claims

The following capabilities are explicitly **not claimed** at this time. See the [Zero-Trust Proof Matrix](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/security/zero_trust_proof_matrix.json) for detailed status.

## Runtime

- **Exact-once delivery** — not claimed. Delivery guarantees are scenario-specific.
- **Zero-loss delivery** — not claimed. All proofs are local/mock.
- **General at-least-once delivery** — not claimed. ALO is proven only for listed scenarios.
- **CP outage autonomy** — not claimed. Outage proof is local/mock.
- **Relay HA or global failover** — not claimed. Failover is one-to-one only.
- **Private-edge autonomy** — not claimed. Uses mock_data, not real customer data.
- **Global topology convergence** — not claimed. All convergence proofs are local/mock.

## Trust

- **Generic zero-trust** — not claimed. Trust is scoped to specific mechanisms.
- **Production zero-trust** — not claimed. All proofs are local/mock.
- **Production mTLS** — not claimed unless live evidence exists.
- **SVID/SPIFFE rotation** — not claimed. SPIRE is not deployed.
- **Emergency revocation** — not claimed. No automated revocation playbook.
- **Trust bundle rotation** — not claimed. No implementation.
- **Merkle authentication/replay/identity/delivery** — Merkle is used for evidence integrity only.

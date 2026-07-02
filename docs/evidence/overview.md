---
sidebar_label: Evidence Overview
---

# Evidence Overview

This section maps Zen Mesh capabilities to their current evidence status. Each page links to the corresponding evidence pack, proof ledger, replay verifier, and validation commands.

## Sections

| Page | Covers |
|------|--------|
| [Trust](/docs/trust/) | Customer compliance coverage, CIS benchmark alignment, evidence overview |
| [Runtime Convergence](./runtime-convergence) | Delivery modes, relay, CP convergence, topology, evidence buffer — PROOF-001 through PROOF-010 |
| [Trust Lifecycle](./trust-lifecycle) | Enrollment, mTLS, HMAC, ZenLock, rotation, revocation — TRUST-PROOF-001 through TRUST-PROOF-010 |
| [Completion Evidence](./completion-evidence) | Validated work gate — evidence, Merkle../ai/evidence-v1-supersession.md#non-claims, proof status |
| [Non-Claims](../ai/evidence-v1-supersession.md#non-claims) | Capabilities explicitly not claimed |
| [Validation Map](./validation-map) | How to validate locally — Make targets and validators |

All proofs are local/mock or cloud-demo (Stripe FLOW-03 on GKE) unless stated otherwise. No production or live execution is claimed unless an evidence artifact explicitly proves it.

## Quick Links

| Artifact | Path |
|----------|------|
| Runtime evidence pack | `docs/80-EVIDENCE/runtime/runtime_convergence_evidence_pack_v1.json` |
| Runtime proof ledger | `docs/80-EVIDENCE/runtime/runtime_proof_ledger.json` |
| Runtime replay verifier | `scripts/validation/runtime_proof_replay_verify.py` |
| Runtime state machines | `docs/80-EVIDENCE/runtime/runtime_convergence_state_machine.json` |
| Trust evidence pack | `docs/80-EVIDENCE/security/trust_lifecycle_evidence_pack_v1.json` |
| Trust proof ledger | `docs/80-EVIDENCE/security/trust_lifecycle_proof_ledger.json` |
| Trust replay verifier | `scripts/validation/trust_proof_replay_verify.py` |
| Zero-trust proof matrix | `docs/80-EVIDENCE/security/zero_trust_proof_matrix.json` |
| Trust readiness report | `docs/80-EVIDENCE/security/trust_lifecycle_readiness_report.json` |

## Source Repository

All evidence artifacts live in `zen-platform/docs/80-EVIDENCE/`. See [Current Evidence Map](https://github.com/zenmesh/zen-platform/blob/main/docs/20-OPERATIONS/CURRENT_EVIDENCE_MAP.md) for the complete newcomer entrypoint.

## Operational Truth Demo Evidence Pack

Canonical demo evidence pack for buyers/investors/internal demo readiness.

**Pack:** `zen-platform/docs/80-EVIDENCE/demo/operational_truth_demo_evidence_pack.json`

| Flow | Mode | Status |
|------|------|--------|
| FLOW-01 | Mode A — Direct Public Target | VALIDATED PASS |
| FLOW-02 | Mode B — Egress Direct | VALIDATED PASS |
| FLOW-03 (generic VM relay) | Mode C — Egress Relay | VALIDATED PASS (sandbox) — VM/nftables end-to-end delivery confirmed (5.8s, SLO 15s); supersedes prior PARTIAL |
| FLOW-03 (Stripe E2E GKE→k3d) | Mode C — Relay, Stripe-specific | VALIDATED PASS — Stripe Sandbox only; GKE cloud-validated |

**Critical distinction:** Stripe FLOW-03 PASS does NOT imply generic FLOW-03 PASS. Generic FLOW-03 is sandbox PASS, not production-live. These are separate proofs with different scopes.

**Non-claims:** Demo/validated proof only — not production-ready. No production-live claim. No production Stripe claim. No generic FLOW-03 full-pass claim. No exactly-once/zero-loss delivery guarantee. No compliance certification (PCI/SOC2/HIPAA/FedRAMP/ISO). No Merkle auth/replay/identity/encryption/access-control claim.

**Source:** `zen-platform` (github.com/zenmesh/zen-platform, commit `7c7c2f33534a`)

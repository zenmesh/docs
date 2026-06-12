---
sidebar_label: Capability Evidence
---

# Capability Evidence

All capabilities are classified with a proof status. See `/ai/evidence-schema/manifest.json` for the full machine-readable manifest.

## Runtime Convergence

| Capability | Proof ID | Status | Evidence Path |
|---|---|---|---|
| Retry-to-success | PROOF-001 | victory-locked, local/mock | `runtime_convergence_evidence_pack_v1.json` |
| CP outage/reconnect | PROOF-002 | victory-locked, local/mock | `runtime/control_plane_outage_reconciliation_execution.json` |
| DLQ exhaustion | PROOF-003 | victory-locked, local/mock | `runtime/retry_exhaustion_dlq_execution.json` |
| Duplicate/idempotency | PROOF-004 | victory-locked, local/mock | `runtime/duplicate_idempotency_execution.json` |
| Reconnect conflict | PROOF-005 | victory-locked, local/mock | `runtime/reconnect_conflict_reconciliation_execution.json` |
| Topology drift | PROOF-006 | victory-locked, local/mock | `runtime/topology_drift_convergence_execution.json` |
| Evidence buffer flush | PROOF-007 | victory-locked, local/mock | `runtime/evidence_buffer_flush_execution.json` |
| Relay path convergence | PROOF-008 | victory-locked, local/mock | `runtime/relay_path_convergence_execution.json` |
| Failover recovery | PROOF-009 | victory-locked, local/mock | `runtime/relay_failover_recovery_execution.json` |
| Private-edge path | PROOF-010 | victory-locked, local/mock | `runtime/private_edge_path_convergence_execution.json` |

**Verification:** `make runtime-proof-replay-verify` / `make runtime-convergence-state-machine-check`

## Trust Lifecycle

| Capability | Proof ID | Status | Evidence Path |
|---|---|---|---|
| Enrollment happy path | TRUST-PROOF-001 | local/mock proven | `security/trust_enrollment_execution.json` |
| Enrollment rejection | TRUST-PROOF-002 | local/mock proven | `security/trust_enrollment_rejection_execution.json` |
| HMAC valid/invalid/stale/rotated | TRUST-PROOF-003 | local/mock proven | `security/hmac_trust_execution.json` |
| mTLS/cert baseline | TRUST-PROOF-004 | implementation_present | `security/mtls_cert_trust_execution.json` |
| ZenLock secret authority | TRUST-PROOF-005 | local/mock proven | `security/zenlock_secret_authority_execution.json` |
| mTLS cert rejection (5 scenarios) | TRUST-PROOF-006 | local/mock proven | `security/mtls_cert_rejection_execution.json` |
| Canary cert rotation | TRUST-PROOF-007 | local/mock proven (ingester) | `security/canary_cert_rotation_execution.json` |
| Trust bundle rotation | TRUST-PROOF-008 | blocked (no implementation) | `security/trust_bundle_rotation_execution.json` |
| ZenLock secret rotation | TRUST-PROOF-009 | local/mock proven | `security/zenlock_secret_rotation_execution.json` |
| Revocation/expiry | TRUST-PROOF-010 | local/mock proven | `security/trust_revocation_expiry_execution.json` |

**Verification:** `make trust-proof-replay-verify` / `make trust-lifecycle-state-machine-check`

## Edge Lite

| Capability | Proof ID | Status | Evidence Path | Merkle Root |
|---|---|---|---|---|
| Docker runtime wedge | H484 | PASS | `checkpoints/CHECKPOINT_H484_...` | `edge_lite_h484_merkle.json` |
| Real enrollment/TLS wedge | H487 | PASS | `checkpoints/CHECKPOINT_H487_...` | `edge_lite_h487_merkle.json` |
| Single multi-role image | H489 | PASS | `checkpoints/CHECKPOINT_H489_...` | `edge_lite_h489_merkle.json` |
| Ingester local intake/spool | H490 | PASS | `checkpoints/CHECKPOINT_H490_...` | `edge_lite_h490_merkle.json` |
| Local flow delivery loop | H491 | PASS | `checkpoints/CHECKPOINT_H491_...` | `edge_lite_h491_merkle.json` |
| Size budget | H492 | PASS | `checkpoints/CHECKPOINT_H492_...` | `edge_lite_h492_merkle.json` |
| Local release bundle/UX | H493 | PASS | `checkpoints/CHECKPOINT_H493_...` | `edge_lite_h493_merkle.json` |
| Release security policy/gates | H494 | PASS | `checkpoints/CHECKPOINT_H494_...` | `edge_lite_h494_merkle.json` |
| SBOM/scan gate policy | H495 | PASS | `checkpoints/CHECKPOINT_H495_...` | `edge_lite_h495_merkle.json` |
| Signing/provenance policy | H496 | PASS | `checkpoints/CHECKPOINT_H496_...` | `edge_lite_h496_merkle.json` |
| Real SBOM/scan/toolchain | H497 | PASS | `checkpoints/CHECKPOINT_H497_...` | `edge_lite_h497_merkle.json` |
| Dual Helm+Docker UX contract | H498 | PASS | `checkpoints/CHECKPOINT_H498_...` | `edge_lite_h498_merkle.json` |
| curl|sh installer dry-run | H499 | PASS | `checkpoints/CHECKPOINT_H499_...` | `edge_lite_h499_merkle.json` |

**Non-claims:** launch_ready=false, customer_ready=false, prod_live=false, real_enrollment_implementation=false, real_saas_delivery=false, signing_executed=false, provenance_generated=false, release_gates_complete=false.

## Gateway API (Local Proof)

| Capability | Proof ID | Status | Evidence Path | Merkle Root |
|---|---|---|---|---|
| MetalLB Programmed=True | H481 | PASS | `checkpoints/CHECKPOINT_H481_...` | `gateway_api_h500_merkle.json` |
| Traffic proof (5/5) | H482 | PASS | `checkpoints/CHECKPOINT_H482_...` | `gateway_api_h500_merkle.json` |
| Local evidence closeout | H483 | PASS | `checkpoints/CHECKPOINT_H483_...` | `gateway_api_h500_merkle.json` |

**Non-claims:** gateway_cloud_proof=false, production_gateway_proof=false, multicluster_gateway=false, customer_ready=false, prod_live=false, zero_trust_complete=false.

## Public Trust & Evidence Pack

A buyer-readable summary of all Edge Lite and Gateway API evidence, non-claims, and launch blockers is available in the [zen-platform repository](https://github.com/zenmesh/zen-platform):

- [Edge Lite + Gateway API: Public Trust & Evidence Pack](https://github.com/zenmesh/zen-platform/blob/main/docs/10-ARCHITECTURE/EDGE_LITE_GATEWAY_PUBLIC_TRUST_EVIDENCE_PACK.md)
- [Proven / Not Proven Matrix](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/edge/edge_lite_h501_proven_not_proven_matrix.json)
- [Design Partner Evaluation Runbook](https://github.com/zenmesh/zen-platform/blob/main/docs/20-OPERATIONS/EDGE_LITE_DESIGN_PARTNER_EVALUATION_RUNBOOK.md)

## Evidence Support

| Artifact | Description | Path |
|---|---|---|
| Runtime evidence pack | 10 proofs consolidated | `runtime/runtime_convergence_evidence_pack_v1.json` |
| Runtime replay verifier | Validates all 10 proofs | `scripts/validation/runtime_proof_replay_verify.py` |
| Runtime state machines | 4 machines (delivery, CP, topology, buffer) | `runtime/runtime_convergence_state_machine.json` |
| Trust evidence pack | Trust proofs consolidated | `security/trust_lifecycle_evidence_pack_v1.json` |
| Trust replay verifier | Validates all trust proofs | `scripts/validation/trust_proof_replay_verify.py` |
| Trust state machines | 4 machines (enrollment, cert, HMAC, secret) | `security/trust_lifecycle_state_machine.json` |
| Zero-trust proof matrix | 12 scoped claim rows | `security/zero_trust_proof_matrix.json` |
| Trust lifecycle evidence map | 17 capabilities | `security/trust_lifecycle_evidence_map.json` |
| Claims guard | 0 critical overclaims | `scripts/validation/runtime_claims_guard.py` |

All paths are relative to `zen-platform/docs/80-EVIDENCE/`.

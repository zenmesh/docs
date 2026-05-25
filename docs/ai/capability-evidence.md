---
sidebar_label: Capability Evidence
---

# Capability Evidence

All capabilities are classified with a proof status. See `/ai/evidence/v1/manifest.json` for the full machine-readable manifest.

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

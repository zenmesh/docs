---
sidebar_label: Runtime Convergence
---

# Runtime Convergence Evidence

See the [Runtime Convergence Evidence Pack v1](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/runtime/runtime_convergence_evidence_pack_v1.json) for the complete summary of all 10 convergence proofs.

## Proof Coverage

| Proof | Scenario | Path Mode | Status |
|-------|----------|-----------|--------|
| PROOF-001 | Retry-to-success | direct | validation-locked, local/mock evidence |
| PROOF-002 | CP outage/reconnect | cp_convergence | validation-locked, local/mock evidence |
| PROOF-003 | DLQ exhaustion | direct | validation-locked, local/mock evidence |
| PROOF-004 | Duplicate/idempotency | direct | validation-locked, local/mock evidence |
| PROOF-005 | Reconnect conflict resolution | cp_convergence | validation-locked, local/mock evidence |
| PROOF-006 | Topology drift | topology | validation-locked, local/mock evidence |
| PROOF-007 | Evidence buffer flush | evidence_buffer | validation-locked, local/mock evidence |
| PROOF-008 | Relay path convergence | relay | validation-locked, local/mock evidence |
| PROOF-009 | Failover recovery | relay | validation-locked, local/mock evidence |
| PROOF-010 | Private-edge path convergence | private_edge | validation-locked, local/mock evidence |

## Verification

```bash
make runtime-convergence-evidence-pack-v1-check
make runtime-proof-replay-verify
make runtime-convergence-state-machine-check
make runtime-convergence-readiness-report-check
make runtime-claims-guard-burn-down-check
```

## Scope

- All proofs are **local/mock only**. No sandbox or production execution.
- No production readiness claimed.
- No exactly-once, zero-loss, or general at-least-once delivery claimed.
- No CP autonomy, relay HA, or private-edge autonomy claimed.
- No integrity auth/replay/identity/delivery claimed.

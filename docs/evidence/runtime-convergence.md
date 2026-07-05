---
sidebar_label: Runtime Convergence
---

# Runtime Convergence Evidence

See the [Runtime Convergence Evidence Pack v1](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/runtime/runtime_convergence_evidence_pack_v1.json) for the complete summary of all 10 convergence proofs.

## Proof Coverage

| Proof | Scenario | Path Mode | Status |
|-------|----------|-----------|--------|
| PROOF-001 | Retry-to-success | direct | victory-locked, local/mock |
| PROOF-002 | CP outage/reconnect | cp_convergence | victory-locked, local/mock |
| PROOF-003 | DLQ exhaustion | direct | victory-locked, local/mock |
| PROOF-004 | Duplicate/idempotency | direct | victory-locked, local/mock |
| PROOF-005 | Reconnect conflict resolution | cp_convergence | victory-locked, local/mock |
| PROOF-006 | Topology drift | topology | victory-locked, local/mock |
| PROOF-007 | Evidence buffer flush | evidence_buffer | victory-locked, local/mock |
| PROOF-008 | Relay path convergence | relay | victory-locked, local/mock |
| PROOF-009 | Failover recovery | relay | victory-locked, local/mock |
| PROOF-010 | Private-edge path convergence | private_edge | victory-locked, local/mock |

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

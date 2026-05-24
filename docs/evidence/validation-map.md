---
sidebar_label: Validation Map
---

# Validation Map

How to validate Zen Mesh evidence locally.

## Runtime Convergence

```bash
make runtime-convergence-evidence-pack-v1-check   # Validate evidence pack
make runtime-proof-replay-verify                   # Verify all 10 proofs
make runtime-convergence-state-machine-check       # Validate state machines
make runtime-convergence-readiness-report-check    # Check readiness report
make runtime-claims-guard-burn-down-check          # Verify 0 critical claims
make runtime-victory-lock-check                    # Verify victory locks
```

## Trust Lifecycle

```bash
make trust-lifecycle-evidence-pack-v1-check        # Validate evidence pack
make trust-proof-replay-verify                     # Verify all trust proofs
make trust-lifecycle-state-machine-check           # Validate state machines
make trust-lifecycle-readiness-report-check        # Check readiness report
make zero-trust-proof-matrix-check                 # Validate zero-trust matrix
make trust-lifecycle-evidence-map-check            # Validate evidence map
```

## Cross-Cutting

```bash
make docs-evidence-alignment-check                 # Docs reference current evidence
make docs-truth-alignment-check                    # Docs truth alignment
make merkle-evidence-check                         # Merkle evidence integrity
make zenlock-rbac-contract-check                   # ZenLock RBAC contract
```

## Source Repository

All validators live in `zen-platform/scripts/validation/`. All evidence at `zen-platform/docs/80-EVIDENCE/`.

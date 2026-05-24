---
sidebar_label: Verification
---

# Verification

How to validate Zen Mesh evidence locally and programmatically.

## AI Agent / Reviewer Verification Flow

1. **Fetch the manifest**
   ```
   GET /ai/evidence/v1/manifest.json
   ```

2. **Inspect each capability entry**
   - Check `proof_status`: `victory_locked`, `local_mock_proven`, `implementation_present`, `planned`, `blocked`, `not_claimed`
   - Verify `evidence_refs` point to existing zen-platform artifacts at `github.com/zenmesh/zen-platform/docs/80-EVIDENCE/`
   - Check `non_claims` for what is not claimed

3. **Verify Merkle/evidence hashes** (where available)
   - Run `make merkle-evidence-check` in zen-platform to verify Merkle tree integrity

4. **Map to proof ledger**
   - Runtime: `github.com/zenmesh/zen-platform/docs/80-EVIDENCE/runtime/runtime_proof_ledger.json`
   - Trust: `github.com/zenmesh/zen-platform/docs/80-EVIDENCE/security/trust_lifecycle_proof_ledger.json`

5. **Distinguish local/mock from live/prod**
   - All proofs with `proof_scope: "local_mock_harness_only"` are deterministic mocks
   - No live or production execution is claimed unless `proof_scope` explicitly states otherwise

## Make Targets (in zen-platform repo)

### Runtime Convergence

```bash
make runtime-convergence-evidence-pack-v1-check   # Validate evidence pack
make runtime-proof-replay-verify                  # Verify all 10 proofs
make runtime-convergence-state-machine-check       # Validate 4 state machines
make runtime-convergence-readiness-report-check    # Check readiness (6 gaps)
make runtime-claims-guard-burn-down-check          # 0 critical overclaims
make runtime-victory-lock-check                    # Verify victory locks
```

### Trust Lifecycle

```bash
make trust-lifecycle-evidence-pack-v1-check        # Validate trust evidence pack
make trust-proof-replay-verify                     # Verify all trust proofs
make trust-lifecycle-state-machine-check           # Validate 4 state machines
make trust-lifecycle-readiness-report-check        # Check readiness report
make zero-trust-proof-matrix-check                 # Validate proof matrix
make trust-lifecycle-evidence-map-check            # Validate evidence map
```

### Cross-Cutting

```bash
make docs-evidence-alignment-check                 # Docs reference current evidence
make docs-truth-alignment-check                    # Docs truth alignment
make merkle-evidence-check                         # Merkle evidence integrity
make zenlock-rbac-contract-check                   # ZenLock RBAC contract
```

## Public Docs Validation

```bash
cd ~/zenmesh/docs
npm run validate:ai-evidence                       # Validate AI evidence artifacts
npm run build                                      # Build static site
```

# FLOW-03 Truth Reconciliation

## Current Accepted Truth

**FLOW-03 was previously proven several times, including real Stripe webhooks through demo dataplane delivering to local target behind NAT.**

- Generic FLOW-03 (VM relay): VALIDATED PASS (sandbox)
- Stripe E2E GKE→k3d: VALIDATED PASS (demo)
- **Critical distinction:** Stripe FLOW-03 PASS does NOT imply generic FLOW-03 PASS
- Current H751R not rerunning FLOW-03 is a current-run regression/proof gap, NOT architecture failure
- Architecture_reopened=false — prior proof is accepted

## Documentation Status

### docs/evidence/overview.md
- **Status**: CORRECT — accurately documents both FLOW-03 proofs
- **Content** (lines 47-55):
  - FLOW-03 (generic VM relay): VALIDATED PASS (sandbox) — VM/nftables end-to-end delivery confirmed
  - FLOW-03 (Stripe E2E GKE→k3d): VALIDATED PASS — Stripe Sandbox only; GKE cloud-validated
  - **Critical distinction:** Generic FLOW-03 PASS does NOT imply production-live
  - Non-claims: Demo/validated proof only — not production-ready
- **Action**: NONE — documentation accurately reflects prior proof

### docs/start-here/current-status.md
- **Status**: CORRECT — reflects current evidence status
- **Content** (lines 14, 39):
  - "Proofs are local/mock unless stated — Stripe FLOW-03 validated on GKE cloud (demo); generic FLOW-03 sandbox PASS"
  - "Proofs are local/mock or cloud-demo (Stripe FLOW-03 on GKE) unless stated; no production-live claim"
- **Action**: NONE — documentation accurately scopes prior proof

## Stale Claim Assessment

| Stale Claim | Found? | Correction |
|-------------|--------|------------|
| FLOW-03 unproven | NO | Correctly documented as VALIDATED PASS (sandbox) |
| FLOW-03 absent | NO | Two proofs documented (generic and Stripe) |
| FLOW-03 reopens architecture | NO | Prior proof accepted, current run gap is regression |

## Prior Proof Summary

### Generic FLOW-03 (VM Relay)
- **Mode**: Mode C — Egress Relay
- **Status**: VALIDATED PASS (sandbox)
- **Scope**: VM/nftables end-to-end delivery confirmed (5.8s, SLO 15s)
- **Limitation**: Sandbox only, not production-live

### Stripe E2E FLOW-03 (GKE→k3d)
- **Mode**: Mode C — Relay, Stripe-specific
- **Status**: VALIDATED PASS (demo)
- **Scope**: Stripe Sandbox only; GKE cloud-validated
- **Limitation**: Demo-only, not production Stripe claim

## Current Run Status

**H751R not rerunning FLOW-03 is a current-run regression/proof gap, not an architecture failure.**

- Prior proof is accepted and documented
- Current run gap is a practical gap, not a factual dispute
- Architecture_reopened=false — the architecture is sound; the proof gap is execution/pipeline, not design

## Summary

**FLOW-03 documentation is current.** No stale "unproven" or "absent" claims found. Documentation accurately distinguishes between:
- Generic FLOW-03 sandbox PASS (prior proof)
- Stripe E2E demo PASS (prior proof)
- Production-live execution (not claimed)

**Architecture_reopened=false** — Prior FLOW-03 proof is accepted; current run gap is a regression, not an architecture failure.

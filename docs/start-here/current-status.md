---
sidebar_label: Current Status
---

# Current Status

Zen Mesh is in **early access**. We are completing final validations before opening broader production access.

## Early Access

- Available now by contacting us at zen@zen-mesh.io
- No credit card required
- Best-effort support during early access
- Proofs are local/mock unless stated — Stripe FLOW-03 validated on GKE cloud (demo); generic FLOW-03 sandbox PASS

## Production Access

- Planned after final validation gates pass
- SLA options will be introduced as the service matures
- No hard SLAs offered during early access
- See [Validation Gates](https://github.com/zenmesh/zen-mesh.io/blob/main/docs/prod-live-validation-gates.md) for the full list

## Evidence Status

| Domain | Proofs | Status |
|---|---|---|
| Runtime convergence | 10/10 | Victory-locked, local/mock or cloud-demo |
| Trust lifecycle | 10/10 | Execution artifacts, local/mock |
| Claims guard | 0 critical | Burned down from 16 |
| Compliance mappings | 5 frameworks | Support mappings only |

## What is not claimed

See [Non-Claims](../ai/non-claims) for a complete list. Key items:
- No PCI, HIPAA, FedRAMP, SOC 2, or ISO certification
- No delivery guarantee beyond scenario-specific local/mock/cloud-demo proofs
- No production-level zero-trust status
- Merkle is evidence integrity only — see non-claims for scope
- Proofs are local/mock or cloud-demo (Stripe FLOW-03 on GKE) unless stated; no production-live claim

## Documentation Gap Disposition

The following capabilities are not yet publicly documented. They remain gated on runtime implementation or infrastructure readiness:

| Capability | Status | Blocking Issue |
|------------|--------|----------------|
| Event normalization | Internal contract only (no runtime implementation) | WP-011 MISSING |
| Observability dashboards | Internal OBS evidence, no runtime customer-facing dashboards | OBS-001 PARTIAL |
| AI capability index (public) | Index exists in private repo, not published on docs.zen-mesh.io | Infrastructure — requires docs site changes outside docs-only scope |
| RBAC/ABAC authorization | Active development lane H706 — pending runtime proof | H706 active, not accepted |

These items are tracked and will be documented publicly as implementations mature.

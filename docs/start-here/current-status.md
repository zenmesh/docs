---
sidebar_label: Current Status
---

# Current Status

Zen Mesh Free and Pro are the public buyer-facing plans. The docs support self-serve evaluation and private webhook delivery setup.

Some production-live gates, including final cloud, billing, and operations gates, may still be tracked separately. Where a feature depends on a live gate, the docs call that out explicitly.

Free and Pro do not include SLA or on-call support. Business and Enterprise operational guarantees are planned separately.

Start with the [Quick Start](../getting-started/quick-start) to create your first webhook endpoint, choose a source template, configure a destination, and validate delivery.

## Plane Status

| Plane | Status | Notes |
|---|---|---|
| Control Plane | WIRED_SANDBOX | SaaS control surface — UI, API, MCP |
| Data Plane | WIRED_SANDBOX | Delivery runtime — zen-ingester, zen-egress, zen-bridge |
| Edge Plane (Kubernetes) | WIRED_SANDBOX | zen-agent on Kubernetes |
| Edge Lite | DESIGN_PARTNER_EVAL | Non-Kubernetes path — not production-ready |

## Evidence Status

| Domain | Proofs | Status |
|---|---|---|
| Runtime convergence | 10/10 | Victory-locked, local/mock or cloud-demo |
| Trust lifecycle | 10/10 | Execution artifacts, local/mock |
| Claims guard | 0 critical | Burned down from 16 |
| Compliance mappings | 5 frameworks | Support mappings only |

## What is not claimed

- No PCI, HIPAA, FedRAMP, SOC 2, or ISO certification
- No delivery guarantee beyond scenario-specific local/mock/cloud-demo proofs
- No production-level zero-trust status
- Merkle is evidence integrity only — see [Non-Claims](../ai/non-claims) for scope
- Proofs are local/mock or cloud-demo unless stated; no production-live claim

## Documentation Gap Disposition

The following capabilities are not yet publicly documented. They remain gated on runtime implementation or infrastructure readiness:

| Capability | Status | Blocking Issue |
|---|---|---|
| Event normalization | Internal contract only (no runtime implementation) | WP-011 MISSING |
| Observability dashboards | Internal OBS evidence, no runtime customer-facing dashboards | OBS-001 PARTIAL |
| AI capability index (public) | Index exists in private repo, not published on docs.zen-mesh.io | Infrastructure — requires docs site changes outside docs-only scope |
| RBAC/ABAC authorization | Active development — pending runtime proof | Active, not accepted |

These items are tracked and will be documented publicly as implementations mature.

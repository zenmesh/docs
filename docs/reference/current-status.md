---
sidebar_label: Current Status
---

# Current Status Matrix

> Status: DERIVED. The canonical capability registry is maintained at `zen-platform/config/canonical/capability-registry.yaml` with an eight-dimension maturity schema. This page is a human-readable summary derived from that registry. Not a production-live claim.

## Status Labels

| Label | Meaning |
|---|---|
| WIRED_SANDBOX | Runtime exists in dev/sandbox. Not production-GA. May have incomplete features, limited scaling, no SLA. |
| PUBLIC_CONTRACT_DRAFT | Design documented as public contract. Implementation may not exist. Schema and behavior subject to change. |
| PLANNED | Roadmap item. Under consideration but no implementation commitment or timeline. |
| INTERNAL_ONLY | Internal tooling. Not a public customer contract. May change without notice. |
| SANDBOX_ONLY | Only available in sandbox/local environment. Not in production. |

## Capability Status

| Capability | Status | Notes |
|---|---|---|---|
| **Planes / Runtime** | | |
| Control Plane | WIRED_SANDBOX | SaaS control surface — UI, API, MCP, Git |
| Data Plane | WIRED_SANDBOX | zen-ingester, zen-egress, zen-bridge |
| Edge Plane (Kubernetes) | WIRED_SANDBOX | zen-agent on Kubernetes, outbound-only |
| Edge Lite | DESIGN_PARTNER_EVAL | Non-Kubernetes path — not production-ready |
| **Runtime / Core** | | |
| Endpoint ingestion | WIRED_SANDBOX | HMAC signature validation, IP allowlisting, custom header validation |
| Flow routing | WIRED_SANDBOX | JSONPath filter, JSONPath transform |
| Delivery to target | WIRED_SANDBOX | HTTP delivery with configurable retry policy |
| Retry (exhaustion) | WIRED_SANDBOX | Exponential backoff, 5 attempts, 1s→60s |
| DLQ | WIRED_SANDBOX | Query over failed deliveries |
| Manual retry | WIRED_SANDBOX | Single and batch |
| Replay | WIRED_SANDBOX (gated) | Requires retained payload/context |
| **Observability** | | |
| Trace spine | WIRED_SANDBOX | Delivery/evidence spine, not distributed tracing |
| Delivery attempt history | WIRED_SANDBOX | Per-attempt detail: HTTP response, timing, status |
| Saved payloads | WIRED_SANDBOX | User-managed test/template payloads |
| Retained payloads | WIRED_SANDBOX (plan-gated) | Production event payload in delivery history |
| **Trust / Evidence** | | |
| Evidence integrity | WIRED_SANDBOX | Integrity receipt for successful deliveries, local/sandbox |
| Evidence API | WIRED_SANDBOX | Scoped by delivery, source, or time window |
| **Control Surfaces** | | |
| Dashboard (UI) | INTERNAL_ONLY | App-facing, not public API contract |
| Customer API | WIRED_SANDBOX | REST API, scope-gated writes |
| MCP | PUBLIC_CONTRACT_DRAFT | Read tools default-on, write tools per-group enablement |
| CLI | WIRED_SANDBOX | Terminal-based admin and scripting |
| Git (Contract) | PLANNED | V1.1, Business+ |
| **Integrations** | | |
| Sources (Stripe, GitHub, etc.) | WIRED_SANDBOX | Source templates and blueprint generation |
| Webhook sources | WIRED_SANDBOX | Custom HTTP source |
| **Configuration** | | |
| Configuration Contract | PUBLIC_CONTRACT_DRAFT | Cross-surface contract, not runtime-live |
| Authentication | WIRED_SANDBOX | API key (Bearer), OIDC session, MCP key |
| **Plans / Billing** | | |
| Free Forever tier | WIRED_SANDBOX | No billing, limited quota |
| Pro tier | PLANNED | Not live |
| Business / Business+ tier | PLANNED | Not live |
| Enterprise (custom) | PLANNED | Not live |

## Non-Claims

- WIRED_SANDBOX does not imply production-GA or production-live
- PUBLIC_CONTRACT_DRAFT does not imply implementation exists
- PLANNED does not imply commitment or timeline
- INTERNAL_ONLY surfaces are not public customer contracts
- SANDBOX_ONLY capabilities are not available in production
- Evidence is sandbox/local validated, not production cloud proof
- No compliance certifications are claimed (PCI, SOC 2, HIPAA, FedRAMP)
- Retry is idempotent but does not guarantee delivery success
- Replay requires retained payload/context — not all deliveries replayable
- Traces are delivery/evidence spine, not distributed tracing
- Delivery guarantees are scenario-specific (local/mock/cloud-demo), not production-level
- No billing is live for Free Forever tier
- MCP write tools are disabled by default — enable per tool group
- Customer API is not globally read-only — read/write is endpoint-group level

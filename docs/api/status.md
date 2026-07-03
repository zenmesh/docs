---
sidebar_label: API Status Matrix
---

# API Status Matrix

> Status: PUBLIC_CONTRACT_DRAFT. This matrix tracks the maturity, audience, and implementation status of every documented API group.

| API group | Audience | Base path | Auth | Read support | Write support | Maturity | Public contract | OpenAPI | UI mapping | Note | Non-claim |
|-----------|----------|-----------|------|-------------|--------------|----------|----------------|---------|------------|------|-----------|
| Dashboard/BFF API | App-facing | `/api/bff/v1` | Session, API key | Yes | Yes (app-scoped) | INTERNAL_ONLY | No | zen-bff.v1.yaml (private) | All dashboard pages | Aggregation layer; not a customer contract | Not a public customer API |
| Customer API | External | `/v1/...` | Bearer JWT, HMAC | Planned (reads) / Permissioned (writes) | Permissioned (endpoint-group level) | PLANNED | Draft | No | — | Not globally read-only; write status per endpoint group | Not production-live; planned only |
| Webhook Ingest API | Provider | `POST /webhooks/{provider}` | HMAC, signature | No (ingest only) | Provider sends events | WIRED_SANDBOX | Draft | Partial (zen-back) | Connect → Endpoints | Provider-specific endpoints for Stripe, GitHub, etc. | Sandbox-validated; not production-live |
| Targets API | Customer | `/v1/tenants/{tid}/destinations` | Bearer JWT, API key | Yes | Create, update, delete | WIRED_SANDBOX | Draft | Yes (zen-back) | Connect → Targets | Internal model term: destination | Sandbox-validated |
| Endpoints API | Customer | `/v1/tenants/{tid}/ingesters` | Bearer JWT, API key | Yes | Create, update, delete | WIRED_SANDBOX | Draft | Yes (zen-back) | Connect → Endpoints | Internal model term: ingester | Sandbox-validated |
| Flows API | Customer | `/v1/tenants/{tid}/delivery-flows` | Bearer JWT, API key | Yes | Create, update, delete | WIRED_SANDBOX | Draft | Yes (zen-back) | Connect → Flows, Maintain → Flows | Declarative delivery contract | Sandbox-validated |
| Delivery Attempts API | Customer | `/v1/tenants/{tid}/deliveries` | Bearer JWT, API key | Yes | No direct public write | WIRED_SANDBOX | Draft | Partial | Traffic → Deliveries, Traffic → Attempts | One delivery execution; attempts created by runtime | Not production-live |
| DLQ API | Customer | `/v1/tenants/{tid}/deliveries?status=failed` | Bearer JWT, API key | Yes | No direct DLQ write | WIRED_SANDBOX | Draft | Partial | Traffic → DLQ | Failed delivery attempts; retry via Retry API | DLQ proof is sandbox/local, not production |
| Retry API | Customer | `/v1/tenants/{tid}/events/{eid}/retry` | Bearer JWT, API key | Via attempts API | Yes (retry) | WIRED_SANDBOX | Draft | No | Traffic → Retry | Single and batch retry | Sandbox-validated |
| Replay API | Customer | `/v1/tenants/{tid}/events/{eid}/replay` | Bearer JWT, API key | Eligibility/context | Yes (gated by retained payload) | WIRED_SANDBOX | Draft | No | Traffic → Replay | Requires retained payload/context | Replay gated by retained payload availability |
| Traces / Evidence Spine API | Customer | `/v1/tenants/{tid}/deliveries` | Bearer JWT, API key | Yes | No | WIRED_SANDBOX | Draft | No | Traffic → Traces | Delivery trace spine; not full distributed tracing | Delivery trace only; not distributed tracing |
| Saved Payloads API | Customer | `/v1/tenants/{tid}/saved-payloads` | Bearer JWT, API key | Yes | Create, update, delete | WIRED_SANDBOX | Draft | No | Traffic → Payloads, Labs → Payload Builder | Test/template payloads, not production retained payloads | Not production retained payload history |
| Evidence API | Customer | `/v1/evidence/...`, `/v1/sources/.../evidence` | Bearer JWT, API key | Yes | No direct write | WIRED_SANDBOX | Draft | Partial | Trust → Evidence, Traffic → Traces | Hash-chain Merkle receipts; evidence created by platform | Sandbox-validated; not production evidence |
| API Keys API | Customer | `/v1/tenants/{tid}/api-keys` | Session, API key | Yes | Create, revoke | WIRED_SANDBOX | Draft | Partial | Settings → API Keys | CRUD for API credentials | Sandbox-validated |
| Rate Limits API | Customer | — | — | Documentation only | N/A | PUBLIC_CONTRACT_DRAFT | Draft | No | Settings → Rate Limits | Plan-based rate documentation | No SLA guarantee |
| MCP API | Customer | MCP protocol | MCP API key, mTLS | Yes (default-on) | Permissioned, disabled by default | PUBLIC_CONTRACT_DRAFT | Draft | No | Settings → MCP | AI agent surface; read tools default-on, write tools disabled by default | Business+ gating for write tools |
| Billing/Plan API | Internal | — | Internal | Internal | N/A | INTERNAL_ONLY | No | No | Settings → Billing | Plan entitlement and billing | Not a public customer API |
| Sandbox/Test API | Test | — | Internal | Sandbox-only | Sandbox-only | SANDBOX_ONLY | No | No | Labs → Sandbox | Test event generation, failure simulation | Not for production use |
| Internal/Admin API | Internal | — | Internal | Internal | N/A | INTERNAL_ONLY | No | No | — | Admin-only debug/diagnostic endpoints | Not documented as public contract |

## Status definitions

See the [API Overview](./overview#maturity-legend) for full status definitions.

## Related

- [API Overview](./overview)
- [OpenAPI Spec Index](./openapi)

---
sidebar_label: API Overview
---

# API Overview

The Zen Mesh API is one control surface for the [Zen Configuration Contract](../product/zen-configuration-contract). It complements the UI, CLI, MCP, and Git surfaces. The contract — not any single surface — is the source of truth.

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the API surface groups and their current maturity. Individual endpoints may carry different statuses. See the [API Status Matrix](./status) for per-group status.

## API surface groups

| Group | Audience | Primary base path | Status |
|-------|----------|------------------|--------|
| Dashboard/BFF API | App-facing | `/api/bff/v1` | INTERNAL_ONLY |
| [Customer API](../reference/customer-api) | External programmable | `/v1/...` | PLANNED |
| [Webhook Ingest API](./webhooks) | Sender-facing | `POST /webhooks/{provider}` | WIRED_SANDBOX |
| [Targets API](./targets) | Customer | `/v1/tenants/{tid}/destinations` | WIRED_SANDBOX |
| [Endpoints API](./endpoints) | Customer | `/v1/tenants/{tid}/ingesters` | WIRED_SANDBOX |
| [Flows API](./flows) | Customer | `/v1/tenants/{tid}/delivery-flows` | WIRED_SANDBOX |
| [Delivery Attempts API](./delivery-attempts) | Customer | `/v1/tenants/{tid}/deliveries` | WIRED_SANDBOX |
| [DLQ API](./dlq) | Customer | `/v1/tenants/{tid}/deliveries?status=failed` | WIRED_SANDBOX |
| [Retry API](./retry) | Customer | `/v1/tenants/{tid}/events/{eid}/retry` | WIRED_SANDBOX |
| [Replay API](./replay) | Customer | `/v1/tenants/{tid}/events/{eid}/replay` | WIRED_SANDBOX |
| [Traces / Evidence Spine API](./traces) | Customer | `/v1/tenants/{tid}/deliveries` | WIRED_SANDBOX |
| [Saved Payloads API](./saved-payloads) | Customer | `/v1/tenants/{tid}/saved-payloads` | WIRED_SANDBOX |
| [Evidence API](./evidence) | Customer | `/v1/evidence/...` | WIRED_SANDBOX |
| [API Keys API](./authentication) | Customer | `/v1/tenants/{tid}/api-keys` | WIRED_SANDBOX |
| [Rate Limits API](./rate-limits) | Customer | — | PUBLIC_CONTRACT_DRAFT |
| [MCP API](../mcp/overview) | Customer | MCP protocol | PUBLIC_CONTRACT_DRAFT |
| Billing/Plan API | Internal | — | INTERNAL_ONLY |
| Sandbox/Test API | Test | — | SANDBOX_ONLY |
| Internal/Admin API | Internal | — | INTERNAL_ONLY |

## Maturity legend

| Status | Meaning |
|--------|---------|
| PUBLIC_CONTRACT_STABLE | Production-ready, documented, supported |
| PUBLIC_CONTRACT_DRAFT | Contract defined, API surface may change |
| WIRED_SANDBOX | Implemented in local/sandbox runtime, not production-live |
| WIRED_LOCAL | Implemented in local development only |
| INTERNAL_ONLY | App-facing or admin dashboard, not a customer contract |
| SANDBOX_ONLY | Test/sandbox endpoints, not for production use |
| PLANNED | Documented intent, not implemented |
| V1_1_PLANNED | Planned for V1.1 release |
| NOT_CLAIMED | Explicit non-claim — not available |

## Public-contract boundary

- Some APIs are **app-facing/internal** (Dashboard/BFF routes).
- Some APIs are **public customer contracts** (Customer API, runtime APIs).
- Some APIs are **sandbox-only** (test event generation, sandbox delivery).
- Some APIs are **planned** (Customer API GA contract).
- **No page should be interpreted as production-live** unless the status field explicitly says PUBLIC_CONTRACT_STABLE.

## Base URLs

Base URL examples in these docs use `https://api.zen-mesh.io/v1` for public contract paths. Dashboard/BFF examples use `/api/bff/v1` and are marked app-facing. Local/sandbox examples are explicitly labeled.

## Terminology mapping

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Target | destination | `/destinations` |
| Endpoint | ingester | `/ingesters` |
| Flow | delivery-flow | `/delivery-flows` |
| Attempt | delivery | `/deliveries` |
| DLQ | deliveries?status=failed | `/deliveries?status=failed` |

**Note:** API paths use internal terms. Customer-facing documentation and UI use the customer terms. Where possible, OpenAPI field names and error messages prefer customer-facing language.

## Customer chain

```
Template → Blueprint → Flow → Traffic → Evidence
```

## Non-claims

- API documentation is not proof of production availability.
- Local/sandbox proof is not production-live proof.
- Billing live is not claimed unless explicitly marked.
- Provider live validation remains gated until public endpoint/provider proof exists.
- Some endpoints documented here are app-facing only and not a public customer contract.

## Related

- [API Status Matrix](./status) — per-group maturity, audience, read/write status, and implementation notes
- [Write Safety Model](./write-safety) — authorization, idempotency, audit, fail-closed behavior for write-capable APIs and MCP
- [Authentication and API Keys](./authentication)
- [Errors and Problem Details](./errors)
- [OpenAPI Spec Index](./openapi)
- [Reference API Index](../reference/api)

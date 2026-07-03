---
sidebar_label: Customer API
---

# Customer API

The Customer API is the planned programmable interface for reading operational truth and managing authorized Zen Mesh resources. It is distinct from the [Dashboard/BFF API](../api/status) and the [MCP surface](../mcp/overview), but it follows the same contract model: UI, CLI, API, MCP, and Git are different control surfaces over the [Zen Configuration Contract](../product/zen-configuration-contract).

> Status: PLANNED. This page describes the planned customer-facing contract. Individual endpoint groups carry their own status. It is not a production-live availability claim.

## Relationship to Zen Configuration Contract

Every operation in Zen must be representable as a declarative contract. The Customer API is one control surface for that contract alongside the UI, CLI, MCP, and Git surfaces. The contract — not any single surface — is the source of truth.

## Relationship to Dashboard/BFF API

The Dashboard/BFF API (`/api/bff/v1`) exists today for the dashboard UI. It is an **internal app-facing surface**, not a public customer contract. The Customer API will eventually provide a stable, documented, externally consumable contract. Until then, the BFF API may be the only available programmatic surface for some operations.

## Relationship to MCP

The [MCP surface](../mcp/overview) is a separate control surface for AI agents. It has its own auth model, tool set, and safety boundaries. MCP is not a subset of the Customer API, nor vice versa. Both produce and consume ZCC artifacts.

## Read and write model

The Customer API is **not read-only as a product category**. Read/write status is determined at the endpoint-group level, not globally.

| Capability | Example operation | Status | Permission model | Notes |
|---|---|---|---|---|
| Read tenant state | `GET /v1/capabilities`, `GET /v1/readiness` | PLANNED | Bearer JWT, HMAC, API key | Operational truth reads |
| Read targets | `GET /v1/tenants/{tid}/destinations` | WIRED_SANDBOX | Bearer JWT, API key | Via runtime Targets API |
| Create/update target | `POST/PATCH /v1/tenants/{tid}/destinations` | WIRED_SANDBOX | Bearer JWT, API key, tenant scope | See [Targets API](../api/targets) |
| Read endpoints | `GET /v1/tenants/{tid}/ingesters` | WIRED_SANDBOX | Bearer JWT, API key | Via runtime Endpoints API |
| Create/update endpoint | `POST/PUT /v1/tenants/{tid}/ingesters` | WIRED_SANDBOX | Bearer JWT, API key, tenant scope | See [Endpoints API](../api/endpoints) |
| Read flows | `GET /v1/tenants/{tid}/delivery-flows` | WIRED_SANDBOX | Bearer JWT, API key | Via runtime Flows API |
| Create/update/publish flow | `POST/PUT /v1/tenants/{tid}/delivery-flows` | WIRED_SANDBOX | Bearer JWT, API key, tenant scope | See [Flows API](../api/flows) |
| Read delivery attempts | `GET /v1/tenants/{tid}/deliveries` | WIRED_SANDBOX | Bearer JWT, API key | Via Delivery Attempts API |
| Retry delivery | `POST /v1/tenants/{tid}/events/{eid}/retry` | WIRED_SANDBOX | Bearer JWT, API key, authorization | See [Retry API](../api/retry) |
| Replay event | `POST /v1/tenants/{tid}/deliveries/{did}/replay` | WIRED_SANDBOX | Bearer JWT, API key, retained payload gate | See [Replay API](../api/replay) |
| Manage saved payload templates | `GET/POST/PUT/DELETE /v1/tenants/{tid}/saved-payloads` | WIRED_SANDBOX | Bearer JWT, API key | See [Saved Payloads API](../api/saved-payloads) |
| Manage API keys | `GET/POST/DELETE /v1/tenants/{tid}/api-keys` | WIRED_SANDBOX | Session, API key | See [Authentication](../api/authentication) |
| MCP read tools | Various MCP tools | PUBLIC_CONTRACT_DRAFT | MCP API key, scopes | Default-on read surface |
| MCP write tools | Various MCP tools | PUBLIC_CONTRACT_DRAFT | MCP API key, disabled by default | Requires explicit enablement |

### Read operations

Read endpoints expose operational truth: tenant state, resources, delivery status, evidence, and readiness. Reads are available where the endpoint group maturity permits.

### Write operations

Write-capable endpoints are intentionally explicit. A documented write path is not available to every tenant by default; availability depends on:

- **Endpoint-group maturity** — some groups are WIRED_SANDBOX, others are PLANNED
- **Tenant authorization** — the tenant must own or have permission for the target resource
- **Object-level permissions** — granular access control at the resource level where applicable
- **Plan/capability gates** — some writes require a specific plan tier
- **Contract validation** — writes pass through the same validation as UI/CLI/Git operations
- **Audit logging** — all mutating operations are logged with identity, action, and parameters
- **Idempotency or replay-safety** — where relevant, writes support idempotency keys or replay-safety controls
- **Fail-closed validation** — write requests that fail validation do not partially apply

See the [Write Safety Model](../api/write-safety) for details on authorization, idempotency, audit requirements, and fail-closed behavior.

## What Customer API is not

- Not the internal Dashboard/BFF API
- Not an unrestricted admin API
- Not a bypass around UI/MCP/Git governance
- Not automatically production-live
- Not a claim that every documented write is currently available
- Not the same as sandbox/test APIs

## Endpoint-group maturity

| Endpoint group | Read support | Write support | Current status | Public contract status | Page |
|---|---|---|---|---|---|
| Targets API | Yes | Create, update, delete | WIRED_SANDBOX | Draft | [Targets API](../api/targets) |
| Endpoints API | Yes | Create, update, delete | WIRED_SANDBOX | Draft | [Endpoints API](../api/endpoints) |
| Flows API | Yes | Create, update, delete | WIRED_SANDBOX | Draft | [Flows API](../api/flows) |
| Delivery Attempts API | Yes | No direct public write | WIRED_SANDBOX | Draft | [Delivery Attempts API](../api/delivery-attempts) |
| DLQ API | Yes | No direct DLQ write | WIRED_SANDBOX | Draft | [DLQ API](../api/dlq) |
| Retry API | Read via attempts API | Retry a delivery | WIRED_SANDBOX | Draft | [Retry API](../api/retry) |
| Replay API | Eligibility/context | Replay a delivery | WIRED_SANDBOX | Draft | [Replay API](../api/replay) |
| Saved Payloads API | Yes | Create, update, delete | WIRED_SANDBOX | Draft | [Saved Payloads API](../api/saved-payloads) |
| Evidence API | Yes | No direct write (evidence created by platform) | WIRED_SANDBOX | Draft | [Evidence API](../api/evidence) |
| API Keys API | Yes | Create, revoke | WIRED_SANDBOX | Draft | [Authentication](../api/authentication) |
| Rate Limits API | Documentation only | N/A | PUBLIC_CONTRACT_DRAFT | Draft | [Rate Limits API](../api/rate-limits) |
| MCP | Read tools default-on | Write tools disabled by default | PUBLIC_CONTRACT_DRAFT | Draft | [MCP Overview](../mcp/overview) |
| Billing/Plan API | Internal | Internal | INTERNAL_ONLY | No | — |
| Sandbox/Test API | Sandbox-only | Sandbox-only | SANDBOX_ONLY | No | — |

## Consistency with MCP

Both Customer API and MCP follow the same model:
- Not read-only as a product category
- Read/write status determined at tool/endpoint-group level
- Write operations require explicit authorization, scopes, object-level permissions, audit, idempotency where relevant, and fail-closed validation
- Writes never bypass the same contract validation used by UI/CLI/Git

## Current V1/V1.1 boundaries

| Capability | V1 availability | V1.1 scope |
|---|---|---|
| Customer API contract definition | Documented, PLANNED | Implementation |
| Read operational truth (programmatic) | Planned endpoints | Expanded coverage |
| Write-capable endpoint groups | Via runtime APIs (Targets, Endpoints, Flows, Retry, Replay) | Customer API native endpoints |
| MCP read tools | Default-on | Expanded tool set |
| MCP write tools | Disabled by default, per-tool-group enablement | Refined permission model |
| GitOps as ZCC surface | Not available (V1.1) | Business+ |

## Design principles

- Tenant-scoped: Every request requires authentication and tenant context
- Evidence-backed: Mapped to evidence artifacts where applicable
- Rate-limited: Subject to plan-based rate limits
- Audited: All access logged

## Non-claims

- Not production-live — contract and planned only
- Write availability is endpoint-group-specific, not global
- No compliance certification via API
- No secret or customer data exposure
- Does not replace Dashboard/BFF or MCP surfaces

## Related

- [API Status Matrix](../api/status) — per-group maturity, audience, read/write status
- [API Overview](../api/overview) — all API surface groups
- [Write Safety Model](../api/write-safety) — authorization, idempotency, audit, fail-closed behavior
- [MCP Overview](../mcp/overview) — AI agent control surface

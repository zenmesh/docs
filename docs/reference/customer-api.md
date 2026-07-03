---
sidebar_label: Customer API
---

# Customer API

The Customer API is the planned **read-only programmable interface** for operational truth. It is distinct from the [Dashboard/BFF API](../api/status) and the [MCP surface](../mcp/overview).

## What Customer API means

- External programmable customer contract for reading operational truth.
- Read-only by design (V1 scope).
- Evidence-backed: every endpoint maps to evidence artifacts.

## What it is not

- Not the Dashboard/BFF API (which is app-facing/internal).
- Not the MCP surface (which is a separate AI-agent control surface).
- Not the runtime delivery APIs (targets, endpoints, flows, delivery attempts — those are in the [API Overview](../api/overview) surface groups).

## Current status

- **Contract defined** — see [Customer API v1 contract](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/customer-api-mcp/customer_api_v1_contract.json)
- **Implementation**: not started (planned)
- **Not production-live**

## Intended surfaces

| Endpoint | Description | Status |
|----------|-------------|--------|
| `GET /v1/capabilities` | All capabilities with proof status | planned |
| `GET /v1/runtime/proofs` | Runtime convergence proof ledger | planned |
| `GET /v1/trust/proofs` | Trust lifecycle proof ledger | planned |
| `GET /v1/compliance/mappings` | Compliance framework-to-feature graph | planned |
| `GET /v1/non-claims` | Explicit non-claims registry | planned |
| `GET /v1/evidence/merkle/root` | Merkle root hash for evidence tree | planned |
| `GET /v1/readiness` | Readiness summary across domains | planned |

## Relationship to Dashboard/BFF API

The Dashboard/BFF API (`/api/bff/v1`) exists today for the dashboard UI. It is an **internal app-facing surface**, not a public customer contract. The Customer API will eventually provide a stable, documented, externally consumable contract. Until then, the BFF API may be the only available programmatic surface for some operations.

## Relationship to MCP

The [MCP surface](../mcp/overview) is a separate control surface for AI agents. It has its own auth model, tool set, and safety boundaries. MCP is NOT a subset of the Customer API, nor vice versa. Both produce and consume ZCC artifacts.

## Design principles

- Read-only first: No mutating endpoints in V1
- Tenant-scoped: Every request requires authentication and tenant context
- Evidence-backed: Every endpoint maps to evidence artifacts in `zen-platform`
- Rate-limited: 100 req/min per tenant
- Audited: All access logged

## Non-claims

- Not production-live — contract and planned only
- No mutating operations in V1
- No compliance certification via API
- No secret or customer data exposure
- Does not replace Dashboard/BFF or MCP surfaces

## Related

- [API Status Matrix](../api/status) — per-group maturity, audience, and implementation notes
- [API Overview](../api/overview) — all API surface groups
- [MCP Overview](../mcp/overview) — AI agent control surface

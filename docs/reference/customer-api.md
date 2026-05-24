---
sidebar_label: Customer API
---

# Customer API

The Customer API is the **planned read-only programmable interface** for operational truth.

## Current Status

- **Contract defined** — see [Customer API v1 contract](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/customer-api-mcp/customer_api_v1_contract.json)
- **Implementation**: not started (planned)
- **Not production-live**

## Intended Surfaces

| Endpoint | Description | Status |
|---|---|---|
| `GET /v1/capabilities` | All capabilities with proof status | planned |
| `GET /v1/runtime/proofs` | Runtime convergence proof ledger | planned |
| `GET /v1/trust/proofs` | Trust lifecycle proof ledger | planned |
| `GET /v1/compliance/mappings` | Compliance framework-to-feature graph | planned |
| `GET /v1/non-claims` | Explicit non-claims | planned |
| `GET /v1/evidence/merkle/root` | Merkle root hash for evidence tree | planned |
| `GET /v1/readiness` | Readiness summary across domains | planned |

## Design Principles

- **Read-only first**: No mutating endpoints in v1
- **Tenant-scoped**: Every request requires authentication and tenant context
- **Evidence-backed**: Every endpoint maps to evidence artifacts in `zen-platform`
- **Rate-limited**: 100 req/min per tenant
- **Audited**: All access logged

## Non-Claims

- Not production-live — contract and planned only
- No mutating operations in v1
- No compliance certification via API
- No secret or customer data exposure

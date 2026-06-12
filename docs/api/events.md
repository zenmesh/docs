---
sidebar_label: Events & Evidence API
---

# Events and Evidence API Guide

Zen Mesh provides programmatic access to delivery events and operational evidence through dedicated API endpoints.

## Event Tracking

Every webhook delivery produces events with status transitions:

```
received → validated → filtered → delivered → acked
                      → failed    → dlq_queued → replayed → delivered
```

Events carry correlation IDs for traceability across ingestion, delivery, and acknowledgment.

## Evidence API

The MCP evidence endpoints provide read-only access to operational truth:

| Endpoint | Description |
|----------|-------------|
| `GET /v1/mcp/health` | Service health with build/version metadata |
| `GET /v1/mcp/endpoints` | Available MCP endpoints and their scopes |
| `GET /v1/mcp/evidence/{id}` | Evidence details by endpoint/resource ID |
| `GET /v1/mcp/deliveries/{id}/status` | Delivery status and outcome |
| `GET /v1/mcp/planes` | Operational planes and their status |
| `GET /v1/mcp/logs/{id}` | Resource logs |

See [MCP Overview](../mcp/overview.md) for the full MCP tool surface.

## Capability Evidence

Evidence tools provide structured proof that specific capabilities are implemented:

- `get_capabilities` — List all runtime and trust capabilities with status
- `get_readiness` — Readiness summary across domains
- `list_runtime_proofs` — Runtime convergence proofs (PROOF-001–010)
- `list_trust_proofs` — Trust lifecycle proofs (TRUST-001–010)
- `list_non_claims` — Explicit non-claims organized by category
- `list_merkle_evidence_refs` — Integrity receipt metadata

See [Back API Reference](./api/reference/kubezen-back-api.info.mdx) for generated endpoint documentation.

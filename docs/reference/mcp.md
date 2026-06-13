---
sidebar_label: MCP (Model Context Protocol)
---

# MCP (Model Context Protocol)

The MCP server provides **programmatic access** to Zen Mesh data through the Model Context Protocol.

## Current Status

- **Server implemented** at `src/saas/mcp/` in zen-platform
- **Deployment**: K8s deployment exists but disabled in sandbox (`mcp.enabled: false`)
- **Not production-live**
- **No evidence/proof/readiness tools yet** — existing tools cover API keys, deliveries, webhooks

## Existing Tools

| Tool | Description | Read-Only |
|---|---|---|
| `list_api_keys` | List API keys | ✅ |
| `create_api_key` | Create API key | ❌ |
| `revoke_api_key` | Revoke API key | ❌ |
| `list_deliveries` | List deliveries | ✅ |
| `get_delivery` | Get delivery details | ✅ |
| `list_webhooks` | List webhooks | ✅ |
| `get_webhook` | Get webhook details | ✅ |
| `get_delivery_stats` | Get delivery statistics | ✅ |

## Proposed Evidence Tools

| Tool | Description | Status |
|---|---|---|
| `get_runtime_status` | Runtime convergence overview | planned |
| `get_trust_proof` | Trust proof by ID | planned |
| `get_compliance_mapping` | Compliance framework mappings | planned |
| `explain_non_claims` | Non-claims by category | planned |
| `summarize_readiness` | Readiness summary | planned |

## Intended Resources

| URI | Description | Status |
|---|---|---|
| `zen://capabilities` | All capabilities with proof status | planned |
| `zen://runtime/proofs` | Runtime proof ledger | planned |
| `zen://trust/proofs` | Trust proof ledger | planned |
| `zen://compliance/map` | Compliance feature graph | planned |
| `zen../ai/evidence-v1-supersession.md#non-claims` | Non-claims by category | planned |
| `zen://readiness` | Readiness and blocker summary | planned |

## Design Principles

- **Read-only for evidence tools**: Proposed tools are read-only
- **Rate-limited**: 50 req/s, burst 100
- **Database-backed**: Uses persistent storage
- **Tenant-scoped**: API key authentication required

## Non-Claims

- Not production-live — disabled in sandbox
- Evidence tools are planned — not yet implemented
- Existing mutating tools (create/revoke API key) preserved but out of evidence scope
- No compliance certification via MCP

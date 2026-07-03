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

| Tool | Description | Read/Write | Access |
|---|---|---|---|
| `list_api_keys` | List API keys | Read | Default |
| `create_api_key` | Create API key | Write | Explicit enablement required |
| `revoke_api_key` | Revoke API key | Write | Explicit enablement required |
| `list_deliveries` | List deliveries | Read | Default |
| `get_delivery` | Get delivery details | Read | Default |
| `list_webhooks` | List webhooks | Read | Default |
| `get_webhook` | Get webhook details | Read | Default |
| `get_delivery_stats` | Get delivery statistics | Read | Default |

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

- **Default-on for evidence read tools**: Evidence read tools are available on the default surface; write tools require explicit enablement
- **Rate-limited**: 50 req/s, burst 100
- **Database-backed**: Uses persistent storage
- **Tenant-scoped**: API key authentication required

## Non-Claims

- Not production-live — disabled in sandbox
- Evidence read tools are planned — not yet implemented
- Write tools require explicit enablement and are not available on the default surface
- Existing write tools (create/revoke API key) require explicit enablement
- No compliance certification via MCP

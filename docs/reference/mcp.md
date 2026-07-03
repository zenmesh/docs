---
sidebar_label: MCP (Model Context Protocol)
---

# MCP (Model Context Protocol)

> Status: PUBLIC_CONTRACT_DRAFT. MCP tools carry individual status. Not a production-live claim.

The MCP server provides programmatic access to Zen Mesh capabilities through the Model Context Protocol. It is designed for AI agents, operators, and internal tooling. MCP is not read-only as a category — read and write tools exist, with write tools disabled by default.

## Current Status

- Read tools are default-on in V1
- Write tools are disabled by default, must be explicitly enabled per tool group
- Server is WIRED_SANDBOX, not production-live
- See [MCP Overview](../mcp/overview) for full documentation

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

## Design Principles

- **Default-on for read tools**: Read tools are available on the default surface; write tools require explicit enablement
- **Rate-limited**: Subject to plan-based limits
- **Tenant-scoped**: API key authentication required
- **Audited**: All accesses logged

## Non-Claims

- Not production-live
- Write tools require explicit enablement and are not available on the default surface
- Write tools may be Business+ gated per V1 policy
- No compliance certification via MCP
- Evidence read tools: see [MCP Overview](../mcp/overview) for current tool availability

## Related

- [MCP Overview](../mcp/overview) — full documentation
- [MCP V1 Policy](../mcp/read-only-v1-policy) — read/write model, default-off
- [MCP Safety and Boundaries](../mcp/safety-and-boundaries) — auth, gating, isolation

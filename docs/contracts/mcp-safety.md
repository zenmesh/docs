---
sidebar_label: MCP Safety
description: MCP safety model — current read-only state, future channel-aware model, boundaries, and non-claims. No live MCP write claim.
---

# MCP Safety

> **MCP (Model Context Protocol) safety and permissions model.**

## Current MCP State (V1)

MCP is **read-only and draft-safe**. It does not directly mutate production:

- MCP tools query delivery status, evidence, and metadata — read-only
- MCP can create endpoint drafts, but apply is exclusively human (403 MCP_CANNOT_APPLY)
- MCP calls `zen-back` — no direct database access
- MCP authentication uses `mcp_` prefixed API keys
- All MCP tool calls are logged with tool name, scope, and parameters

See [MCP Read-Only V1 Policy](/docs/mcp/read-only-v1-policy) and [MCP Draft System](/docs/mcp/draft-system).

## Future MCP Read/Write Model

A future iteration may introduce channel-aware permissions for MCP read/write access. If implemented:

- **Controlled by channel permissions** — MCP write requires explicit channel permission
- **Label-scoped** — MCP access is narrowed by label selectors (e.g., `env=dev` only)
- **Replay/request integrity** — MCP write operations verify request authenticity
- **Audit** — every MCP write is logged with identity, scope, and target
- **Approvals** — high-risk MCP operations may require human approval
- **No direct DB** — MCP continues to call `zen-back` only

## MCP Apply Is Not Live

**MCP cannot apply drafts now or in the near future.** The apply path:
1. Requires separate explicit channel permission (future)
2. Requires human review and approval (by default)
3. Produces audit evidence
4. Is 403-rejected for MCP credentials in V1

This is not a temporary limitation — it is a governance design.

## Current Boundary

| Capability | V1 Status |
|-----------|-----------|
| Read delivery status | Yes |
| Read evidence | Yes |
| List resources | Yes |
| Create endpoint drafts | Yes (human must apply) |
| Apply drafts | No (403) |
| Mutate routes | No |
| Write to production | No |
| Direct database access | No |

## Non-Claims

- MCP write/apply is not live — available as a contract/design direction, not a launch claim
- No MCP compliance certification
- MCP evidence tools are read-only
- No guarantee of MCP future features — contract/design only

## See Also

- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design
- [API Safety](/docs/contracts/api-safety) — API-specific safety model
- [MCP Read-Only V1 Policy](/docs/mcp/read-only-v1-policy) — V1 read-only scope
- [MCP Draft System](/docs/mcp/draft-system) — draft governance

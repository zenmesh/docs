---
sidebar_label: Safety and Boundaries
---

# MCP Safety and Boundaries

## Communication Model

All MCP tool calls pass through zen-back. There is no direct database access from the MCP layer. Every request is authenticated, authorized, and logged.

## Authentication

- All MCP requests require a valid API key with appropriate tenant scope
- Connections use mTLS for transport-layer security
- API keys are scoped to specific operations; write scopes require explicit enablement

See [Authentication and mTLS](./authentication-and-mtls.md) for details.

## Tool Execution Model

1. Agent sends a tool call request
2. MCP proxy validates authentication and tenant scope
3. zen-back executes the read operation against the platform database
4. Response is returned to the agent
5. Every call is logged with agent identity, tool name, parameters, and timestamp

## Write Operation Model

Write operations are available in V1 but are **disabled by default**. An operator must explicitly enable each write tool group before it becomes available:

- Write tools pass through the same validation chain as API/UI/CLI writes
- All write operations require tenant authorization, appropriate scopes, and audit logging
- Any attempt to call a write operation for a disabled tool group is rejected at the MCP proxy layer
- The agent receives a clear error response explaining which tool group must be activated

Write tools that are enabled follow the same contract validation, object-level permissions, and audit requirements as REST API writes. See the [Write Safety Model](../api/write-safety) for details.

## Data Isolation

- Each agent operates within its tenant scope
- Cross-tenant data access is prevented by Row-Level Security (RLS) at the database layer
- Evidence and logs are scoped to the authenticated tenant

## No Autonomous Action

MCP agents cannot independently commit write operations to production. Write tools are disabled by default and, when enabled, follow the same authorization, validation, and audit requirements as REST API writes. The MCP server enforces per-tool-group gating, tenant boundaries, and fail-closed validation on all write paths.

## Draft System Apply Boundary

The [Draft System](./draft-system) extends MCP with the ability to propose infrastructure changes, but **apply remains exclusively human**:

- MCP agents can create drafts, list drafts, show draft details, and discard drafts
- MCP agents **cannot** apply drafts — the apply API rejects MCP authentication with `403 MCP_CANNOT_APPLY`
- Apply requires explicit human identity (`X-User-Id` header) and is only available through the CLI or web UI
- Drafts never mutate production resources until a human applies them
- The MCP surface has no apply tool, no apply route, and no write-to-production scope

This boundary is enforced at the API layer and verified by governance validation. It is a deliberate design choice — AI proposes, humans decide.

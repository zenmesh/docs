---
sidebar_label: Safety and Boundaries
---

# MCP Safety and Boundaries

## Communication Model

All MCP tool calls pass through zen-back. There is no direct database access from the MCP layer. Every request is authenticated, authorized, and logged.

## Authentication

- All MCP requests require a valid API key with appropriate tenant scope
- Connections use mTLS for transport-layer security
- API keys are scoped to read-only operations

See [Authentication and mTLS](./authentication-and-mtls.md) for details.

## Tool Execution Model

1. Agent sends a tool call request
2. MCP proxy validates authentication and tenant scope
3. zen-back executes the read operation against the platform database
4. Response is returned to the agent
5. Every call is logged with agent identity, tool name, parameters, and timestamp

## Write Operation Denial

Any attempt to call a write operation (event submission, configuration change) is rejected at the MCP proxy layer before reaching the database. The agent receives a clear error response explaining that write operations are not available in V1.

## Data Isolation

- Each agent operates within its tenant scope
- Cross-tenant data access is prevented by Row-Level Security (RLS) at the database layer
- Evidence and logs are scoped to the authenticated tenant

## No Autonomous Action

MCP agents cannot independently submit events, modify sources, or change platform configuration. All tools are read-only. The MCP server acts as a query interface, not a control plane.

---
sidebar_label: MCP Overview
---

# MCP (Model Context Protocol) Overview

The Zen Mesh MCP server provides programmatic access to Zen Mesh capabilities through the Model Context Protocol. It is designed for AI agents, operators, and internal tooling. MCP is not read-only as a category — read and write tools exist, with write tools disabled by default. See [How Zen Works](../start-here/how-zen-works) for the full mental model.

## Current Status

- **Server**: Implemented at `src/saas/mcp/` in `zen-platform-hermes`
- **Surface**: Read tools (default-on); write tools (disabled by default, require explicit enablement)
- **Admin tools**: API key management (2 tools, not on default surface)
- **Authentication**: MCP API key (`mcp_` prefix)
- **Deployment**: K8s deployment available (disabled in sandbox, P098)
- **Not production-live**

## Tool Surface

The MCP server exposes tools with per-tool-group access control:

| Category | Count | Access |
|----------|-------|--------|
| Read tools (operational truth) | 13 | Default surface |
| Write/admin tools | 2+ | Requires explicit enablement |

See [MCP Tools Reference](./tools.md) for full tool descriptions and schemas.

## Draft System

The [MCP Draft System](./draft-system) enables agents to propose infrastructure changes as drafts that require human review and approval before taking effect. Agents can create endpoint drafts; apply is exclusively human. This provides a controlled write path for infrastructure proposals while preserving a human-in-the-loop governance model.

## Use Cases

- **AI agents**: Query delivery status, list webhooks, check evidence
- **Operators**: Get runtime convergence proofs, trust lifecycle status
- **Integrations**: Automate webhook health checks and delivery verification

## Connections

- **Backend**: Real HTTP calls to `zen-back` (no mock data)
- **Auth**: MCP API key validated at MCP handler + zen-back scope middleware
- **Audit**: All tool calls are logged with tool name, scope, and parameters

## Non-Claims

- Not production-live — sandbox disabled per P098
- Read tools are default-on; write tools require explicit enablement
- Write tools are disabled by default and must be explicitly enabled per tool group
- Merkle receipts are integrity-only — not auth, identity, encryption, or delivery guarantee
- No compliance certification via MCP

---
sidebar_label: MCP Overview
---

# MCP (Model Context Protocol) Overview

The Zen Mesh MCP server provides programmatic read-only access to platform data through the Model Context Protocol. It is designed for AI agents, operators, and internal tooling.

## Current Status

- **Server**: Implemented at `src/saas/mcp/` in `zen-platform-hermes`
- **Surface**: Read-only operational truth (13 tools)
- **Admin tools**: API key management (2 tools, not on default surface)
- **Authentication**: MCP API key (`mcp_` prefix)
- **Deployment**: K8s deployment available (disabled in sandbox, P098)
- **Not production-live**

## Tool Surface

The MCP server exposes two tool categories:

| Category | Count | Access |
|----------|-------|--------|
| Read-only operational truth | 13 | Default surface |
| Admin/mutation | 2 | Requires explicit auth elevation |

See [MCP Tools Reference](./tools.md) for full tool descriptions and schemas.

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
- Evidence tools are read-only — no mutating operations on default surface
- Merkle receipts are integrity-only — not auth, identity, encryption, or delivery guarantee
- No compliance certification via MCP

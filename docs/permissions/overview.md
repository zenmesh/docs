# Permissions Overview

> **Status:** Design/contract. Not runtime-proven. Permission-axis runtime-live claims are false.

Zen Mesh provides a permission model across API, UI, and MCP channels.

## Permission Channels

| Channel | Read | Apply (Write) | Status |
|---------|------|---------------|--------|
| API | Yes | Yes | Design/contract |
| UI | Yes | Review + apply path | Design/contract |
| MCP | Yes (scoped) | No — proposal-only | Current: read/scoped |

## Key Concepts

- **Proposed vs Applied:** Changes go through a proposal → review → apply workflow
- **Environment scoping:** Permissions can be scoped per environment (e.g., allow MCP for `env=dev`, deny for `env=prod`)
- **Evidence reader role:** API-accessible evidence read without apply permissions

## Important

- MCP apply-live claims are false. MCP is currently read/scoped only.
- Permission-axis runtime-live claims are false.
- Future MCP RW contract is planned but not implemented.

## Related

- [MCP Overview](../mcp/overview) — Current MCP capabilities
- [API Overview](../api/overview) — API access model

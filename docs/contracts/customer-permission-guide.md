---
sidebar_label: Customer Permission-Axis Guide
description: Customer-facing guide to UI/API/MCP permission channels — how they reduce risk, what each channel does, and how to design safe access.
---

# Customer Permission-Axis Guide

> **Guide to UI, API, and MCP permission channels.**
>
> Zen Mesh lets you scope permissions by access channel — UI, API, or MCP — in addition to labels and users/groups. This guide explains why channel-awareness reduces risk and how to design safe access.

## Why Separate Channels?

A single compromised credential should not give an attacker full access. If your MCP key is leaked, it should not be able to modify production routes. If your UI session is hijacked, it should not give API programmatic access.

Channel-aware permissions solve this:

- Each channel (UI, API, MCP) has its own permission scope
- A user can have admin access via UI but read-only via API
- A group can have full access to `env=dev` via MCP but zero access to `env=prod`
- Labels further constrain where each channel's permissions apply

## The Three Channels

| Channel | What It Controls | Best For |
|---------|-----------------|----------|
| **UI** | Web dashboard access | Human operators, configuration, approvals |
| **API** | REST API access | Service accounts, CI/CD, programmatic access, evidence export |
| **MCP** | Model Context Protocol (AI agent) access | Automated delivery checks, dev-environment operations |

## Example: MCP Dev-Only

Allow MCP agents to manage delivery for development resources:

```yaml
group: dev-agents
channel: mcp
scope:
  zen-mesh.io/env: dev
permissions:
  - routes:read
  - delivery:read
```

## Example: MCP Denied for Production

Block MCP agents from production resources:

```yaml
group: dev-agents
channel: mcp
deny:
  scopes:
    - zen-mesh.io/env: prod
```

## Example: API Read-Only Evidence

Allow API keys to read evidence without mutating routes:

```yaml
group: api-readers
channel: api
permissions:
  - evidence:read
  - delivery:read
```

## Example: UI Admin Only

Keep full admin access limited to the UI channel:

```yaml
group: admins
channel: ui
permissions:
  - "*":admin
```

## How to Design Safe Access

1. **Start with the principle of least privilege** — give only the permissions needed
2. **Scope by channel** — restrict MCP and API to read-only where possible
3. **Scope by label** — use labels like `env=dev`, `team=payments` to narrow scope
4. **Use deny rules** — explicitly block channels from sensitive label scopes
5. **Audit everything** — permission changes are logged with before/after state

## Current State

Channel-aware permissions are a **design contract** — the architecture and behavior are defined, but runtime implementation may not yet enforce every future permission-axis behavior. See [Permission Channels Contract](/docs/contracts/permission-channels) for the current design.

- UI and API have existing permission enforcement
- MCP is read-only and draft-safe (no write to production)
- Full UI/API/MCP channel separation is planned

## See Also

- [Admin Permission-Axis Guide](/docs/contracts/admin-permission-guide) — designing permissions for your team
- [Group RBAC/ABAC Guide](/docs/contracts/group-rbac-abac) — groups, users, and label-scoped roles
- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design
- [MCP Safety](/docs/contracts/mcp-safety) — MCP-specific safety model
- [API Safety](/docs/contracts/api-safety) — API-specific safety and scoping

---
sidebar_label: Permission Channels Contract
description: Channel-aware permissions — UI, API, and MCP as first-class permission axes scoped by labels, users, and groups. Contract/design only.
---

# Permission Channels Contract

> **Contract — channel-aware permission axes for UI, API, and MCP.**
>
> This page defines the design for treating UI, API, and MCP as first-class permission channels. Every permission can be scoped by channel/context, with labels and users/groups. This is contract/design only — not yet implemented.

## Overview

Every permission in Zen Mesh can be scoped by **channel** — UI, API, or MCP — in addition to existing label and user/group scoping. This means:

- A user can have write access via UI but read-only via API
- A group can have full access to `env=dev` resources via MCP but no access to `env=prod`
- An API key can be restricted to MCP read-only for specific label scopes

## Permission Axes

```
Permission = Channel + Action + Scope
```

| Axis | Values | Description |
|------|--------|-------------|
| **Channel** | `ui`, `api`, `mcp` | How the action is performed |
| **Action** | `read`, `write`, `admin` | What operation is allowed |
| **Scope** | Label selectors, user/group, tenant | Where the action applies |

### Channel Definitions

| Channel | Access Method | Authentication | Notes |
|---------|---------------|----------------|-------|
| **UI** | Web dashboard | Session auth (OIDC) | Full feature surface |
| **API** | REST API | API key (`zen_` prefix) | Programmatic access |
| **MCP** | Model Context Protocol | MCP API key (`mcp_` prefix) | AI agent access |

## Channel Permission Examples

### Basic Channel Scoping

**Allow MCP to manage delivery for `env=dev`:**

```yaml
group: dev-agents
channel: mcp
scope:
  zen-mesh.io/env: dev
permissions:
  - routes:read
  - delivery:read
```

**Deny MCP for `env=prod`:**

```yaml
group: prod-agents
channel: mcp
deny:
  scopes:
    - zen-mesh.io/env: prod
```

**Allow API read-only for all resources:**

```yaml
group: api-readers
channel: api
permissions:
  - "*":read
```

**UI owner/admin defaults:**

```yaml
group: admins
channel: ui
permissions:
  - "*":admin
```

### Combined Channel Examples

**User-level channel permissions:**

```yaml
user: alice
channels:
  ui:
    permissions: ["*:admin"]
  api:
    permissions: ["*:read"]
  mcp:
    permissions: []
```

**Group-level with label scoping across channels:**

```yaml
group: payments-team
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      team: payments
  api:
    permissions: ["*:write"]
    scope:
      team: payments
  mcp:
    permissions: ["routes:read", "delivery:read"]
    scope:
      team: payments
      zen-mesh.io/env: dev
```

## Defaults Per User and Group

| Context | UI Default | API Default | MCP Default |
|---------|-----------|-------------|-------------|
| **New user** | Inherits from group(s) | Inherits from group(s) | None by default |
| **New API key** | N/A | Inherits from creating user's API scope | N/A |
| **New MCP key** | N/A | N/A | None by default; must be explicitly granted |
| **Group without channel config** | Full group permissions apply to UI | Full group permissions apply to API | No MCP access |
| **Group with channel config** | Overridden by UI channel block | Overridden by API channel block | Overridden by MCP channel block |

**Rules:**
- Defaults are visible in the permission editor.
- All defaults are overrideable.
- All default changes are audited.
- Label scoping always applies — even without explicit channel configuration.

## Risk Model

Channel-aware permissions let users choose access based on risk:

| Channel | Blast Radius | Risk Profile | Notes |
|---------|-------------|--------------|-------|
| **UI** | Session-scoped | Moderate | Requires browser session + OIDC |
| **API** | Key-scoped | Moderate | Key can be rotated; programmable |
| **MCP** | Agent-scoped | Higher | AI agents may be compromised |

**Blast radius reduction strategies:**
- Labels limit the scope of any permission to specific resources
- Channel separation means a compromised MCP key cannot modify resources via UI or API
- Deny rules for specific label scopes (e.g., deny MCP for `env=prod`)
- Audit logging across all channels

## Current vs Future State

### Current State (V1)

| Channel | Capability | Status |
|---------|-----------|--------|
| **UI** | Full admin/read/write | Live |
| **API** | Full CRUD via REST | Live |
| **MCP** | Read-only operational truth | Live |
| **MCP Drafts** | Agent-created endpoint drafts; human-only apply | Live |
| **Channel-aware permissions** | Not implemented | Design |

### Future State (Post-V1)

| Capability | Status |
|-----------|--------|
| UI/API/MCP as permission axes | Planned |
| Label-scoped channel permissions | Planned |
| API key scoping to specific channel | Planned |
| MCP apply with explicit channel permission | Not before runtime implementation |
| MCP write beyond drafts | Not before runtime implementation |

### Guardrails

The MCP boundary remains read/scoped and draft-safe unless runtime implementation proves otherwise:

- MCP apply must not be claimed live — no production MCP write
- Proposed change and applied change remain separate — apply is always a separate, explicit, audited step
- Channel-aware permissions are a design contract, not a runtime claim

## Draft Governance

### Proposal vs Apply Separation

Drafts can be proposed by humans and AI through UI, API, or MCP — depending on future channel permission configuration. Apply is always a separate step.

| Action | UI | API | MCP |
|--------|----|-----|-----|
| **Propose draft** | Yes (V1) | Yes (V1) | Yes (V1 — limited to endpoints) |
| **View drafts** | Yes (V1) | Yes (V1) | Yes (V1) |
| **Discard draft** | Yes (V1) | Yes (V1) | Yes (V1) |
| **Apply draft** | Yes (V1 — human) | Yes (V1 — human) | No (V1 — 403 MCP_CANNOT_APPLY) |
| **Apply comment/annotate** | Planned | Planned | Planned |

### Governance Properties

- **Proposed change:** Always reversible, no production impact
- **Applied change:** Irreversible (except via revert), requires explicit authorization
- **Evidence:** Each lifecycle event produces separate evidence artifacts
- **Human review:** Preserved by default; configuration can require human review for specific channels

### Permission Editor UI Spec

The admin permission editor should show:

```
┌──────────────────────────────────────────────────┐
│  Channel Access          │ Scope (labels)          │
├──────────────────────────────────────────────────┤
│  ☑ UI  ☐ Read  ☐ Write  ☑ Admin │ team=payments      │
│  ☐ API ☑ Read  ☐ Write  ☐ Admin │ team=payments      │
│  ☐ MCP ☑ Read  ☐ Write  ☐ Admin │ [Label selector...] │
├──────────────────────────────────────────────────┤
│  [Deny MCP for scope...]                         │
│  ┌──────────────────────────────────────────┐    │
│  │ zen-mesh.io/env: prod                    │    │
│  └──────────────────────────────────────────┘    │
│  [+ Add deny rule]                                │
├──────────────────────────────────────────────────┤
│  Save  Cancel  [Preview effective permissions]    │
└──────────────────────────────────────────────────┘
```

**Form behavior:**
- Channel checkboxes enable/disable the channel row
- Within each channel, action radio buttons (Read / Write / Admin)
- Label selector is a multi-input with autocomplete from existing labels
- Deny rules are additive — label scopes where the channel is blocked
- "Preview effective permissions" shows the resolved permission set for the user/group
- All changes are audit-logged with before/after diff

### UI Risk Hints

The editor should show visual risk hints:

| Condition | Hint |
|-----------|------|
| MCP write + `env=prod` scope | ⚠ Warning: MCP has write access to production resources |
| API channel with `admin` action | ⚠ Warning: API key has admin scope |
| Empty scope (no label constraints) | ⚠ Warning: No label scoping — wide blast radius |
| User override active | ℹ Info: User override active |
| Group defaults apply (no channel config) | ℹ Info: Group defaults apply |

### Search Intent Keywords

These headings are not visible in the rendered page but provide search discoverability:

`MCP permissions` `API permissions` `UI permissions` `channel-aware RBAC` `label-scoped MCP` `webhook permission templates` `proposed vs applied changes` `safe MCP write access` `webhook admin permissions` `audit-ready permission changes`

## Cross-Links

- [Labels Platform](/docs/guides/labels) — label-based RBAC/ABAC foundation
- [MCP Overview](/docs/mcp/overview) — current MCP read-only surface
- [MCP Read-Only V1 Policy](/docs/mcp/read-only-v1-policy) — explicit V1 scope
- [MCP Draft System](/docs/mcp/draft-system) — draft governance model
- [API Authentication](/docs/api/authentication) — API key types and scopes
- [Tenant Isolation](/docs/security/tenant-isolation) — multi-tenant scoping
- [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) — validation gates
- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — remaining launch blockers
- [Public Trust FAQ](/docs/contracts/public-trust-faq) — trust claims FAQ

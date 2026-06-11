---
sidebar_label: Admin Permission-Axis Guide
description: Admin guide to designing channel-aware permissions — defaults, overrides, label constraints, blast radius reduction, and audit.
---

# Admin Permission-Axis Guide

> **Guide for administrators designing channel-aware permissions.**

## Designing Permissions for Users

Each user gets permissions from:
1. **Group membership** — inherits all permissions from groups they belong to
2. **User-level overrides** — explicit permissions that override group defaults

### User-Level Example

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

Alice can do everything in the UI, read-only via API, and nothing via MCP.

## Designing Permissions for Groups

Groups define the baseline. Users inherit from their groups. Group-level channel configuration overrides the default permission model.

### Group-Level Example

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

This group gets admin via UI, write via API, and read-only dev MCP access — all scoped to the payments team's resources.

## How Defaults Work

| Context | UI Default | API Default | MCP Default |
|---------|-----------|-------------|-------------|
| **New user** | Inherits from group(s) | Inherits from group(s) | None by default |
| **New API key** | N/A | Inherits from creating user's API scope | N/A |
| **New MCP key** | N/A | N/A | None by default |
| **Group without channel config** | Full group permissions apply | Full group permissions apply | No MCP access |

## How Overrides Work

- User-level overrides **add to** group permissions — they do not replace them
- Deny rules (e.g., deny MCP for `env=prod`) are **subtractive** — they remove access
- Overrides are explicit and must be saved — no silent overrides
- All overrides are audit-logged

## Label Constraints

Labels narrow the blast radius of any permission:

```yaml
scope:
  team: payments
  zen-mesh.io/env: dev
```

This permission only applies to resources labeled `team=payments` AND `zen-mesh.io/env=dev`. Any resource without matching labels is invisible to this permission.

**Common label scopes:**
- `zen-mesh.io/env=dev` — development resources
- `zen-mesh.io/env=prod` — production resources
- `team=payments` — team-affiliated resources
- `provider=stripe` — Stripe-specific resources

## Audit

Every permission change is logged:
- Who changed it
- What channel was affected
- Before and after state
- Timestamp
- Reason (if provided)

Admins can review the audit log to detect unexpected permission changes.

## Avoiding Broad MCP/API Access

| Risk | Mitigation |
|------|-----------|
| MCP key leak affects production | Deny MCP for `env=prod` scopes |
| API key leak allows route mutation | Restrict API to read-only where mutation is not needed |
| UI session hijack gives programmatic access | Keep API scope separate from UI scope |
| Group permissions are too broad | Apply label constraints to groups |

## See Also

- [Customer Permission-Axis Guide](/docs/contracts/customer-permission-guide) — plain-language overview
- [Group RBAC/ABAC Guide](/docs/contracts/group-rbac-abac) — groups, users, and label-scoped roles
- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design
- [Policy Templates](/docs/contracts/policy-templates) — ready-to-use permission templates

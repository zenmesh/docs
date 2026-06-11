---
sidebar_label: Group RBAC/ABAC Guide
description: Group-based RBAC/ABAC with channel-aware permissions — how users inherit from groups, label scoping, overrides, and constraints.
---

# Group RBAC/ABAC Guide

> **Groups, users, and label-scoped roles for channel-aware permissions.**

## How Groups Work

Groups receive roles and policies. Users inherit permissions from their groups. This is the primary model for managing access at scale.

```
User ── belongs to ──> Group ── has ──> Channel permissions + Label scopes
```

### Group Inheritance

- A user can belong to multiple groups
- Permissions from all groups are combined (union)
- Deny rules from any group are respected (intersection of allowed minus denied)
- User-level overrides add to the union

### User-Level Overrides

User overrides are explicit and audited. They are useful for:
- Temporary access grants
- Individual exceptions
- Emergency break-glass access

```yaml
user: bob
channels:
  ui:
    permissions: ["routes:write"]
    scope:
      zen-mesh.io/env: prod
    reason: "Production incident response — expires 2026-07-01"
    audit: true
```

## Label Scoping Examples

Labels constrain where permissions apply.

### Environment Scoping

```yaml
group: developers
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      zen-mesh.io/env: dev
  mcp:
    permissions: ["*:read"]
    scope:
      zen-mesh.io/env: dev
```

Developers get full admin in `dev` and no access to `prod`.

### Team Scoping

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
    permissions: []
```

Team members can manage their own resources only.

### Provider Scoping

```yaml
group: stripe-managers
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      provider: stripe
```

### Route Type Scoping

```yaml
group: fanout-ops
channels:
  ui:
    permissions: ["routes:read", "routes:write"]
    scope:
      route_type: fanout
```

## Label Constraints

- Labels are **case-sensitive** — `Team=payments` and `team=payments` are different
- Label keys must start with a letter or number
- Reserved namespace: `zen-mesh.io/*` — customers cannot create/update/delete these
- Forbidden namespace: `zen/*` — do not use the bare `zen/` prefix
- System labels like `zen-mesh.io/env` are available but optional
- Label count per resource is limited by plan

## Audit

- All group changes are logged
- All user overrides are logged
- All label scope changes are logged
- Audit log includes: who, what channel, before scope, after scope, timestamp, reason

## See Also

- [Labels Platform](/docs/guides/labels) — full label reference
- [Customer Permission-Axis Guide](/docs/contracts/customer-permission-guide) — plain-language overview
- [Admin Permission-Axis Guide](/docs/contracts/admin-permission-guide) — designing permissions
- [Policy Templates](/docs/contracts/policy-templates) — ready-to-use templates

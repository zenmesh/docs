---
sidebar_label: Policy Templates
description: Ready-to-use permission templates for Free owner, Pro owner, developer, support observer, CI, MCP dev-only, API evidence-reader, payments manager, break-glass reviewer, object-store manager.
---

# Policy Templates

> **Template permission configurations — confirm runtime implementation before use.**
>
> These templates are design references, not runtime guarantees. Adapt label scopes and channel permissions to your environment.

## Free Owner Safe Defaults

```yaml
group: free-owners
channels:
  ui:
    permissions: ["*:admin"]
  api:
    permissions: ["*:read"]
  mcp:
    permissions: []
scope:
  # Free plan: limited resources, no MCP access
```

**Template/design — confirm runtime implementation before launch.**

## Pro Owner Defaults

```yaml
group: pro-owners
channels:
  ui:
    permissions: ["*:admin"]
  api:
    permissions: ["*:write"]
  mcp:
    permissions: ["evidence:read", "delivery:read"]
    scope:
      zen-mesh.io/env: dev
```

**Template/design — confirm runtime implementation before launch.**

## Developer Group

```yaml
group: developers
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      zen-mesh.io/env: dev
  api:
    permissions: ["*:write"]
    scope:
      zen-mesh.io/env: dev
  mcp:
    permissions: ["*:read"]
    scope:
      zen-mesh.io/env: dev
```

**Template/design — confirm runtime implementation before launch.**

## Support Observer

```yaml
group: support-observers
channels:
  ui:
    permissions: ["delivery:read", "evidence:read"]
    scope: {}
  api:
    permissions: ["delivery:read", "evidence:read"]
    scope: {}
  mcp:
    permissions: []
```

**Template/design — confirm runtime implementation before launch.**

## CI / Service Account

```yaml
group: ci-service
channels:
  api:
    permissions: ["evidence:read", "delivery:read"]
    scope: {}
  ui:
    permissions: []
  mcp:
    permissions: []
```

**Template/design — confirm runtime implementation before launch.**

## MCP Dev-Only Operator

```yaml
group: mcp-dev-ops
channels:
  mcp:
    permissions: ["routes:read", "routes:write", "delivery:read"]
    scope:
      zen-mesh.io/env: dev
    deny:
      scopes:
        - zen-mesh.io/env: prod
  ui:
    permissions: []
  api:
    permissions: []
```

**Template/design — confirm runtime implementation before launch.**

## API Evidence-Reader

```yaml
group: api-evidence-readers
channels:
  api:
    permissions: ["evidence:read"]
    scope: {}
  ui:
    permissions: ["evidence:read"]
    scope: {}
  mcp:
    permissions: []
```

**Template/design — confirm runtime implementation before launch.**

## Payments Team Stripe Manager

```yaml
group: stripe-managers
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      team: payments
      provider: stripe
  api:
    permissions: ["*:write"]
    scope:
      team: payments
      provider: stripe
  mcp:
    permissions: ["delivery:read"]
    scope:
      team: payments
      provider: stripe
      zen-mesh.io/env: dev
```

**Template/design — confirm runtime implementation before launch.**

## Production Break-Glass Reviewer

```yaml
user: oncall-admin
channels:
  ui:
    permissions: ["*:admin"]
    scope:
      zen-mesh.io/env: prod
    reason: "Production incident response"
    expires: "2026-07-01"
audit: true
```

**Template/design — confirm runtime implementation before launch.**

## Label-Scoped Object-Store Fan-Out Manager

```yaml
group: fanout-managers
channels:
  ui:
    permissions: ["routes:read", "routes:write"]
    scope:
      route_type: fanout
  api:
    permissions: ["routes:read"]
    scope:
      route_type: fanout
  mcp:
    permissions: []
```

**Template/design — confirm runtime implementation before launch.**

## See Also

- [Customer Permission-Axis Guide](/docs/contracts/customer-permission-guide) — plain-language overview
- [Admin Permission-Axis Guide](/docs/contracts/admin-permission-guide) — designing permissions
- [Group RBAC/ABAC Guide](/docs/contracts/group-rbac-abac) — groups, users, and label-scoped roles
- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design

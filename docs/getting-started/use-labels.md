---
sidebar_label: Use Labels
description: Organize sources, targets, and routes with key-value labels for filtering, RBAC, and team scoping.
---

# Use Labels to Organize Resources

Labels are key-value pairs that attach metadata to sources, targets, and routes. They help you organize resources at scale, filter in the dashboard and API, and power access control policies.

## What Labels Look Like

A label is a `key: value` pair:

```
team: payments
environment: production
project: stripe-integration
```

## Adding Labels

### Via the Dashboard

When creating or editing any resource (source, target, route), you'll see a **Labels** section:

```
Labels
─────────────────────────────────
Key:   team              │
Value: payments          │  [+]
─────────────────────────────────
Key:   environment       │
Value: production        │  [+]
─────────────────────────────────
```

### Via the API

```bash
curl -X POST "https://api.zen-mesh.io/v1/sources" \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "stripe-prod",
    "type": "generic_http",
    "labels": {
      "team": "payments",
      "environment": "production",
      "cost-center": "infra-42"
    }
  }'
```

## Filtering by Labels

### Dashboard

Use the filter bar at the top of any resource list:

```
Filter: team:payments
```

This shows only resources with `team = payments`.

### API

```bash
curl "https://api.zen-mesh.io/v1/sources?label_filter=team%3Dpayments"
```

Multiple filters combine with AND:

```bash
curl "https://api.zen-mesh.io/v1/routes?label_filter=team%3Dpayments&label_filter=environment%3Dproduction"
```

## Label Policy Examples

### Team-Scoped

Each team uses labels to isolate their resources:

| Label | Value | Used By |
|-------|-------|---------|
| `team` | `payments` | Payments team |
| `team` | `notifications` | Notifications team |
| `team` | `analytics` | Data team |

### Project-Scoped

Within a team, projects can be separated:

| Label | Value |
|-------|-------|
| `team` | `payments` |
| `project` | `checkout` |
| `project` | `billing` |

### Environment-Scoped

Separate staging and production:

| Label | Value |
|-------|-------|
| `environment` | `production` |
| `environment` | `staging` |
| `environment` | `development` |

## Label Limits per Plan

| Plan | Labels per Resource |
|------|-------------------|
| Free | 5 |
| Pro | 50 |
| Pro+ | 200 (planned) |

## Labels and Access Control

:::note
RBAC and ABAC are planned capabilities and not yet available.
:::

Labels will power role-based and attribute-based access control (RBAC/ABAC) in a future release. For example:

```yaml
# Planned RBAC policy
bindings:
  - role: admin
    labels:
      team: payments
  - role: viewer
    labels:
      environment: staging
```

When RBAC ships, users with labels matching a resource's labels will have access according to their role. Until then, labels are organizational only and do not enforce access boundaries.

## Reserved Namespaces

Label keys beginning with `zen-mesh.io/` are reserved for internal use:

```
zen-mesh.io/created-by       # Set automatically
zen-mesh.io/created-at       # Set automatically
zen-mesh.io/resource-type    # source | target | route
```

Do not use the `zen-mesh.io/` prefix for custom labels. They will be ignored or overwritten.

## Label Key Guidance

- **Use lowercase with hyphens** for consistency: `team`, `environment`, `cost-center`
- **Use forward slashes** for namespacing: `team/payments`, `team/notifications`
- **Avoid special characters** beyond hyphen, slash, and underscore
- **Maximum key length**: 128 characters
- **Maximum value length**: 256 characters
- Labels are case-sensitive (`Team` and `team` are different)

## Next Steps

See how labels and team management intersect in [Invite Users and Groups](./invite-users-groups).

## See Also

- [Create Your First Source](./create-first-source)
- [Filtering Delivery](../delivery/filtering)
- [Invite Users and Groups](./invite-users-groups)
- [API Overview](../api/overview)

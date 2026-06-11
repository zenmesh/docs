---
sidebar_label: Labels
description: Labels platform for Zen Mesh — reserved namespaces, plan limits, RBAC/ABAC, API and CLI examples.
---

# Labels Platform

Labels are key-value pairs attached to Zen Mesh resources — endpoints, sources, targets, and routes. They power access control, billing attribution, search, observability, and evidence tracking.

## Reserved Namespaces

Zen Mesh uses reserved label prefixes to prevent collisions between system and user labels.

### Canonical reserved namespace: `zen-mesh.io/*`

All system labels use the `zen-mesh.io/` prefix. Customers cannot create, update, or delete labels with this prefix.

- `zen-mesh.io/env` — optional environment indicator (customer-chosen values)
- `zen-mesh.io/source-type` — source type classification
- `zen-mesh.io/region` — region classification
- `zen-mesh.io/internal-*` — internal system labels (opaque to users)

### Legacy reserved namespace: `zen.io/*` (deprecated)

The `zen.io/` prefix is a legacy/internal reserved namespace. It is accepted for backward compatibility but is slated for removal. New integrations must use `zen-mesh.io/*`. Do not build new workflows against `zen.io/*` labels.

### Do NOT use `zen/*`

The bare `zen/` prefix is **not** a valid namespace. It is neither canonical nor legacy. Do not use it.

## User Labels

User labels are key-value pairs you define to organize your resources. You are free to choose label keys and values that match your team's naming conventions. Common patterns:

| Label Key | Example Value | Purpose |
|-----------|---------------|---------|
| `team` | `payments` | Team ownership |
| `project` | `checkout` | Project association |
| `owner` | `alice` | Individual owner |
| `service` | `api-gateway` | Service identification |
| `tier` | `critical` | Priority classification |

There is no required set of label keys or values. `zen-mesh.io/env` is available but not required — you decide if and how to use environment labels.

Keys must start with a letter or number, and may contain letters, numbers, hyphens, underscores, and forward slashes (for namespaces).

### Label key casing

Label keys and values preserve customer intent. Zen may normalize for search and collision detection internally. Avoid creating case-only duplicate keys (e.g., `Team` and `team` on the same resource) to prevent confusion.

## System Labels

### Public-safe system labels (visible, searchable)

These labels are visible in the dashboard, API responses, and search:

- `zen-mesh.io/env` — customer-chosen environment values (optional)
- `zen-mesh.io/source-type` — source classification
- `zen-mesh.io/region` — region classification

### Sensitive system labels (hidden or opaque)

Labels prefixed with `zen-mesh.io/internal-` are system-internal. They may be:

- Hidden from API responses and dashboard
- Opaque (present but not human-readable)
- Used for internal routing, billing, or security

## Managing Labels

Users who can create or manage an object may add, update, or delete customer labels on that object. All label changes are audited.

## What Labels Power

Labels are not just metadata — they are integral to how Zen Mesh operates:

| Capability | How Labels Are Used |
|------------|-------------------|
| **RBAC/ABAC** | Access policies scoped by label selectors (e.g., a policy grants access only to resources with `team=payments`) |
| **Billing attribution** | Resources attributed to teams/projects via labels for billing breakdowns |
| **Limits** | Label count per resource is limited by plan tier |
| **Search/UX** | Filter and search resources by label in the dashboard |
| **Observability** | Labels included in metrics and log entries for filtering |
| **Alerts** | Alert rules can target resources by label selectors |
| **Evidence** | Delivery evidence records include labels for attribution and filtering |
| **MCP reads** | MCP tools can read and filter by labels (read-only, cannot mutate) |
| **Reporting** | Aggregate delivery statistics by label dimensions |

## Plan Limits

Custom labels per resource are limited by plan:

| Plan | Custom Labels / Resource |
|------|--------------------------|
| Free | 5 |
| Pro | 20 |
| Business | 50 (coming soon) |
| Enterprise | Custom |

Labels are available to all users generally. Reserved system labels (`zen-mesh.io/*`) do not count against the custom label limit.

## MCP Restriction

MCP (Model Context Protocol) tools can **read** and **filter** by labels, but **cannot**:

- Mutate labels on any resource
- Apply label changes from draft state
- Create or delete labels directly

MCP can draft changes, but humans must apply drafts through RBAC-controlled apply paths. Do not say MCP can apply drafts.

Label mutations must go through the API or CLI.

## Label Examples

### Common label assignments

```
team=payments
project=checkout
owner=alice
service=api-gateway
tier=critical
```

### API Examples

**List endpoints by label:**

```bash
GET /api/v1/endpoints?label=team=payments
```

**Multiple label filters (AND semantics):**

```bash
GET /api/v1/endpoints?label=team=payments&label=project=checkout
```

Returns only endpoints where `team=payments` AND `project=checkout`.

**Patch labels on an endpoint:**

```bash
PATCH /api/v1/endpoints/{endpoint_id}
Content-Type: application/json

{
  "labels": {
    "team": "payments",
    "project": "checkout",
    "owner": "alice"
  }
}
```

### CLI Examples

**List endpoints filtered by label:**

```bash
zen endpoint list --label team=payments
```

**Set a label on an endpoint:**

```bash
zen endpoint label set stripe-dev team=payments
```

**Set multiple labels:**

```bash
zen endpoint label set stripe-dev team=payments project=checkout
```

### Policy Examples

Customers define their own groups and policies. The examples below are templates, not mandatory roles.

**Example: Team-scoped policy** — access limited to a specific team's resources:

```yaml
group: payments-team
scope:
  team: payments
permissions:
  - endpoints:read,write
  - sources:read,write
  - targets:read,write
  - routes:read
```

**Example: Project-scoped policy** — access limited to a specific project:

```yaml
group: checkout-team
scope:
  project: checkout
  tier: critical
permissions:
  - endpoints:read,write
  - sources:read,write
  - targets:read,write
  - routes:read,write
  - evidence:read
```

**Example: Read-only access** — view all resources:

```yaml
group: observers
scope: {}
permissions:
  - endpoints:read
  - sources:read
  - targets:read
  - routes:read
  - evidence:read
  - logs:read
```

An empty policy selector means all resources. Saving a policy with an empty selector requires a warning confirmation and the option to save the decision for future use.

## See also

- [Plans & Limits](/docs/start-here/limits) — label count limits by plan
- [API Authentication](/docs/api/authentication) — API key management
- [Tenant Isolation](/docs/security/tenant-isolation) — how labels support isolation
- [MCP Overview](/docs/mcp/overview) — MCP read-only label policy

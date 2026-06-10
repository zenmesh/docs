---
sidebar_label: Tenant Isolation
description: Multi-tenant data isolation with Row-Level Security (RLS) — tenant scoping, data access boundaries, and cross-tenant prevention.
---

# Tenant Isolation

Zen Mesh provides multi-tenant data isolation so each tenant's configuration, events, and evidence are separated from all other tenants.

## Row-Level Security (RLS)

All tenant data is isolated using Row-Level Security at the database layer. Every query is scoped to the authenticated tenant's identifier. Cross-tenant data access is prevented structurally — no application-level check can bypass RLS.

### How RLS Works

1. Each database table includes a tenant identifier column
2. RLS policies enforce that queries can only read or write rows matching the session tenant
3. The tenant identifier is set at connection time from the authentication context
4. Administrative operations that cross tenant boundaries are explicitly gated

## Tenant Scoping

| Resource | Scoped By |
|----------|-----------|
| Endpoints / Ingesters | Tenant ID |
| Destinations | Tenant ID |
| Delivery Flows | Tenant ID |
| Delivery History | Tenant ID |
| Evidence and Logs | Tenant ID |
| API Keys | Tenant ID |

## Data Access Boundaries

### Within a Tenant

- All users, agents, and API keys scoped to the same tenant share access to that tenant's resources
- API keys can be further limited to specific scopes (read-only, specific resource types)

### Across Tenants

- No cross-tenant data access is possible through standard APIs
- MCP agents operate within their authenticated tenant scope
- Evidence artifacts are tenant-scoped — one tenant cannot view another's evidence

## API Key Scoping

API keys are issued per tenant. A key created for tenant A cannot access tenant B's resources. Keys can also be scoped to specific operations:

| Scope | Access |
|-------|--------|
| `admin` | Full read/write access to all tenant resources |
| `read` | Read-only access to tenant resources |
| `webhooks:write` | Submit events to the tenant's ingesters |
| `mcp:read:*` | Read-only MCP access within the tenant |

## Related

- [Security Model](../architecture/security-model) — overall security architecture
- [Authentication and API Keys](../api/authentication) — API key management
- [MCP Safety and Boundaries](../mcp/safety-and-boundaries) — MCP agent isolation

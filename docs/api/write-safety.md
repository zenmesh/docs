---
sidebar_label: Write Safety Model
---

# Write Safety Model

Write-capable API and MCP endpoints allow authorized clients to create, update, and delete Zen Mesh resources. This page describes the safety model that governs all mutating operations across the Customer API, runtime APIs, and MCP surface.

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the planned write safety contract. Individual endpoint groups may carry different maturity statuses. It is not a production-live availability claim.

## Why writes exist

Every control surface (UI, CLI, API, MCP, Git) is a path to the same Configuration Contract. Write operations allow clients to manage resources through the surface best suited to their workflow. Writes follow the same contract validation, authorization, and audit regardless of which surface initiated them.

## Authorization model

Every write operation requires:

1. **Authentication** — Bearer JWT, API key, MCP key, or session token identifying the caller
2. **Tenant authorization** — the caller must be scoped to the target tenant
3. **Scopes** — the caller's credential must grant the required scope for the operation

### Required scopes per operation type

| Operation type | Example scope |
|---|---|
| Read operational truth | `read:*` or `read:<resource>` |
| Create resource | `write:<resource>`, `admin:<resource>` |
| Update resource | `write:<resource>`, `admin:<resource>` |
| Delete resource | `admin:<resource>` |
| Manage API keys | `admin:keys` |
| MCP read tools | `mcp:read:*` (default-on) |
| MCP write tools | `mcp:write:<group>` (disabled by default) |

## Object-level permissions

Where applicable, write operations are further gated by object-level permissions:

- A caller may have write scope for targets but read-only for flows
- A caller may create endpoints but not delete them
- MCP write tools may be enabled for specific resource types only

Object-level permissions are enforced at the API layer before the write reaches the database.

## Tenant boundaries

All write operations are tenant-scoped. Cross-tenant writes are prevented by:

- Path-level tenant ID validation
- Row-Level Security (RLS) at the database layer
- Credential-binding at key creation time

## Plan/capability gates

Some write operations require a specific plan tier or capability gate:

| Capability | Plan requirement | Status |
|---|---|---|
| IP allowlist management | Pro+ | V1 |
| Multi-target fanout | Business+ | V1.1 planned |
| GitOps write through Configuration Contract | Business+ | V1.1 planned |
| Dedicated data plane | Enterprise | Pilot |

Operations that require a higher plan tier than the tenant's current plan return a clear denial response with remediation guidance.

## Idempotency

Write operations are idempotent where relevant. The `Idempotency-Key` header enables safe retry:

- The client sends an `Idempotency-Key` header with a unique key
- The server deduplicates requests with the same key within the idempotency window
- Idempotent writes that are retried return the original response (not an error)

See [Idempotency](./idempotency) for the full specification.

## Audit logging

Every write operation produces an audit log entry containing:

- Request identity (API key ID, JWT sub, caller identity)
- Action (create, update, delete)
- Target resource type and ID
- Request parameters (redacted for secrets)
- Timestamp
- Result (success, validation error, authorization denied)

Audit logs are tenant-scoped and accessible through the [Logs API](./logs).

## Validation and policy checks

Write requests pass through the following validation chain, applied in order:

1. **Authentication** — is the caller authenticated?
2. **Authorization** — does the caller have the required scopes and permissions?
3. **Request validation** — is the request body well-formed and type-correct?
4. **Business rule validation** — does the request satisfy contract constraints?
5. **Plan gate** — does the tenant's plan support this operation?
6. **Policy check** — does the operation violate any tenant or platform policy?

## Fail-closed behavior

If any step in the validation chain fails, the write is rejected in its entirety. Partial writes do not occur:

- A validation error returns a problem-details response with specific error codes
- No database mutation is applied when validation fails
- No side effects are triggered from an invalid write request

## Replay/retry safety

Operations that can be retried or replayed follow these principles:

- **Retry** re-attempts delivery to the original target using the original delivery attempt. It is idempotent — calling retry on an already-retried delivery does not create duplicate deliveries.
- **Replay** recreates delivery from retained payload/context. It can deliver to the same or a different target. Replay is gated by retained payload availability and plan limits.

See [Retry API](./retry) and [Replay API](./replay) for details.

## MCP write safety

The MCP surface follows a stricter write model:

- All MCP tools start **disabled by default**
- Write tools require explicit enablement per tool group by an operator
- Write-capable MCP tools pass through the same validation chain as API/UI/CLI writes
- MCP write tools are subject to object-level permissions on top of tool-group enablement
- MCP agents **cannot apply drafts** — apply is exclusively human
- Write denials return clear error responses indicating which tool group must be activated

See [MCP Safety and Boundaries](../mcp/safety-and-boundaries) for details.

## Sandbox-only writes

Some write operations are restricted to sandbox environments:

- Test event generation
- Failure simulation
- Adapter configuration for unverified provider types

Operations marked SANDBOX_ONLY are not available in production environments.

## Non-claims

- Write safety documentation describes the model, not every endpoint's current availability
- Individual endpoint groups determine their write capability independently
- Write operations documented as PLANNED or WIRED_SANDBOX are not production-live
- MCP write tools are disabled by default and must be explicitly enabled

## Related

- [Customer API](../reference/customer-api) — programmable interface for management
- [MCP Safety and Boundaries](../mcp/safety-and-boundaries) — MCP-specific write model
- [Idempotency](./idempotency) — idempotency key specification
- [Authentication](./authentication) — auth models and scopes
- [Errors and Problem Details](./errors) — error response format
- [API Status Matrix](./status) — per-group maturity and read/write status

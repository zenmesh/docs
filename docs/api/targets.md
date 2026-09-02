---
sidebar_label: Targets API
---

# Targets API

Targets are delivery destinations — where validated events are sent after ingestion and processing.

> **For the canonical interactive contract, use the [API Reference](./swagger/).** This page explains the concept; the reference shows the exact method/path/parameters.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Target | destination | `/destinations` |

**Note:** API paths and some legacy documentation use the internal term "destination." Customer-facing docs and the UI use "target."

## Audience

Customer / developer integrating delivery endpoints.

## Base path

```
/api/bff/v1/tenants/{tenant_id}/destinations     (dashboard/BFF — app-facing, INTERNAL_ONLY)
/v1/tenants/{tenant_id}/destinations             (backend API — WIRED_SANDBOX)
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/destinations` | List targets | Read | WIRED_SANDBOX | `read:destinations` | Not required | Partial (zen-back) |
| `POST` | `/tenants/{tid}/destinations` | Create a target | Write | WIRED_SANDBOX | `write:destinations` | Recommended | Partial (zen-back) |
| `GET` | `/tenants/{tid}/destinations/{did}` | Get target details | Read | WIRED_SANDBOX | `read:destinations` | Not required | Partial (zen-back) |
| `PATCH` | `/tenants/{tid}/destinations/{did}` | Update a target | Write | WIRED_SANDBOX | `write:destinations` | Recommended | Partial (zen-back) |
| `DELETE` | `/tenants/{tid}/destinations/{did}` | Delete a target | Write | WIRED_SANDBOX | `write:destinations` | Recommended | Partial (zen-back) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List targets | Yes | — | WIRED_SANDBOX |
| Create target | — | Yes | WIRED_SANDBOX |
| Get target details | Yes | — | WIRED_SANDBOX |
| Update target | — | Yes | WIRED_SANDBOX |
| Delete target | — | Yes | WIRED_SANDBOX |

Write operations require tenant authorization, appropriate scopes, and audit logging. See [Write Safety Model](./write-safety) for details.

## Request example

```json
{
  "name": "production-app-server",
  "url": "https://app.example.com/webhooks"
}
```

## Create example

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_key>" \
  -d '{"name": "production-app-server", "url": "https://app.example.com/webhooks"}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/destinations"
```

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique destination identifier |
| name | string | Human-readable name |
| url | string | Target URL for delivery |
| status | string | `active`, `error`, `disabled` |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Last update timestamp |

## Error examples

### 400 Validation error

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "url: must not be empty",
  "instance": "req_abc123"
}
```

### 403 Insufficient scope

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:destinations scope.",
  "required_scope": "write:destinations"
}
```

### 409 Conflict

```json
{
  "type": "https://api.zen-mesh.io/errors/conflict",
  "title": "Conflict",
  "status": 409,
  "detail": "A destination with name 'production-app-server' already exists."
}
```

## Pagination

List targets supports cursor-based pagination with `limit` and `cursor` parameters. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (destinations CRUD). See [OpenAPI Spec Index](./openapi).

## UI mapping

Connect → Targets

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Target delivery to private NAT/firewalled networks requires Edge Lite or zen-agent.
- Delete is not reversible — removed targets must be recreated.

## Related

- [Flows API](./flows) — associate targets with endpoints via flows
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Authentication](./authentication) — API keys, scopes, permissions
- [Idempotency](./idempotency) — idempotency key specification

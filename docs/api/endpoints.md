---
sidebar_label: Endpoints API
---

# Endpoints API

Endpoints are webhook source receivers — the public-facing URLs where providers send events.

> **For the canonical interactive contract, use [Swagger UI](./swagger/).** This page explains the concept; Swagger shows the exact method/path/parameters.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Endpoint | ingester | `/ingesters` |

## Audience

Customer / developer configuring webhook sources.

## Base path

```
/api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/ingesters     (dashboard/BFF — app-facing, INTERNAL_ONLY)
/v1/tenants/{tenant_id}/ingesters                                   (backend API — WIRED_SANDBOX)
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/ingesters` | List endpoints | Read | WIRED_SANDBOX | `read:ingesters` | Not required | Partial (zen-back) |
| `POST` | `/tenants/{tid}/ingesters` | Create an endpoint | Write | WIRED_SANDBOX | `write:ingesters` | Recommended | Partial (zen-back) |
| `GET` | `/tenants/{tid}/ingesters/{iid}` | Get endpoint details | Read | WIRED_SANDBOX | `read:ingesters` | Not required | Partial (zen-back) |
| `PUT` | `/tenants/{tid}/ingesters/{iid}` | Update an endpoint | Write | WIRED_SANDBOX | `write:ingesters` | Recommended | Partial (zen-back) |
| `DELETE` | `/tenants/{tid}/ingesters/{iid}` | Delete an endpoint | Write | WIRED_SANDBOX | `write:ingesters` | Recommended | Partial (zen-back) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List endpoints | Yes | — | WIRED_SANDBOX |
| Create endpoint | — | Yes | WIRED_SANDBOX |
| Get endpoint details | Yes | — | WIRED_SANDBOX |
| Update endpoint | — | Yes | WIRED_SANDBOX |
| Delete endpoint | — | Yes | WIRED_SANDBOX |

Write operations require tenant authorization, appropriate scopes, and audit logging. See [Write Safety Model](./write-safety) for details.

## List example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/ingesters"
```

## Create example

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_key>" \
  -d '{"name": "stripe-endpoint", "type": "stripe"}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/ingesters"
```

## Error examples

### 400 Validation error

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "type: must be a valid provider type",
  "instance": "req_abc123"
}
```

### 403 Insufficient scope

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:ingesters scope.",
  "required_scope": "write:ingesters"
}
```

## Pagination

List endpoints supports pagination with `limit` and `cursor` parameters. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (ingesters CRUD under `/clusters`). See [OpenAPI Spec Index](./openapi).

## UI mapping

Connect → Endpoints

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Provider-specific endpoints (Stripe, GitHub, etc.) have provider-specific validation paths.
- Public endpoint URLs on shared receive IPs (Free tier) vs dedicated IPs (Business+).

## Related

- [Flows API](./flows) — associate endpoints with targets via flows
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Authentication](./authentication) — API keys, scopes, permissions
- [Idempotency](./idempotency) — idempotency key specification

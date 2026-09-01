---
sidebar_label: Flows API
---

# Flows API

Flows are declarative delivery contracts that connect an endpoint (source receiver) to a target (delivery destination).

> **For the canonical interactive contract, use [Swagger UI](./swagger/).** This page explains the concept; Swagger shows the exact method/path/parameters.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Flow | delivery-flow | `/delivery-flows` |

## Audience

Customer / developer managing event routing.

## Base path

```
/api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows     (dashboard/BFF — app-facing, INTERNAL_ONLY)
/v1/tenants/{tenant_id}/delivery-flows                                   (backend API — WIRED_SANDBOX)
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/delivery-flows` | List flows | Read | WIRED_SANDBOX | `read:delivery-flows` | Not required | Partial (zen-back) |
| `POST` | `/tenants/{tid}/delivery-flows` | Create a flow | Write | WIRED_SANDBOX | `write:delivery-flows` | Recommended | Partial (zen-back) |
| `GET` | `/tenants/{tid}/delivery-flows/{fid}` | Get flow details | Read | WIRED_SANDBOX | `read:delivery-flows` | Not required | Partial (zen-back) |
| `PUT` | `/tenants/{tid}/delivery-flows/{fid}` | Update a flow | Write | WIRED_SANDBOX | `write:delivery-flows` | Recommended | Partial (zen-back) |
| `DELETE` | `/tenants/{tid}/delivery-flows/{fid}` | Delete a flow | Write | WIRED_SANDBOX | `write:delivery-flows` | Recommended | Partial (zen-back) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List flows | Yes | — | WIRED_SANDBOX |
| Create flow | — | Yes | WIRED_SANDBOX |
| Get flow details | Yes | — | WIRED_SANDBOX |
| Update flow | — | Yes | WIRED_SANDBOX |
| Delete flow | — | Yes | WIRED_SANDBOX |

Write operations require tenant authorization, appropriate scopes, and audit logging. See [Write Safety Model](./write-safety) for details.

## List example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/delivery-flows"
```

## Create example

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_key>" \
  -d '{"name": "stripe-to-app", "source_id": "ing_abc123", "destination_id": "dest_abc123"}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/delivery-flows"
```

## Request fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Human-readable name |
| source_id | string | Yes | Endpoint ID (source receiver) |
| destination_id | string | Yes | Target ID (delivery destination) |
| config.retry_policy.max_attempts | integer | No | Maximum retry attempts (default: 3) |
| config.retry_policy.backoff_seconds | integer | No | Initial backoff in seconds (default: 10) |

## Error examples

### 400 Validation error

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "source_id: endpoint not found",
  "instance": "req_abc123"
}
```

### 403 Insufficient scope

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:delivery-flows scope.",
  "required_scope": "write:delivery-flows"
}
```

## Pagination

List flows supports pagination with `limit` and `cursor` parameters. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (delivery-flows CRUD). See [OpenAPI Spec Index](./openapi).

## UI mapping

Connect → Flows, Maintain → Flows

## Related

- [Targets API](./targets) — delivery destinations
- [Endpoints API](./endpoints) — source receivers
- [Delivery Attempts API](./delivery-attempts) — execution of flow deliveries
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Idempotency](./idempotency) — idempotency key specification

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Multi-target fanout is a Business+ planned feature (V1.1).
- GitOps for flows is not available in V1 (planned V1.1 Business+).
- Draft vs published flow distinction is V1.1+ planned, not available in V1.

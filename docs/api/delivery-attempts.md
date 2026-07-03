---
sidebar_label: Delivery Attempts API
---

# Delivery Attempts API

An attempt is one delivery execution — Zen Mesh's attempt to deliver an event to a target.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer monitoring delivery status.

## Base path

```
/v1/tenants/{tenant_id}/deliveries
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/deliveries` | List delivery attempts | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Partial (zen-back) |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get delivery details | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Partial (zen-back) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List delivery attempts | Yes | — | WIRED_SANDBOX |
| Get delivery details | Yes | — | WIRED_SANDBOX |

Delivery Attempts API is read-only for public customer use. Delivery attempts are created by the runtime/sandbox delivery path, not by direct customer write. Mutating delivery state (retry, replay) is handled through the [Retry API](./retry) and [Replay API](./replay).

See [Write Safety Model](./write-safety) for details.

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status: `delivered`, `failed`, `retrying`, `pending` |
| destination_id | string | Filter by target/destination |
| event_id | string | Filter by event |
| limit | integer | Max results per page (default 20, max 100) |
| cursor | string | Cursor from previous response for pagination |

## List example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?limit=10"
```

## List failed example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?status=failed&limit=10"
```

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Delivery attempt identifier |
| event_id | string | Source event identifier |
| destination_id | string | Target/destination identifier |
| status | string | Current status |
| response_code | integer | HTTP response code from target |
| attempt_number | integer | Retry attempt count |
| attempted_at | datetime | When the attempt occurred |
| error_message | string | Error detail on failure |
| evidence_id | string | Correlation ID for evidence chain |

## Status values

| Status | Description |
|--------|-------------|
| delivered | Successfully delivered to target |
| failed | Delivery failed |
| retrying | Automatic retry in progress |
| pending | Queued for delivery |

## Error examples

### 400 Invalid status filter

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "status: 'invalid_status' is not a valid status value",
  "instance": "req_abc123"
}
```

### 404 Not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Delivery dlv_abc123 not found.",
  "instance": "req_abc123"
}
```

## Pagination

List deliveries supports cursor-based pagination with `limit` and `cursor` parameters. The response includes `next_cursor` when more results are available. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml`. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → Deliveries, Traffic → Attempts, Traffic → Traces

## Related

- [DLQ API](./dlq) — failed delivery attempts
- [Retry API](./retry) — retry failed deliveries
- [Traces API](./traces) — delivery trace spine
- [Evidence API](./evidence) — delivery evidence proofs

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Delivery attempt history is subject to retention limits per plan.
- Status values may expand as runtime matures.
- Delivery attempts are read-only; use the Retry API to re-attempt failed deliveries.

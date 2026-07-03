---
sidebar_label: DLQ API
---

# DLQ API

The Dead Letter Queue (DLQ) holds failed delivery attempts that could not be delivered to the target after all retry attempts.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer monitoring and recovering failed deliveries.

## What DLQ is

The DLQ is a filtered view of delivery attempts filtered by `status=failed`. It is not a separate storage system — it is the same delivery attempt data with a status-based query.

## Canonical query

```
GET /v1/tenants/{tenant_id}/deliveries?status=failed
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/deliveries?status=failed` | List DLQ entries | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Shared (deliveries) |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get DLQ entry details | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Shared (deliveries) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List DLQ entries | Yes | — | WIRED_SANDBOX |
| Get DLQ entry details | Yes | — | WIRED_SANDBOX |

DLQ is a query filter over delivery attempts, not a separate writeable store. There is no direct public DLQ write. Mutating DLQ state (retry) is handled through the [Retry API](./retry).

See [Write Safety Model](./write-safety) for details.

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Must be `failed` for DLQ view |
| destination_id | string | Filter by target |
| event_id | string | Filter by event |
| from | datetime | Start of time range |
| to | datetime | End of time range |
| limit | integer | Max results per page |
| cursor | string | Cursor from previous response |

## List example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?status=failed&limit=10"
```

## Retry from DLQ

To retry a failed delivery from the DLQ, use the event-based retry path:

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Idempotency-Key: <unique_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/events/<event_id>/retry"
```

See [Retry API](./retry) for full documentation.

## Error examples

### 400 Invalid filter

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "status: must be 'failed' for DLQ view",
  "instance": "req_abc123"
}
```

## Pagination

DLQ list supports cursor-based pagination. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Not directly covered — uses the same deliveries endpoint as Delivery Attempts API. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → DLQ

## Related

- [Delivery Attempts API](./delivery-attempts) — delivery execution tracking
- [Retry API](./retry) — retry failed deliveries from DLQ
- [Write Safety Model](./write-safety) — authorization and safety for write operations

## Non-claims

- WIRED_SANDBOX: DLQ proof in sandbox/local does not mean all provider production paths are validated.
- DLQ retention varies by plan: 3 days (Free), 7 days (Pro), 30+ days (Business+).
- DLQ is a query filter, not a separate storage system.
- DLQ entries cannot be directly deleted — they expire based on retention policy.

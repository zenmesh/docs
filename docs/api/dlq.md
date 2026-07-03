---
sidebar_label: DLQ API
---

# DLQ API

The Dead Letter Queue (DLQ) holds failed delivery attempts that could not be delivered to the target after all retry attempts.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## What DLQ is

The DLQ is a filtered view of delivery attempts filtered by `status=failed`. It is not a separate storage system — it is the same delivery attempt data with a status-based query.

## Query pattern

```
GET /v1/tenants/{tenant_id}/deliveries?status=failed
```

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Must be `failed` for DLQ view |
| destination_id | string | Filter by target |
| source | string | Filter by source endpoint |
| from | datetime | Start of time range |
| to | datetime | End of time range |
| limit | integer | Max results per page |
| offset | integer | Pagination offset |

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/deliveries?status=failed` | List DLQ entries | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get DLQ entry details | WIRED_SANDBOX |

## Retry from DLQ

See [Retry API](./retry) for retrying failed deliveries from the DLQ.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Not directly covered — uses the same deliveries endpoint as Delivery Attempts API.

## UI mapping

Traffic → DLQ

## Non-claims

- WIRED_SANDBOX: DLQ proof in sandbox/local does not mean all provider production paths are validated.
- DLQ retention varies by plan: 3 days (Free), 7 days (Pro), 30+ days (Business+).
- DLQ is a query filter, not a separate storage system.

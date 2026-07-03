---
sidebar_label: Delivery Attempts API
---

# Delivery Attempts API

An attempt is one delivery execution — Zen Mesh's attempt to deliver an event to a target.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Base path

```
/v1/tenants/{tenant_id}/deliveries
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/deliveries` | List delivery attempts | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get delivery details | WIRED_SANDBOX |

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status: `delivered`, `failed`, `retrying`, `pending` |
| destination_id | string | Filter by target/destination |
| event_id | string | Filter by event |
| limit | integer | Max results per page |
| offset | integer | Pagination offset |

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

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List delivery attempts | Yes | — | WIRED_SANDBOX |
| Get delivery details | Yes | — | WIRED_SANDBOX |

Delivery Attempts API is read-only for public customer use. Delivery attempts are created by the runtime/sandbox delivery path, not by direct customer write. Mutating delivery state (retry, replay) is handled through the [Retry API](./retry) and [Replay API](./replay).

See [Write Safety Model](./write-safety) for details.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml`.

## UI mapping

Traffic → Deliveries, Traffic → Attempts, Traffic → Traces

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Delivery attempt history is subject to retention limits per plan.
- Status values may expand as runtime matures.

---
sidebar_label: Retry API
---

# Retry API

Retry re-attempts delivery of a failed event to the original target. Retry differs from [Replay](./replay) — replay recreates delivery from retained payload/context, while retry re-uses the original delivery attempt.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Terminology

The canonical retry path is under events:

```
POST /v1/tenants/{tenant_id}/events/{event_id}/retry
```

The path `/events/retry/batch` is not canonical and must not be used.

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `POST` | `/tenants/{tid}/deliveries/{did}/replay` | Retry a single delivery | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/retry/batch` | Batch retry multiple deliveries | WIRED_SANDBOX |

**Note:** The paths above use `{did}` (delivery attempt ID). For event-based retry:

```
POST /v1/tenants/{tenant_id}/events/{event_id}/retry
```

### Single retry request

```json
{
  "delivery_id": "del_abc123"
}
```

### Batch retry request

```json
{
  "delivery_ids": ["del_abc123", "del_def456"]
}
```

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Retry single delivery (via delivery ID) | — | Yes | WIRED_SANDBOX |
| Batch retry | — | Yes | WIRED_SANDBOX |
| Retry via event path | — | Yes | WIRED_SANDBOX |

Read support for retryable attempts is available through the [Delivery Attempts API](./delivery-attempts). Write (retry) requires tenant authorization, event-level authorization, and idempotency safety.

See [Write Safety Model](./write-safety) for details.

## Idempotency and safety

Retry is idempotent. Calling retry on an already-retried delivery does not create duplicate deliveries. See [Idempotency](./idempotency) for details.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Not directly covered in OpenAPI spec.

## UI mapping

Traffic → Retry

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Automatic retry policy is configurable per flow.
- Batch retry availability depends on plan (Basic Free, Advanced Pro, Bulk/team Business+).

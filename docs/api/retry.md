---
sidebar_label: Retry API
---

# Retry API

Retry re-attempts delivery of a failed event to the original target. Retry differs from [Replay](./replay) — replay recreates delivery from retained payload/context, while retry re-uses the original delivery attempt.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer recovering failed deliveries.

## Canonical retry path

The canonical retry path is under events:

```
POST /v1/tenants/{tenant_id}/events/{event_id}/retry
```

The path `/events/retry/batch` is not canonical and must not be used.

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `POST` | `/tenants/{tid}/events/{eid}/retry` | Retry an event | Write | WIRED_SANDBOX | `write:deliveries` | Supported | Not covered |
| `POST` | `/tenants/{tid}/retry/batch` | Batch retry | Write | WIRED_SANDBOX | `write:deliveries` | Supported | Not covered |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Retry single delivery (via event path) | — | Yes | WIRED_SANDBOX |
| Batch retry | — | Yes | WIRED_SANDBOX |

Read support for retryable attempts is available through the [Delivery Attempts API](./delivery-attempts). Write (retry) requires tenant authorization, event-level authorization, and idempotency safety.

See [Write Safety Model](./write-safety) for details.

## Single retry

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Idempotency-Key: <unique_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/events/<event_id>/retry"
```

**Response:**

```json
{
  "status": "queued",
  "delivery_id": "dlv_def456",
  "message": "Retry initiated"
}
```

## Batch retry

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_key>" \
  -d '{"delivery_ids": ["del_abc123", "del_def456"]}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/retry/batch"
```

**Response:**

```json
{
  "queued": 2,
  "deliveries": [
    { "delivery_id": "del_abc123", "status": "queued" },
    { "delivery_id": "del_def456", "status": "queued" }
  ]
}
```

## Error examples

### 403 Insufficient scope

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:deliveries scope.",
  "required_scope": "write:deliveries"
}
```

### 404 Event not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Event evt_abc123 not found.",
  "instance": "req_abc123"
}
```

### 409 Idempotency conflict

```json
{
  "type": "https://api.zen-mesh.io/errors/idempotency-conflict",
  "title": "Idempotency Conflict",
  "status": 409,
  "detail": "Idempotency-Key was used with a different set of delivery IDs.",
  "idempotency_key": "idem_key_1"
}
```

## Idempotency and safety

Retry is idempotent. Calling retry on an already-retried delivery does not create duplicate deliveries. See [Idempotency](./idempotency) for details.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. Write operations require `write:deliveries` scope. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Not directly covered in OpenAPI spec. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → Retry

## Related

- [Delivery Attempts API](./delivery-attempts) — inspect failed deliveries
- [DLQ API](./dlq) — failed delivery attempts view
- [Replay API](./replay) — replay from retained payload (retry vs replay distinction)
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Idempotency](./idempotency) — idempotency key specification

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Automatic retry policy is configurable per flow.
- Batch retry availability depends on plan (Basic Free, Advanced Pro, Bulk/team Business+).
- Retry re-uses the original delivery — it does not re-ingest the event from the source.

---
sidebar_label: Replay API
---

# Replay API

Replay recreates delivery of an event from retained payload/context. Replay differs from [Retry](./retry) — retry re-attempts delivery to the original target, while replay can deliver to the same or different target using the retained payload.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer recovering deliveries from retained payload.

## Important caveat

Replay **requires retained payload/context**. If the payload has exceeded the retention window or was never retained, replay is not available.

| Plan | Retention | Replay availability |
|------|-----------|-------------------|
| Free | 7 days | 3-day basic DLQ/replay |
| Pro | 30 days | 7-day advanced |
| Business | Longer | 30+ days |
| Enterprise | Custom | Custom |

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `POST` | `/tenants/{tid}/deliveries/{did}/replay` | Replay a single delivery | Write (gated) | WIRED_SANDBOX | `write:deliveries` | Supported | Partial |
| `POST` | `/tenants/{tid}/replay/batch` | Batch replay | Write (gated) | PLANNED | `write:deliveries` | Supported | Not covered |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Replay single delivery | — | Yes (gated) | WIRED_SANDBOX |
| Batch replay | — | Planned | PLANNED |

Read support for replay eligibility/context is available through the [Delivery Attempts API](./delivery-attempts). Write (replay) is gated by retained payload/context availability and plan-based retention limits. Replay requires tenant authorization and audit logging.

See [Write Safety Model](./write-safety) for details.

## Single replay

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Idempotency-Key: <unique_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries/<delivery_id>/replay"
```

**Request body:**

```json
{
  "delivery_id": "del_abc123"
}
```

**Response:**

```json
{
  "status": "queued",
  "delivery_id": "del_abc123",
  "message": "Replay initiated from retained payload"
}
```

## Error examples

### 400 Retained payload unavailable

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "Retained payload for delivery del_abc123 is no longer available (retention exceeded).",
  "instance": "req_abc123"
}
```

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

### 404 Delivery not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Delivery del_abc123 not found.",
  "instance": "req_abc123"
}
```

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. Write operations require `write:deliveries` scope. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Single replay partially covered in `zen-back.v1.yaml`. Batch replay not covered. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → Replay

## Related

- [Retry API](./retry) — retry vs replay distinction
- [Delivery Attempts API](./delivery-attempts) — inspect deliveries eligible for replay
- [Saved Payloads API](./saved-payloads) — saved payload templates (not retained payloads)
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Idempotency](./idempotency) — idempotency key specification

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Replay is gated by retained payload/context availability.
- Batch and dry-run replay are planned (post-V1), not available.
- Replay respects retention and plan limits — expired payloads cannot be replayed.
- Saved payload templates are not production retained payloads.

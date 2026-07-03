---
sidebar_label: Saved Payloads API
---

# Saved Payloads API

Saved Payloads are test and template payloads stored for reuse. They are NOT the same as production retained webhook payloads.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer testing delivery behavior.

## Important distinction

| Type | Description | Retention | API |
|------|-------------|-----------|-----|
| **Saved Payload** (this API) | Test/template payloads, manually saved | User-managed | `/saved-payloads` |
| **Production retained payload** | Events retained as part of delivery history | Plan-based (7-30+ days) | `/deliveries` with payload |

Saved payloads are used in the Labs → Payload Builder for testing and development. They are not automatically retained delivery history.

## Base path

```
/v1/tenants/{tenant_id}/saved-payloads
```

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/saved-payloads` | List saved payloads | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Not covered |
| `POST` | `/tenants/{tid}/saved-payloads` | Create a saved payload | Write | WIRED_SANDBOX | `write:deliveries` | Recommended | Not covered |
| `GET` | `/tenants/{tid}/saved-payloads/{pid}` | Get saved payload details | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Not covered |
| `PUT` | `/tenants/{tid}/saved-payloads/{pid}` | Update a saved payload | Write | WIRED_SANDBOX | `write:deliveries` | Recommended | Not covered |
| `DELETE` | `/tenants/{tid}/saved-payloads/{pid}` | Delete a saved payload | Write | WIRED_SANDBOX | `write:deliveries` | Recommended | Not covered |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List saved payloads | Yes | — | WIRED_SANDBOX |
| Create saved payload | — | Yes | WIRED_SANDBOX |
| Get saved payload details | Yes | — | WIRED_SANDBOX |
| Update saved payload | — | Yes | WIRED_SANDBOX |
| Delete saved payload | — | Yes | WIRED_SANDBOX |

Write operations require tenant authorization, redaction/security controls, and audit logging. This is not a production retained payload history — saved payloads are test/template payloads only.

See [Write Safety Model](./write-safety) for details.

## Create example

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_key>" \
  -d '{"name": "test-payload", "payload": {"event_type": "test", "data": {"key": "value"}}}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/saved-payloads"
```

## Redaction

Credentials and secret-like keys are redacted from saved payloads automatically. Redacted fields include:

- `authorization`
- `cookie`
- `token`
- `secret`
- `password`
- `signature`
- `api_key`
- `x-hub-signature`
- `x-shopify-hmac-sha256`
- `x-twilio-signature`

**Redacted response:**

```json
{
  "id": "payload_abc123",
  "name": "test-payload",
  "payload": {
    "event_type": "test",
    "data": { "key": "value" },
    "authorization": "[REDACTED]"
  },
  "created_at": "2026-07-03T12:00:00Z"
}
```

## Error examples

### 400 Validation error

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "name: must not be empty",
  "instance": "req_abc123"
}
```

### 404 Not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Saved payload payload_abc123 not found.",
  "instance": "req_abc123"
}
```

## Pagination

List saved payloads supports pagination with `limit` and `cursor` parameters. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Not covered. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → Payloads, Labs → Payload Builder

## Related

- [Replay API](./replay) — replay requires retained payload/context (not saved payload templates)
- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Idempotency](./idempotency) — idempotency key specification

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Saved payloads are test/template payloads, not production retained webhook payload history.
- Production retained payloads are subject to plan-based retention and access different API paths.
- Redaction is automatic but may not catch all sensitive field patterns.

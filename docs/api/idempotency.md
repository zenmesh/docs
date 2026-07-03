---
sidebar_label: Idempotency
---

# Idempotency

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the idempotency model. Individual endpoint groups may vary. It is not a production-live availability claim.

Idempotency ensures that the same request can be safely retried without producing duplicate side effects. This is critical for write operations where network failures, timeouts, or client errors may leave the caller uncertain whether the operation completed.

## Idempotency-Key header

Include an `Idempotency-Key` header with a unique identifier on mutating requests:

```bash
curl -X POST \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique_operation_key>" \
  -d '{"name": "prod-target", "url": "https://example.com/webhooks"}' \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/destinations"
```

## Behavior

| Property | Value |
|---|---|
| Key format | Any unique string (UUID recommended) |
| Deduplication window | 24 hours from first request |
| Window expiry | Key eligible for reuse after expiry |
| Scope | Unique per tenant |
| Idempotency for retries | Same key returns original response without side effects |

## Safe retry pattern

```python
import uuid

def create_target(payload):
    idempotency_key = str(uuid.uuid4())
    response = client.post(
        "/v1/tenants/{tid}/destinations",
        json=payload,
        headers={"Idempotency-Key": idempotency_key}
    )
    return response  # Safe to call multiple times
```

## Endpoint coverage

| Endpoint group | Idempotency required | Notes |
|---|---|---|
| Create target | Recommended | Prevents duplicate targets on retry |
| Update target | Recommended | Prevents conflicting updates |
| Delete target | Recommended | Safe — DELETE is naturally idempotent |
| Create endpoint | Recommended | Prevents duplicate endpoints |
| Update endpoint | Recommended | Prevents conflicting updates |
| Create flow | Recommended | Prevents duplicate flows |
| Update flow | Recommended | Prevents conflicting updates |
| Retry delivery | Supported | Retry is idempotent; calling retry on an already-retried delivery does not create duplicates |
| Replay event | Supported | Replay is idempotent; same replay request returns same result |
| Create saved payload | Recommended | Prevents duplicate payloads |
| Update saved payload | Recommended | Prevents conflicting updates |
| Event submission | Supported | Idempotent within deduplication window |
| Create API key | Recommended | Prevents duplicate keys |

## Conflict behavior

If an `Idempotency-Key` is reused with a **different** request body, the server returns a 409 Conflict:

```json
{
  "type": "https://api.zen-mesh.io/errors/idempotency-conflict",
  "title": "Idempotency Conflict",
  "status": 409,
  "detail": "Idempotency-Key 'idem_key_1' was used with a different request body.",
  "idempotency_key": "idem_key_1"
}
```

## Read operations

Read operations (`GET`, `HEAD`) are naturally idempotent and do not require an `Idempotency-Key` header.

## Non-claims

- Idempotency is recommended but may not be enforced by all endpoint groups
- The deduplication window is 24 hours; operations outside this window may create new resources
- Idempotency keys do not prevent concurrent requests — use application-level locking if needed
- Idempotency is not a substitute for idempotent consumer design (see [Delivery Idempotency](../delivery/idempotency))

## Related

- [Write Safety Model](./write-safety) — authorization and safety for write operations
- [Errors and Problem Details](./errors) — idempotency conflict error format
- [Delivery Idempotency](../delivery/idempotency) — consumer-side idempotent delivery

---
sidebar_label: Idempotency
---

# Idempotency

Idempotency ensures that the same request can be safely retried without producing duplicate side effects. Zen Mesh supports idempotent event submission via the `Idempotency-Key` header.

## Usage

Include an `Idempotency-Key` header with a unique identifier on mutating requests:

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  -H "Idempotency-Key: my_unique_request_id_42" \
  -H "Content-Type: application/json" \
  -d '{"event_type": "invoice.paid", "payload": {...}}' \
  https://api.zen-mesh.io/v1/events
```

## Behavior

- Requests with the same `Idempotency-Key` within the deduplication window return the original response
- The deduplication window is 24 hours from the first request
- After the window expires, the key is eligible for reuse (new requests create new resources)
- Idempotency keys must be unique per tenant

## Safe Retry Pattern

```python
import uuid

def submit_event(payload):
    idempotency_key = str(uuid.uuid4())
    response = client.post(
        "/v1/events",
        json=payload,
        headers={"Idempotency-Key": idempotency_key}
    )
    return response  # Safe to call multiple times
```

## Scope

Idempotency applies to event submission endpoints. Read operations (`GET`, `HEAD`) are naturally idempotent and do not require the header.

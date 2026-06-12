---
sidebar_label: Webhook API Guide
---

# Webhook Delivery API Guide

The Zen Mesh webhook delivery API receives, validates, and delivers webhook events from external sources to your private network destinations.

## Endpoints

See the [Back API Reference](./api/reference/kubezen-back-api.info.mdx) for the full endpoint list and schema.

## Delivery Flow

1. **Ingest**: Webhook received at the ingress endpoint
2. **Validate**: HMAC signature, header validation, IP allowlisting
3. **Filter**: Rule-based filtering by event type, source, or headers
4. **Deliver**: Fan-out to one or more destinations with configurable retry
5. **Track**: Each delivery is recorded with status, attempts, and timing

## At-Least-Once Delivery

Zen Mesh retries failed deliveries with exponential backoff. Unrecoverable failures are routed to the dead-letter queue (DLQ) for replay.

## Idempotent Delivery

Consumers should handle duplicate deliveries idempotently using the `X-Zen-Delivery-Idempotency-Key` header. See [Idempotency](https://docs.zen-mesh.io/delivery/idempotency).

## Event Types

Webhook events carry a `type` field. Supported sources include:

- Stripe (checkout.session.completed, invoice.paid, ...)
- GitHub (push, pull_request, issues, ...)
- Custom (any JSON payload via API)

## Operational Limits

- **Payload size**: 256 KB max (configurable)
- **Retry count**: 5 attempts with exponential backoff
- **DLQ retention**: 7 days (configurable)
- **Rate limit**: 100 req/min per tenant (burst 200)

## Delivery Status

Each delivery progresses through a state machine:

| Status | Description |
|--------|-------------|
| `pending` | Queued for delivery |
| `delivering` | Currently in flight |
| `delivered` | Successfully delivered |
| `failed` | Delivery failed, queued for retry |
| `exhausted` | All retries exhausted, moved to DLQ |
| `replaying` | Re-queued from DLQ for retry |

Inspect delivery status:

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123
```

### Delivery Attempts History

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123/attempts
```

Each attempt includes HTTP status, response body (truncated), timestamp, and duration.

### Dead-Letter Queue

When all retry attempts are exhausted, the event moves to the dead-letter queue:

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/deliveries?status=exhausted&limit=20
```

DLQ items can be replayed manually via the [Replay API](./replay.md).

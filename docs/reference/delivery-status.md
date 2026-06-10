---
sidebar_label: Delivery Status
description: Webhook delivery state machine — status values, transitions, delivery attempts, and dead-letter queue. Reference for monitoring and troubleshooting delivery outcomes.
---

# Delivery Status Reference

Every webhook event processed by Zen Mesh progresses through a delivery state machine. This reference documents each status, its transitions, and how to inspect delivery state.

## Delivery State Machine

```
  pending → delivering → delivered
      ↓          ↓
      ↓        failed → delivering (retry)
      ↓           ↓
      ↓       exhausted → DLQ/replaying → delivered
      ↓
  (dropped by filter)
```

## Status Reference

| Status | Description | Next State |
|--------|-------------|------------|
| `pending` | Event received and queued for delivery. The event is waiting for a delivery slot. | `delivering` |
| `delivering` | Delivery attempt in flight. Zen Mesh has sent the event to the destination and is waiting for a response. | `delivered`, `failed` |
| `delivered` | Successfully delivered. The destination acknowledged the event with a 2xx response. | Terminal (success) |
| `failed` | Delivery attempt failed. The destination returned an error (4xx/5xx) or did not respond within the timeout. The event is queued for retry. | `delivering` (retry) |
| `exhausted` | All retry attempts have been exhausted. The event is moved to the Dead Letter Queue. | Terminal (DLQ) |
| `replaying` | Event has been re-queued from the DLQ for reprocessing. | `pending` |

## Delivery Attempts

Each delivery produces a history of attempts. An attempt record includes:

| Field | Description |
|-------|-------------|
| HTTP status | The HTTP status code returned by the destination (or 0 if connection failed) |
| Response body | The response body from the destination (truncated) |
| Timestamp | When the attempt was made |
| Duration | How long the attempt took (milliseconds) |
| Error | Connection error, timeout, or TLS error details if applicable |

### Inspect Delivery Status

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123
```

### View Attempt History

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123/attempts
```

### Query by Status

```bash
# List all exhausted events (currently in DLQ)
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  https://api.zen-mesh.io/v1/deliveries?status=exhausted&limit=20

# List recent failures
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  https://api.zen-mesh.io/v1/deliveries?status=failed&since=1h
```

## Retry Policy

Failed deliveries are retried with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | ~10 seconds |
| 3 | ~1 minute |
| 4 | ~10 minutes |
| 5 | ~1 hour |

After 5 failed attempts, the event moves to `exhausted` status and enters the Dead Letter Queue.

## Dead Letter Queue

Events in the DLQ (status `exhausted`) are retained for 7 days by default. DLQ events can be replayed manually:

```bash
curl -X POST -H "Authorization: Bearer $ZEN_API_KEY" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123/replay
```

See [Replay API](../api/replay.md) for replay details.

## Operational Limits

| Limit | Value |
|-------|-------|
| Max retry attempts | 5 |
| DLQ retention | 7 days (configurable) |
| Attempt history retention | 30 days |
| Rate limit | 100 req/min per tenant (burst 200) |

## Related

- [Webhook Delivery API Guide](../api/webhooks) — API endpoints and authentication
- [Dead Letter Queue](../delivery/dead-letter-queue) — DLQ management and inspection
- [Replay and Recovery](../delivery/replay-and-recovery) — event reprocessing workflows
- [Webhook Reliability](../delivery) — overall delivery controls

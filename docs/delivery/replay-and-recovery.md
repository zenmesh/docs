---
sidebar_label: Replay and Recovery
description: Webhook replay and recovery workflows — dead-letter queue redrive, event replay, retry policies, and failure handling.
---

# Webhook Replay and Recovery

Recover from webhook delivery failures with replay, retry, and dead-letter queue workflows.

## Capabilities

## Dead-Letter Queue
Failed delivery attempts are preserved in a dead-letter queue after retries are exhausted. Each failed event carries metadata about the delivery attempt, failure reason, and original payload. From the DLQ, events can be inspected, replayed, or archived.

See [Dead Letter Queue](./dead-letter-queue) for configuration options.

## Replay
Events from the DLQ or delivery history can be replayed to the original or alternate destinations. Replay supports event selection by time range, source, or correlation ID, and each replay attempt is recorded for audit.

See [Webhook Replay](./replay) for details.

## Retry Policy
Delivery retries are configurable per destination, including maximum retry attempts, backoff intervals, and failure classification. Transient failures are retried automatically; permanent failures move events to the DLQ.

See [Dead Letter Queue configuration](./dead-letter-queue#configuration-options) for retry policy settings.

## Related Capabilities

- [Webhook Idempotency](./idempotency) — safe duplicate processing during replay
- [Webhook Deduplication](./deduplication) — duplicate event detection
- [Webhook Delivery Evidence](../reference/webhook-delivery-evidence) — delivery audit trail

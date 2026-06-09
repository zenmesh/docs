---
sidebar_label: Delivery Failures
description: How Zen Mesh handles webhook delivery failures — retry policies, failure classification, dead-letter queue, and recovery workflows.
---

# Webhook Delivery Failures

Delivery failures are a normal part of webhook operations. Networks experience timeouts, services restart, and configurations change. How failures are handled determines the overall reliability of the system.

## Failure Classification

Delivery failures are classified to determine the appropriate response:

| Failure Type | Examples | Handling |
|-------------|----------|----------|
| **Transient** | Network timeout, connection refused, rate limit | Automatic retry with backoff |
| **Permanent** | Invalid destination, authentication failure | Move to DLQ, no retry |
| **Undetermined** | Timeout without response | Retry, then DLQ if repeated |

## Retry Policy

Retry behavior is configurable per destination:

- Maximum retry attempts
- Backoff interval and strategy (fixed, exponential)
- Retry conditions (which failure types trigger retry)
- Timeout per attempt

## Dead-Letter Queue

When retries are exhausted, events move to the dead-letter queue. DLQ preserves:
- Original event payload and headers
- Delivery attempt history with timestamps
- Failure reason and classification
- Source and destination identifiers

[Learn more about Dead Letter Queue](./dead-letter-queue)

## Recovery

From the DLQ, operators can:
- **Inspect** failure details and payload
- **Replay** events to original or alternate destinations
- **Archive** for compliance or audit
- **Discard** after review

[Learn more about Replay and Recovery](./replay-and-recovery)

## Related Capabilities

- [Webhook Reliability Guide](./webhook-reliability)
- [Webhook Replay vs Retry](./replay-vs-retry)
- [Webhook Delivery Evidence](../reference/webhook-delivery-evidence)

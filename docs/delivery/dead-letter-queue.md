---
sidebar_label: Dead Letter Queue
description: Failed webhook delivery attempts are preserved for inspection and recovery with configurable retention and retry policies.
---

# Dead Letter Queue for Webhooks

Failed webhook delivery attempts are preserved in a dead-letter queue (DLQ) for inspection, recovery, and replay workflows.

## What It Is

A dead-letter queue stores events that could not be delivered after exhausting the configured retry policy. Instead of dropping failed events, the DLQ preserves them with failure metadata so operators can inspect, replay, or archive them.

## How It Works

When a webhook delivery fails and all retry attempts are exhausted, the event is moved to a dead-letter queue with the following metadata:

- Original event payload and headers
- Delivery attempt history and timestamps
- Failure reason and classification
- Destination identifier and delivery mode

From the DLQ, events can be:

- Inspected to determine failure cause
- Replayed to the original or alternate destination
- Archived for compliance or audit purposes
- Discarded after review

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Enable/disable** | DLQ collection can be toggled per destination or delivery flow |
| **Retention window** | Time-based retention (e.g., 7 days, 30 days) before automatic eviction |
| **Retry policy** | Maximum retry attempts, backoff intervals, and retry conditions |
| **Failure classification** | Rules to categorize failures (transient vs. permanent) for routing decisions |
| **Redrive/replay source** | Source queue or event selector for replay operations |

## Operational Limits

- DLQ operations are validated in local and sandbox environments
- Retention limits depend on the underlying storage configuration
- Evidence references: FO-003 (DONE), N086 DeliveryPolicy (PASS)

## Example Scenario

A Stripe webhook event fails delivery to a private network target due to a temporary network outage. After 3 retry attempts with exponential backoff, the event is moved to the DLQ. An operator reviews the failure, resolves the network issue, and replays the event from the DLQ — restoring delivery without the source needing to resend.

## Related Capabilities

- [Webhook Replay](./replay)
- [Webhook Idempotency](./idempotency)

## Evidence and Status

**Status as of 2026-06:** Implemented and validated in local/sandbox environments. FO-003 delivery gate DONE. N086 DeliveryPolicy live-validated. Expanding to production validation is part of the active readiness roadmap.

---
sidebar_label: Replay vs Retry
description: The difference between webhook replay and retry — automatic retry for transient failures vs manual replay for recovery workflows.
---

# Webhook Replay vs Retry

Retry and replay are complementary but serve different purposes in webhook delivery recovery.

## Retry (Automatic)

Retry is an automatic response to delivery failure. When a delivery attempt fails with a transient error (timeout, connection refused), the system automatically retries according to the configured policy.

| Property | Retry |
|----------|-------|
| **Trigger** | Automatic on failure |
| **Scope** | Single event, same destination |
| **Timing** | Immediate with backoff |
| **Control** | Max attempts, backoff, conditions |
| **User action** | None (automatic) |

## Replay (Manual or Automated)

Replay is a recovery action that resends events from the DLQ or delivery history. It is typically triggered by an operator after resolving the root cause of a failure.

| Property | Replay |
|----------|--------|
| **Trigger** | Manual or automated after resolution |
| **Scope** | Multiple events, multiple destinations |
| **Timing** | After failure diagnosis and resolution |
| **Control** | Event selector, destination, window |
| **User action** | Initiate replay, select events |

## When to Use Each

| Scenario | Approach |
|----------|----------|
| Network blip (brief outage) | Retry handles automatically |
| Destination service restart | Retry handles with backoff |
| Configuration error | Replay after fixing config |
| Permanent destination change | Replay to new destination |
| Data loss from source | Replay from delivery history |

## Related Capabilities

- [Dead Letter Queue](./dead-letter-queue)
- [Webhook Replay](./replay)
- [Webhook Replay and Recovery](./replay-and-recovery)
- [Delivery Failures](./delivery-failures)

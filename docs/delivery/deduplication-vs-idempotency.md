---
sidebar_label: Deduplication vs Idempotency
description: The difference between webhook deduplication and idempotency — system-level duplicate detection vs consumer-side safe processing.
---

# Webhook Deduplication vs Idempotency

Deduplication and idempotency both address duplicate events but operate at different levels and serve different purposes.

## Deduplication (System-Level)

Deduplication detects and prevents duplicate events at the system level. The ingester checks incoming events against a deduplication store using a configurable key (event ID, correlation ID). If a match is found within the time window, the duplicate is dropped.

| Property | Deduplication |
|----------|---------------|
| **Where** | Ingester (system level) |
| **When** | Before delivery |
| **Mechanism** | Key-based lookup in deduplication store |
| **Scope** | Cross-session, within time window |
| **Persistence** | Currently in-memory; persistent store planned |

## Idempotency (Consumer-Side)

Idempotency enables consumers to safely process the same event multiple times. Events carry an idempotency key that consumers can use to check whether they have already processed the event. This is essential in at-least-once delivery systems.

| Property | Idempotency |
|----------|-------------|
| **Where** | Consumer (application level) |
| **When** | During processing |
| **Mechanism** | Idempotency key tracking by consumer |
| **Scope** | Per-consumer |
| **Persistence** | Consumer-managed |

## How They Work Together

```
Event arrives → System dedup check → Delivery → Consumer idempotency check → Processing
```

1. The system checks for duplicates to avoid redundant delivery
2. The consumer checks for idempotency to handle any duplicates that do arrive
3. Together, they minimize duplicate processing while allowing for recovery and replay

## Related Capabilities

- [Webhook Deduplication](./deduplication)
- [Webhook Idempotency](./idempotency)
- [Webhook Replay](./replay)
- [Webhook Reliability Guide](./webhook-reliability)

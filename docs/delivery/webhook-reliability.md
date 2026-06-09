---
sidebar_label: Webhook Reliability Guide
description: How Zen Mesh provides reliable webhook delivery with at-least-once semantics, failure recovery, duplicate handling, and delivery evidence.
---

# Webhook Reliability Guide

Reliable webhook delivery means events reach their destination even when networks, services, or infrastructure experience failures.

## At-Least-Once Delivery

Zen Mesh uses at-least-once delivery semantics. Events are retried automatically when delivery fails, and consumers can use idempotency handling to process duplicates safely. At-least-once does not mean exactly-once — consumers should expect possible duplicates during recovery scenarios.

## Failure Recovery

When delivery fails, the system attempts retries according to the configured policy. If all retries are exhausted, the event is preserved in the dead-letter queue. From the DLQ, events can be inspected, replayed, or archived.

[Learn more about Replay and Recovery](./replay-and-recovery)

## Duplicate Handling

Duplicate events can arrive from source retries, network retransmission, or recovery workflows. Deduplication identifies duplicates by comparing event keys against a time-bounded store. Idempotency provides consumer-side protection.

[Learn more about Deduplication](./deduplication) | [Idempotency](./idempotency)

## Delivery Evidence

Every delivery attempt is recorded with outcome, timestamps, and cryptographic integrity proofs. Evidence is machine-readable and accessible through evidence manifests.

[Learn more about Delivery Evidence](../reference/webhook-delivery-evidence)

## Related Capabilities

- [Dead Letter Queue](./dead-letter-queue)
- [Webhook Replay](./replay)
- [Webhook Fan-Out](./fan-out)
- [Webhook Filtering](./filtering)

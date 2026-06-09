---
sidebar_label: Replay
description: Replay webhook events from dead-letter queues or delivery history for recovery and reprocessing workflows.
---

# Webhook Replay

Replay previously delivered or failed webhook events for recovery, testing, and reprocessing workflows.

## What It Is

Webhook replay allows operators to resend events that were previously delivered or that failed and landed in the dead-letter queue. Replay supports event selection, destination routing, and audit logging.

## How It Works

Replay operates on stored events from two sources:

- **Dead-letter queue events** — failed deliveries preserved for recovery
- **Delivery history** — successfully delivered events retained for reprocessing

When a replay is triggered:

1. The event selector identifies matching events by time range, source, or correlation ID
2. Selected events are re-queued for delivery to the original or an alternate destination
3. Each replay attempt is recorded with a new delivery attempt ID for traceability
4. Replayed events pass through the same delivery controls (filtering, deduplication, idempotency) as original events

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Replay window** | Time range for selecting events to replay |
| **Event selector** | Criteria for event selection (source, status, correlation ID, delivery attempt) |
| **Destination selector** | Target destination for replayed events (original or alternate) |
| **Dry-run mode** | Preview which events would be replayed without executing delivery |
| **Audit reference** | Delivery evidence ID for correlating replay attempts with original delivery |

## Operational Limits

- Replay operations are validated in local and sandbox environments
- Replay window constraints depend on delivery history retention settings
- Evidence references: FO-004 (DONE Pilot)

## Example Scenario

A configuration error caused webhooks to be routed to the wrong destination for 30 minutes. After fixing the routing configuration, an operator uses the replay feature to resend all events from that window to the correct destination — recovering delivery without the source needing to resend.

## Related Capabilities

- [Dead Letter Queue](./dead-letter-queue)
- [Webhook Idempotency](./idempotency)

## Evidence and Status

**Status as of 2026-06:** Implemented with pilot validation. FO-004 delivery gate DONE. Replay from dead-letter queue operational with event selection and audit tracking.

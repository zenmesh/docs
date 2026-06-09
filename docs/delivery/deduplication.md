---
sidebar_label: Deduplication
description: Prevent duplicate webhook event processing with configurable deduplication controls and time-window matching.
---

# Webhook Deduplication

Deduplication controls help manage duplicate webhook event delivery and prevent unintended duplicate processing.

## What It Is

Webhook sources may deliver the same event more than once due to network retries, source-side retry policies, or eventual consistency guarantees. Deduplication identifies and drops duplicate events so downstream consumers do not process the same event multiple times.

## How It Works

Deduplication operates on incoming events using a configurable deduplication key:

1. On event arrival, a deduplication key is extracted from the event payload or headers
2. The key is checked against a deduplication store for recent matches within the configured time window
3. If a match is found, the event is identified as a duplicate and handled according to the configured action (drop, log, or mark)
4. If no match is found, the event proceeds to delivery and the key is recorded in the deduplication store

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Dedupe key** | Event field or header used as the deduplication identifier (e.g., event ID, correlation ID) |
| **Time window** | Duration for which a deduplication key is considered active |
| **Event ID / correlation ID** | Source-provided identifiers for deduplication (e.g., Stripe webhook ID, GitHub delivery ID) |
| **Persistence scope** | Scope of deduplication state (in-memory per instance, or persistent across restarts) |

## Operational Limits

- Current deduplication state is maintained in-memory; persistent deduplication across restarts is planned
- Deduplication does not replace idempotency handling on the consumer side
- Evidence references: FO-005 (DONE Demo)

## Example Scenario

A Stripe webhook event times out on the first delivery attempt. Stripe retries the same event. The deduplication system recognizes the duplicate via the Stripe webhook ID and drops the second attempt — preventing duplicate processing while the first attempt completes.

## Related Capabilities

- [Webhook Idempotency](./idempotency)
- [Webhook Replay](./replay)

## Evidence and Status

**Status as of 2026-06:** Key extraction and hashing implemented. Deduplication validated in sandbox (FO-005 DONE Demo). Persistent deduplication store is on the active roadmap.

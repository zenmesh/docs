---
sidebar_label: Idempotency
description: Idempotency controls help consumers safely process retries and duplicate events with at-least-once delivery semantics.
---

# Webhook Idempotency

Idempotency controls help consumers safely process retries and duplicate webhook events without unintended side effects.

## What It Is

Idempotency ensures that processing the same event multiple times produces the same result as processing it once. In an at-least-once delivery model, consumers may receive the same event more than once — idempotency handling allows them to safely ignore duplicates.

## How It Works

Idempotency is supported through idempotency keys that accompany each event:

1. Events include an idempotency key in their delivery metadata
2. Consumers can use the idempotency key to check whether they have already processed the event
3. If the event was already processed, the consumer can safely skip processing
4. If the event is new, the consumer processes it and records the idempotency key

The system itself also tracks idempotency keys during delivery to avoid duplicate delivery to the same consumer.

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Idempotency key** | Event field or header designated as the idempotency identifier |
| **Consumer handling** | Recommendation for consumer-side idempotency patterns |
| **Replay/retry relationship** | How replay and retry events interact with idempotency keys |
| **Persistence window** | Duration for which idempotency keys are retained |

## Operational Limits

- Current idempotency store is in-memory; persistent idempotency store across restarts is planned
- Zen Mesh uses at-least-once delivery with idempotency — consumers must handle possible duplicates
- Evidence references: FO-005 (DONE Demo)

## Example Scenario

A Stripe webhook event is delivered successfully but the acknowledgement is lost in transit. Stripe retries the same event with the same idempotency key. The consumer detects the duplicate key and returns the stored result — the event is processed exactly once from the consumer's perspective.

## Related Capabilities

- [Webhook Deduplication](./deduplication)
- [Webhook Replay](./replay)

## Evidence and Status

**Status as of 2026-06:** Idempotency key extraction and hashing implemented. Validated in sandbox (FO-005 DONE Demo). Persistent idempotency store is on the active roadmap.

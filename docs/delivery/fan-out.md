---
sidebar_label: Fan-Out
description: Deliver webhook events to multiple destinations from a single source with per-destination delivery policies.
---

# Webhook Fan-Out

Deliver webhook events to multiple destinations from a single event source with independent per-destination policies.

## What It Is

Fan-out enables a single incoming webhook event to be delivered to multiple targets simultaneously. Each destination can have its own delivery policy, retry configuration, and failure handling — allowing independent lifecycle management per consumer.

## How It Works

Fan-out is configured through the DeliveryFlow CRD, which supports multiple output destinations:

1. An event arrives at the ingester from a webhook source
2. The ingester evaluates the DeliveryFlow to identify all configured destinations
3. The event is forwarded to each destination independently
4. Each destination processes delivery according to its own policy (retry, DLQ, timeout)
5. Delivery outcomes are recorded independently per destination

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Destination list** | One or more target endpoints for event delivery |
| **Per-destination policy** | Independent retry, timeout, and DLQ settings per destination |
| **Failure isolation** | Failure to one destination does not affect delivery to others |
| **Ordering/concurrency** | Delivery concurrency and ordering semantics per destination |

## Operational Limits

- Multi-destination delivery is CRD-supported and contract-defined
- Object storage fan-out (e.g., S3) is partial
- S3 log export is available on Pro for delivery logs only — raw payload fan-out is planned for Business+
- Evidence references: DeliveryFlow CRD (multi-destination support), FO-001 (PARTIAL)

## Example Scenario

A payment webhook event must be delivered to both the order processing service and the analytics pipeline. With fan-out, a single incoming event is routed to both destinations simultaneously. If the analytics pipeline is temporarily unavailable, the order processing service still receives the event without delay.

## Related Capabilities

- [Webhook Filtering](./filtering)
- [Dead Letter Queue](./dead-letter-queue)

## Evidence and Status

**Status as of 2026-06:** Multi-destination fan-out is CRD-supported and contract-defined. Object storage fan-out destinations (FO-001) are partial and under active development. S3 log export (delivery logs only) is available on Pro. Raw payload fan-out and S3 Object Lock are planned for Business+.

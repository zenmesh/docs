---
sidebar_label: Routing and Fan-Out
description: Webhook event routing and fan-out — filtering, multi-destination delivery, event routing conditions, and per-destination policies.
---

# Webhook Routing and Fan-Out

Control how webhook events are routed to their destinations with filtering, fan-out, and per-destination delivery policies.

## Capabilities

## Event Filtering
Filtering controls which events are delivered to which destinations. Conditions can be configured on event headers, body fields, or metadata to allow, drop, or route events to specific targets.

See [Webhook Filtering](./filtering) for configuration details.

## Fan-Out Delivery
A single incoming event can be delivered to multiple destinations simultaneously. Each destination has independent delivery policies — retry, timeout, and DLQ settings — so failure in one destination does not affect others.

See [Webhook Fan-Out](./fan-out) for multi-destination delivery options.

## Delivery Flow Configuration
Routing behavior is defined through the DeliveryFlow CRD, which specifies:

- Source event criteria
- Destination endpoints and delivery modes
- Per-destination policies (retry, timeout, DLQ)
- Filtering conditions

## Related Capabilities

- [Webhook Reliability](../delivery/) — overall delivery reliability controls
- [Webhook Filtering](./filtering) — condition-based event routing
- [Webhook Replay and Recovery](./replay-and-recovery) — failure recovery workflows

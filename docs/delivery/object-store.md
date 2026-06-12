# Object Store Targets

> **Status:** Requires runtime proof before Day 1 claim (see [Leonardo Decision Queue](../review/docsai023_leonardo_decision_queue) — LD-014).

Deliver webhook events to object storage (S3-compatible) as a destination type.

## Configuration

Object store targets use the same destination configuration as HTTP targets, with additional fields:

- **Bucket** — Target bucket name
- **Prefix** — Key prefix for stored events
- **Region** — Bucket region

## Status

This feature is in design. It requires runtime proof before any public Day 1 claim. Refer to the decision queue for current status.

## Related

- [Fan-Out (Multi-Destination)](fan-out) — Deliver to multiple targets including object stores
- [Destinations](../guides/destinations) — Adding and managing targets

# Delivery

Everything about how Zen Mesh delivers your webhooks to targets.

## Core Delivery

- **[How Delivery Works](overview)** — End-to-end delivery pipeline
- **[Destinations](../guides/destinations)** — Adding and managing delivery targets
- **[Event Routing](event-routing)** — Route events to targets based on conditions
- **[JSONPath Routing](jsonpath-routing)** — Route using JSONPath expressions
- **[JSONPath Transforms](jsonpath-transforms)** — Transform payloads with JSONPath

## Reliability

- **[Retry & Dead Letter Queue](dead-letter-queue)** — What happens when delivery fails
- **[Replay](replay)** — Re-deliver events from history
- **[Deduplication](deduplication)** — Prevent duplicate delivery

## Advanced Delivery

- **[Fan-Out (Multi-Destination)](fan-out)** — Deliver one event to multiple targets, including object stores
- **[Filtering](filtering)** — Filter which events get delivered
- **[Object Store Targets](object-store)** — Deliver events to object storage (requires runtime proof for Day 1 claim)

## Monitoring & Evidence

- **[Evidence Overview](../evidence/overview)** — Merkle receipts and proof of delivery
- **[Delivery Logs](../api/logs)** — API access to delivery event history
- **[Troubleshooting Delivery](../guides/troubleshooting)** — Common issues and fixes

## Status

Object store fan-out requires runtime proof before Day 1 claim (see [Leonardo Decision Queue](../review/docsai023_leonardo_decision_queue) — LD-014).

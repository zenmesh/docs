---
sidebar_label: Webhook Reliability
description: Operational controls for reliable webhook delivery — dead-letter queues, replay, deduplication, idempotency, filtering, and fan-out.
---

# Webhook Reliability

Reliable webhook delivery requires more than forwarding events. Zen Mesh provides operational controls for recovery, duplicate handling, and targeted routing.

## Capabilities

| Capability | Purpose |
|------------|---------|
| [Dead Letter Queue](./dead-letter-queue) | Preserve failed delivery attempts for inspection, recovery, and replay |
| [Webhook Replay](./replay) | Replay events from DLQ or delivery history for reprocessing |
| [Webhook Deduplication](./deduplication) | Identify and handle duplicate events with configurable dedup keys |
| [Webhook Idempotency](./idempotency) | Safe retry and duplicate processing with idempotency controls |
| [Webhook Filtering](./filtering) | Route or suppress events according to configured conditions |
| [Webhook Fan-Out](./fan-out) | Deliver events to multiple destinations with per-destination policies |
| [JSONPath Routing](./jsonpath-routing) | Route webhooks with safe JSONPath filter and match rules |
| [JSONPath Transforms](./jsonpath-transforms) | Map and reshape webhook payloads with JSONPath expressions |

## Architecture

All delivery capabilities operate within the Zen Mesh data plane. Events pass through:

1. **Ingester** — event intake, signature verification, filtering, deduplication
2. **Delivery controller** — routing, retry, DLQ management, fan-out
3. **Egress** — delivery to customer targets with per-destination policies

## Related

- [Webhook Security Controls](../security/)
- [Webhook Delivery Evidence](../reference/webhook-delivery-evidence)
- [Webhook Replay and Recovery](./replay-and-recovery)

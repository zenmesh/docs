---
sidebar_label: Object-Store Fan-Out
description: Object-store fan-out contract — fan-out delivery to S3-compatible object storage as a durable replayable backup destination for webhook events.
---

# Object-Store Fan-Out Contract

**Status:** Launch target / contract-ready — NOT runtime-proven. This is a contract-defined capability ready for implementation. Do not represent as production-ready or currently supported.

## V1 Scope

**Object-store fan-out is NOT in V1 scope.** V1 delivers events to HTTP webhook destinations only. See [Multi-Target Delivery Contract](/docs/contracts/multi-target-delivery).

## Contract-Defined (Ready for Implementation)

- **S3-compatible object store** support is contract-defined and ready for implementation. Not yet runtime-proven.
- **Customer expectations for object-store delivery:**
  - **Durability:** Events delivered to object storage benefit from the store's durability guarantees (e.g., S3 99.999999999%). ZenMesh does not add additional durability beyond what the target store provides.
  - **Retention:** Object-store targets may have bucket-level retention policies. Delivery to object store does not imply indefinite ZenMesh-side retention.
  - **Metadata vs payload:** Object-store records include delivery metadata (timestamp, status, labels) and the raw event payload. Customers configure which metadata is included per destination.
- **Evidence records:** When object-store delivery is implemented, delivery evidence (receipt ID, timestamp, target bucket/key, integrity hash) is recorded per destination — consistent with the [Evidence Export Contract](/docs/contracts/evidence-export).
- **Replay support:** Object-store delivery supports replay from stored objects. Replayed events are delivered as new deliveries with their own evidence chain.

## Roadmap (No Contract — No Implementation Commitment)

The following are roadmap items only. They are NOT contract-defined and carry no implementation commitment:

- Google Cloud Storage (GCS)
- Wasabi
- Azure Blob Storage
- NATS
- Message queues (MQ)
- Slack

## Open Decisions

- **Limit classification:** Whether object-store fan-out counts against:
  - Route limits (one route = one unit regardless of destination type)
  - Separate object-store destination limits
  - Per-destination limits aggregated with webhook destinations
- Whether object-store delivery requires explicit opt-in or is available on all plans.
- Minimum object-store event size and maximum payload thresholds.

## See Also

- [Multi-Target Delivery Contract](/docs/contracts/multi-target-delivery) — V1 multi-destination delivery scope
- [Delivery: Fan-Out](/docs/delivery/fan-out) — fan-out architecture
- [Delivery: Dead-Letter Queue](/docs/delivery/dead-letter-queue) — DLQ interaction with object-store targets
- [Plans & Limits](/docs/start-here/limits) — plan limits

# How Delivery Works

> **Status:** Content pending — see existing [Webhook Reliability](webhook-reliability) and [Delivery Modes](../architecture/delivery-modes) for current details.

Zen Mesh delivers webhook events from providers to your configured destinations through a reliable pipeline.

## Pipeline Stages

1. **Ingestion** — Event received from provider via secure endpoint
2. **Validation** — Payload verified against source schema
3. **Routing** — Event matched to destination rules
4. **Delivery** — Event forwarded to target endpoint
5. **Acknowledgment** — Success/failure recorded with evidence

## Related

- [Fan-Out](fan-out) — Multi-destination delivery
- [Retry & Dead Letter Queue](dead-letter-queue) — Failure handling
- [Replay](replay) — Re-deliver from history
- [Evidence Overview](../evidence/overview) — Merkle proof of delivery

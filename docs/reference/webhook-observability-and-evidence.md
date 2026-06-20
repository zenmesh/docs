---
sidebar_label: Observability and Evidence
description: Webhook observability and delivery evidence — delivery receipts, audit logs, Merkle integrity, monitoring, and machine-readable evidence manifests.
---

# Webhook Observability and Evidence

Observability for webhook delivery covers delivery tracking, audit trails, integrity verification, and machine-readable evidence for AI and compliance review.

## Delivery Observability

Each webhook event generates observable delivery data:

| Data | Description |
|------|-------------|
| **Delivery receipts** | Per-event delivery outcome with source, destination, status, timestamp |
| **Delivery history** | Complete attempt history including retries and DLQ events |
| **Failure metadata** | Failure reason, classification, and timing for each failed attempt |
| **Latency tracking** | Per-hop timing for delivery path performance |

## Evidence Integrity

Delivery evidence is protected against tampering:

- **Hash-chain audit log** — each entry contains a hash of the previous entry
- **Merkle integrity comparison** — evidence snapshots verified against content-addressed roots
- **Append-only storage** — evidence records are never deleted, only superseded

## Machine-Readable Evidence

Evidence manifests are available for automated review:

- [Capability Manifest](../ai/evidence-v1-supersession#manifest) — machine-readable capability status and proof status
- [Non-Claims Registry](../ai/evidence-v1-supersession#non-claims) — explicit scope boundaries
- [Compliance Map](../ai/evidence-v1-supersession#compliance-map) — internal readiness mapping
- [Validation Map](../evidence/validation-map) — how to validate evidence locally

## Related Capabilities

- [Webhook Delivery Evidence](./webhook-delivery-evidence)
- [Webhook Reliability](../delivery/)
- [Webhook Replay and Recovery](../delivery/replay-and-recovery)
- [Evidence Overview](../evidence/overview)

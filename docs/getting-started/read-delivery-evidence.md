---
sidebar_label: Read Delivery Evidence
description: Inspect delivery evidence records — timestamps, status transitions, payload integrity, and Merkle verification.
---

# Read Delivery Evidence

Every webhook event that flows through Zen Mesh produces an **evidence record** — an immutable, tamper-evident log of the delivery lifecycle. Evidence records are the source of truth for answering "did my webhook arrive, when, and was it modified?"

## What an Evidence Record Contains

Each record captures:

| Field | Description |
|-------|-------------|
| `event_id` | Unique event identifier |
| `source_id` | The source that ingested the event |
| `target_id` | The target delivery was attempted to |
| `route_id` | The route that matched this event |
| `ingested_at` | Timestamp when Zen Mesh received the event |
| `delivery_attempts` | Array of per-attempt results |
| `status` | Final delivery status |
| `payload_hash` | SHA-256 hash of the original payload |
| `labels` | Labels inherited from the route |
| `chain_hash` | Hash linking this record into the integrity chain |

## Accessing Evidence

### Via the Dashboard

1. Go to **Deliveries** in the sidebar
2. Click any event to open its evidence record
3. The record displays:
   - Delivery timeline with status transitions
   - HTTP status code per attempt
   - Round-trip latency per attempt
   - Payload details (headers present, body size)

### Via the API

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  "https://api.zen-mesh.io/v1/events/evt_abc123def456/evidence"
```

Response:

```json
{
  "event_id": "evt_abc123def456",
  "source_id": "src_stripe_prod",
  "target_id": "tgt_webhook_receiver",
  "route_id": "route_payments",
  "ingested_at": "2026-06-11T14:30:00Z",
  "delivery_attempts": [
    {
      "attempt": 1,
      "timestamp": "2026-06-11T14:30:01Z",
      "status_code": 200,
      "latency_ms": 145,
      "target_response": "ok"
    }
  ],
  "status": "delivered",
  "payload_hash": "sha256$abc123...",
  "chain_hash": "abc123...",
  "labels": {
    "team": "payments",
    "environment": "production"
  }
}
```

## Delivery Status Transitions

An event moves through these states:

```
ingested → pending → delivered    ✓
                    → retrying → delivered    ✓
                               → failed       ✗
                               → expired      ⌛
```

Each transition is timestamped and recorded in the evidence.

## Evidence Integrity

Evidence records are tamper-evident. Each record's `chain_hash` is derived from:

- The record's own fields
- The `chain_hash` of the previous record

This creates a hash chain that makes retrospective modification detectable. Any attempt to alter a past record would break the chain.

### Merkle Inclusion Verification (Pro+)

:::note
Merkle inclusion proofs are a **Pro+** feature and are not available on the Free plan.
:::

Pro+ plans include periodic Merkle tree root commits to a public transparency log. You can verify that a specific evidence record was included in a commit by:

1. Fetching the Merkle proof from the API:

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  "https://api.zen-mesh.io/v1/events/evt_abc123def456/proof"
```

2. Verifying the proof against the published root:

```bash
zen-mesh evidence verify \
  --event-id evt_abc123def456 \
  --root 0xdeadbeef...
```

This provides cryptographic proof that the delivery record existed at the time of the Merkle commit.

## Next Steps

Explore [filtering your deliveries with labels](./use-labels) or learn about [upgrading to Pro](./upgrade-free-to-pro) for Merkle verification.

## See Also

- [Evidence Overview](../evidence/overview)
- [Merkle Integrity](../evidence/merkle-integrity)
- [Evidence API](../api/evidence)
- [Delivery Status Reference](../reference/delivery-status)

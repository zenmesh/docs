---
sidebar_label: Send a Test Webhook
description: Fire a test payload at your ingestion URL and watch it flow through Zen Mesh.
---

# Send a Test Webhook

Once you have a source, target, and route configured, you can send a test event to verify the delivery pipeline end-to-end.

## Prerequisites

- An [active source](./create-first-source) with its ingestion URL
- An [active target](./create-first-target)
- An [active route](./create-first-route) connecting them

## Step 1: Get Your Ingestion URL

From the source detail page in the dashboard, copy the ingestion URL:

```
https://ingest.zen-mesh.io/hooks/hook_abc123def456
```

## Step 2: Send a Test Event with curl

Use curl (or any HTTP client) to POST a JSON payload:

```bash
curl -X POST "https://ingest.zen-mesh.io/hooks/hook_abc123def456" \
  -H "Content-Type: application/json" \
  -H "X-Zen-Event-Type: payment_intent.succeeded" \
  -d '{
    "id": "evt_test_123",
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_test_456",
        "amount": 2999,
        "currency": "usd",
        "status": "succeeded"
      }
    },
    "created": 1712800000
  }'
```

If your source has verification enabled, include the signature header:

```bash
curl -X POST "https://ingest.zen-mesh.io/hooks/hook_abc123def456" \
  -H "Content-Type: application/json" \
  -H "X-Zen-Signature-256: t=1712800000,v1=abc123..." \
  -H "X-Zen-Event-Type: payment_intent.succeeded" \
  -d '{"type": "payment_intent.succeeded", "data": {...}}'
```

Expected response:

```
202 Accepted
x-zen-event-id: evt_abc123def456
x-zen-request-id: req_xyz789
```

A `202 Accepted` means Zen Mesh has received the event and will attempt delivery.

## Step 3: Check Delivery Status

1. In the dashboard, go to **Deliveries**
2. Find your event by its `x-zen-event-id`
3. The delivery status tells you what happened:

| Status | Meaning |
|--------|---------|
| `delivered` | Target responded with 2xx |
| `pending` | Delivery in progress |
| `failed` | Delivery failed (check logs) |
| `retrying` | Automatic retry in progress |
| `expired` | All retries exhausted |

## Step 4: Inspect the Evidence Record

Click on the event to open the evidence record. You'll see:

- **Ingestion timestamp**
- **Delivery attempts** with per-attempt status codes
- **Final delivery status**
- **Labels** applied by your route filters
- **Payload hash** for integrity verification

See [Read Delivery Evidence](./read-delivery-evidence) for details.

## Troubleshooting

| Symptom | Likely Cause |
|---------|--------------|
| `404` on ingestion | Hook ID is incorrect |
| `410` on ingestion | Source has been deleted or revoked |
| Event ingested but not delivered | Route is paused or target is unreachable |
| `delivered` status but target didn't process | Check your target application logs |
| Events missing from deliveries | Route filters may be excluding them |

## Next Steps

Learn how to [read delivery evidence](./read-delivery-evidence) and understand the full lifecycle of your event.

## See Also

- [Delivery Status Reference](../reference/delivery-status)
- [Delivery Evidence API](../api/evidence)
- [Create Your First Route](./create-first-route)
- [Webhook Delivery Evidence](../reference/webhook-delivery-evidence)

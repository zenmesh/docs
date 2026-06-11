---
sidebar_label: First Stripe Webhook
description: Connect Stripe to Zen Mesh — configure a Stripe source, set up signing secret verification, and deliver payment events to your target.
---

# Your First Stripe Webhook

Connect Stripe to Zen Mesh and deliver payment, subscription, and invoice events to your internal services.

Stripe sends event notifications for charges, subscriptions, invoices, disputes, and more. Zen Mesh validates Stripe's signature at ingestion, routes events through your configured pipeline, and delivers them to your target.

**Status:** Available at launch.

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io) with a configured [source](./create-first-source)
- A Stripe account with [webhook signing secret](https://docs.stripe.com/webhooks#signing-secret) — you can find this in the Stripe Dashboard under **Developers → Webhook endpoints** after creating an endpoint
- A [target](./create-first-target) configured and reachable

## Step-by-Step

### 1. Create a Stripe Source

1. In the Zen Mesh dashboard, go to **Sources → Add Source**
2. Enter a name, for example `stripe-prod-payments`
3. Select **Stripe** as the provider type
4. Under **Verification**, paste your Stripe webhook signing secret

   ```
   verification:
     method: "signature_based"
     secret: "whsec_your_signing_secret"
     header: "Stripe-Signature"
   ```

5. Save the source and copy the ingestion URL

   ```
   https://ingest.zen-mesh.io/hooks/hook_abc123def456
   ```

Zen Mesh uses the signing secret to validate that incoming events were sent by Stripe and have not been tampered with.

### 2. Create a Target

1. Go to **Targets → Add Target**
2. Enter a name, for example `payment-webhook-receiver`
3. Enter the URL of your service that will receive Stripe events
4. If the service is on a private network, select your connected cluster
5. Click **Save**

See [Create Your First Target](./create-first-target) for details.

### 3. Create a Route

1. Go to **Routes → Add Route**
2. Enter a name, for example `stripe-payments-to-receiver`
3. Select the Stripe source you created
4. Select the target you created
5. Optionally add filters for specific event types:

   ```yaml
   filters:
     event_types:
       - payment_intent.succeeded
       - payment_intent.payment_failed
       - invoice.paid
   ```

6. Click **Save** and toggle the route to **Active**

See [Create Your First Route](./create-first-route) for details.

### 4. Configure Stripe Dashboard

1. In the Stripe Dashboard, go to **Developers → Webhooks → Add endpoint**
2. Paste your Zen Mesh ingestion URL as the endpoint URL

   ```
   https://ingest.zen-mesh.io/hooks/hook_abc123def456
   ```

3. Select the events you want to receive. Common selections:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
4. Click **Add endpoint**
5. Copy the **Signing secret** (`whsec_...`) that Stripe displays
6. Return to your Zen Mesh source and paste this signing secret into the verification configuration

### 5. Add Labels

Attach labels to organize your Stripe pipeline:

```
labels:
  team: payments
  project: checkout
```

Apply these to your source, target, and route. Labels help you find resources later and power access control scoping once RBAC ships. See [Use Labels](./use-labels).

## Test Your Integration

### From the Stripe Dashboard

1. In Stripe Dashboard, go to **Developers → Webhooks → your endpoint**
2. Click **Send test webhook**
3. Select an event type (e.g. `payment_intent.succeeded`)
4. Stripe sends a test payload to your Zen Mesh ingestion URL

### With curl (without signature verification)

If you want to test outside Stripe's dashboard while setting up:

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
    }
  }'
```

Expect a `202 Accepted` response with an `x-zen-event-id` header.

## Verify Delivery

1. Go to **Deliveries** in the Zen Mesh dashboard
2. Find the event by its `x-zen-event-id`
3. Confirm the status shows **delivered** with a 2xx response from your target

## Check the Evidence Record

1. Click the event in the Deliveries view to open the evidence record
2. Review:
   - **Ingestion timestamp** — when Stripe sent the event
   - **Delivery attempts** — per-attempt status codes and latency
   - **Payload hash** — SHA-256 of the original Stripe payload for integrity checks
   - **Labels** — inherited from your source and route

See [Read Delivery Evidence](./read-delivery-evidence) for details.

## Troubleshooting

| Problem | Likely Cause |
|---------|--------------|
| Events not appearing in Deliveries | Stripe endpoint URL is incorrect — check the ingestion URL in Stripe Dashboard |
| Delivery shows `failed` | Target is unreachable — verify the target URL and cluster connection |
| `401` on ingestion | Signing secret mismatch — verify the `whsec_...` secret in your Zen Mesh source matches Stripe |
| Stripe test event shows `disconnected` | Endpoint URL returned a non-2xx — check that your route is active and target is up |
| Only some event types appear | Route filters may be excluding event types — review your route filter config |
| Latency between Stripe event and delivery | Stripe queues events asynchronously; most deliver within seconds |

## Relevant Limits

- **Free plan**: 1,000 events/month, 3 sources, 3 routes, 256 KB max payload
- **Pro plan**: 100,000 events/month, 50 sources, 50 routes, 2 MB max payload
- Stripe events with payloads larger than your plan's max payload size are rejected with a `413 Payload Too Large`

See [Plans & Limits](../start-here/limits) for the full breakdown.

## See Also

- [Stripe Integration Guide](../guides/stripe) — full reference, event catalog, and advanced configuration
- [Send a Test Webhook](./send-test-webhook)
- [Read Delivery Evidence](./read-delivery-evidence)
- [Plans & Limits](../start-here/limits)
- [Support](../start-here/support)

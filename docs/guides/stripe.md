---
sidebar_label: Stripe Integration
description: Receive and process Stripe webhook events through Zen Mesh — event types, webhook setup, signature verification, and delivery.
---

# Stripe Integration

Receive Stripe webhook events securely in your private infrastructure.

## Overview

Zen Mesh ingests Stripe webhook events and delivers them to your internal services. Stripe sends event notifications to Zen Mesh, which validates signatures, applies routing, and delivers to your configured destinations.

## Supported Event Types

Stripe sends events across all API resources. Common event categories include:

| Category | Example Events |
|----------|---------------|
| **Payment Intents** | `payment_intent.succeeded`, `payment_intent.payment_failed` |
| **Charges** | `charge.completed`, `charge.refunded`, `charge.failed` |
| **Checkout Sessions** | `checkout.session.completed`, `checkout.session.expired` |
| **Subscriptions** | `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` |
| **Customers** | `customer.created`, `customer.updated`, `customer.deleted` |
| **Invoices** | `invoice.paid`, `invoice.payment_failed`, `invoice.finalized` |
| **Disputes** | `charge.dispute.created`, `charge.dispute.closed` |
| **Payouts** | `payout.paid`, `payout.failed` |
| **Issuing** | `issuing_authorization.request`, `issuing_transaction.created` |

## Setting Up Delivery

### 1. Create a Destination

Create a destination pointing to your internal service:

```
Namespace: production
Name: stripe-payment-processor
URL: http://payment-svc:8080/webhooks/stripe
```

See [Destinations](./destinations) for destination configuration details.

### 2. Configure the Delivery Flow

Set up a delivery flow that routes Stripe events to your destination. You can filter by event type, apply [JSONPath routing](../delivery/jsonpath-routing) rules, and set per-destination delivery policies.

### 3. Configure Stripe Webhook Endpoint

In the Stripe Dashboard, go to **Developers → Webhooks** and add an endpoint:

1. **Endpoint URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **Events**: Select the event types you want to receive
3. **API version**: Keep your account's default or pin a specific version

### 4. Signature Verification

Stripe signs webhook events with a secret key. Configure signing secret validation in Zen Mesh to reject unsigned or tampered requests:

1. Copy your Stripe webhook signing secret (`whsec_...`)
2. Configure the signing secret in the Zen Mesh dashboard under your source settings
3. Zen Mesh verifies the `Stripe-Signature` header on each incoming event
4. Events with invalid or missing signatures are rejected before delivery

## Event Payload Structure

Stripe events follow a standard envelope format:

```json
{
  "id": "evt_3N1L9Z2eZvKYlo2C1abc1234",
  "object": "event",
  "api_version": "2023-10-16",
  "created": 1696000000,
  "type": "charge.completed",
  "data": {
    "object": { /* resource-specific payload */ }
  },
  "livemode": false,
  "pending_webhooks": 0,
  "request": { "id": "req_abc123", "idempotency_key": null }
}
```

## JSONPath Transform Example

Use [JSONPath Transforms](../delivery/jsonpath-transforms) to normalize Stripe payloads to consistent internal fields:

```json
[
  { "target": "event_id",     "source": "jsonpath", "expression": "$.data.object.id" },
  { "target": "amount_cents", "source": "jsonpath", "expression": "$.data.object.amount" },
  { "target": "currency",     "source": "jsonpath", "expression": "$.data.object.currency" },
  { "target": "status",       "source": "jsonpath", "expression": "$.data.object.status" }
]
```

## Test Event Flow

To verify your Stripe integration, send a test event using curl:

```bash
curl -X POST https://ingest.zen-mesh.io/hooks/<your-hook-id> \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: t=1696000000,v1=test_signature_value" \
  -d '{
    "id": "evt_test_event",
    "object": "event",
    "api_version": "2023-10-16",
    "created": 1696000000,
    "livemode": false,
    "type": "charge.completed",
    "data": {
      "object": {
        "id": "ch_test_charge",
        "object": "charge",
        "amount": 2000,
        "currency": "usd",
        "status": "succeeded",
        "description": "Test charge"
      }
    },
    "pending_webhooks": 0
  }'
```

Check delivery in the Zen Mesh dashboard under **Delivery Logs** — look for a `200` status and a successful delivery record. See [Send a Test Webhook](../getting-started/send-test-webhook) for more options.

## Payload, Log, and Evidence Visibility

| What | Visible To |
|------|------------|
| Delivery logs | Timestamps, HTTP status, destination URL (domain only), event type, label metadata |
| Evidence records | Delivery receipt, status code, label snapshots, optional payload if configured |
| Metadata (timestamps, status, labels) | Zen support by default |
| Raw payload content | Never stored in operational logs |
| Payload-level access | Requires explicit customer authorization per request |

Raw payload content is never written to operational logs. Payload inspection at the event level requires explicit authorization per request. See [Data Handling](../start-here/data-handling) and [Evidence Overview](../evidence/overview) for details.

## Labels and RBAC Recommendations

Apply labels to your Stripe source and delivery flow resources:

```yaml
labels:
  team: payments
  project: checkout
  environment: production
  service: payment-processor
```

Label filters use AND semantics — specifying `team=payments,environment=production` matches resources with both labels.

| Plan | Label Limit |
|------|-------------|
| Free | 5 labels per resource |
| Pro | 20 labels per resource |
| Business | 50 labels per resource (planned) |
| Enterprise | Custom |

RBAC and ABAC via label selectors are planned capabilities. The MCP can read and filter labels but cannot mutate them. See [Labels Platform](../guides/labels).

## Limits and Plan Notes

| Feature | Free | Pro |
|---------|------|-----|
| Endpoints | 3 | 50 |
| Events per month | 1,000 | 100,000 |
| Max payload size | 256 KB | 2 MB |
| JSONPath filters/transforms | — | Pro+ only |
| Evidence views/export | All plans | All plans |
| Fan-out | No | S3 fan-out planned/target |

**Over-limit behavior:** Free plans receive an HTTP 429 hard stop with an upgrade path. Pro plans receive warnings with overage and upgrade options.

See [Plans & Limits](../start-here/limits).

## Troubleshooting

**Signature verification failures**
- Ensure the signing secret matches the one in your Stripe dashboard
- Check for clock skew — Stripe's timestamp tolerance is 5 minutes
- Replayed events carry the same signature; Zen Mesh detects duplicates by event ID

**Delivery failures**
- Verify the destination URL is reachable from Zen Mesh
- Check TLS configuration on your destination endpoint
- Review the delivery logs for HTTP status codes

**Missing events**
- Confirm the event type is selected in the Stripe Dashboard webhook configuration
- Check JSONPath routing filters — an overly restrictive filter may drop events
- Verify the Stripe webhook endpoint is marked as enabled in the Stripe Dashboard

**Rate limiting**
- Stripe sends events individually per resource; bursts are rare
- If you see 429 responses, contact Zen Mesh support

See [Delivery Failures](../delivery/delivery-failures) and [Operations Troubleshooting](../operations/troubleshooting).

## Launch Status

Stripe integration is supported at launch. Signature verification, event type filtering, and delivery to private networks are available.

## See Also

- [Onboarding: Create Your First Source](../getting-started/create-first-source)
- [Onboarding: Send a Test Webhook](../getting-started/send-test-webhook)
- [Onboarding: Read Delivery Evidence](../getting-started/read-delivery-evidence)
- [Security Overview](../security/)
- [Data Handling](../start-here/data-handling)
- [Support](../start-here/support)
- [Pricing](https://zen-mesh.io/pricing)
- [Plans & Limits](../start-here/limits)

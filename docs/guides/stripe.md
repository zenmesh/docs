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

## 1. Create a Target

Create a target pointing to your internal service:

```
Namespace: production
Name: stripe-payment-processor
URL: http://payment-svc:8080/webhooks/stripe
```

See [Targets API](../api/targets) for target configuration details.

## 2. Configure the Delivery Flow

Set up a delivery flow that routes Stripe events to your destination. You can filter by event type, apply [JSONPath routing](../delivery/jsonpath-routing) rules, and set per-destination delivery policies.

## 3. Configure Stripe Webhook Endpoint

In the Stripe Dashboard, go to **Developers → Webhooks** and add an endpoint:

1. **Endpoint URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **Events**: Select the event types you want to receive
3. **API version**: Keep your account's default or pin a specific version

## 4. Signature Verification

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

## Related

- [First Webhook Tutorial](../getting-started/first-webhook) — end-to-end walkthrough
- [JSONPath Transforms](../delivery/jsonpath-transforms) — payload normalization
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering and routing
- [Targets API](../api/targets) — target configuration

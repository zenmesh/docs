---
sidebar_label: Shopify Integration
description: Receive and process Shopify webhook events through Zen Mesh — event types, webhook setup, signature verification, and delivery. Launch target — connector validation in progress.
---

# Shopify Integration

Receive Shopify webhook events securely in your private infrastructure.

> Shopify webhook integration is planned for the initial launch window. This guide describes the target configuration — connector validation is in progress.

## Overview

Zen Mesh ingests Shopify webhook events and delivers them to your internal services. Shopify sends event notifications for store activity — orders, products, customers, and more — to Zen Mesh, which validates signatures and delivers to your configured destinations.

## Supported Event Types

Shopify sends events across orders, products, customers, and shop activity:

| Category | Example Events |
|----------|---------------|
| **Orders** | `orders/create`, `orders/updated`, `orders/paid`, `orders/fulfilled` |
| **Products** | `products/create`, `products/update`, `products/delete` |
| **Customers** | `customers/create`, `customers/update`, `customers/delete` |
| **Shop** | `shop/update`, `app/uninstalled` |

## Setting Up Delivery

### 1. Create a Destination

Create a destination pointing to your internal service:

```
Name: shopify-order-processor
URL: http://order-svc:8080/webhooks/shopify
```

See [Destinations](./destinations) for destination configuration details.

### 2. Configure the Delivery Flow

Set up a delivery flow that routes Shopify events to your destination. You can filter by event type, apply [JSONPath routing](../delivery/jsonpath-routing) rules, and set per-destination delivery policies.

### 3. Configure Shopify Webhook

In your Shopify Admin, go to **Settings → Notifications → Webhooks**:

1. **Webhook URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **Format**: JSON
3. **Events**: Select the event types you want to receive
4. **API version**: Use the latest stable Shopify API version

### 4. Signature Verification

Shopify signs webhook events using HMAC-SHA256. Configure the shared secret in Zen Mesh:

1. Copy your Shopify webhook shared secret from **Settings → Notifications → Webhooks**
2. Configure it in the Zen Mesh dashboard under your source settings
3. Zen Mesh verifies the `X-Shopify-Hmac-SHA256` header on each incoming event
4. Events with invalid or missing signatures are rejected before delivery

## Event Payload Structure

Shopify events follow a standard format:

```json
{
  "id": 1234567890,
  "topic": "orders/create",
  "created_at": "2025-01-15T10:30:00-05:00",
  "data": {
    "id": 9876543210,
    "order_number": 1001,
    "email": "customer@example.com",
    "total_price": "29.99",
    "currency": "USD",
    "financial_status": "paid",
    "fulfillment_status": null
  }
}
```

## JSONPath Transform Example

Use [JSONPath Transforms](../delivery/jsonpath-transforms) to normalize Shopify payloads to consistent internal fields:

```json
[
  { "target": "event_id",      "source": "jsonpath", "expression": "$.id" },
  { "target": "event_type",    "source": "jsonpath", "expression": "$.topic" },
  { "target": "order_id",      "source": "jsonpath", "expression": "$.data.id" },
  { "target": "total",         "source": "jsonpath", "expression": "$.data.total_price" },
  { "target": "currency",      "source": "jsonpath", "expression": "$.data.currency" }
]
```

## Related

- [Sources Overview](./sources) — supported webhook providers
- [JSONPath Transforms](../delivery/jsonpath-transforms) — payload normalization
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering and routing
- [Stripe Integration](./stripe) — similar setup for payment webhooks

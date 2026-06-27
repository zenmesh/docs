---
sidebar_label: Shopify v2
---

# Shopify v2 Package

**Ownership:** Official
**Maturity:** Preview
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** E-commerce

## Overview

The Shopify v2 package processes Shopify webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `orders/create`
- ✅ `orders/update`
- ✅ `products/create`
- ✅ `products/update`
- ✅ `products/delete`
- ✅ `customers/create`
- ✅ `customers/update`

## YAML/DAG Contract

```yaml
package:
  name: shopify-v2
  version: 2.0.0
  provider: shopify
  visibility: internal/private
  description: "Shopify webhook processing package for e-commerce"
  canonical_layer: data
  canonical_area: e-commerce

endpoints:
  - name: shopify-webhook
    provider: shopify
    url: https://your-domain.com/webhooks/shopify
    auth: {type: api_key, key: X-Shopify-Hmac-Sha256}
    events:
      - orders/create
      - orders/update
      - products/create
      - products/update
      - products/delete
      - customers/create
      - customers/update

targets:
  - name: e-commerce-data-warehouse
    provider: shopify
    url: https://api.e-commerce-warehouse.com/events
    auth: {type: bearer, token: {{ECOMMERCE_WAREHOUSE_TOKEN}}}
    events:
      - orders/create
      - orders/update
      - products/create
      - products/update
      - products/delete
      - customers/create
      - customers/update

flows:
  - name: shopify-events
    provider: shopify
    endpoint: shopify-webhook
    target: e-commerce-data-warehouse
    events:
      - orders/create
      - orders/update
      - products/create
      - products/update
      - products/delete
      - customers/create
      - customers/update
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: api_key
  key: X-Shopify-Hmac-Sha256
  value: ***
```

Uses Shopify HMAC-SHA256 for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{ECOMMERCE_WAREHOUSE_TOKEN}}
```

Uses bearer token for e-commerce data warehouse delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/shopify/orders/create.json`

```json
{
  "type": "orders/create",
  "data": {
    "id": 12345,
    "name": "#1001",
    "email": "customer@example.com",
    "total_price": "100.00",
    "currency": "USD",
    "created_at": "2026-06-24T10:00:00Z"
  }
}
```

## Goldens

Expected output data.

**Example:** `goldens/shopify/orders/create.json`

```json
{
  "destination": "e-commerce-data-warehouse",
  "event_type": "orders/create",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": 12345,
    "name": "#1001",
    "email": "customer@example.com",
    "total_price": "100.00",
    "currency": "USD",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

## Sandbox Validation State

✅ **Sandbox Validated**

- All event types validated
- Authentication boundaries verified
- Output format validated against goldens
- No errors or warnings

## Production Revalidation

⚠️ **Pending**

Full production deployment and validation requires:

1. Controlled deployment to production
2. Explicit approval from operators
3. Production evidence collection
4. Production validation against real data

## Real Webhook Runbook

Runbook not yet available for production validation.

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**

## Usage

Validate the package:

```bash
zen package validate shopify-v2
```

Inspect the package:

```bash
zen package inspect shopify-v2
```

Get package evidence:

```bash
zen package evidence shopify-v2
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

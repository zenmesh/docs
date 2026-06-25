---
sidebar_label: Stripe v2
---

# Stripe v2 Package

**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** Payment Processing

## Overview

The Stripe v2 package processes Stripe webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.failed`
- ✅ `charge.succeeded`
- ✅ `charge.refunded`

## YAML/DAG Contract

```yaml
package:
  name: stripe-v2
  version: 2.0.0
  provider: stripe
  visibility: internal/private
  description: "Stripe webhook processing package for payments"
  canonical_layer: data
  canonical_area: payment-processing

endpoints:
  - name: payment-event
    provider: stripe
    url: https://your-domain.com/webhooks/stripe
    auth: {type: api_key, key: X-Stripe-Token}
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded
      - charge.refunded

targets:
  - name: data-warehouse
    provider: stripe
    url: https://api.data-warehouse.com/events
    auth: {type: bearer, token: {{DATA_WAREHOUSE_TOKEN}}}
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded

flows:
  - name: payment-events
    provider: stripe
    endpoint: payment-event
    target: data-warehouse
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded
      - charge.refunded
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: api_key
  key: X-Stripe-Token
  value: ***
```

Uses Stripe API key for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{DATA_WAREHOUSE_TOKEN}}
```

Uses bearer token for data warehouse delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/stripe/payment_intent.succeeded.json`

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
    "created": 1719184800
  }
}
```

## Goldens

Expected output data.

**Example:** `goldens/stripe/payment_intent.succeeded.json`

```json
{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
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
zen package validate stripe-v2
```

Inspect the package:

```bash
zen package inspect stripe-v2
```

Get package evidence:

```bash
zen package evidence stripe-v2
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

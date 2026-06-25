---
sidebar_label: Package Contract
---

# Package Contract

A ProviderFlow package defines how webhook events are processed and delivered. Packages are **internal/private for V1** and not part of a public marketplace.

## Package Definition

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

targets:
  - name: data-warehouse
    provider: stripe
    url: https://api.data-warehouse.com/events
    auth: {type: bearer, token: {{DATA_WAREHOUSE_TOKEN}}}
    events:
      - payment_intent.succeeded
      - payment_intent.failed

flows:
  - name: payment-events
    provider: stripe
    endpoint: payment-event
    target: data-warehouse
    events:
      - payment_intent.succeeded
      - payment_intent.failed
```

## Required Fields

### Package

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Package name |
| `version` | string | ✅ | Package version (semver) |
| `provider` | string | ✅ | Provider name (e.g., stripe, shopify) |
| `visibility` | string | ✅ | Visibility: `internal/private` |
| `description` | string | ✅ | Package description |
| `canonical_layer` | string | ✅ | Layer: `data`, `infra`, `app` |
| `canonical_area` | string | ✅ | Area within layer (e.g., `payment-processing`) |

### Endpoint

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Unique endpoint identifier |
| `provider` | string | ✅ | Provider name |
| `url` | string | ✅ | Webhook endpoint URL |
| `auth` | object | ✅ | Authentication configuration |
| `events` | array | ✅ | List of event types |

### Target

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Unique target identifier |
| `provider` | string | ✅ | Provider name |
| `url` | string | ✅ | Delivery endpoint URL |
| `auth` | object | ✅ | Authentication configuration |
| `events` | array | ✅ | List of event types |

### Flow

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Unique flow identifier |
| `provider` | string | ✅ | Provider name |
| `endpoint` | string | ✅ | Endpoint name |
| `target` | string | ✅ | Target name |
| `events` | array | ✅ | List of event types |

## Authentication

### API Key

```yaml
auth:
  type: api_key
  key: X-Stripe-Token
  value: sk_test_xxxxx
```

### Bearer Token

```yaml
auth:
  type: bearer
  token: {{STRIPE_API_KEY}}
```

### Header Auth

```yaml
auth:
  type: header
  key: Authorization
  value: Bearer {{STRIPE_API_KEY}}
```

## Event Types

Events are provider-specific and must be defined in the contract.

### Example Events

```yaml
events:
  - payment_intent.succeeded
  - payment_intent.failed
  - charge.succeeded
  - charge.refunded
```

## Visibility

Packages are **internal/private** for V1:

- ✅ Operator visibility through evidence and traces
- ✅ Validation against fixtures and goldens
- ✅ Documentation of contract and usage
- ❌ No public marketplace
- ❌ No public package listings

## Non-Executory

This is a **declarative contract**, not an executable program:

- No JavaScript execution
- No arbitrary runtime code
- No dynamic loading
- No plugins or extensions
- Deterministic YAML/DAG processing only

---

## Related

- [YAML/DAG Contract](./yaml-dag-contract)
- [Package Validation](./package-validation)
- [Fixtures, Goldens, Traces](./fixtures-goldens-traces)

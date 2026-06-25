---
sidebar_label: YAML/DAG Contract
---

# YAML/DAG Contract

ProviderFlow uses a YAML-based contract to define webhook-driven data pipelines. The contract is processed as a deterministic DAG (directed acyclic graph).

## Contract Structure

```yaml
package:
  name: stripe-v2
  version: 2.0.0
  provider: stripe
  visibility: internal/private
  description: "Stripe webhook processing package"

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

## Endpoint Definition

```yaml
name: <endpoint-name>
provider: <provider-name>
url: <webhook-endpoint-url>
auth:
  type: <api_key|bearer|header>
  key: <header-key>  # for header auth
  value: <header-value>  # for header auth
  token: <token>  # for bearer token
events:
  - <event-type-1>
  - <event-type-2>
```

**Required fields:**
- `name`: Unique endpoint identifier
- `provider`: Provider name (e.g., stripe, shopify, gitlab)
- `url`: Webhook endpoint URL
- `auth`: Authentication configuration
- `events`: List of supported event types

## Target Definition

```yaml
name: <target-name>
provider: <provider-name>
url: <delivery-endpoint-url>
auth:
  type: <api_key|bearer|header>
  key: <header-key>  # for header auth
  value: <header-value>  # for header auth
  token: <token>  # for bearer token
events:
  - <event-type-1>
  - <event-type-2>
```

**Required fields:**
- `name`: Unique target identifier
- `provider`: Provider name
- `url`: Delivery endpoint URL
- `auth`: Authentication configuration
- `events`: List of supported event types

## Flow Definition

```yaml
name: <flow-name>
provider: <provider-name>
endpoint: <endpoint-name>
target: <target-name>
events:
  - <event-type-1>
  - <event-type-2>
```

**Required fields:**
- `name`: Unique flow identifier
- `provider`: Provider name
- `endpoint`: Endpoint name
- `target`: Target name
- `events`: List of supported event types

## Deterministic Processing

ProviderFlow processes the contract as a deterministic DAG:

1. **Input**: Webhook event from provider
2. **Validation**: Event matches contract definition
3. **Routing**: Event routed to appropriate flow
4. **Processing**: Events transformed and routed to target
5. **Output**: Delivered to target endpoint

**No arbitrary execution**: Events are processed according to the contract definition, not by arbitrary runtime code.

## DAG Properties

- **Directed**: Events flow from endpoint to target
- **Acyclic**: No circular dependencies
- **Deterministic**: Same input always produces same output
- **Typed**: Event types are validated

## Validation

The contract is validated using:

- YAML syntax validation
- Required field validation
- Type validation
- Dependency validation (endpoint/target references)
- Event type validation

Validation happens during package installation and before any events are processed.

---

## Related

- [Package Contract](./package-contract)
- [Package Validation](./package-validation)
- [Fixtures, Goldens, Traces](./fixtures-goldens-traces)

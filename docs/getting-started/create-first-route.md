---
sidebar_label: Create Your First Route
description: Connect a source to a target — define the delivery path for your webhook events.
---

# Create Your First Route

A **route** is the delivery flow that connects a source to one or more targets. When an event arrives at a source's ingestion URL, Zen Mesh checks every active route that references that source, applies any filters, and delivers matching events to the configured targets.

## Prerequisites

- A [source](./create-first-source) configured and active
- A [target](./create-first-target) configured and reachable

## Navigate to Routes

1. In the dashboard, click **Routes** in the sidebar
2. Click **Add Route**

## Configure Your Route

### Step 1: Name and Description

```
Name: stripe-payments-to-receiver
Description: Deliver Stripe payment events to the webhook receiver
```

### Step 2: Select Source

Choose the source that emits events for this route:

```
Source: stripe-prod-payments (hook_abc123)
```

### Step 3: Select Target(s)

Choose where events should be delivered. You can select multiple targets:

```
Targets:
  ☑ payment-webhook-receiver (http://webhook-receiver:8080)
  ☐ slack-alerts (https://hooks.slack.com/services/T...)
  ☐ internal-audit-log (https://audit.internal/events)
```

### Step 4: Optional Filters

You can filter which events the route processes by event type or JSONPath expression:

```yaml
filters:
  event_types:
    - payment_intent.succeeded
    - payment_intent.payment_failed
  jsonpath:
    - "$.data.object.amount > 0"
```

Filters are applied after the event is ingested but before delivery. Events that don't match are acknowledged but not forwarded.

### Step 5: Save and Activate

1. Click **Save**
2. The route appears in the routes list
3. Toggle the route to **Active**

```
Routes
└── stripe-payments-to-receiver      ● Active
    ├── Source: stripe-prod-payments
    └── Target: payment-webhook-receiver
```

Routes are **per-tenant**. Sources and targets from different tenants cannot be mixed in the same route.

## Testing the Route

Once active, send a test event from your source. See [Send a Test Webhook](./send-test-webhook).

## Next Steps

Verify delivery by [sending a test event](./send-test-webhook) or jump into [delivery evidence](./read-delivery-evidence).

## See Also

- [Event Routing](../delivery/event-routing)
- [Filtering](../delivery/filtering)
- [Fan-Out Delivery](../delivery/fan-out)
- [API Overview](../api/overview)

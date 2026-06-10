---
sidebar_label: Event Routing
description: Webhook event routing — filtering conditions, multi-destination delivery, fan-out, and per-destination delivery policies.
---

# Webhook Event Routing

Event routing controls how incoming webhooks are directed to their destinations. Routing decisions are based on event attributes, configured conditions, and destination policies. For JSONPath-based filtering and route selection, see [JSONPath Routing](./jsonpath-routing).

## Routing Decisions

When an event arrives, routing follows this flow:

1. **Filter evaluation** — event attributes are evaluated against configured conditions
2. **Destination mapping** — matched events are assigned to one or more destinations
3. **Delivery policy** — each destination applies its own retry, timeout, and DLQ configuration

## Filtering

Filters define which events go where:

| Filter Type | Description |
|-------------|-------------|
| **Allow conditions** | Events matching criteria are delivered |
| **Drop conditions** | Events matching criteria are suppressed |
| **Route conditions** | Events are directed to specific destinations |

[Learn more about Webhook Filtering](./filtering)

## Fan-Out

Events can be delivered to multiple destinations simultaneously:

- Each destination has independent delivery policies
- Failure in one destination does not block others
- Delivery evidence is recorded per destination

[Learn more about Webhook Fan-Out](./fan-out)

## Delivery Policy

Each destination can configure:

- Retry attempts and backoff
- Timeout settings
- DLQ enable/disable and retention
- Header injection or transformation

## Related Capabilities

- [Webhook Routing and Fan-Out](./routing-and-fan-out)
- [Webhook Filtering](./filtering)
- [Webhook Fan-Out](./fan-out)
- [Webhook Reliability Guide](./webhook-reliability)

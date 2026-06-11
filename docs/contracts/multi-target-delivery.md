---
sidebar_label: Multi-Target Delivery
description: Multi-target delivery contract — fan-out delivery to multiple HTTP destinations from a single event source with per-destination policies and failure isolation.
---

# Multi-Target Delivery Contract

**Status:** V1 contract

## V1 Scope

- **DeliveryFlow CRD** controls multi-destination delivery. A single route can fan out events to multiple targets.
- **Target type:** HTTP webhook destinations only. All targets are HTTP(S) endpoints.
- **Per-destination isolation:** Each destination has its own delivery policy:
  - Retry configuration (attempts, backoff)
  - Timeout
  - Dead-letter queue (DLQ) assignment
- **Failure isolation:** A failure at one destination does not block delivery to other destinations on the same route.
- **Evidence tracking per destination:** Delivery evidence (status, timestamp, receipt ID) is recorded independently for each target.
- **Plan limits (destinations, not just routes):**
  - Free: 3 routes
  - Pro: 50 routes
  - Each route can fan out to multiple destinations; plan limits apply to the total across both routes and destinations.
  - See [Plans & Limits](/docs/start-here/limits) for current values.
- **Corrected terminology:** "Multi-target delivery" or "multi-destination delivery" is the canonical name. Do not use "HTTP multi-target" — this is delivery to multiple HTTP targets, not a narrow protocol-specific subfeature.

## Planned / Future

- **Multi-type delivery:** Delivery to multiple target types in a single fan-out — e.g., webhook/HTTP + object store + future adapter targets simultaneously.
- **K8s CRD as target:** The Kubernetes CRD may become a customer-facing delivery target, but it **must not be public-surfaced until after production-live stabilization.** No customer-facing documentation, API exposure, or marketing before prod-live.
- **Object-store fan-out:** See [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out).
- **Additional adapter targets:** Future delivery protocol adapters (e.g., NATS, MQ) as fan-out destinations.

## Open Decisions

- **Object-store fan-out target classification:** Whether object-store targets count against route limits, separate limits, or per-destination limits. See [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out).
- Whether per-destination plan limits are aggregated across delivery types (webhook + object store) or scoped per type.

## See Also

- [Delivery: Fan-Out](/docs/delivery/fan-out) — fan-out architecture and behavior
- [Delivery: Routing and Fan-Out](/docs/delivery/routing-and-fan-out) — routing rules and fan-out mechanics
- [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out) — contract-defined object-store delivery target
- [Delivery: JSONPath Routing](/docs/delivery/jsonpath-routing) — conditional routing to destinations
- [Delivery: Dead-Letter Queue](/docs/delivery/dead-letter-queue) — per-destination DLQ configuration
- [Plans & Limits](/docs/start-here/limits) — plan limits on routes and destinations

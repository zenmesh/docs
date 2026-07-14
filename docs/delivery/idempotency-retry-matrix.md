---
sidebar_label: Idempotency and Retry Matrix
---

# Idempotency and Retry Matrix

Each operation is classified for idempotency, key support, retry behavior, and implementation maturity.

| Operation | Idempotent | Key support | Retry | Caller retry safe | Implementation status |
|---|---|---|---|---|---|
| Create Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Update Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Delete Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Apply Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Disable Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Enable Endpoint | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Create Target | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Update Target | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Delete Target | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Apply Target | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Create Flow | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Update Flow | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Delete Flow | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Apply Flow | Yes | Idempotency-Key header | Safe | Yes (with key) | AVAILABLE_NOW |
| Submit event | Yes | Event idempotency key | Unsafe | No (requires dedup) | AVAILABLE_NOW |
| Delivery retry | Yes | Delivery attempt ID | Safe (system) | Yes | AVAILABLE_NOW |
| Replay events | Yes | Replay session ID | Safe | Yes | AVAILABLE_NOW |
| MCP write | Conditional | MCP request key | Safe | Yes (with key) | AVAILABLE_NOW |
| Git reconciliation | PLANNED_V1_1 | PLANNED_V1_1 | PLANNED_V1_1 | UNRESOLVED | PLANNED_V1_1 |
| Resource retirement | PLANNED_V1_1 | PLANNED_V1_1 | PLANNED_V1_1 | UNRESOLVED | PLANNED_V1_1 |
| Certificate rotation | N/A | N/A | N/A | Manual | MANUAL_IN_V1_1 |
| Inconsistent-state recovery | N/A | N/A | N/A | Manual | MANUAL_IN_V1_1 |

## Retry policy by delivery path

| Delivery path | Max attempts | Backoff | Jitter | Permanent failure handling |
|---|---|---|---|---|
| Webhook (synchronous) | 5 | Exponential | Default | Moves to DLQ after exhaustion |
| Webhook (async inline) | 5 | Exponential | Default | Moves to DLQ after exhaustion |
| Webhook (async relay) | 5 | Exponential | Default | Moves to DLQ after exhaustion |
| Control plane → Edge Plane | 5 | Exponential | Default | Moves to DLQ after exhaustion |
| Edge Plane → Webhook | 5 | Exponential | Default | Moves to DLQ after exhaustion |

## Retry backoff schedule

| Attempt | Approximate delay |
|---|---|
| 1 | Immediate |
| 2 | ~10 seconds |
| 3 | ~1 minute |
| 4 | ~10 minutes |
| 5 | ~1 hour |

## Non-claims

- Idempotency keys are in-memory; persistent store across restarts is PLANNED_V1_1.
- Git reconciliation idempotency model is UNRESOLVED.
- Resource retirement and certificate rotation are not idempotent — they are manual operations.
- Caller retry without an idempotency key may create duplicate resources.

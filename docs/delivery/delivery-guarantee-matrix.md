---
sidebar_label: Delivery Guarantee Matrix
---

# Delivery Guarantee Matrix

Each delivery path is assessed for acceptance semantics, persistence, delivery guarantee, retry support, and duplicate handling.

| Delivery path | Acceptance | Persistence | Delivery guarantee | Retry owner | Duplicates possible | Ordering | Replay | Retention |
|---|---|---|---|---|---|---|---|---|
| Webhook (synchronous) | HTTP 202 before processing | Not guaranteed | At least once | Data plane | Yes | Not guaranteed | Available | Configurable |
| Webhook (async inline) | HTTP 202 queued | In-memory buffer | At least once | Data plane | Yes | Not guaranteed | Available | Configurable |
| Webhook (async relay) | Staged to relay | Persistent (relay) | At least once | Data plane | Yes | Not guaranteed | Available | Configurable |
| Control plane → Edge Plane | Enqueued on CP | CP buffer → DP delivery | At least once | CP delivery agent | Yes | Not guaranteed | Available | Configurable |
| Edge Plane → Webhook | DP queue → delivery attempt | DP persistent buffer | At least once | Data plane | Yes | Not guaranteed | Available | Configurable |
| DLQ → Replay | Re-queued for delivery | DLQ persistent store | At least once | Operator | Yes | Not guaranteed | Available | Retention window |
| Replay → Destination | Re-queued for delivery | Delivery history | At least once | Data plane | Yes | Not guaranteed | Available | Retention window |
| MCP create/update | HTTP 2xx | API persistence (synchronous) | At most once (per key window) | Client | Yes (outside key window) | N/A | N/A | N/A |
| MCP apply | HTTP 2xx | API persistence (synchronous) | At most once (per key window) | Client | Yes (outside key window) | N/A | N/A | N/A |
| Git reconciliation | PLANNED_V1_1 | PLANNED_V1_1 | UNRESOLVED | PLANNED_V1_1 | UNRESOLVED | UNRESOLVED | PLANNED_V1_1 | UNRESOLVED |

## Key

- **Acceptance:** How the system acknowledges receipt of the delivery instruction.
- **Persistence:** Where the event payload is stored between acceptance and delivery.
- **Delivery guarantee:** The semantic contract for event delivery.
- **Retry owner:** Which component is responsible for retrying failed deliveries.
- **Duplicates possible:** Whether a consumer may receive the same event more than once.
- **Ordering:** Whether events are delivered in the same order they were accepted.
- **Replay:** Whether previously delivered events can be replayed.
- **Retention:** How long event payload and delivery evidence are retained.

## Non-claims

- Not exactly-once delivery for any path.
- Not zero-loss delivery for any path.
- Delivery guarantees are scenario-specific (local/mock/cloud-demo), not production-level.
- Git reconciliation is PLANNED_V1_1 and its delivery guarantees are UNRESOLVED.

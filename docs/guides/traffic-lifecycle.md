---
sidebar_label: Traffic Lifecycle
---

# Traffic Lifecycle

> Status: PUBLIC_CONTRACT_DRAFT. This guide describes the event delivery lifecycle. Individual stages carry their own status. Not a production-live claim.

## What Happens After an Event Arrives

When an external provider sends a webhook to a Zen Mesh endpoint, the event passes through a series of stages. Each stage is observable through the UI or API.

```
Endpoint → Flow → Attempt → DLQ/Retry/Replay → Trace → Evidence
```

## 1. Endpoint (Ingestion)

An external provider sends a webhook HTTP request to your endpoint's ingestion URL. Zen Mesh validates the request (HMAC signature, IP allowlist, header validation) and creates an event record.

**Status:** WIRED_SANDBOX

**See:** [Endpoints API](../api/endpoints)

## 2. Flow (Routing and Transformation)

The event is matched against active flows. The flow determines:
- Which target(s) the event is delivered to
- Whether the event passes filter rules (JSONPath match)
- Whether the payload is transformed before delivery (JSONPath transforms)
- Retry policy for failed delivery attempts

**Status:** WIRED_SANDBOX

**See:** [Flows API](../api/flows)

## 3. Delivery Attempt

The system attempts to deliver the event to each target defined by the flow. Each attempt records:
- Target URL
- HTTP method and headers
- Response status and body
- Timestamp and duration
- Result (delivered, failed, pending)

**Status:** WIRED_SANDBOX

**See:** [Delivery Attempts API](../api/delivery-attempts)

## 4. Success Path

If the delivery attempt succeeds (HTTP 2xx response from the target):
- The attempt is marked as `delivered`
- Evidence is generated with integrity proof
- The trace is updated with the successful attempt

## 5. Failure Path

If the delivery attempt fails:
- The attempt is marked as `failed`
- The system retries according to the flow's retry policy (default: exponential backoff, 5 attempts, 1s → 60s)
- After exhausting retries, the delivery moves to DLQ status

**Status:** WIRED_SANDBOX

**See:** [Delivery Failures](../delivery/delivery-failures)

## 6. DLQ (Dead Letter Queue)

Failed delivery attempts are visible in the DLQ. The DLQ is not a separate queue — it is the set of deliveries whose status is `failed`. DLQ entries include the full attempt history, so you can inspect what went wrong and retry.

DLQ retention is configurable (default: 7 days).

**Status:** WIRED_SANDBOX

**See:** [DLQ API](../api/dlq)

## 7. Retry

You can retry a failed delivery from the DLQ. Retry re-attempts delivery to the **original target** with the **original payload**. Retry is idempotent — calling retry on an already-retried delivery does not create duplicate deliveries.

Single retry and batch retry are supported.

**Status:** WIRED_SANDBOX

**See:** [Retry API](../api/retry)

## 8. Replay

Replay recreates delivery from retained payload or context. Unlike retry, replay can deliver to the **same or a different target**.

**Important:** Replay requires retained payload/context. If the payload has exceeded the retention window or was never retained, replay is not available.

**Status:** WIRED_SANDBOX (gated)

**See:** [Replay API](../api/replay)

## 9. Trace Spine

Every event produces a trace — a delivery and evidence spine that follows the event from ingestion through each attempt to its evidence receipt. Traces are not full distributed tracing. There is no OpenTelemetry integration, no span propagation, and no cross-service trace context in V1.

**Status:** WIRED_SANDBOX

**See:** [Traces API](../api/traces)

## 10. Evidence

Successful delivery attempts produce cryptographic evidence with integrity verification. Evidence provides tamper-evident delivery receipts that can be independently verified.

**Status:** WIRED_SANDBOX

**See:** [Evidence API](../api/evidence)

## Decision Table

| Symptom | Where to look | What it means | Next action |
|---|---|---|---|
| Delivery failed | Traffic → Deliveries (status=failed) | Target rejected or was unreachable | Inspect attempt details, check target URL |
| Target unreachable | Delivery attempt details | Target endpoint returned error or timeout | Verify target is running and reachable |
| DLQ row exists | Traffic → DLQ | Delivery failed after retries exhausted | Retry the delivery |
| Retry available | DLQ or Retry view | Delivery can be re-attempted | Retry (single or batch) |
| Retry disabled | Delivery not in failed state | Only failed deliveries can be retried | Inspect delivery status |
| Replay unavailable | Delivery detail | Retained payload/context not available | Delivery may be outside retention window |
| Saved payload listed | Traffic → Payloads | Test/template payload exists | Use for testing delivery behavior |
| Evidence unavailable | Trust → Evidence | Delivery did not complete successfully | Inspect delivery attempt |
| Trace shows failed attempts | Traffic → Traces | Delivery experienced failures | Review attempt details, consider retry |

## Non-Claims

- DLQ is a query over failed deliveries, not a separate durable queue
- Retry is idempotent but does not guarantee delivery success
- Replay requires retained payload/context — not all deliveries are replayable
- Trace is delivery/evidence spine, not full distributed tracing
- Evidence is integrity proof, not authentication or identity proof
- Saved payloads are not production retained payload history
- Delivery guarantees are scenario-specific (local/mock/cloud-demo), not production-level

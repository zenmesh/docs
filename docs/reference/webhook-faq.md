---
sidebar_label: Webhook FAQ
description: Frequently asked questions about webhook delivery — dead-letter queues, replay, deduplication, idempotency, security controls, and evidence.
---

# Webhook FAQ

## 1. What is a dead-letter queue for webhooks?

A dead-letter queue (DLQ) stores webhook events that could not be delivered after all retry attempts were exhausted. Instead of dropping failed events, the DLQ preserves them with failure metadata so operators can inspect, replay, or archive them. Events in the DLQ include the original payload, delivery attempt history, and failure reason.

[Learn more about Dead Letter Queue](../delivery/dead-letter-queue)

## 2. How does webhook replay work?

Webhook replay resends events from the dead-letter queue or delivery history to the original or an alternate destination. Operators select events by time range, source, or correlation ID, and the system re-queues them for delivery. Each replay attempt is recorded for audit purposes.

[Learn more about Webhook Replay](../delivery/replay)

## 3. How does webhook deduplication differ from idempotency?

Deduplication is a system-level check that detects and drops duplicate events before delivery. Idempotency is a consumer-side pattern that allows safe processing of the same event multiple times. Deduplication reduces duplicate deliveries; idempotency ensures duplicates that do arrive are handled safely.

[Learn more about Deduplication vs Idempotency](../delivery/deduplication-vs-idempotency)

## 4. Can Zen Mesh prevent duplicate webhook processing?

Zen Mesh provides deduplication controls that identify and handle duplicate events at the system level. For comprehensive duplicate prevention, consumers should also implement idempotency handling. At-least-once delivery means duplicates are possible during recovery scenarios.

[Learn more about Deduplication](../delivery/deduplication) | [Idempotency](../delivery/idempotency)

## 5. How does webhook fan-out work?

Fan-out delivers a single incoming webhook event to multiple destinations simultaneously. Each destination has independent delivery policies — retry, timeout, and DLQ settings — so failure in one destination does not affect others. Fan-out is configured through the DeliveryFlow CRD.

[Learn more about Webhook Fan-Out](../delivery/fan-out)

## 6. How can webhook filtering reduce downstream load?

Webhook filtering routes or suppresses events according to configured conditions. By allowing, dropping, or routing events based on headers, body fields, or metadata, filtering ensures that only relevant events reach each destination. This reduces processing load on downstream services.

[Learn more about Webhook Filtering](../delivery/filtering)

## 7. How does IP allowlisting protect webhook endpoints?

IP allowlisting restricts which source networks can deliver webhooks to the ingester. The allowlist is deny-by-default — only explicitly permitted CIDR ranges are accepted. Requests from unlisted sources are rejected before any processing occurs.

[Learn more about IP Allowlisting](../security/ip-allowlisting)

## 8. What is webhook header validation?

Header validation checks that incoming webhook requests contain required headers and, where supported, verifies cryptographic signatures to confirm the event originated from the expected source. Stripe and GitHub signature verification are supported.

[Learn more about Header Validation](../security/header-validation)

## 9. What is cryptographic enrollment?

Cryptographic enrollment is the process by which Zen Mesh components establish trusted identity with the control plane. Using HMAC-based enrollment with X.509 SVID and enrollment bundles, each component receives a cryptographic identity that is verified on every interaction.

[Learn more about Cryptographic Enrollment](../security/cryptographic-enrollment)

## 10. How does Zen Mesh provide evidence for webhook delivery?

Every delivery attempt generates a delivery receipt with the event ID, source, destination, delivery mode, timestamp, and outcome. Receipts are appended to an audit log with hash-chain linking for tamper evidence. Machine-readable evidence manifests can be accessed by AI systems and compliance reviewers.

[Learn more about Webhook Delivery Evidence](./webhook-delivery-evidence)

## 11. How should teams handle failed webhook delivery?

When delivery fails, the system automatically retries according to the configured policy. If all retries are exhausted, the event goes to the dead-letter queue. Teams should inspect the DLQ to determine the failure cause, resolve the issue, and replay affected events. Monitoring DLQ volume helps identify systemic delivery problems.

[Learn more about Delivery Failures](../delivery/delivery-failures)

## 12. What is the difference between retry, replay, and redrive?

**Retry** is automatic: the system re-attempts delivery after a transient failure, with configurable backoff and attempt limits. **Replay** is a recovery action: an operator selects events from the DLQ or delivery history and resends them. **Redrive** refers specifically to replaying events from the DLQ back through the delivery pipeline. Retry handles ephemeral issues; replay/redrive handles issues that require investigation and resolution.

[Learn more about Retry vs Replay](../delivery/replay-vs-retry)

---
sidebar_label: Operational FAQ
---

# Operational FAQ

## 1. How does Edge Lite establish its initial connection?

AVAILABLE_NOW — Edge Lite uses the same enrollment bundle contract as the Kubernetes Edge Plane. During bootstrap, the zen-agent generates cryptographic identity material and sends an enrollment request to the control plane. The control plane validates the request and returns an enrollment bundle. The agent uses the bundle to establish mTLS-authenticated communication. **Note:** Edge Lite runtime (public Docker image and installer) is not yet published — status is DESIGN_PARTNER_EVAL.

## 2. How is the temporary enrollment credential exchanged?

AVAILABLE_NOW — The enrollment bundle is single-use and time-limited (typically 30 minutes). It is age-encrypted and applied as a Kubernetes Secret. The zen-agent reads the bundle, proves identity to the control plane, and the control plane issues a cryptographic identity. If the bundle expires, a new one must be generated from the dashboard.

## 3. How are permanent credentials issued?

AVAILABLE_NOW — After the enrollment request is validated, the control plane issues an enrollment bundle containing cryptographic credentials (X.509 SVID). The component uses these credentials for all subsequent mTLS and HMAC-verified communications with the control plane and data plane.

## 4. How are certificates renewed?

AVAILABLE_NOW — TLS certificates use cert-manager auto-renewal (24-hour default). HMAC keys are rotated by HMACKeyRotationController (90-day with grace). JWK/JWKS rotation uses key ID (kid) versioning. File-based X.509 SVID lifecycle uses cert-manager renewal. Full SPIRE Workload API SVID rotation is PLANNED_V1_1.

## 5. What happens if certificate renewal fails?

UNRESOLVED — Certificate expiry and revocation behavior has validation evidence at the implementation level, but the documented public contract does not specify the system behavior when automatic renewal fails.

## 6. How does a node join an Edge Plane?

AVAILABLE_NOW — Through the cryptographic enrollment flow: (1) register an Edge Plane in the dashboard, (2) generate an install bundle (age-encrypted), (3) apply the bundle to the cluster (as a Secret), (4) the zen-agent reads the bundle, proves identity, and the control plane issues identity and syncs configuration. The edge-plane status changes to **Connected** in the dashboard.

## 7. How does a node leave or retire from an Edge Plane?

UNRESOLVED — The documented agent operations and plane enrollment docs describe joining but not leaving or retiring a node from an Edge Plane. Resource retirement is PLANNED_V1_1.

## 8. What happens during a control-plane network failure?

AVAILABLE_NOW — The data plane operates independently of the control plane. If the control plane is unavailable, already-configured delivery continues. Evidence buffer flush preserves ordered delivery evidence for audit during outages. CP outage reconciliation (cached policy → reconnect → converge) has been proven in local mock scenarios. **Non-claim:** Not CP autonomy for all scenarios; not zero-loss.

## 9. What happens during a delivery-path network failure?

AVAILABLE_NOW — Delivery failures are classified as transient (timeout, connection refused — automatic retry with backoff), permanent (invalid destination, auth failure — moved to DLQ, no retry), or undetermined (timeout without response — retry, then DLQ if repeated). After 5 failed attempts the event moves to `exhausted` status and enters the Dead Letter Queue.

## 10. Can an Edge Plane continue operating while disconnected?

AVAILABLE_NOW — Already-configured delivery continues during control-plane disconnection. The data plane processes events independently. Edge-plane autonomy (private-edge path convergence) has been proven in local mock scenarios. **Non-claim:** Not general CP autonomy for all scenarios; private-edge autonomy uses mock_data.

## 11. Which operations are idempotent?

AVAILABLE_NOW — Create, update, delete for Endpoints, Targets, and Flows are idempotent when an Idempotency-Key header is provided. Apply, disable, and enable operations are idempotent. Event submission, delivery retry, and replay are idempotent. GET/HEAD read operations are naturally idempotent. MCP write operations are conditionally idempotent. Git reconciliation is PLANNED_V1_1 and its idempotency model is UNRESOLVED.

## 12. How are idempotency keys scoped and retained?

AVAILABLE_NOW — Idempotency keys are unique per tenant. Keys are retained for 24 hours from the first request. After expiry, the key is eligible for reuse. Retrying with the same key within the window returns the original result without side effects. Using the same key with a different request body returns a 409 Conflict. **Limitation:** Current idempotency store is in-memory; persistent idempotency store across restarts is PLANNED_V1_1.

## 13. Which components perform retries?

AVAILABLE_NOW — The delivery system (data plane) performs automatic retries according to the configured policy per destination. Retry behavior is configurable per destination: maximum attempts, backoff interval/strategy, and retry conditions. Manual retry is available via the API and CLI. Operator-initiated replay from the DLQ is a separate recovery action.

## 14. Which errors are retryable?

AVAILABLE_NOW — **Transient:** network timeout, connection refused, rate limit (429) — automatically retried with backoff. **Undetermined:** timeout without response — retried, then moved to DLQ if repeated. **Permanent:** invalid destination, authentication failure, 4xx (except 429) — not retried (moved to DLQ). Agent safety rules state: "No retry of permanent failures — 4xx errors indicating bad requests, authorization denial, or not-found should not be retried."

## 15. What backoff and jitter policies apply?

AVAILABLE_NOW — Exponential backoff: Attempt 1 = immediate, Attempt 2 = ~10 seconds, Attempt 3 = ~1 minute, Attempt 4 = ~10 minutes, Attempt 5 = ~1 hour. Maximum retry attempts: 5 per delivery. Backoff interval and strategy (fixed or exponential) are configurable per destination. Jitter behavior is not separately documented.

## 16. What delivery guarantees apply?

AVAILABLE_NOW — Zen Mesh uses at-least-once delivery semantics. Events are retried automatically when delivery fails. Consumers should expect possible duplicates during recovery scenarios. **Explicit non-claim:** Not exactly-once delivery; not zero-loss delivery; delivery guarantees are scenario-specific (local/mock/cloud-demo), not production-level. At-least-once has been proven for specific scenarios via failure injection in local mock harness.

## 17. Can an event be delivered more than once?

AVAILABLE_NOW — Yes. At-least-once delivery means duplicate events can arrive from source retries, network retransmission, or recovery workflows. Deduplication (system-level) identifies duplicates by comparing event keys against a time-bounded store. Idempotency (consumer-side) enables safe processing of duplicates. **Limitation:** Current deduplication state is in-memory; persistent store is PLANNED_V1_1.

## 18. Is event ordering guaranteed?

NOT_SUPPORTED — No ordering guarantee is provided. Per-source ordering and causal ordering guarantees are explicitly not claimed in v1alpha1.

## 19. How does replay work?

AVAILABLE_NOW — Replay operates on stored events from two sources: (1) dead-letter queue events (failed deliveries preserved for recovery), (2) delivery history (successfully delivered events retained for reprocessing). The operator selects events by time range, source, or correlation ID. Selected events are re-queued for delivery to the original or an alternate destination. Each replay attempt is recorded with a new delivery attempt ID. Replayed events pass through the same delivery controls (filtering, deduplication, idempotency) as original events. **Limitations:** Replay requires retained payload/context — if the payload has exceeded the retention window, replay is not available. Batch and dry-run replay are PLANNED_V1_1.

## 20. How is an inconsistent resource recovered?

MANUAL_IN_V1_1 — When desired state and observed state diverge: (1) check recent changes or apply operations, (2) verify the apply operation completed successfully, (3) re-apply desired state if divergence is unexpected, (4) if re-apply does not converge, inspect evidence and reason codes. **Non-claim:** Inconsistent-state recovery automation is not available — reapply is the recommended approach.

## 21. When should desired state be reapplied?

MANUAL_IN_V1_1 — When desired state and observed state diverge unexpectedly after checking recent changes or apply operations and verifying the apply operation completed successfully. Re-apply is the recommended approach for convergence.

## 22. When should a resource be disabled, retired, or recreated?

AVAILABLE_NOW (disable/delete) / PLANNED_V1_1 (retire) — **Disable:** stops delivery without deleting the resource (state: DRAFT → DISABLED). The resource can be re-enabled later. **Delete:** permanent removal (state: DISABLED → DELETED). Cannot be recovered — the resource must be recreated. **Retire:** A formal resource retirement operation with evidence is PLANNED_V1_1 and not currently available. Use delete instead. **Note:** Disabling does not drain in-flight deliveries.

## 23. How are reason codes and evidence inspected?

AVAILABLE_NOW — Use `zen delivery status <delivery-id>`, `zen evidence get <delivery-id>`, or `zen delivery list --status failed`. Common reason codes include: `validation_error`, `not_found`, `unauthorized`, `forbidden`, `rate_limited`, `conflict`, `delivery_failed`, `provider_verification_failed`. Each delivery attempt record includes HTTP status, response body, timestamp, duration, and error details. Evidence manifests are available through the API.

## 24. How is recovery performed without directly editing the database?

AVAILABLE_NOW — Use the supported surfaces: UI dashboard, REST API, CLI, or MCP (read tools default-on, write tools per-group enablement). Direct database edits are prohibited. GitOps is PLANNED_V1_1.

## 25. Which v1.1 operations require manual intervention?

MANUAL_IN_V1_1 — The following operations are documented as manual in v1.1:
- **Automatic certificate rotation**: Not available — manual rotation required.
- **Inconsistent-state recovery**: No automated recovery — reapply is the recommended approach.
- **Resource retirement**: Use delete instead; formal retirement with evidence is PLANNED_V1_1.

PLANNED_V1_1 capabilities (not yet available, but planned):
- GitOps configuration
- Persistent idempotency/dedup store
- SPIRE Workload API SVID rotation
- Batch replay and dry-run replay
- Multi-region failover (later timeframe)

## 26. Which capabilities are planned but not currently available?

PLANNED_LATER / PLANNED_V1_1:

| Capability | Status |
|---|---|
| GitOps configuration | PLANNED_V1_1 |
| Persistent idempotency store | PLANNED_V1_1 |
| Persistent deduplication store | PLANNED_V1_1 |
| SPIRE Workload API SVID rotation | PLANNED_V1_1 |
| Automatic certificate rotation | MANUAL_IN_V1_1 |
| Resource retirement with evidence | PLANNED_V1_1 |
| Batch replay / dry-run replay | PLANNED_V1_1 |
| Exactly-once delivery | NOT_SUPPORTED |
| Multi-region failover | NOT_SUPPORTED |
| Event ordering guarantees | NOT_SUPPORTED |
| Global relay HA | NOT_SUPPORTED |
| Edge Lite production runtime | PLANNED_LATER |
| Zero-loss delivery | NOT_SUPPORTED |

---
sidebar_label: Evidence Missing
---

# Evidence Missing Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P2

## Objective

Investigate and resolve missing delivery evidence scenarios.

## Symptoms

- Delivery status API returns `evidence_not_found`
- Evidence manifest query returns empty or missing entries
- Delivery receipts are missing from the expected evidence path
- Compliance audit shows gaps in evidence chain
- Dashboard shows delivery event but no evidence artifact
- Evidence integrity check fails with hash mismatch or missing file

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `EVIDENCE_RETENTION_EXPIRED` | Evidence retention window has passed and evidence was evicted |
| `EVIDENCE_DELIVERY_NOT_COMPLETED` | Delivery never completed; no evidence was generated |
| `EVIDENCE_WRONG_ID` | The requested evidence ID does not match any recorded delivery |
| `EVIDENCE_PERMISSION_DENIED` | The requesting identity does not have access to the evidence |
| `EVIDENCE_NOT_GENERATED` | Evidence generation was skipped or failed for the delivery attempt |
| `EVIDENCE_BUFFER_FLUSH_PENDING` | Evidence is still in the local buffer and not yet flushed to the control plane |

## Safe Checks

1. Verify the evidence ID matches the delivery event ID exactly:
   ```bash
   # Check delivery event logs for the correct ID
   ```
2. Check the retention window for the tenant plan:
   - Free: 7 days
   - Pro: 30 days
   - Business: Up to 90 days
   - Enterprise: Custom
   Compare against the delivery timestamp.
3. Verify the delivery actually completed:
   - Check delivery status in the dashboard
   - Look for delivery success or failure entries in event logs
4. Confirm the requesting API key or user has the appropriate role and scope
5. Check evidence buffer status on the edge plane:
   - Kubernetes: `kubectl logs -n zen-mesh -l app=zen-agent --tail=50 | grep evidence`
   - Edge Lite: `docker logs zen-agent --tail=50 | grep evidence`

## Evidence to Collect

- Delivery event ID and evidence ID being queried
- Delivery timestamp and current time (for retention calculation)
- Delivery status API response body
- Agent logs showing evidence generation or buffer flush entries
- Evidence manifest from the known-good path (if available)
- API request and response headers for the evidence query
- Dashboard delivery history for the relevant time window

## Corrective Actions

1. **Retention expired** — Evidence is no longer available beyond the retention window. Check if evidence export was configured for archival (Business+ plan feature, planned). If retention requirements exceed the plan limit, upgrade the plan or configure evidence export to S3/object-store (when available).
2. **Delivery not completed** — The delivery never reached a terminal state. Inspect the delivery queue and DLQ. Re-deliver the event if needed. Evidence will be generated upon successful delivery.
3. **Wrong ID** — Verify the evidence ID in the delivery logs. Cross-reference with the event ID. Use delivery timestamps to narrow the search. Re-query with the corrected ID.
4. **Permission denied** — Verify the API key or user role includes evidence:read permission for the tenant scope. Generate a new API key with appropriate scopes if needed.
5. **Evidence not generated** — Check if evidence generation is enabled for the destination. Re-trigger evidence generation if the API supports it. Evidence generation may be skipped for transient deliveries without a terminal attempt.
6. **Buffer flush pending** — The evidence may still be in the local buffer on the edge plane. Wait for the next flush cycle or trigger a manual flush if supported. Check edge plane connectivity — evidence buffering requires a successful outbound connection.

## Retry Conditions

- Corrected evidence ID confirmed
- Delivery has completed since the last check
- Retention window is still open for the delivery timestamp
- API key or user permissions updated
- Buffer flush interval has elapsed (retry after 60 seconds)
- Evidence generation re-enabled for the destination

## Stop Conditions

- Evidence successfully retrieved
- Delivery confirmed never completed and no evidence exists to retrieve
- Retention window confirmed expired and no export archive exists
- Permanent access denied despite valid credentials
- Evidence generation confirmed permanently disabled for the destination

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Fabricating or forging evidence to fill gaps**
- **Extending retention windows by altering system timestamps**

## Escalation

If evidence remains missing after investigation, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include: delivery event ID, evidence ID, delivery timestamp, retention plan level, API response, agent logs, and dashboard delivery history.

## Recovery Verification

1. Evidence query returns the expected artifact:
   ```bash
   curl -X GET https://api.zen-mesh.io/v1/evidence/<evidence-id>
   ```
2. Evidence integrity check passes (hash matches manifest)
3. Evidence manifest lists the expected entry
4. Compliance audit reports no gaps for the relevant time window
5. No `evidence_not_found` errors in subsequent queries

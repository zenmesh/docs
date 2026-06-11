---
sidebar_label: Evidence Export
description: Evidence export contract — what delivery evidence is available, how to export, and plan-specific differences in export capability.
---

# Evidence Export Contract

**Status:** V1 contract

## V1 Scope

Evidence export is available for all plans with plan-specific constraints:

### Free Plan
- **Export path:** UI only (manual download from dashboard)
- **Scope:** Recent and/or low-volume evidence records
- **Format:** JSON
- **Retention:** 30 days (see [Plans & Limits](/docs/start-here/limits))

### Pro Plan
- **Export path:** UI + API (bulk/full export)
- **Scope:** Full evidence history within retention window
- **Format:** JSON (API includes pagination and filtering)
- **Retention:** 90 days

### Evidence Content
Each export includes:
- Delivery timestamps and status codes
- Label metadata (snapshotted at event time)
- Target URL (domain only)
- Payload content (if configured for inclusion — see [Payload Encryption Contract](/docs/contracts/payload-encryption-replay-dlq))
- Merkle integrity hash and delivery receipt ID

## Planned / Future

- **Business plan:** Priority export (coming soon)
- **Evidence versioning:** Historical evidence schema version tracking
- **Scheduled exports:** Automated evidence export delivery (daily/weekly)

## Open Decisions

- Whether to support push-based export (e.g., webhook destination for evidence records)
- Evidence size limits per export request

## See Also

- [Evidence Overview](/docs/evidence/overview) — evidence capabilities and status
- [Webhook Delivery Evidence](/docs/reference/webhook-delivery-evidence) — delivery receipt format and verification
- [Evidence API](/docs/api/evidence) — API-based evidence access
- [Plans & Limits](/docs/start-here/limits) — retention and plan limits
- [Contracts: Support Payload Access](/docs/contracts/support-payload-access)

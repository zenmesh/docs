---
sidebar_label: Support Payload Access
description: Support payload access contract — support staff cannot browse raw payloads by default; explicit customer authorization required for payload access.
---

# Support Payload Access Contract

**Status:** V1 contract

## V1 Scope

- **Default: no raw payload access.** Support staff CANNOT browse raw customer payloads by default. There is no default decrypt, browse, or search path for payload content in support tools.
- **Metadata access by default:** The following metadata is accessible to support staff in operational logs and support tools:
  - Delivery status (delivered, failed, pending, etc.)
  - Timestamps (created, delivered, last attempt)
  - Resource identifiers (event ID, route ID, destination ID)
  - Labels (customer-assigned labels attached to the event)
  - Event types
  - HTTP status codes (from destination responses)
  - Error messages and failure reasons
- **Payload access flow:** If support requires access to a raw payload, the following must all be true:
  1. **Explicit customer authorization per request** — one-time, per-incident authorization from the customer
  2. **Time-bounded** — access grant expires after a defined window
  3. **Audited** — the access event is logged with staff identity, purpose, timestamp, and authorization evidence
- **Customer-controlled payload sharing:** Customers decide what to share and when. Safe path for sharing:
  - Customers may share payloads via email or an authorized support mechanism
  - ZenMesh should not request raw payloads as the first step — metadata-first diagnostics are the default workflow
- **Distinction from other contracts:**
  - Payload encryption (see [Payload Encryption, Replay, and DLQ Contract](/docs/contracts/payload-encryption-replay-dlq)) governs how payloads are encrypted at rest and which services have runtime decrypt capability. This contract governs staff and support access policy.
  - Tenant key management (see [Tenant Key Management Contract](/docs/contracts/tenant-key-management)) governs key lifecycle and audit. This contract governs the human access workflow.

## Planned / Future

- **Automated self-serve access management:** Customers manage payload access grants through the UI/API without contacting support.
- **Customer-facing access audit log:** Customers can view a log of all support payload access events for their tenant.
- **Automated audit trail:** V1 support payload access is manually logged. An automated, exportable audit trail is planned.

## Open Decisions

- Whether automated self-serve grants should support pre-authorized support access (customer designates a window during which support may access without per-request authorization).
- Whether the audit log should be real-time or near-real-time.
- Maximum time-bound duration for support payload access grants.
- Whether email-based payload sharing is an acceptable permanent solution or should be replaced by a secure upload portal.

## See Also

- [Payload Encryption, Replay, and DLQ Contract](/docs/contracts/payload-encryption-replay-dlq) — encryption and runtime access model
- [Tenant Key Management Contract](/docs/contracts/tenant-key-management) — key lifecycle and decrypt audit
- [Data Handling](/docs/start-here/data-handling) — data processing and retention commitments
- [Support](/docs/start-here/support) — support processes and target response times
- [Security: Trust Controls](/docs/security/trust-controls) — trust and security architecture

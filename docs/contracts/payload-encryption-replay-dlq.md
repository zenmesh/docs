---
sidebar_label: Payload Encryption, Replay & DLQ
description: Payload encryption, replay, and DLQ contract — tenant-scoped encryption at rest, staff-no-access by default, audited runtime access for operational operations.
---

# Payload Encryption, Replay, and DLQ Contract

**Status:** V1 contract — core capabilities with defined boundaries.

## V1 Scope

- **Staff payload access:** Zen staff and support do NOT have default access to raw payloads. No default decrypt or browse path is available.
- **Encryption at rest:** All payloads are encrypted at rest and tenant-scoped. ZenMesh manages per-tenant envelope encryption keys.
- **Service-scoped keys:** Runtime services may use service-scoped keys **only** for customer-requested operations:
  - Delivery (sending the payload to a destination)
  - Replay (re-sending a stored payload)
  - Dead-letter queue operations (inspecting or re-driving DLQ entries)
- **Staff UI/API** must NOT expose a default payload decrypt or browse path. Any staff payload access requires explicit customer authorization, time-bounding, and audit logging.
- **No raw payloads in logs:** Raw event payloads must NEVER appear in operational logs, error logs, or support logs. Logs may reference payload metadata (ID, hash, size, timestamps) only.
- **Metadata-first operations:** Support and operational workflows operate on metadata (delivery status, timestamps, resource identifiers, labels, event types, HTTP status codes) by default. Payload content access is the exception, not the default.
- **Key model:** Zen-managed per-tenant envelope keys. Key ID/version, ciphertext, payload hash, and retention metadata are stored per event. See [Tenant Key Management Contract](/docs/contracts/tenant-key-management).

## Planned / Future

- **BYOK / customer-managed keys:** Customers may bring their own wrapping key to encrypt tenant envelope keys. This is a higher-plan capability. See [Tenant Key Management Contract](/docs/contracts/tenant-key-management).

## Open Decisions

- **Full Zen-cannot-decrypt tension:** A fully "Zen infrastructure cannot decrypt payloads" model requires:
  1. BYOK / customer-managed keys (so ZenMesh never holds the unwrapping key)
  2. Customer-side replay infrastructure (because runtime services need keys for delivery, replay, and DLQ operations — if the runtime cannot decrypt, it cannot deliver)
  
  Both sides of this tension are documented:
  - **Side A:** Metadata-first operations with service-scoped audited runtime access (V1). Staff cannot browse, but the system can decrypt for delivery operations.
  - **Side B:** Full Zen-cannot-decrypt requires BYOK + customer-side replay. This is a fundamentally different architecture that requires customers to operate their own replay infrastructure.
  
  This tension is not resolved for V1. V1 implements Side A. Side B is a planned capability for higher-tier plans.
- Whether BYOK customers also need customer-operated replay infrastructure, or whether ZenMesh can support replay without holding the unwrapping key (e.g., via customer-supplied temporary grants).

## See Also

- [Tenant Key Management Contract](/docs/contracts/tenant-key-management) — key lifecycle, audit, and BYOK roadmap
- [Support Payload Access Contract](/docs/contracts/support-payload-access) — support payload access flow and audit
- [Delivery: Dead-Letter Queue](/docs/delivery/dead-letter-queue) — DLQ operations and payload access
- [Delivery: Replay](/docs/delivery/replay) — replay architecture and key requirements
- [Data Handling](/docs/start-here/data-handling) — data processing and retention commitments
- [Plans & Limits](/docs/start-here/limits) — plan-specific capabilities

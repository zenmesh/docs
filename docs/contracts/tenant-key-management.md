---
sidebar_label: Tenant Key Management
description: Tenant key management contract — Zen-managed per-tenant envelope encryption keys, audit of every decrypt by purpose, and BYOK roadmap.
---

# Tenant Key Management Contract

**Status:** V1 contract

## V1 Scope

- **Key model:** ZenMesh manages per-tenant envelope encryption keys. Each tenant has a dedicated envelope key used to encrypt event payloads at rest.
- **Stored per event:** For each stored payload event, the system records:
  - Ciphertext (encrypted payload)
  - Key ID and version (which key encrypted this payload)
  - Payload hash (integrity verification)
  - Retention metadata (creation timestamp, expiry policy)
- **Audit every decrypt/use by purpose:** Every key use for decryption is audited with a recorded purpose.
  - **Delivery:** Decrypting payload for delivery to a customer-configured destination
  - **Replay:** Decrypting payload for replay delivery
  - **DLQ:** Decrypting payload for dead-letter queue inspection or re-drive
  - **Customer view:** Decrypting payload for customer-facing UI/API access (dashboard, evidence export)
  - **Support grant:** Decrypting payload under explicit time-bounded customer authorization
- **Key rotation:** ZenMesh manages key rotation on a defined schedule. Rotated keys are retained for the lifetime of any payload they encrypted.
- **Service-scoped access:** Runtime services access keys through a service-scoped interface. No service has blanket decrypt access. Each request must specify a purpose from the audit categories above.

## Planned / Future

- **BYOK / customer-managed keys:** Customers may bring their own wrapping key (e.g., stored in their KMS) to encrypt tenant envelope keys. ZenMesh would hold only the wrapped envelope key. This is a higher-plan capability.
- **KMS integration:** Native integration with cloud KMS providers (AWS KMS, GCP Cloud KMS, Azure Key Vault) for BYOK customer key storage — roadmap, not contract-defined.
- **Customer-side replay infrastructure:** For customers that require full "Zen cannot decrypt" guarantees, future architecture may require customers to operate their own replay infrastructure since the runtime needs decryption keys for delivery operations. See Open Decisions below.

## Open Decisions

- **Full Zen-cannot-decrypt tension:**
  - **V1 position (Side A):** ZenMesh holds envelope keys and performs decryption for audited, purpose-specific operations. Staff cannot browse, but the runtime can decrypt for delivery/replay/DLQ.
  - **Full isolation (Side B):** Full "Zen cannot decrypt" requires BYOK (customer holds the wrapping key) AND customer-side replay infrastructure. Because the runtime needs to decrypt payloads for delivery, a BYOK-only model without customer replay support would still permit ZenMesh to decrypt (using the customer's wrapping key) for delivery operations. True isolation means the customer operates replay.
  - This tension is documented and unresolved for V1. V1 implements Side A. Side B is a planned direction for higher-tier plans.
- Whether BYOK supports per-event customer authorization or a single wrapping-key grant.
- KMS provider selection for initial integration (AWS KMS first, or multi-cloud at launch).

## See Also

- [Payload Encryption, Replay, and DLQ Contract](/docs/contracts/payload-encryption-replay-dlq) — encryption boundaries, service-scoped keys, and runtime access model
- [Data Handling](/docs/start-here/data-handling) — data processing and retention commitments
- [ZenLock Credential Lifecycle](/docs/security/zenlock-credential-lifecycle) — credential lifecycle and security architecture

---
sidebar_label: Public Trust FAQ
description: Public trust FAQ — no certification claims, what evidence means, what payload access means, what control plane vs runtime means, what is not yet live.
---

# Public Trust FAQ

> **Frequently asked questions about Zen Mesh trust claims.**
>
> Zen Mesh does not make claims of production readiness, certification, or guaranteed delivery.

## No Certification Claims

**Is Zen Mesh SOC 2 certified?**

No. SOC 2 is planned but not yet achieved. See [Trust Controls & Compliance](/docs/security/trust-controls) for current posture.

**Is Zen Mesh GDPR compliant?**

Partial. Controls are in place — see the compliance mapping in [Trust Controls](/docs/security/trust-controls). Full compliance documentation is in progress. Consult your legal team for your specific obligations.

**Is Zen Mesh ISO 27001 certified?**

No. ISO 27001 is planned.

**Is Zen Mesh PCI DSS compliant or HIPAA compliant?**

Not applicable. Zen Mesh does not process payment card data or protected health information as part of its webhook delivery service. See the [non-claims registry](https://docs.zen-mesh.io/ai/evidence/v1/non-claims.json).

**Is Zen Mesh FedRAMP authorized?**

Not applicable.

## What "Evidence" Means

**What is delivery evidence?**

Delivery evidence is a machine-readable receipt for each webhook delivery. It includes timestamps, delivery status, labels, and a hash-chain link for integrity verification. See [Webhook Delivery Evidence](/docs/reference/webhook-delivery-evidence).

**Is evidence proof of correct delivery?**

Evidence is a record of what happened — status code returned, timestamps, and delivery path. It is not a guarantee of correct processing by the target service. See [Delivery Status Reference](/docs/reference/delivery-status).

**Is evidence a legal proof?**

No. Evidence is a technical verification tool, not a legal instrument.

## What "Payload Access" Means

**Can Zen Mesh support staff see my payloads?**

Not by default. Support operations use metadata only (delivery status, timestamps, labels). Raw payload inspection requires explicit customer authorization per request, which is time-bounded and audited. See [Support Payload Access Contract](/docs/contracts/support-payload-access).

**Are payloads encrypted at rest?**

Yes. Payloads are tenant-scoped encrypted at rest. Zen Mesh manages per-tenant envelope keys. Service-scoped runtime access exists only for delivery, replay, DLQ, and customer-authorized support actions. See [Payload Encryption, Replay & DLQ Contract](/docs/contracts/payload-encryption-replay-dlq).

**Does Zen Mesh "never decrypt" my payloads?**

At V1: Zen Mesh manages the encryption keys, so it has service-scoped audited runtime access for delivery, replay, DLQ, and authorized support actions. "Zen never decrypts" (customer-held keys / BYOK) is a future Business+ capability — not V1. See [Tenant Key Management Contract](/docs/contracts/tenant-key-management).

## What "Control Plane Not in Runtime Path" Means

**What does it mean that the control plane is not in the runtime path?**

The control plane handles configuration (sources, targets, routes, labels) and is separate from the data plane that processes webhook events. Webhooks are delivered through the data plane without passing through the control plane. This means:

- Control plane outages do not affect in-flight webhook delivery
- Control plane credentials cannot be used to access the data plane
- The data plane operates independently once configured

See [Three-Plane Architecture](/docs/architecture/three-plane-model).

**Does this mean the data plane is fully independent?**

The data plane is configured by the control plane but operates independently for delivery. The system is designed to ensure control plane unavailability does not stop ongoing delivery. See [Architecture Overview](/docs/architecture/overview).

## What Is Not Yet Live

**Is Zen Mesh production-ready?**

No. Zen Mesh is in DEMO readiness — local/mock/sandbox and limited cloud-demo scope. It is not production-live, not customer-ready, and not demo-ready as global platform readiness. See [Current Status](/docs/start-here/current-status).

**Are Shopify and Twilio webhooks available?**

Not yet. Shopify and Twilio are launch targets — connector validation is in progress. They are not available at launch. See [Provider Status Matrix](/docs/contracts/#provider-status-matrix) in the contracts index.

**Is object-store fan-out (S3) available?**

Not yet. Object-store fan-out is a contract-defined launch target — S3-compatible delivery is planned but has no runtime proof yet. See [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out).

**Is multi-region data-plane available?**

No. At launch there is a single data-plane entry point (TBD — provider and region to be confirmed). EU and APAC data planes are planned. See [Data-Plane Selection Contract](/docs/contracts/data-plane-selection).

**Is BYOK available?**

No. Bring Your Own Key is a future Business+ capability. V1 uses Zen-managed per-tenant envelope keys. See [Tenant Key Management Contract](/docs/contracts/tenant-key-management).

**Does Zen Mesh have an SLA?**

No. Target response times for Pro support (48 hours) are targets, not SLAs or contractual guarantees. There is no uptime SLA at launch. See [Support Center D1 Spec](/docs/contracts/support-center-d1-spec).

**Does Zen Mesh guarantee delivery?**

No. Webhook delivery is best-effort with built-in retry, DLQ, and replay mechanisms. Exactly-once delivery and zero-loss delivery are not claimed. See [Delivery Status Reference](/docs/reference/delivery-status) and the [non-claims registry](https://docs.zen-mesh.io/ai/evidence/v1/non-claims.json).

## See Also

- [Launch Contracts Index](/docs/contracts/) — full contract catalog
- [Trust Controls & Compliance](/docs/security/trust-controls) — compliance posture
- [Non-Claims Registry](https://docs.zen-mesh.io/ai/evidence/v1/non-claims.json) — machine-readable non-claims
- [Current Status](/docs/start-here/current-status) — where Zen Mesh is now
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, access policy

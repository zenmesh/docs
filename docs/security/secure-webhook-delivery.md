---
sidebar_label: Secure Webhook Delivery
description: How Zen Mesh secures webhook delivery — transport security, source verification, access control, and cryptographic identity across the delivery path.
---

# Secure Webhook Delivery

Webhook delivery security spans multiple layers: transport encryption, source verification, access restriction, and component identity.

## Transport Security

Each hop in the delivery path is protected according to its risk profile:

| Hop | Protection |
|-----|------------|
| Source → Ingester | HTTPS + provider signature verification |
| Ingester ↔ Egress | mTLS + SPIFFE/SPIRE + HMAC (mandatory) |
| Egress → Target | HTTPS (default), mTLS (configurable) |

## Source Verification

Incoming webhooks are verified using provider-specific signature headers:

- **Stripe:** Stripe-Signature header verification
- **GitHub:** X-Hub-Signature-256 HMAC verification
- **Custom:** Configurable header validation

[Learn more about Header Validation](./header-validation)

## Access Control

Delivery sources can be restricted by:

- **IP allowlisting** — restrict accepted source networks
- **Component identity** — deny-by-default allowlisting for internal components
- **Cryptographic enrollment** — identity-based access for cluster components

[Learn more about IP Allowlisting](./ip-allowlisting)

## Component Identity

All Zen Mesh components establish trusted identity through cryptographic enrollment:

- HMAC-based enrollment with X.509 SVID
- Enrollment bundles for bootstrap
- Ongoing identity verification for all control and data plane communication

[Learn more about Cryptographic Enrollment](./cryptographic-enrollment)

## Related Capabilities

- [Security Controls Overview](../security/)
- [Webhook Access Control](./webhook-access-control)
- [Webhook Delivery Evidence](../reference/webhook-delivery-evidence)

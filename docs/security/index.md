---
sidebar_label: Security Controls Overview
description: Webhook security controls — IP allowlisting, header validation, cryptographic enrollment, mTLS, HMAC, and credential lifecycle management.
---

# Webhook Security Controls

Security controls for webhook delivery covering source verification, access restriction, and component identity.

## Capabilities

| Capability | Purpose |
|------------|---------|
| [IP Allowlisting](./ip-allowlisting) | Restrict accepted delivery sources by network |
| [Header Validation](./header-validation) | Verify webhook event source authenticity |
| [Cryptographic Enrollment](./cryptographic-enrollment) | Establish trust between components with cryptographic identity |
| [Security Capability Validation](./security-capability-validation) | Authoritative reference for all security claims |
| [Agent → SaaS mTLS](./agent-saas-mtls) | Required mTLS enforcement for agent communication |
| [ZenLock Credential Lifecycle](./zenlock-credential-lifecycle) | Secure credential custody and distribution |

## Security Model

Zen Mesh secures webhook delivery across four boundaries:

| Boundary | Protection |
|----------|------------|
| Webhook source → Ingester | HTTPS + provider signature verification |
| Ingester ↔ Egress (data plane) | mTLS + SPIFFE/SPIRE + HMAC (mandatory) |
| Agent ↔ SaaS (control plane) | mTLS + HMAC |
| Egress → Customer target | Secure-by-default, customer-configurable |

## Related

- [Webhook Reliability](../delivery/)
- [Webhook Access Control](./webhook-access-control)
- [Secure Webhook Delivery](./secure-webhook-delivery)

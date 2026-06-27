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
| [Trust Lab](./trust-lab) | Deterministic validation scenarios for webhook delivery |
| [Security Validation Suite](./security-validation-suite) | Adversarial and boundary validation scenarios |
| [Security Feature Tiering](./security-tiering) | Feature availability by plan (V1 / V1.1) |
| [Git SDK SSRF Classification](./git-sdk-ssrf-classification) | SSRF risk classification for Git provider SDKs |

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

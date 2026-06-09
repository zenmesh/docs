---
sidebar_label: Webhook Access Control
description: Webhook access control mechanisms — IP allowlisting, header validation, cryptographic enrollment, and component identity-based access.
---

# Webhook Access Control

Access control for webhook delivery covers who can send events to your endpoints and which components can participate in the delivery path.

## Incoming Access Control

### IP Allowlisting
Restrict which source networks can deliver webhooks to Zen Mesh ingesters. The allowlist is deny-by-default — only explicitly permitted sources are accepted.

[Learn more about IP Allowlisting](./ip-allowlisting)

### Header Validation
Verify that incoming webhook requests contain required headers and valid signatures. Requests with missing or invalid headers are rejected before delivery processing.

[Learn more about Header Validation](./header-validation)

## Component Access Control

### Cryptographic Enrollment
Components establish trusted identity during enrollment. Subsequently, all communication is authenticated through enrolled identities.

[Learn more about Cryptographic Enrollment](./cryptographic-enrollment)

### mTLS Enforcement
Data-plane communication between ingester and egress is protected by mandatory mTLS. The agent-to-SaaS path also requires mTLS + HMAC.

[Learn more about Agent → SaaS mTLS](./agent-saas-mtls)

## Access Control Model

Access control operates in layers:

1. **Network layer** — IP allowlisting at the ingester edge
2. **Authentication layer** — signature verification for incoming events
3. **Identity layer** — cryptographic enrollment for internal components
4. **Authorization layer** — allowlist-based access for delivery paths

## Related Capabilities

- [Secure Webhook Delivery](./secure-webhook-delivery)
- [Security Controls Overview](../security/)
- [IP Allowlisting](./ip-allowlisting)
- [Cryptographic Enrollment](./cryptographic-enrollment)

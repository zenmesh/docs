# Trust Center / Buyer Room (Draft)

> This page provides an overview of Zen Mesh's security posture, compliance direction, and operational transparency for evaluation purposes.

## Product Overview

Zen Mesh is a webhook delivery and multi-target fan-out platform with MCP (Model Context Protocol) integration. See [What Is Zen Mesh](../start-here/what-is-zen-mesh.md) for details.

## Security Posture

- mTLS for agent-to-SaaS communication
- Tenant isolation at the infrastructure level
- Cryptographic enrollment for agent identity
- Secure webhook delivery with HMAC validation
- IP allowlisting and webhook access controls
- ZenLock credential lifecycle management

See [Security documentation](../security/index.md) for details.

## MCP Status

Current MCP posture: **read-scoped/read-only**. No MCP apply-live capability. See [MCP Read-Only V1 Policy](../mcp/read-only-v1-policy.md).

## Support and Security Contacts

- Support: support@zen-mesh.io
- Security: security@zen-mesh.io

See [Support](../start-here/support.md) for details.

## Subprocessors

See [Subprocessor List](../legal/subprocessors.md) for the current list.

## Retention and Data Lifecycle

See [Retention/Data Lifecycle](../legal/retention-lifecycle.md) for proposed retention periods.

## Responsible Disclosure

See [Responsible Disclosure](../legal/responsible-disclosure.md) for the security vulnerability reporting policy.

## Legal Documents

All legal documents are currently in **draft** status and require formal legal review before becoming effective:

- [Terms of Service](../legal/terms.md) — draft
- [Privacy Policy](../legal/privacy.md) — draft
- [DPA](../legal/dpa.md) — draft
- [AUP](../legal/aup.md) — draft
- [Cookie/Tracker Disclosure](../legal/cookie-disclosure.md) — draft
- [Billing/Refund/Plan Terms](../legal/billing-terms.md) — draft
- [Design Partner Terms](../legal/design-partner-terms.md) — draft

## Design Partner Program

See [Design Partner Terms](../legal/design-partner-terms.md) for program details.

## Pricing Direction

See the [Pricing page](https://zen-mesh.io/pricing) for current plan information. Free and Pro are V1 direction. Business is coming soon. Enterprise is contact/evaluation only.

## Runtime Proof Pending

The following items depend on runtime proof before claims can be made:

- Retention enforcement
- Delivery/runtime behavior
- Object-store Day-1
- Shopify V1 (blocker)
- Twilio V1 (blocker)
- Stripe checkout/portal
- Signup/billing entitlement

## No Claims

No SLA, certification, compliance, data residency guarantee, uptime guarantee, or prod/launch-ready claims are made.

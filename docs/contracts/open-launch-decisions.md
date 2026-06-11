---
sidebar_label: Open Launch Decisions
description: Open decisions requiring resolution before or after launch — legal, entry point, BYOK, support channels, pricing, provider implementation.
---

# Open Launch Decisions

This page documents design tensions and open decisions that require resolution. It is a living record — updated as decisions are made.

## Legal

- **Terms of Service, Privacy Policy, Acceptable Use, Cookie Policy, DPA:** All draft stubs. Not yet effective. Final review and legal sign-off required before launch.
- **Final legal text** is not yet written. Existing pages are placeholder content.

## Entry Point

- **Data-plane entry point provider and region:** TBD. The SaaS control plane runs on GCP Toronto, but the public-facing entry point provider and geographic location remain open.
- Single entry point at launch confirmed. Multi-region (EU, APAC) is planned but not committed.

## Object-Store Fan-Out

- **Runtime proof:** Object-store fan-out is contract-defined (S3-compatible) but has no runtime implementation or validation. Proof is required before it can move from "contract-defined launch target" to "V1."

## BYOK / Customer-Managed Keys

- **Design tension:** Full "Zen cannot decrypt" requires BYOK + customer-side replay infrastructure. This is a fundamentally different architecture from V1's Zen-managed keys.
- **V1 uses Zen-managed per-tenant envelope keys.** BYOK is a future Business+ capability.
- Open question: Whether BYOK customers also need customer-operated replay infrastructure, or whether Zen can support replay without holding the unwrapping key (e.g., via customer-supplied temporary grants).

## Support Channels

- **Support at launch:** Email (support@zen-mesh.io), GitHub Issues, documentation.
- **Not yet set up:** Slack public status channel, Discord community, in-app ticket portal.
- **Open:** Whether to add a dedicated security@zen-mesh.io mailbox for security reports, separate from standard support channels.

## Pricing

- **Pro pricing:** $29/mo early bird / $23/mo annual — live at launch.
- **Business pricing:** Coming soon — no price published yet. Open decision on when to announce and at what tier.
- **Stripe billing integration:** Not yet implemented. Pro billing uses Stripe — implementation and testing are open work items.

## Provider Implementation

- **Shopify and Twilio:** Launch targets — connector validation in progress. Runtime implementation/proof required before they can be promoted to "supported at launch."
- Open decision: Whether to add additional providers (GitLab, Alipay, etc.) before or after launch.

## Data Residency

- **No data residency guarantees at launch.** Single entry point only. Multi-region (EU, APAC) is planned but not committed. Customers should not rely on future entry points for current compliance needs.

## See Also

- [Launch Contracts Index](./) — full contract catalog and status matrices
- [Legal Launch Checklist](./legal-launch-checklist) — legal readiness items
- [Entry Point Decision Prep](./entry-point-decision) — entry point provider/region decision
- [Support Channels Decision Prep](./support-channels-decision) — support channels decision
- [Object-Store Runtime Status](./object-store-runtime-status) — object-store contract vs runtime gap
- [Current Status](/docs/start-here/current-status) — platform availability and known limitations

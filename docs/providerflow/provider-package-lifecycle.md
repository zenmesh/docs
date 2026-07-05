---
sidebar_label: Provider Package Lifecycle
head:
  - tag: meta
    attrs:
      name: robots
      content: noindex, nofollow
---

# Provider Package Lifecycle

Provider packages help customers configure webhook integrations with structured defaults.
Public documentation describes supported providers and setup guides. Internal lifecycle,
promotion, and validation mechanics are not described publicly.

## Public scope

For current provider setup, see the integration guides:

- [Stripe](../guides/stripe)
- [GitHub](../guides/github)
- [Custom webhooks](../guides/custom-webhooks)

Detailed package lifecycle, maturity classification, billing mechanics, and quality-gate
processes are documented only when approved for public release.

## What is public today

- Provider signature verification guidance where supported
- Endpoint, target, and flow setup through the product UI/API
- Plan limits documented on [plans and limits](../start-here/plans-and-limits)

## Related

- [Post-Cloud Validation Plan](https://docs.zen-mesh.io/ai/v1/provider-live-validation-plan.json)

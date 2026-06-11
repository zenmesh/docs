---
sidebar_label: Support
description: Contact Zen Mesh support — email, documentation, issue tracking, and community resources. Support channels vary by plan.
---

# Support

Get help with Zen Mesh setup, configuration, and troubleshooting. Support channels and response expectations vary by plan.

## Contact

| Channel | Details | Availability |
|---------|---------|-------------|
| **Email** | [support@zen-mesh.io](mailto:support@zen-mesh.io) | Pro and above |
| **Documentation** | [docs.zen-mesh.io](https://docs.zen-mesh.io) | All plans |
| **Issue Tracker** | [GitHub Issues](https://github.com/zenmesh/zen-platform/issues) | Community |
| **Source Repository** | [github.com/zenmesh/zen-platform](https://github.com/zenmesh/zen-platform) | Public |

## Support by Plan

### Free — Community

- Community support via GitHub Issues
- Full documentation access
- No email support
- No target response time

### Pro — Email

- Email support at [support@zen-mesh.io](mailto:support@zen-mesh.io)
- Best-effort support
- **Target response time: 48 hours**
- "Target response time" means we aim to respond within the stated window. It is not an SLA or contractual guarantee.

### Business — Coming Soon

- Priority email support (planned)
- Faster target response time (planned)
- Not yet available

### Enterprise — Contact Us

- Custom support arrangements
- Dedicated contact (planned)
- [Contact us](mailto:zen@zen-mesh.io?subject=Enterprise%20support%20inquiry) to discuss

## Before Contacting Support

Check these resources first:

- **Documentation**: Browse the [docs site](https://docs.zen-mesh.io) for guides, tutorials, and reference material
- **Troubleshooting**: Review the [Operations Guide](../operations/troubleshooting) for common issues
- **Webhook FAQ**: See the [Webhook FAQ](../reference/webhook-faq) for frequently asked questions about webhook delivery

## What to Include

When contacting support, include:

- A description of what you're trying to do
- Steps you've taken so far
- Any error messages or delivery failure details
- Your tenant ID (if applicable)
- Environment details (SaaS, self-hosted, cluster version)
- Timestamps (UTC preferred)

## Incident Reporting

For suspected service incidents:

1. **Check status** — Review the [current status page](../start-here/current-status) for known issues
2. **Collect evidence** — Gather error messages, timestamps, and affected resources
3. **Report** — Email [support@zen-mesh.io](mailto:support@zen-mesh.io) with details

For security issues, see [Responsible Disclosure](https://zen-mesh.io/security-disclosure) instead of standard support channels.

## Launch Validation Checklist

The following flows are validated as part of launch readiness:

- Free plan limit enforcement (endpoints, events, rate) and upgrade path to Pro
- Support-ticket rehearsal: submitting, receiving acknowledgment, tracking resolution
- Provider connector flows for launch targets:
  - Stripe webhook ingestion and delivery
  - GitHub webhook ingestion and delivery
  - Custom webhook source
  - Shopify webhook ingestion and delivery
  - Twilio webhook ingestion and delivery
- Available provider pages will be updated as each connector is validated

These validation steps do not gate public launch but are tracked internally to ensure coverage.

## Related

- [Current Status](../start-here/current-status) — platform availability and known limitations
- [Plans & Limits](../start-here/limits) — plan tiers and resource limits
- [Operations Troubleshooting](../operations/troubleshooting) — common operational issues
- [Webhook FAQ](../reference/webhook-faq) — frequently asked questions

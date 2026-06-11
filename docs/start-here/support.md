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

### Free — Community / Best Effort

- Community support via GitHub Issues
- Full documentation access
- Best-effort assistance during the first year
- No email support
- No target response time

### Pro — Preferential

- Preferential support over Free
- Email support at [support@zen-mesh.io](mailto:support@zen-mesh.io)
- Best-effort support
- **Target response time: 48 hours**
- "Target response time" means we aim to respond within the stated window. It is not an SLA or contractual guarantee.

No backup or escalation responder is published at launch.

### Business — Coming Soon

- Priority email support (planned)
- Faster target response time (planned)
- Not yet available

### Enterprise — Contact Us

- Custom support arrangements
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

## Incident Report Template

```
**Incident Report**
- Date/Time (UTC):
- Tenant ID:
- Affected Resources (source/target/route IDs):
- Description of Issue:
- Steps Taken:
- Error Messages/Status Codes:
- Expected vs Actual Behavior:
```

## Refund Request

Refund requests are handled in accordance with the Terms of Service. To request a refund:

1. Email [support@zen-mesh.io](mailto:support@zen-mesh.io) with the subject "Refund Request"
2. Include your tenant ID and invoice number
3. Describe the reason for the request

Refund eligibility is described in the [Terms of Service](../legal/terms-of-service) (draft — not yet effective).

## Payload Sharing Guidance

When sharing webhook payload samples with Zen Mesh support:

- **Customer-controlled:** You decide what to share. Support cannot browse your raw payloads.
- **Never paste secrets:** Remove or redact API keys, tokens, passwords, and other secrets before sharing.
- **Use sanitized samples:** Replace sensitive values with placeholder data (e.g., `sk_test_...` → `sk_test_REDACTED`).
- **Safe path:** Share through [support@zen-mesh.io](mailto:support@zen-mesh.io) using encrypted email if preferred.

For details on how Zen Mesh handles payload data, see [Data Handling](../start-here/data-handling).

## Support Area Roadmap

The following support capabilities are planned but not yet available:

- Status page with real-time incident tracking
- Customer-facing ticket management portal
- Slack public status channel — not yet set up; do not rely on it
- Discord community — not yet created; not available at launch
- On-call rotation with published escalation path

Do not rely on planned support capabilities until they are documented as available on this page.

## Related

- [Current Status](../start-here/current-status) — platform availability and known limitations
- [Plans & Limits](../start-here/limits) — plan tiers and resource limits
- [Operations Troubleshooting](../operations/troubleshooting) — common operational issues
- [Webhook FAQ](../reference/webhook-faq) — frequently asked questions

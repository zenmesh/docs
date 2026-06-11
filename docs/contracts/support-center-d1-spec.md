---
sidebar_label: Support Center D1 Spec
description: Day-1 support center specification — form fields, channels, FAQ, payload grant flow, and security mailbox decisions.
---

# Support Center D1 Spec

> **Day-1 specification for the support center.** This describes the intended setup at launch.

## Confirmed Channels

| Channel | Details | Availability |
|---------|---------|-------------|
| **Email** | [support@zen-mesh.io](mailto:support@zen-mesh.io) | Pro+ |
| **Documentation** | [docs.zen-mesh.io](https://docs.zen-mesh.io) | All plans |
| **GitHub Issues** | [github.com/zenmesh/zen-platform/issues](https://github.com/zenmesh/zen-platform/issues) | Community |
| **Support form / link hub** | Simple form on the support page | All plans (D1) |

## Not Yet Set Up

| Channel | Status | Notes |
|---------|--------|-------|
| **Slack public status channel** | Unconfirmed | Decision needed before or after launch |
| **Discord community** | Not created | Not available at launch. Do not rely on it. |
| **In-app ticket portal** | Future | Full portal is post-V1; D1 uses form/link hub |
| **security@ mailbox** | Open decision | See [Support Channels Decision Prep](/docs/contracts/support-channels-decision) |

## Support Form Fields (D1)

When a user submits a support request, the form should collect:

| Field | Required | Notes |
|-------|----------|-------|
| Tenant ID | Yes | Auto-populated if authenticated |
| Plan tier | Auto | Free / Pro / Business / Enterprise |
| Provider | Yes | Stripe / GitHub / Custom / Other |
| Event ID (optional) | No | Helps correlate to delivery log |
| Route ID (optional) | No | Helps identify the delivery flow |
| Error message / description | Yes | Free text — max 2000 chars |
| Redacted payload sample (optional) | No | User-provided, sanitized |
| Consent checkbox | Yes | "I confirm I have redacted all secrets and sensitive data" |
| Timestamp (UTC) | Recommended | When the issue occurred |

## Security / Never Request

The support form and support staff MUST NOT by default:

- Request raw API keys, tokens, or passwords
- Request unredacted webhook payloads
- Request SSH keys, certificates, or other secrets
- Request full target URLs with embedded credentials

## Payload Grant Flow (Future / Customer-Authorized)

When a support issue requires payload inspection:

1. Customer explicitly authorizes a time-bounded payload access grant
2. Support staff receives scoped access to specific event payloads only
3. Grant is audited — purpose, scope, duration recorded
4. Customer can revoke grant at any time
5. Automated self-serve grant management is planned (not V1)

See [Support Payload Access Contract](/docs/contracts/support-payload-access).

## FAQ Links (D1)

The support page should prominently link to:

- [Webhook FAQ](/docs/reference/webhook-faq)
- [Delivery Failures](/docs/delivery/delivery-failures)
- [Troubleshooting](/docs/operations/troubleshooting)
- [Plans & Limits](/docs/start-here/limits)
- [Data Handling](/docs/start-here/data-handling)
- [Pricing](https://zen-mesh.io/pricing)

## Response Times

| Plan | Target | Notes |
|------|--------|-------|
| Free | Best effort / community | No target response time |
| Pro | 48 hours (target) | Not an SLA or contractual guarantee |
| Business | Priority (planned) | Not yet available |
| Enterprise | Custom | Contact us |

## See Also

- [Support](/docs/start-here/support) — current support page
- [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack) — onboarding flow
- [Support Channels Decision Prep](/docs/contracts/support-channels-decision) — channel decisions
- [Support Payload Access Contract](/docs/contracts/support-payload-access) — payload access policy

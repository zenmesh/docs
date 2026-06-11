---
sidebar_label: Billing and Overage Launch Contract
description: Billing and overage contract for launch — Pro pricing, Free limits, overage opt-in cap, failed payment, overrides, Stripe integration.
---

# Billing and Overage Launch Contract

> **V1 contract — billing and overage behavior at launch.**

## Pricing

| Plan | Price | Status |
|------|-------|--------|
| **Free** | No credit card required | Live at launch |
| **Pro** | $29/month (early bird) or $23/month (annual — 20% off) | Live at launch |
| **Business** | Coming soon — no price published | Not yet available |
| **Enterprise** | Contact us | Custom |

## Free Plan Over-Limit Behavior

- **Hard stop** — HTTP 429 when monthly event limit (1,000) or rate limit (60/min) is exceeded
- HTTP 422 when resource count limits exceeded
- Response includes `upgrade_url` to Pro
- No silent drops — all limits return structured error responses

See [Plans & Limits](/docs/start-here/limits) for details.

## Pro Plan Over-Limit Behavior

- **Warnings** — notifications as you approach limits
- **Overage or upgrade path** — no hard stop. Pro customers receive an overage option or upgrade guidance
- **Opt-in overage cap** — set a ceiling on automatic overage charges to avoid surprise billing. Overage is opt-in. Without a cap, the system applies a soft limit with upgrade guidance.
- No silent drops

## Failed Payment

- 10-day grace period after failed payment
- After day 10, account is downgraded to Free
- Data is preserved for 30 days after downgrade, then reverts to Free plan retention limits

## Overrides

- Plan limit overrides require approval
- Default duration: 30 days
- Maximum duration: 1 year
- Audit evidence required for every override
- No silent permanent overrides
- All overrides are tracked and auditable

## Stripe Billing Integration

- Pro billing uses Stripe for payment processing
- Stripe billing integration is pending implementation and testing
- Paid Pro signup is not available until Stripe integration is complete
- Early access / design partner accounts may be provisioned manually before Stripe integration

## Design Partner Program

- First 6 months post-launch
- 6 months of Pro free
- Requires annual payment commitment after free period
- Monthly feedback via online survey
- Contact [support@zen-mesh.io](mailto:support@zen-mesh.io?subject=Design%20Partner%20Program)

## See Also

- [Plans & Limits](/docs/start-here/limits) — resource limits and over-limit behavior
- [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack) — onboarding flow
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — unresolved decisions
- [Support](/docs/start-here/support) — support channels

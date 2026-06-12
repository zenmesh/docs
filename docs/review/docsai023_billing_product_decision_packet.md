# DOCSAI023 Billing & Product Decision Packet

> **Task ID:** DOCSAI023
> **Date:** 2026-06-12
> **Status:** PRE-BILLING — No billing system operational at launch

## Billing System Status

- **Billing engine:** Not operational
- **Stripe integration:** Runtime proof only — not live for customer billing
- **Payment collection:** Not operational
- **Metering:** Not operational
- **Invoicing:** Not operational

## Plan Limits

| Plan | Events/Month | Destinations | Price | Status |
|------|-------------|-------------|-------|--------|
| Free | TBD | TBD | $0 | Launch-facing |
| Pro | TBD | TBD | TBD | Launch-facing (notify) |
| Business | TBD | TBD | TBD | Coming soon |
| Enterprise | Custom | Custom | Custom | Contact/evaluation |

**Blocker:** Exact plan limits require Leonardo decision (LD-006).

## Downgrade/Upgrade

- **Downgrade path:** Not documented — requires billing system
- **Upgrade path:** Notify interest via email (pricing page)
- **Plan migration:** No automated migration — manual process

## Over-Limit Behavior

- **Not documented:** Billing system required to define over-limit behavior
- **Options:** Hard cutoff, soft warning + overage billing, queue-and-retry
- **Decision needed:** LD-007

## Payment Failure

- **Not documented:** Billing system required
- **Standard approach:** Grace period → notification → suspension → termination
- **Decision needed:** LD-007

## Refunds

- Referenced in legal/terms-of-service.md: "Handled in accordance with applicable law"
- No specific refund policy defined
- **Decision needed:** LD-008

## Metering Dependencies

- Event counting: Requires runtime metering implementation
- Destination counting: Requires runtime metering implementation
- Storage usage: Requires runtime metering implementation
- **All metering is Hermes/Helper runtime dependency — not docs-owned**

## Stripe Dependency

- Stripe used for webhook source integration (runtime proof exists)
- Stripe NOT used for billing/payment collection (not operational)
- Do not conflate "Stripe webhook source" with "Stripe billing"

## Billing Legal Notes

- Terms of Service draft includes refund clause (needs legal review)
- No specific payment terms defined
- Tax handling not addressed
- **All billing legal requires legal review before billing goes live**

## Pre-Billing Launch Position

For V1 launch WITHOUT billing:
- Free tier only — no payment required
- Pro tier: "Notify me" email capture on pricing page
- Business/Enterprise: Contact/evaluation only
- No payment collection, no invoicing, no metering
- This is the safest V1 launch position

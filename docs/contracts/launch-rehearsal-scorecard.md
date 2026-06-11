---
sidebar_label: Launch Rehearsal Scorecard
description: Launch rehearsal scorecard — required steps with pass/fail/blocked status, owner, evidence link, customer impact, launch blocker flag.
---

# Launch Rehearsal Scorecard

> **Rehearsal scorecard for first-customer simulation.**
>
> Each step is validated in a sandbox/demo environment. Results are recorded as Pass, Fail, or Blocked.
> Launch blockers are flagged if a failure would prevent public launch.

## Scorecard

| # | Step | Owner | Status | Evidence Link | Customer Impact | Launch Blocker |
|---|------|-------|--------|---------------|-----------------|----------------|
| 1 | Free plan signup — email verification, tenant creation | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot sign up | **Yes** |
| 2 | Create Stripe source with signing secret | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot configure first provider | **Yes** |
| 3 | Create GitHub source with HMAC | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | GitHub users cannot onboard | **Yes** |
| 4 | Create HTTP target (public URL) | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot set up delivery | **Yes** |
| 5 | Create route connecting source to target | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot receive events | **Yes** |
| 6 | Send test event — verify delivery (200) | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot see delivery working | **Yes** |
| 7 | View delivery evidence — timestamps, labels, status | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot confirm delivery | Yes |
| 8 | Exceed Free plan limits — verify 429 with upgrade_url | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Free plan does not enforce limits (cost risk) | Yes |
| 9 | View upgrade UI from Free to Pro | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot find upgrade path | Yes |
| 10 | Submit support form with redacted sample | Support | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot get help | **Yes** |
| 11 | Export evidence (Free UI / Pro API) | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot retrieve evidence | Yes |
| 12 | Manual data deletion request via email | Support | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot delete data | Yes |
| 13 | Manual data export request via email | Support | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot export data | No |
| 14 | Refund request path documented | Legal/Support | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot request refund | No |
| 15 | Add labels to resources — filter by label | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot organize resources | No |
| 16 | Failed signature verification — observe error | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Support cannot debug signature issues | No |
| 17 | Failed delivery — observe DLQ behavior | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Support cannot debug delivery failures | No |
| 18 | Downgrade from Pro to Free | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot downgrade | No |
| 19 | Delete source/target/route | Eng | ☐ Pass / ☐ Fail / ☐ Blocked | | Customer cannot clean up | No |

## Key

| Status | Meaning |
|--------|---------|
| **Pass** | Step works as documented |
| **Fail** | Step does not work — needs fixing before launch |
| **Blocked** | Step cannot be tested (dependency not ready) |

## Summary

| Metric | Value |
|--------|-------|
| Total steps | 19 |
| Passed | — |
| Failed | — |
| Blocked | — |
| Launch blockers (failing) | — |
| Launch blockers (blocked) | — |

## See Also

- [First-Customer Rehearsal Checklist](/docs/contracts/first-customer-rehearsal) — walkthrough checklist
- [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) — validation gates
- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — overall blocker index
- [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack) — onboarding flow

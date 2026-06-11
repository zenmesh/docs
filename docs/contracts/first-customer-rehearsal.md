---
sidebar_label: First-Customer Rehearsal Checklist
description: Recommended pre-launch rehearsal walkthrough — signup, create source/target/route, test event, upgrade, support, evidence, deletion.
---

# First-Customer Rehearsal Checklist

> **Recommended — not a hard launch gate (per Leonardo).**
>
> This walkthrough simulates a first-customer experience from signup to support.
> Each step should be validated in a sandbox/demo environment before public launch.

## Walkthrough

For a detailed scorecard with pass/fail/blocked tracking, evidence links, and launch blocker flags, see [Launch Rehearsal Scorecard](/docs/contracts/launch-rehearsal-scorecard).

The high-level walkthrough steps are:

- [ ] **1. Signup** — complete Free plan registration, email verification, tenant creation
- [ ] **2. Create source** — configure a Stripe source with signing secret
- [ ] **3. Create target** — enter a public or private destination URL
- [ ] **4. Create route** — connect source to target
- [ ] **5. Send test event** — trigger a webhook from Stripe or curl
- [ ] **6. Verify delivery** — check delivery log for 200 status
- [ ] **7. View evidence** — confirm delivery receipt with timestamps and labels
- [ ] **8. Test Free limit** — attempt to exceed Free plan limits and verify structured error response
- [ ] **9. Upgrade path** — view upgrade UI from Free to Pro (note: paid Pro requires Stripe billing integration)
- [ ] **10. Support request** — submit a support form with redacted sample
- [ ] **11. Evidence export** — export delivery evidence via UI (Free) or API (Pro)
- [ ] **12. Deletion/export request** — verify manual data deletion and export process via email
- [ ] **13. Refund request path** — verify refund request instructions are accessible
- [ ] **14. Label resources** — add labels to source/target/route and filter by label
- [ ] **15. Failed signature verification** — simulate invalid signing secret and verify error
- [ ] **16. Failed delivery** — configure an unreachable target and verify DLQ behavior
- [ ] **17. Downgrade** — downgrade from Pro to Free and verify limit reversion
- [ ] **18. Delete source** — delete a source and verify it is removed from routes
- [ ] **19. Permission-axis walkthrough** — verify UI/API/MCP channel permissions work as documented (future / when implemented)

## Customer-Facing Checklists

For customer-facing onboarding, see:

- [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack)
- [Getting Started Guides](/docs/getting-started/quick-start)
- [First Stripe Webhook](/docs/getting-started/first-stripe-webhook)
- [First GitHub Webhook](/docs/getting-started/first-github-webhook)

## See Also

- [Launch Rehearsal Scorecard](/docs/contracts/launch-rehearsal-scorecard) — pass/fail/blocked scorecard with launch blocker flags
- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — overall blocker index
- [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) — validation gates
- [Draft Branch Merge Checklist](/docs/contracts/draft-branch-merge-checklist) — pre-merge review

---
sidebar_label: PR & Merge Readiness
description: PR and merge readiness for the HELPER032 launch-policy-reconcile branch — legal review, entry-point decision, support channels, object-store runtime status, claim scan, builds, links, rollback plan.
---

# PR & Merge Readiness

> **Merge blocker checklist for the `HELPER032-launch-policy-reconcile` branch.**

## Merge Blockers

All items below must be resolved before merging to `main`.

### Legal Review

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 1 | Terms of Service final text | Leonardo / legal counsel | Blocked | Draft exists; final text not written |
| 2 | Privacy Policy final text | Leonardo / legal counsel | Blocked | Draft exists; final text not written |
| 3 | Acceptable Use Policy final text | Leonardo / legal counsel | Blocked | Draft exists; final text not written |
| 4 | DPA final text | Leonardo / legal counsel | Blocked | Draft exists; final text not written |
| 5 | Cookie Policy final text | Leonardo / legal counsel | Blocked | Draft exists; final text not written |
| 6 | Legal sign-off that drafts are effectively reviewable | Leonardo / legal counsel | Blocked | — |
| 7 | Refund process documented | Leonardo / legal counsel | Blocked | — |
| 8 | Data deletion/export process documented | Leonardo / legal counsel | Blocked | — |

### Entry-Point Decision

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 1 | Data-plane entry point provider chosen | Leonardo | Open | Options: (see entry-point-decision) |
| 2 | Data-plane entry point region confirmed | Leonardo | Open | Impact on pricing, latency, compliance |
| 3 | UI data-plane selector behavior implemented | Engineering | Open | Depends on provider/region decision |

### Support Channels

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 1 | Email (support@) confirmed | Leonardo | Confirmed | Operational at launch |
| 2 | Documentation as support channel confirmed | Docs team | Confirmed | docs.zen-mesh.io |
| 3 | GitHub Issues as community channel confirmed | Leonardo | Confirmed | github.com/zenmesh/zen-platform |
| 4 | Slack public status channel decided | Leonardo | Open | Decision needed before or after launch |
| 5 | Discord community created | Leonardo | Open | Not available at launch |
| 6 | security@ mailbox set up | Leonardo | Open | Depends on channel decision |
| 7 | Support staffing confirmed | Leonardo | Open | — |

### Object-Store Runtime Status

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 1 | S3-compatible fan-out runtime proof | Engineering | Not started | Contract-defined; no runtime proof |
| 2 | GCS fan-out runtime proof | Engineering | Not started | Roadmap only |
| 3 | Wasabi fan-out runtime proof | Engineering | Not started | Roadmap only |

### Pre-Merge Validation

- [ ] Legal pages all marked "draft / pending legal review / not effective"
- [ ] No page claims binding legal terms
- [ ] No forbidden claims (production-ready, SLA, certification, exactly-once, guaranteed-delivery, "Zen never decrypts" as V1)
- [ ] Provider status correct: Stripe/GitHub/Custom = supported at launch; Shopify/Twilio = launch targets
- [ ] Object-store correctly scoped: launch target, not V1, no runtime proof claimed
- [ ] BYOK correctly scoped: future Business+, not V1
- [ ] Payload access correctly described: Level 1 V1, no "Zen never decrypts" V1 claim
- [ ] Docs build passes (npx docusaurus build)
- [ ] Site build passes (npm run build in zen-mesh.io)
- [ ] Broken links = 0
- [ ] Claim scan passes
- [ ] Runtime/deploy untouched (no changes to zen-platform, deploy, kube, sandbox)
- [ ] No registry status/count changes

## Rollback Plan

If the merged branch causes issues:

1. **Immediate rollback:** `git revert HEAD` on main, push
2. **Docs rollback:** Revert docs.zen-mesh.io deployment to previous build
3. **Site rollback:** Revert www.zen-mesh.io deployment to previous build
4. **Notification:** Post in team channel confirming rollback and reason
5. **Root cause analysis:** Determine what failed and whether it affects the next merge attempt

## Approval Gates

| Gate | Required By | Status |
|------|-------------|--------|
| Leonardo approval | Leonardo | Pending |
| Legal counsel sign-off | Legal counsel | Pending |
| Support channel decisions confirmed | Leonardo | Pending |
| Entry point decision confirmed | Leonardo | Pending (optional for main — can remain open in docs) |

## Branch

**Current branch:** `HELPER032-launch-policy-reconcile`

**Do not merge to `main` until all blockers above are resolved.**

## See Also

- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — remaining blockers
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — unresolved decisions
- [Legal Launch Checklist](/docs/contracts/legal-launch-checklist) — legal readiness
- [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) — validation gates
- [Draft Branch Merge Checklist](/docs/contracts/draft-branch-merge-checklist) — original pre-merge checklist

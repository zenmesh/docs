---
sidebar_label: Draft Branch Merge Checklist
description: Pre-merge review checklist for the HELPER032-launch-policy-reconcile branch before merging to main.
---

# Draft Branch Merge Checklist

> **Do not merge until all items are confirmed.**

## Pre-Merge Checks

- [ ] **Legal pages still draft?** — Terms, Privacy, AUP, DPA, Cookie all clearly marked "draft / pending legal review / not effective"
- [ ] **No effective legal claims** — no page claims binding legal terms
- [ ] **Entry point safely unresolved?** — no data residency claims, entry point marked as TBD
- [ ] **No forbidden claims** — no production-ready, SLA, certification, exactly-once, guaranteed-delivery
- [ ] **Provider status correct** — Stripe/GitHub/Custom = supported at launch; Shopify/Twilio = launch targets
- [ ] **Object-store correctly scoped** — launch target, not V1, no runtime proof claimed
- [ ] **BYOK correctly scoped** — future Business+, not V1
- [ ] **Payload access correctly described** — Level 1 V1, no "Zen never decrypts" V1 claim
- [ ] **All builds pass** — docs build, site build
- [ ] **Broken links = 0**
- [ ] **Claim scan passes**
- [ ] **Runtime/deploy untouched** — no changes to zen-platform, deploy, kube, sandbox
- [ ] **No registry status/count changes**
- [ ] **Support channels confirmed?** — at least email + docs confirmed; Slack/Discord decisions documented as open

## Merge Only After

- [ ] Leonardo approval
- [ ] Legal counsel sign-off (on legal pages being effectively reviewable)
- [ ] Support channel decisions confirmed
- [ ] Entry point decision confirmed (optional for main — could remain open in docs)

## Branch

**Current branch:** `HELPER032-launch-policy-reconcile`

**Do not merge to `main` until the above checks pass.**

## See Also

- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — remaining blockers
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — unresolved decisions
- [Legal Launch Checklist](/docs/contracts/legal-launch-checklist) — legal readiness
- [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) — validation gates

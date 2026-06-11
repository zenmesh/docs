---
sidebar_label: Launch Readiness Gap-to-Action
description: Index of remaining launch blockers classified by type — decision, implementation, runtime proof, legal review, and support operations.
---

# Launch Readiness Gap-to-Action

This page indexes remaining prerequisites for public launch. Each item is classified by type and includes an owner suggestion but no claims of completion.

## Open Items

| # | Item | Type | Owner (Suggestion) | Depends On |
|---|------|------|--------------------|------------|
| 1 | **Legal full text** — final Terms, Privacy, AUP, DPA, Cookie | Legal review | Leonardo / legal counsel | Draft complete; final text not written |
| 2 | **Entry point provider/region** — choose first data-plane entry point | Decision | Leonardo | — |
| 3 | **Stripe billing integration** — implement and test Pro billing | Implementation | Engineering | Entry point confirmed |
| 4 | **RBAC/ABAC runtime proof** — label-based access control validation | Runtime proof | Engineering | — |
| 5 | **Object-store fan-out runtime proof** — S3-compatible delivery | Runtime proof | Engineering | Contract defined; no runtime yet |
| 6 | **Hermes runtime proof** — H716/H719 gates validation | Runtime proof | Engineering | — |
| 7 | **Support channels confirmed** — Slack, Discord, security@ mailbox | Decision / Support ops | Leonardo | — |
| 8 | **Shopify connector implementation/proof** | Implementation / Runtime proof | Engineering | — |
| 9 | **Twilio connector implementation/proof** | Implementation / Runtime proof | Engineering | — |
| 10 | **Business pricing announcement** | Decision | Leonardo | After Pro launch |
| 11 | **Multi-region data-plane commitment** | Decision | Leonardo | After initial launch |
| 12 | **Customer onboarding documentation** | Docs | Docs team | Ongoing (this pack) |

## Classification Key

| Type | Meaning |
|------|---------|
| **Decision** | Requires Leonardo (or designated authority) to choose between options |
| **Implementation** | Requires engineering work to build or integrate |
| **Runtime proof** | Requires validation/testing in sandbox or demo environment |
| **Legal review** | Requires legal counsel review and sign-off |
| **Support ops** | Requires operational setup (channels, staffing, tools) |

## Where Each Item Lives

- Items 1–2: [Open Launch Decisions](/docs/contracts/open-launch-decisions)
- Items 3, 7, 10: [Billing and Overage Launch Contract](/docs/contracts/billing-overage-launch) (create), [Support Channels Decision Prep](/docs/contracts/support-channels-decision)
- Items 4–6, 8–9: [Runtime Proof Checklist](/docs/contracts/runtime-proof-checklist) (create)
- Item 11: [Data-Plane Selection Contract](/docs/contracts/data-plane-selection)
- Item 12: [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack) (create)

## See Also

- [Launch Contracts Index](/docs/contracts/) — full contract catalog
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — unresolved decisions
- [Legal Launch Checklist](/docs/contracts/legal-launch-checklist) — legal readiness items
- [Draft Branch Merge Checklist](/docs/contracts/draft-branch-merge-checklist) — pre-merge review

# DocsAI022 Findings — DOCSAI001 Reconciliation + Full Launch Polish

> **Reviewer:** DocsAI (automated docs-only review)
> **Scope:** docs.zen-mesh.io (Docusaurus), zen-mesh.io (Astro), no runtime/deploy changes
> **Branch:** `DOCSAI022-zen-platform` (docs), `DOCSAI022-zen-mesh.io` (site)
> **Date:** 2026-06-12

## Fixed Issues (this pass — DOCSAI022)

| # | File | Issue | Fix |
|---|------|-------|-----|
| F1 | `pricing.astro` | Tier naming mismatch (Preview/Team) vs docs (Free/Pro) | Realigned: Free/Pro/Business/Enterprise |
| F2 | `pricing.astro` | $29/month pricing claim (billing not live) | Changed Pro to "Pricing TBD" |
| F3 | `pricing.astro` | Grid repeat(4,1fr) with only 3 cards | Fixed — 4 cards now |
| F4 | `pricing.astro` | CTAs used zen@ instead of support@ | Pro/Business use support@ with subject lines |
| F5 | `pricing.astro` | No support email on Free card | Added explicit email link |
| F6 | `sidebars.ts` | Legal pages not in sidebar | Added "Legal (Draft — Not Effective)" category |
| F7 | `Layout.astro` footer | No support email in footer | Added support@zen-mesh.io to Company section |
| F8 | `legal/*` (5 pages) | Legal pages from helper031 not integrated | Integrated Terms, Privacy, AUP, DPA, Cookie |

## Previously Fixed (DOCSAI001, cherry-picked into DOCSAI022)

| # | File | Issue | Fix |
|---|------|-------|-----|
| P1 | commitments.astro L53 | "ensures data residency" forward claim | Changed to "provider/region to be confirmed" |
| P2 | try.astro L57 | Broken link to docs/ai/agent | Fixed to docs/ai/overview |
| P3 | launch-status.md L12 | Broken GitHub link | Fixed to Runtime Proof Checklist |
| P4 | launch-status.md L22 | Internal repo path exposed | Replaced with evidence links |
| P5 | current-status.md L19 | Same broken link | Fixed |
| P6 | sidebars.ts | launch-status not in sidebar | Added |
| P7 | destinations.md L41 | "within SLA" | Changed to "within target response time" |
| P8 | troubleshooting.md L86 | Unconfirmed Slack link | Removed URL |
| P9 | upgrade-free-to-pro.md L52 | "Email + Slack" implied Slack available | Clarified Slack not confirmed |

## Remaining Editorial Risks

| # | Area | Risk | Status |
|---|------|------|--------|
| E1 | Edge Lite public visibility | May confuse general visitors | LD-001 |
| E2 | Blog strategy | Footer links to /blog but only 3 posts | LD-002 |
| E3 | launch-status.md evidence stats | "10/10 proofs" are local/mock | LD-003 |
| E4 | 11 missing search-intent headings | Important terms not findable | Docs can add |
| E5 | 47 orphaned doc files | Includes .apix references, ai/ docs | Many intentional |

## Remaining Launch-Blocker Docs Issues

| # | Issue | Blocker? |
|---|-------|----------|
| L1 | Legal pages (5) draft/non-effective | YES — legal |
| L2 | No signup page (email-only early access) | NO |
| L3 | Billing not live | NO |
| L4 | No security.txt / disclosure page | LD-008 |

## Pages Needing Leonardo Review

- LD-001: Edge Lite public visibility
- LD-002: Blog strategy
- LD-003: Evidence stats qualifier
- LD-004: Subprocessor list for DPA
- LD-005: Support payload access policy
- LD-006: Billing refund terms
- LD-007: Evidence retention/redaction
- LD-008: Security disclosure / security.txt

## Pages Needing Legal Review

- legal/terms-of-service
- legal/privacy-policy
- legal/acceptable-use
- legal/dpa
- legal/cookie-policy

## Pages Depending on Hermes Runtime Proof

None.

## Pages Depending on Helper2 Implementation

- contracts/object-store-runtime-status
- contracts/billing-overage-launch
- contracts/support-center-d1-spec

## Contradiction/Claim Scan Results

| Claim | Result |
|-------|--------|
| AWS/us-east-1 live/canonical | PASS — hypothetical example only |
| Data residency claim | PASS — capability description, not guarantee |
| zen.io domain | PASS — no positive usage |
| zen/* namespace | PASS — no positive usage |
| MCP apply live | PASS — not claimed |
| Permission-axis runtime live | PASS — contract/design only |
| Object-store runtime live | PASS — correctly scoped |
| Business/Enterprise live | PASS — Business=coming soon, Enterprise=contact |
| SLA/certification | PASS — all negative |
| Exactly-once delivery | PASS — "Not claimed" under heading |
| Guaranteed delivery | PASS — non-claims only |
| "Zen can never decrypt" | PASS — not found |
| prod/live/launch-ready claims | PASS — consistent "no production-live claim" |

## Validation

| Check | Result |
|-------|--------|
| Docs build | PASS |
| Site build | PASS |
| Broken links | 0 |
| Claim scan | PASS |
| Forbidden claims | 0 |
| Legal stubs draft | All 5 confirmed |
| Runtime/deploy unchanged | Confirmed |

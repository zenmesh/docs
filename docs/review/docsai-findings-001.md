---
sidebar_label: DocsAI001 Findings
---

# DocsAI001 — Independent QA, IA, and Review-Ready Polish Findings

> **Reviewer:** DocsAI (automated docs-only review)
> **Scope:** docs.zen-mesh.io (Docusaurus), zen-mesh.io (Astro), no runtime/deploy changes
> **Branch:** `helper031-launch-docs` (docs), `DOCSAI002-public-trust-legal-signup-readiness` (site)
> **Date:** 2026-06-12

## Fixed Issues (this pass)

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `public:commitments.astro` L53 | "ensures data residency" — forward claim | Changed to "Entry point provider and region are to be confirmed at launch; your events don't leave your selected regions unless explicitly configured." |
| 2 | `public:try.astro` L57 | Broken link `docs/ai/agent` (page doesn't exist) | Fixed to `docs/ai/overview` |
| 3 | `docs:start-here/launch-status.md` L12 | Broken GitHub link to nonexistent validation-gates.md | Replaced with links to Runtime Proof Checklist and Launch Readiness Gap to Action |
| 4 | `docs:start-here/launch-status.md` L22 | Internal-only repo path exposed publicly | Replaced with links to Evidence section and AI evidence artifacts |
| 5 | `docs:start-here/current-status.md` L19 | Same broken GitHub validation-gates link | Fixed to Runtime Proof Checklist |
| 6 | `docs:sidebars.ts` | `start-here/launch-status` not in sidebar (orphaned, important public page) | Added to Start Here section |
| 7 | `docs:sidebars.ts` | `architecture/platform-layers` not in sidebar (orphaned, useful reference) | Added to Architecture section |

**Previously fixed (committed in earlier DocsAI passes):**

| # | File | Issue | Fix |
|---|------|-------|-----|
| P1 | `docs:guides/destinations.md` L41 | "within SLA" — forbidden terminology | Changed to "within target response time" |
| P2 | `docs:operations/troubleshooting.md` L86 | Unconfirmed Slack workspace link exposed publicly | Removed raw Slack URL, kept text reference with "not yet confirmed" |
| P3 | `docs:getting-started/upgrade-free-to-pro.md` L52 | "Email + Slack" implied Slack available | Changed to "Email (support@zen-mesh.io); Slack workspace not yet confirmed" |

## Editorial Risks (not fixed — needs Leonardo decision)

| # | Area | Risk | Recommendation |
|---|------|------|----------------|
| E1 | Pricing tier naming | Public site uses "Preview / Team / Enterprise"; docs use "Free / Pro / Business / Enterprise" | Align on one naming scheme across both surfaces before launch |
| E2 | `start-here/launch-status.md` evidence stats | Hardcoded "10/10 proofs, victory-locked" | These are local/mock/cloud-demo — consider adding "(local/mock or cloud-demo)" qualifier as in current-status.md for precision |
| E3 | Blog references | Public site footer links to `/blog` but blog is minimal (3 posts) | Either add more launch-related posts or remove prominent blog link until content is ready |
| E4 | `ai/edge-lite` (157 lines) | Detailed Edge Lite design doc is public-facing but marked as "Pre-Launch Design-Partner Evaluation" | Consider `unlisted: true` or moving to internal-review section — design-partner content may confuse general visitors |

## Remaining Launch-Blocker Docs Issues

| # | Issue | Status | Blocker? |
|---|-------|--------|----------|
| L1 | Legal pages (Terms, Privacy, AUP, DPA, Cookie) all marked draft/non-effective | Legal review required before public signup | YES — legal |
| L2 | No public-facing signup/registration page on site (only "Join Early Access" email) | Expected for early access, not a docs blocker | NO |
| L3 | Pricing page has $0/$29/Custom but no payment flow documented | Expected for early access | NO |

## Pages Needing Leonardo Review

- **Pricing tier naming** (E1 above) — Preview/Team vs Free/Pro alignment
- **Edge Lite public visibility** (E4 above) — keep public or unlist?
- **Blog strategy** (E3 above) — expand or de-emphasize?

## Pages Needing Legal Review

All 5 legal pages are marked draft/non-effective:
- `legal/terms-of-service`
- `legal/privacy-policy`
- `legal/acceptable-use`
- `legal/dpa`
- `legal/cookie-policy`

## Pages Depending on Hermes Runtime Proof

No docs-only pages depend on Hermes runtime state. Evidence/status pages reference proof results but are informational only.

## Pages Depending on Helper2 Implementation

- `contracts/object-store-runtime-status` — object-store fan-out requires runtime proof before Day 1 claim (currently correctly scoped as "not runtime-proven")
- `contracts/billing-overage-launch` — billing overage logic requires Helper2 implementation
- `contracts/support-center-d1-spec` — support center D1 spec requires implementation

## Contradiction/Claim Scan Results

| Claim Checked | Result |
|---------------|--------|
| AWS/us-east-1 live/canonical | PASS — no claim found; only "provider/region to be confirmed" language |
| Data residency claim | FIXED — commitments.astro L53 was forward claim; corrected |
| `zen.io` domain | PASS — no positive usage found; labels.md correctly marks forbidden |
| `zen/*` supported namespace | PASS — no positive usage found; labels.md correctly marks forbidden |
| MCP apply live | PASS — draft-system.md is design-only; read-only-v1-policy correctly scoped |
| Permission-axis runtime live | PASS — permission-channels.md clearly marked "contract/design only" |
| Object-store runtime live | PASS — object-store-runtime-status correctly scoped as not proven |
| Business/Enterprise live | PASS — Enterprise is "Contact us"; no live Business tier on pricing page |
| SLA/certification | PASS — all SLA references are negative ("no hard SLAs") |
| Exactly-once delivery | PASS — only in non-claims section as "not claimed" |
| Guaranteed delivery | PASS — only in non-claims as "goals, not current capabilities" |
| "Zen can never decrypt" | PASS — not found in any docs |
| prod/live/launch-ready claims | PASS — "early access" and "no production-live claim" language consistent |

## Terminology Consistency

| Term | Expected | Status |
|------|----------|--------|
| "object store" (not S3-only) | Used in contracts | PASS |
| "multi-target" / "multi-destination" | Used in delivery docs | PASS |
| "target response time" (not SLA) | Fixed in destinations.md | PASS |
| "draft/non-effective" for legal stubs | All legal pages have frontmatter | PASS |
| "current MCP read/scoped" | MCP docs correctly scoped | PASS |
| "future MCP RW contract" | draft-system.md design-only | PASS |
| "proposed vs applied" | Consistent in draft-system.md | PASS |
| "entry point provider/region unresolved" | commitments.astro corrected | PASS |
| Canonical domain `zen-mesh.io` | Used consistently | PASS |
| No `zen.io/*` | No positive usage | PASS |
| No `zen/*` | No positive usage | PASS |

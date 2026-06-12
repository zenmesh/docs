---
sidebar_label: IA Audit Report
---

# Information Architecture Audit — DOCSAI021

> Created by: DocsAI021
> Scope: docs.zen-mesh.io + zen-mesh.io

## Inventory

### Deliverables Created

| Artifact | Status | Path |
|----------|--------|------|
| Docs Map for Reviewers | Present | `docs/review/docs-map-for-reviewers.md` |
| Public Reader Journey | Present | `docs/review/public-reader-journey.md` |
| Editorial Checklist | Present | `docs/review/editorial-checklist.md` |
| DocsAI001 Findings | Present | `docs/review/docsai-findings-001.md` |
| Pricing Decision Packet | Present | `docs/review/docsai021_pricing_decision_packet.md` |
| Legal Readiness Packet | Present | `docs/review/docsai021_legal_full_text_readiness_packet.md` |

### IA Issues Found

1. **Legal sidebar dangling references** — Legal category in sidebar referenced pages (`legal/terms-of-service`, etc.) that don't exist on main branch. Fix: Removed Legal sidebar section; will re-add when legal pages are merged.

2. **Pricing tier naming mismatch** — Site uses "Preview/Team", docs use "Free/Pro". Fix: Decision packet prepared for Leonardo.

3. **No support email on public site** — `support@zen-mesh.io` exists in docs support page but not on the public site. Gap: should add to site footer or contact page.

4. **Stale language** — `delete-channel.api.mdx` contains encoded binary content that triggers false-positive TODO matches. Not a real issue.

5. **Helm chart repo name `zen/`** — how-it-works.astro line 204 uses `helm install zen-agent zen/zen-agent`. This is a Helm chart repository reference, not a `zen/*` namespace claim. Documented as false positive.

6. **No site pricing terms in docs** — The site pricing page uses different tier names than docs. Decision needed from Leonardo.

## Navigation Consistency

- Site-to-docs links: 61 (all use `docs.zen-mesh.io`)
- Docs sidebar categories: Start Here, Contracts, Channels, MCP, Reference, Review
- Legal category removed (pages not on main)
- Review category added with DOCSAI021 deliverables

## Metadata and Titles

- All review pages have `sidebar_label` frontmatter
- Consistent title casing
- No duplicate pages found

## Site-to-Docs Navigation

Public site pages with docs links:
- `/try` → links to docs/ai/overview
- `/how-it-works` → links to various docs pages
- `/security` → links to docs security pages
- `/pricing` → no docs links (should link to getting-started/upgrade when pricing is decided)

---
sidebar_label: Public Surface Update Policy
---

# Public Surface Update Policy

This policy governs when website, public docs, and AI-discovery surfaces
(`llms.txt`, `static/llms.txt`, `static/ai/*.json`, `docs/ai/*.md`) may
be updated.

## Core Rule

**Website/public/AI-discovery updates are not automatic.**

Do not update `zen-mesh.io` after every internal docs task.
Do not update `llms.txt` or `static/llms.txt` after every internal docs task.
Do not update `docs/ai/*.md` AI surfaces after every internal docs task.

## When Public/AI-Discovery Updates Are Required

A public or AI-discovery surface update is required when one of the following
occurs:

1. **New public launch status** — e.g., `cloud_gated` → `live_validated` for
   a provider, or `NO_GO` → anything in public launch status.
2. **New evidence-backed security status** — e.g., a security control moves
   from `not_claimed` to `verified` with full evidence.
3. **New evidence-backed provider/live validation status** — e.g., all four
   providers pass post-cloud validation and evidence is captured.
4. **Pricing, support, or legal change** — e.g., new plan tier, new SLA,
   updated privacy notice.
5. **Correction of a public overclaim** — e.g., a false or misleading claim
   is discovered and must be retracted or revised.
6. **Explicit Leonardo instruction** — Leonardo authorizes a specific update.

## When Public/AI-Discovery Updates Are NOT Required

Internal docs consolidation does NOT require a public or AI-discovery surface
update. Activities that stay internal:

- Creating or updating runbooks, evidence templates, or checklists
- Adding or updating canonical maps, consolidation logs, or policy docs
- Adding or updating providerflow internal documentation
- Adding or updating evidence artifacts under `docs/80-EVIDENCE/`
- Adding or updating operational procedures under `docs/runbooks/`
- Any change that does not alter the public-facing launch, security, or
  provider validation status

## Status Anchors

- **Public launch remains NO-GO** until the final launch artifact is created
  and approved.
- **Provider `verified` does not equal live E2E complete.**
- **GA / `live_validated` requires post-cloud evidence** captured in
  `docs/80-EVIDENCE/` and reviewed by Leonardo.
- **ProviderFlow canon remains `docs/providerflow/`.** No ecosystem narrative
  page is created in `docs/ai/` or anywhere outside `docs/providerflow/`.

## Enforcement

- All DocsAI tasks default to internal-only consolidation unless Leonardo
  explicitly authorizes a public surface change.
- When in doubt, do not update the public surface. Ask Leonardo.
- The V1 Live Truth Matrix is the canonical source for distinguishing what
  is public and what is internal.
- Provider `verified` maturity (package-level GA labels) does not trigger
  public surface updates. Only a change in the truth matrix row for a
  provider's `live_e2e_status` or `public_launch_status` triggers a surface
  update.

## Related

- [Canonical Docs Map](../README_CANONICAL_DOCS_MAP)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Post-Cloud Publication Plan](../launch/post-cloud-publication-plan)
- [Docs Consolidation Log](../DOCS_CONSOLIDATION_LOG)

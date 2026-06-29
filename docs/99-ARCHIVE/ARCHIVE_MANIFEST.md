---
sidebar_label: Archive Manifest
unlisted: true
---

# Archive Manifest

**Archive date:** 2026-06-29
**Task ID:** DOCSAI_R15_DOCS_ENTROPY_REDUCTION_ARCHIVE_DUPLICATES_AND_REMOVE_USELESS_DOCS

## Archive Policy

- **Archive over deletion** for draft templates and superseded docs that document historical decisions.
- **Deletion** for backup/scratch files that have zero evidence value and zero inbound references.

## Moved Files

| # | Original Path | New Path | Classification | Reason | Canonical Replacement | Inbound Refs Updated | Evidence Retained |
|---|---|---|---|---|---|---|---|
| 1 | `docs/mcp/authentication.md` | `docs/99-ARCHIVE/superseded/mcp-authentication.md` | superseded | Superseded by `docs/mcp/authentication-and-mtls.md` which contains all content plus mTLS | `docs/mcp/authentication-and-mtls.md` | Yes (sidebar removed) | No — content fully duplicated |
| 2 | `docs/legal/aup.md` | `docs/99-ARCHIVE/placeholder/legal/aup.md` | placeholder | Draft template, not effective, no legal review | None — canonical map updated to "Archived" | No (no active inbound refs) | Yes — draft existence preserved |
| 3 | `docs/legal/billing-terms.md` | `docs/99-ARCHIVE/placeholder/legal/billing-terms.md` | placeholder | Draft template, not effective, no legal review | None — canonical map updated to "Archived" | No | Yes |
| 4 | `docs/legal/breach-notice.md` | `docs/99-ARCHIVE/placeholder/legal/breach-notice.md` | placeholder | Draft template | None | No | Yes |
| 5 | `docs/legal/cookie-disclosure.md` | `docs/99-ARCHIVE/placeholder/legal/cookie-disclosure.md` | placeholder | Draft template | None | No | Yes |
| 6 | `docs/legal/design-partner-terms.md` | `docs/99-ARCHIVE/placeholder/legal/design-partner-terms.md` | placeholder | Draft template | None | No | Yes |
| 7 | `docs/legal/dpa.md` | `docs/99-ARCHIVE/placeholder/legal/dpa.md` | placeholder | Draft template | None | No | Yes |
| 8 | `docs/legal/privacy.md` | `docs/99-ARCHIVE/placeholder/legal/privacy.md` | placeholder | Draft template | None | No | Yes |
| 9 | `docs/legal/responsible-disclosure.md` | `docs/99-ARCHIVE/placeholder/legal/responsible-disclosure.md` | placeholder | Draft template | None | No | Yes |
| 10 | `docs/legal/retention-lifecycle.md` | `docs/99-ARCHIVE/placeholder/legal/retention-lifecycle.md` | placeholder | Draft template | None | No | Yes |
| 11 | `docs/legal/scc-transfer.md` | `docs/99-ARCHIVE/placeholder/legal/scc-transfer.md` | placeholder | Draft template | None | No | Yes |
| 12 | `docs/legal/subprocessors.md` | `docs/99-ARCHIVE/placeholder/legal/subprocessors.md` | placeholder | Draft template | None | No | Yes |
| 13 | `docs/legal/terms.md` | `docs/99-ARCHIVE/placeholder/legal/terms.md` | placeholder | Draft template | None | No | Yes |

## Deleted Files

| # | Path | Reason | Evidence Value | Inbound Refs |
|---|---|---|---|---|
| 1 | `docs/api/_reference_placeholder.md.bak` | Backup/scratch file, `.bak` extension, no ongoing use | None | Zero inbound refs |

## Retained-but-Classified

The following candidates were evaluated and **retained** as canonical active docs or active evidence:

| Path | Classification | Reason |
|---|---|---|
| `docs/architecture/api-docs-hosting-options.md` | keep_no_action | Real ADR with recommendations, not purely speculative |
| `docs/ai/evidence-v1-supersession.md` | keep_no_action | Heavily cross-referenced anchor target across docs tree |
| `docs/api/changelog.md` | keep_no_action | Has real changelog content, in sidebar |
| `docs/evidence/docs-experience-audit.md` | keep_no_action | Historical evidence |
| `docs/evidence/public-docs-claim-audit.{json,md}` | keep_no_action | Historical audit evidence |
| `docs/80-EVIDENCE/docsai029/*` | keep_no_action | DOCSAI029 evidence artifacts |
| `docs/zen-lock.md` | keep_no_action | Cross-referenced concept doc, in llms.txt and _redirects |
| `docs/ai/public-surface-traceability.md` | keep_no_action | Active public AI surface |
| `docs/ai/public-terminology-taxonomy.md` | keep_no_action | Active public AI surface |

## Known Stale References (Not Updated Per Public Surface Freeze)

- `docs/llms.txt` lines 118–123: references to archived legal pages (`legal/privacy`, `legal/aup`, `legal/dpa`, `legal/cookie-disclosure`, `legal/breach-notice`, `legal/billing-terms`). Not updated per public surface freeze policy. These links will resolve to 404 after archive.
- `docs/_redirects`: `/legal/* /docs/legal/* 301!` — redirect still active; destination will 404. Not updated per public surface freeze policy.

## Evidence Retention Notes

- Legal draft existence is preserved in `docs/80-EVIDENCE/docsai029/legal_draft_package_completeness.json` and this manifest.
- All archived legal docs retain their original content with an archive header added.
- No evidence was destroyed by this archive pass.

---
sidebar_label: Docs Consolidation Log
---

# Docs Consolidation Log

Inventory and classification of duplicate, stale, conflicting, archive-candidate,
archived, and deleted docs. Active classification for future cleanup + record of
completed archive actions.

## Duplicate Entries

| Path | Topic | Classification | Action | Reason |
|------|-------|---------------|--------|--------|
| `docs/delivery/replay.md` | Event replay | Stale duplicate | Archive later | Superseded by `docs/delivery/replay-and-recovery.md` |
| `docs/delivery/deduplication-vs-idempotency.md` | Dedup vs idempotency | Stale duplicate | Merge later | Content split into `docs/delivery/deduplication.md` and `docs/delivery/idempotency.md` |
| `docs/delivery/replay-vs-retry.md` | Replay vs retry | Stale duplicate | Merge later | Content covered by `replay-and-recovery.md` and `webhook-reliability.md` |
| `docs/delivery/routing-and-fan-out.md` | Routing and fan-out | Stale duplicate | Merge later | Content covered by `event-routing.md` and `fan-out.md` |
| `docs/mcp/authentication.md` | MCP authentication | Stale duplicate | ✅ Archived (R15) | Superseded by `docs/mcp/authentication-and-mtls.md` |
| `docs/reference/api.md` | API reference | Stale | Archive later | Superseded by `docs/api/*` directory |
| `docs/reference/mcp.md` | MCP reference | Stale | Archive later | Superseded by `docs/mcp/*` directory |
| `docs/api/_reference_placeholder.md.bak` | Backup/placeholder | Dead file | ✅ Deleted (R15) | Not referenced, `.bak` extension, no content value |
| `docs/providerflow/template-packs.md~` | Template packs swap | Dead file | Remove | Swap/backup file from editor |
| `docs/ai/overview.md` | AI overview | Partial overlap | No action | Contains non-duplicated content (evidence links, scope) |
| `docs/legal/aup.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/billing-terms.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/breach-notice.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/cookie-disclosure.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/design-partner-terms.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/dpa.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/privacy.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/responsible-disclosure.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/retention-lifecycle.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/scc-transfer.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/subprocessors.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |
| `docs/legal/terms.md` | Legal draft | Placeholder | ✅ Archived (R15) | Draft template, not effective, no legal review |

## Stale Docs

| Path | Topic | Classification | Action | Reason |
|------|-------|---------------|--------|--------|
| `docs/80-EVIDENCE/docsai122/REPORT.md` | DocsAI R122 | Historical | Leave as evidence | Audit artifact, not navigation doc |
| `docs/80-EVIDENCE/docsai029/*` | DocsAI R029 | Historical | Leave as evidence | Audit artifacts |
| `docs/80-EVIDENCE/docsai/r2-audit/provider_package_v1_gap_audit.*` | Provider gap audit R2 | Historical | Leave as evidence | Superseded by readiness matrix, but evidence artifact |
| `docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/*` | 2FA security contract | Historical | Leave as evidence | Evidence artifact |
| `docs/80-EVIDENCE/public-docs/docs_ai_subtree_global_404_repair_r2.md` | 404 repair R2 | Historical | Leave as evidence | Evidence of route repair |

## Conflicting Docs

No active conflicts found. The truth matrix is the canonical source for launch
status. The providerflow index is the canonical source for provider lifecycle.
The public surface update policy (created in R13) governs when AI-discovery
surfaces are updated.

## Archive Candidates (not deleted)

| Path | Topic | Action | Reason |
|------|-------|--------|--------|
| `docs/delivery/replay.md` | Replay | Archive later | Content merged into replay-and-recovery.md |
| `docs/delivery/deduplication-vs-idempotency.md` | Dedup vs idempotency | Archive later | Content split into separate files |
| `docs/delivery/replay-vs-retry.md` | Replay vs retry | Archive later | Content merged into other files |
| `docs/delivery/routing-and-fan-out.md` | Routing and fan-out | Archive later | Content merged into other files |
| `docs/reference/api.md` | API reference | Archive later | Content migrated to docs/api/ |
| `docs/reference/mcp.md` | MCP reference | Archive later | Content migrated to docs/mcp/ |
| `docs/mcp/authentication.md` | MCP auth | ✅ Archived (R15) | Content merged into authentication-and-mtls.md |
| `docs/legal/*.md` (12 files) | Legal draft templates | ✅ Archived (R15) | Draft templates, not effective, no legal review |
| `docs/api/_reference_placeholder.md.bak` | Backup file | ✅ Deleted (R15) | Not referenced, `.bak` extension |

## Docs That Should Not Be Public / AI-Discoverable

| Path | Topic | Reason |
|------|-------|--------|
| `docs/providerflow/packages/doppler-internal.md` | Doppler package | Internal/community preview |
| `docs/providerflow/packages/gitlab-internal.md` | GitLab package | Internal/community preview |
| `docs/providerflow/packages/terraform-cloud-internal.md` | Terraform Cloud package | Internal/community preview |
| `docs/runbooks/doppler-real-webhook.md` | Doppler runbook | Internal only |
| `docs/runbooks/gitlab-real-webhook.md` | GitLab runbook | Internal only |
| `docs/runbooks/terraform-cloud-real-webhook.md` | TFC runbook | Internal only |
| `docs/80-EVIDENCE/*` | All evidence artifacts | Internal audit evidence |

These files exist in the repo but are not linked from public navigation or
AI-discovery surfaces (`llms.txt` / `static/llms.txt`). They are discoverable
by direct URL access. Classification: leave as-is — they are intentionally
part of the repo but not promoted.

## R14 Consolidation Groups

### Group 1: V1 Live Readiness / Truth / Evidence

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/launch/v1-live-truth-matrix.md` | Canonical | Keep canonical |
| `docs/launch/v1-live-evidence-index.md` | Canonical | Keep canonical |
| `docs/launch/post-cloud-publication-plan.md` | Canonical | Keep canonical |
| `static/ai/v1/v1-live-truth-matrix.json` | Canonical | Keep canonical |
| `static/ai/v1/provider-live-validation-plan.json` | Canonical | Keep canonical |
| `docs/start-here/launch-status.md` | Canonical | Keep canonical |
| `docs/start-here/current-status.md` | Canonical (start-here) | Keep canonical |
| `docs/providerflow/post-cloud-provider-validation-overview.md` | Canonical | Keep canonical |

### Group 2: Providerflow Lifecycle and Post-Cloud Validation

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/providerflow/README.md` | Canonical index | Keep canonical |
| `docs/providerflow/overview.md` | Canonical | Keep canonical |
| `docs/providerflow/package-contract.md` | Canonical | Keep canonical |
| `docs/providerflow/yaml-dag-contract.md` | Canonical | Keep canonical |
| `docs/providerflow/package-validation.md` | Canonical | Keep canonical |
| `docs/providerflow/security-model.md` | Canonical | Keep canonical |
| `docs/providerflow/fixtures-goldens-traces.md` | Canonical | Keep canonical |
| `docs/providerflow/provider-package-lifecycle.md` | Canonical | Keep canonical |
| `docs/providerflow/provider-package-v1-readiness-matrix.md` | Canonical | Keep canonical |
| `docs/providerflow/nonclaims.md` | Canonical | Keep canonical |
| `docs/providerflow/template-packs.md` | Canonical | Keep canonical |
| `docs/providerflow/packages/stripe-v2.md` | Canonical | Keep canonical |
| `docs/providerflow/packages/github-v2.md` | Canonical | Keep canonical |
| `docs/providerflow/packages/shopify-v2.md` | Canonical | Keep canonical |
| `docs/providerflow/packages/twilio-v2.md` | Canonical | Keep canonical |
| `docs/providerflow/stripe-post-cloud-validation-runbook.md` | Canonical | Keep canonical |
| `docs/providerflow/github-post-cloud-validation-runbook.md` | Canonical | Keep canonical |
| `docs/providerflow/shopify-post-cloud-validation-runbook.md` | Canonical | Keep canonical |
| `docs/providerflow/twilio-post-cloud-validation-runbook.md` | Canonical | Keep canonical |
| `docs/providerflow/provider-test-account-checklist.md` | Canonical | Keep canonical |
| `docs/providerflow/evidence-templates/*.md` | Canonical | Keep canonical |
| `docs/providerflow/evidence-templates/provider-live-validation-evidence.schema.json` | Canonical | Keep canonical |
| `docs/guides/stripe.md`, `github.md`, `shopify.md`, `twilio.md` | Integration guides | Keep canonical |

### Group 3: Fabric Adapters / Fabric Planes

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/architecture/three-plane-model.md` | Canonical | Keep canonical |
| `docs/architecture/platform-layers.md` | Canonical | Keep canonical |
| `docs/architecture/delivery-modes.md` | Canonical | Keep canonical |
| `docs/architecture/security-model.md` | Canonical | Keep canonical |
| `docs/guides/adapters.md` | Canonical | Keep canonical |

Fabric Planes and Adapters are tracked in the truth matrix. No dedicated
Fabric docs page exists beyond architecture/ and guides/adapters.md. No
duplicate or stale Fabric docs identified.

### Group 4: Billing / Stripe / Entitlements

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/legal/billing-terms.md` | Draft template | ✅ Archived (R15) |
| `docs/start-here/plans-and-limits.md` | Canonical | Keep canonical |
| `docs/start-here/launch-status.md` | Canonical | Keep canonical |
| `docs/guides/stripe.md` | Integration guide | Keep canonical |

Stripe billing is `cloud_gated` in the truth matrix. The billing-terms draft
was archived in R15 — only the active plans-and-limits and launch-status docs
remain as billing surfaces.

### Group 5: Security and Public Trust

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/security/*.md` (16 files) | Canonical | Keep canonical |
| `docs/ai/security-posture.md` | Canonical | Keep canonical |
| `docs/ai/v1-security-validation-summary.md` | Canonical | Keep canonical |
| `docs/ai/non-claims.md` | Canonical | Keep canonical |
| `docs/ai/public-surface-traceability.md` | Canonical | Keep canonical |
| `docs/ai/public-terminology-taxonomy.md` | Canonical | Keep canonical |
| `docs/evidence/non-claims.md` | Canonical | Keep canonical |
| `static/ai/security/v1/*.json` | Canonical JSON | Keep canonical |
| `docs/ai/overview.md` | Partial overlap | No action |
| `docs/evidence/completion-evidence.md` | Evidence | Leave as evidence |
| `docs/evidence/runtime-convergence.md` | Evidence | Leave as evidence |
| `docs/evidence/trust-lifecycle.md` | Evidence | Leave as evidence |
| `docs/evidence/validation-map.md` | Evidence | Leave as evidence |
| `docs/evidence/merkle-integrity.md` | Evidence | Leave as evidence |
| `docs/evidence/docs-experience-audit.md` | Evidence | Leave as evidence |

### Group 6: Hooks-Only Guardrails and Report Contracts

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/20-OPERATIONS/PUBLIC_SURFACE_UPDATE_POLICY.md` | Canonical | Keep canonical |
| `docs/README_CANONICAL_DOCS_MAP.md` | Canonical | Keep canonical |
| `docs/DOCS_CONSOLIDATION_LOG.md` | Canonical | Keep canonical |

Hooks-only validation policy lives in `zen-platform` repo (not docs).
Fixed report paths policy is documented in the canonical docs map.

### Group 7: Backup / Restore / Rollback

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/operations/backups.md` | Canonical (`cloud_gated`) | Keep canonical |
| `docs/runbooks/rollback-and-abort.md` | Canonical | Keep canonical |
| `docs/runbooks/prod-republish.md` | Canonical | Keep canonical |
| `docs/operations/upgrades.md` | Canonical | Keep canonical |

No duplicate backup/restore/rollback docs identified. The truth matrix tracks
backup status as `cloud_gated`.

### Group 8: Public/AI-Discovery Surfaces

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/llms.txt` | AI-discovery | Update only with material public change |
| `static/llms.txt` | Crawler-facing | Update only with material public change |
| `docs/ai/*.md` | AI-facing | Update only with material public change |
| `static/ai/*.json` | Machine-readable | Update only with material public change |
| `static/robots.txt` | Crawler config | Keep as-is |
| `docs/index.md` | Docs landing | Keep as-is |

The public surface update policy governs all changes to these surfaces.

### Group 9: Evidence / Archive

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/80-EVIDENCE/*` | Evidence artifacts | Leave as evidence |
| `docs/evidence/*.md` | Evidence docs | Leave as evidence |
| `docs/evidence/evidence-index.md` | Evidence index | ✅ Created in R14 (moved from 80-EVIDENCE/ in R15) |

See the [Evidence Index](/docs/evidence/evidence-index) for detailed evidence
classification by area and maturity.

## R15 Consolidation Groups

### Group 10: Superseded MCP Auth Doc

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/mcp/authentication.md` | Superseded | ✅ Archived to `docs/99-ARCHIVE/superseded/mcp-authentication.md` |
| `sidebars.ts` | Sidebar | Updated: removed `mcp/authentication` entry |

### Group 11: Placeholder Legal Drafts

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/legal/*.md` (12 files) | Draft templates | ✅ Archived to `docs/99-ARCHIVE/placeholder/legal/` |
| Canonical map | Reference | Updated: billing-terms status changed to "Archived" |
| Evidence index | Reference | Updated: legal entries changed to "Archived" |

All 12 legal docs were created in the same commit (DOCSAI029) and are
DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED. They have zero effective
legal content. Draft existence is preserved in the archive and in the
DOCSAI029 evidence artifacts.

### Group 12: Backup File Deletion

| File | Classification | Action |
|------|---------------|--------|
| `docs/api/_reference_placeholder.md.bak` | Dead file | ✅ Deleted (git rm) |

Not referenced by any active doc, no evidence value.

### Group 13: Archive Infrastructure

| Doc | Classification | Action |
|-----|---------------|--------|
| `docs/99-ARCHIVE/ARCHIVE_MANIFEST.md` | Archive index | ✅ Created in R15 |
| `docs/99-ARCHIVE/superseded/` | Archive subdir | ✅ Created |
| `docs/99-ARCHIVE/placeholder/legal/` | Archive subdir | ✅ Created |

### Group 14: Active Docs Retained (Evaluated, No Action)

| Doc | Rationale |
|-----|-----------|
| `docs/architecture/api-docs-hosting-options.md` | Real ADR with recommendations, not speculative (115 lines) |
| `docs/api/changelog.md` | Has real content (567 bytes), not empty |
| `docs/zen-lock.md` | Cross-referenced concept doc, in llms.txt |
| `docs/ai/evidence-v1-supersession.md` | Heavily cross-referenced anchor target |
| `docs/evidence/docs-experience-audit.md` | Historical evidence |
| `docs/evidence/public-docs-claim-audit.{json,md}` | Historical audit evidence |

## Docs Needing Future Consolidation

| Topic | When | Path |
|-------|------|------|
| Delivery replay docs | After V1 | Merge replay.md, replay-vs-retry.md, replay-and-recovery.md |
| Delivery dedup docs | After V1 | Merge deduplication.md, deduplication-vs-idempotency.md, idempotency.md |
| MCP auth docs | ✅ Done (R15) | authentication.md archived, authentication-and-mtls.md kept |
| Provider integration guides | After V1 | Consolidate providerflow/packages/ with guides/ |
| Evidence artifacts | When superseded | Relocate from docs/80-EVIDENCE/docsai* to archive |
| Reference dir cleanup | After V1 | Archive reference/api.md and reference/mcp.md |

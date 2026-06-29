---
sidebar_label: Evidence Index
---

# Evidence Navigation Index

Classification of all evidence artifacts in `docs/80-EVIDENCE/` by area,
maturity, and publication status.

## Evidence Families

### 1. V1 Security Validation

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Security Capability Validation JSON | `static/ai/security/v1/security-capability-validation.json` | Active | Public-safe | DocsAI |
| V1 Security Validation Summary | `static/ai/security/v1/v1-security-validation-summary.json` | Active | Public-safe | DocsAI |
| Attack Model | `static/ai/security/v1/attack-model.json` | Active | Public-safe | Security |
| Local Trust Posture | `static/ai/security/v1/local-trust-posture.json` | Active | Public-safe | Security |
| Claim Maturity | `static/ai/security/v1/claim-maturity.json` | Active | Public-safe | Security |
| Credential Lifecycle Ownership | `static/ai/security/v1/credential-lifecycle-ownership.json` | Active | Public-safe | Security |
| Gaps | `static/ai/security/v1/gaps.json` | Active | Public-safe | Security |
| Primitives | `static/ai/security/v1/primitives.json` | Active | Public-safe | Security |
| README | `static/ai/security/v1/README.md` | Active | Public-safe | DocsAI |
| 2FA V1 Security Contract Alignment | `docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/*` | Historical | Evidence-only | DocsAI |

### 2. Public Docs / Non-Claim Validation

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Public Docs Claim Audit | `docs/evidence/public-docs-claim-audit.{json,md}` | Active | Evidence-only | DocsAI |
| Public Non-Claims Revalidation R5 | `docs/80-EVIDENCE/public-docs/public_non_claims_revalidation_r5.{json,md}` | Active | Evidence-only | DocsAI |
| Vercel Build ZenLock R7 | `docs/80-EVIDENCE/public-docs/docs_vercel_build_zenlock_r7.{json,md}` | Active | Evidence-only | DocsAI |
| AI Subtree 404 Repair R2 | `docs/80-EVIDENCE/public-docs/docs_ai_subtree_global_404_repair_r2.md` | Historical | Evidence-only | DocsAI |
| Route Prefix Redirects R3 | `docs/80-EVIDENCE/public-docs/docs_route_prefix_redirects_r3.md` | Historical | Evidence-only | DocsAI |

### 3. Fabric Adapters Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Platform Layer Matrix | `zen-platform docs/80-EVIDENCE/architecture/platform_layer_matrix.json` | Active | Internal-only | Architecture |
| Fabric Adapters Route Guard | `zen-platform src/.../AdaptersRouteGuard.tsx` | Active | Internal-only | Hermes |
| Adapters Guide | `docs/guides/adapters.md` | Active | Public-safe | Docs |

Fabric Adapter runtime evidence lives in `zen-platform`. Documentation is in
`docs/architecture/` and `docs/guides/`. No Fabric-specific evidence exists
in `docs/80-EVIDENCE/`.

### 4. Fabric Planes Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Three-Plane Model | `docs/architecture/three-plane-model.md` | Active | Public-safe | Architecture |
| Platform Layers | `docs/architecture/platform-layers.md` | Active | Public-safe | Architecture |
| Delivery Modes | `docs/architecture/delivery-modes.md` | Active | Public-safe | Architecture |

Runtime Fabric Planes evidence lives in `zen-platform`. No Fabric Planes
specific evidence exists in `docs/80-EVIDENCE/`.

### 5. Provider Registry Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Provider Package V1 Gap Audit R2 | `docs/80-EVIDENCE/docsai/r2-audit/provider_package_v1_gap_audit.{json,md}` | Historical | Evidence-only | DocsAI |
| Provider Package Lifecycle | `docs/providerflow/provider-package-lifecycle.md` | Active | Public-safe | Docs |
| V1 Provider Package Readiness Matrix | `docs/providerflow/provider-package-v1-readiness-matrix.md` | Active | Public-safe | Docs |
| Provider Validation Evidence Schema | `docs/providerflow/evidence-templates/provider-live-validation-evidence.schema.json` | Active | Public-safe | DocsAI |

Provider Registry GA is not claimed. The gap audit is superseded by the
readiness matrix but kept as evidence.

### 6. Providerflow Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| ProviderFlow Package Docs | `docs/providerflow/packages/*.md` | Active | Public-safe | Docs |
| ProviderFlow Validation Evidence Templates | `docs/providerflow/evidence-templates/*.md` | Active | Internal-only | DocsAI |
| Provider Post-Cloud Validation Plan JSON | `static/ai/v1/provider-live-validation-plan.json` | Active | Public-safe | DocsAI |

Post-cloud validation evidence templates are internal until live validation
runs. The validation plan JSON is public with NO-GO disclaimer.

### 7. Billing / Quota Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Billing Terms | `docs/99-ARCHIVE/placeholder/legal/billing-terms.md` | Archived (R15) | Archived (draft template) | Legal |
| Plans and Limits | `docs/start-here/plans-and-limits.md` | Active | Public-safe | Product |
| Launch Status | `docs/start-here/launch-status.md` | Active | Public-safe | Product |

Billing evidence (Stripe subscription validation) is pending post-cloud
deploy. Current status: `cloud_gated`.

### 8. Cloud Cutover / Preflight Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Backups | `docs/operations/backups.md` | Active | Public-safe | Operations |
| Gateway API Migration Readiness | `static/ai/networking/v1/gateway-api-migration-readiness.json` | Active | Public-safe | Operations |

Cloud cutover proof is pending production deploy. Status tracked in truth
matrix (`cloud_gated`).

### 9. Backup / Restore Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Backups | `docs/operations/backups.md` | Active | Public-safe | Operations |
| Rollback and Abort Runbook | `docs/runbooks/rollback-and-abort.md` | Active | Public-safe | Operations |
| Prod Republish Runbook | `docs/runbooks/prod-republish.md` | Active | Public-safe | Operations |
| Vercel Build ZenLock R7 | `docs/80-EVIDENCE/public-docs/docs_vercel_build_zenlock_r7.{json,md}` | Active | Evidence-only | DocsAI |

### 10. Hooks / Report Contract Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Report contract guardrails | `zen-platform` (hooks-only validation) | Active | Internal-only | GLM |
| Fixed report paths policy | `docs/README_CANONICAL_DOCS_MAP.md` | Active | Public-safe | DocsAI |

### 11. Website / Public-Surface Proof

| Artifact | Path | Maturity | Publication | Owner |
|----------|------|----------|-------------|-------|
| Public Surface Traceability | `docs/ai/public-surface-traceability.md` | Active | Public-safe | DocsAI |
| Discovery Crawler Smoke | `static/ai/discovery-crawler-smoke-v1.json` | Active | Public-safe | DocsAI |
| AI Discovery Registry | `docs/ai/ai-discovery-registry.json`, `static/ai/ai-discovery-registry.json` | Active | Public-safe | DocsAI |

## Evidence Maturity Legend

| Status | Meaning |
|--------|---------|
| **Active** | Current evidence, referenced by active docs |
| **Historical** | Superseded by newer evidence but preserved for audit trail |
| **Pending** | Not yet collected (requires post-cloud validation) |
| **Missing** | No evidence exists (noted as gap) |

## Publication Status Legend

| Status | Meaning |
|--------|---------|
| **Public-safe** | May be published/referenced in public or AI surfaces |
| **Internal-only** | Not for public/AI discovery; in repo but not promoted |
| **Evidence-only** | In `docs/80-EVIDENCE/` — audit artifact, not a navigation doc |
| **Do-not-publish** | Must not appear in public surfaces |

## Untracked Evidence Files

The following files exist in the worktree but are not tracked by git:

| File | Why Untracked | Classification |
|------|---------------|---------------|
| `docs/80-EVIDENCE/public-docs/docs_vercel_build_zenlock_r7.{json,md}` | Generated during ZenLock R7 audit | Evidence-only, not a navigation doc |
| `docs/80-EVIDENCE/public-docs/public_non_claims_revalidation_r5.{json,md}` | Generated during public non-claims R5 revalidation | Evidence-only, not a navigation doc |
| `scripts/validation/docs_route_integrity_check_original.py` | Backup of validation script before modification | Evidence-only, not source code |

These files are intentionally untracked. They are evidence artifacts from
prior validation runs. If they need to be preserved permanently, they should
be kept as-is or the backup script should be removed. S114 does not apply
(source scripts are covered by repo-level exclude rules; evidence JSON/MD
files are not navigation docs and do not need to be published).

## Related

- [Canonical Docs Map](../README_CANONICAL_DOCS_MAP)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Docs Consolidation Log](../DOCS_CONSOLIDATION_LOG)
- `docs/99-ARCHIVE/ARCHIVE_MANIFEST` — Archive record of R15 actions
- [Public Surface Update Policy](../20-OPERATIONS/PUBLIC_SURFACE_UPDATE_POLICY.md)

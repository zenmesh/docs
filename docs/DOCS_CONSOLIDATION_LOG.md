---
sidebar_label: Docs Consolidation Log
---

# Docs Consolidation Log

Inventory and classification of duplicate, stale, conflicting, and archive-candidate
docs. This log does not delete files — it tracks classification for future cleanup.

## Duplicate Entries

| Path | Topic | Classification | Action | Reason |
|------|-------|---------------|--------|--------|
| `docs/delivery/replay.md` | Event replay | Stale duplicate | Archive later | Superseded by `docs/delivery/replay-and-recovery.md` |
| `docs/delivery/deduplication-vs-idempotency.md` | Dedup vs idempotency | Stale duplicate | Merge later | Content split into `docs/delivery/deduplication.md` and `docs/delivery/idempotency.md` |
| `docs/delivery/replay-vs-retry.md` | Replay vs retry | Stale duplicate | Merge later | Content covered by `replay-and-recovery.md` and `webhook-reliability.md` |
| `docs/delivery/routing-and-fan-out.md` | Routing and fan-out | Stale duplicate | Merge later | Content covered by `event-routing.md` and `fan-out.md` |
| `docs/mcp/authentication.md` | MCP authentication | Stale duplicate | Remove link only | Superseded by `docs/mcp/authentication-and-mtls.md` |
| `docs/reference/api.md` | API reference | Stale | Archive later | Superseded by `docs/api/*` directory |
| `docs/reference/mcp.md` | MCP reference | Stale | Archive later | Superseded by `docs/mcp/*` directory |
| `docs/api/_reference_placeholder.md.bak` | Backup/placeholder | Dead file | Remove | Not referenced, `.bak` extension, no content value |
| `docs/providerflow/template-packs.md~` | Template packs swap | Dead file | Remove | Swap/backup file from editor |
| `docs/ai/overview.md` | AI overview | Partial overlap | No action | Contains non-duplicated content (evidence links, scope) |

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
| `docs/mcp/authentication.md` | MCP auth | Archive later | Content merged into authentication-and-mtls.md |

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

## Docs Needing Future Consolidation

| Topic | When | Path |
|-------|------|------|
| Delivery replay docs | After V1 | Merge replay.md, replay-vs-retry.md, replay-and-recovery.md |
| Delivery dedup docs | After V1 | Merge deduplication.md, deduplication-vs-idempotency.md, idempotency.md |
| MCP auth docs | After V1 | Remove authentication.md, keep authentication-and-mtls.md |
| Provider integration guides | After V1 | Consolidate providerflow/packages/ with guides/ |
| Evidence artifacts | When superseded | Relocate from docs/80-EVIDENCE/docsai* to archive |

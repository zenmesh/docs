# DOCSAI023 Findings

> **Task ID:** DOCSAI023 — Max V1 Non-Runtime Backlog Burn-Down
> **Date:** 2026-06-12

## Fixed Issues (3 content fixes)

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | docs/guides/destinations.md:41 | "within SLA" (forbidden term) | Changed to "within target response time" |
| 2 | site/pages/commitments.astro:53 | "ensures data residency" (forward claim) | Changed to "provider-selected infrastructure, close to your endpoints" |
| 3 | docs/ai/edge-lite.md:30 | "AWS us-east-1, shared, free" (specific provider claim) | Changed to "hypothetical: shared provider region, free tier" |

## Claim Freeze Scan: PASS

All forbidden claims scanned. 3 issues found and fixed. 0 remaining.

## Remaining Editorial Risks (7)

| # | Risk | Severity | Resolution |
|---|------|----------|------------|
| ER-01 | "Preview" tier references (2 instances) | Low | LD-001 tier alignment — defer or replace with Free/Pro |
| ER-02 | "Team" tier references (2 instances) | Low | LD-001 tier alignment — defer or replace with Pro/Business |
| ER-03 | billing_overage search-intent heading missing | Low | Add heading to pricing/billing docs when billing is documented |
| ER-04 | launch-status.md evidence stats could use qualifier | Low | LD-003 — add "at time of review" qualifier |
| ER-05 | Blog nav link in footer points to empty blog | Low | LD-002 — remove blog from footer or add content |
| ER-06 | Edge Lite page could benefit from "Design Partner" header | Low | LD-001 — add unlisted:true or clearer header |
| ER-07 | Some pages lack canonical domain link in footer | Info | Add zen-mesh.io links where missing |

## Remaining Launch-Blocker Docs Items (4)

| # | Blocker | Owner | Resolution |
|---|---------|-------|------------|
| LB-01 | Legal pages all draft/non-effective | Legal (LD-004, LD-010) | Qualified legal review required |
| LB-02 | Data plane provider/region unresolved (LD-016) | Leonardo | Keep all residency claims deferred |
| LB-03 | Billing system not operational | Hermes runtime | All billing docs remain pre-billing |
| LB-04 | Plan limits not defined (LD-006) | Leonardo | Use TBD until defined |

## Pages Needing Leonardo Review (8)

- start-here/launch-status.md — evidence stats qualifier (LD-003)
- start-here/current-status.md — V1 scope accuracy
- ai/edge-lite.md — public visibility (LD-001)
- ai/capability-evidence.md — evidence accuracy
- review/docsai-findings-v1-zen-mesh-site.md — accuracy confirmation
- review/docsai023_v1_v11_scope_proposal.md — scope decisions
- review/docsai023_leonardo_decision_queue.md — 16 decisions
- review/docsai023_decision_impact_matrix.json — priority confirmation

## Pages Needing Legal Review (5)

- legal/terms-of-service.md — draft/non-effective
- legal/privacy-policy.md — draft/non-effective
- legal/dpa.md — draft/non-effective, subprocessor list missing
- legal/acceptable-use.md — draft/non-effective
- legal/cookie-policy.md — draft/non-effective

## Pages Depending on Hermes Runtime Proof (7)

- delivery/fan-out.md — object store fan-out needs proof (LD-014)
- delivery/object-store.md — object store needs proof (LD-014)
- providers/shopify.md — Shopify needs proof (LD-014)
- providers/twilio.md — Twilio needs proof (LD-014)
- permissions/overview.md — permission axis runtime-live (LD-013)
- mcp/overview.md — MCP write contract (LD-013)
- providers/kubernetes.md — K8s CRD target (LD-015)

## Pages Depending on Helper2 Implementation (0)

None identified. All docs are pre-implementation or design/contract documentation.

## Evidence Packs Created (22)

1. docsai023_full_content_scan.json
2. docsai023_public_trust_claim_freeze.json
3. docsai023_claim_false_positive_register.json
4. docsai023_mcp_api_ui_guardrails.json
5. docsai023_support_contact_inventory.json
6. docsai023_support_ops_readiness_packet.md
7. docsai023_legal_readiness_packet.md
8. docsai023_legal_draft_inventory.json
9. docsai023_legal_sidebar_status.json
10. docsai023_pricing_term_inventory.json
11. docsai023_billing_product_decision_packet.md
12. docsai023_leonardo_decision_queue.md
13. docsai023_decision_impact_matrix.json
14. docsai023_v1_v11_scope_proposal.md
15. docsai023_scope_decision_matrix.json
16. docsai023_customer_trust_pack.json
17. docsai023_data_lifecycle_pack.json
18. docsai023_incident_ops_pack.json
19. docsai023_support_operations_pack.json
20. docsai023_api_versioning_contract_pack.json
21. docsai023_launch_rehearsal_pack.json
22. docsai023_product_commercial_readiness_pack.json
23. docsai023_tracker_cookie_privacy_packet.json
24. docsai023_buyer_room_v4.json
25. docsai023_search_ai_discoverability_max.json
26. docsai023_owner_board_final_reconciliation.json
27. docsai023_findings.md (this file)

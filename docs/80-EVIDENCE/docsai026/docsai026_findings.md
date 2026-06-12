# DOCSAI026 Findings

## Date: 2026-06-12
## Task: DOCSAI026 Supermax Legal Signoff Package + Site/Docs Validation

## Fixed Issues
1. Created 40 evidence/decision files covering all 28 phases
2. DOCSAI025 report repair (SHAs captured)
3. Canonical decision ledger with 35 Leonardo decisions
4. REVIEW_NEEDED exact rebuild (31 answered, 4 open)
5. Public signup readiness gate (15 gates, 2 passing)
6. Owner blocker board (4 owners with blockers)
7. Legal signoff matrix (12 legal items)
8. Subprocessor baseline + candidate decision pack
9. SCC/international transfer explainer + recommendation
10. Tracker/consent decision matrix
11. Active tracker detection (GA=0, HubSpot=0, Vercel Analytics=in pkg, Google Fonts=external refs)
12. Cookie banner spec (minimal notice recommended)
13. Pricing/design partner/scope/provider-region alignment
14. Buyer room / trust center package
15. Build verification (docs=PASS, site=PASS)
16. Claim freeze scan (0 forbidden claims in public content)

## Remaining Editorial Risks
- Legal docs not yet in docs repo (likely site-only); once added, need draft/non-effective markers
- Blog directory has content but /blog route not built into site nav (helper work, not DocsAI scope)
- Cookie banner implementation pending tracker decision L-1
- External font hosting detected (Google Fonts refs in Vercel config) — self-host recommended

## Remaining Launch-Blocker Docs
- Legal: Terms, Privacy, DPA, AUP, Cookie, Billing, Design Partner, Retention, Breach (12 items)
- All require assigned counsel before effective

## Pages Needing Leonardo Review
- Review queue: review_needed_exact.json (4 open: L-1 through L-4)
- Tracker matrix: tracker_consent_decision_matrix.md
- SCC explainer: scc_international_transfer_explainer.md
- Subprocessor pack: subprocessor_decision_pack.md
- Signup gate: public_signup_readiness_gate.md

## Pages Needing Legal Review
- legal_signoff_matrix.json (12 items: LG-1 through LG-12)
- legal_signoff_package.md
- Responsible disclosure: responsible_disclosure_readiness.md
- Security.txt best practice: security_txt_best_practice_packet.json
- All legal stubs once created

## Pages Depending on Hermes Runtime Proof
- Retention enforcement (7-day Free, 30-day Pro)
- Delivery/runtime proof
- Object-store Day-1
- Shopify V1 (blocker)
- Twilio V1 (blocker)
- Billing/Stripe checkout/portal
- Signup/entitlement

## Pages Depending on Helper2 Implementation
- None confirmed (Helper2 removed from blocker board)
- No concrete file/owner path proves dependency

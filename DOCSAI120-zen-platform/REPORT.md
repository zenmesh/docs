# DOCSAI120 — Public-Trust Surface Content Fixes (docs)

## Scope
Documentation site (docs.zen-mesh.io) — 11 files edited to fix provider lists, sidebar, stale content, and brand consistency.

## Files Changed

| File | Change |
|------|--------|
| docs/api/reference/sidebar.ts | Removed Datadog, PagerDuty, ServiceNow from webhook category. |
| docs/api/reference/datadog-webhook.api.mdx | Added testing-only disclaimer. |
| docs/api/reference/pagerduty-webhook.api.mdx | Added testing-only disclaimer. |
| docs/api/reference/servicenow-webhook.api.mdx | Added testing-only disclaimer. |
| docs/guides/adapters.md | Removed PagerDuty, Grafana, Teams sections. Added Stripe/GitHub/Twilio/Shopify sections. |
| docs/guides/sources.md | Added Twilio and Shopify to provider table and setup sections. |
| docs/security/header-validation.md | Added full table with Stripe/GitHub/Twilio/Shopify/Custom. Added Twilio-Signature and X-Shopify-Hmac-SHA256 docs. |
| docs/api/rate-limits.md | Replaced per-second limits with 4-tier plan table. Free: 25K/month, Pro: 500K/month. |
| docs/ai/wedge-overview.md | Removed future provider roadmap. Marked all providers PROVEN. |
| docs/ai/overview.md | Updated provider list to current. Removed roadmap language. |
| static/llms.txt | Updated provider list. Updated sources link. Updated date to 2026-06-19. |

## Verification
- `npm run build` — PASS (Docusaurus)
- Pre-existing validation failures in manifest.json schema (24 FAIL) — unrelated to this task

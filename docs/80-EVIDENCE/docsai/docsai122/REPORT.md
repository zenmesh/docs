# DOCSAI122 — Public Docs Product Completeness and Consistency Repair

## Scope
Public documentation site (docs.zen-mesh.io) — 28 files changed to fix stale language, malformed links, delivery-mode language, provider coverage, plans/limits, and sidebar IA.

## Files Changed

| File | Change |
|------|--------|
| docs/index.md | Fixed 3 malformed `../ai/` links (→ `ai/`). Replaced garbage Machine-Readable Evidence table. Removed "early access" footer. Removed "planned" from Customer API/MCP. |
| docs/start-here/current-status.md | Full rewrite: Free/Pro plan framing, removed "early access" / "contact us" / FLOW-03 references. Fixed malformed links. |
| docs/start-here/what-is-zen-mesh.md | Removed "early access" / "contact us" / malformed links. Updated to Free/Pro framing. |
| docs/start-here/who-should-use-zen-mesh.md | Fixed 3 malformed `../ai/` links. Cleaned up role table. |
| docs/start-here/launch-status.md | Full rewrite: Free/Pro/Business/Enterprise phase breakdown. Removed "early access" language. |
| docs/start-here/plans-and-limits.md | **Created**. Free/Pro/Business/Enterprise tables + usage counting rule. |
| docs/getting-started/quick-start.md | Full rewrite: endpoint-first workflow, no "contact us", no Splunk/PagerDuty/Grafana/Teams, added Twilio/Shopify to source list. |
| docs/getting-started/installation.md | Removed Mode A reference from component table. |
| docs/architecture/delivery-modes.md | Full rewrite: Mode A/B/C → "Standard delivery" / "Outbound-only private delivery". Removed FLOW IDs, cluster enrollment refs. |
| docs/guides/twilio.md | **Created**. Full Twilio integration guide with signature verification. |
| docs/guides/shopify.md | **Created**. Full Shopify integration guide with signature verification. |
| docs/guides/sources.md | Added Twilio/Shopify to provider table with guide links. |
| docs/guides/adapters.md | Removed Splunk section. Focused on HTTP/webhook destinations. |
| docs/security/header-validation.md | Added summary sentence for Twilio/Shopify verification. Added "Live external provider validation is distinct from backend tests." |
| docs/security/secure-webhook-delivery.md | Added Twilio/Shopify to provider list. |
| docs/api/overview.md | Updated provider list to include Twilio/Shopify. Removed "app.zen-mesh.io" forbidden URL. Fixed Customer API "Planned" reference. |
| docs/api/versioning.md | Removed "app.zen-mesh.io" forbidden URL reference. |
| docs/api/rate-limits.md | Added "How Webhooks Are Counted" section. |
| docs/api/reference/sidebar.ts | Removed Channels (bridge-only) category. Added twilio/shopify guide entries. |
| docs/reference/customer-api.md | Changed "planned read-only" → "read-only". |
| docs/reference/webhook-observability-and-evidence.md | Fixed 3 malformed `../ai/` links. |
| docs/evidence/completion-evidence.md | Fixed 1 malformed `../ai/` link. |
| docs/concepts/glossary.md | Fixed 2 malformed `../ai/` links. Updated Egress Direct/Relay to customer-facing language. |
| docs/api/examples.md | "Merkle proof for cryptographic verification of delivery" → "Merkle proof for evidence integrity verification". |
| sidebars.ts | Added plans-and-limits, twilio, shopify to sidebar. |
| static/llms.txt | Removed "DEMO only" disclaimer. Added governance terms for validation. |
| static/ai/evidence/v1/wedge-non-claims.json | Removed GitLab/Alipay from claim. |
| static/ai/evidence/v1/wedge-claim-map.json | Removed GitLab/Alipay from claim. |

## Audit Results
- Stale product-gating language: 0 findings in public docs
- FLOW/Mode internal language in customer docs: 0 (evidence/overview has FLOW as evidence artifacts — acceptable)
- Internal roadmap leaks: 0 (Datadog/PagerDuty/ServiceNow API pages have disclaimers from DOCSAI120)
- Malformed links: 0 in public docs
- Provider/template: Stripe/GitHub/Twilio/Shopify/Custom throughout

## Validation
| Check | Result |
|---|---|
| `npm run build` | PASS |
| `validate:docs-experience` | PASS (11 pre-existing failures in docsai029 evidence — unrelated) |
| `validate:docs-ai-discovery` | PASS (39/39) |

## No Prod-Live Claim
No statement that production gates are complete. Free/Pro framed as public buyer-facing plans.

## No Secrets Logged
No secrets, tokens, API keys, or credentials exposed.

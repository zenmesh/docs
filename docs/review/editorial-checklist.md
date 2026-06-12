---
sidebar_label: Launch Docs Editorial Checklist
---

# Launch Docs Editorial Checklist

> Checklist for reviewing Zen Mesh docs and site content before public launch.
> Apply to every page before it reaches public readers.

## Plain Language

- [ ] Technical jargon explained on first use or linked to glossary
- [ ] Sentences under 25 words where possible
- [ ] Active voice preferred ("Zen Mesh routes events" not "Events are routed")
- [ ] No internal code references visible to public readers (no `github.com/zenmesh/zen-platform/...` paths)
- [ ] No internal team names or personas in public content

## No Unsupported Claims

- [ ] Every capability claim has evidence or contract reference
- [ ] No "we guarantee" language without corresponding proof
- [ ] No performance numbers without measurement context
- [ ] No provider/region claims unless confirmed at launch
- [ ] Launch targets clearly distinguished from live capabilities

## No Hidden Critical Limitations

- [ ] Limitations visible in relevant context (not buried)
- [ ] Non-claims page accessible from key entry pages
- [ ] Early-access status clear on homepage and pricing
- [ ] "No hard SLAs" stated where relevant
- [ ] Object-store fan-out status correctly scoped (not runtime-proven)
- [ ] MCP correctly scoped (read-only V1, no apply)

## Positive Public Framing

- [ ] Hero copy positive and clear (not a blocker list)
- [ ] Status pages present progress constructively
- [ ] Limitations framed as "not yet" or "planned" where accurate
- [ ] Internal review items not exposed to public navigation
- [ ] Contract/design pages clearly labeled as contract/design, not live feature

## Deep-Doc Status Precision

- [ ] Evidence status uses consistent format: "local/mock or cloud-demo"
- [ ] Proof counts match actual proof state (verified against evidence artifacts)
- [ ] "Victory-locked" only used where proofs are actually locked
- [ ] Compliance mapping uses: proven / partial / failed / planned / not_applicable / superseded
- [ ] Launch targets vs live providers distinguished in provider docs

## Working Links

- [ ] All internal doc links resolve to existing pages
- [ ] All cross-site links (zen-mesh.io ↔ docs.zen-mesh.io) resolve
- [ ] No links to nonexistent GitHub paths
- [ ] All static JSON files referenced in docs exist
- [ ] Sidebar entries have corresponding .md files

## Consistent Terminology

| Use | Don't Use |
|-----|-----------|
| object store | S3 (unless naming S3 as example) |
| multi-target / multi-destination | HTTP-only fan-out |
| target response time | SLA |
| early access | production-ready / prod-live / launch-ready |
| draft / non-effective (for legal) | terms / policy / agreement (without qualifier) |
| current MCP read/scoped | MCP live / MCP apply |
| future MCP RW contract | MCP write access (without qualifier) |
| entry point provider/region unresolved | AWS us-east-1 / any specific provider+region |
| Preview / Team / Enterprise (site) | Free / Pro (docs) — ALIGN BEFORE LAUNCH |

## Canonical Domain and Namespaces

- [ ] All references use `zen-mesh.io` (hyphenated)
- [ ] No `zen.io` references (forbidden namespace)
- [ ] No `zen/*` references (forbidden namespace)
- [ ] `zen-mesh.io/*` reserved for actual pages
- [ ] No `zen-mesh.io/zen/*` paths

## Legal and Compliance

- [ ] All legal pages have `draft` / `non-effective` frontmatter markers
- [ ] No "compliant" or "certified" claims without certification
- [ ] Cookie/tracking language conservative
- [ ] Data handling descriptions match Privacy Policy
- [ ] No HIPAA, PCI, FedRAMP, SOC 2, ISO claims (support mappings only)

## Permission and Channel Docs

- [ ] MCP docs clearly scoped to read-only V1
- [ ] Permission-channel docs clearly labeled contract/design only
- [ ] No "MCP apply live" claims
- [ ] No "permission-axis runtime live" claims
- [ ] Draft system: proposed vs applied terminology consistent
- [ ] Examples show correct scoping (allow MCP for dev, deny for prod)

## Provider and Integration Docs

- [ ] Stripe/GitHub/custom: supported at launch, matches runtime proof
- [ ] Shopify/Twilio: launch targets, not live
- [ ] Object-store fan-out: not runtime-proven for Day 1
- [ ] NATS/MQ/Slack: roadmap only
- [ ] K8s CRD: not public pre-prod-live

## AI Discovery and SEO

- [ ] `llms.txt` present and accurate at `/llms.txt`
- [ ] `llms-full.txt` present and comprehensive
- [ ] Sitemap covers all public pages
- [ ] `robots.txt` allows AI crawlers
- [ ] Key search-intent headings present (webhook readiness, evidence export, MCP permissions, etc.)
- [ ] Meta descriptions accurate for each page

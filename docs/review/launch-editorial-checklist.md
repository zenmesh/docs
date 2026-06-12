# Launch Docs Editorial Checklist

> **Last Updated:** 2026-06-12 | **Task:** DOCSAI023
> Apply this checklist to every public-facing page before launch.

## Plain Language

- [ ] No jargon without definition on first use
- [ ] Short sentences (under 25 words preferred)
- [ ] Active voice ("Zen Mesh delivers" not "Delivery is performed by")
- [ ] No double negatives
- [ ] Acronyms defined on first use (MCP, DLQ, SVID, etc.)

## No Unsupported Claims

- [ ] No capability claims without evidence reference
- [ ] No "we guarantee" language
- [ ] No SLA language (use "target response time")
- [ ] No certification/compliance claims (use "framework alignment" or "controls mapped")
- [ ] No exactly-once delivery claims (at-least-once only)
- [ ] No guaranteed delivery claims
- [ ] No data residency claims (provider/region unresolved)

## No Hidden Critical Limitations

- [ ] Limitations visible in status pages or capability evidence
- [ ] Caveats in deep docs, not hero copy
- [ ] Draft legal pages clearly labeled "Draft — Not Effective"
- [ ] Coming-soon features clearly marked
- [ ] Runtime dependencies stated where applicable

## Positive Public Framing

- [ ] Hero copy focuses on capabilities, not limitations
- [ ] Status pages are factual, not alarming
- [ ] "Coming soon" items positioned as roadmap, not blockers
- [ ] Non-claims page positioned as transparency, not weakness

## Deep-Doc Status Precision

- [ ] Evidence pages reference actual proof state
- [ ] Provider pages state supported-at-launch vs target vs roadmap
- [ ] Plan tiers state current status (launch/coming soon/contact)
- [ ] MCP docs state current read-only scope

## Working Links

- [ ] All internal links resolve
- [ ] External links tested
- [ ] No broken anchor links
- [ ] Sitemap includes all public pages
- [ ] llms.txt is current

## Consistent Terminology

| Use | Do Not Use |
|-----|-----------|
| Object store | S3 (unless naming examples) |
| Multi-destination / multi-target | HTTP-only fan-out |
| Target response time | SLA |
| Draft / non-effective | (for legal pages) | Effective / active |
| Current MCP read/scoped | MCP live / MCP production |
| Future MCP write contract | MCP apply / MCP mutation |
| Proposed vs applied | (consistently) | Mixed usage |
| Provider/region unresolved | AWS us-east-1 / specific provider |
| Free/Pro/Business/Enterprise | Preview/Team/Standard |

## Canonical Domain

- [ ] All references use `zen-mesh.io`
- [ ] No `zen.io` references
- [ ] No `zen/*` namespace references
- [ ] No `support@zenmesh.io` (wrong domain)
- [ ] Docs domain: `docs.zen-mesh.io`
- [ ] No `zen-mesh.io/*` path references (reserved)

## Legal Stubs

- [ ] All legal pages marked "Draft — Not Effective"
- [ ] No legal page linked as "our terms" without qualifier
- [ ] Sidebar category "Legal (Draft — Not Effective)" visible
- [ ] Legal full-text review marked as required
- [ ] No compliance/certification claims
- [ ] Compliance mapping uses: proven/partial/failed/planned/not_applicable/superseded

## Forbidden Claims Check

- [ ] No launch_ready=true
- [ ] No prod_live=true
- [ ] No zero_trust_complete=true
- [ ] No SLA guarantees
- [ ] No certification claims (PCI, HIPAA, SOC 2, ISO, FedRAMP)
- [ ] No exactly-once delivery
- [ ] No guaranteed delivery
- [ ] No data residency (provider/region unresolved)
- [ ] No AWS us-east-1 as canonical
- [ ] No billing_live claims
- [ ] No paid Pro live claims
- [ ] No MCP apply live claims
- [ ] No permission-axis runtime-live claims
- [ ] No Business/Enterprise live claims
- [ ] No "Zen can never decrypt" for V1

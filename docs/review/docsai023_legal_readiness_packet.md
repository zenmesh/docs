# DOCSAI023 Legal Readiness Packet

> **Task ID:** DOCSAI023
> **Date:** 2026-06-12
> **Status:** ALL LEGAL PAGES ARE DRAFT/NON-EFFECTIVE

## Legal Pages Status

| Page | Path | Status | Legal Review | Effective Date |
|------|------|--------|-------------|----------------|
| Terms of Service | legal/terms-of-service.md | draft/non-effective | REQUIRED | TBD |
| Privacy Policy | legal/privacy-policy.md | draft/non-effective | REQUIRED | TBD |
| Data Processing Addendum | legal/dpa.md | draft/non-effective | REQUIRED | TBD |
| Acceptable Use Policy | legal/acceptable-use.md | draft/non-effective | REQUIRED | TBD |
| Cookie Policy | legal/cookie-policy.md | draft/non-effective | REQUIRED | TBD |

## Sidebar Integration

All 5 legal pages appear in sidebar under "Legal (Draft — Not Effective)" category.
Category label makes draft status visible without alarming.

## Missing Legal Documents

| Document | Status | Blocker |
|----------|--------|---------|
| Subprocessor list | NOT PROVIDED | LD-004 — Legal must provide before DPA effective |
| Responsible disclosure policy | NOT DRAFTED | LD-005 — Security disclosure template needed |
| Customer data deletion procedure | PARTIAL | In privacy policy draft, needs operational procedure |
| Evidence retention policy | PARTIAL | Referenced in privacy/delivery docs, needs alignment |
| BAA (HIPAA) | NOT DRAFTED | No HIPAA claim — not needed for V1 |
| SLA document | NOT DRAFTED | No SLA claim — not needed for V1 |

## Legal Full-Text Review Requirements

Before any legal page becomes effective:
1. Qualified legal counsel review (in-house or external)
2. All subprocessor references populated or removed
3. Jurisdiction analysis (control plane location, data residency implications)
4. Terms alignment with pricing/billing model
5. Privacy policy alignment with actual data practices
6. Cookie policy alignment with actual cookie/tracking use
7. DPA alignment with actual data processing activities
8. AUP alignment with actual platform capabilities

## Blocking Decisions for Legal

| ID | Decision | Options | Safest Default |
|----|----------|---------|----------------|
| LD-004 | Subprocessor list | Legal provides list vs remove reference | Remove reference until provided |
| LD-005 | Responsible disclosure | Create template vs defer | Defer to post-launch if no disclosure page |
| LD-010 | Jurisdiction statement | Specify vs defer | Defer to legal review |

## Non-Legal Compliance References

These are NOT legal claims but compliance-to-feature mappings for evaluators:
- static/ai/evidence/v1/compliance-map.json — internal readiness mapping, NOT certified
- security/security-capability-validation.md — maps controls to frameworks, NOT certified
- No PCI, HIPAA, FedRAMP, SOC 2, or ISO certification claimed

## Legal Review Needed: YES
All 5 legal pages require qualified legal review before becoming effective.
No legal page should be linked as "our terms" until review is complete.

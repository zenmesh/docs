# SCC / International Transfer Explainer

## Status: Non-Legal-Advice Background Document — Legal Review Required

## What Are International Transfers?
International data transfers occur when personal data moves from one jurisdiction to another. In Zen Mesh's case, data may flow between Canada (where Zen Mesh Inc. is based) and the United States (where AWS, Stripe, GitHub, and other subprocessors operate).

## Why This Matters for Zen Mesh
- **Zen Mesh Inc. is in Canada** (Ontario).
- **Control plane runs on GCP/Toronto** — data stays in Canada for SaaS operations.
- **First data plane runs on US/AWS** — webhook payloads and delivery data are processed in the US.
- **Stripe processes payments** in the US.
- **GitHub hosts code** in the US.
- Customer data may cross the Canada-US border during normal operations.

## What Are SCCs?
Standard Contractual Clauses (SCCs) are pre-approved contract terms adopted by the European Commission (and referenced by many jurisdictions) that provide legal safeguards for international data transfers. SCCs are one mechanism to legitimize transfers to countries without an "adequacy decision."

## What Is Adequacy?
An adequacy decision means a jurisdiction's data protection laws are deemed substantially equivalent to the originating jurisdiction's. Canada has been deemed adequate by the EU for organizations subject to PIPEDA. The US has a partial adequacy framework via the EU-US Data Privacy Framework (for participating organizations).

## What Are Data Processing Agreements (DPAs)?
DPAs are contracts between data controllers and data processors that specify how personal data will be handled, protected, and deleted. They are a legal requirement in many jurisdictions and work alongside SCCs or other transfer mechanisms.

## What Do Subprocessors Mean?
Subprocessors are third parties that process data on behalf of Zen Mesh (e.g., AWS hosts data, Stripe processes payments). Each subprocessor needs its own DPA or must be covered under an existing agreement. The subprocessor list must be disclosed to customers.

## What Public Privacy Docs Should Avoid Before Legal Approval
- Broad transfer assurances ("data never leaves Canada")
- Specific mechanism claims without legal review ("we use SCCs for all transfers")
- Compliance claims without certification
- Guaranteeing data residency

## Decision Options for Leonardo

### Option A: Conservative (Recommended Default)
- List all subprocessors accurately in public docs
- State that data may be processed in Canada and the US
- No broad transfer assurance
- Mark SCC/transfer mechanism as "legal review pending"
- Do not publish specific transfer mechanism until counsel approved

### Option B: Prepare SCC/Subprocessor Review Workflow
- Same as Option A, plus
- Prepare SCC adoption workflow for when counsel is assigned
- Document which subprocessors have existing DPAs
- Track adequacy decisions for each jurisdiction

### Option C: Publish Limited Transfer Wording (Requires Legal Approval)
- Only after legal counsel reviews and approves
- Use approved language about transfer mechanisms
- Reference specific SCCs or framework participation

## Recommended Default: Option A
List subprocessors accurately. No broad transfer assurance. Mark SCC/transfer as legal review pending. This is the safest position before legal counsel is assigned.

## Transfer Matrix
| Data Flow | Origin | Destination | Subprocessor | Mechanism Status |
|---|---|---|---|---|
| SaaS control plane | Canada | Canada | GCP/Toronto | No transfer needed |
| Data plane payloads | Customer | US | AWS | Transfer mechanism TBD |
| Payment data | Customer | US | Stripe | Transfer mechanism TBD |
| Code (non-customer) | Zen Mesh | US | GitHub | Transfer mechanism TBD |
| Docs content | Zen Mesh | US | Docusaurus/Vercel | Public content only |

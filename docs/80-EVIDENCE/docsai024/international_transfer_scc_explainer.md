# International Transfer / SCC Explainer — DOCSAI024

> **FOR LEONARDO REVIEW — NOT LEGAL ADVICE**
> This document explains international data transfer concepts so Leonardo can make an informed decision. Legal counsel must confirm any transfer mechanism.

## What Are International Transfers?
When data moves from one country to another, it is an "international transfer." Privacy laws in many jurisdictions (PIPEDA in Canada, GDPR in Europe) regulate these transfers.

## Why This Matters for Zen Mesh
Zen Mesh uses subprocessors that may process data in different countries:

| Subprocessor | Role | Likely Data Location |
|-------------|------|---------------------|
| GCP | SaaS control plane | Toronto, Canada (configurable) |
| AWS | Data plane | US (sovereignty requirement) |
| Stripe | Payments | US (global) |
| GitHub | Source code | US (global) |
| Docusaurus hosting | Public docs | Various |

The AWS data plane is explicitly US-based. Stripe processes payments in the US. This means customer webhook payloads may transit or be stored in the US.

## What Are SCCs?
Standard Contractual Clauses (SCCs) are pre-approved contract terms adopted by the European Commission. They provide legal safeguards for international data transfers.

- **SCCs** = contractual guarantees between data exporter and data importer
- Commonly used when transferring data from EU to countries without "adequacy" decisions
- Canada has adequacy from the EU for commercial organizations (PIPEDA-equivalent framework)

## Adequacy
Some countries are deemed "adequate" by the EU, meaning transfers to those countries are considered safe without additional safeguards:
- Canada has a partial adequacy decision (PIPEDA-covered organizations)
- US has no general EU adequacy decision (though the EU-US Data Privacy Framework exists for certified organizations)

## What This Means for Zen Mesh (High Level)
1. **Canada → Canada**: No transfer issue (control plane on GCP/Toronto)
2. **Canada → US (AWS data plane)**: International transfer. Requires legal mechanism (SCCs, contractual safeguards, or consent)
3. **Canada → US (Stripe)**: International transfer. Stripe provides its own DPA and compliance framework
4. **Canada → US (GitHub)**: International transfer for code hosting
5. **User → Zen Mesh → Target**: Depends on where the user and target are

## What Legal Must Confirm
- Whether SCCs are the right mechanism for Zen Mesh
- Whether consent or contractual basis is more appropriate
- Whether the EU-US Data Privacy Framework (for Stripe) satisfies requirements
- Whether Zen Mesh needs to disclose specific transfer mechanisms in the Privacy Policy
- Whether a separate SCC annex is needed for each subprocessor

## Options for Leonardo

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| A: Counsel-approved SCC wording | Include SCCs in DPA, have counsel review | Gold standard, most transparent | Requires counsel, adds document complexity |
| B: Adequacy/contractual transfer wording | Rely on Canada's adequacy + contractual safeguards | Simpler if applicable | May not cover all scenarios |
| C: Keep docs conservative until legal review | State "data may be processed in Canada and the US" without committing to mechanism | Safest pre-legal | Less informative for users |

## Recommended Default
**Option C** for public docs: Mark transfer mechanism as "pending legal review." Do not overclaim. Public docs should state that data may be processed in Canada and the US, that subprocessors include GCP, AWS, Stripe, and GitHub, and that a legal review of transfer mechanisms is in progress. Once legal counsel reviews and approves, update with specific mechanisms (SCCs or equivalent).

## NOT LEGAL ADVICE
This document is informational only. Legal counsel must advise on the correct transfer mechanism.

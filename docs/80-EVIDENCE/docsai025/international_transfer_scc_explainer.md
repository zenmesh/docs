# International Transfer / SCC Explainer — DOCSAI025

**For Leonardo decision-making. Not legal advice.**

## What Are International Transfers?

When personal data moves from one country to another, it's an "international transfer." Under privacy laws (PIPEDA in Canada, GDPR in EU), transfers to countries without an "adequacy decision" need additional safeguards.

## What Are SCCs?

Standard Contractual Clauses (SCCs) are pre-approved contract terms adopted by the European Commission. They provide legal safeguards for transfers outside the EEA/UK. SCCs are the most common mechanism for legitimizing international data transfers.

## Why This Matters for Zen Mesh

Zen Mesh Inc. is a Canadian company. Our data flows involve:

1. **GCP Toronto** (Canada) — control plane. Canada has adequacy from the EU, so EU-to-Canada transfers are generally fine.
2. **AWS US** (United States) — data plane. The US does not have an EU adequacy decision (as of 2026). Transfers from EU users to US-based data plane need safeguards.
3. **Stripe** (US) — payment processing. Same US transfer consideration.
4. **GitHub** (US) — code hosting. Internal tool, no customer data in production flow.

## When Are SCCs Typically Used?

- When transferring EU/EEA personal data to countries without an adequacy decision
- When the data importer cannot provide other adequate safeguards
- As a contractual mechanism between the data exporter (Zen Mesh) and importer (subprocessor)

## What Does "Adequacy Decision" Mean?

An adequacy decision is a determination by the EU Commission that a country's data protection laws provide essentially equivalent protection to the EU. Canada has one (with some conditions for commercial organizations). The US does not (the EU-US Data Privacy Framework exists but has specific scope and has been challenged).

## Canada-Specific Notes

PIPEDA (Canada's private-sector privacy law) requires organizations to protect personal information during transfers. PIPEDA does not specifically require SCCs, but using them is recognized as a best practice and may be expected by enterprise customers subject to GDPR.

## Options for Zen Mesh

### Option A: Conservative (Recommended Default)
- Do not publish strong transfer mechanism claims yet
- List subprocessors and region architecture accurately in DPA
- Mark "international transfer mechanism: legal review pending" in all legal drafts
- Prepare SCC templates for future use
- Risks: none — safest approach
- Trade-offs: enterprise customers may ask for transfer details during procurement

### Option B: Operational
- Prepare SCC/subprocessor review workflow
- Draft SCC addenda for GCP, AWS, Stripe
- Keep transfer mechanism as "SCC-based, pending legal review"
- Risks: low — shows preparation without claiming effectiveness
- Trade-offs: more upfront work, legal review still required

### Option C: Aggressive (Not Recommended)
- Publish transfer wording claiming SCC-based transfers now
- Risks: high — legal approval not obtained, potential liability
- Trade-offs: faster enterprise sales cycle but legal exposure

## Recommendation

**Option A (conservative)** is recommended for V1. Zen Mesh should:
1. Accurately list all subprocessors and their regions
2. Mark transfer mechanism as pending legal review
3. Have SCC templates ready but not claim them as effective
4. Legal counsel should review and approve the transfer mechanism before any claim is published

This avoids legal risk while demonstrating transparency about data flows.

> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Standard Contractual Clauses / International Data Transfer Notice (Draft)

## 1. Transfer Landscape

Zen Mesh's proposed infrastructure involves data transfers across jurisdictions:

| Component | Location | Data Flow |
|-----------|----------|-----------|
| Control plane | GCP Toronto, Canada | Account data, API logs, MCP logs |
| Data plane | AWS US (provider/region to be confirmed) | Webhook payloads, delivery logs |
| Payments | Stripe, US | Billing information |
| Source integration | GitHub, US | Event data, repo metadata |

## 2. What Are SCCs?

Standard Contractual Clauses (SCCs) are pre-approved contractual terms adopted by the European Commission (and recognized in other jurisdictions) that allow personal data to be transferred from one jurisdiction to another while maintaining appropriate safeguards.

In plain terms: SCCs are legal agreements that say "even though data crosses borders, the receiving party will protect it to a standard that satisfies the originating jurisdiction's privacy laws."

## 3. Transfer Mechanism (Proposed)

Zen Mesh intends to rely on SCCs (or equivalent mechanisms) for international data transfers. The specific SCC version and implementation are **pending legal review**.

No transfer compliance claim is made.

## 4. Canadian Context

As a Canadian entity (Ontario), Zen Mesh may be subject to:
- **PIPEDA** (Personal Information Protection and Electronic Documents Act) at the federal level
- Provincial privacy legislation in some contexts
- International transfer requirements under PIPEDA and equivalent frameworks

The applicability of specific Canadian and international transfer requirements is **pending legal review**.

## 5. US Data Plane

The first data plane is proposed for US/AWS. The specific provider and region are to be confirmed. No data residency guarantee is made.

## 6. Leonardo Decision Options

1. **Option A:** Adopt SCCs as the transfer mechanism for all international transfers, with legal review of specific clauses.
2. **Option B:** Pursue adequacy decisions where available, with SCCs as fallback.
3. **Option C:** Conservative approach — limit data transfers to jurisdictions with adequacy decisions where possible, SCCs for remaining transfers.
4. **Option D:** Defer transfer mechanism decision until legal counsel is engaged.

## 7. Legal Review Required

The final transfer mechanism, SCC wording, and compliance approach are **pending legal review**. This document does not constitute legal advice or a binding commitment.

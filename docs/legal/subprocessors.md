> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Subprocessor List (Draft)

## Active/Day-1 Subprocessors

| Subprocessor | Purpose | Data Types | Transfer | DPA Review |
|-------------|---------|------------|----------|------------|
| GCP | Hosting, control plane (Toronto, Canada) | Account data, API logs, MCP logs | Canada | Required |
| AWS | Data plane (US, provider/region to be confirmed) | Webhook payloads, delivery logs | US | Required |
| Stripe | Payment processing | Billing info, payment tokens | US | Required |
| GitHub | Source integration (webhook sources) | Event data, repo metadata | US | Required |
| Docusaurus | Documentation hosting | None (public docs) | N/A | Not required |

## Candidate Subprocessors (Require Approval)

| Subprocessor | Purpose | Data Types | Transfer | Status |
|-------------|---------|------------|----------|--------|
| Google Analytics | Usage analytics | Anonymized page views | US | Candidate — pending decision |
| HubSpot | Marketing/CRM | Contact form submissions | US | Candidate — pending decision |
| Vercel Analytics | Performance monitoring | Anonymized performance data | US | Candidate — pending decision |
| Vercel Speed Insights | Speed monitoring | Anonymized speed data | US | Candidate — pending decision |
| Google Fonts | Typography | None (external refs only) | US | Candidate — self-host recommended |
| Support/CRM tools | Customer support | Support tickets, contact info | TBD | Candidate — not yet selected |

## Notes

- Active subprocessors are those required for core platform operation at launch.
- Candidate subprocessors are not yet deployed and require explicit approval.
- Adding any candidate subprocessor will trigger customer notification.
- No unsupported claims are made about subprocessor security or compliance.
- All subprocessor relationships are **pending legal review**.

> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Data Processing Agreement (Draft)

## 1. Roles

The designation of controller and processor roles between Zen Mesh and its customers is **pending legal review**. This DPA is a proposed framework.

## 2. Subprocessors

Zen Mesh proposes the following subprocessors (see [Subprocessor List](./subprocessors.md) for details):

**Active/Day-1:**
- GCP — hosting and control plane
- AWS — data plane
- Stripe — payment processing
- GitHub — source integration
- Docusaurus — documentation hosting

**Candidates (require approval):**
- Google Analytics, HubSpot, Vercel Analytics, Vercel Speed Insights, Google Fonts, support/CRM tools

## 3. Security Measures

Zen Mesh proposes security measures including:
- mTLS for all agent-to-SaaS communication
- Tenant isolation at the infrastructure level
- Cryptographic enrollment for agent identity
- Secure webhook delivery with HMAC signature validation
- IP allowlisting and webhook access controls
- ZenLock credential lifecycle management

No certification claims (SOC 2, ISO 27001, etc.) are made.

## 4. Data Return and Deletion

Upon termination or upon request, Zen Mesh proposes to return or delete customer data within:
- Free: 1 month
- Pro: 3 months

This is subject to legal review and technical implementation.

## 5. International Transfers

Data may be transferred between jurisdictions (Canada, US). The transfer mechanism (SCCs recommended) is **pending legal review**. See [SCC/International Transfer Notice](./scc-transfer.md).

## 6. Audit and Evidence

Zen Mesh intends to provide delivery evidence, replay records, and audit trails. No specific audit SLA or compliance certification is claimed.

## 7. Contact

- Data protection inquiries: support@zen-mesh.io
- Security incidents: security@zen-mesh.io

> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Privacy Policy (Draft)

## 1. Data Controller

**Zen Mesh Inc.**
2-14 Stadacona Drive, Toronto, Ontario, Canada
Contact: support@zen-mesh.io / security@zen-mesh.io

## 2. Categories of Data

Zen Mesh may process the following categories of data:

- **Account data:** Email, name, organization
- **Webhook payloads:** Event data transmitted through the platform
- **Delivery logs:** Delivery attempts, responses, timestamps
- **API logs:** Authentication events, API calls
- **MCP interaction logs:** Tool calls and responses (read-scoped only)
- **Evidence data:** Delivery receipts, replay records, audit trails

## 3. Subprocessors

See [Subprocessor List](./subprocessors.md) for the current list of proposed subprocessors.

## 4. Retention Periods (Proposed)

| Data Type | Free | Pro |
|-----------|------|-----|
| Webhook payloads | 7 days | 30 days |
| DLQ/replay data | 7 days | 30 days |
| Logs | 1 month | 3 months |
| Evidence | 1 month | 3 months |
| Deletion/return period | 1 month | 3 months |

Business and Enterprise retention periods are to be determined.

**Note:** Runtime enforcement of these retention periods is pending Hermes runtime proof.

## 5. Data Deletion and Return

Upon account termination or upon request, Zen Mesh proposes to delete or return customer data within the applicable retention period (Free: 1 month, Pro: 3 months). This is subject to legal review and technical implementation.

## 6. International Data Transfers

Zen Mesh's proposed infrastructure includes:

- **Control plane:** GCP Toronto (Canada)
- **Data plane:** US/AWS (proposed first data plane)
- **Payment processing:** Stripe (US)
- **Source integration:** GitHub (US)

Data transfers between these jurisdictions may require Standard Contractual Clauses (SCCs) or equivalent mechanisms. The specific transfer mechanism is **pending legal review**. See [SCC/International Transfer Notice](./scc-transfer.md).

No data residency guarantee is made.

## 7. Security

Zen Mesh proposes the following security measures:
- mTLS for agent-to-SaaS communication
- Tenant isolation
- Cryptographic enrollment
- Secure webhook delivery with HMAC validation
- IP allowlisting
- ZenLock credential lifecycle management

See the [Security documentation](../security/index.md) for details.

## 8. Cookies and Trackers

Zen Mesh does not currently deploy heavy tracking by default (no active Google Analytics, GTM, or HubSpot). A cookie/tracker decision is pending. See [Cookie/Tracker Disclosure](./cookie-disclosure.md).

## 9. Breach Notification

In the event of a data breach, Zen Mesh intends to notify affected users and relevant authorities **without undue delay**, subject to legal review of specific notification requirements. See [Breach Notice Language](./breach-notice.md).

## 10. Contact

- General inquiries: support@zen-mesh.io
- Security: security@zen-mesh.io

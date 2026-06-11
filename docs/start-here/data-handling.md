---
sidebar_label: Data Handling
description: How Zen Mesh handles your data — geography, retention, encryption, access policy, and deletion.
---

# Data Handling

This page describes where your data is processed, how long it is retained, and how you can manage it.

## SaaS Hosting

Zen Mesh SaaS runs in **Canada**. The control plane — billing, configuration, and user management — operates from Canadian infrastructure.

## Entry Points

Your webhook traffic enters through your chosen entry point:

- **Currently available:** AWS us-east-1
- **Planned:** EU and APAC entry points for teams with data sovereignty requirements

Webhook sources can be located anywhere. Traffic routes through the configured entry point to your infrastructure.

Entry point selection is available on the Pro plan and above.

## Data Retention by Plan

Retention periods are determined by your plan tier:

| Data Type | Free | Pro |
|-----------|------|-----|
| **Delivery logs** | 7 days | 30 days |
| **Evidence records** | 30 days | 90 days |
| **Dead-letter queue (DLQ)** | 7 days | 14 days |
| **Payloads** | Per log/evidence retention | Per log/evidence retention |

After the retention period expires, data is automatically and permanently purged. Expired data cannot be recovered.

## Payload Handling

- **Encryption at rest:** Payloads and logs are stored encrypted at rest.
- **Not used for training:** Your webhook payloads and event data are never used for model training or analytics beyond operating the service.
- **Evidence contents:** Delivery evidence includes timestamps, status codes, label metadata, and — depending on configuration — payload content. Payload inclusion in evidence is configurable per endpoint.

## Log and Evidence Contents

Delivery logs and evidence records may contain:

- Delivery receipts with timestamps
- HTTP status codes and response headers
- Label metadata associated with the resource
- Target URL (redacted to domain only in some contexts)
- Payload content (if configured for inclusion)

## Support Access Policy

Zen Mesh support staff follow these principles when accessing customer data:

- **Authorization required:** Support access to tenant data requires explicit customer authorization for each request.
- **Audited access:** All support access events are logged and auditable. Customers can request a report of access events.
- **Manual process:** The current access process is manual and request-based. Automated self-serve access management is planned for a future release.

## Data Deletion and Export

To request data deletion or export:

1. Contact [support@zen-mesh.io](mailto:support@zen-mesh.io)
2. Include your tenant ID and the specific data scope (all data, specific date range, specific resource types)
3. The support team processes requests manually
4. Target response time follows your plan tier (Pro: target 48h)

The deletion and export process is currently manual. Automated self-serve deletion/export is planned for a future release.

## What We Do Not Claim

As a launch-stage product, we do not claim:

- SOC 2, HIPAA, or PCI compliance certifications
- Data residency guarantees beyond Canada SaaS and AWS us-east-1 entry point
- Automated data lifecycle management beyond stated retention periods

We are committed to transparency about our current capabilities and will update this page as our practices mature.

## See also

- [Geography](/docs/start-here/geography) — geographic transparency details
- [Plans & Limits](/docs/start-here/limits) — retention and resource limits by plan
- [Security Model](/docs/security/) — encryption and security architecture
- [Responsible Disclosure](https://zen-mesh.io/security-disclosure) — how to report security issues

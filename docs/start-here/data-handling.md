---
sidebar_label: Data Handling
description: How Zen Mesh handles your data — geography, retention, encryption, access policy, and deletion.
---

# Data Handling

This page describes where your data is processed, how long it is retained, and how you can manage it.

## SaaS Hosting

Zen Mesh SaaS runs on **Google Cloud Platform in Toronto, Canada**. The control plane — billing, configuration, and user management — operates from Toronto/GCP infrastructure.

## Entry Points

Your webhook traffic enters through your chosen entry point. Initial entry point availability will be confirmed at launch. Additional data plane locations are planned.

- **Launch scope:** Entry point to be confirmed at launch
- **Planned:** EU and APAC entry points for teams with data sovereignty requirements

Webhook sources can be located anywhere. Traffic routes through the configured entry point to your infrastructure.

Entry point selection and data plane choice are roadmap items. Users will eventually be able to choose where flows run, including Free users. Do not rely on future entry points for current compliance or architecture decisions.

## Data Retention by Plan

Retention periods are determined by your plan tier:

| Data Type | Free | Pro |
|-----------|------|-----|
| **Delivery logs** | 7 days | 30 days |
| **Evidence records** | 30 days | 90 days |
| **Dead-letter queue (DLQ)** | 7 days (or limit count) | 30 days (or limit count) |
| **Payloads** | Per log/evidence retention | Per log/evidence retention |

After the retention period expires, data is automatically and permanently purged. Expired data cannot be recovered.

DLQ retention follows the same period as log retention unless the DLQ item count limit expires first.

## Payload Handling

- **Customer payload retention** for replay/DLQ, where enabled, is encrypted and governed by plan retention.
- **Zen operational logs do not store raw payloads.**
- **Encryption at rest:** Payloads and logs are stored encrypted at rest.
- **Not used for training:** Your webhook payloads and event data are never used for model training or analytics beyond operating the service.
- **Evidence contents:** Delivery evidence includes timestamps, status codes, label metadata, and — depending on configuration — payload content. Payload inclusion in evidence is configurable per endpoint.

## Log and Evidence Contents

Delivery logs and evidence records may contain:

- Delivery receipts with timestamps
- HTTP status codes and response headers
- Label metadata associated with the resource (snapshotted at event time)
- Target URL (redacted to domain only in some contexts)
- Payload content (if configured for inclusion)

## Support Access Policy

Zen Mesh support staff follow these principles:

- **Metadata by default:** Support staff access metadata, not raw payloads. Debug and support views show metadata and redacted content by default.
- **Payload access disabled by default:** Support payload-level access is disabled by default. Staff cannot browse customer webhook payloads.
- **Explicit customer authorization required:** Payload-level access requires explicit customer authorization for each request. Access is time-bounded if implemented. If this feature is not fully implemented, it is marked as planned/hardening.
- **Customer-authorized path:** If payload samples are needed, customers should provide them through a safe, customer-authorized path.
- **Audited access:** All support access events are logged and auditable. Customers can request a report of access events.
- **Manual process:** The current access process is manual and request-based. Automated self-serve access management is planned for a future release.

## Data Deletion and Export

To request data deletion or export:

1. Contact [support@zen-mesh.io](mailto:support@zen-mesh.io)
2. Include your tenant ID and the specific data scope (all data, specific date range, specific resource types)
3. The support team processes requests manually at launch

Export and deletion are manual processes at launch. Automated self-serve data management is planned for a future release.

## Tenant Deletion

- **Soft delete:** 7 days after deletion request
- **Purge:** Within 30 days after soft delete
- Data cannot be recovered after purge

## See also

- [Geographic Transparency](/docs/start-here/geography) — where data is processed
- [Security Model](/docs/security/) — three-plane architecture and security controls
- [Plans & Limits](/docs/start-here/limits) — plan tiers and limits
- [Trust Controls & Compliance Mapping](/docs/security/trust-controls) — compliance status

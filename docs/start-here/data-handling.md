---
sidebar_label: Data Handling
description: How Zen Mesh handles your data — geography, retention, encryption, access policy, and deletion.
---

# Data Handling

This page describes where your data is processed, how long it is retained, and how you can manage it.

## SaaS Hosting

Zen Mesh SaaS runs on **Google Cloud Platform in Toronto, Canada**. The control plane — billing, configuration, and user management — operates from Toronto/GCP infrastructure.

## Entry Points

Your webhook traffic enters through your chosen entry point. The entry point provider and region will be confirmed before launch. Additional data plane locations are planned.

- **Current:** To be confirmed before launch
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
- **Zen operations staff** do not have standing access to customer payloads. Payload access requires explicit customer authorization.
- Payload encryption is described in the [Payload Encryption, Replay, and DLQ Contract](/docs/contracts/payload-encryption-replay-dlq).

## Deletion and Export

Customers can request data deletion or export:

- **Deletion requests:** Submit via [support@zen-mesh.io](mailto:support@zen-mesh.io). Deletion is currently a manual, request-based process. Automated self-service deletion is planned.
- **Export requests:** Submit via [support@zen-mesh.io](mailto:support@zen-mesh.io). Export is currently a manual, request-based process. Automated self-service export is planned.
- Do not claim automated deletion or export until the feature is confirmed in documentation.

## Support Payload Access Policy

Support staff may need to access payload data to troubleshoot delivery issues. Access is governed by the [Support Payload Access Contract](/docs/contracts/support-payload-access):

- Support access requires **explicit customer authorization** before any payload is viewed.
- Access is **time-bounded** — authorization expires after a defined window.
- All access is **audited** and logged.
- Staff follow the [Support Safe Payload Handling](/docs/contracts/support-safe-payload-handling) checklist.

Do not claim automated access controls or zero-knowledge payload handling unless documented as implemented.

## See also

- [Geographic Transparency](/docs/start-here/geography) — where data is processed
- [Plans & Limits](/docs/start-here/limits) — retention periods by plan
- [Support](/docs/start-here/support) — support channels and contact
- [Security Model](/docs/architecture/security-model) — architecture and security overview
- [Trust Controls](/docs/security/trust-controls) — compliance posture

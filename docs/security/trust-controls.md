---
sidebar_label: Trust Controls & Compliance
description: Trust controls and compliance mapping for Zen Mesh — transparent status of SOC 2, GDPR, ISO, PCI, HIPAA, and FedRAMP. Not certified.
---

# Trust Controls & Compliance Mapping

This page provides a transparent mapping of Zen Mesh security controls against common compliance frameworks. This is a transparency roadmap, not a certification.

**Zen Mesh is not certified under any of the frameworks listed below.** Mapped controls and evidence are provided for transparency. Certification status will be updated only when independently verified.

## Compliance Status

| Framework | Status | Taxonomy | Notes |
|-----------|--------|----------|-------|
| **SOC 2** | Planned | planned | Control mapping available for transparency. Not certified. Not "SOC 2 ready." |
| **GDPR** | Partial | partial | Data handling practices align with GDPR principles. Not certified. Not "GDPR ready." |
| **ISO 27001** | Planned | planned | Control mapping available for transparency. Not certified. |
| **PCI DSS** | Not applicable | not_applicable | Zen Mesh does not process, store, or transmit payment card data. Not "PCI compliant." |
| **HIPAA** | Not applicable | not_applicable | Zen Mesh is not a covered entity or business associate for PHI. Not "HIPAA compliant." |
| **FedRAMP** | Not applicable | not_applicable | No current plans for FedRAMP authorization. Not "FedRAMP planned." |

### Compliance Status Taxonomy

Each framework's compliance status uses the following taxonomy:

| Status | Meaning |
|--------|---------|
| **proven** | Independently verified or certified. Status updated only when independently verified. |
| **partial** | Practices align with framework principles. Full certification not yet achieved. |
| **failed** | Evaluated and did not meet requirements. |
| **planned** | On the roadmap. Not yet started or in early assessment. |
| **not_applicable** | Service scope does not include activities covered by this framework. |
| **superseded** | Previously tracked status replaced by a newer framework or standard. |

This taxonomy applies to the compliance mapping above and to any control-level status within Zen Mesh's evidence framework. It is a transparency tool, not a certification status.

## Control Mapping

The following controls are mapped for transparency. This mapping does not constitute certification or compliance.

### Access Control

| Control | Implemented | Notes | Evidence Reference |
|---------|-------------|-------|-------------------|
| Row-level tenant isolation | Yes | Data layer prevents cross-tenant access | Evidence ref: EV-AC-1 — placeholder, not generated |
| API key scoping | Yes | Keys scoped to single tenant | Evidence ref: EV-AC-2 — placeholder, not generated |
| RBAC/ABAC via labels | Yes | Policy-based access control with label selectors | Evidence ref: EV-AC-3 — placeholder, not generated |
| mTLS internal identity | Yes | SPIFFE/SPIRE workload identity | Evidence ref: EV-AC-4 — placeholder, not generated |
| Secret encryption at rest | Yes | AGE encryption via ZenLock | Evidence ref: EV-AC-5 — placeholder, not generated |
| Secret redaction from logs | Yes | Plain-text never persisted outside encrypted store | Evidence ref: EV-AC-6 — placeholder, not generated |

### Data Protection

| Control | Implemented | Notes | Evidence Reference |
|---------|-------------|-------|-------------------|
| Encryption at rest | Yes | Payloads, logs, and evidence stored encrypted | Evidence ref: EV-DP-1 — placeholder, not generated |
| Encryption in transit | Yes | TLS for all external, mTLS for internal | Evidence ref: EV-DP-2 — placeholder, not generated |
| HMAC payload signing | Yes | HMAC-SHA256 per-tenant signing keys | Evidence ref: EV-DP-3 — placeholder, not generated |
| Support payload access | Planned | Disabled by default; explicit customer authorization required | Evidence ref: EV-DP-4 — placeholder, not generated |
| Data deletion requests | Manual | Request-based via support@zen-mesh.io | Evidence ref: EV-DP-5 — placeholder, not generated |
| Data export requests | Manual | Request-based via support@zen-mesh.io | Evidence ref: EV-DP-6 — placeholder, not generated |

### Audit and Evidence

| Control | Implemented | Notes | Evidence Reference |
|---------|-------------|-------|-------------------|
| Delivery evidence records | Yes | Timestamped, labeled, tamper-evident | Evidence ref: EV-AE-1 — placeholder, not generated |
| Label snapshots in evidence | Yes | Labels captured at event time | Evidence ref: EV-AE-2 — placeholder, not generated |
| Support access audit trail | Planned | Customer-accessible audit log planned | Evidence ref: EV-AE-3 — placeholder, not generated |
| Label change audit | Yes | All label mutations are audited | Evidence ref: EV-AE-4 — placeholder, not generated |

### Operational Security

| Control | Implemented | Notes | Evidence Reference |
|---------|-------------|-------|-------------------|
| Tenant kill switch | Required before launch | Dangerous-zone control | Evidence ref: EV-OS-1 — placeholder, not generated |
| Endpoint disable | Required before launch | Per-endpoint emergency control | Evidence ref: EV-OS-2 — placeholder, not generated |
| Loop detection | Required before launch | Automatic detection and alert | Evidence ref: EV-OS-3 — placeholder, not generated |
| Large payload rejection | Yes | Hard reject by plan limit | Evidence ref: EV-OS-4 — placeholder, not generated |
| Signature failure handling | Planned | Alert and throttle, not permanent block | Evidence ref: EV-OS-5 — placeholder, not generated |
| SSRF protection | Launch gate | Under review for launch readiness | Evidence ref: EV-OS-6 — placeholder, not generated |

### Infrastructure

| Control | Implemented | Notes | Evidence Reference |
|---------|-------------|-------|-------------------|
| Control plane / data plane separation | Yes | Three-plane architecture | Evidence ref: EV-INF-1 — placeholder, not generated |
| Control plane not in runtime path | Yes | Events flow through data plane only | Evidence ref: EV-INF-2 — placeholder, not generated |
| Multi-region data plane | Planned | Single entry point at launch; additional regions planned | Evidence ref: EV-INF-3 — placeholder, not generated |
| Tenant soft delete | Yes | 7-day soft delete, purge within 30 days | Evidence ref: EV-INF-4 — placeholder, not generated |

## Metadata vs Payload Handling

Zen Mesh distinguishes between metadata and payload data:

- **Metadata:** Delivery status, timestamps, resource identifiers, labels, event types, HTTP status codes. Accessible to support staff by default for operational debugging.
- **Payload data:** The actual webhook body (e.g., Stripe event JSON, GitHub push payload). Not stored in operational logs. Not accessible to support staff by default.

### Payload access flow
- Payload data is stored encrypted at rest for replay and DLQ purposes, where enabled.
- Support staff cannot browse raw payloads without explicit customer authorization.
- Payload access requests are audited when implemented.
- Customers control what payload samples they share with support.

See [Data Handling](../start-here/data-handling) for retention periods and encryption details.

## Support Access Boundaries

| Access Type | Default | Customer Authorization Required |
|-------------|---------|--------------------------------|
| Metadata (delivery logs, status) | Yes | No |
| Label snapshots in evidence | Yes | No |
| Raw payload content | No | Yes (per-request, audited) |
| Account configuration | Yes | N/A (tenant-scoped) |
| Billing information | Yes (own tenant) | No |
| Evidence export (recent/low-volume) | Yes | No |
| Evidence export (full/bulk) | No | Yes (Pro+ only, API key required) |

## Three-Plane Model and Non-Claims

Zen Mesh separates concerns into three planes. Each plane has its own security boundary and non-claims:

### Control Plane (SaaS — Toronto, Canada / GCP)
Handles billing, configuration, user management, API gateway.
- **Non-claim:** The control plane does not process, route, or store webhook payloads as part of delivery.
- **Non-claim:** The control plane is not certified under SOC 2, ISO 27001, HIPAA, PCI DSS, or FedRAMP.

### Data Plane (Entry Point — provider and region to be confirmed)
Handles webhook ingestion, routing, and delivery.
- **Non-claim:** The data plane is not a content delivery network or global load balancer.
- **Non-claim:** Entry point provider and region are to be confirmed before launch. Additional entry point locations are planned, not live.
- **Non-claim:** Multi-region data plane resilience is planned, not live.

### Edge Plane (Customer Infrastructure)
The zen-egress component runs in your environment.
- **Non-claim:** Zen Mesh does not guarantee delivery, uptime, or availability of customer infrastructure.
- **Non-claim:** The edge plane does not provide DDoS protection, WAF, or API inspection beyond configured webhook validation.

## Required wording

When discussing compliance status:

- "Not certified."
- "Mapped controls and evidence are provided for transparency."
- "Certification status will be updated only when independently verified."

Do not say:
- "SOC 2 ready"
- "GDPR ready"
- "HIPAA compliant"
- "PCI compliant"
- "FedRAMP planned"

## See also

- [Security Model](/docs/security/) — three-plane architecture and security controls
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, and access policy
- [Geographic Transparency](/docs/start-here/geography) — where data is processed
- [Responsible Disclosure](https://zen-mesh.io/security-disclosure) — security reporting

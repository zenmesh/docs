---
sidebar_label: Trust Controls & Compliance
description: Trust controls and compliance mapping for Zen Mesh — transparent status of SOC 2, GDPR, ISO, PCI, HIPAA, and FedRAMP. Not certified.
---

# Trust Controls & Compliance Mapping

This page provides a transparent mapping of Zen Mesh security controls against common compliance frameworks. This is a transparency roadmap, not a certification.

**Zen Mesh is not certified under any of the frameworks listed below.** Mapped controls and evidence are provided for transparency. Certification status will be updated only when independently verified.

## Compliance Status

| Framework | Status | Notes |
|-----------|--------|-------|
| **SOC 2** | Planned | Control mapping available for transparency. Not certified. Not "SOC 2 ready." |
| **GDPR** | Partial | Data handling practices align with GDPR principles. Not certified. Not "GDPR ready." |
| **ISO 27001** | Planned | Control mapping available for transparency. Not certified. |
| **PCI DSS** | Not applicable | Zen Mesh does not process, store, or transmit payment card data. Not "PCI compliant." |
| **HIPAA** | Not applicable | Zen Mesh is not a covered entity or business associate for PHI. Not "HIPAA compliant." |
| **FedRAMP** | Not applicable | No current plans for FedRAMP authorization. Not "FedRAMP planned." |

## Control Mapping

The following controls are mapped for transparency. This mapping does not constitute certification or compliance.

### Access Control

| Control | Implemented | Notes |
|---------|-------------|-------|
| Row-level tenant isolation | Yes | Data layer prevents cross-tenant access |
| API key scoping | Yes | Keys scoped to single tenant |
| RBAC/ABAC via labels | Yes | Policy-based access control with label selectors |
| mTLS internal identity | Yes | SPIFFE/SPIRE workload identity |
| Secret encryption at rest | Yes | AGE encryption via ZenLock |
| Secret redaction from logs | Yes | Plain-text never persisted outside encrypted store |

### Data Protection

| Control | Implemented | Notes |
|---------|-------------|-------|
| Encryption at rest | Yes | Payloads, logs, and evidence stored encrypted |
| Encryption in transit | Yes | TLS for all external, mTLS for internal |
| HMAC payload signing | Yes | HMAC-SHA256 per-tenant signing keys |
| Support payload access | Planned | Disabled by default; explicit customer authorization required |
| Data deletion requests | Manual | Request-based via support@zen-mesh.io |
| Data export requests | Manual | Request-based via support@zen-mesh.io |

### Audit and Evidence

| Control | Implemented | Notes |
|---------|-------------|-------|
| Delivery evidence records | Yes | Timestamped, labeled, tamper-evident |
| Label snapshots in evidence | Yes | Labels captured at event time |
| Support access audit trail | Planned | Customer-accessible audit log planned |
| Label change audit | Yes | All label mutations are audited |

### Operational Security

| Control | Implemented | Notes |
|---------|-------------|-------|
| Tenant kill switch | Required before launch | Dangerous-zone control |
| Endpoint disable | Required before launch | Per-endpoint emergency control |
| Loop detection | Required before launch | Automatic detection and alert |
| Large payload rejection | Yes | Hard reject by plan limit |
| Signature failure handling | Planned | Alert and throttle, not permanent block |
| SSRF protection | Launch gate | Under review for launch readiness |

### Infrastructure

| Control | Implemented | Notes |
|---------|-------------|-------|
| Control plane / data plane separation | Yes | Three-plane architecture |
| Control plane not in runtime path | Yes | Events flow through data plane only |
| Multi-region data plane | Planned | Single entry point at launch; additional regions planned |
| Tenant soft delete | Yes | 7-day soft delete, purge within 30 days |

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

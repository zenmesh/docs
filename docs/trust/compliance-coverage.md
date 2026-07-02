---
sidebar_label: Compliance Coverage
---

# Customer Compliance Coverage

This page maps where Zen Mesh can help customers produce or organize evidence for compliance activities. It does **not** claim Zen Mesh is certified. It does **not** determine whether a customer is compliant. Customers remain responsible for their own policies, controls, scope, auditors, and compliance conclusions.

## Coverage Levels

| Level | Meaning |
|-------|---------|
| **Strong** | Zen Mesh directly generates evidence that maps to this control area |
| **Partial** | Zen Mesh contributes supporting evidence; customers may need additional measures |
| **Planned** | Evidence generation is in development or on the roadmap |
| **Not applicable** | This control area is outside Zen Mesh's scope |

## ISO/IEC 27001 / 27002

| Control / Area | Customer Objective | How Zen Mesh Helps | Evidence Source | Customer Responsibility | Zen Mesh Limitation | Coverage Level | Plan / Export Note |
|---|---|---|---|---|---|---|---|
| A.8.15 — Logging | Capture and review event logs | Delivery receipts, delivery status API, structured audit log | `TRUST-PROOF-003`, delivery status API | Configure logging retention per policy | Logs retained for plan-dependent period (7d Free, 30d Pro) | Strong | Export via API; S3 export planned for Business+ |
| A.8.16 — Monitoring | Detect anomalous activity | Webhook delivery monitoring, delivery status, circuit breaker alerts | Runtime proof ledger, delivery status API | Set up alerting on delivery failures | Monitoring is delivery-scoped, not infrastructure-scoped | Partial | |
| A.8.24 — Information transfer | Secure webhook payload delivery | mTLS enforcement, HMAC payload signing, TLS 1.3 | `TRUST-PROOF-006`, `TRUST-PROOF-003` | Customer-side mTLS configuration | mTLS requires agent deployment; HMAC covers payload integrity, not confidentiality | Strong | |
| A.9.4 — Access control | Restrict access to event data | API token authentication, tenant isolation, IP allowlisting | `TRUST-PROOF-001`, `TRUST-PROOF-002` | Token lifecycle management (rotation, revocation) | Tokens are customer-managed; Zen Mesh enforces at API layer | Strong | |
| A.10.1 — Change management | Track changes to delivery configuration | Flow versioning, draft/publish workflow, audit trail | Flow API, event history | Establish change approval process outside Zen Mesh | Zen Mesh tracks configuration changes; no external approval workflow | Partial | |
| A.12.3 — Backup | Retain evidence of event delivery | Delivery receipts retained per plan retention window | Delivery status API | Export evidence before retention expiry | Retention window is plan-dependent (7d–90d); no long-term archive | Partial | S3 export planned for Business+ |
| A.14.2 — Supplier monitoring | Monitor service provider delivery | Delivery receipts, status API, delivery status webhook | Delivery status API | Monitor Zen Mesh status page and delivery health | Zen Mesh is the supplier; customers monitor their own delivery flows | Partial | |

## SOC 2

| Control / Area | Customer Objective | How Zen Mesh Helps | Evidence Source | Customer Responsibility | Zen Mesh Limitation | Coverage Level | Plan / Export Note |
|---|---|---|---|---|---|---|---|
| CC3.x — Communication | Evidence of delivery for customer reporting | Delivery receipts, Merkle-anchored evidence ledger | Runtime proof ledger, Merkle integrity | Retain evidence for audit period | Evidence retention is plan-dependent | Strong | Export via API; S3 export planned |
| CC6.1 — Access control | Logical and physical access controls | API token auth, tenant isolation, mTLS between components | `TRUST-PROOF-001`, `TRUST-PROOF-002` | Manage API tokens, review access periodically | Token lifecycle is customer-managed | Strong | |
| CC6.x — Security monitoring | Monitor delivery security | HMAC payload signing, delivery receipts, anomaly detection | `TRUST-PROOF-003`, delivery status | Monitor delivery failures and signing mismatches | HMAC covers integrity, not delivery guarantee | Strong | |
| CC7.x — Change management | Track configuration changes | Flow versioning, draft/publish workflow, audit trail | Flow API, event history | Review configuration changes periodically | No external approval gate | Partial | |
| A1.2 — Availability | Service availability for delivery | Status page, delivery receipts confirm delivery | Status page, delivery receipts | Monitor availability; maintain backup delivery path | No formal SLA on Free/Pro plans | Partial | Active monitoring via status page |

## PCI DSS

| Control / Area | Customer Objective | How Zen Mesh Helps | Evidence Source | Customer Responsibility | Zen Mesh Limitation | Coverage Level | Plan / Export Note |
|---|---|---|---|---|---|---|---|
| 4.2.1 — Transmission security | Secure transmission of cardholder data | HMAC payload signing, TLS 1.3 transport, mTLS | `TRUST-PROOF-003`, implementation | Ensure cardholder data is not transmitted unencrypted | Zen Mesh provides transport security; customer controls data content | Strong | |
| 7.x — Access control | Restrict access to cardholder data environments | API token auth, IP allowlisting, tenant isolation | `TRUST-PROOF-001`, `TRUST-PROOF-002` | Scope CDE boundaries; restrict token permissions | Zen Mesh is not PCI assessed; customer must validate CDE boundaries | Strong | |
| 10.x — Logging | Track access to CDE | Delivery receipts, audit log, delivery status API | Delivery status API | Retain logs per PCI requirements | Log retention is plan-dependent | Strong | |
| 6.4.x — Change management | Track changes in CDE | Flow versioning, draft/publish workflow | Flow API, event history | Approve configuration changes outside Zen Mesh | No external approval workflow | Partial | |
| 1.x — Segmentation | Segment CDE from untrusted networks | Tenant isolation, mTLS component boundaries | `TRUST-PROOF-001`, trust lifecycle | Validate network segmentation in scope | Zen Mesh provides logical isolation; physical segmentation is customer-responsibility | Planned | Segmentation evidence is planned for v1.1+ |

**PCI DSS important note:** These mappings describe evidence that may support a PCI assessment. Zen Mesh is not PCI assessed or validated. Customers must not rely on Zen Mesh as the sole control for PCI compliance. A full PCI assessment requires a QSA and scope validation.

## NIST Cybersecurity Framework (CSF)

| Control / Area | Customer Objective | How Zen Mesh Helps | Evidence Source | Customer Responsibility | Zen Mesh Limitation | Coverage Level |
|---|---|---|---|---|---|---|
| ID.AM — Asset management | Identify delivery flows and components | Flow inventory, endpoint configuration, destination registry | Flow API, deployment config | Maintain inventory of external destinations | Zen Mesh maps flows; customer maps full attack surface | Partial |
| PR.AC — Access control | Restrict delivery configuration | API token auth, tenant isolation, IP allowlisting | `TRUST-PROOF-001`, `TRUST-PROOF-002` | Manage credentials, review access | Token lifecycle is customer-managed | Strong |
| PR.DS — Data security | Protect delivery payloads | TLS 1.3, mTLS, HMAC payload signing | `TRUST-PROOF-003`, `TRUST-PROOF-006` | Encrypt payloads at rest if required | Payload encryption in transit; at-rest is customer responsibility | Strong |
| PR.IP — Information protection | Configuration change management | Flow versioning, draft/publish workflow | Flow API, event history | Implement external change approval | No external approval workflow | Partial |
| DE.CM — Continuous monitoring | Monitor delivery health | Delivery status, circuit breaker, delivery receipts | Runtime proof ledger | Monitor alerts and delivery failures | Monitoring is delivery-scoped | Partial |
| RS.CO — Response communication | Evidence for incident response | Delivery receipts, audit log, Merkle integrity | Delivery status API, Merkle ledger | Include Zen Mesh evidence in IR plan | Evidence is delivery-scoped; no SIEM integration | Partial |

## CIS Controls

| Control / Area | Customer Objective | How Zen Mesh Helps | Evidence Source | Customer Responsibility | Zen Mesh Limitation | Coverage Level |
|---|---|---|---|---|---|---|
| 8 — Audit log management | Retain and review delivery audit logs | Delivery receipts, delivery status API, structured audit log | Delivery status API | Export logs to SIEM or audit system | Log retention is plan-dependent | Strong |
| 6 — Access control | Restrict access to delivery management | API token auth, IP allowlisting, tenant isolation | `TRUST-PROOF-001`, `TRUST-PROOF-002` | Token lifecycle management | Tokens are customer-managed | Strong |
| 4 — Secure configuration | Maintain secure delivery configuration | Flow templates, default secure configs, draft validation | Flow API, security docs | Review and approve configuration changes | Configuration is customer-managed | Strong |
| 12 — Service provider management | Monitor service provider delivery | Status page, delivery receipts, SLAs | Status page, delivery receipts | Monitor Zen Mesh status and performance | No formal SLA on Free/Pro | Partial |
| 7 — Vulnerability management | Remediate vulnerabilities | Dependency scanning, secure build pipeline | Security docs, vulnerability policy | Keep agent software updated | Vulnerability scanning covers Zen Mesh components | Partial |

## Non-Claims

- Zen Mesh is not SOC 2, ISO 27001, PCI DSS, HIPAA, or FedRAMP certified.
- Zen Mesh does not determine whether a customer is compliant with any framework.
- Mappings are technical capability indicators only. Evidence is local/mock or validated on specific environments unless stated otherwise.
- Customers must engage their own auditors, compliance teams, and legal counsel.

## Related

- [Trust Overview](./index)
- [Evidence](./evidence)
- [Security](/docs/security/)
- [Non-Claims](/docs/evidence/non-claims)
- [Current Status](/docs/start-here/current-status)

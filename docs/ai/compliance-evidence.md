---
sidebar_label: Compliance Evidence
---

# Compliance Evidence

The following mappings connect Zen Mesh technical features to compliance framework controls. Each mapping uses the relationship **"supports"** or **"maps_to"** — none claim certification, authorization, or formal compliance.

> **Important:** Zen Mesh is not PCI compliant, not HIPAA compliant, not FedRAMP authorized, not SOC 2 certified, and not ISO certified. These mappings describe technical capability support, not compliance status.

## Feature-to-Control Graph

| Feature | Security Property | Framework | Control | Relationship | Evidence |
|---|---|---|---|---|---|
| HMAC payload signing | Integrity | PCI-DSS v4.0 | 4.2.1 | supports | TRUST-PROOF-003 |
| HMAC payload signing | Integrity | NIST SP 800-53 | SC-8 | supports | TRUST-PROOF-003 |
| HMAC payload signing | Integrity | NIST SP 800-53 | SC-13 | supports | TRUST-PROOF-003 |
| HMAC payload signing | Integrity | SOC2 TSC | CC6.x | maps_to | TRUST-PROOF-003 |
| mTLS cert rejection | Authenticated transport | NIST SP 800-53 | SC-8 | supports | TRUST-PROOF-006 |
| mTLS cert rejection | Authenticated transport | NIST SP 800-53 | SC-23 | supports | TRUST-PROOF-006 |
| mTLS cert rejection | Authenticated transport | ISO 27001:2022 | A.8.24 | maps_to | TRUST-PROOF-006 |
| Enrollment rejection | Access control | NIST SP 800-53 | IA-2 | supports | TRUST-PROOF-001,002 |
| Enrollment rejection | Access control | NIST SP 800-53 | AC-3 | supports | TRUST-PROOF-001,002 |
| Enrollment rejection | Access control | SOC2 TSC | CC6.1 | maps_to | TRUST-PROOF-001,002 |
| ZenLock ciphertext | Secret management | NIST SP 800-53 | SC-12 | supports | TRUST-PROOF-005 |
| ZenLock ciphertext | Secret management | NIST SP 800-53 | SC-13 | supports | TRUST-PROOF-005 |
| ZenLock ciphertext | Secret management | ISO 27001:2022 | A.10.1 | maps_to | TRUST-PROOF-005 |
| Evidence ledger/Integrity | Audit trail | SOC2 TSC | CC3.x | maps_to | Runtime evidence pack |
| Evidence ledger/Integrity | Audit trail | NIST SP 800-53 | AU-2 | supports | Runtime evidence pack |
| Failover | Resilience | NIST SP 800-53 | CP-2 | maps_to | PROOF-009 |
| DLQ/retry | Error handling | NIST SP 800-53 | SI-4 | maps_to | PROOF-003 |
| TLS 1.3 transport | Encryption in transit | PCI-DSS v4.0 | 4.2.1 | supports | Implementation |
| mTLS workload identity | Authentication | NIST SP 800-53 | IA-5 | supports | TRUST-PROOF-004 |

## Full Machine-Readable Map

The complete compliance graph is available at:

```
/ai/evidence/../ai/evidence-v1-supersession.md#compliance-map
```

Each entry includes framework, control_id, control_title, relationship, claim_status, evidence_refs, and a disclaimer note.

## Framework Coverage

| Framework | Mapped Controls |
|---|---|
| **NIST SP 800-53 Rev5** | AC-3, AU-2, CP-2, IA-2, IA-5, SC-8, SC-12, SC-13, SC-23, SI-4 |
| **SOC2 TSC (2023)** | CC3.x, CC6.x, CC6.1, CC7.x |
| **ISO/IEC 27001:2022** | A.8.24, A.10.1 |
| **PCI-DSS v4.0** | 4.2.1 |
| **HIPAA Security Rule** | §164.312(a)(1) (access control), §164.312(e)(1) (transmission security) — mapped as supports only |

## Non-Claims

- Not PCI compliant or validated
- Not HIPAA compliant or BAA-covered
- Not FedRAMP authorized
- Not SOC 2 certified or audited
- Not ISO certified
- Mappings are technical capability indications only
- Evidence is local/mock only unless stated otherwise

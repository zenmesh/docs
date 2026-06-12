---
sidebar_label: Data Processing Agreement
description: Data Processing Agreement for Zen Mesh — draft placeholder pending legal review. Not effective until published as final.
---

# Data Processing Agreement

> **⚠ DRAFT — PENDING LEGAL REVIEW. NOT EFFECTIVE.**
>
> This document is a draft prepared for Leonardo's review. It does not constitute
> a binding Data Processing Agreement. The final DPA will be published before
> public signup opens.

## Draft Content for Review

### Purpose and Scope

This DPA governs Zen Mesh's processing of customer personal data in connection
with the provision of the Service. It supplements the Terms of Service and
Privacy Policy.

### Processing Details

- **Data processor:** Zen Mesh (contact: support@zen-mesh.io)
- **Data controller:** The customer
- **Nature of processing:** Webhook ingestion, validation, delivery, storage, and operations
- **Categories of data subjects:** End users whose data is contained in webhook payloads
- **Types of personal data:** As determined by the customer's use of the Service (webhook payload content may contain personal data depending on customer configuration)
- **Duration of processing:** For the duration of the customer's use of the Service, plus retention periods as described in the Data Handling documentation

### Sub-processors

| Sub-processor | Purpose | Location |
|---------------|---------|----------|
| Google Cloud Platform (GCP) | Cloud infrastructure and hosting | Toronto, Canada (primary); planned EU/APAC |
| Stripe | Payment processing | Various (Stripe infrastructure) |

Sub-processors may be updated with notice to the customer.

### Data Subject Rights

Zen Mesh will assist the customer in fulfilling data subject rights requests
(access, correction, deletion, restriction, portability) within a reasonable
timeframe and in accordance with applicable law.

### Security Measures

Technical and organizational security measures are described in the
[Security Overview](/docs/security/). These include encryption at rest and
in transit, tenant isolation via Row-Level Security, access controls, and
audit logging.

### International Transfers

Personal data may be processed in Canada and the United States. Customers
requiring EU data processing should contact us — EU data plane is planned
but not yet available.

### Breach Notification

Zen Mesh will notify the customer of a personal data breach without undue
delay after becoming aware of it, providing available details about the
nature, scope, and remediation of the breach.

### Return and Deletion of Data

Upon termination of the Service, customer personal data is handled per the
retention and deletion policies described in the [Data Handling](/docs/start-here/data-handling)
documentation.

### Intended Availability

| Customer Type | DPA Available |
|---------------|---------------|
| **Pro** | Available by request |
| **Enterprise** | Included in engagement |
| **Free** | Not available on Free plan |

### Requesting a DPA

Contact [support@zen-mesh.io](mailto:support@zen-mesh.io?subject=DPA%20request)
with subject "DPA request" and include your tenant ID, company name, jurisdiction,
and any specific requirements.

---

*This is a draft prepared for review. Final DPA terms will be confirmed individually.*

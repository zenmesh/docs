---
sidebar_label: Security Model
description: Zen Mesh security architecture — three-plane model, mTLS, HMAC, tenant isolation, evidence, and claim transparency.
---

# Security Model

Zen Mesh is built on a three-plane architecture designed to keep the control plane out of your runtime event path.

## Three-Plane Architecture

### Control Plane — Toronto / GCP

Billing, configuration, user management, and the API gateway. The control plane does **not** sit in the runtime event delivery path. The SaaS control plane runs on Google Cloud Platform in Toronto.

### Data Plane — Entry Point

Webhook ingestion, routing, and delivery. This is where your events flow. The entry point provider and region will be confirmed before launch. Additional data plane locations are planned.

### Edge / Agent — Your Infrastructure

The zen-agent runs in your environment, receiving events behind your firewall. You control the agent deployment.

## Security Controls

### mTLS and Internal Identity

Service-to-service communication within Zen Mesh uses mutual TLS (mTLS). Identity is managed through SPIFFE/SPIRE, providing cryptographic workload identity rather than shared secrets.

### HMAC Verification

Webhook payloads are signed with HMAC-SHA256. Recipients can verify payload integrity and authenticity before processing. The signing key is unique to your tenant.

### Tenant Isolation

Each tenant operates in an isolated context:

- Row-level security in the data layer prevents cross-tenant data access
- Configuration and credentials are scoped per tenant
- API keys are scoped to a single tenant
- Labels and RBAC policies provide additional access boundaries

### Evidence and Audit Model

Every delivery attempt generates an evidence record:

- Timestamped with delivery status and target response
- Labeled with associated resource labels for attribution
- Tamper-evident — evidence integrity can be verified
- Searchable and filterable by labels
- Labels are snapshotted at event time for evidence accuracy

### Labels in Evidence

Labels attached to resources are propagated to evidence records. This enables:

- Filtering evidence by team, project, or other customer-defined dimensions
- RBAC scoping — users see only evidence for resources they can access
- Billing attribution — delivery costs attributed by label dimensions

### Secret Redaction

Secrets and credentials are managed through ZenLock, an encrypted secret store:

- Secrets are encrypted at rest using AGE encryption
- Secrets are redacted from logs, evidence, and API responses
- Plain-text secrets are never persisted outside the encrypted store
- Secret rotation does not require service restart

### Target URL Protection

Target URLs are validated and stored securely. SSRF protection is tracked as a launch gate. Additional launch hardening is in progress.

## Claim Transparency

We are transparent about what we do and do not claim. The following are **goals**, not current capabilities:

- Guaranteed delivery
- Exactly-once semantics
- SOC 2, GDPR, ISO, PCI, HIPAA, or FedRAMP certification
- Data residency for any specific jurisdiction beyond documented hosting

For a detailed mapping of trust controls and compliance status, see [Trust Controls & Compliance Mapping](/docs/security/trust-controls).

## What we do not claim

- We do not claim "production-ready" as a blanket assertion.
- "Enterprise-grade" refers to specific architectural features (RBAC/ABAC controls, three-plane isolation), not a broad enterprise-readiness claim.
- "Zero-trust" is used as scoped architecture language with transparency about current implementation status.
- We do not claim "no payload touches SaaS" unless backed by evidence of the exact architecture path.
- "Control plane never in runtime event path" is tied to the three-plane model and evidence-backed.

## See also

- [Trust Controls & Compliance Mapping](/docs/security/trust-controls) — control status for SOC 2, GDPR, ISO, PCI, HIPAA, FedRAMP
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, payload access
- [Labels](/docs/guides/labels) — label namespaces and RBAC/ABAC
- [Tenant Isolation](/docs/security/tenant-isolation) — row-level security and isolation model
- [Responsible Disclosure](https://zen-mesh.io/security-disclosure) — security reporting

---
sidebar_label: Security Model
description: Zen Mesh security architecture — three-plane model, mTLS, HMAC, tenant isolation, evidence, and claim transparency.
---

# Security Model

Zen Mesh is built on a three-plane architecture designed to keep the control plane out of your runtime event path.

## Three-Plane Architecture

### Control Plane — Canada

Billing, configuration, user management, and the API gateway. The control plane does **not** sit in the runtime event delivery path.

### Data Plane — Entry Point (AWS us-east-1)

Webhook ingestion, routing, and delivery. This is where your events flow. Currently available in AWS us-east-1.

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

### Labels in Evidence

Labels attached to resources are propagated to evidence records. This enables:

- Filtering evidence by team, project, or environment
- RBAC scoping — users see only evidence for resources they can access
- Billing attribution — delivery costs attributed by label dimensions

### Secret Redaction

Secrets and credentials are managed through ZenLock, an encrypted secret store:

- Secrets are encrypted at rest using AGE encryption
- Secrets are redacted from logs, evidence, and API responses
- Plain-text secrets are never persisted outside the encrypted store
- Secret rotation does not require service restart

### Target URL Protection

Target URLs are validated and stored securely. SSRF protection is implemented as a security control. Additional launch hardening is in progress.

## Claim Transparency

We are transparent about what we do and do not claim. The following are **goals**, not current capabilities:

- Guaranteed delivery
- Exactly-once semantics
- SOC 2 certification
- HIPAA compliance
- PCI compliance
- Zero-trust completion
- Launch-ready status
- Production-live status
- SLA readiness

We track these internally and will update this documentation as they are achieved.

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

- Email [support@zen-mesh.io](mailto:support@zen-mesh.io) with "Security" in the subject line
- Do not post vulnerabilities publicly before we have responded
- See our [Responsible Disclosure page](https://zen-mesh.io/security-disclosure) for full guidelines

## See also

- [Data Handling](/docs/start-here/data-handling) — retention, encryption, and access policy
- [Geography](/docs/start-here/geography) — where your data is processed
- [Labels](/docs/guides/labels) — label-powered RBAC and evidence
- [Tenant Isolation](/docs/security/tenant-isolation) — isolation model details

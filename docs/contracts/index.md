---
sidebar_label: Launch Contracts Index
description: Central index of Zen Mesh launch contracts — status matrices for providers, data planes, targets/fan-out, payload access, compliance mapping, and open launch decisions.
---

# Launch Contracts Index

This is the central index of Zen Mesh's **contract-first launch architecture decisions**. Each contract defines V1 behavior, planned/future capabilities, and open design tensions.

## Contracts

| Contract | Status | V1 Scope |
|----------|--------|----------|
| [Multi-Target Delivery](./multi-target-delivery) | V1 | Multi-destination webhook delivery with per-destination policies, failure isolation, evidence per destination |
| [Object-Store Fan-Out](./object-store-fan-out) | Launch target | S3-compatible object-store fan-out — contract-defined, NOT V1. No runtime proof yet. |
| [Payload Encryption, Replay & DLQ](./payload-encryption-replay-dlq) | V1 | Encrypted tenant-scoped payloads, staff-no-access default, service-scoped audited runtime keys |
| [Tenant Key Management](./tenant-key-management) | V1 | Zen-managed per-tenant envelope keys, purpose-audited decrypt, BYOK planned |
| [Support Payload Access](./support-payload-access) | V1 | Customer-authorized time-bounded payload access, metadata-first operations |
| [Data-Plane Selection](./data-plane-selection) | V1 | Single entry point at launch (GCP Toronto), multi-region planned, plane label reserved |
| [Evidence Export](./evidence-export) | V1 | Evidence export by plan — Free UI-only, Pro API+bulk, retention per plan |
| [Open Launch Decisions](./open-launch-decisions) | Living | Open decisions requiring resolution — legal, entry point, BYOK, support channels, pricing |
| [Legal Launch Checklist](./legal-launch-checklist) | Preparation | Legal readiness items: Terms, Privacy, AUP, DPA, Cookie, refund, deletion/export, billing |
| [Entry Point Decision Prep](./entry-point-decision) | Preparation | Decision preparation for first data-plane entry point provider and region |
| [Support Channels Decision Prep](./support-channels-decision) | Preparation | Decision preparation for support channels, security mailbox, and staffing |
| [Object-Store Runtime Status](./object-store-runtime-status) | Preparation | Contract vs runtime gap for object-store fan-out — S3-compatible, GCS, Wasabi |
| [Launch Readiness Gap-to-Action](./launch-readiness-gap-to-action) | Preparation | Index of remaining launch blockers classified by type — decision, implementation, runtime proof, legal review, support ops |
| [Customer Onboarding Pack](./customer-onboarding-pack) | Preparation | Public signup flow, first project checklist, provider selection, data-plane selector, route setup, upgrade path, overage cap |
| [Support Center D1 Spec](./support-center-d1-spec) | Preparation | Support form fields, channels, FAQ, payload grant flow, security mailbox |
| [Billing and Overage Launch Contract](./billing-overage-launch) | V1 | Pro pricing, Free hard stop, Pro overage opt-in cap, failed payment, overrides, Stripe integration |
| [Runtime Proof Checklist](./runtime-proof-checklist) | Preparation | Delivery, security, entitlement, and provider validation gates |
| [First-Customer Rehearsal Checklist](./first-customer-rehearsal) | Preparation | Pre-launch walkthrough — signup, source/target/route, test event, upgrade, support, evidence, deletion |
| [Draft Branch Merge Checklist](./draft-branch-merge-checklist) | Preparation | Pre-merge review — legal, claims, builds, links, approvals |
| [PR & Merge Readiness](./pr-merge-readiness) | Preparation | Expanded merge blocker checklist — legal review, entry-point decision, support channels, object-store runtime, rollback plan |
| [Internal vs Public Distinction](./internal-public-distinction) | Preparation | Conventions for separating internal launch gates from public-facing contracts |
| [Support Templates](./support-templates) | Preparation | Customer-facing support templates — incident, billing, provider, delivery, payload sharing, refund, deletion/export |
| [Support Safe Payload Handling](./support-safe-payload-handling) | Preparation | Safe payload handling checklist — never paste secrets, redaction, authorization, audit |
| [Onboarding Happy and Failure Paths](./onboarding-paths) | Preparation | Onboarding guides with happy path and failure path scenarios — signup through support |
| [Launch Rehearsal Scorecard](./launch-rehearsal-scorecard) | Preparation | Rehearsal scorecard — pass/fail/blocked, owner, evidence link, customer impact, launch blocker flag |
| [Public Trust FAQ](./public-trust-faq) | Preparation | FAQ about trust claims — no certification, what evidence means, what payload access means, what is not yet live |

## Provider Status Matrix

| Provider | Launch Status | Notes |
|----------|---------------|-------|
| **Stripe** | Supported at launch | Signature verification, event type filtering, private network delivery |
| **GitHub** | Supported at launch | HMAC verification, event routing, private network delivery |
| **Custom Webhook** | Supported at launch | Configurable header validation, IP allowlisting, HMAC, private network delivery |
| **Shopify** | Launch target | Connector validation in progress. Not available at launch. |
| **Twilio** | Launch target | Connector validation in progress. Not available at launch. |
| GitLab, Alipay, others | Roadmap | No implementation commitment. Provider adapter model supports expansion. |

Provider docs: [Stripe](/docs/guides/stripe), [GitHub](/docs/guides/github), [Custom Webhook](/docs/guides/custom-webhooks), [Shopify](/docs/guides/shopify) (launch target), [Twilio](/docs/guides/twilio) (launch target).

## Data-Plane Matrix

| Component | Location | Status |
|-----------|----------|--------|
| **SaaS control plane** | Toronto, Canada / GCP (`northamerica-northeast2`) | Live at launch |
| **Data-plane entry point** | TBD — provider and region to be confirmed at launch | Open decision |
| **EU data plane** | Planned | Future |
| **APAC data plane** | Planned | Future |

- Label: `zen-mesh.io/plane` is the reserved system label for data-plane affinity.
- **No data residency claim at launch** — single entry point only.

See [Data-Plane Selection Contract](./data-plane-selection) and [Geography](/docs/start-here/geography).

## Target / Fan-Out Matrix

| Target Type | V1 Status | Notes |
|-------------|-----------|-------|
| **Webhook / HTTP** | V1 | Public HTTP + private network (egress relay). Proven target type. |
| **Object store (S3-compatible)** | Launch target | Contract-defined. NOT V1. See [Object-Store Fan-Out Contract](./object-store-fan-out). |
| K8s CRD target | Internal only | Not public-surfaced until after public launch. |
| GCS, Wasabi, Azure Blob | Roadmap | No implementation commitment. |
| NATS, MQ, Slack | Roadmap | No implementation commitment. |

Planned: Multi-type delivery to multiple target types at once (webhook + object store + future adapters). See [Multi-Target Delivery Contract](./multi-target-delivery).

## Payload Access Matrix

| Access Level | V1 Behavior | Notes |
|-------------|-------------|-------|
| **Metadata** | Default access | Delivery status, timestamps, labels, event types, HTTP status codes. Support can see these without authorization. |
| **Encrypted payload at rest** | V1 | Tenant-scoped. Zen-managed per-tenant envelope keys. Service-scoped runtime access only for delivery, replay, DLQ, or customer-authorized actions. |
| **Support view of raw payloads** | No default access | Explicit customer authorization per request. Time-bounded, audited. Staff cannot browse raw payloads. |
| **Customer view of own payload** | V1 | Via dashboard or API — depends on plan evidence export configuration. |
| **Replay access** | V1 | Service-scoped key used for replay and DLQ redrive. Customer-initiated. |
| **DLQ access** | V1 | Service-scoped key used for DLQ operations. Customer-initiated. |
| **BYOK / Zen-cannot-decrypt** | Future (Business+) | Requires customer-side replay architecture. Not V1. |

- **V1 promise:** Level 1 only: staff-no-access by default, metadata-first, encrypted tenant-scoped payloads, service-scoped audited runtime access.
- Raw payloads NEVER appear in operational logs.
- See [Payload Encryption, Replay & DLQ Contract](./payload-encryption-replay-dlq), [Tenant Key Management Contract](./tenant-key-management), [Support Payload Access Contract](./support-payload-access).

## Compliance Mapping Status

| Framework | Status | Taxonomy |
|-----------|--------|----------|
| **SOC 2** | Planned | planned |
| **GDPR** | Partial | partial |
| **ISO 27001** | Planned | planned |
| **PCI DSS** | Not applicable | not_applicable |
| **HIPAA** | Not applicable | not_applicable |
| **FedRAMP** | Not applicable | not_applicable |

**Taxonomy:** proven, partial, failed, planned, not_applicable, superseded.

See [Trust Controls & Compliance Mapping](/docs/security/trust-controls) for detailed control mapping. Zen Mesh is not certified under any framework.

## See Also

- [Provider Guides](/docs/guides/sources) — set up webhook sources
- [Security Overview](/docs/security/) — three-plane architecture
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, access policy
- [Plans & Limits](/docs/start-here/limits) — resource limits and billing
- [Support](/docs/start-here/support) — support channels by plan
- [Labels Platform](/docs/guides/labels) — label namespaces and RBAC/ABAC
- [Getting Started](/docs/getting-started/quick-start) — onboarding guides
- [Legal](/docs/legal/terms-of-service) — terms, privacy, AUP, DPA, cookie policy (drafts — not effective)

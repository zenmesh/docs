---
sidebar_label: ProviderFlow Index
---

# ProviderFlow Documentation

ProviderFlow is the canonical documentation for webhook provider integration,
package lifecycle, and validation evidence.

## Getting Started

- [Overview](./overview) — What is ProviderFlow
- [Package Contract](./package-contract) — Package schema and required fields
- [YAML/DAG Contract](./yaml-dag-contract) — Endpoints, targets, flows
- [Package Validation](./package-validation) — Sandbox, evidence, revalidation
- [Security Model](./security-model) — Auth, secret redaction, contract enforcement
- [Fixtures, Goldens, Traces](./fixtures-goldens-traces) — Validation artifacts

## Provider Packages

- [Stripe v2](./packages/stripe-v2) — GA maturity
- [GitHub v2](./packages/github-v2) — GA maturity
- [Shopify v2](./packages/shopify-v2) — Preview maturity
- [Twilio v2](./packages/twilio-v2) — Preview maturity
- [Doppler (internal)](./packages/doppler-internal)
- [GitLab (internal)](./packages/gitlab-internal)
- [Terraform Cloud (internal)](./packages/terraform-cloud-internal)

## Lifecycle & Readiness

- [Provider Package Lifecycle](./provider-package-lifecycle) — Maturity, billing, quality gates
- [Provider Package V1 Readiness Matrix](./provider-package-v1-readiness-matrix) — Per-provider gap tracking

## Post-Cloud Validation

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview) — Scope, rules, sequence
- [Stripe Post-Cloud Validation Runbook](./stripe-post-cloud-validation-runbook)
- [GitHub Post-Cloud Validation Runbook](./github-post-cloud-validation-runbook)
- [Shopify Post-Cloud Validation Runbook](./shopify-post-cloud-validation-runbook)
- [Twilio Post-Cloud Validation Runbook](./twilio-post-cloud-validation-runbook)
- [Provider Test Account Checklist](./provider-test-account-checklist)

## Evidence Templates

- [Stripe Live Validation Evidence Template](./evidence-templates/stripe-live-validation-evidence-template)
- [GitHub Live Validation Evidence Template](./evidence-templates/github-live-validation-evidence-template)
- [Shopify Live Validation Evidence Template](./evidence-templates/shopify-live-validation-evidence-template)
- [Twilio Live Validation Evidence Template](./evidence-templates/twilio-live-validation-evidence-template)
- [Validation Evidence Schema (JSON)](./evidence-templates/provider-live-validation-evidence.schema.json)

## Policy

- [Known Nonclaims](./nonclaims) — What ProviderFlow does not provide
- [Template Packs](./template-packs) — Stripe, GitHub, Shopify, Twilio templates

## Related

- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix) — Canonical launch readiness state
- [Runbooks](../runbooks) — Operational procedures
- [Evidence Overview](../evidence/overview) — Evidence index and validation map
- [Canonical Docs Map](../README_CANONICAL_DOCS_MAP) — Full canonical index
- [Evidence Index](/docs/zen-mesh/evidence/evidence-index) — Evidence classification by area

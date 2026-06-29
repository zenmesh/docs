---
sidebar_label: Post-Cloud Validation Overview
---

# Post-Cloud Provider Validation Overview

After the control plane and data plane are deployed to a publicly reachable cloud
endpoint, each V1 provider must pass a post-cloud live validation before its live
E2E status can be upgraded from `cloud_gated` / `credential_gated` to
`live_validated`. This page defines the scope, prerequisites, and rules for that
validation pass.

## Scope

Four V1 providers require post-cloud live validation:

| Provider | Current Status | Post-Cloud Action |
|----------|---------------|-------------------|
| Stripe | `cloud_gated` | Revalidate with live credentials against prod cloud |
| GitHub | `cloud_gated` | First-time live validation against prod cloud |
| Shopify | `cloud_gated` | First-time live validation against prod cloud |
| Twilio | `cloud_gated` | First-time live validation against prod cloud |

## Prerequisites

All four validations share the following prerequisites:

1. **Public cloud endpoint deployed** — Control plane reachable at a public URL.
2. **Live provider test accounts** — For each provider, an account at the minimum
   tier that permits webhook event generation and webhook configuration.
3. **Provider webhook secrets** — HMAC signing secrets, auth tokens, or API keys
   for signature verification.
4. **Leonardo creates test accounts** — Leonardo provisions accounts after
   production cloud deploy (see [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)).
5. **No live credentials in docs** — Credential placeholders only (`sk_test_...`,
   `ghp_...`, etc.).

## Validation Rules

### Status Rules

- Each provider's `live_e2e_status` remains `cloud_gated` until all validation
  steps pass with captured evidence.
- `public_launch_status` remains `NO_GO` regardless of individual provider
  live validation results.
- `maturity=verified` is preserved — it reflects local/contract verification,
  not live E2E status.

### Publication Rules

- Validation evidence must be captured and stored before any status change.
- Evidence artifacts must include timestamps, provider identifiers, test
  parameters, and pass/fail outcomes.
- Forbidden claims apply to all post-cloud validation output (see
  [V1 Live Truth Matrix](../launch/v1-live-truth-matrix#public-claim-policy)).

### Forbidden Claims During Validation

The following must not appear in any validation artifact, evidence template,
runbook, or public surface:

- "Providers are live validated" — not until ALL four pass.
- "Public launch GO" — remains NO_GO until all launch gates pass.
- "Provider Registry is GA" — GA not claimed.
- "Free is evaluation-only / dev-only / not for production use" — incorrect framing.

## Validation Sequence

```
1. Deploy control plane to public cloud endpoint
2. Leonardo creates test accounts per provider
3. Per-provider validation (see runbooks):
   a. Positive: send real webhook → verify delivery + signature
   b. Negative: invalid signature → verify rejection
   c. Negative: malformed payload → verify graceful handling
   d. Evidence capture → store in 80-EVIDENCE/
4. Aggregate evidence → update truth matrix status
5. Publication review → update AI surfaces / llms.txt
```

## Related Runbooks

- [Stripe Post-Cloud Validation Runbook](./stripe-post-cloud-validation-runbook)
- [GitHub Post-Cloud Validation Runbook](./github-post-cloud-validation-runbook)
- [Shopify Post-Cloud Validation Runbook](./shopify-post-cloud-validation-runbook)
- [Twilio Post-Cloud Validation Runbook](./twilio-post-cloud-validation-runbook)
- [Provider Test Account Checklist](./provider-test-account-checklist)

## Related Docs

- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix) — Canonical launch readiness state
- [Provider Package V1 Readiness Matrix](./provider-package-v1-readiness-matrix) — Per-provider gap tracking
- [Stripe Validation Evidence Template](./evidence-templates/stripe-live-validation-evidence-template) — Stripe evidence capture template
- [GitHub Validation Evidence Template](./evidence-templates/github-live-validation-evidence-template) — GitHub evidence capture template
- [Shopify Validation Evidence Template](./evidence-templates/shopify-live-validation-evidence-template) — Shopify evidence capture template
- [Twilio Validation Evidence Template](./evidence-templates/twilio-live-validation-evidence-template) — Twilio evidence capture template

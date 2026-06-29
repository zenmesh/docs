---
sidebar_label: V1 Live Evidence Index
---

# V1 Live Evidence Index

Evidence artifacts required for post-cloud provider validation. All artifacts
are stored under `docs/80-EVIDENCE/public-docs/`.

## Stripe

| Artifact | Path Pattern | Status |
|----------|-------------|--------|
| Delivery log | `stripe-post-cloud-YYYYMMDD/delivery-log.json` | Pending |
| Validation evidence | `stripe-post-cloud-YYYYMMDD/validation-evidence.json` | Pending |
| Manual verify output | `stripe-post-cloud-YYYYMMDD/manual-verify-output.json` | Pending |
| Negative: invalid sig | `stripe-post-cloud-YYYYMMDD/negative-invalid-sig.json` | Pending |
| Negative: missing sig | `stripe-post-cloud-YYYYMMDD/negative-missing-sig.json` | Pending |
| Negative: unknown event | `stripe-post-cloud-YYYYMMDD/negative-unknown-event.json` | Pending |
| Summary | `stripe-post-cloud-YYYYMMDD/README.md` | Pending |

## GitHub

| Artifact | Path Pattern | Status |
|----------|-------------|--------|
| Delivery log | `github-post-cloud-YYYYMMDD/delivery-log.json` | Pending |
| Validation evidence | `github-post-cloud-YYYYMMDD/validation-evidence.json` | Pending |
| Manual verify output | `github-post-cloud-YYYYMMDD/manual-verify-output.json` | Pending |
| Negative: invalid sig | `github-post-cloud-YYYYMMDD/negative-invalid-sig.json` | Pending |
| Negative: missing sig | `github-post-cloud-YYYYMMDD/negative-missing-sig.json` | Pending |
| Negative: missing event | `github-post-cloud-YYYYMMDD/negative-missing-event.json` | Pending |
| Summary | `github-post-cloud-YYYYMMDD/README.md` | Pending |

## Shopify

| Artifact | Path Pattern | Status |
|----------|-------------|--------|
| Delivery log | `shopify-post-cloud-YYYYMMDD/delivery-log.json` | Pending |
| Validation evidence | `shopify-post-cloud-YYYYMMDD/validation-evidence.json` | Pending |
| Manual verify output | `shopify-post-cloud-YYYYMMDD/manual-verify-output.json` | Pending |
| Negative: invalid sig | `shopify-post-cloud-YYYYMMDD/negative-invalid-sig.json` | Pending |
| Negative: missing sig | `shopify-post-cloud-YYYYMMDD/negative-missing-sig.json` | Pending |
| Negative: unknown topic | `shopify-post-cloud-YYYYMMDD/negative-unknown-topic.json` | Pending |
| Summary | `shopify-post-cloud-YYYYMMDD/README.md` | Pending |

## Twilio

| Artifact | Path Pattern | Status |
|----------|-------------|--------|
| Delivery log | `twilio-post-cloud-YYYYMMDD/delivery-log.json` | Pending |
| Validation evidence | `twilio-post-cloud-YYYYMMDD/validation-evidence.json` | Pending |
| Manual verify output | `twilio-post-cloud-YYYYMMDD/manual-verify-output.json` | Pending |
| Negative: invalid sig | `twilio-post-cloud-YYYYMMDD/negative-invalid-sig.json` | Pending |
| Negative: missing sig | `twilio-post-cloud-YYYYMMDD/negative-missing-sig.json` | Pending |
| Negative: bad content-type | `twilio-post-cloud-YYYYMMDD/negative-invalid-content-type.json` | Pending |
| Summary | `twilio-post-cloud-YYYYMMDD/README.md` | Pending |

## Status Drop Rules

- `Pending` → `Collected` when validation runs and artifact is stored
- `Collected` → `Verified` when claim guard check passes
- `Verified` → `Published` when evidence passes publication review

No `Published` status change permitted while `public_launch=NO_GO`.

## Related

- [V1 Live Truth Matrix](./v1-live-truth-matrix)
- [Post-Cloud Provider Validation Overview](../providerflow/post-cloud-provider-validation-overview)
- [Validation Evidence Schema](../providerflow/evidence-templates/provider-live-validation-evidence.schema.json)

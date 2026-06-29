---
sidebar_label: Stripe Validation Evidence Template
---

# Stripe Live Validation Evidence Template

Use this template to record evidence artifacts from Stripe post-cloud validation.
Fill out each section after completing the corresponding validation step.

## Metadata

| Field | Value |
|-------|-------|
| Provider | Stripe |
| Validation date | `<!-- DATE-YYYY-MM-DD -->` |
| Cloud endpoint | `<!-- CLOUD-ENDPOINT-URL -->` |
| Stripe account type | `test` / `live` |
| Stripe account ID | `acct_<!-- ... -->` |
| Stripe webhook endpoint ID | `we_<!-- ... -->` |
| Validator | `<!-- NAME -->` |
| Platform version | `<!-- COMMIT-SHA or VERSION -->` |
| Overall result | `PASS` / `FAIL` |

## Positive Test — Webhook Delivery

| Check | Result | Evidence ref |
|-------|--------|-------------|
| Event triggered via Stripe API | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/delivery-log.json` |
| Event type matches triggered event | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/delivery-log.json` |
| Delivery status = delivered | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/delivery-log.json` |
| Timestamp within 60s of trigger | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/delivery-log.json` |

## Signature Validation

| Check | Result | Evidence ref |
|-------|--------|-------------|
| Stripe-Signature header present | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/validation-evidence.json` |
| Platform signature verification = valid | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/validation-evidence.json` |
| Manual re-verification matches | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/manual-verify-output.json` |
| `t=` timestamp within skew | `PASS` / `FAIL` | `stripe-post-cloud-YYYYMMDD/validation-evidence.json` |

## Negative Tests

| Test | Expected | Actual | Evidence ref |
|------|----------|--------|-------------|
| Invalid HMAC signature | `401` / `403` | `<!-- STATUS -->` | `stripe-post-cloud-YYYYMMDD/negative-invalid-sig.json` |
| Missing Stripe-Signature header | `401` | `<!-- STATUS -->` | `stripe-post-cloud-YYYYMMDD/negative-missing-sig.json` |
| Unknown event type | graceful handling | `<!-- RESULT -->` | `stripe-post-cloud-YYYYMMDD/negative-unknown-event.json` |

## Artifacts

- `stripe-post-cloud-YYYYMMDD/delivery-log.json`
- `stripe-post-cloud-YYYYMMDD/validation-evidence.json`
- `stripe-post-cloud-YYYYMMDD/manual-verify-output.json`
- `stripe-post-cloud-YYYYMMDD/negative-invalid-sig.json`
- `stripe-post-cloud-YYYYMMDD/negative-missing-sig.json`
- `stripe-post-cloud-YYYYMMDD/negative-unknown-event.json`
- `stripe-post-cloud-YYYYMMDD/README.md` (summary)

## Claim Guard Check

- ❌ Does this evidence contain live credentials? `YES` / `NO`
- ❌ Does this evidence claim "live validated" for all providers? `YES` / `NO`
- ❌ Does this evidence claim "GA" or "public launch GO"? `YES` / `NO`
- ❌ Does this evidence claim "Free is evaluation-only"? `YES` / `NO`

If any claim guard answer is `YES`, redact and retract before publication.

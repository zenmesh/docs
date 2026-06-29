---
sidebar_label: Shopify Validation Evidence Template
---

# Shopify Live Validation Evidence Template

Use this template to record evidence artifacts from Shopify post-cloud validation.
Fill out each section after completing the corresponding validation step.

## Metadata

| Field | Value |
|-------|-------|
| Provider | Shopify |
| Validation date | `<!-- DATE-YYYY-MM-DD -->` |
| Cloud endpoint | `<!-- CLOUD-ENDPOINT-URL -->` |
| Shopify store | `<!-- STORE-NAME -->` |
| Shopify API version | `2024-01` |
| Validator | `<!-- NAME -->` |
| Platform version | `<!-- COMMIT-SHA or VERSION -->` |
| HMAC enforcement deployed? | `YES` / `NO` |
| Overall result | `PASS` / `FAIL` |

## Positive Test — Webhook Delivery

| Check | Result | Evidence ref |
|-------|--------|-------------|
| Event triggered via Admin API | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/delivery-log.json` |
| Delivery status = delivered | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/delivery-log.json` |
| Event topic matches triggered event | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/delivery-log.json` |
| Timestamp within 60s of trigger | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/delivery-log.json` |

## Signature Validation

| Check | Result | Evidence ref |
|-------|--------|-------------|
| X-Shopify-Hmac-SHA256 header present | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/validation-evidence.json` |
| Platform signature verification = valid | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/validation-evidence.json` |
| Manual re-verification matches | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/manual-verify-output.json` |
| X-Shopify-Shop-Domain matches | `PASS` / `FAIL` | `shopify-post-cloud-YYYYMMDD/validation-evidence.json` |

## Negative Tests

| Test | Expected | Actual | Evidence ref |
|------|----------|--------|-------------|
| Invalid HMAC signature | `401` / `403` | `<!-- STATUS -->` | `shopify-post-cloud-YYYYMMDD/negative-invalid-sig.json` |
| Missing signature (if enforced) | `401` | `<!-- STATUS -->` | `shopify-post-cloud-YYYYMMDD/negative-missing-sig.json` |
| Unknown event topic | graceful | `<!-- RESULT -->` | `shopify-post-cloud-YYYYMMDD/negative-unknown-topic.json` |

## Artifacts

- `shopify-post-cloud-YYYYMMDD/delivery-log.json`
- `shopify-post-cloud-YYYYMMDD/validation-evidence.json`
- `shopify-post-cloud-YYYYMMDD/manual-verify-output.json`
- `shopify-post-cloud-YYYYMMDD/negative-invalid-sig.json`
- `shopify-post-cloud-YYYYMMDD/negative-missing-sig.json`
- `shopify-post-cloud-YYYYMMDD/negative-unknown-topic.json`
- `shopify-post-cloud-YYYYMMDD/README.md` (summary)

## Claim Guard Check

- ❌ Does this evidence contain live credentials? `YES` / `NO`
- ❌ Does this evidence claim "live validated" for all providers? `YES` / `NO`
- ❌ Does this evidence claim "GA" or "public launch GO"? `YES` / `NO`
- ❌ Does this evidence claim "Free is evaluation-only"? `YES` / `NO`

If any claim guard answer is `YES`, redact and retract before publication.

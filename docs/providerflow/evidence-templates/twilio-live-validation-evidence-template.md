---
sidebar_label: Twilio Validation Evidence Template
---

# Twilio Live Validation Evidence Template

Use this template to record evidence artifacts from Twilio post-cloud validation.
Fill out each section after completing the corresponding validation step.

## Metadata

| Field | Value |
|-------|-------|
| Provider | Twilio |
| Validation date | `<!-- DATE-YYYY-MM-DD -->` |
| Cloud endpoint | `<!-- CLOUD-ENDPOINT-URL -->` |
| Twilio Account SID | `AC<!-- ... -->` |
| Twilio phone number | `+1<!-- ... -->` |
| Validator | `<!-- NAME -->` |
| Platform version | `<!-- COMMIT-SHA or VERSION -->` |
| Overall result | `PASS` / `FAIL` |

## Positive Test — Inbound SMS Webhook

| Check | Result | Evidence ref |
|-------|--------|-------------|
| SMS sent to Twilio number | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/delivery-log.json` |
| Delivery status = delivered | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/delivery-log.json` |
| Event type = incoming_message | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/delivery-log.json` |
| Timestamp within 60s of SMS | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/delivery-log.json` |
| Status callback delivered (if applicable) | `PASS` / `FAIL` / `N/A` | `twilio-post-cloud-YYYYMMDD/delivery-log.json` |

## Signature Validation

| Check | Result | Evidence ref |
|-------|--------|-------------|
| X-Twilio-Signature header present | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/validation-evidence.json` |
| Platform signature verification = valid | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/validation-evidence.json` |
| Manual re-verification matches | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/manual-verify-output.json` |
| Request URL matches configured URL | `PASS` / `FAIL` | `twilio-post-cloud-YYYYMMDD/validation-evidence.json` |

## Negative Tests

| Test | Expected | Actual | Evidence ref |
|------|----------|--------|-------------|
| Invalid X-Twilio-Signature | `401` / `403` | `<!-- STATUS -->` | `twilio-post-cloud-YYYYMMDD/negative-invalid-sig.json` |
| Missing X-Twilio-Signature | `401` | `<!-- STATUS -->` | `twilio-post-cloud-YYYYMMDD/negative-missing-sig.json` |
| Invalid content type (JSON instead of form) | `400` | `<!-- STATUS -->` | `twilio-post-cloud-YYYYMMDD/negative-invalid-content-type.json` |

## Artifacts

- `twilio-post-cloud-YYYYMMDD/delivery-log.json`
- `twilio-post-cloud-YYYYMMDD/validation-evidence.json`
- `twilio-post-cloud-YYYYMMDD/manual-verify-output.json`
- `twilio-post-cloud-YYYYMMDD/negative-invalid-sig.json`
- `twilio-post-cloud-YYYYMMDD/negative-missing-sig.json`
- `twilio-post-cloud-YYYYMMDD/negative-invalid-content-type.json`
- `twilio-post-cloud-YYYYMMDD/README.md` (summary)

## Claim Guard Check

- ❌ Does this evidence contain live credentials? `YES` / `NO`
- ❌ Does this evidence claim "live validated" for all providers? `YES` / `NO`
- ❌ Does this evidence claim "GA" or "public launch GO"? `YES` / `NO`
- ❌ Does this evidence claim "Free is evaluation-only"? `YES` / `NO`

If any claim guard answer is `YES`, redact and retract before publication.

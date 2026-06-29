---
sidebar_label: GitHub Validation Evidence Template
---

# GitHub Live Validation Evidence Template

Use this template to record evidence artifacts from GitHub post-cloud validation.
Fill out each section after completing the corresponding validation step.

## Metadata

| Field | Value |
|-------|-------|
| Provider | GitHub |
| Validation date | `<!-- DATE-YYYY-MM-DD -->` |
| Cloud endpoint | `<!-- CLOUD-ENDPOINT-URL -->` |
| GitHub account | `<!-- OWNER/REPO -->` |
| GitHub webhook ID | `<!-- WEBHOOK-ID -->` |
| Validator | `<!-- NAME -->` |
| Platform version | `<!-- COMMIT-SHA or VERSION -->` |
| Overall result | `PASS` / `FAIL` |

## Positive Test — Webhook Delivery

| Check | Result | Evidence ref |
|-------|--------|-------------|
| Event triggered (dispatch / push) | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/delivery-log.json` |
| Delivery status = delivered | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/delivery-log.json` |
| Event type matches triggered event | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/delivery-log.json` |
| Timestamp within 60s of trigger | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/delivery-log.json` |

## Signature Validation

| Check | Result | Evidence ref |
|-------|--------|-------------|
| X-Hub-Signature-256 header present | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/validation-evidence.json` |
| Platform signature verification = valid | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/validation-evidence.json` |
| Manual re-verification matches | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/manual-verify-output.json` |
| X-Hub-Request-Id present | `PASS` / `FAIL` | `github-post-cloud-YYYYMMDD/validation-evidence.json` |

## Negative Tests

| Test | Expected | Actual | Evidence ref |
|------|----------|--------|-------------|
| Invalid HMAC signature | `401` / `403` | `<!-- STATUS -->` | `github-post-cloud-YYYYMMDD/negative-invalid-sig.json` |
| Missing X-Hub-Signature-256 | `401` | `<!-- STATUS -->` | `github-post-cloud-YYYYMMDD/negative-missing-sig.json` |
| Missing X-GitHub-Event header | `400` | `<!-- STATUS -->` | `github-post-cloud-YYYYMMDD/negative-missing-event.json` |

## Artifacts

- `github-post-cloud-YYYYMMDD/delivery-log.json`
- `github-post-cloud-YYYYMMDD/validation-evidence.json`
- `github-post-cloud-YYYYMMDD/manual-verify-output.json`
- `github-post-cloud-YYYYMMDD/negative-invalid-sig.json`
- `github-post-cloud-YYYYMMDD/negative-missing-sig.json`
- `github-post-cloud-YYYYMMDD/negative-missing-event.json`
- `github-post-cloud-YYYYMMDD/README.md` (summary)

## Claim Guard Check

- ❌ Does this evidence contain live credentials? `YES` / `NO`
- ❌ Does this evidence claim "live validated" for all providers? `YES` / `NO`
- ❌ Does this evidence claim "GA" or "public launch GO"? `YES` / `NO`
- ❌ Does this evidence claim "Free is evaluation-only"? `YES` / `NO`

If any claim guard answer is `YES`, redact and retract before publication.

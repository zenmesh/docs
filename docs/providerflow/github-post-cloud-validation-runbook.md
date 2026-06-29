---
sidebar_label: GitHub Post-Cloud Validation
---

# GitHub Post-Cloud Validation Runbook

**Status:** Requires Cloud Deploy + Live Credentials
**Audience:** Operators
**Priority:** P0

## Objective

Validate the GitHub package against the production cloud endpoint with live
GitHub credentials and webhook events. This is the first-time live validation
for GitHub — its `live_e2e_status` is currently `cloud_gated`.

## Prerequisites

- ✅ Public cloud endpoint deployed (control plane reachable)
- ✅ GitHub personal account or organization with webhook-capable repository
- ✅ GitHub personal access token (classic, with `admin:repo_hook` scope)
- ✅ GitHub webhook secret configured at repository or organization level
- ✅ Cloud endpoint URL registered as GitHub webhook payload URL
- ✅ [`gh` CLI](https://cli.github.com/) installed (optional, for repo management)
- ❌ No live credentials in docs or generated evidence artifacts

## Validation Sequence

### 1. Positive Test — Send GitHub Webhook Event

Trigger a GitHub webhook event and verify delivery:

```bash
# Option A: Trigger via GitHub API (create a repository dispatch event)
curl -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/${OWNER}/${REPO}/dispatches \
  -d '{"event_type": "validation-test"}'
```

**Expected:** GitHub delivers the webhook to the cloud endpoint.

### 2. Positive Test — Verify Delivery via Platform API

```bash
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=github&limit=1 | jq .
```

**Checks:**
- ✅ Delivery recorded with `status: delivered`
- ✅ Event type matches the expected GitHub event
- ✅ Timestamp is recent (within 60s of trigger)

### 3. Signature Validation — Verify X-Hub-Signature-256 Header

Confirm the platform validated the GitHub HMAC-SHA256 signature:

```bash
# Retrieve raw webhook headers from delivery evidence
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries/${DELIVERY_ID}/evidence | jq '.headers["X-Hub-Signature-256"]'
```

Manually re-verify:

```bash
zen package verify-signature github \
  --payload payload.json \
  --signature-header "$GITHUB_SIGNATURE" \
  --secret "$GITHUB_WEBHOOK_SECRET"
```

**Checks:**
- ✅ `X-Hub-Signature-256` header is present
- ✅ Signature verification returns `valid: true`
- ✅ `X-Hub-Request-Id` is present and non-empty

### 4. Negative Test — Invalid HMAC Signature

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/github \
  -H "X-Hub-Signature-256: sha256=invalidsignature" \
  -H "X-GitHub-Event: push" \
  -H "Content-Type: application/json" \
  -d '{"ref": "refs/heads/main", "repository": {"full_name": "test/repo"}}'
```

**Checks:**
- ✅ Response status is `401` or `403`
- ✅ Error body indicates `signature_verification_failed`
- ❌ No delivery recorded for the rejected event

### 5. Negative Test — Missing X-Hub-Signature-256 Header

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/github \
  -H "X-GitHub-Event: push" \
  -H "Content-Type: application/json" \
  -d '{"ref": "refs/heads/main"}'
```

**Checks:**
- ✅ Response status is `401`
- ✅ Error body indicates `missing_signature_header`

### 6. Negative Test — Missing X-GitHub-Event Header

```bash
TIMESTAMP=$(date +%s)
PAYLOAD='{"ref":"refs/heads/main"}'
SIGNED=$(printf '%s' "$PAYLOAD" | openssl dgst -sha256 -hmac "$GITHUB_WEBHOOK_SECRET" | awk '{print $2}')
curl -X POST https://api.zen-mesh.io/v1/webhooks/github \
  -H "X-Hub-Signature-256: sha256=$SIGNED" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
```

**Checks:**
- ✅ Response status is `400`
- ✅ Error body indicates `missing_event_type_header`

### 7. Evidence Capture

```bash
# Create evidence directory
mkdir -p docs/80-EVIDENCE/public-docs/github-post-cloud-$(date +%Y%m%d)

# Capture delivery logs
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=github > \
  docs/80-EVIDENCE/public-docs/github-post-cloud-$(date +%Y%m%d)/delivery-log.json

# Capture validation results
zen package evidence github --output=json > \
  docs/80-EVIDENCE/public-docs/github-post-cloud-$(date +%Y%m%d)/validation-evidence.json

# Generate summary
cat > docs/80-EVIDENCE/public-docs/github-post-cloud-$(date +%Y%m%d)/README.md << 'SUMMARY'
# GitHub Post-Cloud Validation

Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Validator: $(whoami)
Cloud Endpoint: <endpoint-url>
GitHub Account: <account/repo>
Results: <PASS / FAIL>
SUMMARY
```

**Evidence artifacts:**
- Delivery log showing received GitHub events
- Signature verification results (positive and negative)
- Error responses showing rejection of invalid signatures
- Summary document with pass/fail per test

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All tests pass |
| `1` | Positive test fails (no delivery) |
| `2` | Negative test fails (invalid event not rejected) |
| `3` | Signature verification fails |
| `4` | Evidence capture fails |
| `5` | Credential or access error |

## Validation Success Criteria

Validation passes when ALL of the following are true:

- ✅ GitHub webhook event received and delivered (positive test)
- ✅ `X-Hub-Signature-256` header present and verified by platform
- ✅ Manual signature re-verification matches platform result
- ✅ Invalid signature events are rejected
- ✅ Missing required headers are rejected
- ✅ Evidence is captured and stored
- ❌ No live credentials appear in evidence artifacts
- ❌ No claim of "live validated" or "GA" in evidence output

## Troubleshooting

### GitHub Webhook Not Delivered

- **Payload URL mismatch:** Verify the cloud endpoint URL in GitHub repository
  Settings > Webhooks matches the platform's GitHub webhook endpoint
- **Secret mismatch:** Ensure the webhook secret in GitHub matches the one
  configured in the platform
- **SSL verification:** GitHub enforces SSL; verify the cloud endpoint has a
  valid TLS certificate

### Signature Verification Fails

- **Algorithm mismatch:** GitHub signs with `sha256=` prefix; verify the
  platform expects this format
- **Payload encoding:** GitHub signs the raw body; verify exact byte encoding

### No Webhook Events Received

- **Repository permissions:** Ensure the token has `admin:repo_hook` scope
- **Webhook active:** Verify the webhook is not paused or disabled in GitHub
- **Rate limiting:** Check GitHub API rate limits on the account

## Related

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview)
- [GitHub v2 Package](./packages/github-v2)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Provider Test Account Checklist](./provider-test-account-checklist)
- [GitHub Post-Cloud Validation Evidence Template](./evidence-templates/github-live-validation-evidence-template)

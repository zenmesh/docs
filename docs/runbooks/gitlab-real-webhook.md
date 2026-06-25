---
sidebar_label: GitLab Real Webhook
---

# GitLab Real Webhook Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate GitLab internal package with real GitLab webhook payloads.

## Prerequisites

- ✅ GitLab internal package deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ GitLab API token
- ✅ Target webhook endpoint URL

## Validation Steps

### Step 1: Get GitLab Webhook Data

Get GitLab webhook data:

```bash
# From GitLab API
curl -X GET https://gitlab.com/api/v4/projects/:id/hooks
```

**Sample webhook payload:**

```json
{
  "object_kind": "pipeline",
  "ref": "main",
  "status": "success",
  "build_id": 12345,
  "build_name": "main",
  "sha": "abc123",
  "created_at": "2026-06-24T10:00:00Z"
}
```

### Step 2: Send GitLab Webhook

Send webhook to endpoint:

```bash
curl -X POST https://your-domain.com/webhooks/gitlab   -H "Content-Type: application/json"   -H "Authorization: Bearer YOUR_TOKEN"   -d '{
    "object_kind": "pipeline",
    "ref": "main",
    "status": "success",
    "build_id": 12345,
    "build_name": "main",
    "sha": "abc123",
    "created_at": "2026-06-24T10:00:00Z"
  }'
```

**Check:**
- ✅ Status code is 200
- ✅ Response is "Success"

### Step 3: Verify Delivery to Target

Verify delivery:

```bash
curl -X GET https://api.gitops-logs.com/events?event_id=12345
```

**Check:**
- ✅ Delivery received
- ✅ Payload matches input
- ✅ Status code is 200

### Step 4: Review Output

Review output:

```bash
cat output.json
```

**Expected output:**

```json
{
  "destination": "gitops-logs",
  "event_type": "pipeline.success",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "object_kind": "pipeline",
    "ref": "main",
    "status": "success",
    "build_id": 12345,
    "build_name": "main",
    "sha": "abc123",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Step 5: Validate Against Contract

Validate against contract:

```bash
zen package validate gitlab-internal --test-data=test-data.json
```

**Check:**
- ✅ Event type matches contract (pipeline.success)
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 6: Generate Evidence

Generate evidence:

```bash
zen package evidence gitlab-internal --output=json
```

**Evidence includes:**
- Webhook delivery traces
- Output traces
- Validation results
- Comparison with goldens

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Validation successful |
| `1` | General error |
| `2` | Authentication error |
| `3` | Validation error |
| `4` | Authorization error |

## Successful Validation

Validation is successful when:
- ✅ Exit code is 0
- ✅ Webhook received
- ✅ Delivery successful
- ✅ Output format correct
- ✅ Output matches golden
- ✅ No validation errors

## Related

- [Real Webhook Validation](./real-webhook-validation.md)
- [Sandbox Validation](./sandbox-validation.md)
- [GitLab Internal Package](../providerflow/packages/gitlab-internal.md)

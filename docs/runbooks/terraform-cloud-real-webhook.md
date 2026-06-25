---
sidebar_label: Terraform Cloud Real Webhook
---

# Terraform Cloud Real Webhook Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate Terraform Cloud internal package with real Terraform Cloud webhook payloads.

## Prerequisites

- ✅ Terraform Cloud internal package deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ Terraform Cloud API token
- ✅ Target webhook endpoint URL

## Validation Steps

### Step 1: Get Terraform Cloud Webhook Data

Get Terraform Cloud webhook data:

```bash
# From Terraform Cloud API
curl -X GET https://app.terraform.io/api/v2/workspaces/:workspace-id/runs
```

**Sample webhook payload:**

```json
{
  "event": "terraform_plan",
  "workspace": "production",
  "status": "pending",
  "execution_id": "run-12345",
  "created_at": "2026-06-24T10:00:00Z"
}
```

### Step 2: Send Terraform Cloud Webhook

Send webhook to endpoint:

```bash
curl -X POST https://your-domain.com/webhooks/terraform   -H "Content-Type: application/json"   -H "Authorization: Bearer YOUR_TOKEN"   -d '{
    "event": "terraform_plan",
    "workspace": "production",
    "status": "pending",
    "execution_id": "run-12345",
    "created_at": "2026-06-24T10:00:00Z"
  }'
```

**Check:**
- ✅ Status code is 200
- ✅ Response is "Success"

### Step 3: Verify Delivery to Target

Verify delivery:

```bash
curl -X GET https://api.terraform-logs.com/events?event_id=12345
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
  "destination": "infrastructure-logs",
  "event_type": "terraform_plan",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "event": "terraform_plan",
    "workspace": "production",
    "status": "pending",
    "execution_id": "run-12345",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Step 5: Validate Against Contract

Validate against contract:

```bash
zen package validate terraform-cloud-internal --test-data=test-data.json
```

**Check:**
- ✅ Event type matches contract (terraform_plan)
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 6: Generate Evidence

Generate evidence:

```bash
zen package evidence terraform-cloud-internal --output=json
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
- [Terraform Cloud Internal Package](../providerflow/packages/terraform-cloud-internal.md)

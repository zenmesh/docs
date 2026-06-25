---
sidebar_label: Doppler Real Webhook
---

# Doppler Real Webhook Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate Doppler internal package with real Doppler webhook payloads.

## Prerequisites

- ✅ Doppler internal package deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ Doppler API token
- ✅ Target webhook endpoint URL

## Validation Steps

### Step 1: Get Doppler Webhook Data

Get Doppler webhook data:

```bash
# From Doppler API
curl -X GET https://api.doppler.com/v3/configs/config-id/secrets
```

**Sample webhook payload:**

```json
{
  "event": "secret.changed",
  "project": "my-app",
  "env": "production",
  "secret": "DATABASE_PASSWORD",
  "changed_at": "2026-06-24T10:00:00Z"
}
```

### Step 2: Send Doppler Webhook

Send webhook to endpoint:

```bash
curl -X POST https://your-domain.com/webhooks/doppler   -H "Content-Type: application/json"   -H "Authorization: Bearer YOUR_TOKEN"   -d '{
    "event": "secret.changed",
    "project": "my-app",
    "env": "production",
    "secret": "DATABASE_PASSWORD",
    "changed_at": "2026-06-24T10:00:00Z"
  }'
```

**Check:**
- ✅ Status code is 200
- ✅ Response is "Success"

### Step 3: Verify Delivery to Target

Verify delivery:

```bash
curl -X GET https://api.config-logs.com/events?event_id=12345
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
  "destination": "config-logs",
  "event_type": "secret.changed",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "event": "secret.changed",
    "project": "my-app",
    "env": "production",
    "secret": "DATABASE_PASSWORD",
    "changed_at": "2026-06-24T10:00:00Z",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Step 5: Validate Against Contract

Validate against contract:

```bash
zen package validate doppler-internal --test-data=test-data.json
```

**Check:**
- ✅ Event type matches contract (secret.changed)
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 6: Generate Evidence

Generate evidence:

```bash
zen package evidence doppler-internal --output=json
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
- [Doppler Internal Package](../providerflow/packages/doppler-internal.md)

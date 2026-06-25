---
sidebar_label: Stripe Real Webhook
---

# Stripe Real Webhook Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate Stripe v2 package with real Stripe webhook payloads.

## Prerequisites

- ✅ Stripe v2 package deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ Stripe API key
- ✅ Target webhook endpoint URL

## Overview

Validate Stripe v2 package with real Stripe webhook payloads. This is **requires authorization**.

## When to Use

This runbook is for:
- ⚠️ Stripe webhook testing (requires authorization)
- ⚠️ Stripe contract validation with real data
- ⚠️ Stripe integration testing

This runbook is **NOT** for:
- ❌ Sandbox validation
- ❌ Pre-deployment validation
- ❌ Automated validation

## Authorization Required

⚠️ **Stripe real webhook validation requires explicit authorization from operators.**

## Validation Steps

### Step 1: Get Stripe Webhook Data

Get Stripe webhook data:

```bash
# From Stripe Dashboard or API
# Get sample webhook payloads
curl -X GET https://api.stripe.com/v1/notify   -u sk_live_YOUR_KEY:
```

**Sample webhook payload:**

```json
{
  "id": "evt_1N2k1dLkdIwHu7ix3x3x3x3",
  "object": "event",
  "type": "payment_intent.succeeded",
  "created": 1719184800,
  "livemode": true,
  "request": {
    "id": "req_1N2k1dLkdIwHu7ix4y4y4y4"
  },
  "data": {
    "object": {
      "id": "pi_1N2k1dLkdIwHu7ix5z5z5z5",
      "object": "payment_intent",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "created": 1719184800
    }
  }
}
```

### Step 2: Generate HMAC-SHA256 Signature

Generate signature:

```bash
# Generate HMAC-SHA256 signature
echo -n '{"id":"evt_1N2k1dLkdIwHu7ix3x3x3x3","object":"event","type":"payment_intent.succeeded","created":1719184800,"livemode":true}' | openssl dgst -sha256 -hmac "sk_live_YOUR_KEY" | awk '{print $2}'
```

### Step 3: Send Stripe Webhook

Send webhook to endpoint:

```bash
curl -X POST https://your-domain.com/webhooks/stripe   -H "Content-Type: application/json"   -H "Stripe-Signature: t=1719184800,v1=HMAC_SIGNATURE_HERE"   -d '{
    "id": "evt_1N2k1dLkdIwHu7ix3x3x3x3",
    "object": "event",
    "type": "payment_intent.succeeded",
    "created": 1719184800,
    "livemode": true,
    "data": {
      "object": {
        "id": "pi_1N2k1dLkdIwHu7ix5z5z5z5",
        "object": "payment_intent",
        "amount": 2000,
        "currency": "usd",
        "status": "succeeded",
        "created": 1719184800
      }
    }
  }'
```

**Check:**
- ✅ Status code is 200
- ✅ Response is "Success"

### Step 4: Verify Delivery to Target

Verify delivery:

```bash
curl -X GET https://api.data-warehouse.com/events?event_id=evt_1N2k1dLkdIwHu7ix3x3x3x3
```

**Check:**
- ✅ Delivery received
- ✅ Payload matches input
- ✅ Status code is 200

### Step 5: Review Output

Review output:

```bash
cat output.json
```

**Expected output:**

```json
{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": "pi_1N2k1dLkdIwHu7ix5z5z5z5",
    "object": "payment_intent",
    "amount": 2000,
    "currency": "usd",
    "status": "succeeded",
    "created": 1719184800,
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Step 6: Validate Against Contract

Validate against contract:

```bash
zen package validate stripe-v2 --test-data=test-data.json
```

**Check:**
- ✅ Event type matches contract (payment_intent.succeeded)
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 7: Generate Evidence

Generate evidence:

```bash
zen package evidence stripe-v2 --output=json
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
- ✅ Signature verified
- ✅ Delivery successful
- ✅ Output format correct
- ✅ Output matches golden
- ✅ No validation errors

## Validation Failure

Validation fails when:
- ❌ Exit code is non-zero
- ❌ Webhook not received
- ❌ Signature verification failed
- ❌ Delivery failed
- ❌ Output format incorrect
- ❌ Output doesn't match golden

**Troubleshooting:**

1. Review error messages
2. Check signature generation
3. Check webhook delivery
4. Check target delivery
5. Check output
6. Fix issues
7. Re-validate

## Common Issues

### Signature Verification Failed

**Symptom:** `X-Stripe-Signature` header validation fails

**Solution:**
1. Verify HMAC-SHA256 signature generation
2. Check key is correct
3. Check encoding (base64)
4. Check timestamp is valid

### Event Type Not Supported

**Symptom:** Event type not in contract

**Solution:**
1. Check contract event types
2. Update contract if needed
3. Re-deploy package

### Delivery Failed

**Symptom:** Target webhook not received

**Solution:**
1. Check target URL
2. Check authentication
3. Check target logs
4. Check firewall rules

## Related

- [Real Webhook Validation](./real-webhook-validation.md)
- [Sandbox Validation](./sandbox-validation.md)
- [Stripe v2 Package](../providerflow/packages/stripe-v2.md)

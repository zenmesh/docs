---
sidebar_label: Shopify Real Webhook
---

# Shopify Real Webhook Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate Shopify v2 package with real Shopify webhook payloads.

## Prerequisites

- ✅ Shopify v2 package deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ Shopify API key
- ✅ Target webhook endpoint URL

## Validation Steps

### Step 1: Get Shopify Webhook Data

Get Shopify webhook data:

```bash
# From Shopify Dashboard or API
# Get sample webhook payloads
curl -X GET https://your-store.myshopify.com/admin/api/2024-01/webhooks.json
```

**Sample webhook payload:**

```json
{
  "id": 123456789,
  "address": "https://your-domain.com/webhooks/shopify",
  "topic": "orders/create",
  "created_at": "2026-06-24T10:00:00Z",
  "api_version": "2024-01",
  "metafield_namespace": null
}
```

**Sample order event:**

```json
{
  "id": 12345,
  "name": "#1001",
  "email": "customer@example.com",
  "total_price": "100.00",
  "currency": "USD",
  "created_at": "2026-06-24T10:00:00Z"
}
```

### Step 2: Send Shopify Webhook

Send webhook to endpoint:

```bash
curl -X POST https://your-domain.com/webhooks/shopify   -H "Content-Type: application/json"   -H "X-Shopify-Hmac-Sha256: HMAC_SIGNATURE_HERE"   -d '{
    "id": 12345,
    "name": "#1001",
    "email": "customer@example.com",
    "total_price": "100.00",
    "currency": "USD",
    "created_at": "2026-06-24T10:00:00Z"
  }'
```

**Check:**
- ✅ Status code is 200
- ✅ Response is "Success"

### Step 3: Verify Delivery to Target

Verify delivery:

```bash
curl -X GET https://api.e-commerce-warehouse.com/events?event_id=12345
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
  "destination": "e-commerce-data-warehouse",
  "event_type": "orders/create",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": 12345,
    "name": "#1001",
    "email": "customer@example.com",
    "total_price": "100.00",
    "currency": "USD",
    "created_at": "2026-06-24T10:00:00Z",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Step 5: Validate Against Contract

Validate against contract:

```bash
zen package validate shopify-v2 --test-data=test-data.json
```

**Check:**
- ✅ Event type matches contract (orders/create)
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 6: Generate Evidence

Generate evidence:

```bash
zen package evidence shopify-v2 --output=json
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
- [Shopify v2 Package](../providerflow/packages/shopify-v2.md)

---
sidebar_label: Shopify Post-Cloud Validation
---

# Shopify Post-Cloud Validation Runbook

**Status:** Requires Cloud Deploy + Live Credentials
**Audience:** Operators
**Priority:** P0

## Objective

Validate the Shopify package against the production cloud endpoint with live
Shopify webhook events. This is the first-time live validation for Shopify —
its `live_e2e_status` is currently `cloud_gated`.

## Prerequisites

- ✅ Public cloud endpoint deployed (control plane reachable)
- ✅ Shopify development store or partner account with webhook event
  generation capability
- ✅ Shopify API access token or admin API credentials
- ✅ Shopify webhook secret for HMAC verification
- ✅ Cloud endpoint URL configured as Shopify webhook endpoint in store
  Settings > Notifications > Webhooks
- ❌ No live credentials in docs or generated evidence artifacts

## Validation Sequence

### 1. Positive Test — Trigger Shopify Webhook Event

Trigger a Shopify webhook event and verify delivery:

```bash
# Option A: Trigger via Shopify Admin API (create an order)
curl -X POST \
  -H "X-Shopify-Access-Token: ${SHOPIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  https://${STORE}.myshopify.com/admin/api/2024-01/orders.json \
  -d '{
    "order": {
      "email": "test@example.com",
      "line_items": [{"title": "Test Product", "quantity": 1, "price": 10.00}]
    }
  }'
```

**Expected:** Shopify delivers the `orders/create` webhook to the cloud endpoint.

### 2. Positive Test — Verify Delivery via Platform API

```bash
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=shopify&limit=1 | jq .
```

**Checks:**
- ✅ Delivery recorded with `status: delivered`
- ✅ Event topic matches the triggered event (`orders/create`)
- ✅ Timestamp is recent (within 60s of trigger)

### 3. Signature Validation — Verify HMAC-SHA256 Signature

Confirm the platform validated the Shopify HMAC signature:

```bash
# Retrieve raw webhook headers from delivery evidence
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries/${DELIVERY_ID}/evidence | jq '.headers["X-Shopify-Hmac-SHA256"]'
```

Manually re-verify:

```bash
zen package verify-signature shopify \
  --payload payload.json \
  --signature-header "$SHOPIFY_HMAC" \
  --secret "$SHOPIFY_WEBHOOK_SECRET"
```

**Checks:**
- ✅ `X-Shopify-Hmac-SHA256` header is present
- ✅ Signature verification returns `valid: true`
- ✅ `X-Shopify-Shop-Domain` matches the expected store domain

### 4. Negative Test — Invalid HMAC Signature

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/shopify \
  -H "X-Shopify-Hmac-SHA256: base64invalidsignature=" \
  -H "X-Shopify-Shop-Domain: test-store.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"id": 999999, "email": "test@example.com"}'
```

**Checks:**
- ✅ Response status is `401` or `403`
- ✅ Error body indicates `signature_verification_failed`
- ❌ No delivery recorded for the rejected event

### 5. Negative Test — Disabled HMAC Enforcement (Adapter Pool)

If the fabric adapter pool is deployed without HMAC enforcement (current
`PENDING` state — see readiness matrix), confirm the platform rejects:

```bash
# This test validates the platform's behavior when HMAC enforcement IS enabled
# Run only after HMAC enforcement is deployed
curl -X POST https://api.zen-mesh.io/v1/webhooks/shopify \
  -H "Content-Type: application/json" \
  -d '{"id": 888888, "email": "unsigned@example.com"}'
```

**Checks:**
- ✅ Response status is `401`
- ✅ Error body references `missing_signature` or `signature_required`
- ❌ Unsigned event is **not** delivered

### 6. Negative Test — Unknown Event Topic

```bash
TIMESTAMP=$(date +%s)
PAYLOAD='{"id": 777777, "email": "test@example.com"}'
SIGNED=$(printf '%s' "$PAYLOAD" | openssl dgst -sha256 -hmac "$SHOPIFY_WEBHOOK_SECRET" | base64)
curl -X POST https://api.zen-mesh.io/v1/webhooks/shopify \
  -H "X-Shopify-Hmac-SHA256: $SIGNED" \
  -H "X-Shopify-Shop-Domain: test-store.myshopify.com" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Topic: unknown/topic" \
  -d "$PAYLOAD"
```

**Checks:**
- ✅ Delivery recorded with topic `unknown/topic`
- ❌ No target routing for unmapped topics (no unexpected delivery)
- ✅ Event logged as `unmapped_topic`

### 7. Evidence Capture

```bash
mkdir -p docs/80-EVIDENCE/public-docs/shopify-post-cloud-$(date +%Y%m%d)

curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=shopify > \
  docs/80-EVIDENCE/public-docs/shopify-post-cloud-$(date +%Y%m%d)/delivery-log.json

zen package evidence shopify --output=json > \
  docs/80-EVIDENCE/public-docs/shopify-post-cloud-$(date +%Y%m%d)/validation-evidence.json

cat > docs/80-EVIDENCE/public-docs/shopify-post-cloud-$(date +%Y%m%d)/README.md << 'SUMMARY'
# Shopify Post-Cloud Validation

Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Validator: $(whoami)
Cloud Endpoint: <endpoint-url>
Shopify Store: <store-name>
Results: <PASS / FAIL>
SUMMARY
```

**Evidence artifacts:**
- Delivery log showing received Shopify events
- HMAC signature verification results (positive/negative)
- Error responses showing rejection of unsigned/invalid events
- Summary document with pass/fail per test

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All tests pass |
| `1` | Positive test fails (no delivery) |
| `2` | Negative test fails (unsigned event not rejected) |
| `3` | Signature verification fails |
| `4` | Evidence capture fails |
| `5` | Credential or access error |

## Validation Success Criteria

Validation passes when ALL of the following are true:

- ✅ Shopify webhook event received and delivered (positive test)
- ✅ `X-Shopify-Hmac-SHA256` header present and verified by platform
- ✅ Manual signature re-verification matches platform result
- ✅ Invalid or missing signature events are rejected (when enforcement enabled)
- ✅ Evidence is captured and stored
- ❌ No live credentials appear in evidence artifacts
- ❌ No claim of "live validated" or "GA" in evidence output

## Troubleshooting

### Shopify Webhook Not Delivered

- **Webhook endpoint not configured:** Verify in Shopify Admin > Settings >
  Notifications > Webhooks that the payload URL points to the cloud endpoint
- **Secret mismatch:** Ensure the webhook secret matches between Shopify and
  the platform
- **Store plan limitations:** Verify the development store plan supports
  webhooks

### HMAC Verification Fails

- **Algorithm mismatch:** Shopify uses HMAC-SHA256 with base64 encoding
- **Payload normalization:** Shopify signs the raw body; verify no encoding
  differences (UTF-8 vs ASCII)

### API Token Issues

- **Scope:** Ensure the token has `write_orders` and `read_webhooks` scopes
- **Rotation:** Check the access token hasn't been regenerated

## Related

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview)
- [Shopify Real Webhook Runbook](../runbooks/shopify-real-webhook) — Pre-deployment real webhook validation
- [Shopify v2 Package](./packages/shopify-v2)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Provider Test Account Checklist](./provider-test-account-checklist)
- [Shopify Post-Cloud Validation Evidence Template](./evidence-templates/shopify-live-validation-evidence-template)

---
sidebar_label: Twilio Post-Cloud Validation
---

# Twilio Post-Cloud Validation Runbook

**Status:** Requires Cloud Deploy + Live Credentials
**Audience:** Operators
**Priority:** P0

## Objective

Validate the Twilio package against the production cloud endpoint with live
Twilio webhook events (inbound SMS/call status callbacks). This is the
first-time live validation for Twilio — its `live_e2e_status` is currently
`cloud_gated`.

## Prerequisites

- ✅ Public cloud endpoint deployed (control plane reachable)
- ✅ Twilio account with SMS-capable phone number (trial or production)
- ✅ Twilio Account SID and Auth Token
- ✅ Cloud endpoint URL configured as Twilio webhook (incoming message or
  status callback URL)
- ✅ [`twilio` CLI](https://www.twilio.com/docs/twilio-cli) installed (optional,
  for sending test SMS)
- ❌ No live credentials in docs or generated evidence artifacts

## Validation Sequence

### 1. Positive Test — Send Inbound SMS to Twilio Number

Send an SMS to the Twilio number and verify the webhook reaches the cloud
endpoint:

```bash
# Trigger an incoming message via Twilio API
curl -X POST https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json \
  -u "${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}" \
  --data-urlencode "To=${TWILIO_PHONE_NUMBER}" \
  --data-urlencode "From=${VERIFIED_CALLER_ID}" \
  --data-urlencode "Body=Post-cloud validation test message"
```

**Expected:** Twilio delivers the incoming message webhook to the cloud endpoint.

### 2. Positive Test — Verify Delivery via Platform API

```bash
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=twilio&limit=1 | jq .
```

**Checks:**
- ✅ Delivery recorded with `status: delivered`
- ✅ Event type matches `incoming_message` or `message_received`
- ✅ Timestamp is recent (within 60s of SMS send)

### 3. Signature Validation — Verify Twilio Signature

Confirm the platform validated the Twilio request signature:

```bash
# Retrieve raw webhook headers
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}}" \
  https://api.zen-mesh.io/v1/deliveries/${DELIVERY_ID}/evidence | jq '.headers["X-Twilio-Signature"]'
```

Manually re-verify using the Twilio signature validator:

```bash
zen package verify-signature twilio \
  --payload payload.json \
  --signature-header "$TWILIO_SIGNATURE" \
  --secret "$TWILIO_AUTH_TOKEN"
```

**Checks:**
- ✅ `X-Twilio-Signature` header is present
- ✅ Signature verification returns `valid: true`
- ✅ Request URL matches the configured webhook URL in Twilio Console

### 4. Positive Test — Status Callback Event

If the platform supports delivery status callbacks, send a message and capture
the status callback webhook:

```bash
# Send message with StatusCallback
curl -X POST https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json \
  -u "${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}" \
  --data-urlencode "To=${VERIFIED_CALLER_ID}" \
  --data-urlencode "From=${TWILIO_PHONE_NUMBER}" \
  --data-urlencode "Body=Status callback test" \
  --data-urlencode "StatusCallback=https://api.zen-mesh.io/v1/webhooks/twilio/status"
```

**Checks:**
- ✅ Delivery recorded for the status callback event
- ✅ Status value present (e.g., `delivered`, `sent`, `failed`)

### 5. Negative Test — Invalid Twilio Signature

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/twilio \
  -H "X-Twilio-Signature: base64invalidsignature=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=%2B15551234567&Body=Invalid+signature+test"
```

**Checks:**
- ✅ Response status is `401` or `403`
- ✅ Error body indicates `signature_verification_failed`
- ❌ No delivery recorded for the rejected event

### 6. Negative Test — Missing X-Twilio-Signature Header

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/twilio \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=%2B15551234567&Body=Missing+signature+test"
```

**Checks:**
- ✅ Response status is `401`
- ✅ Error body indicates `missing_signature_header`

### 7. Negative Test — Invalid Content Type (Non-Form Data)

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/twilio \
  -H "X-Twilio-Signature: base64invalidsignature=" \
  -H "Content-Type: application/json" \
  -d '{"From": "+15551234567", "Body": "JSON test"}'
```

**Checks:**
- ✅ Response status is `400`
- ✅ Error body indicates `invalid_content_type` or `expected_form_encoded`

### 8. Evidence Capture

```bash
mkdir -p docs/80-EVIDENCE/public-docs/twilio-post-cloud-$(date +%Y%m%d)

curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=twilio > \
  docs/80-EVIDENCE/public-docs/twilio-post-cloud-$(date +%Y%m%d)/delivery-log.json

zen package evidence twilio --output=json > \
  docs/80-EVIDENCE/public-docs/twilio-post-cloud-$(date +%Y%m%d)/validation-evidence.json

cat > docs/80-EVIDENCE/public-docs/twilio-post-cloud-$(date +%Y%m%d)/README.md << 'SUMMARY'
# Twilio Post-Cloud Validation

Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Validator: $(whoami)
Cloud Endpoint: <endpoint-url>
Twilio Account: <account-sid>
Results: <PASS / FAIL>
SUMMARY
```

**Evidence artifacts:**
- Delivery log showing received Twilio events
- Signature verification results (positive and negative)
- Status callback delivery evidence (if applicable)
- Error responses showing rejection of invalid/missing signatures
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

- ✅ Twilio inbound SMS webhook received and delivered (positive test)
- ✅ `X-Twilio-Signature` header present and verified by platform
- ✅ Manual signature re-verification matches platform result
- ✅ Invalid or missing signature events are rejected
- ✅ Status callback events (if applicable) are delivered
- ✅ Evidence is captured and stored
- ❌ No live credentials appear in evidence artifacts
- ❌ No claim of "live validated" or "GA" in evidence output

## Troubleshooting

### Twilio Webhook Not Delivered

- **Webhook URL mismatch:** Verify the URL in Twilio Console > Phone Numbers >
  `{number}` > Messaging matches the cloud endpoint
- **Trial account restrictions:** Trial accounts can only send SMS to verified
  caller IDs; upgrade for production-level testing
- **Geo-restrictions:** Verify the target phone number is in a region supported
  by the Twilio account

### Signature Verification Fails

- **Full URL signed:** Twilio signs the full request URL including query
  parameters; verify the platform reconstructs the signed URL exactly
- **Parameter ordering:** Twilio expects parameters in sorted order; verify
  the platform sorts form parameters before signature computation
- **Auth Token:** Verify the Twilio Auth Token used for signature validation
  matches the one in Twilio Console

### Status Callbacks Not Received

- **Callback URL:** Ensure the `StatusCallback` parameter is included in outbound
  API requests
- **Delivery delay:** Status callbacks arrive after delivery attempt; may be
  delayed several seconds

## Related

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview)
- [Twilio v2 Package](./packages/twilio-v2)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Provider Test Account Checklist](./provider-test-account-checklist)
- [Twilio Post-Cloud Validation Evidence Template](./evidence-templates/twilio-live-validation-evidence-template)

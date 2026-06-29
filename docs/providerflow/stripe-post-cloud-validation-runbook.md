---
sidebar_label: Stripe Post-Cloud Validation
---

# Stripe Post-Cloud Validation Runbook

**Status:** Requires Cloud Deploy + Live Credentials
**Audience:** Operators
**Priority:** P0

## Objective

Revalidate the Stripe package against the production cloud endpoint with live
Stripe credentials. This is the final validation step before Stripe's
`live_e2e_status` can move from `cloud_gated` to `live_validated`.

## Prerequisites

- ✅ Public cloud endpoint deployed (control plane reachable)
- ✅ Stripe test/live account with webhook event generation capability
- ✅ Stripe webhook signing secret (`whsec_...`)
- ✅ Stripe API key (test mode: `sk_test_...`)
- ✅ Cloud endpoint registered as Stripe webhook endpoint
- ✅ [`stripe` CLI](https://stripe.com/docs/stripe-cli) installed (for event
  triggering, optional — manual HTTP also works)
- ❌ No live credentials in docs or generated evidence artifacts

## Validation Sequence

### 1. Positive Test — Send Real Webhook Event via Stripe API

Trigger a Stripe event and verify it reaches the cloud endpoint:

```bash
# Trigger a test event (requires stripe CLI)
stripe trigger payment_intent.succeeded
```

**Expected:** Stripe delivers the webhook to the cloud endpoint.

### 2. Positive Test — Verify Delivery via Platform API

Verify the webhook appears in platform delivery logs:

```bash
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=stripe&limit=1 | jq .
```

**Checks:**
- ✅ Delivery recorded with `status: delivered`
- ✅ Event type matches the triggered event
- ✅ Timestamp is recent (within 60s of trigger)

### 3. Signature Validation — Verify Stripe-Signature Header

Confirm the platform validated the Stripe HMAC signature:

```bash
# Retrieve the raw webhook headers from delivery evidence
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries/${DELIVERY_ID}/evidence | jq '.headers["Stripe-Signature"]'
```

Manually verify the signature using the signing secret:

```bash
# Using the platform's evidence output
zen package verify-signature stripe \
  --payload payload.json \
  --signature-header "$STRIPE_SIGNATURE" \
  --secret "$STRIPE_WHSEC"
```

**Checks:**
- ✅ `Stripe-Signature` header is present
- ✅ Signature verification returns `valid: true`
- ✅ `t=` timestamp is within acceptable skew (≤ 5 minutes)

### 4. Negative Test — Invalid HMAC Signature

Send a modified payload to confirm rejection:

```bash
# Send a request with tampered payload
curl -X POST https://api.zen-mesh.io/v1/webhooks/stripe \
  -H "Stripe-Signature: t=1719184800,v1=invalidsignature" \
  -H "Content-Type: application/json" \
  -d '{"id": "evt_bad", "object": "event", "type": "payment_intent.succeeded"}'
```

**Checks:**
- ✅ Response status is `401` or `403`
- ✅ Error body indicates `signature_verification_failed`
- ❌ No delivery recorded for the rejected event

### 5. Negative Test — Unknown Event Type

Send a well-signed event with an unsupported type:

```bash
# Generate valid signature for custom event
TIMESTAMP=$(date +%s)
PAYLOAD='{"id":"evt_custom","object":"event","type":"charge.captured"}'
SIGNED=$(printf '%s' "$PAYLOAD" | openssl dgst -sha256 -hmac "$STRIPE_WHSEC" | awk '{print $2}')
curl -X POST https://api.zen-mesh.io/v1/webhooks/stripe \
  -H "Stripe-Signature: t=$TIMESTAMP,v1=$SIGNED" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
```

**Checks:**
- ❌ Delivery may be accepted or rejected depending on platform routing policy
- ✅ If accepted, event type recorded as `unmapped`
- ✅ No delivery to unsupported target

### 6. Negative Test — Missing Stripe-Signature Header

Send a well-formed payload without the signature header:

```bash
curl -X POST https://api.zen-mesh.io/v1/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"id": "evt_nosig", "object": "event", "type": "payment_intent.succeeded"}'
```

**Checks:**
- ✅ Response status is `401`
- ✅ Error body indicates `missing_signature_header`

### 7. Evidence Capture

Capture all validation evidence:

```bash
# Create evidence directory
mkdir -p docs/80-EVIDENCE/public-docs/stripe-post-cloud-$(date +%Y%m%d)

# Capture delivery logs
curl -s -H "Authorization: Bearer ${PLATFORM_TOKEN}" \
  https://api.zen-mesh.io/v1/deliveries?provider=stripe > \
  docs/80-EVIDENCE/public-docs/stripe-post-cloud-$(date +%Y%m%d)/delivery-log.json

# Capture validation results
zen package evidence stripe --output=json > \
  docs/80-EVIDENCE/public-docs/stripe-post-cloud-$(date +%Y%m%d)/validation-evidence.json

# Generate summary
cat > docs/80-EVIDENCE/public-docs/stripe-post-cloud-$(date +%Y%m%d)/README.md << 'SUMMARY'
# Stripe Post-Cloud Validation

Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Validator: $(whoami)
Cloud Endpoint: <endpoint-url>
Stripe Account: <test/live indicator>
Results: <PASS / FAIL>
SUMMARY
```

**Evidence artifacts:**
- Delivery log showing received events and status
- Signature verification results (positive and negative)
- Screenshot or API response showing rejected invalid-signature event
- Summary document with pass/fail per test

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All tests pass — validation success |
| `1` | One or more positive tests fail |
| `2` | One or more negative tests fail (missing rejection) |
| `3` | Signature verification fails |
| `4` | Evidence capture fails |
| `5` | Credential or access error |

## Validation Success Criteria

Validation passes when ALL of the following are true:

- ✅ Stripe webhook event received and delivered (positive test)
- ✅ Stripe-Signature header present and verified by platform
- ✅ Manual signature re-verification matches platform result
- ✅ Invalid signature events are rejected with `401`/`403`
- ✅ Missing signature header events are rejected
- ✅ Evidence is captured and stored
- ❌ No live credentials appear in evidence artifacts
- ❌ No claim of "live validated" or "GA" in evidence output

## Troubleshooting

### Signature Verification Fails

- **Clock skew:** Ensure platform and Stripe timestamps are within 5 minutes
- **Wrong secret:** Verify `whsec_...` secret matches the endpoint in Stripe
  Dashboard
- **Payload encoding:** Stripe signs the raw JSON body; verify exact payload
  bytes match what was signed

### Delivery Not Received

- **Webhook endpoint not configured:** Verify Stripe Dashboard webhook endpoint
  URL points to the cloud endpoint
- **Secret not matching:** Re-check `webhook signing secret` in Dashboard
- **Network/firewall:** Confirm cloud endpoint is publicly reachable

### Evidence Capture Fails

- **Platform token expired:** Re-authenticate with platform
- **API endpoint not reachable:** Verify cloud endpoint is up
- **Provider not configured:** Check provider is enabled in cloud deployment

## Related

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview)
- [Stripe Real Webhook Runbook](../runbooks/stripe-real-webhook) — Pre-deployment real webhook validation
- [Stripe v2 Package](./packages/stripe-v2)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
- [Provider Test Account Checklist](./provider-test-account-checklist)
- [Stripe Post-Cloud Validation Evidence Template](./evidence-templates/stripe-live-validation-evidence-template)

---
sidebar_label: Real Webhook Validation
---

# Real Webhook Validation Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate ProviderFlow packages with real webhook payloads from providers.

## Prerequisites

- ✅ Package successfully deployed to production
- ✅ Authorization to perform real webhook validation
- ✅ Access to provider webhook endpoint
- ✅ Access to target webhook endpoint

## Overview

Real webhook validation tests packages with actual provider webhook payloads. It is **requires authorization**.

## When to Use

This runbook is for:
- ⚠️ Real webhook testing (requires authorization)
- ⚠️ Contract validation with real data
- ⚠️ Integration testing

This runbook is **NOT** for:
- ❌ Sandbox validation
- ❌ Pre-deployment validation
- ❌ Automated validation

## Authorization Required

⚠️ **Real webhook validation requires explicit authorization from operators.**

**Authorization process:**
1. Submit request to operations team
2. Provide webhook URLs
3. Provide test data
4. Await approval
5. Perform validation
6. Document results

## Validation Steps

### Step 1: Get Test Data

Get test data from provider:

```bash
# Get sample webhook payloads from provider documentation
curl -X GET https://api.provider.com/webhooks/sample
```

**Test data includes:**
- Sample event type
- Sample payload
- Sample headers
- Sample signature

### Step 2: Send Webhook

Send webhook to endpoint:

```bash
curl -X POST <endpoint-url> \
  -H "Content-Type: application/json" \
  -H "X-Provider-Signature: <signature>" \
  -d @test-data.json
```

**Check:**
- ✅ Webhook received
- ✅ Signature verified
- ✅ Status code is 200

### Step 3: Verify Delivery

Verify delivery to target:

```bash
curl -X GET <target-webhook-url>/delivery
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

**Check:**
- ✅ Output format is correct
- ✅ Output contains expected fields
- ✅ Output matches golden

### Step 5: Validate Contract

Validate contract:

```bash
zen package validate <package-name> --test-data=<test-data.json>
```

**Check:**
- ✅ Event type matches contract
- ✅ Payload matches contract schema
- ✅ No validation errors

### Step 6: Generate Evidence

Generate evidence:

```bash
zen package evidence <package-name> --output=json
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

## Validation Failure

Validation fails when:
- ❌ Exit code is non-zero
- ❌ Webhook not received
- ❌ Delivery failed
- ❌ Output format incorrect
- ❌ Output doesn't match golden

**Troubleshooting:**

1. Review error messages
2. Check webhook delivery
3. Check target delivery
4. Check output
5. Fix issues
6. Re-validate

## Security Considerations

### Authentication

All authentication configurations are validated:

```bash
zen package inspect <package-name>
```

**Checks:**
- ✅ API key validation
- ✅ Bearer token validation
- ✅ Header-based authentication
- ✅ Authentication boundaries enforced

### No Arbitrary Execution

Packages do not execute arbitrary JavaScript or runtime code:

- ✅ Deterministic YAML/DAG processing only
- ✅ No JavaScript execution
- ✅ No arbitrary runtime code
- ✅ No plugins or extensions

### Secret Redaction

All secrets are redacted from outputs:

- ✅ API keys redacted
- ✅ Tokens redacted
- ✅ Credentials redacted
- ✅ No secrets in traces

### Audit Trail

All operations are logged for audit purposes:

- ✅ Webhook delivery logged
- ✅ Delivery failures logged
- ✅ Errors and warnings logged

## Authorization

⚠️ **Real webhook validation requires explicit authorization from operators.**

**Authorization checklist:**
- [ ] Webhook URLs provided
- [ ] Test data provided
- [ ] Timeline is acceptable
- [ ] Risk is acceptable

## Real Webhook Runbooks

For specific providers:

- [Stripe Real Webhook](./stripe-real-webhook.md)
- [Shopify Real Webhook](./shopify-real-webhook.md)
- [GitLab Real Webhook](./gitlab-real-webhook.md)
- [Terraform Cloud Real Webhook](./terraform-cloud-real-webhook.md)
- [Doppler Real Webhook](./doppler-real-webhook.md)

## Related

- [Sandbox Validation](./sandbox-validation.md)
- [Prod Revalidation](./prod-revalidation.md)
- [Package Validation](../providerflow/package-validation.md)

---

**Next:** [Rollback and Abort](./rollback-and-abort.md)

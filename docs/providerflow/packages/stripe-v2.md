---
sidebar_label: Stripe v2
---

# Stripe v2 Package

**Ownership:** Official
**Maturity:** GA
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** Payment Processing

## Overview

The Stripe v2 package processes Stripe webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.failed`
- ✅ `charge.succeeded`
- ✅ `charge.refunded`

## YAML/DAG Contract

```yaml
package:
  name: stripe-v2
  version: 2.0.0
  provider: stripe
  visibility: internal/private
  description: "Stripe webhook processing package for payments"
  canonical_layer: data
  canonical_area: payment-processing

endpoints:
  - name: payment-event
    provider: stripe
    url: https://your-domain.com/webhooks/stripe
    auth: {type: api_key, key: X-Stripe-Token}
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded
      - charge.refunded

targets:
  - name: data-warehouse
    provider: stripe
    url: https://api.data-warehouse.com/events
    auth: {type: bearer, token: {{DATA_WAREHOUSE_TOKEN}}}
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded

flows:
  - name: payment-events
    provider: stripe
    endpoint: payment-event
    target: data-warehouse
    events:
      - payment_intent.succeeded
      - payment_intent.failed
      - charge.succeeded
      - charge.refunded
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: api_key
  key: X-Stripe-Token
  value: ***
```

Uses Stripe API key for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{DATA_WAREHOUSE_TOKEN}}
```

Uses bearer token for data warehouse delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/stripe/payment_intent.succeeded.json`

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
    "created": 1719184800
  }
}
```

## Goldens

Expected output data.

**Example:** `goldens/stripe/payment_intent.succeeded.json`

```json
{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

## Sandbox Validation State

✅ **Sandbox Validated**

- All event types validated
- Authentication boundaries verified
- Output format validated against goldens
- No errors or warnings

## Production Revalidation

⚠️ **Pending**

Full production deployment and validation requires:

1. Controlled deployment to production
2. Explicit approval from operators
3. Production evidence collection
4. Production validation against real data

## Real Webhook Runbook

Runbook not yet available for production validation.

## Readiness Gate

| Criteria | Status | Evidence |
|----------|--------|----------|
| Transform package | ✅ PASS | packages/transforms/stripe/v1/package.yaml |
| Event YAML definitions | ✅ PASS | payment_events.yaml, subscription_events.yaml, invoice_events.yaml, customer_events.yaml |
| Fixtures (13 scenarios) | ✅ PASS | 13 test inputs covering happy path, failures, auth, malformed |
| Golden outputs | ✅ PASS | 13 matching golden JSONs |
| Golden test validation | 🔶 EXCLUDED | Stripe excluded from test_provider_pack_golden_validation.py (ST-02, Hermes) |
| Offline transform tests | ✅ PASS | test_provider_pack_offline_transform_tests.py |
| Authprofile module | ✅ PASS | stripe-signature-v1 authProfile |
| HMAC signature enforcement | ✅ PASS | stripe-v1-conformance with negative test cases |
| Live E2E validated | ✅ PASS | Multiple runbooks executed (STRIPE_E2E_RUNBOOK, LOCAL_NAT_E2E) |
| Docs package | ✅ PASS | This document |
| E2E runbook | ✅ PASS | docs/20-OPERATIONS/STRIPE_E2E_RUNBOOK.md |
| Troubleshooting | ✅ PASS | See Troubleshooting section below |
| Launch hardening | ✅ PASS | See Launch Hardening section below |

**Status:** CONDITIONAL_PASS — blocked only on golden test inclusion (ST-02, runtime-owned).

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|-----------|
| Webhook not received | Incorrect URL or Stripe webhook endpoint misconfigured | Verify the URL matches the Zen Mesh ingester endpoint in Stripe Dashboard |
| Signature mismatch | Webhook signing secret mismatch | Re-enter the signing secret in both Stripe and Zen Mesh config |
| Event not transformed | Unknown event type | Verify the event type is in the supported list (payment_intent, charge, etc.) |
| Delivery failing | Target endpoint unreachable | Verify the target URL and bearer token are correct |
| Duplicate events | Idempotency key collision | Verify `id` field is unique per event; dedup uses `$.id` with `evt_` prefix |
| Stale timestamp rejection | Clock skew beyond allowed window | Verify system clock is synchronized (NTP); adjust timestamp window if needed |
| Malformed payload rejected | Invalid JSON or missing required fields | Verify the webhook payload matches expected schema |
| Transform not matching golden | Fixture not representative | Add a fixture matching the real event shape |

## Launch Hardening

### Hardening Status

**Classification: LAUNCH_QUALIFIED — E2E VALIDATED**

Stripe has been validated against real Stripe webhook events. All core security controls (HMAC signature, timestamp validation, payload integrity) are implemented and tested.

### Known Gaps

#### 1. Golden Test Inclusion — P0 (PENDING)

**Risk Level:** Medium (validation)

Stripe is excluded from the Python golden validation test suite (`test_provider_pack_golden_validation.py`). The suite validates golden schema, secret leakage, and input-to-golden mapping for github, shopify, and twilio — but not Stripe.

**Required Work:** Add Stripe to the provider list in the golden test suite (Hermes — ST-02).

**Impact:** Stripe goldens are only validated by offline transform tests, not the dedicated golden validation runner.

#### 2. Observability Mappings — V1.1

**Risk Level:** Low

No dedicated observability mapping doc exists. Post-launch item.

### Hardening Roadmap

| Item | Priority | Status | Target |
|------|----------|--------|--------|
| Golden test suite inclusion (ST-02) | P1 | PENDING | Pre-V1 (Hermes) |
| Observability mappings | P2 | NOT STARTED | V1.1 |

### Overclaim Prevention

The following must NOT be stated until proven:
- "Stripe V1 package is fully validated" — blocked on ST-02
- "All provider packages are V1-complete" — GitHub, Shopify, Twilio are blocked

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**

## Usage

Validate the package:

```bash
zen package validate stripe-v2
```

Inspect the package:

```bash
zen package inspect stripe-v2
```

Get package evidence:

```bash
zen package evidence stripe-v2
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

---
sidebar_label: Twilio v2
---

# Twilio v2 Package

**Ownership:** Official
**Maturity:** Preview
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** Communications

## Overview

The Twilio v2 package processes Twilio webhook events (SMS, voice, verification) and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

**V1 Status: BLOCKED** — Twilio cannot be claimed V1-ready until runtime blockers TW-01, TW-02, and TW-03 are closed (see [Known Gaps](#known-gaps)).

## Supported Event Families

- ✅ **Messaging** — inbound SMS/MMS, message delivery status
- ✅ **Voice** — inbound calls, call lifecycle status, call recording availability
- ✅ **Verification** — verification code status (pending, approved, denied)

### Event Type Mapping

| Twilio Webhook Event | Zen Event Type | Priority |
|---|---|---|
| `incoming-message` | `message.incoming` | 70 |
| `message-status` | `message.status` | 75 |
| `incoming-call` | `call.incoming` | 60 |
| `call-status` | `call.status` | 65 |
| `recording-status` | `recording.status` | 70 |
| `verification-status` | `verification.status` | 80 |

## Request Format

Twilio sends webhooks as `application/x-www-form-urlencoded` POST requests. The ingester parses form-encoded fields into a body object before transform rules apply.

### Required Headers

| Header | Description |
|--------|-------------|
| `X-Twilio-Signature` | HMAC signature (format: Base64(HMAC-SHA1(AuthToken, URL + sorted_params))) — NOT cryptographically validated until TW-01 is closed |
| `X-Twilio-Event` | Event type discriminator (e.g. `incoming-message`) |
| `Content-Type` | `application/x-www-form-urlencoded` |

### Form-Encoding Note

Twilio POST bodies are URL-form-encoded, not JSON. The authprofile module parses form fields and presents them as a JSON-like body object. Runtime verification of form-encoding correctness is tracked as TW-03.

## Transform Package

```yaml
package:
  name: twilio-v2
  version: 2.0.0
  provider: twilio
  visibility: internal/private
  description: "Twilio webhook processing package for communications"
  canonical_layer: data
  canonical_area: communications

endpoints:
  - name: twilio-webhook
    provider: twilio
    url: https://your-domain.com/webhooks/twilio
    auth: {type: api_key, key: X-Twilio-Signature}
    events:
      - message.incoming
      - message.status
      - call.incoming
      - call.status
      - recording.status
      - verification.status

targets:
  - name: communications-warehouse
    provider: twilio
    url: https://api.communications-warehouse.com/events
    auth: {type: bearer, token: {{COMMS_WAREHOUSE_TOKEN}}}
    events:
      - message.incoming
      - message.status
      - call.incoming

flows:
  - name: twilio-events
    provider: twilio
    endpoint: twilio-webhook
    target: communications-warehouse
    events:
      - message.incoming
      - message.status
      - call.incoming
      - call.status
      - recording.status
      - verification.status
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: api_key
  key: X-Twilio-Signature
  value: ***
```

Uses Twilio HMAC-SHA1 signature for webhook authentication. The authprofile module exists (`authprofile/twilio/twilio.go`) but cryptographic enforcement is pending (TW-01).

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{COMMS_WAREHOUSE_TOKEN}}
```

Uses bearer token for communications data warehouse delivery.

## Fixtures

Test input data for validation. 5 fixture/golden pairs covering all event families.

**Example:** `fixtures/twilio/incoming_sms.json`

```json
{
  "headers": {
    "x-twilio-signature": "abc123def456...",
    "x-twilio-event": "incoming-message",
    "content-type": "application/x-www-form-urlencoded"
  },
  "body": {
    "MessageSid": "SMabc123def456...",
    "From": "+15017122661",
    "To": "+15551234567",
    "Body": "Hello from Twilio!",
    "MessageDirection": "inbound",
    "SmsStatus": "received",
    "AccountSid": "ACabc123def456..."
  }
}
```

## Goldens

Expected output data for each fixture.

**Example:** `goldens/twilio/incoming_sms.golden.json`

```json
{
  "destination": "communications-warehouse",
  "event_type": "message.incoming",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "message_sid": "SMabc123def456...",
    "from_number": "+15017122661",
    "to_number": "+15551234567",
    "message_body": "Hello from Twilio!",
    "message_direction": "inbound",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

## Sandbox Validation State

✅ **Sandbox Validated**

- All event families validated via offline fixtures
- Transform rules tested against 5 fixture/golden pairs
- Golden test validation: ✅ PASS (`test_provider_pack_golden_validation.py`)
- Offline transform tests: ✅ PASS (`test_provider_pack_offline_transform_tests.py`)
- No errors or warnings in offline validation

## Production Revalidation

⚠️ **Pending**

Full production deployment and validation requires:

1. Controlled deployment to production
2. Live E2E validation against real Twilio callbacks (TW-02)
3. Signature enforcement verification (TW-01)
4. Form-encoding runtime verification (TW-03)
5. Production evidence collection

## Real Webhook Runbook

Runbook exists at `docs/90-RELEASES/providers/twilio/E2E_RUNBOOK.md` (platform repo). Template-ready but requires live Twilio account for full execution.

## Quickstart

Setup guide exists at `docs/90-RELEASES/providers/twilio/QUICKSTART.md` (platform repo).

## Readiness Gate

| Criteria | Status | Evidence |
|----------|--------|----------|
| Transform package | ✅ PASS | `packages/transforms/twilio/v1/package.yaml` |
| Event YAML definitions | ✅ PASS | `message_events.yaml`, `call_events.yaml`, `verification_events.yaml` |
| Fixtures (5 scenarios) | ✅ PASS | 5 input fixtures covering SMS, voice, verification |
| Golden outputs | ✅ PASS | 5 matching golden JSONs |
| Golden test validation | ✅ PASS | `test_provider_pack_golden_validation.py` |
| Offline transform tests | ✅ PASS | `test_provider_pack_offline_transform_tests.py` |
| Authprofile module | ✅ PASS | `authprofile/twilio/twilio.go` |
| Request signature enforcement | 🔶 PENDING | TW-01 — backend hardening not yet wired (Hermes) |
| Ingester example | ✅ PASS | `examples/twilio-ingester.yaml` |
| Quickstart | ✅ PASS | `docs/90-RELEASES/providers/twilio/QUICKSTART.md` |
| E2E runbook | ✅ PASS | `docs/90-RELEASES/providers/twilio/E2E_RUNBOOK.md` |
| Troubleshooting | ✅ PASS | `docs/90-RELEASES/providers/twilio/TROUBLESHOOTING.md` |
| Launch hardening | ✅ PASS | `docs/90-RELEASES/providers/twilio/LAUNCH_HARDENING.md` |
| Docs package | ✅ PASS | This document |
| Live E2E validated | ❌ NOT VALIDATED | TW-02 — requires real Twilio account (Hermes + DocsAI) |
| Form-encoding runtime verification | 🔶 PENDING | TW-03 — runtime verification not yet performed (Hermes) |

**Status:** V1_BLOCKED — blocked on three runtime-owned blockers (TW-01 signature enforcement, TW-02 live E2E, TW-03 form-encoding runtime verification).

### Prerequisites

Before running the readiness gate:

- Twilio webhook endpoint URL generated in Zen Mesh
- Status Callback URLs configured in Twilio Console
- Transform package loaded (`zen package validate twilio-v2`)
- Offline fixtures passing
- Destination configured for event forwarding

### PASS Criteria

- All PASS-status criteria above are green
- No test failures in offline transform or golden validation

### FAIL Criteria

- Any PASS-status criterion above is not met
- Open runtime blockers (TW-01, TW-02, TW-03) are not acknowledged

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|-----------|
| No events received | Status Callback URL not configured or incorrect | Verify URL in Twilio Console matches Zen Mesh ingester endpoint |
| Missing/invalid `X-Twilio-Signature` | Signature validation not enforced | Accepts any signature until TW-01 closes. Use HTTPS for transport security. |
| URL/canonical request mismatch | Twilio computes signature over URL + sorted params | The signature computation includes the full callback URL; verify URL is stable |
| Form-encoding mismatch | Content-Type not `application/x-www-form-urlencoded` | Confirm Twilio is configured to send form-encoded data; verify ingester parses form fields |
| Replay/duplicate event | Twilio retries on non-2xx | Ensure target returns 200 promptly; dedup uses `MessageSid`/`CallSid` with `tw-` prefix |
| Unsupported event family | Event not in `message_events.yaml`, `call_events.yaml`, or `verification_events.yaml` | Add new event rules and regenerate golden fixtures |
| Transform mismatch | Fixture not representative | Add a fixture matching the real event shape |
| DLQ/retry path | Delivery failure to target | Check target endpoint health; verify bearer token; inspect DLQ |
| Operator evidence paths | Runbooks reference platform assets | See `docs/90-RELEASES/providers/twilio/E2E_RUNBOOK.md` and `TROUBLESHOOTING.md` |

### What is NOT validated until TW-01/TW-03 close

- Cryptographic validation of `X-Twilio-Signature` (TW-01)
- Form-encoding correctness with real Twilio callbacks (TW-03)
- End-to-end delivery against live Twilio account (TW-02)

## Launch Hardening

### Hardening Status

**Classification: FIRST_CLASS_TEMPLATE — NOT LIVE-VALIDATED**

Twilio has full template-pack parity with the Stripe launch pack structure but has not been validated against a live Twilio source.

### Known Gaps

#### 1. Request Signature Enforcement — P0 (PENDING) — TW-01

**Risk Level:** High (security)

Twilio sends an `X-Twilio-Signature` header (HMAC-SHA1) with each webhook. The authprofile module exists but cryptographic validation is not wired in.

**Required Work:** Implement X-Twilio-Signature HMAC validation in the Twilio authprofile (Hermes — TW-01).

**Impact:** Until closed, a malicious actor could send forged Twilio events to the ingestion endpoint.

#### 2. Live Twilio Webhook Receipt — P1 (PENDING) — TW-02

**Risk Level:** Medium (integration)

No live Twilio account has been configured to send status callbacks. All transform behavior is validated via offline fixtures only.

**Required Work:** Set up a Twilio account, configure callbacks, send real events, capture evidence (Hermes + DocsAI — TW-02).

#### 3. Form-Encoding Runtime Verification — P1 (PENDING) — TW-03

**Risk Level:** Medium (correctness)

Twilio sends `application/x-www-form-urlencoded` data. The authprofile module handles form parsing but runtime verification has not been performed.

**Required Work:** Verify form-encoding parsing with real Twilio callbacks and edge cases (Hermes — TW-03).

### Hardening Roadmap

| Item | Priority | Status | Target | Owner |
|------|----------|--------|--------|-------|
| X-Twilio-Signature enforcement (TW-01) | P0 | PENDING | Pre-V1 | Hermes |
| Live Twilio E2E validation (TW-02) | P1 | NOT STARTED | Post-V1-blockers | Hermes + DocsAI |
| Form-encoding runtime verification (TW-03) | P1 | NOT STARTED | Post-V1-blockers | Hermes |
| Replay protection enhancement | P2 | Dedup only | Future | Hermes |

### Overclaim Prevention

The following must NOT be stated until proven:
- "Twilio webhooks are cryptographically verified" — blocked on TW-01
- "Twilio live delivery is validated" — blocked on TW-02
- "Twilio form-encoding is correct at runtime" — blocked on TW-03
- "Twilio V1 package is fully validated" — blocked on TW-01/02/03

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT live-E2E-validated**
- ❌ **NOT signature-enforced**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**

## Usage

Validate the package:

```bash
zen package validate twilio-v2
```

Inspect the package:

```bash
zen package inspect twilio-v2
```

Get package evidence:

```bash
zen package evidence twilio-v2
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)
- Twilio platform assets: `docs/90-RELEASES/providers/twilio/` (QUICKSTART, E2E_RUNBOOK, READINESS_GATE, TROUBLESHOOTING, LAUNCH_HARDENING)
- [Provider Package V1 Readiness Matrix](../provider-package-v1-readiness-matrix)

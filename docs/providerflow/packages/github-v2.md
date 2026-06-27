---
sidebar_label: GitHub v2
---

# GitHub v2 Package

**Ownership:** Official
**Maturity:** Preview
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** Developer Platforms

## Overview

The GitHub v2 package processes GitHub webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

**V1 Status:** BLOCKED — fixture coverage and live E2E validation are pending runtime work.

## Supported Event Types

- ✅ `push`
- ✅ `pull_request`
- ✅ `issues`

## YAML/DAG Contract

```yaml
package:
  name: github-v2
  version: 2.0.0
  provider: github
  visibility: internal/private
  description: "GitHub webhook processing package for developer platforms"
  canonical_layer: data
  canonical_area: developer-platforms

endpoints:
  - name: github-webhook
    provider: github
    url: https://your-domain.com/webhooks/github
    auth: {type: api_key, key: X-Hub-Signature-256}
    events:
      - push
      - pull_request
      - issues

targets:
  - name: dev-platform-warehouse
    provider: github
    url: https://api.dev-platform.com/events
    auth: {type: bearer, token: {{DEV_PLATFORM_TOKEN}}}
    events:
      - push
      - pull_request
      - issues

flows:
  - name: github-events
    provider: github
    endpoint: github-webhook
    target: dev-platform-warehouse
    events:
      - push
      - pull_request
      - issues
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: api_key
  key: X-Hub-Signature-256
  value: ***
```

Uses GitHub HMAC-SHA256 (`X-Hub-Signature-256`) for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{DEV_PLATFORM_TOKEN}}
```

Uses bearer token for dev platform delivery.

## Transform Package

Runtime transform package: `packages/transforms/github/v1/package.yaml`

| Property | Value |
|----------|-------|
| maturity (package.yaml) | production |
| family | developer-platforms |
| dedupStrategy | idempotency_key on `$.headers.x-github-delivery` |
| authProfile | github-hmac-sha256-v1 |
| conformance testSuite | github-v1-conformance |
| conformance passRate | 100% |

Event definitions:
- `push_events.yaml` — Push events with commit metadata
- `pull_request_events.yaml` — Pull request lifecycle events
- `issue_events.yaml` — Issue creation and update events

## Fixtures

| Input | Golden | Event Type |
|-------|--------|------------|
| push_event.json | push_event.golden.json | push |

**Current fixture count: 1** (target minimum: 5 — tracked as GH-01)

Fixture status: 🔶 MINIMAL — expansion to 5+ scenarios is a runtime-owned blocker (Hermes).

## Sandbox Validation State

✅ **Sandbox validated (offline fixtures)**

- Transform package loads and parses correctly
- Event YAML definitions are valid
- Golden output schema validated
- Offline transform tests PASS

## E2E Runbook

### Scope

This runbook describes the end-to-end flow for receiving GitHub webhook events through Zen Mesh and delivering them to a private backend target.

**Status:** Template-validated with offline fixtures. Live GitHub webhook receipt is NOT yet validated against a real GitHub repository.

### Prerequisites

- Zen Mesh sandbox or production environment deployed
- A GitHub repository with admin access to configure webhooks
- A target backend service capable of receiving HTTP POST

### Phase 1: Offline Fixture Validation

Validate transform packages using golden fixtures:

```bash
python3 tests/test_provider_pack_golden_validation.py
python3 tests/test_provider_pack_offline_transform_tests.py
```

Expected: All GitHub golden validations PASS (schema, no-secrets, golden coverage).

### Phase 2: Local Ingestion

1. Deploy the GitHub ingester example:
   ```bash
   kubectl apply -f src/data-and-edge-planes/zen-ingester/examples/github-ingester.yaml
   ```
2. Send a test fixture payload to the ingester endpoint:
   ```bash
   curl -X POST http://localhost:8080/webhooks/github \
     -H "X-GitHub-Event: push" \
     -H "X-Hub-Signature-256: sha256=redacted" \
     -d @packages/transforms/github/v1/testdata/push_event.json
   ```
3. Verify the transformed event matches the golden output.

### Phase 3: GitHub Webhook Configuration

1. In your GitHub repository, go to **Settings → Webhooks → Add webhook**.
2. Set the Payload URL to the Zen Mesh ingestion endpoint.
3. Set Content type to `application/json`.
4. Select the events to send (push, pull_request, issues).
5. Note the webhook secret for Zen Mesh configuration.

### Phase 4: Delivery Verification

1. Trigger a test event from GitHub (push to the repository, create an issue).
2. Verify the event appears in Zen Mesh delivery logs.
3. Confirm the target backend received the transformed payload.

### Known Gaps

- **HMAC signature enforcement:** DONE (GitHub HMAC-SHA256 is implemented in authprofile)
- **Live E2E validation:** NOT VALIDATED — no live GitHub webhook source tested yet
- **Fixture coverage:** 1 fixture only — needs 5+ for comprehensive validation (GH-01)

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|-----------|
| Webhook not received | Incorrect Payload URL | Verify the URL matches the Zen Mesh ingestion endpoint |
| Signature mismatch | Webhook secret not configured correctly | Re-enter the webhook secret in both GitHub and Zen Mesh config |
| Event not transformed | Unknown event type | Verify the event type is in the supported list |
| Delivery failing | Target endpoint unreachable | Verify the target URL and authentication |
| Duplicate events | Idempotency key not processed | Verify `x-github-delivery` header is present and unique |
| Transform not matching golden | Fixture not representative | Add a fixture matching the real event shape (GH-01) |

## Readiness Gate

| Criteria | Status | Evidence |
|----------|--------|----------|
| Transform package | ✅ PASS | packages/transforms/github/v1/package.yaml |
| Event YAML definitions | ✅ PASS | push_events.yaml, pull_request_events.yaml, issue_events.yaml |
| Golden fixtures validated | ✅ PASS | test_provider_pack_golden_validation.py |
| Offline transform tests | ✅ PASS | test_provider_pack_offline_transform_tests.py |
| Authprofile module | ✅ PASS | src/.../authprofile/github/ |
| Ingester example | ✅ PASS | github-ingester.yaml |
| HMAC signature enforcement | ✅ PASS | github-hmac-sha256-v1 authProfile |
| Minimum 5 fixtures | ❌ FAIL (1 of 5) | Tracked as GH-01 (Hermes) |
| Live E2E validation | ❌ NOT VALIDATED | No live GitHub webhook tested |
| Docs package | ✅ PASS | This document |
| E2E runbook | ✅ PASS | Included in this document |
| Troubleshooting | ✅ PASS | Included in this document |
| Launch hardening | 🔶 PARTIAL | See Launch Hardening section |

**Status:** V1_BLOCKED — fixture coverage (GH-01) must be closed before V1.

## Launch Hardening

### Hardening Status

**Classification: TEMPLATE_PARITY — NOT LIVE-VALIDATED**

GitHub has template parity with the Stripe launch pack structure but has not been validated against a live GitHub source.

### Known Gaps

#### 1. Fixture Coverage — P0 (PENDING)

**Risk Level:** High (quality)

Current fixture coverage is 1 scenario. Minimum target is 5+ scenarios covering:
- Push event (exists)
- Pull request opened
- Pull request closed
- Issues opened
- Issues closed

**Required Work:**
- Expand testdata with additional fixtures (Hermes — GH-01)
- Add matching golden outputs
- Validate all existing event YAMLs have fixture coverage

#### 2. Live GitHub Webhook Receipt — NOT VALIDATED

**Risk Level:** Medium (integration)

No live GitHub repository has been configured to send webhooks to Zen Mesh.

**Required Work:**
- Configure a GitHub repository webhook pointing to the Zen Mesh sandbox
- Send real events and verify end-to-end delivery
- Capture evidence of successful receipt and transformation

### Hardening Roadmap

| Item | Priority | Status | Target |
|------|----------|--------|--------|
| Fixture expansion (5+ scenarios) | P0 | PENDING (GH-01) | Pre-V1 (Hermes) |
| Live GitHub E2E validation | P1 | NOT STARTED | Pre-V1 or post-V1 |

### Overclaim Prevention

The following must NOT be stated until proven with backend tests and live evidence:
- "GitHub webhooks are comprehensively validated"
- "Live GitHub webhook delivery is validated"
- "GitHub V1 package is complete"

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**
- ❌ **NOT V1-complete**

## Usage

Validate the package:

```bash
zen package validate github-v2
```

Inspect the package:

```bash
zen package inspect github-v2
```

Get package evidence:

```bash
zen package evidence github-v2
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)
- [Provider Package V1 Readiness Matrix](../provider-package-v1-readiness-matrix)

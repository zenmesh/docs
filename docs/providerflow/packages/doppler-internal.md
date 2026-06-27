---
sidebar_label: Doppler Internal
---

# Doppler Internal Package

**Ownership:** Community
**Maturity:** Preview
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** Configuration Management

## Overview

The Doppler internal package processes Doppler webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `secret.changed`
- ✅ `env.var.changed`
- ✅ `config.changed`
- ✅ `deployment.started`
- ✅ `deployment.completed`
- ✅ `deployment.failed`

## YAML/DAG Contract

```yaml
package:
  name: doppler-internal
  version: 1.0.0
  provider: doppler
  visibility: internal/private
  description: "Doppler webhook processing package for configuration management"
  canonical_layer: data
  canonical_area: configuration-management

endpoints:
  - name: doppler-webhook
    provider: doppler
    url: https://your-domain.com/webhooks/doppler
    auth: {type: bearer, token: {{DOPPLER_TOKEN}}}
    events:
      - secret.changed
      - env.var.changed
      - config.changed
      - deployment.started
      - deployment.completed
      - deployment.failed

targets:
  - name: config-logs
    provider: doppler
    url: https://api.config-logs.com/events
    auth: {type: bearer, token: {{CONFIG_LOGS_TOKEN}}}
    events:
      - secret.changed
      - env.var.changed
      - config.changed
      - deployment.started
      - deployment.completed
      - deployment.failed

flows:
  - name: doppler-events
    provider: doppler
    endpoint: doppler-webhook
    target: config-logs
    events:
      - secret.changed
      - env.var.changed
      - config.changed
      - deployment.started
      - deployment.completed
      - deployment.failed
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: bearer
  token: {{DOPPLER_TOKEN}}
```

Uses Doppler API token for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{CONFIG_LOGS_TOKEN}}
```

Uses bearer token for config logs delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/doppler/secret/changed.json`

```json
{
  "event": "secret.changed",
  "project": "my-app",
  "env": "production",
  "secret": "DATABASE_PASSWORD",
  "changed_at": "2026-06-24T10:00:00Z"
}
```

## Goldens

Expected output data.

**Example:** `goldens/doppler/secret/changed.json`

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

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**

## Usage

Validate the package:

```bash
zen package validate doppler-internal
```

Inspect the package:

```bash
zen package inspect doppler-internal
```

Get package evidence:

```bash
zen package evidence doppler-internal
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

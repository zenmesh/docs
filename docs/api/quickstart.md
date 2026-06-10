---
sidebar_label: API Quickstart
---

# API Quickstart

This guide walks through the essential Zen Mesh API operations. You will need a valid API key.

## Prerequisites

- An active Zen Mesh tenant
- An API key assigned to your tenant
- `curl` or any HTTP client

## 1. Obtain Your API Key

Your API key is provided during tenant onboarding. Include it in every request:

```bash
export ZEN_API_KEY="zpk_abc123..."
export ZEN_TENANT_ID="ten_..."
```

## 2. Verify Connectivity

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/health | jq .
```

Expected response:

```json
{"status": "ok", "version": "1.0.0"}
```

## 3. List Webhook Sources

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/sources | jq .
```

## 4. Inspect Delivery Attempts

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/deliveries?limit=5 | jq .
```

## 5. Read an Evidence Proof

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/evidence/<delivery-id> | jq .
```

## Next Steps

- See [API Examples](./examples.md) for complete workflows
- Read [Authentication](./authentication.md) for details on key scopes and tenants
- Read [Errors](./errors.md) for error handling patterns

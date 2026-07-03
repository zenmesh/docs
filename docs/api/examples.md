---
sidebar_label: API Examples
---

# API Examples

> Status: PUBLIC_CONTRACT_DRAFT. Examples use placeholder credentials. Replace with your actual tenant API key. Write examples are WIRED_SANDBOX unless otherwise noted — not production-live.

Complete examples for common Zen Mesh API workflows. All examples use the runtime API surface (`/v1/`).

## Setup

```bash
export ZEN_API_KEY="<api_key>"
export ZEN_TENANT_ID="<tenant_id>"
export ZEN_API_BASE="https://api.zen-mesh.io/v1"
```

## Read operations

### List targets

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/destinations"
```

Response:
```json
{
  "destinations": [
    { "id": "dest_abc123", "name": "prod-app-server", "url": "https://app.example.com/webhooks", "status": "active" }
  ]
}
```

### List delivery attempts with filtering

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/deliveries?status=failed&limit=10"
```

Response:
```json
{
  "deliveries": [
    {
      "id": "dlv_abc123",
      "event_id": "evt_abc123",
      "destination_id": "dest_abc123",
      "status": "failed",
      "response_code": 500,
      "attempt_number": 3,
      "attempted_at": "2026-07-03T12:00:03Z",
      "error_message": "upstream timeout"
    }
  ],
  "next_cursor": "eyJvZmZzZXQiOjEwfQ=="
}
```

### Read delivery evidence

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/evidence/dlv_abc123"
```

Response:
```json
{
  "delivery_id": "dlv_abc123",
  "merkle_root": "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",
  "inclusion_proof": ["x1y2z3...", "p4q5r6..."],
  "leaf_hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "timestamp": "2026-07-03T12:00:03Z",
  "status": "confirmed"
}
```

### Query platform logs

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/logs?limit=20&level=error"
```

## Write operations (permissioned)

### Create a target (WIRED_SANDBOX)

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: idem_key_1" \
  -d '{"name": "my-target", "url": "https://example.com/webhooks"}' \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/destinations"
```

Expected response:
```json
{
  "id": "dest_abc123",
  "name": "my-target",
  "url": "https://example.com/webhooks",
  "status": "active",
  "created_at": "2026-07-03T12:00:00Z"
}
```

### Retry a failed delivery (WIRED_SANDBOX)

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Idempotency-Key: idem_key_2" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/events/evt_abc123/retry"
```

Expected response:
```json
{
  "status": "queued",
  "delivery_id": "dlv_def456",
  "message": "Retry initiated"
}
```

### Create a saved payload (WIRED_SANDBOX)

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"name": "test-payload", "payload": {"event_type": "test", "data": {"key": "value"}}}' \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/saved-payloads"
```

### Use idempotency key for safe retry

```bash
# First attempt
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: idem_unique_1" \
  -d '{"name": "my-target", "url": "https://example.com/webhooks"}' \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/destinations"

# Safe retry (same Idempotency-Key returns original response)
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: idem_unique_1" \
  -d '{"name": "my-target", "url": "https://example.com/webhooks"}' \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/destinations"
```

### Paginate through results

```bash
# First page
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/deliveries?limit=10"

# Second page (use next_cursor from response)
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/deliveries?limit=10&cursor=<next_cursor>"
```

## Related

- [API Quickstart](./quickstart) — step-by-step developer journey
- [Authentication](./authentication) — auth model and scopes
- [Write Safety Model](./write-safety) — authorization for write operations
- [Errors and Problem Details](./errors) — error format and handling
- [Idempotency](./idempotency) — idempotency key specification
- [OpenAPI Spec Index](./openapi) — spec files and validation

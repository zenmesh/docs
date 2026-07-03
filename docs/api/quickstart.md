---
sidebar_label: API Quickstart
---

# API Quickstart

> Status: PUBLIC_CONTRACT_DRAFT. This guide demonstrates read and write operations that are WIRED_SANDBOX unless otherwise noted. Write examples are not production-live availability claims.

## Choose a control surface

Before making API calls, decide which surface fits your workflow:

| Surface | Best for | Auth | Read | Write |
|---|---|---|---|---|
| Customer API / runtime APIs | Programmatic integration, CI/CD | API key | Yes | Permissioned |
| MCP | AI agents, operators | MCP key | Yes (default-on) | Disabled by default |
| Dashboard | Interactive management | Session | Yes | Yes (UI) |
| CLI | Scripting, automation | API key or session | Yes | Yes |

This quickstart uses the **Customer API / runtime APIs** surface.

## 1. Get an API key

Generate an API key from the dashboard: Settings → API Keys.

```bash
export ZEN_API_KEY="<api_key>"
export ZEN_TENANT_ID="<tenant_id>"
export ZEN_API_BASE="https://api.zen-mesh.io/v1"
```

See [Authentication](./authentication) for details on API key formats and scopes.

## 2. Verify connectivity

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/health"
```

Expected response:
```json
{ "status": "ok" }
```

## A. Read path (safe operations)

These operations inspect resources and require only read scopes.

### List targets

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/destinations"
```

Expected response:
```json
{
  "destinations": [
    { "id": "dest_abc123", "name": "prod-app-server", "url": "https://app.example.com/webhooks", "status": "active" }
  ]
}
```

See [Targets API](./targets) for full reference.

### List flows

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/delivery-flows"
```

Expected response:
```json
{
  "delivery_flows": [
    { "id": "flow_abc123", "name": "stripe-to-app", "source_id": "ing_abc123", "destination_id": "dest_abc123", "status": "active" }
  ]
}
```

See [Flows API](./flows) for full reference.

### Inspect delivery attempts

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/deliveries?limit=5"
```

See [Delivery Attempts API](./delivery-attempts) for filtering options.

### Check DLQ

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/deliveries?status=failed&limit=5"
```

See [DLQ API](./dlq) for retry relationship.

### Read evidence

```bash
curl -sS -H "Authorization: Bearer $ZEN_API_KEY" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/evidence/<delivery_id>"
```

See [Evidence API](./evidence) for Merkle proof verification.

## B. Write-capable path (requires permissions)

Write operations require appropriate scopes. See [Authentication](./authentication#scopes-and-permissions) for scope requirements and [Write Safety Model](./write-safety) for the safety model.

### Create a target

> Status: WIRED_SANDBOX. Create target is validated in sandbox/local runtime.

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
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

### Create a saved payload template

> Status: WIRED_SANDBOX. Test/template payloads only — not production retained payloads.

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"name": "test-payload", "payload": {"event": "test", "data": {"key": "value"}}}' \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/saved-payloads"
```

See [Saved Payloads API](./saved-payloads) for details.

### Retry a failed delivery

> Status: WIRED_SANDBOX. Retry requires event-level authorization and is idempotent.

```bash
curl -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "Idempotency-Key: $(uuidgen)" \
  "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/events/<event_id>/retry"
```

See [Retry API](./retry) for single and batch retry.

## Next steps

| Resource | Purpose |
|---|---|
| [API Overview](./overview) | Complete API taxonomy and maturity legend |
| [API Status Matrix](./status) | Per-group maturity, auth, read/write status |
| [Authentication](./authentication) | API keys, scopes, MCP auth |
| [Write Safety Model](./write-safety) | Authorization, idempotency, audit |
| [Errors and Problem Details](./errors) | Error format and handling |
| [OpenAPI Spec Index](./openapi) | Spec files and validation |

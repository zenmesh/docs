---
sidebar_label: API Examples
---

# API Examples

Complete examples for common Zen Mesh API workflows. All examples use placeholder credentials — replace with your actual tenant API key.

## Authenticate and Fetch Sources

```bash
export ZEN_API_KEY="zpk_example_key_replace_with_real_key"
export ZEN_TENANT_ID="ten_example_tenant_id"

# List configured webhook sources
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/sources
```

## Check Delivery Status

```bash
# Inspect a specific delivery by ID
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/deliveries/dlv_abc123
```

Response:

```json
{
  "id": "dlv_abc123",
  "status": "delivered",
  "source_id": "src_456",
  "destination_id": "dest_789",
  "attempts": 2,
  "created_at": "2026-06-01T12:00:00Z",
  "delivered_at": "2026-06-01T12:00:03Z"
}
```

## Paginate Through Deliveries

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  "https://api.zen-mesh.io/v1/deliveries?limit=10&cursor=eyJvZmZzZXQiOjB9"
```

The `cursor` parameter returns the next page token in the response's `next_cursor` field.

## Read an Evidence Receipt

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/evidence/dlv_abc123 | jq .
```

The evidence receipt includes a Merkle proof for evidence integrity verification:

```json
{
  "delivery_id": "dlv_abc123",
  "merkle_root": "a1b2c3d4e5f6...",
  "inclusion_proof": ["..."],
  "timestamp": "2026-06-01T12:00:03Z"
}
```

## Query Platform Logs

```bash
curl -s -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  "https://api.zen-mesh.io/v1/logs?limit=20&level=error" | jq .
```

## Use Idempotency Key

```bash
# Safe retry with idempotency key
curl -s -X POST \
  -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  -H "Idempotency-Key: idem_unique_request_1" \
  -H "Content-Type: application/json" \
  -d '{"source_id": "src_456", "event_type": "test"}' \
  https://api.zen-mesh.io/v1/events
```

The same `Idempotency-Key` within the deduplication window returns the original response without side effects.

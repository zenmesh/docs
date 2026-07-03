---
sidebar_label: MCP Examples
---

# MCP Examples

Example prompts and responses for common MCP read operations. All examples use the MCP interface through zen-back.

## Read Delivery Status

**Agent prompt:**
```
Check the delivery status for dlv_abc123
```

**MCP tool call:** `zen_get_delivery(delivery_id="dlv_abc123")`

**Response:**
```json
{
  "id": "dlv_abc123",
  "status": "delivered",
  "source_id": "src_456",
  "destination_id": "dest_789",
  "attempts": 2,
  "delivered_at": "2026-06-01T12:00:03Z"
}
```

## Read Evidence Proof

**Agent prompt:**
```
Get the evidence receipt for that delivery
```

**MCP tool call:** `zen_get_evidence(delivery_id="dlv_abc123")`

**Response:**
```json
{
  "delivery_id": "dlv_abc123",
  "merkle_root": "a1b2c3d4e5f6...",
  "inclusion_proof": ["..."],
  "timestamp": "2026-06-01T12:00:03Z"
}
```

## List Webhook Sources

**Agent prompt:**
```
What webhook sources are configured?
```

**MCP tool call:** `zen_list_sources()`

**Response:**
```json
{
  "sources": [
    {"id": "src_456", "name": "Stripe Production", "provider": "stripe"},
    {"id": "src_789", "name": "GitHub Repo Events", "provider": "github"}
  ]
}
```

## Query Platform Health

**Agent prompt:**
```
Is the platform healthy?
```

**MCP tool call:** `zen_get_health()`

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime_seconds": 864000
}
```

## Denied Write Attempt

**Agent prompt:**
```
Create a new webhook source for Stripe
```

**MCP tool call (denied):** `zen_create_source(...)`

**Response:**
```json
{
  "error": {
    "code": "write_tool_disabled",
    "message": "Write tool group 'zen_create_source' is not enabled. Contact your operator to enable the required tool group, or use the REST API at https://api.zen-mesh.io/v1 for configuration changes."
  }
}
```

## List Recent Failed Deliveries

**Agent prompt:**
```
Show me deliveries that failed in the last hour
```

**MCP tool call:** `zen_list_deliveries(status="failed", since="2026-06-01T11:00:00Z")`

**Response:**
```json
{
  "deliveries": [
    {"id": "dlv_def456", "status": "failed", "error": "timeout", "attempts": 5}
  ],
  "total": 1
}
```

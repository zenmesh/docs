---
sidebar_label: Logs API
---

# Logs API

The Logs API provides structured access to platform audit and operational logs within your tenant scope.

## Query Logs

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  "https://api.zen-mesh.io/v1/logs?limit=50&level=info"
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Max results (default 20, max 100) |
| `cursor` | string | Pagination cursor from previous response |
| `level` | string | Filter by log level: `debug`, `info`, `warn`, `error` |
| `source_id` | string | Filter by webhook source |
| `delivery_id` | string | Filter by delivery |
| `since` | ISO-8601 | Start of time window |
| `until` | ISO-8601 | End of time window |

## Response

```json
{
  "logs": [
    {
      "id": "log_abc123",
      "timestamp": "2026-06-01T12:00:01Z",
      "level": "info",
      "message": "Delivery succeeded",
      "delivery_id": "dlv_abc123",
      "source_id": "src_456"
    }
  ],
  "next_cursor": "eyJvZmZzZXQiOjUwfQ=="
}
```

## Retention

Platform logs are retained according to your tenant plan. Archived logs are available via the Evidence API for compliance use cases.

---
sidebar_label: Fabric Adapters API
---

# Fabric Adapters API

The Fabric Adapters API provides programmatic access to manage adapters in your Zen Mesh Fabric. Adapters connect your plane's delivery targets to external services.

## Overview

Fabric Adapters represent the components that handle webhook/event processing:

| Type | Description |
|------|-------------|
| **Zen Agent** | Primary webhook/event processing agent |
| **Ingester** | Ingests events from external sources |
| **Egress** | Delivers events to external destinations |
| **Zen Lock** | Credential/protection layer |

## API Endpoints

### List Adapters for Tenant

Retrieve all adapters for a specific tenant.

```http
GET /api/bff/v1/tenants/{tenant_id}/adapters
```

**Authentication:** Session cookie or API key

**Path Parameters:**
- `tenant_id` (required) - Your tenant ID

**Query Parameters:**
- `runtimeClass` (optional) - Filter by runtime class (e.g., `TENANT_CLUSTER`)
- `adapterType` (optional) - Filter by adapter type (e.g., `INGESTER`, `EGRESS`)

**Response:**
```json
{
  "adapters": [
    {
      "adapter_id": "adapter-123",
      "tenant_id": "tenant-456",
      "cluster_id": "cluster-789",
      "adapter_type": "INGESTER",
      "runtime_class": "TENANT_CLUSTER",
      "status": "healthy",
      "last_synced_at": "2026-06-29T12:00:00Z",
      "source": "github",
      "namespace": "default",
      "created_at": "2026-06-01T00:00:00Z",
      "updated_at": "2026-06-29T12:00:00Z"
    }
  ]
}
```

**Status Values:**
- `healthy` - Adapter is operational
- `error` - Adapter has errors
- `unknown` - Status unknown

### List Adapters for Cluster

Retrieve adapters for a specific cluster within a tenant.

```http
GET /api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/adapters
```

**Response:** Same structure as tenant-scoped endpoint

### Disable Adapter

Disable an adapter to stop processing.

```http
POST /api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/adapters/{adapter_id}/disable
```

**Response:**
```json
{
  "success": true,
  "adapter_id": "adapter-123",
  "status": "disabled"
}
```

### Enable Adapter

Re-enable a disabled adapter.

```http
POST /api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/adapters/{adapter_id}/enable
```

**Response:**
```json
{
  "success": true,
  "adapter_id": "adapter-123",
  "status": "enabled"
}
```

## MCP Planes API

Query operational planes for your deployment.

```http
GET /v1/mcp/planes
```

**Authentication:** Requires `mcp:read:planes` scope

**Response:**
```json
{
  "planes": [
    {"name": "control-plane", "status": "ready"},
    {"name": "data-plane", "status": "ready"}
  ],
  "service": "zen-back",
  "endpoint": "mcp-planes",
  "timestamp": "2026-06-29T12:00:00Z"
}
```

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Adapter not found |
| 500 | Internal server error |

## See Also

- [Adapters Guide](../guides/adapters.md) - UI-based adapter management
- [Architecture](../architecture/overview.md) - Three-plane model
- [MCP Overview](../mcp/overview.md) - MCP integration

---
id: api-recipes-list-planes-and-adapters
---

# List Planes and Inspect Adapters

Learn how to retrieve your planes (clusters) and inspect their adapters, ingesters, destinations, and delivery flows.

## What This Recipe Does

This recipe shows you how to:

1. List all planes for your tenant
2. Inspect each plane's adapters and integrations
3. Understand the legacy `/clusters` path and product terminology

## Prerequisites

Set up your environment variables:

```bash
export ZEN_API_BASE="https://api.zen-mesh.io"
export ZEN_API_TOKEN="replace-with-your-api-token"
export ZEN_TENANT_ID="replace-with-your-tenant-id"
export ZEN_PLANE_ID="plane_dev_us_east_1"
```

## List All Planes

### curl

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"
```

### Python

```python
import os
import requests

base_url = os.environ["ZEN_API_BASE"].rstrip("/")
token = os.environ["ZEN_API_TOKEN"]
tenant_id = os.environ["ZEN_TENANT_ID"]

response = requests.get(
    f"{base_url}/tenants/{tenant_id}/clusters",
    headers={"Authorization": f"Bearer {token}"},
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

### JavaScript

```javascript
const baseUrl = process.env.ZEN_API_BASE.replace(/\//$/, "");
const token = process.env.ZEN_API_TOKEN;
const tenantId = process.env.ZEN_TENANT_ID;

const response = await fetch(
    `${baseUrl}/tenants/${tenantId}/clusters`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${await response.text()}`);
}

const data = await response.json();
console.log(data);
```

## Inspect a Plane's Adapters

### List Ingesters

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/ingesters"
```

### List Targets (wire name: destinations)

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/destinations"
```

### List Delivery Flows

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/delivery-flows"
```

## Expected Response Shape

```json
{
  "clusters": [
    {
      "id": "plane_dev_us_east_1",
      "name": "Development US East",
      "status": "ready",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Common Errors

- **404 Not Found**: The tenant ID or plane ID does not exist
- **401 Unauthorized**: Invalid or missing API token

## Next Steps

- [Create a Target](../create-target)
- [Create a Flow](../create-flow)
- *Inspect Channel Endpoints* (this recipe) — see [API Overview](../../overview) for API reference

---

**Full API Reference**: [API Overview](/docs/zen-mesh/api/overview)

**More Information**: [Authentication](../../authentication) | [Common Errors](../../errors)

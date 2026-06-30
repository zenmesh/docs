# Create a Flow

Learn how to create and configure delivery flows that connect sources to destinations.

## What This Recipe Does

This recipe shows you how to:

1. Create a delivery flow
2. Connect sources to destinations
3. Configure flow settings

## Prerequisites

Set up your environment variables:

```bash
export ZEN_API_BASE="https://api.zen-mesh.io"
export ZEN_API_TOKEN="replace-with-your-api-token"
export ZEN_TENANT_ID="replace-with-your-tenant-id"
export ZEN_PLANE_ID="plane_dev_us_east_1"
export ZEN_ADAPTER_ID="adapter_stripe_ingester"
```

## Create a Flow

### curl

```bash
curl -sS --fail-with-body   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{
    "name": "production-invoice-claims-flow",
    "source": "ingester_stripe",
    "target": {
      "id": "dest_stripe_prod_us_east_1",
      "type": "stripe"
    }
  }'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/delivery-flows"
```

### Python

```python
import os
import requests

base_url = os.environ["ZEN_API_BASE"].rstrip("/")
token = os.environ["ZEN_API_TOKEN"]
tenant_id = os.environ["ZEN_TENANT_ID"]
plane_id = os.environ["ZEN_PLANE_ID"

payload = {
    "name": "production-invoice-claims-flow",
    "source": "ingester_stripe",
    "target": {
        "id": "dest_stripe_prod_us_east_1",
        "type": "stripe"
    }
}

response = requests.post(
    f"{base_url}/tenants/{tenant_id}/clusters/{plane_id}/delivery-flows",
    headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    },
    json=payload,
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

### JavaScript

```javascript
const baseUrl = process.env.ZEN_API_BASE.replace(/\//$/, "");
const token = process.env.ZEN_API_TOKEN;
const tenantId = process.env.ZEN_TENANT_ID";
const planeId = process.env.ZEN_PLANE_ID;

const payload = {
    name: "production-invoice-claims-flow",
    source: "ingester_stripe",
    target: {
        id: "dest_stripe_prod_us_east_1",
        type: "stripe"
    }
};

const response = await fetch(
    `${baseUrl}/tenants/${tenantId}/clusters/${planeId}/delivery-flows`,
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }
);

if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${await response.text()}`);
}

const data = await response.json();
console.log(data);
```

## Expected Response Shape

```json
{
  "id": "flow_stripe_invoices_us_east_1",
  "name": "production-invoice-claims-flow",
  "source": "ingester_stripe",
  "target": {
    "id": "dest_stripe_prod_us_east_1",
    "type": "stripe"
  },
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## List All Flows

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/delivery-flows"
```

## Common Errors

- **404 Not Found**: The plane ID or ingester ID does not exist
- **400 Bad Request**: Invalid flow configuration
- **409 Conflict**: A flow with the same name already exists

## Note on Multi-Target Flows

> **Single Target per Flow**: Zen Mesh flows connect one source to one target. For multi-target or fanout flows, use Business+ plan features or contact support.

## Next Steps

- [Create a Target](./create-target.md)
- [Inspect Flows](./list-planes-and-adapters.md)
- [Update Flow](../openapi-reference.html) (use updateDeliveryFlow endpoint)

---

**Full API Reference**: [OpenAPI Specification](../openapi-reference.html)

**More Information**: [Authentication](../authentication) | [Common Errors](../errors)

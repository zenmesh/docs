---
id: api-recipes-create-target
---

# Create a Target

Learn how to create and configure targets (wire name: destinations) for your flows.

## What This Recipe Does

This recipe shows you how to:

1. Create a new target
2. Configure target settings
3. Verify the target was created

## Prerequisites

Set up your environment variables:

```bash
export ZEN_API_BASE="https://api.zen-mesh.io"
export ZEN_API_TOKEN="replace-with-your-api-token"
export ZEN_TENANT_ID="replace-with-your-tenant-id"
export ZEN_PLANE_ID="plane_dev_us_east_1"
export ZEN_ADAPTER_ID="adapter_stripe_ingester"
```

## Create a Target

### curl

```bash
curl -sS --fail-with-body   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{
    "name": "stripe-productions-destination",
    "type": "stripe",
    "config": {
      "apiKey": "replace-with-your-stripe-api-key",
      "webhookSecret": "replace-with-your-webhook-secret"
    }
  }'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/destinations"
```

### Python

```python
import os
import requests

base_url = os.environ["ZEN_API_BASE"].rstrip("/")
token = os.environ["ZEN_API_TOKEN"]
tenant_id = os.environ["ZEN_TENANT_ID"]
plane_id = os.environ["ZEN_PLANE_ID"]

payload = {
    "name": "stripe-productions-destination",
    "type": "stripe",
    "config": {
        "apiKey": "replace-with-your-stripe-api-key",
        "webhookSecret": "replace-with-your-webhook-secret"
    }
}

response = requests.post(
    f"{base_url}/tenants/{tenant_id}/clusters/{plane_id}/destinations",
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
    name: "stripe-productions-destination",
    type: "stripe",
    config: {
        apiKey: "replace-with-your-stripe-api-key",
        webhookSecret: "replace-with-your-webhook-secret"
    }
};

const response = await fetch(
    `${baseUrl}/tenants/${tenantId}/clusters/${planeId}/destinations`,
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
  "id": "dest_stripe_prod_us_east_1",
  "name": "stripe-productions-destination",
  "type": "stripe",
  "status": "provisioning",
  "createdAt": "2024-01-15T10:30:00Z",
  "config": {
    "apiKey": "sk_live_...",
    "webhookSecret": "whsec_..."
  }
}
```

## Verify Target Created

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/destinations"
```

## Common Errors

- **404 Not Found**: The plane ID does not exist
- **400 Bad Request**: Invalid destination configuration
- **409 Conflict**: A destination with the same name already exists

## Next Steps

- [Create a Flow](../create-flow)
- [Inspect Destinations](../../targets) (see Targets API)
- [List Deliveries](../../delivery-attempts) (see Delivery Attempts API)

---

**Full API Reference**: [API Overview](/docs/api/overview)

**More Information**: [Authentication](../../authentication) | [Common Errors](../../errors)

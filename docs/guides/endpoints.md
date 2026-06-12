---
sidebar_label: Endpoints
description: Create and manage webhook endpoints in Zen Mesh — configure ingesters, destinations, and delivery flows for reliable event delivery.
---

# Endpoints

Endpoints are the entry points where Zen Mesh receives webhook events from external sources.

## What Is an Endpoint?

An endpoint (also called an ingester) is a configuration that defines how Zen Mesh receives events from a specific source. Each endpoint specifies the source type, authentication method, and processing rules.

## Creating an Endpoint

### Via Dashboard

1. Navigate to **Sources → Add Source**
2. Select the provider type (Stripe, GitHub, Generic HTTP, etc.)
3. Configure the source settings:
   - **Name**: A descriptive identifier (e.g., `stripe-prod`)
   - **Hook URL**: The ingestion URL provided by Zen Mesh
   - **Verification**: Signature verification method (HMAC, Stripe signing secret, etc.)
4. Save the endpoint

### Via API

```bash
curl -X POST https://api.zen-mesh.io/v1/tenants/{tenant}/ingesters \
  -H "Authorization: Bearer {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "stripe-prod",
    "provider": "stripe",
    "config": {
      "signing_secret": "whsec_..."
    }
  }'
```

## Endpoint Configuration

| Setting | Description | Required |
|---------|-------------|----------|
| **Name** | Human-readable identifier for the endpoint | Yes |
| **Provider** | Event source type (stripe, github, generic, etc.) | Yes |
| **Verification** | Signature or header validation method | Recommended |
| **Delivery Flow** | One or more delivery flows that process events | Yes |
| **Filters** | Event filtering conditions (event type, headers) | Optional |

## Managing Endpoints

### Listing Endpoints

```bash
curl https://api.zen-mesh.io/v1/tenants/{tenant}/ingesters \
  -H "Authorization: Bearer {api_key}"
```

### Updating an Endpoint

```bash
curl -X PUT https://api.zen-mesh.io/v1/tenants/{tenant}/ingesters/{id} \
  -H "Authorization: Bearer {api_key}" \
  -H "Content-Type: application/json" \
  -d '{"name": "stripe-prod-v2", ...}'
```

### Deleting an Endpoint

```bash
curl -X DELETE https://api.zen-mesh.io/v1/tenants/{tenant}/ingesters/{id} \
  -H "Authorization: Bearer {api_key}"
```

## Connection Between Endpoints, Destinations, and Delivery Flows

- **Endpoint**: Where events enter Zen Mesh
- **Delivery Flow**: Routing rules connecting endpoints to destinations
- **Destination**: Where events are delivered (your internal service)

Events flow: Source → **Endpoint** → Delivery Flow → **Destination**

## Related

- [Sources Overview](./sources) — supported webhook providers and sources
- [Destinations](./destinations) — target service configuration
- [API Overview: Ingesters](../api/overview)

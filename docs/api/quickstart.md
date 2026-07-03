# API Quickstart

> Status: WIRED_SANDBOX. This guide demonstrates read and write operations validated in sandbox/local runtime. Write examples are not production-live availability claims.

This guide walks you through getting started with the Zen Mesh API. By the end, you'll be able to:

* Set up environment variables
* Make your first API request
* List your planes (clusters)
* Inspect adapters and destinations
* Understand common errors

## Before You Start

Before you begin, ensure you have:

1. **API Token:** A valid API token from your tenant dashboard
2. **Tenant ID:** Your tenant identifier (found in your dashboard)
3. **Plane ID:** Your cluster identifier (used for operations targeting specific planes)

> **Note:** The API uses the legacy `/clusters` path segment internally, but product surfaces refer to these objects as **planes**. See the [Plane Terminology](#plane-terminology-vs-legacy-clusters) section below for details.

## Set Environment Variables

Copy these into your shell (`.bashrc`, `.zshrc`, etc.):

```bash
export ZEN_API_BASE="https://api.zen-mesh.io/v1"
export ZEN_API_TOKEN="replace-with-your-api-token"
export ZEN_TENANT_ID="replace-with-your-tenant-id"
export ZEN_PLANE_ID="replace-with-your-plane-id"
```

For Python, you can also use environment variables in your script:

```python
import os

ZEN_API_BASE = os.environ["ZEN_API_BASE"]
ZEN_API_TOKEN = os.environ["ZEN_API_TOKEN"]
ZEN_TENANT_ID = os.environ["ZEN_TENANT_ID"]
```

## Make Your First Request

### Health Check

First, let's verify the API is accessible:

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/health"
```

You should see a response like:

```json
{
  "status": "ok"
}
```

### List Your Planes

Now let's list the planes (clusters) for your tenant:

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"
```

Expected response:

```json
{
  "tenants": [
    {
      "id": "plane_dev_us_east_1",
      "name": "Development Plane (US East)",
      "status": "active"
    }
  ]
}
```

## Create Your First Plane

If you don't have any planes yet, you can create one:

```bash
curl -sS   -X POST   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{"name": "plane_dev_us_east_1", "config": {"image": "zenmesh-plane:v1.0.0", "resources": {"cpu": "1", "memory": "1Gi"}}}'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"
```

## Inspect Adapters

Adapters handle webhook delivery and data processing. List all ingesters for a plane:

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/ingesters"
```

### Create an Ingesters

To add a new ingester:

```bash
curl -sS   -X POST   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{"name": "ingester-webhook", "config": {"type": "webhook"}}'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/ingesters"
```

## Inspect Destinations

Destinations are output targets for webhook delivery. List all destinations:

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/destinations"
```

## Create a Destination

Create a destination (e.g., Slack webhook):

```bash
curl -sS   -X POST   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{"name": "destination-slack", "config": {"url": "https://hooks.slack.com/services/YOUR_WEBHOOK_URL", "channel": "#notifications"}}'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/destinations"
```

## Create a Delivery Flow

Delivery flows route webhooks from ingesters to destinations. Create one:

```bash
curl -sS   -X POST   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   -d '{"name": "flow-webhook-to-slack", "config": {"adapter": "slack", "channel": "#api-notifications"}}'   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/delivery-flows"
```

## Understand Errors

The API returns standard HTTP status codes. Here are the most common ones:

### 400 Bad Request

Returned when your request is malformed or invalid:

```json
{
  "error": "ValidationError",
  "message": "Invalid plane configuration: cpu must be a positive number"
}
```

### 401 Unauthorized

Returned when your API token is missing or invalid:

```bash
curl -sS   -H "Authorization: Bearer invalid-token"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"
```

**Solution:** Verify your `ZEN_API_TOKEN` environment variable is set correctly.

### 403 Forbidden

Returned when you don't have permission to perform this action:

```json
{
  "error": "ForbiddenError",
  "message": "You don't have permission to delete this plane"
}
```

### 404 Not Found

Returned when a resource doesn't exist:

```json
{
  "error": "NotFoundError",
  "message": "Plane not found: plane_dev_us_east_1"
}
```

### 429 Too Many Requests

Returned when you exceed rate limits:

```json
{
  "error": "RateLimitError",
  "message": "Too many requests. Please try again in 60 seconds."
}
```

### 500 Internal Server Error

Returned when the API experiences an internal error:

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred while processing your request"
}
```

### Using Request IDs for Troubleshooting

Some errors include a `request_id` field, which you can use for support:

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred",
  "request_id": "req_abc123xyz"
}
```

## Plane Terminology vs Legacy `/clusters`

The Zen Mesh API uses the legacy `/clusters` path segment internally, but product surfaces refer to these objects as **planes**:

| Concept | API Path | Product Term |
|---------|----------|--------------|
| Cluster identifier | `/clusters/{cluster_id}` | Plane |
| List clusters | `/tenants/{tenant_id}/clusters` | List planes |
| Create cluster | `POST /tenants/{tenant_id}/clusters` | Create plane |
| Get cluster | `/clusters/{cluster_id}` | Get plane |

This design preserves backward compatibility with existing wire protocols while presenting a cleaner product-facing API.

## Next Steps

- [API Overview](/docs/api/overview) - Complete API reference with code examples
- [Authentication](/docs/api/authentication) - Detailed authentication guide
- [Fabric Adapters API](./fabric-adapters) - Adapter management documentation
- [API Overview](./overview) - Introduction to Zen Mesh APIs

---

**Need Help?**

- Email: support@zen-platform.com
- GitHub Issues: https://github.com/zen-mesh/docs/issues


## See Also

- [Workflow Recipes](./recipes/list-planes-and-adapters/) - Complete step-by-step guides for common tasks
- [Create a Flow](./recipes/create-flow/)
- [Create a Target](./recipes/create-target/)
- [Handle Errors](./recipes/errors-and-rate-limits/)

---

**Full API Reference**: [API Overview](/docs/api/overview)
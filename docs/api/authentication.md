# Authentication

Zen Mesh APIs require authentication using Bearer tokens. This guide covers how to authenticate, manage tokens, and troubleshoot common authentication issues.

## Bearer Token Authentication

All Zen Mesh API endpoints require an `Authorization` header with a Bearer token:

```
Authorization: Bearer YOUR_API_TOKEN
```

### Using curl

```bash
curl -sS   -H "Authorization: Bearer ***   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"
```

### Using Python

```python
import os
import requests

base_url = os.environ["ZEN_API_BASE"].rstrip("/")
token = os.environ["ZEN_API_TOKEN"]

response = requests.get(
    f"{base_url}/tenants/$ZEN_TENANT_ID/clusters",
    headers={"Authorization": f"Bearer {token}"},
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

### Using JavaScript

```javascript
const baseUrl = process.env.ZEN_API_BASE.replace(/\/$/, "");
const token = process.env.ZEN_API_TOKEN;

const response = await fetch(`${baseUrl}/tenants/$ZEN_TENANT_ID/clusters`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

## Environment Variables

For convenience, use environment variables in your scripts:

```bash
# Set these in your shell or .env file
export ZEN_API_BASE="https://api.zen-mesh.io/v1"
export ZEN_API_TOKEN="your-api-token-here"
export ZEN_TENANT_ID="your-tenant-id"
export ZEN_PLANE_ID="your-plane-id"
```

In Python:

```python
import os

ZEN_API_BASE = os.environ["ZEN_API_BASE"]
ZEN_API_TOKEN = os.environ["ZEN_API_TOKEN"]
ZEN_TENANT_ID = os.environ["ZEN_TENANT_ID"]
ZEN_PLANE_ID = os.environ["ZEN_PLANE_ID"]
```

## Obtaining Your API Token

Your API token is provided by the Zen Mesh dashboard for your tenant.

1. Log in to the [Zen Mesh Dashboard](https://dash.zen-mesh.io)
2. Navigate to your tenant settings
3. Copy the API token

> **Warning:** Treat your API token like a password. Never commit it to version control or share it publicly.

## Token Format and Validation

API tokens are typically 32-character hexadecimal strings, though the exact format depends on your tenant configuration.

### Valid Token

```bash
export ZEN_API_TOKEN="abc123xyz456def789ghi012jkl345mno678"
```

### Invalid Token

```bash
export ZEN_API_TOKEN="invalid"
```

When using an invalid token, you'll receive a **401 Unauthorized** error:

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired API token"
}
```

## Request ID Tracking

Some API responses include a `request_id` field for debugging and support:

```json
{
  "tenants": [
    {
      "id": "plane_dev_us_east_1",
      "request_id": "req_abc123xyz"
    }
  ]
}
```

Include this `request_id` when contacting support for faster resolution.

## Best Practices

1. **Always validate the response status** - Check `response.ok` or `response.status` before accessing response data
2. **Use environment variables** - Don't hardcode tokens in scripts
3. **Rotate tokens regularly** - Periodically update tokens in your dashboard
4. **Use least privilege** - Only request the tokens you need
5. **Monitor usage** - Watch for unexpected usage patterns that might indicate token compromise

## Troubleshooting

### 401 Unauthorized

**Problem:** You receive a 401 error when making requests.

**Possible Causes:**

1. Token is missing or empty
2. Token is invalid or expired
3. Token format is incorrect

**Solution:** Verify your `ZEN_API_TOKEN` environment variable is set and contains a valid token from your dashboard.

### 403 Forbidden

**Problem:** You receive a 403 error even with a valid token.

**Possible Causes:**

1. Token doesn't have permissions for the requested operation
2. Token is associated with a different tenant

**Solution:** Ensure you're using a token with appropriate permissions for your tenant and requested operations.

### 401 with "Invalid or expired API token" message

**Problem:** Token validation fails immediately.

**Solution:** 

1. Copy a fresh token from your dashboard
2. Paste it directly into your code/script
3. Ensure no trailing whitespace

### Token rotation

**Problem:** Your token stopped working.

**Solution:**

1. Generate a new token in your dashboard
2. Update your environment variables
3. Test with a simple GET request
4. Update any stored tokens in production systems

## Next Steps

- [API Quickstart](/docs/api/quickstart) - Get started with the API
- [API Overview](/docs/api/overview) - See the complete API reference
- [Common Errors](/docs/api/errors) - Learn about common error codes
- [Support](https://dash.zen-mesh.io) - Get help from the team

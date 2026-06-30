# Handle Errors and Rate Limits

Learn how to handle common HTTP errors and rate limiting in Zen Mesh API calls.

## What This Recipe Does

This recipe covers:

1. Common HTTP status codes and their meanings
2. Error response format
3. How to handle 401/403/404/409/429/500 errors
4. Retry strategies
5. Using request IDs for troubleshooting

## Error Response Format

All error responses follow this format:

```json
{
  "error": "ErrorType",
  "message": "Human-readable error message",
  "request_id": "req_abc123xyz"
}
```

| Field | Description |
|-------|-------------|
| `error` | The error type (e.g., `ValidationError`, `Unauthorized`) |
| `message` | Detailed explanation of the error |
| `request_id` | Unique identifier for debugging and support |

## Common HTTP Status Codes

### 401 Unauthorized

Authentication failed. The API token is missing, invalid, or expired.

**Example Response**:

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired API token",
  "request_id": "req_xyz789"
}
```

**How to Fix**:

1. Verify your API token in the Zen Mesh dashboard
2. Ensure the `ZEN_API_TOKEN` environment variable is set correctly
3. Test with a simple health check:

```bash
curl -sS -H "Authorization: Bearer *** $ZEN_API_BASE/health
```

### 403 Forbidden

You don't have permission to perform this action.

**Example Response**:

```json
{
  "error": "ForbiddenError",
  "message": "You don't have permission to delete this plane",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Verify your token has the required permissions
2. Check you're using the correct tenant ID
3. Review token scopes/permissions in your dashboard

### 404 Not Found

The requested resource doesn't exist.

**Example Response**:

```json
{
  "error": "NotFoundError",
  "message": "Plane not found: plane_dev_us_east_1",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Verify the resource ID is correct
2. List resources first to see valid IDs:

```bash
curl -sS -H "Authorization: Bearer *** $ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters
```

### 409 Conflict

The request conflicts with current server state.

**Example Response**:

```json
{
  "error": "ConflictError",
  "message": "Plane already exists with this name",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Check if the resource already exists
2. Use a unique name or ID
3. Handle conflicts gracefully in your application

### 429 Too Many Requests

You've exceeded the rate limit for this endpoint.

**Example Response**:

```json
{
  "error": "RateLimitError",
  "message": "Too many requests. Please try again in 60 seconds.",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Implement exponential backoff
2. Check the `Retry-After` header when present:
   ```bash
   curl -sI "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters" | grep Retry-After
   ```
3. Reduce request rate

**Retry Example (Python)**:

```python
import time

def fetch_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers={"Authorization": f"Bearer {token}"})
        
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            time.sleep(retry_after)
            continue
        
        if response.ok:
            return response
        
        if attempt == max_retries - 1:
            response.raise_for_status()
```

### 500 Internal Server Error

An unexpected error occurred on the server.

**Example Response**:

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred while processing your request",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Retry the request (with backoff)
2. Check if `request_id` is present - include it when contacting support:
   ```
   I'm getting a 500 error.
   Request ID: req_abc123xyz
   Endpoint: POST /tenants/{tenant_id}/clusters
   ```
3. Check [status.zen-mesh.io](https://status.zen-mesh.io) for service status

### 503 Service Unavailable

The service is temporarily unavailable.

**Example Response**:

```json
{
  "error": "ServiceUnavailableError",
  "message": "Service is temporarily unavailable. Please try again later.",
  "request_id": "req_abc123xyz"
}
```

**How to Fix**:

1. Wait and retry
2. Check service status page
3. Contact support for planned maintenance

## Using Request IDs for Troubleshooting

When contacting support, always include the `request_id` from the error response. This helps support quickly identify the specific request and logs.

**Example support message**:

```
I'm getting a 500 Internal Server Error when creating a plane.

Request ID: req_abc123xyz
Endpoint: POST /tenants/{tenant_id}/clusters
Request body: {"name": "plane_dev", ...}
```

## Rate Limiting Strategy

### Exponential Backoff

Use progressive delays between retries:

```python
import time

def exponential_backoff_retry(url, max_retries=5, base_delay=1):
    for attempt in range(max_retries):
        response = requests.get(url, headers={"Authorization": f"Bearer {token}"})
        
        if response.ok:
            return response
        
        if response.status_code == 429:
            delay = base_delay * (2 ** attempt)
            time.sleep(delay)
            continue
        
        response.raise_for_status()
```

### Request Batching

Batch similar requests to reduce rate limit hits:

```python
# Instead of:
for plane_id in plane_ids:
    requests.get(f"{base_url}/tenants/{tenant_id}/clusters/{plane_id}")

# Do:
plane_list = requests.get(f"{base_url}/tenants/{tenant_id}/clusters").json()
for plane in plane_list['clusters']:
    print(plane['id'])
```

## Next Steps

- [Authentication](../authentication)
- [Create a Flow](./create-flow.md)
- [List Planes](./list-planes-and-adapters.md)

---

**Full API Reference**: [OpenAPI Specification](../openapi-reference.html)

**More Information**: [Authentication](../authentication) | [Common Errors](../errors)

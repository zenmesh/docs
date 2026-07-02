# Common API Errors

This guide covers common HTTP status codes and error responses from the Zen Mesh API.

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

## HTTP Status Codes

### 200 OK

Success. The request was successful.

### 400 Bad Request

The request was malformed or invalid.

**Example:**

```json
{
  "error": "ValidationError",
  "message": "Invalid plane configuration: cpu must be a positive number",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Invalid JSON in request body
- Missing required fields
- Type mismatch (e.g., string where number expected)
- Out of range values

**How to fix:**

1. Check your request body against the schema in the API reference
2. Validate JSON syntax
3. Ensure all required fields are present and have valid types

### 401 Unauthorized

Authentication failed. The API token is missing, invalid, or expired.

**Example:**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired API token",
  "request_id": "req_xyz789"
}
```

**Common causes:**

- `ZEN_API_TOKEN` environment variable not set
- Token is incorrect or expired
- Token is missing or malformed

**How to fix:**

1. Verify your API token in the Zen Mesh dashboard
2. Ensure the `ZEN_API_TOKEN` environment variable is set correctly
3. Test with `curl -sS -H "Authorization: Bearer $ZEN_API_TOKEN" $ZEN_API_BASE/health`

### 403 Forbidden

You don't have permission to perform this action.

**Example:**

```json
{
  "error": "ForbiddenError",
  "message": "You don't have permission to delete this plane",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Token lacks required permissions
- Trying to access a resource you don't own
- Attempting to perform an operation not allowed for your token type

**How to fix:**

1. Verify your token has the required permissions
2. Check you're using the correct tenant ID
3. Review token scopes/permissions in your dashboard

### 404 Not Found

The requested resource doesn't exist.

**Example:**

```json
{
  "error": "NotFoundError",
  "message": "Plane not found: plane_dev_us_east_1",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Using an incorrect resource ID
- Resource was deleted
- Typo in resource ID

**How to fix:**

1. Verify the resource ID is correct
2. List resources first to see valid IDs
3. Check if the resource exists: `GET /tenants/{tenant_id}/clusters`

### 409 Conflict

The request conflicts with current server state.

**Example:**

```json
{
  "error": "ConflictError",
  "message": "Plane already exists with this name",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Creating a duplicate resource (e.g., plane with same name)
- Attempting to update a resource that no longer exists
- Race condition during concurrent operations

**How to fix:**

1. Check if the resource already exists
2. Use a unique name or ID
3. Handle conflicts gracefully in your application

### 422 Unprocessable Entity

The request is well-formed but contains invalid semantic values.

**Example:**

```json
{
  "error": "UnprocessableEntityError",
  "message": "Invalid plane configuration: cpu value '0' is too small",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Invalid enum values
- Validation rule violations
- Constraint violations

**How to fix:**

1. Review the API reference for valid values
2. Check schema constraints
3. Use validator tools to check your request

### 429 Too Many Requests

You've exceeded the rate limit for this endpoint.

**Example:**

```json
{
  "error": "RateLimitError",
  "message": "Too many requests. Please try again in 60 seconds.",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Too many requests in a short time
- Missing rate limit headers in your client

**How to fix:**

1. Implement exponential backoff
2. Check the `Retry-After` header when present
3. Reduce request rate

### 500 Internal Server Error

An unexpected error occurred on the server.

**Example:**

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred while processing your request",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Server-side bugs
- Database connectivity issues
- Temporary service degradation

**How to fix:**

1. Retry the request (with backoff)
2. Check if `request_id` is present - include it when contacting support
3. Check [status.zen-mesh.io](https://status.zen-mesh.io) for service status
4. Contact support with the `request_id`

### 503 Service Unavailable

The service is temporarily unavailable.

**Example:**

```json
{
  "error": "ServiceUnavailableError",
  "message": "Service is temporarily unavailable. Please try again later.",
  "request_id": "req_abc123xyz"
}
```

**Common causes:**

- Scheduled maintenance
- Temporary service degradation
- Resource overload

**How to fix:**

1. Wait and retry
2. Check service status page
3. Contact support for planned maintenance

## Handling Errors in Your Code

### Python

```python
import requests

response = requests.get(
    "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters",
    headers={"Authorization": f"Bearer $ZEN_API_TOKEN"}
)

if not response.ok:
    try:
        error = response.json()
        print(f"Error: {error.get('error')}")
        print(f"Message: {error.get('message')}")
        if 'request_id' in error:
            print(f"Request ID: {error['request_id']}")
    except:
        print(f"HTTP {response.status_code}: {response.text}")
    # Handle error appropriately
else:
    data = response.json()
    print(data)
```

### JavaScript

```javascript
const response = await fetch('$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters', {
  headers: {
    Authorization: `Bearer $ZEN_API_TOKEN`
  }
});

if (!response.ok) {
  try {
    const error = await response.json();
    console.error(`Error: ${error.error}`);
    console.error(`Message: ${error.message}`);
    if (error.request_id) {
      console.error(`Request ID: ${error.request_id}`);
    }
  } catch (e) {
    console.error(`HTTP ${response.status}: ${await response.text()}`);
  }
  // Handle error appropriately
} else {
  const data = await response.json();
  console.log(data);
}
```

### curl

```bash
curl -sS   -H "Authorization: Bearer ***   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters"

# Check exit code
if [ $? -ne 0 ]; then
  echo "Request failed with exit code $?"
fi
```

## Request ID Usage

When contacting support, always include the `request_id` from the error response. This helps support quickly identify the specific request and logs.

**Example support message:**

```
I'm getting a 500 Internal Server Error when creating a plane.

Request ID: req_abc123xyz
Endpoint: POST /tenants/{tenant_id}/clusters
Request body: {"name": "plane_dev", ...}
```

## Next Steps

- [Authentication](/docs/api/authentication) - Learn about API token authentication
- [API Quickstart](/docs/api/quickstart) - Get started with basic API calls
- [API Overview](/docs/api/overview) - Complete API reference overview

---

**Need Help?**

- Email: support@zen-platform.com
- GitHub Issues: https://github.com/zen-mesh/docs/issues
- Status: https://status.zen-mesh.io
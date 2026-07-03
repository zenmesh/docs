---
sidebar_label: Errors and Problem Details
---

# Errors and Problem Details

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the planned error model. Individual endpoints may vary. It is not a production-live availability claim.

## Standard error format

Error responses follow the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details format:

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:destinations scope.",
  "instance": "req_abc123",
  "required_scope": "write:destinations"
}
```

| Field | Type | Description |
|---|---|---|
| `type` | URI | Error type identifier |
| `title` | string | Short, human-readable summary |
| `status` | integer | HTTP status code |
| `detail` | string | Human-readable explanation |
| `instance` | string | Request ID for debugging |
| `*` | varies | Additional fields per error type |

## HTTP status codes

### 400 Bad Request

The request was malformed or contains invalid data.

```json
{
  "type": "https://api.zen-mesh.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "name: must not be empty",
  "instance": "req_abc123",
  "errors": [
    { "field": "name", "message": "must not be empty" }
  ]
}
```

**Common causes:** Missing required fields, invalid JSON, type mismatch, out-of-range values.

### 401 Unauthorized

Authentication failed — the API key is missing, invalid, or expired.

```json
{
  "type": "https://api.zen-mesh.io/errors/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Missing or invalid API key",
  "instance": "req_abc123"
}
```

### 403 Forbidden — missing scope

The credential is valid but lacks the required scope.

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have write:destinations scope.",
  "instance": "req_abc123",
  "required_scope": "write:destinations"
}
```

### 403 Forbidden — permission denied

The credential has the scope but lacks object-level permission.

```json
{
  "type": "https://api.zen-mesh.io/errors/permission-denied",
  "title": "Permission Denied",
  "status": 403,
  "detail": "Cannot delete destination dest_abc123: insufficient permissions.",
  "instance": "req_abc123",
  "resource_id": "dest_abc123"
}
```

### 403 Forbidden — write tool disabled (MCP)

The MCP write tool group is not enabled.

```json
{
  "type": "https://api.zen-mesh.io/errors/write-tool-disabled",
  "title": "Write Tool Disabled",
  "status": 403,
  "detail": "Write tool group 'write:destinations' is not enabled.",
  "instance": "req_abc123",
  "tool_group": "write:destinations"
}
```

### 404 Not Found

The requested resource does not exist or is not visible to the tenant.

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Destination dest_abc123 not found.",
  "instance": "req_abc123"
}
```

### 409 Conflict

The request conflicts with current server state.

```json
{
  "type": "https://api.zen-mesh.io/errors/conflict",
  "title": "Conflict",
  "status": 409,
  "detail": "A destination with name 'stripe-prod' already exists.",
  "instance": "req_abc123"
}
```

### 409 Idempotency conflict

An idempotent request conflicts with a previous request using the same key.

```json
{
  "type": "https://api.zen-mesh.io/errors/idempotency-conflict",
  "title": "Idempotency Conflict",
  "status": 409,
  "detail": "Idempotency-Key 'idem_key_1' was used with a different request body.",
  "instance": "req_abc123",
  "idempotency_key": "idem_key_1"
}
```

### 422 Unprocessable Entity

The request is well-formed but contains invalid semantic values.

```json
{
  "type": "https://api.zen-mesh.io/errors/unprocessable-entity",
  "title": "Unprocessable Entity",
  "status": 422,
  "detail": "Invalid value for status: 'unknown' is not a recognized status.",
  "instance": "req_abc123"
}
```

### 429 Too Many Requests

The rate limit for this endpoint has been exceeded.

```json
{
  "type": "https://api.zen-mesh.io/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "Too many requests. Please try again later.",
  "instance": "req_abc123",
  "retry_after_seconds": 60
}
```

Include the `Retry-After` header in the response when present.

### 500 Internal Server Error

An unexpected error occurred on the server.

```json
{
  "type": "https://api.zen-mesh.io/errors/internal-error",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "An unexpected error occurred while processing your request.",
  "instance": "req_abc123"
}
```

### 503 Service Unavailable

The service is temporarily unavailable.

```json
{
  "type": "https://api.zen-mesh.io/errors/service-unavailable",
  "title": "Service Unavailable",
  "status": 503,
  "detail": "Service is temporarily unavailable. Please try again later.",
  "instance": "req_abc123"
}
```

## Request IDs

Every error response includes an `instance` (request ID) field. Include this when contacting support:

```
I'm getting a 403 insufficient scope error when retrying a delivery.

Request ID: req_abc123
Endpoint: POST /v1/tenants/{tid}/events/{eid}/retry
```

## Safe error handling

```python
import requests

response = requests.get(url, headers=headers)
if not response.ok:
    try:
        problem = response.json()
        print(f"Error [{problem.get('title')}]: {problem.get('detail')}")
        if 'instance' in problem:
            print(f"Request ID: {problem['instance']}")
    except ValueError:
        print(f"HTTP {response.status_code}: {response.text}")
    # Handle specific error types
    if problem.get('type', '').endswith('/insufficient-scope'):
        print(f"Required scope: {problem.get('required_scope')}")
    raise SystemExit(1)

data = response.json()
```

## Non-claims

- Error format may not be fully uniform across all endpoint groups
- Some legacy endpoints may return a simpler error format without RFC 9457 fields
- The error type URIs are documented intent; actual `type` values may vary
- Rate limit thresholds vary by plan and endpoint

## Related

- [Authentication](./authentication) — auth model and scopes
- [Idempotency](./idempotency) — idempotency key specification
- [Rate Limits](./rate-limits) — plan-based rate limits
- [Write Safety Model](./write-safety) — authorization for write operations

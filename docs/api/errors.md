---
sidebar_label: Errors
---

# Errors and Problem Details

Zen Mesh APIs use standard HTTP status codes and return structured error responses following RFC 9457 (Problem Details).

## HTTP Status Codes

| Code | Meaning | Typical Cause |
|------|---------|---------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid parameters or body |
| 401 | Unauthorized | Missing or invalid credentials |
| 403 | Forbidden | Insufficient scope |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource state conflict |
| 422 | Unprocessable Entity | Validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Temporary outage or maintenance |

## Problem Details Format

```json
{
  "type": "https://docs.zen-mesh.io/errors/invalid-parameters",
  "title": "Invalid Parameters",
  "status": 422,
  "detail": "destination_id must be a valid UUID",
  "instance": "/tenants/tnt_abc123/destinations",
  "errors": [
    {
      "field": "destination_id",
      "message": "must be a valid UUID",
      "code": "invalid_uuid"
    }
  ]
}
```

## Error Types

| Type URI | Title | Status |
|----------|-------|--------|
| `/errors/authentication` | Authentication Required | 401 |
| `/errors/insufficient-scope` | Insufficient Scope | 403 |
| `/errors/not-found` | Resource Not Found | 404 |
| `/errors/conflict` | Resource Conflict | 409 |
| `/errors/invalid-parameters` | Invalid Parameters | 422 |
| `/errors/rate-limited` | Rate Limit Exceeded | 429 |
| `/errors/internal-error` | Internal Error | 500 |

## Common Error Scenarios

### Missing API Key
```json
{"title": "Authentication Required", "status": 401, "detail": "X-API-Key header is required"}
```

### Invalid Scope
```json
{"title": "Insufficient Scope", "status": 403, "detail": "Scope 'mcp:admin:keys' required but key has 'mcp:read:*'"}
```

### Rate Limited
```json
{"title": "Rate Limit Exceeded", "status": 429, "detail": "Rate limit of 100 req/min exceeded. Retry after 45s"}
```

## Retry After

Ratelimited responses include a `Retry-After` header (seconds). Clients should respect this before retrying. See [Rate Limits and Operational Limits](./rate-limits.md).

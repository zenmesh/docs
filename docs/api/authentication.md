---
sidebar_label: Authentication
---

# Authentication

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the authentication and authorization model. Individual endpoint groups may carry different requirements. It is not a production-live availability claim.

Zen Mesh APIs authenticate every request. The auth model varies by surface: Customer API / runtime APIs, MCP, and dashboard/BFF.

## Auth surfaces

| Surface | Auth method | Credential format | Scope model | Write enablement |
|---|---|---|---|---|
| Customer API / runtime APIs | Bearer JWT or API key | Standard API key (`zpk_` prefix) or HMAC-signed | Scoped per operation | Permissioned per endpoint group |
| MCP | MCP API key | MCP key (`mcp_` prefix) in `X-MCP-API-Key` header | Scoped per tool group | Disabled by default; explicit enablement required |
| Dashboard/BFF | Session cookie or API key | BFF session or dashboard API key | App-scoped | App-scoped | 

## Bearer token authentication

All Customer API and runtime API endpoints require an `Authorization` header:

```
Authorization: Bearer <api_key>
```

### Using curl

```bash
curl -sS \
  -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/destinations"
```

### Using Python

```python
import os
import requests

base_url = "https://api.zen-mesh.io/v1"
token = os.environ["ZEN_API_KEY"]
tenant_id = os.environ["ZEN_TENANT_ID"]

response = requests.get(
    f"{base_url}/tenants/{tenant_id}/destinations",
    headers={"Authorization": f"Bearer {token}"},
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

### Using JavaScript

```javascript
const baseUrl = "https://api.zen-mesh.io/v1";
const token = process.env.ZEN_API_KEY;
const tenantId = process.env.ZEN_TENANT_ID;

const response = await fetch(`${baseUrl}/tenants/${tenantId}/destinations`, {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await response.json();
console.log(data);
```

## API keys

API keys are generated from the Zen Mesh dashboard under Settings → API Keys.

| Property | Value |
|---|---|
| Prefix | `zpk_` |
| Scope | Bound to tenant at creation |
| Rotation | Supported via dashboard |
| Status | WIRED_SANDBOX |

### Environment variables

```bash
export ZEN_API_KEY="<api_key>"
export ZEN_TENANT_ID="<tenant_id>"
export ZEN_API_BASE="https://api.zen-mesh.io/v1"
```

## Tenant scoping

Every request is scoped to a single tenant. The tenant is determined by the API key's binding — not by a header or path parameter alone. Cross-tenant access is prevented at the API layer and enforced by Row-Level Security (RLS) at the database layer.

## Scopes and permissions

### Read scopes

Read scopes grant access to inspect resources. They are available on the default API key surface:

| Scope | Access |
|---|---|
| `read:destinations` | List and read targets |
| `read:ingesters` | List and read endpoints |
| `read:delivery-flows` | List and read flows |
| `read:deliveries` | List and read delivery attempts |
| `read:evidence` | Read evidence proofs |
| `read:api-keys` | List API key metadata |

### Write scopes

Write scopes grant permission to create, update, or delete resources. They require explicit assignment:

| Scope | Operations |
|---|---|
| `write:destinations` | Create, update, delete targets |
| `write:ingesters` | Create, update, delete endpoints |
| `write:delivery-flows` | Create, update, delete flows |
| `write:api-keys` | Create, revoke API keys |
| `admin:keys` | Full key management |

Write scopes are not available by default. Contact your tenant administrator to request write access for specific resource types.

### Object-level permissions

Where applicable, write operations are further gated by object-level permissions. A caller may have write scope for targets but read-only for flows, or may create endpoints but not delete them.

## MCP authentication

MCP uses a separate auth model:

| Property | Value |
|---|---|
| Credential | MCP API key (`mcp_` prefix) |
| Header | `X-MCP-API-Key` |
| Scopes | `mcp:read:*` (default-on), `mcp:write:<group>` (disabled by default) |
| Transport | TLS 1.2+ with optional mTLS |

See [MCP Authentication and mTLS](../mcp/authentication-and-mtls) for details.

## Dashboard/BFF authentication

The Dashboard/BFF API (`/api/bff/v1`) uses session cookies or a separate BFF API key. It is an **internal app-facing surface**, not a public customer contract. See the [API Status Matrix](./status) for the INTERNAL_ONLY designation.

## Request IDs

API responses may include a `request_id` field for debugging and support:

```json
{
  "request_id": "req_abc123",
  "data": { ... }
}
```

Include this ID when contacting support.

## Authorization failure examples

### 401 Unauthenticated

The request did not include a valid credential:

```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid API key",
  "request_id": "req_abc123"
}
```

### 403 Missing scope

The credential is valid but lacks the required scope for the operation:

```json
{
  "error": "InsufficientScope",
  "message": "API key does not have write:destinations scope. Contact your tenant administrator.",
  "required_scope": "write:destinations",
  "request_id": "req_abc123"
}
```

### 403 Object permission denied

The credential has the scope but lacks object-level permission:

```json
{
  "error": "PermissionDenied",
  "message": "API key does not have permission to delete destination dest_abc123",
  "resource_id": "dest_abc123",
  "request_id": "req_abc123"
}
```

### 403 Write tool disabled (MCP)

The MCP tool group is not enabled:

```json
{
  "error": "write_tool_disabled",
  "message": "Write tool group 'write:destinations' is not enabled. Contact your operator to enable the required tool group."
}
```

## Non-claims

- Authentication documentation describes the model, not every endpoint's current implementation
- Write scopes require explicit assignment and are not available by default
- MCP write tools are disabled by default and require explicit enablement per tool group
- The Dashboard/BFF API is INTERNAL_ONLY and not a public customer contract
- API key rotation and revocation are tenant-administrator responsibilities

## Related

- [API Status Matrix](./status) — per-group auth model and maturity
- [MCP Authentication and mTLS](../mcp/authentication-and-mtls) — MCP-specific auth
- [Write Safety Model](./write-safety) — authorization for write operations
- [Errors and Problem Details](./errors) — error response format

---
sidebar_label: Authentication
---

# Authentication and API Keys

The Zen Mesh API supports multiple authentication methods depending on the consumer and endpoint sensitivity.

## Bearer JWT (OIDC / Session)

Used by dashboard UI and user-authenticated API calls.

```
Authorization: Bearer <jwt_token>
```

Tokens are issued via the auth endpoint (`POST /auth/login`) and are scoped to a specific tenant. Token expiry is configurable per deployment.

## API Key (X-API-Key)

Used for server-to-server and programmatic access.

```bash
curl -H "X-API-Key: zen_key_..." https://api.zen-mesh.io/v1/tenants/{tid}/clusters
```

API keys are tenant-scoped and support granular read/write scopes. Keys can be created and revoked via the dashboard or the API Keys API.

## HMAC Signature (X-KubeZen-Signature)

Used for cluster-originated writes and webhook endpoints. Provides request-level integrity verification.

```bash
# Request signed with HMAC-SHA256
curl -H "X-KubeZen-Signature: t=1728000000,v1=abc123..." \
     -H "X-KubeZen-Timestamp: 1728000000" \
     https://api.zen-mesh.io/v1/webhooks/...
```

The HMAC key is provisioned during cluster enrollment. Requests without a valid signature and within the timestamp tolerance window are rejected.

## MCP API Key (X-MCP-API-Key)

Used for MCP (Model Context Protocol) server access. Requires the `mcp_` key prefix.

```bash
curl -H "X-MCP-API-Key: mcp_..." https://api.zen-mesh.io/v1/mcp/health
```

MCP keys are scoped to read-only operational truth surface by default. Admin/mutation operations require explicit scope elevation.

## Scope Model

Endpoints reference required scopes via OpenAPI `security` declarations. Common scopes:

| Scope | Description |
|-------|-------------|
| `mcp:read:health` | Read health status |
| `mcp:read:endpoints` | List MCP endpoints |
| `mcp:read:evidence` | Read evidence details |
| `mcp:read:deliveries` | Read delivery status |
| `mcp:read:planes` | List operational planes |
| `mcp:read:logs` | Read resource logs |
| `mcp:admin:keys` | Admin API key management |

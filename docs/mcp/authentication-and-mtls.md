---
sidebar_label: MCP Authentication and mTLS
---

# MCP Authentication and mTLS

## API Key Format

MCP API keys use the `mcp_` prefix:

```
mcp_<random_alphanumeric>
```

## Header

Requests to the MCP server carry the API key in the `X-MCP-API-Key` header:

```bash
curl -H "X-MCP-API-Key: mcp_..." https://api.zen-mesh.io/v1/mcp/health
```

## Key Scopes

MCP keys support granular scopes. The default surface grants read scopes; write scopes require explicit enablement:

| Scope | Tools |
|-------|-------|
| `mcp:read:health` | `zen_get_health` |
| `mcp:read:endpoints` | `zen_list_endpoints` |
| `mcp:read:evidence` | `zen_get_evidence` |
| `mcp:read:deliveries` | `zen_get_delivery_status` |
| `mcp:read:planes` | `zen_list_planes` |
| `mcp:read:logs` | `zen_show_logs` |
| `mcp:read:*` | All read tools (default-on) |
| `mcp:write:<group>` | Write tools per group (disabled by default) |
| `mcp:admin:keys` | Admin/key management tools (not on default surface) |

Write tools (`create_api_key`, `revoke_api_key`, and other mutating tools) require `mcp:admin:keys` or `mcp:write:<group>` scopes respectively and are not available on the default surface.

## Transport Security

All MCP traffic uses TLS 1.2+ with system root CA verification. `InsecureSkipVerify` is permanently blocked. For sandbox deployments with self-signed certificates, provide a custom CA via `MCP_TLS_CA_CERT`.

## Tenant Binding

API keys are bound to a tenant at creation time. Every MCP request is scoped to the key's tenant. Cross-tenant access is prevented at the MCP proxy layer and enforced by Row-Level Security (RLS) at the database layer.

## mTLS Architecture

The MCP proxy authenticates incoming connections using mutual TLS (mTLS). Client certificates are issued through Zen Mesh's SPIFFE-based identity system. This ensures that:

- Only authorized MCP clients can connect
- Each client has a verifiable workload identity
- Connections are encrypted end-to-end

For V1, mTLS is enforced at the platform edge. Client certificate enrollment is handled during tenant onboarding.

> Archived by DOCSAI_R15.
> Reason: superseded — content fully contained in docs/mcp/authentication-and-mtls.md.
> Canonical replacement: docs/mcp/authentication-and-mtls.md.
> Do not use as current status.

---
sidebar_label: MCP Authentication
---

# MCP Authentication

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

MCP keys support granular scopes. The default read-only surface grants:

| Scope | Tools |
|-------|-------|
| `mcp:read:health` | `zen_get_health` |
| `mcp:read:endpoints` | `zen_list_endpoints` |
| `mcp:read:evidence` | `zen_get_evidence` |
| `mcp:read:deliveries` | `zen_get_delivery_status` |
| `mcp:read:planes` | `zen_list_planes` |
| `mcp:read:logs` | `zen_show_logs` |
| `mcp:read:*` | All read-only tools |

Admin tools (`create_api_key`, `revoke_api_key`) require `mcp:admin:keys` scope and are not available on the default surface.

## TLS

All MCP traffic uses TLS 1.2+ with system root CA verification. `InsecureSkipVerify` is permanently blocked. For sandbox deployments with self-signed certificates, provide a custom CA via `MCP_TLS_CA_CERT`.

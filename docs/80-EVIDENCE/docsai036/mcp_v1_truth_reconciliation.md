# MCP V1 Truth Reconciliation

## Current Accepted Truth

**MCP V1 read-only support exists with sandbox/read tools. RW/apply remains deferred/not V1.**

- Default MCP surface: read-only (health, endpoints, evidence, deliveries, planes, logs)
- Admin tools (create_api_key, revoke_api_key): require `mcp:admin:keys` scope, not on default surface
- All MCP traffic: TLS 1.2+ with system root CA verification
- **Architecture_reopened=false** — V1 scope correctly documented

## Documentation Status

### docs/mcp/authentication.md
- **Status**: CORRECT — accurately documents V1 read-only vs admin tools
- **Content** (lines 25-37):
  - Default read-only surface scopes: mcp:read:health, mcp:read:endpoints, mcp:read:evidence, mcp:read:deliveries, mcp:read:planes, mcp:read:logs
  - Admin tools (create_api_key, revoke_api_key): require `mcp:admin:keys` scope, not available on default surface
- **Action**: NONE — documentation accurately scopes V1 capabilities

## Stale Claim Assessment

| Stale Claim | Found? | Correction |
|-------------|--------|------------|
| MCP apply V1 | NO | RW tools correctly scoped to admin only |
| MCP apply tools claimed as V1 | NO | Default surface is read-only |
| MCP read-only not supported | NO | Read-only fully documented |

## V1 MCP Scope

### Default Read-Only Surface
- **Tools**: zen_get_health, zen_list_endpoints, zen_get_evidence, zen_get_delivery_status, zen_list_planes, zen_show_logs
- **Scopes**: mcp:read:health, mcp:read:endpoints, mcp:read:evidence, mcp:read:deliveries, mcp:read:planes, mcp:read:logs
- **Status**: V1-supported, sandbox-enabled
- **TLS**: All traffic uses TLS 1.2+ with system root CA verification

### Admin Tools (Deferred/Not V1)
- **Tools**: create_api_key, revoke_api_key
- **Scopes**: mcp:admin:keys
- **Status**: Not on default surface, deferred/v1-not-implemented
- **Purpose**: Privileged management operations

## Security Notes

- `InsecureSkipVerify` permanently blocked
- For sandbox deployments with self-signed certificates: provide custom CA via `MCP_TLS_CA_CERT`
- API keys use `mcp_` prefix format

## Summary

**MCP V1 documentation is current.** No stale "MCP apply V1" or "RW tools as V1" claims found. Documentation correctly distinguishes between:
- Default V1 read-only surface (supported)
- Admin tools (deferred, not V1)

**Architecture_reopened=false** — MCP V1 scope correctly documented; RW/apply tools are deferred, not claimed as V1.

---
sidebar_label: MCP Tools
sidebar_class_name: generated
---

# MCP Tools Reference

:::note
This page is hand-curated from the Go tool definitions in `src/saas/mcp/tools/handler.go` and `src/saas/mcp/evidence/tools.go`. The long-term plan is to generate this from MCP tool schema manifests.
:::

## Default Surface (Read-Only Operational Truth)

### zen_get_health
Get zen-back health status (calls real zen-back `/api/v1/mcp/health` endpoint).

- **Auth**: MCP API key required
- **Scope**: `mcp:read:health`
- **Input**: None
- **Output**: `{service, env, build_commit, schema_version, auth_mode, ready, status}`

### zen_list_endpoints
List available MCP endpoints.

- **Auth**: MCP API key required
- **Scope**: `mcp:read:endpoints`
- **Input**: None
- **Output**: `{endpoints: [{path, method, scope, description}], service, endpoint, timestamp}`

### zen_get_evidence
Get evidence details by endpoint ID.

- **Auth**: MCP API key required
- **Scope**: `mcp:read:evidence`
- **Input**: `endpoint_id` (string, required)
- **Output**: `{endpoint_id, status, service, endpoint, timestamp, description}`

### zen_get_delivery_status
Get delivery status by delivery ID.

- **Auth**: MCP API key required
- **Scope**: `mcp:read:deliveries`
- **Input**: `delivery_id` (string, required)
- **Output**: `{delivery_id, status, service, endpoint, timestamp}`

### zen_list_planes
List available operational planes.

- **Auth**: MCP API key required
- **Scope**: `mcp:read:planes`
- **Input**: None
- **Output**: `{planes: [{name, status}], service, endpoint, timestamp}`

### zen_show_logs
Show logs for a resource.

- **Auth**: MCP API key required
- **Scope**: `mcp:read:logs`
- **Input**: `resource_id` (string, required)
- **Output**: `{resource_id, logs: [string], service, endpoint, timestamp}`

### list_api_keys
List all API keys for your account.

- **Auth**: MCP API key required
- **Input**: `limit` (number, default 20), `offset` (number, default 0)

### list_deliveries
List webhook delivery attempts.

- **Auth**: MCP API key required
- **Input**: `limit`, `offset`, `status` (pending/delivered/failed), `webhook`

### get_delivery
Get details of a specific delivery attempt.

- **Auth**: MCP API key required
- **Input**: `delivery_id` (string, required)

### list_webhooks
List configured webhooks.

- **Auth**: MCP API key required
- **Input**: `limit`, `offset`

### get_webhook
Get details of a specific webhook.

- **Auth**: MCP API key required
- **Input**: `webhook_id` (string, required)

### get_delivery_stats
Get delivery statistics and metrics.

- **Auth**: MCP API key required
- **Input**: `days` (number, default 7)

### get_capabilities
List all runtime and trust capabilities with proof status.

- **Auth**: MCP API key required
- **Input**: None
- **Output**: `{capabilities: [{capability, status, description}], surface, note}`

### get_readiness
Readiness summary across runtime, trust, compliance domains.

- **Auth**: MCP API key required
- **Input**: None
- **Output**: `{overall_ready, domains: [{domain, ready, status}], blockers, note}`

### list_evidence_manifests
List available evidence families and their locations.

- **Auth**: MCP API key required
- **Input**: None

### list_runtime_proofs
List runtime convergence proofs (PROOF-001 to PROOF-010).

- **Auth**: MCP API key required
- **Input**: None

### list_trust_proofs
List trust lifecycle proofs (TRUST-001 to TRUST-010).

- **Auth**: MCP API key required
- **Input**: None

### list_non_claims
List explicit non-claims organized by category.

- **Auth**: MCP API key required
- **Input**: None

### list_merkle_evidence_refs
List Merkle evidence reference metadata.

- **Auth**: MCP API key required
- **Input**: None
- **Note**: Integrity receipts only. NOT authentication, identity, encryption, replay prevention, or delivery guarantee.

## Admin/Mutation Tools (Not on Default Surface)

These tools require explicit admin/auth surface elevation:

- `create_api_key` — Create a new API key (mutating)
- `revoke_api_key` — Revoke an API key (mutating)

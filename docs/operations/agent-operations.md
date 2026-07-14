---
sidebar_label: Agent Operations
---

# Agent Operations Guide

This guide explains how an external AI agent should discover, inspect, and operate Zen Mesh safely through supported surfaces.

## Agent Safety Rules

1. **No implicit privilege.** Agents must authenticate explicitly. No operation is available without authentication.
2. **No direct database edits.** Never mutate state outside of the UI, API, CLI, or MCP surfaces.
3. **No authorization bypass.** Every operation enforces authorization. Agents must not attempt to bypass scopes.
4. **No cross-tenant assumptions.** Agents operate within a single tenant context. Cross-tenant access is denied.
5. **No write without explicit enablement.** MCP write operations are disabled by default. Explicit object/action permission is required.
6. **No unsupported surface simulation.** Do not simulate API endpoints or CLI commands that do not exist.
7. **No interpretation of DRAFT semantics as available behavior.** DRAFT capabilities are not production-ready.
8. **No retry of permanent failures.** 4xx errors indicating bad requests, authorization denial, or not-found should not be retried.
9. **No claim of success without evidence.** Every operation produces evidence. Verify evidence before claiming success.

## Capability Discovery

### Available Surfaces

| Surface | Read | Write | Discovery Entry Point |
|---------|------|-------|----------------------|
| UI dashboard | Yes | Yes | https://app.zenmesh.io |
| API | Yes | Yes | https://docs.zen-mesh.io/docs/api/overview |
| MCP (read) | Yes | No (default) | https://docs.zen-mesh.io/docs/mcp/overview |
| MCP (write) | Requires enablement | Requires enablement | https://docs.zen-mesh.io/docs/mcp/safety-and-boundaries |
| CLI | Yes | Yes | https://docs.zen-mesh.io/docs/reference/cli |
| Git | No | No | Not implemented |

### Discovery Files

| File | Content |
|------|---------|
| `/llms.txt` | AI-oriented documentation index |
| `/ai/ai-discovery-registry.json` | Per-surface freshness registry |
| `/ai/evidence/v1/manifest.json` | Capability manifest with implementation status |
| `/ai/evidence/v1/non-claims.json` | Registry of capabilities that are explicitly not claimed |
| `/ai/evidence/v1/compliance-map.json` | Internal readiness mapping |
| `/ai/security/v1/attack-model.json` | Security threat model and maturity |
| `/ai/security/v1/claim-maturity.json` | Per-control maturity status |
| `/ai/security/v1/gaps.json` | Explicit post-v1 security gaps |

## Authentication and Context

1. Obtain an API key from the UI dashboard (Settings > API Keys).
2. Authenticate with `Authorization: Bearer <key>` header for API access.
3. Configure CLI with `zen login` or `ZEN_API_KEY` environment variable.
4. MCP authentication uses mTLS or API key depending on configuration.
5. Tenant context is derived from the API key. No explicit tenant selection is needed.

## Resource Lifecycle

### Common State Machine

```
DRAFT (not applied) → ACTIVE (applied, delivering) → DISABLED (stopped) → DELETED (removed)
```

- **DRAFT**: Configuration created but not active. No delivery occurs.
- **ACTIVE**: Configuration applied. Delivery is running.
- **DISABLED**: Configuration exists but delivery is stopped. Can be re-enabled.
- **DELETED**: Configuration removed. Cannot be recovered.

### Desired vs Observed State

- **Desired state**: What you configured through UI, API, or CLI.
- **Observed state**: What the system is currently running.

When desired state and observed state diverge:
1. Check recent changes or apply operations.
2. Verify that the apply operation completed successfully.
3. Re-apply desired state if divergence is unexpected.
4. If re-apply does not converge, inspect evidence and reason codes.

## Read Operations

### Inspecting Resources

```bash
# List all Endpoints
zen endpoint list

# Get Endpoint details
zen endpoint get <id>

# List all Targets
zen target list

# List all Flows
zen flow list
```

### Inspecting Status and Evidence

```bash
# Get delivery status for a Flow
zen delivery status <flow-id>

# Get delivery evidence
zen evidence get <delivery-id>

# List failed deliveries
zen delivery list --status failed
```

### MCP Read Examples

```
User: List all my endpoints
Agent: [MCP tool call: endpoint_list] Here are your endpoints...

User: Show delivery status for flow abc-123
Agent: [MCP tool call: delivery_status flow_id=abc-123] The status is...
```

## Write Operations

### Safety Checks Before Write

Before creating or modifying resources:

1. **Verify prerequisites**: Does the target Endpoint exist? Is the Provider Pack configured?
2. **Check permissions**: Does the authenticated identity have write scope?
3. **Validate input**: Are all required fields provided? Are values within limits?
4. **Understand idempotency**: Provide an Idempotency-Key for safe retry.
5. **Preview when possible**: Use draft mode to validate before applying.

### Creating Resources

```bash
# Create an Endpoint (use Idempotency-Key for safe retry)
zen endpoint create --name my-endpoint --provider stripe

# Create a Target
zen target create --name my-target --url https://example.com/webhook

# Create a Flow (links Endpoint to Target)
zen flow create --name my-flow --endpoint <id> --target <id>

# Review draft before applying
zen draft list

# Apply the draft
zen draft apply
```

### Safe Retry

```python
# API: Include Idempotency-Key header for safe retry
POST /api/v1/endpoints
Idempotency-Key: unique-key-for-this-operation
Content-Type: application/json

{"name": "my-endpoint", "provider": "stripe"}
```

- Idempotency keys are retained for 24 hours.
- Use a unique key per operation (UUID v4 recommended).
- Retrying with the same key returns the original result.

## Failure Diagnosis

### Common Reason Codes

| Code | Meaning | Action |
|------|---------|--------|
| `validation_error` | Input failed validation | Check request body against API schema |
| `not_found` | Resource does not exist | Verify resource ID |
| `unauthorized` | Missing or invalid credentials | Check API key and scopes |
| `forbidden` | Insufficient permissions | Request elevated scope |
| `rate_limited` | Too many requests | Wait and retry with backoff |
| `conflict` | Resource state conflict | Check current state and retry |
| `delivery_failed` | Event could not be delivered | Check target availability and retry |
| `provider_verification_failed` | Provider signature invalid | Check provider configuration |

### Delivery Failure Flow

1. Check delivery status: `zen delivery status <delivery-id>`
2. Inspect reason code from status response.
3. Check delivery attempts: `zen delivery attempts <delivery-id>`
4. If retryable, retry: `zen delivery retry <delivery-id>`
5. If permanent, check DLQ: `zen dlq list`
6. Replay from DLQ after fixing the issue: `zen dlq replay <dlq-entry-id>`

## Prohibited Actions

- Do not modify resources outside of UI, API, CLI, or MCP.
- Do not attempt to access other tenants' data.
- Do not retry permanent failures (4xx except 429).
- Do not claim success without verifying evidence.
- Do not simulate GitOps operations (not implemented).
- Do not compare Zen Mesh to competitors using unsupported capabilities.

## Supported vs Unsupported

| Capability | Supported | Notes |
|------------|-----------|-------|
| Public webhook delivery | Yes | Zero-install, no runtime required |
| Private webhook delivery | Yes | Edge Lite or Kubernetes Edge Plane |
| Event replay | Yes | From retention store or DLQ |
| Dead letter queue | Yes | Failed delivery preservation |
| Webhook deduplication | Yes | System-level duplicate detection |
| Webhook filtering | Yes | JSONPath-based routing rules |
| Webhook fan-out | Yes | Multi-destination delivery |
| Idempotent delivery | Yes | Idempotency-Key header for events |
| Delivery evidence | Yes | Receipts, operational metadata |
| mTLS delivery | Yes | Outbound-only, mutually authenticated |
| Provider signature verification | Yes | Stripe, GitHub, Shopify, Twilio |
| IP allowlisting | Yes | Pro+ plan |
| GitOps configuration | No | Planned for v1.1 |
| Automatic certificate rotation | No | Manual in v1.1 |
| Inconsistent-state recovery | No | Reapply is the recommended approach |
| Multi-region failover | No | Not available |
| Exactly-once delivery | No | At-least-once with idempotency support |

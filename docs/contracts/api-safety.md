---
sidebar_label: API Safety
description: API-specific safety and permissions model — channel separation, mutation risk, rate limits, audit, and evidence export.
---

# API Safety

> **API access safety, scoping, and permissions model.**

## Channel Separation

API access is a separate channel from UI and MCP. Permissions granted via API do not automatically apply to UI or MCP.

- API keys use the `zen_` prefix
- API keys are scoped per tenant
- API scope is independent of UI session scope
- API permission does not imply MCP permission

## Service Accounts and Users

**Service accounts** should use API keys with narrow scope:

```yaml
group: ci-service
channel: api
permissions:
  - evidence:read
  - delivery:read
```

**Individual users** can have separate API scope:

```yaml
user: alice
channels:
  ui:
    permissions: ["*:admin"]
  api:
    permissions: ["*:read"]
```

## Evidence Export via API

Evidence export is available by plan:
- **Free:** UI-only export
- **Pro:** API + bulk evidence export
- **Business (coming soon):** Extended API capabilities

See [Evidence Export Contract](/docs/contracts/evidence-export).

## Mutation Risk Model

| API Action | Risk | Mitigation |
|-----------|------|-----------|
| Read evidence | Low | Read-only keys |
| List resources | Low | Read-only keys |
| Create routes | Moderate | Require write scope + audit |
| Update sources | High | Require admin scope + audit |
| Delete resources | High | Require admin scope + confirmation |
| Apply drafts | High | Human-only (V1) |

## Rate Limits and Overage

- API rate limits apply per API key
- Rate limit errors return HTTP 429 with retry-after header
- Free plan: 60 requests/minute
- Pro plan: Higher limits
- No silent drops — all API errors return structured responses

See [Rate Limits](/docs/api/rate-limits) and [Plans & Limits](/docs/start-here/limits).

## Audit Requirements

- All API mutations are logged
- Read operations may be logged (configurable per plan)
- Audit log includes: API key ID, action, resource, timestamp, IP, user agent
- Audit logs are immutable and tenant-scoped

## See Also

- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design
- [MCP Safety](/docs/contracts/mcp-safety) — MCP safety model
- [API Authentication](/docs/api/authentication) — API key types and scopes
- [Evidence Export Contract](/docs/contracts/evidence-export) — evidence by plan
- [Plans & Limits](/docs/start-here/limits) — rate limits and overage

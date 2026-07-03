---
sidebar_label: Targets API
---

# Targets API

Targets are delivery destinations — where validated events are sent after ingestion and processing.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Target | destination | `/destinations` |

**Note:** API paths and some legacy documentation use the internal term "destination." Customer-facing docs and the UI use "target."

## Base path

```
/api/bff/v1/tenants/{tenant_id}/destinations     (dashboard/BFF — app-facing)
/v1/tenants/{tenant_id}/destinations             (backend API — WIRED_SANDBOX)
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/destinations` | List targets | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/destinations` | Create a target | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/destinations/{did}` | Get target details | WIRED_SANDBOX |
| `PATCH` | `/tenants/{tid}/destinations/{did}` | Update a target | WIRED_SANDBOX |
| `DELETE` | `/tenants/{tid}/destinations/{did}` | Delete a target | WIRED_SANDBOX |

## Request example

```json
{
  "name": "production-app-server",
  "url": "https://app.example.com/webhooks",
  "secret": {
    "value": "whsec_..."
  }
}
```

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique destination identifier |
| name | string | Human-readable name |
| url | string | Target URL for delivery |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Last update timestamp |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| List targets | Yes | — | WIRED_SANDBOX |
| Create target | — | Yes | WIRED_SANDBOX |
| Get target details | Yes | — | WIRED_SANDBOX |
| Update target | — | Yes | WIRED_SANDBOX |
| Delete target | — | Yes | WIRED_SANDBOX |

Write operations require tenant authorization, appropriate scopes, and audit logging. See [Write Safety Model](./write-safety) for details.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (destinations CRUD).

## UI mapping

Connect → Targets

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Target delivery to private NAT/firewalled networks requires Edge Lite or zen-agent.

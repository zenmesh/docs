---
sidebar_label: Flows API
---

# Flows API

Flows are declarative delivery contracts that connect an endpoint (source receiver) to a target (delivery destination).

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Flow | delivery-flow | `/delivery-flows` |

## Base path

```
/api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows     (dashboard/BFF — app-facing)
/v1/tenants/{tenant_id}/delivery-flows                                   (backend API — WIRED_SANDBOX)
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/delivery-flows` | List flows | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/delivery-flows` | Create a flow | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/delivery-flows/{fid}` | Get flow details | WIRED_SANDBOX |
| `PUT` | `/tenants/{tid}/delivery-flows/{fid}` | Update a flow | WIRED_SANDBOX |
| `DELETE` | `/tenants/{tid}/delivery-flows/{fid}` | Delete a flow | WIRED_SANDBOX |

## Request example

```json
{
  "name": "stripe-to-app",
  "source_id": "ing_abc123",
  "destination_id": "dest_def456",
  "config": {
    "retry_policy": {
      "max_attempts": 3,
      "backoff_seconds": 10
    }
  }
}
```

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (delivery-flows CRUD).

## UI mapping

Connect → Flows, Maintain → Flows

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Multi-target fanout is a Business+ planned feature (V1.1).
- GitOps for flows is not available in V1 (planned V1.1 Business+).

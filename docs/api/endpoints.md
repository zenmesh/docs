---
sidebar_label: Endpoints API
---

# Endpoints API

Endpoints are webhook source receivers — the public-facing URLs where providers send events.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Terminology

| Customer term | Internal API/model term | API path |
|---------------|------------------------|----------|
| Endpoint | ingester | `/ingesters` |

## Base path

```
/api/bff/v1/tenants/{tenant_id}/clusters/{cluster_id}/ingesters     (dashboard/BFF — app-facing)
/v1/tenants/{tenant_id}/ingesters                                   (backend API — WIRED_SANDBOX)
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/ingesters` | List endpoints | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/ingesters` | Create an endpoint | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/ingesters/{iid}` | Get endpoint details | WIRED_SANDBOX |
| `PUT` | `/tenants/{tid}/ingesters/{iid}` | Update an endpoint | WIRED_SANDBOX |
| `DELETE` | `/tenants/{tid}/ingesters/{iid}` | Delete an endpoint | WIRED_SANDBOX |

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml` (ingesters CRUD under `/clusters`).

## UI mapping

Connect → Endpoints

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Provider-specific endpoints (Stripe, GitHub, etc.) have provider-specific validation paths.
- Public endpoint URLs on shared receive IPs (Free tier) vs dedicated IPs (Business+).

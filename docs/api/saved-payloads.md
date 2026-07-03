---
sidebar_label: Saved Payloads API
---

# Saved Payloads API

Saved Payloads are test and template payloads stored for reuse. They are NOT the same as production retained webhook payloads.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Important distinction

| Type | Description | Retention | API |
|------|-------------|-----------|-----|
| **Saved Payload** (this API) | Test/template payloads, manually saved | User-managed | `/saved-payloads` |
| **Production retained payload** | Events retained as part of delivery history | Plan-based (7-30+ days) | `/deliveries` with payload |

Saved payloads are used in the Labs → Payload Builder for testing and development. They are not automatically retained delivery history.

## Base path

```
/v1/tenants/{tenant_id}/saved-payloads
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/saved-payloads` | List saved payloads | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/saved-payloads` | Create a saved payload | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/saved-payloads/{pid}` | Get saved payload details | WIRED_SANDBOX |
| `PUT` | `/tenants/{tid}/saved-payloads/{pid}` | Update a saved payload | WIRED_SANDBOX |
| `DELETE` | `/tenants/{tid}/saved-payloads/{pid}` | Delete a saved payload | WIRED_SANDBOX |

## Redaction

Credentials and secret-like keys are redacted from saved payloads automatically.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Not covered.

## UI mapping

Traffic → Payloads, Labs → Payload Builder

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Saved payloads are test/template payloads, not production retained webhook payload history.
- Production retained payloads are subject to plan-based retention and access different API paths.

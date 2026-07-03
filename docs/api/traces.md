---
sidebar_label: Traces / Evidence Spine API
---

# Traces / Evidence Spine API

The Trace API provides a delivery trace spine — the chain of delivery attempts and evidence for a single event.

> Status: WIRED_SANDBOX. This page describes the current contract surface. It is not a production-live availability claim.

## Audience

Customer / developer investigating delivery history.

## What a trace is

A trace in V1 is a **delivery trace spine** — the collection of delivery attempts, status transitions, and evidence correlation IDs for a single event. It is built from delivery attempts data and evidence/correlation fields.

**This is NOT full distributed tracing.** There is no OpenTelemetry integration, no span propagation, and no cross-service trace context in V1.

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/deliveries?event_id={eid}` | Get delivery trace for an event | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Shared (deliveries) |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get single delivery attempt detail | Read | WIRED_SANDBOX | `read:deliveries` | Not required | Shared (deliveries) |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Get delivery trace for an event | Yes | — | WIRED_SANDBOX |
| Get single delivery attempt detail | Yes | — | WIRED_SANDBOX |

Traces API is read-only. Traces are built from delivery attempt and evidence data, not directly created by customers.

## Get trace example

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?event_id=<event_id>"
```

## Response shape

```json
{
  "deliveries": [
    {
      "id": "del_001",
      "event_id": "evt_abc123",
      "status": "delivered",
      "attempt_number": 1,
      "attempted_at": "2026-07-03T10:30:00Z",
      "response_code": 200,
      "evidence_id": "ev_xyz789"
    },
    {
      "id": "del_002",
      "event_id": "evt_abc123",
      "status": "failed",
      "attempt_number": 2,
      "attempted_at": "2026-07-03T10:31:00Z",
      "response_code": 500,
      "error_message": "upstream timeout",
      "evidence_id": "ev_xyz790"
    }
  ]
}
```

## Error examples

### 404 Event not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "No deliveries found for event evt_abc123.",
  "instance": "req_abc123"
}
```

## Pagination

Trace delivery lists support cursor-based pagination. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Not directly covered — uses shared deliveries endpoint. See [OpenAPI Spec Index](./openapi).

## UI mapping

Traffic → Traces

## Related

- [Delivery Attempts API](./delivery-attempts) — individual delivery details
- [Evidence API](./evidence) — delivery evidence proofs
- [Retry API](./retry) — retry failed deliveries from trace

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Traces are delivery trace spines, not full distributed tracing.
- Trace completeness depends on evidence/correlation field wiring.
- Cross-service trace context is not supported in V1.

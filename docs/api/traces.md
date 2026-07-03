---
sidebar_label: Traces / Evidence Spine API
---

# Traces / Evidence Spine API

The Trace API provides a delivery trace spine — the chain of delivery attempts and evidence for a single event.

> Status: WIRED_SANDBOX. This page describes the current contract surface. It is not a production-live availability claim.

## What a trace is

A trace in V1 is a **delivery trace spine** — the collection of delivery attempts, status transitions, and evidence correlation IDs for a single event. It is built from delivery attempts data and evidence/correlation fields.

**This is NOT full distributed tracing.** There is no OpenTelemetry integration, no span propagation, and no cross-service trace context in V1.

## Base path

```
/v1/tenants/{tenant_id}/deliveries?event_id={event_id}
```

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `GET` | `/tenants/{tid}/deliveries?event_id={eid}` | Get delivery trace for an event | WIRED_SANDBOX |
| `GET` | `/tenants/{tid}/deliveries/{did}` | Get single delivery attempt detail | WIRED_SANDBOX |

## Response shape

```json
{
  "event_id": "evt_abc123",
  "attempts": [
    {
      "delivery_id": "del_001",
      "status": "delivered",
      "attempt_number": 1,
      "attempted_at": "2026-06-15T10:30:00Z",
      "response_code": 200,
      "evidence_id": "ev_xyz789"
    },
    {
      "delivery_id": "del_002",
      "status": "failed",
      "attempt_number": 2,
      "attempted_at": "2026-06-15T10:31:00Z",
      "response_code": 500,
      "error_message": "upstream timeout",
      "evidence_id": "ev_xyz790"
    }
  ]
}
```

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Get delivery trace for an event | Yes | — | WIRED_SANDBOX |
| Get single delivery attempt detail | Yes | — | WIRED_SANDBOX |

Traces API is read-only. Traces are built from delivery attempt and evidence data, not directly created by customers.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Not directly covered — uses shared deliveries endpoint.

## UI mapping

Traffic → Traces

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Traces are delivery trace spines, not full distributed tracing.
- Trace completeness depends on evidence/correlation field wiring.

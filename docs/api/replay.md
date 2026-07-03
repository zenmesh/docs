---
sidebar_label: Replay API
---

# Replay API

Replay recreates delivery of an event from retained payload/context. Replay differs from [Retry](./retry) — retry re-attempts delivery to the original target, while replay can deliver to the same or different target using the retained payload.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Important caveat

Replay **requires retained payload/context**. If the payload has exceeded the retention window or was never retained, replay is not available.

| Plan | Retention | Replay availability |
|------|-----------|-------------------|
| Free | 7 days | 3-day basic DLQ/replay |
| Pro | 30 days | 7-day advanced |
| Business | Longer | 30+ days |
| Enterprise | Custom | Custom |

## Operations

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| `POST` | `/tenants/{tid}/deliveries/{did}/replay` | Replay a single delivery | WIRED_SANDBOX |
| `POST` | `/tenants/{tid}/replay/batch` | Batch replay | PLANNED |

## Single replay request

```json
{
  "delivery_id": "del_abc123"
}
```

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Replay single delivery | — | Yes (gated) | WIRED_SANDBOX |
| Batch replay | — | Planned | PLANNED |

Read support for replay eligibility/context is available through the [Delivery Attempts API](./delivery-attempts). Write (replay) is gated by retained payload/context availability and plan-based retention limits. Replay requires tenant authorization and audit logging.

See [Write Safety Model](./write-safety) for details.

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter.

## OpenAPI coverage

Single replay partially covered in `zen-back.v1.yaml`. Batch replay not covered.

## UI mapping

Traffic → Replay

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Replay is gated by retained payload/context availability.
- Batch and dry-run replay are planned (post-V1), not available.
- Replay respects retention and plan limits — expired payloads cannot be replayed.

---
sidebar_label: UI to API Map
---

# UI to API Map

> Status: PUBLIC_CONTRACT_DRAFT. UI area availability is INTERNAL_ONLY — the dashboard is app-facing, not a public API contract. API pages carry their own status.

## Map

| UI area | UI menu/path | API page | Runtime route | API status |
|---|---|---|---|---|
| Home / Overview | Dashboard → Home | [Overview](../api/overview) | `GET /v1/overview` | WIRED_SANDBOX |
| Endpoints | Connect → Endpoints | [Endpoints](../api/endpoints) | `GET/POST /v1/endpoints` | WIRED_SANDBOX |
| Targets | Connect → Targets | [Targets](../api/targets) | `GET/POST /v1/targets` | WIRED_SANDBOX |
| Flows | Connect → Flows | [Flows](../api/flows) | `GET/POST /v1/flows` | WIRED_SANDBOX |
| Deliveries / Traffic | Traffic → Deliveries | [Delivery Attempts](../api/delivery-attempts) | `GET /v1/delivery-attempts` | WIRED_SANDBOX |
| DLQ | Traffic → DLQ | [DLQ](../api/dlq) | `GET /v1/dlq` | WIRED_SANDBOX |
| Retry | Traffic → Retry | [Retry](../api/retry) | `POST /v1/retry` | WIRED_SANDBOX |
| Replay | Traffic → Replay | [Replay](../api/replay) | `POST /v1/replay` | WIRED_SANDBOX (gated) |
| Saved Payloads | Traffic → Payloads | [Saved Payloads](../api/saved-payloads) | `GET/POST /v1/saved-payloads` | WIRED_SANDBOX |
| Traces | Traffic → Traces | [Traces](../api/traces) | `GET /v1/traces` | WIRED_SANDBOX |
| Evidence | Trust → Evidence | [Evidence](../api/evidence) | `GET /v1/evidence` | WIRED_SANDBOX |
| Retained Payloads | Delivery → Payloads | — | `GET /v1/retained-payloads` | WIRED_SANDBOX (plan-gated) |
| Webhook Sources | Connect → Sources | [Sources Guide](../guides/sources) | `GET /v1/sources` | WIRED_SANDBOX |
| Targets (Health) | Connect → Targets → details | — | `GET /v1/targets/{id}/health` | WIRED_SANDBOX |
| API Keys | Settings → API Keys | API Keys config | Console, not API | WIRED_SANDBOX |
| MCP | Settings → MCP | [MCP Overview](../mcp/overview) | MCP protocol | PUBLIC_CONTRACT_DRAFT |

## Not Mapped

| Area | Reason |
|---|---|
| Billing | Not live — no public API contract |
| Provider status | Provider-side — no Zen Mesh API |
| ZCC | Contract-level — cross-surface, not runtime-API |

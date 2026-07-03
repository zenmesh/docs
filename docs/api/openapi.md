---
sidebar_label: OpenAPI Spec Index
---

# OpenAPI Spec Index

Zen Mesh publishes OpenAPI 3.0.3 specifications covering the public and app-facing API surfaces.

> Status: PUBLIC_CONTRACT_DRAFT. OpenAPI specs are maintained alongside docs but may trail the current runtime. See per-spec status below.

## Available specs

| Spec | File | Lines | Coverage | Status | In Docusaurus |
|------|------|-------|----------|--------|---------------|
| **KubeZen Back API** | `api-specifications/zen-back.v1.yaml` | 1,265 | Backend public API (targets/endpoints/flows/deliveries) | DRAFT — wired in openapi-docs plugin | Yes |
| **Zen Mesh User API** | `static/openapi/zen-mesh-user-api.v1.yaml` | 2,021 | Same surface with code samples (curl, Python, JS) | DRAFT — static file only, not plugin-rendered | No (static) |
| **BFF API** | `src/saas/bff/openapi/zen-bff.v1.yaml` | — | Dashboard BFF surface | INTERNAL_ONLY — outside docs repo | No |

## Coverage table

| Endpoint group | Documented page | OpenAPI (zen-back) | OpenAPI (user) | Implementation route | HTTP methods | Status |
|----------------|----------------|-------------------|----------------|---------------------|-------------|--------|
| Health | — | Yes | Yes | `/health`, `/ready` | GET | WIRED_SANDBOX |
| Tenants | — | Yes | Yes | `/tenants/{tid}` | GET | WIRED_SANDBOX |
| Clusters/Planes | — | Yes | Yes | `/tenants/{tid}/clusters` | GET, POST | WIRED_SANDBOX |
| Targets (destinations) | [Targets API](./targets) | Yes | Yes | `/tenants/{tid}/destinations` | GET, POST, PATCH, DELETE | WIRED_SANDBOX |
| Endpoints (ingesters) | [Endpoints API](./endpoints) | Yes | Yes | `/tenants/{tid}/ingesters` | GET, POST, PUT, DELETE | WIRED_SANDBOX |
| Flows (delivery-flows) | [Flows API](./flows) | Yes | Yes | `/tenants/{tid}/delivery-flows` | GET, POST, PUT, DELETE | WIRED_SANDBOX |
| Delivery Attempts | [Delivery Attempts API](./delivery-attempts) | Partial | Partial | `/tenants/{tid}/deliveries` | GET | WIRED_SANDBOX |
| DLQ | [DLQ API](./dlq) | — | — | `/deliveries?status=failed` | GET | WIRED_SANDBOX |
| Retry | [Retry API](./retry) | — | — | `/events/{eid}/retry`, `/retry/batch` | POST | WIRED_SANDBOX |
| Replay | [Replay API](./replay) | Partial | Partial | `/deliveries/{did}/replay` | POST | WIRED_SANDBOX |
| Traces | [Traces API](./traces) | — | — | `/deliveries?event_id=` | GET | WIRED_SANDBOX |
| Saved Payloads | [Saved Payloads API](./saved-payloads) | — | — | `/saved-payloads` | GET, POST, PUT, DELETE | WIRED_SANDBOX |
| Evidence | [Evidence API](./evidence) | Partial | Partial | `/evidence/...`, `/sources/.../evidence` | GET | WIRED_SANDBOX |
| API Keys | [Authentication](./authentication) | Partial | Partial | `/api-keys` | GET, POST, DELETE | WIRED_SANDBOX |
| Webhook endpoints | — | — | — | `/webhooks/{provider}` | POST | WIRED_SANDBOX |
| Integrations | — | — | Yes | `/integrations` | GET, POST | WIRED_SANDBOX |
| Channels (bridge) | — | Yes | Yes | `/bridge/.../channels` | GET | WIRED_SANDBOX |

## Spec coverage gaps

The following documented endpoints are **not covered** by any published OpenAPI spec:

| Endpoint group | Missing from both specs |
|---|---|
| DLQ | Uses deliveries shared endpoint — no separate spec entry |
| Retry | Not covered |
| Traces | Shared deliveries endpoint — no separate spec entry |
| Saved Payloads | Not covered |
| Fabric Adapters | BFF-only (not in this repo) |

## How to validate a spec

```bash
# Validate with spectral
npx spectral lint api-specifications/zen-back.v1.yaml

# Compare spec against docs routes
curl -s https://raw.githubusercontent.com/zenmesh/zen-platform-hermes/main/api-specifications/zen-back.v1.yaml \
  | grep -E '^\s+/' | head -40

# Generate spec diff
npx oasdiff changelog api-specifications/zen-back.v1.yaml <previous-version>.yaml
```

## How to compare spec with route inventory

1. Fetch the current spec: `curl https://raw.githubusercontent.com/zenmesh/zen-platform-hermes/main/api-specifications/zen-back.v1.yaml`
2. Compare against documented routes in [API Overview](./overview#api-surface-groups) or the [API Reference](../reference/api).
3. Generate diff using `oasdiff` or similar tool.

## Non-claims

- OpenAPI specs are maintained alongside docs but may trail the current runtime.
- The User API spec (`static/openapi/`) is provided as a static reference but is not rendered via the Docusaurus OpenAPI plugin.
- The BFF spec is NOT in this repository; it is internal to the dashboard app.
- Specs are DRAFT status unless explicitly marked PUBLIC_CONTRACT_STABLE.
- Several endpoint groups (Retry, Saved Payloads, Traces, DLQ) are not covered by any published spec.
- Coverage varies by HTTP method even within covered groups.

## Related

- [API Overview](./overview) — surface group taxonomy
- [API Status Matrix](./status) — per-group maturity and coverage
- [API Quickstart](./quickstart) — developer journey with examples

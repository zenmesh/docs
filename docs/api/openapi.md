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

| Endpoint group | Documented page | OpenAPI (zen-back) | OpenAPI (user) | Implementation route | Status |
|----------------|----------------|-------------------|----------------|---------------------|--------|
| Health | — | Yes | Yes | `/health`, `/ready` | WIRED_SANDBOX |
| Tenants | — | Yes | Yes | `/tenants/{tid}` | WIRED_SANDBOX |
| Clusters/Planes | — | Yes | Yes | `/tenants/{tid}/clusters` | WIRED_SANDBOX |
| Targets (destinations) | [Targets API](./targets) | Yes | Yes | `/tenants/{tid}/destinations` | WIRED_SANDBOX |
| Endpoints (ingesters) | [Endpoints API](./endpoints) | Yes | Yes | `/tenants/{tid}/ingesters` | WIRED_SANDBOX |
| Flows (delivery-flows) | [Flows API](./flows) | Yes | Yes | `/tenants/{tid}/delivery-flows` | WIRED_SANDBOX |
| Delivery Attempts | [Delivery Attempts API](./delivery-attempts) | Partial | Partial | `/tenants/{tid}/deliveries` | WIRED_SANDBOX |
| DLQ | [DLQ API](./dlq) | — | — | `/deliveries?status=failed` | WIRED_SANDBOX |
| Retry | [Retry API](./retry) | — | — | `/events/{eid}/retry` | WIRED_SANDBOX |
| Replay | [Replay API](./replay) | Partial | Partial | `/deliveries/{did}/replay` | WIRED_SANDBOX |
| Traces | [Traces API](./traces) | — | — | `/deliveries` | WIRED_SANDBOX |
| Saved Payloads | [Saved Payloads API](./saved-payloads) | — | — | `/saved-payloads` | WIRED_SANDBOX |
| Evidence | [Evidence API](./evidence) | Partial | Partial | `/evidence/...` | WIRED_SANDBOX |
| API Keys | [Authentication](./authentication) | Partial | Partial | `/api-keys` | WIRED_SANDBOX |
| Webhook endpoints | — | — | — | `/webhooks/{provider}` | WIRED_SANDBOX |
| Integrations | — | — | Yes | `/integrations` | WIRED_SANDBOX |
| Channels (bridge) | — | Yes | Yes | `/bridge/.../channels` | WIRED_SANDBOX |

## Validation

Specs are validated with Spectral (`spectral:off` in `.spectral.yaml`). OASDiff and changelog generation are planned but not currently automated.

## How to compare spec with route inventory

1. Fetch the current spec: `curl https://raw.githubusercontent.com/zenmesh/zen-platform-hermes/main/api-specifications/zen-back.v1.yaml`
2. Compare against documented routes in [API Overview](./overview#api-surface-groups).
3. Generate diff using `oasdiff` or similar tool.

## Non-claims

- OpenAPI specs are maintained alongside docs but may trail the current runtime.
- The User API spec (`static/openapi/`) is provided as a static reference but is not rendered via the Docusaurus OpenAPI plugin.
- The BFF spec is NOT in this repository; it is internal to the dashboard app.
- Specs are DRAFT status unless explicitly marked PUBLIC_CONTRACT_STABLE.

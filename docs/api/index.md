---
sidebar_label: API
---

# API

The Zen Mesh REST API provides programmatic access to webhook delivery for public and private networks.

## Interactive Reference

The canonical interactive API reference is the [Swagger UI](./swagger/) — powered by OpenAPI 3.0.3.

## Quick Links

| Resource | Description |
|----------|-------------|
| [Interactive Reference](./swagger/) | Swagger UI — explore all operations, schemas, and examples |
| [OpenAPI YAML](/docs/api/openapi.yaml) | Machine-readable contract (YAML) |
| [OpenAPI JSON](/docs/api/openapi.json) | Machine-readable contract (JSON) |
| [Authentication](./authentication) | Bearer tokens and HMAC webhook verification |
| [Errors](./errors) | RFC 9457 Problem Details format |
| [Write Safety](./write-safety) | Mutation guardrails |
| [API Changelog](./changelog) | Contract version history |

## Maturity

All operations are currently `WIRED_SANDBOX` — not yet production-live.

See the [Status Matrix](./status) for the full per-group maturity map.

## Coverage

| Group | Operations | Status |
|-------|-----------|--------|
| Health | 2 | WIRED_SANDBOX |
| Tenants | 1 | WIRED_SANDBOX |
| Planes (Clusters) | 2 | WIRED_SANDBOX |
| CRDs | 13 | WIRED_SANDBOX |
| Webhooks | 5 | WIRED_SANDBOX |
| Integrations | 1 | WIRED_SANDBOX |

---
sidebar_label: API
---

# API

The Zen Mesh REST API provides programmatic access to webhook delivery for public and private networks.

## Interactive Reference

**The canonical interactive API reference is [Swagger UI](./swagger/).** Powered by OpenAPI 3.0.3, served locally — no external CDN dependencies.

<a class="button button--lg button--primary" href="./swagger/">Open Swagger UI →</a>

---

## Quick Links

| Resource | Description |
|----------|-------------|
| [Interactive Reference](./swagger/) | Swagger UI — explore all operations, schemas, and examples |
| [OpenAPI YAML](/docs/api/openapi.yaml) | Machine-readable contract (YAML) |
| [OpenAPI JSON](/docs/api/openapi.json) | Machine-readable contract (JSON) |
| [Python SDK](./sdks#python-sdk) | Generated from the same spec |
| [TypeScript SDK](./sdks#typescript-sdk) | Generated from the same spec |
| [Authentication](./authentication) | Bearer tokens and HMAC webhook verification |
| [Errors](./errors) | RFC 9457 Problem Details format |
| [Write Safety](./write-safety) | Mutation guardrails |
| [API Changelog](./changelog) | Contract version history |

---

## SDKs

Client libraries generated from the public OpenAPI spec:

- [Python SDK](./sdks#python-sdk) — `openapi-generator-cli -g python`
- [TypeScript SDK](./sdks#typescript-sdk) — `openapi-generator-cli -g typescript`

The SDKs are **not yet published to PyPI/npm**. Generate them yourself using the commands on the [SDKs](./sdks) page, or fork the `generated/` directory in the docs repository.

---

## Maturity

All operations are currently `WIRED_SANDBOX` — not yet production-live.

See the [Status Matrix](./status) for the full per-group maturity map.

---

## Coverage

| Group | Operations | Status |
|-------|-----------|--------|
| Health | 2 | WIRED_SANDBOX |
| Tenants | 1 | WIRED_SANDBOX |
| Planes (Clusters) | 2 | WIRED_SANDBOX |
| CRDs | 13 | WIRED_SANDBOX |
| Webhooks | 5 | WIRED_SANDBOX |
| Integrations | 1 | WIRED_SANDBOX |

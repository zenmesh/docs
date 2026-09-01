---
sidebar_label: OpenAPI Spec
---

# OpenAPI Spec

Zen Mesh publishes an OpenAPI 3.0.3 specification covering the **public customer-facing API surface**. It is the canonical machine-readable contract from which Swagger UI and SDKs are generated.

> **For interactive exploration, use [Swagger UI](./swagger/)** — it loads this spec in a browser-native UI.

## Spec Files

| Spec | Location | Description |
|------|----------|-------------|
| Public API | `/docs/api/openapi.yaml` | **Use this.** PUBLIC_CUSTOMER operations only. |
| Full API | Internal | Includes INTERNAL_BFF operations. Not published publicly. |

## Source of Truth Chain

```
zen-mesh-api.v1.public.yaml (PUBLIC_CUSTOMER filter)
  ├── Swagger UI  → /docs/zen-mesh/api/swagger/
  ├── OpenAPI YAML  → /docs/api/openapi.yaml
  ├── OpenAPI JSON  → /docs/api/openapi.json
  ├── Python SDK  → generated/python/
  └── TypeScript SDK  → generated/typescript/
```

## Audience Classification

Every operation in the public spec is tagged `x-zen-audience: PUBLIC_CUSTOMER`.

Operations tagged `INTERNAL_*` are excluded from the public spec and are not available via Swagger.

See [SDKs](./sdks) for generated client libraries derived from this spec.

## Validation

```bash
# Validate spec
npx spectral lint /docs/api/openapi.yaml

# Check operation coverage
grep "x-zen-audience" /docs/api/openapi.yaml | sort | uniq -c
```

## Non-Claims

- The public spec reflects the PUBLIC_CUSTOMER surface only.
- Internal operations (INTERNAL_BFF, INTERNAL_COMPONENT, INTERNAL_OPERATOR) are excluded.
- Spec status is `WIRED_SANDBOX` — not production-live.

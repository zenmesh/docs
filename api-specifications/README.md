# KubeZen API Specifications

This directory contains OpenAPI 3.0 specifications for KubeZen platform APIs.

## Overview

The KubeZen platform exposes multiple service APIs, each with its own OpenAPI specification:

| API | Specification | Description |
|-----|---------------|-------------|
| **zen-back** | [zen-back.v1.yaml](./zen-back.v1.yaml) | Backend API for CRD management, tenant/cluster operations, channels, and webhooks |
| **zen-bff** | [zen-bff.v1.yaml](../src/saas/bff/openapi/zen-bff.v1.yaml) | Backend-for-Frontend aggregation layer for the SPA |

## Authentication Schemes

The KubeZen APIs support multiple authentication methods:

### Tenant Auth (OIDC/Session)
- **Used by**: UI and API client calls
- **Scheme**: Bearer JWT token
- **Endpoints**: Most endpoints under `/tenants/{tenant_id}`

### HMAC Auth
- **Used by**: Cluster-originated writes and webhook endpoints
- **Scheme**: API key in `X-KubeZen-Signature` header
- **Endpoints**: Cluster management, webhook endpoints

### Bridge Auth
- **Used by**: Control plane channel management (bridge-only)
- **Scheme**: Bearer JWT token
- **Endpoints**: All endpoints under `/bridge/*`

## Using the Specifications

### With Swagger UI
```bash
npm install -g @redocly/cli
redocly preview zen-back.v1.yaml
```

### With Redoc
```bash
docker run -p 8080:80 \
  -e SPEC_URL=https://raw.githubusercontent.com/zenmesh/zen-platform/main/api-specifications/zen-back.v1.yaml \
  redocly/redoc
```

### Generate Client SDKs
```bash
# Using openapi-generator
openapi-generator-cli generate \
  -i zen-back.v1.yaml \
  -g go \
  -o ./generated/go
```

## API Documentation References

- [CRD API Endpoints](../docs/05-api-reference/CRD_API.md)
- [Channel Management API Design](../docs/05-api-reference/CHANNEL_MANAGEMENT_API_DESIGN.md)
- [Available Integrations](../docs/05-api-reference/AVAILABLE_INTEGRATIONS.md)

## Contributing

When adding new endpoints or modifying existing ones:
1. Update the appropriate OpenAPI spec file
2. Add/update schema definitions in `components/schemas`
3. Ensure all endpoints have proper security schemes
4. Update documentation files in `docs/05-api-reference/`

## Versioning

- Specifications follow Semantic Versioning (MAJOR.MINOR.PATCH)
- Breaking changes require MAJOR version increment
- Backward-compatible additions require MINOR version increment
- Bug fixes require PATCH version increment

## Questions?

- API docs: [docs/05-api-reference/](../docs/05-api-reference/)
- Architecture: [docs/01-architecture/](../docs/01-architecture/)

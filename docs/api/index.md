---
sidebar_label: Interactive API Console
---

# Interactive API Console

> Status: PUBLIC_CONTRACT_DRAFT. The interactive API console provides live testing of documented endpoints.

## Access the Swagger UI

Try all operations live with the official [Swagger UI](/swagger-ui.html) — powered by swagger.io.

The Swagger UI provides:

- **Interactive testing** of all documented endpoints
- **Live API calls** with real responses
- **Request/response examples** for each operation
- **Authentication setup** for testing protected endpoints
- **Code examples** in multiple languages

## Quick Start

1. [Open the Swagger UI](/swagger-ui.html)
2. Click "Authorize" to set up your API token
3. Expand any endpoint group
4. Click "Try it out" to test the endpoint
5. Fill in required parameters and click "Execute"

## Available Endpoints

The interactive console covers the following API groups:

- **Health**: `/health`, `/ready`
- **Tenant Management**: `/tenants/{tenant_id}`
- **Plane Operations**: `/tenants/{tenant_id}/clusters/*`
- **CRD Management**: `/tenants/{tenant_id}/clusters/{cluster_id}/*/*`
- **Channel/Flow Management**: `/bridge/tenants/{tenant_id}/clusters/{cluster_id}/channels/*`
- **Webhook Endpoints**: `/webhooks/{provider}`
- **Targets (Destinations)**: `/tenants/{tenant_id}/destinations`
- **Endpoints (Ingester)**: `/tenants/{tenant_id}/ingesters`
- **Flows**: `/tenants/{tenant_id}/delivery-flows`
- **Delivery Attempts**: `/tenants/{tenant_id}/deliveries`
- **Evidence**: `/evidence/...`, `/sources/.../evidence`

## API Status

See the [API Status Matrix](./status) for detailed maturity and coverage information for each endpoint group.

## Authentication

The Swagger UI supports multiple authentication methods:

- **Tenant Auth**: Bearer JWT token (used by UI and API clients)
- **HMAC Auth**: API key in X-KubeZen-Signature header (plane-originated writes)
- **Bridge Auth**: Bearer JWT token (bridge-only channel management)

## Related Documentation

- [API Overview](./overview) — surface group taxonomy and mental model
- [API Status Matrix](./status) — per-group maturity and coverage
- [API Quickstart](./quickstart) — developer journey with examples
- [OpenAPI Spec Index](./openapi) — specification files and coverage details
- [Authentication](./authentication) — authentication and authorization details
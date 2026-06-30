---
sidebar_label: API Overview
---

# API Overview

The Zen Mesh REST API provides programmatic access to webhook ingestion, delivery management, security operations, and platform observability.

## API Surface

Zen Mesh exposes two API surfaces for different consumers:

| Surface | Base URL | Purpose | Auth |
|---------|----------|---------|------|
| **Back API** | `https://api.zen-mesh.io/v1` | Platform management (CRDs, tenants, clusters, destinations) | Bearer JWT, API Key, HMAC |
| **BFF API** | Dashboard API (`/api/bff/v1`) | Dashboard aggregation (features, config, jobs, events) | Session cookie, API Key |

## API Reference

- [Back API Reference](./reference/kubezen-back-api) — Generated from OpenAPI spec
- [Customer API](../reference/customer-api) — read-only operational truth API

## Core Capabilities

- **Webhook delivery**: Ingest, validate, and deliver webhooks from Stripe, GitHub, Twilio, Shopify, and custom sources
- **Security controls**: IP allowlisting, header validation, mTLS enrollment, cryptographic enrollment
- **Delivery reliability**: Dead-letter queues, replays, deduplication, idempotency, filtering, fan-out
- **Observability**: Delivery tracking, evidence proofs, Merkle integrity receipts
- **MCP integration**: [MCP server](../mcp/overview.md) for AI agent access

## Base URL

```bash
# Production
https://api.zen-mesh.io/v1

# Staging
https://staging.api.zen-mesh.io/v1
```

## API Versioning

The Back API follows URL-based versioning (`/v1`, `/v2`). Breaking changes increment the major version. Backward-compatible additions use minor version increments within the spec `info.version` field.

See [API Versioning and Compatibility](./versioning.md) for the compatibility policy.

## Related Docs

- [Authentication and API Keys](./authentication.md)
- [Errors and Problem Details](./errors.md)
- [Fabric Adapters API](./fabric-adapters.md) - Manage adapters in your Fabric
- [MCP Overview](../mcp/overview.md) - AI agent integration

## Status and Scope

This documentation covers the documented user-facing API endpoints. Not all platform endpoints are documented — some are internal, admin-only, or still evolving.

**Current scope:**
- User-facing tenant-scoped operations
- Webhook ingestion and delivery management
- Adapter and plane management
- Delivery flows and destinations
- Evidence and observability

**Not covered in this section:**
- Internal admin-only endpoints
- Debug/diagnostic endpoints
- BFF-only internal routes

The API is in active development. Endpoint availability reflects the current deployed product.

## Additional Guides

- [Rate Limits and Operational Limits](./rate-limits.md)
- [Webhook Delivery API Guide](./webhooks.md)
- [Events and Evidence API Guide](./events.md)
- [API Changelog](./changelog.md)

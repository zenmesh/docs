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
| **BFF API** | `https://app.zen-mesh.io/api/bff/v1` | Dashboard aggregation (features, config, jobs, events) | Session cookie, API Key |

## API Reference

- [Back API Reference](./reference.md) — Generated from OpenAPI spec
- [Customer API](../reference/customer-api.md) — Planned read-only operational truth API

## Core Capabilities

- **Webhook delivery**: Ingest, validate, and deliver webhooks from Stripe, GitHub, and custom sources
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
- [Rate Limits and Operational Limits](./rate-limits.md)
- [Webhook Delivery API Guide](./webhooks.md)
- [Events and Evidence API Guide](./events.md)
- [API Changelog](./changelog.md)

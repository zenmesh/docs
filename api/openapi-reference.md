---
title: OpenAPI Reference
sidebar_label: OpenAPI Reference
sidebar_position: 50
---

# OpenAPI Reference

Zen Mesh provides an interactive API reference rendered from our canonical OpenAPI specification.

## Overview

This page renders the [Zen Mesh User API](./zen-mesh-user-api.v1.yaml) specification using the pinned **@scalar/api-reference** renderer.

**Spec URLs:**
- YAML: [`zen-mesh-user-api.v1.yaml`](./zen-mesh-user-api.v1.yaml)
- JSON: [`zen-mesh-user-api.v1.json`](./zen-mesh-user-api.v1.json)

## API Coverage

The OpenAPI spec includes public, user-facing endpoints:

- **Health:** `/health`, `/ready`
- **Tenant management:** `/tenants/{tenant_id}`
- **Cluster operations:** `/tenants/{tenant_id}/clusters/*`
- **CRD management:** `/tenants/{tenant_id}/clusters/{cluster_id}/*/*`
- **Channel/flow management:** `/bridge/tenants/{tenant_id}/clusters/{cluster_id}/channels/*`
- **Webhook endpoints:** `/webhooks/slack`, `/webhooks/servicenow`, `/webhooks/jira`, `/webhooks/datadog`, `/webhooks/pagerduty`
- **Integrations:** `/integrations`

**Note:** This is a preview specification. All endpoints are subject to change during the v1-preview period.

## Authentication

This API supports multiple authentication methods:

- **Tenant Auth:** Bearer JWT token (used by UI and API clients)
- **HMAC Auth:** API key in `X-KubeZen-Signature` header (cluster-originated writes)
- **Bridge Auth:** Bearer JWT token (bridge-only channel management)

See [Authentication](./authentication.md) for detailed authentication documentation.

## Using the API

1. **Get a token:** Authenticate using the [Authentication guide](./authentication.md)
2. **Make requests:** Use the endpoints documented in the spec
3. **Validate responses:** Check response schemas in the spec

## Live API Reference

The OpenAPI specification is rendered using a pinned version of **@scalar/api-reference** (v1.62.1).

<iframe 
  src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.62.1"
  style="width:100%; height: calc(100vh - 200px); border: none;"
  title="Zen Mesh User API - Scalar Reference"
  allow="clipboard-write"
></iframe>

## OpenAPI Specification

### YAML Spec

Download the raw YAML specification:

- **YAML:** [`zen-mesh-user-api.v1.yaml`](./zen-mesh-user-api.v1.yaml)
- **Live URL:** `https://docs.zen-mesh.io/openapi/zen-mesh-user-api.v1.yaml`

### JSON Spec

Download the raw JSON specification:

- **JSON:** [`zen-mesh-user-api.v1.json`](./zen-mesh-user-api.v1.json)
- **Live URL:** `https://docs.zen-mesh.io/openapi/zen-mesh-user-api.v1.json`

### Spec Version

- **Version:** v1-preview
- **OpenAPI:** 3.0.3
- **Title:** Zen Mesh User API
- **Paths:** 19 endpoints

## Related Documentation

- [API Overview](./overview.md) - Introduction to Zen Mesh APIs
- [Authentication](./authentication.md) - Authentication and authorization
- [Fabric Adapters API](./fabric-adapters.md) - Adapter management guide
- [API Quickstart](./quickstart.md) - Quick start guide

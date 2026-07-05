---
sidebar_label: API Reference
---

# API Reference

The Zen Mesh API provides REST, MCP, and WebSocket surfaces for the [Configuration Contract](../product/zen-configuration-contract). This page indexes all publicly documented API surfaces.

> Status: PUBLIC_CONTRACT_DRAFT. Individual API groups carry their own maturity status. See [API Status Matrix](../api/status) for per-group details.

## API Overview

- **[API Overview](../api/overview)** — Canonical API taxonomy: surface groups, maturity legend, public-contract boundary, terminology mapping, non-claims
- **[API Status Matrix](../api/status)** — Per-group maturity, audience, base path, auth model, read/write support, OpenAPI coverage, UI mapping, and non-claims
- **[Authentication and API Keys](../api/authentication)** — Auth models: Bearer JWT, API key, HMAC, session, MCP auth, tenant scoping, scopes, write enablement
- **[Errors and Problem Details](../api/errors)** — RFC 9457 Problem Details format, status codes, validation, scope denial, idempotency conflict
- **[Pagination and Filtering](../api/pagination)** — Cursor-based and offset-based pagination, query filters, defaults, limits
- **[Idempotency](../api/idempotency)** — Idempotency-Key header, deduplication window, safe retry, endpoint coverage
- **[Write Safety Model](../api/write-safety)** — Authorization, scopes, object permissions, idempotency, audit, fail-closed, MCP write safety
- **[API Versioning and Compatibility](../api/versioning)** — URL-based versioning, compatibility policy, spec maintenance

## Runtime APIs

- **[Targets API](../api/targets)** — Delivery destinations (internal model: destinations). Status: WIRED_SANDBOX
- **[Endpoints API](../api/endpoints)** — Webhook source receivers (internal model: ingesters). Status: WIRED_SANDBOX
- **[Flows API](../api/flows)** — Declarative delivery contracts connecting endpoints to targets. Status: WIRED_SANDBOX
- **[Delivery Attempts API](../api/delivery-attempts)** — One delivery execution with status values. Status: WIRED_SANDBOX
- **[DLQ API](../api/dlq)** — Failed delivery attempts with retry relationship. Status: WIRED_SANDBOX
- **[Retry API](../api/retry)** — Single and batch retry for failed deliveries. Status: WIRED_SANDBOX
- **[Replay API](../api/replay)** — Event replay from retained payload/context. Status: WIRED_SANDBOX
- **[Traces / Evidence Spine API](../api/traces)** — Delivery trace spine. Not full distributed tracing. Status: WIRED_SANDBOX
- **[Saved Payloads API](../api/saved-payloads)** — Test/template payloads. Not production retained payloads. Status: WIRED_SANDBOX
- **[Evidence API](../api/evidence)** — Cryptographic delivery proofs, integrity inclusion verification. Status: WIRED_SANDBOX
- **[Logs API](../api/logs)** — Structured platform logs with pagination and filtering. Status: WIRED_SANDBOX
- **[Rate Limits and Operational Limits](../api/rate-limits)** — Plan-based limits per tier. Status: PUBLIC_CONTRACT_DRAFT
- **[Fabric Adapters API](../api/fabric-adapters)** — List, disable, enable adapters per tenant/cluster. Status: WIRED_SANDBOX (BFF surface)

## Workflow Recipes

- [Create a Webhook Endpoint](../api/recipes/create-webhook-endpoint)
- [Create a Target](../api/recipes/create-target)
- [Create a Flow](../api/recipes/create-flow)
- [List Planes and Inspect Adapters](../api/recipes/list-planes-and-adapters)
- [Validate, Test, and Publish Drafts](../api/recipes/drafts-validate-test-publish)
- [Handle Errors and Rate Limits](../api/recipes/errors-and-rate-limits)

## MCP

- **[MCP Overview](../mcp/overview)** — Model Context Protocol server, tool surface, read/write model, non-claims. Status: PUBLIC_CONTRACT_DRAFT
- **[MCP Tools Reference](../mcp/tools)** — MCP tool surface (read/write, default-off per tool group)
- **[MCP Authentication and mTLS](../mcp/authentication-and-mtls)** — MCP API key format, scopes, TLS requirements
- **[MCP Safety and Boundaries](../mcp/safety-and-boundaries)** — Auth model, tool execution, gating, data isolation
- **[MCP Draft System](../mcp/draft-system)** — AI drafts infrastructure; human-only apply with governance model

## Customer API

- **[Customer API](../reference/customer-api)** — Planned programmable interface for reading operational truth and managing authorized Zen Mesh resources. Not read-only globally; endpoint groups carry individual read/write status. Status: PLANNED.

## OpenAPI

- **[OpenAPI Spec Index](../api/openapi)** — Canonical spec file, coverage table, endpoint groups, validation commands

## Delivery Reference

- **[Delivery Status Reference](../reference/delivery-status)** — Webhook delivery state machine: status values, transitions, retry policy, DLQ
- **[Webhook Delivery Evidence](../reference/webhook-delivery-evidence)** — Delivery receipts, audit trail, integrity verification
- **[Webhook FAQ](../reference/webhook-faq)** — 12 frequently asked questions about webhook delivery

## Changelog

- **[API Changelog](../api/changelog)** — Version history, migration notes, planned OpenAPI integration

## Non-claims

- API documentation is not proof of production availability.
- Local/sandbox proof is not production-live proof.
- Billing live is not claimed unless explicitly marked.
- Some endpoints are app-facing only and not a public customer contract.
- Endpoint groups marked WIRED_SANDBOX are validated in sandbox/local runtime only.

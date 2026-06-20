---
sidebar_label: Versioning & Compatibility
---

# API Versioning and Compatibility

## URL-Based Versioning

The Zen Mesh Back API uses URL path versioning:

| Version | Base URL | Status |
|---------|----------|--------|
| v1 | `https://api.zen-mesh.io/v1` | Current stable |

Breaking changes require a new major version (`/v2`). Backward-compatible additions and bug fixes are made within the current version.

## Compatibility Policy

- **Additive changes** (new endpoints, new optional fields) — allowed within version
- **Breaking changes** (removed endpoints, required field changes, response restructuring) — new version
- **Field deprecation** — announced at least one minor release cycle before removal
- **Schema evolution** — new fields in responses are additive; clients must ignore unknown fields

## BFF API Versioning

The BFF (Backend-for-Frontend) API follows the same URL-based versioning as the Back API. The BFF API changes independently and may have different version numbers.

## Spec Maintenance

The OpenAPI specification at `api-specifications/zen-back.v1.yaml` is the canonical source of truth for the Back API. Spec changes must precede or accompany code changes.

## Changelog

See [API Changelog](./changelog.md) for version history and migration notes.

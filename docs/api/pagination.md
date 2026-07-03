---
sidebar_label: Pagination and Filtering
---

# Pagination and Filtering

> Status: PUBLIC_CONTRACT_DRAFT. This page describes the pagination and filtering model. Individual endpoints may vary. It is not a production-live availability claim.

## Overview

List endpoints support cursor-based and offset-based pagination, with filtering by common fields.

## Pagination modes

### Cursor-based pagination (preferred)

List endpoints that return large datasets use cursor-based pagination. The response includes a `next_cursor` field that can be passed as a query parameter to fetch the next page.

**Request:**

```bash
curl -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?limit=10"
```

**Response:**

```json
{
  "deliveries": [ ... ],
  "next_cursor": "eyJvZmZzZXQiOjEwfQ=="
}
```

**Next page:**

```bash
curl -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?limit=10&cursor=eyJvZmZzZXQiOjEwfQ=="
```

### Offset-based pagination

Some endpoints support `limit` and `offset` parameters:

| Parameter | Type | Description | Default | Max |
|---|---|---|---|---|
| `limit` | integer | Results per page | 20 | 100 |
| `offset` | integer | Number of records to skip | 0 | — |

**Example:**

```bash
curl -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?limit=20&offset=40"
```

## Filtering

List endpoints support query parameters for filtering results:

| Parameter | Type | Description | Example |
|---|---|---|---|
| `status` | string | Filter by resource status | `delivered`, `failed`, `pending` |
| `event_id` | string | Filter by event | `evt_abc123` |
| `destination_id` | string | Filter by target/destination | `dest_abc123` |
| `source_id` | string | Filter by source endpoint | `src_abc123` |
| `level` | string | Filter by log level | `info`, `warn`, `error` |
| `since` | ISO-8601 | Start of time window | `2026-06-01T00:00:00Z` |
| `until` | ISO-8601 | End of time window | `2026-06-30T23:59:59Z` |

### Combining filters

Multiple filters can be combined with `&`:

```bash
curl -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/deliveries?status=failed&destination_id=dest_abc123&limit=5"
```

## Sorting

Sorting is not currently exposed as a public API parameter. Results are returned in reverse chronological order by default.

## Non-claims

- Pagination implementation may vary across endpoint groups
- Sorting by custom fields is not available
- Cursor format is opaque and may change between releases
- Filter parameters that are not recognized are silently ignored

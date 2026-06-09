---
sidebar_label: Rate Limits & Operational Limits
---

# Rate Limits and Operational Limits

## API Rate Limits

| Surface | Limit | Burst | Scope |
|---------|-------|-------|-------|
| Back API | 100 req/min | 200 | Per tenant |
| BFF API | 300 req/min | 500 | Per session |
| MCP API | 50 req/s | 100 | Per API key |
| Customer API | 100 req/min | 200 | Per tenant (planned) |

Rate-limited requests receive a `429 Too Many Requests` response with a `Retry-After` header.

## Payload Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Max webhook payload | 256 KB | Configurable per source |
| Max request body | 1 MB | API and BFF |
| Max header size | 16 KB | Per request |
| Max page size | 100 | List endpoint default: 20 |

## Delivery Operational Limits

| Parameter | Default | Configurable |
|-----------|---------|--------------|
| Retry attempts | 5 | Yes |
| Retry backoff | Exponential (1s → 60s) | Yes |
| DLQ retention | 7 days | Yes |
| Delivery timeout | 30s | Yes |
| Max fan-out destinations | 10 | Yes |

## Versioning

See [API Versioning and Compatibility](./versioning.md).

## Non-Claims

- These limits apply per deployment and tenant configuration
- Limits may be adjusted during maintenance windows
- No SLA or uptime guarantee is made for any rate limit threshold
- Production deployments may have different limits than sandbox/staging

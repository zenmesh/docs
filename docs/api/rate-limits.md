---
sidebar_label: Rate Limits & Operational Limits
---

# Rate Limits and Operational Limits

## Plans and Quotas

| Tier | Webhooks / Month | Max Payload | Max Endpoints | Max Destinations |
|------|-----------------|-------------|---------------|------------------|
| **Free Forever** | 25,000 | 256 KB | 3 | 3 |
| **Pro — Early Bird** | 500,000 | 1 MB | 50 | 25 |
| **Business (Coming Soon)** | Custom | Custom | Custom | Custom |
| **Enterprise (Contact Us)** | Custom | Custom | Custom | Custom |

Rate-limited requests receive a `429 Too Many Requests` response with a `Retry-After` header.

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

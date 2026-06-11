---
sidebar_label: Plans & Limits
description: Plan comparison, resource limits, and over-limit behavior for Zen Mesh.
---

# Plans, Limits, and Over-Limit Behavior

Zen Mesh offers transparent, plan-based limits. This page documents current plan tiers, their limits, and how the system behaves when you approach or exceed them.

## Plan Comparison

| Feature | Free | Pro | Business | Enterprise |
|---------|------|-----|----------|------------|
| **Endpoints** | 3 | 50 | Coming soon | Custom |
| **Sources** | 3 | 50 | Coming soon | Custom |
| **Targets** | 3 | 50 | Coming soon | Custom |
| **Routes** | 3 | 50 | Coming soon | Custom |
| **Events / month** | 1,000 | 100,000 | Coming soon | Custom |
| **Payload max** | 256 KB | 2 MB | Coming soon | Custom |
| **Requests / minute** | 60 | 600 | Coming soon | Custom |
| **Log retention** | 7 days | 30 days | Coming soon | Custom |
| **Evidence retention** | 30 days | 90 days | Coming soon | Custom |
| **DLQ retention** | 7 days | 14 days | Coming soon | Custom |
| **Team members** | 1 | 5 | Coming soon | Custom |
| **API keys** | 2 | 10 | Coming soon | Custom |
| **Custom labels / resource** | 5 | 20 | 50 | Custom |
| **Support** | Community | Email (target 48h) | Priority (planned) | Custom |

**Free** and **Pro** are live at launch. **Business** is coming soon. **Enterprise** is available by contacting us.

### Pricing

- **Free**: no credit card required.
- **Pro**: $29/month (early bird pricing). Annual billing available at $23/month (20% discount).
- **Business**: coming soon — no price published yet.
- **Enterprise**: contact us for custom arrangements.

### Launch validation

Hitting Free plan limits and verifying the upgrade path to Pro is part of launch validation. This ensures that limit enforcement and the upgrade flow work correctly for real customers.

## Over-Limit Behavior

Zen Mesh does not silently drop requests when limits are exceeded. All limit violations return structured errors with clear guidance.

### Resource count limits — HTTP 422

When you attempt to create a resource (endpoint, source, target, route, team member, API key) that would exceed your plan limit:

- **HTTP 422 Unprocessable Entity**
- Response body includes:
  - The limit that was exceeded
  - Your current usage
  - Your plan maximum
  - A link to upgrade guidance

Example response:

```json
{
  "error": {
    "code": "RESOURCE_LIMIT_EXCEEDED",
    "message": "Endpoint limit reached",
    "details": {
      "limit": "endpoints",
      "current": 3,
      "maximum": 3,
      "plan": "free",
      "upgrade_url": "https://zen-mesh.io/pricing"
    }
  }
}
```

### Event and rate limits — HTTP 429

When you exceed event volume, request rate, or replay limits:

- **HTTP 429 Too Many Requests**
- Includes `Retry-After` header indicating when you can retry
- Response body includes:
  - The limit that was exceeded
  - When the limit window resets
  - Your current usage in the window

Example response:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Event monthly limit reached",
    "details": {
      "limit": "events_monthly",
      "current": 1000,
      "maximum": 1000,
      "plan": "free",
      "resets_at": "2025-02-01T00:00:00Z",
      "upgrade_url": "https://zen-mesh.io/pricing"
    }
  }
}
```

### Payload size limits — HTTP 413

When a request payload exceeds your plan's maximum:

- **HTTP 413 Payload Too Large**
- Response body includes:
  - The payload size received
  - The maximum allowed for your plan

```json
{
  "error": {
    "code": "PAYLOAD_TOO_LARGE",
    "message": "Payload exceeds plan limit",
    "details": {
      "size_bytes": 524288,
      "maximum_bytes": 262144,
      "plan": "free",
      "upgrade_url": "https://zen-mesh.io/pricing"
    }
  }
}
```

### Retention expiry behavior

After the retention period for your plan expires:

- **Logs** are automatically and permanently purged after the retention period.
- **Evidence records** are automatically and permanently purged after the retention period.
- **DLQ entries** are automatically and permanently purged after the DLQ retention period.
- Expired data cannot be recovered.

### Upgrade path

All over-limit error responses include an `upgrade_url` pointing to the pricing page. Upgrading your plan immediately raises the relevant limits.

### Warning emails

Warning emails for approaching limits are planned but launch-dependent. Do not rely on email notifications until this feature is confirmed in the documentation.

## See also

- [Pricing](https://zen-mesh.io/pricing) — plan details and signup
- [Labels](/docs/guides/labels) — label limits per plan
- [API Errors](/docs/api/errors) — full error code reference

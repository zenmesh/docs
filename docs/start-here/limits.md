---
sidebar_label: Plans & Limits
description: Plan comparison, resource limits, over-limit behavior, billing, and package visibility for Zen Mesh.
---

# Plans, Limits, and Over-Limit Behavior

Zen Mesh offers transparent, plan-based limits. This page documents current plan tiers, their limits, pricing, over-limit behavior, and package visibility.

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
| **Support** | Community / Best effort | Preferential (target 48h) | Priority (planned) | Custom |

**Free** and **Pro** are live at launch. **Business** is coming soon. **Enterprise** is available by contacting us.

## Pricing

- **Free**: no credit card required.
- **Pro**: $29/month (early bird pricing). Annual billing available at $23/month (20% discount). Annual billing is shown at signup.
- **Business**: coming soon — no price published yet.
- **Enterprise**: contact us for custom arrangements.

## Design Partner Program

During the first 6 months after launch, Zen Mesh offers a Design Partner Program:

- **6 months of Pro free**
- Available during the first 6 months post-launch
- Requires annual payment commitment after the free period
- Monthly feedback via online survey
- Contact [support@zen-mesh.io](mailto:support@zen-mesh.io?subject=Design%20Partner%20Program) to apply

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

#### Free plan

When you exceed the Free plan monthly event limit:

- **HTTP 429 Too Many Requests**
- Hard stop — no overage, no continued delivery
- Response includes upgrade path to Pro
- No silent drops

#### Pro plan

When you approach or exceed the Pro plan monthly event limit:

- **Warnings before limit** — notifications as you approach the limit
- **Overage or upgrade path** — no hard stop without alternative. Pro customers receive an overage option or upgrade guidance
- No silent drops

All 429 responses include:

- `Retry-After` header indicating when you can retry
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
- Response body includes the payload size received and the maximum allowed for your plan

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

## Billing

### Failed payment

If a Pro subscription payment fails:

- Customer is notified and given **10 days** to update payment information
- After day 10, the account is downgraded to Free
- No data is deleted immediately on downgrade

### Pro data after downgrade

When a Pro account is downgraded to Free:

- Data is preserved for **30 days** after downgrade
- After 30 days, retention reverts to Free plan limits (7-day logs, 30-day evidence)
- Data exceeding Free limits is purged per the retention schedule

### Overrides

Plan limit overrides are approved by Leonardo at launch:

- **Default duration:** 30 days
- **Maximum duration:** 1 year
- **Audit evidence required** for every override
- No silent permanent overrides
- All overrides are tracked and auditable

## Package Visibility

Feature availability by plan:

| Feature | Free | Pro | Business | Enterprise |
|---------|------|-----|----------|------------|
| **MCP Draft System** | Visible (read-only) | Visible | Visible | Visible |
| **JSONPath transforms** | — | Yes | Yes | Yes |
| **JSONPath filters** | — | Yes | Yes | Yes |
| **Evidence export** | Yes | Yes | Yes | Yes |
| **Full evidence views** | Yes | Yes | Yes | Yes |
| **Fan-out** | Not available unless proven | Yes | Yes | Yes |
| **S3 fan-out target** | — | Desired for Pro | Yes | Yes |

### Launch providers

Initial launch targets for webhook sources:

- **Stripe** — webhook ingestion and delivery
- **GitHub** — webhook ingestion and delivery
- **Shopify** ⚡ — launch target, connector validation in progress
- **Twilio** ⚡ — launch target, connector validation in progress
- **Custom webhook** — generic webhook source

Shopify and Twilio are launch targets for the initial launch window. This documentation describes the target configuration — connector validation is in progress and availability may shift.

## See also

- [Pricing](https://zen-mesh.io/pricing) — plan details and signup
- [Labels](/docs/guides/labels) — label limits per plan
- [API Errors](/docs/api/errors) — full error code reference
- [Support](/docs/start-here/support) — support channels by plan

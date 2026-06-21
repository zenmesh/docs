---
sidebar_label: Plans and Limits
---

# Plans and Limits

## Free Forever

| Feature | Limit |
|---|---|
| Price | $0/month — forever. No credit card required. |
| Webhook endpoints | 3 |
| Webhooks per month | 25,000 |
| Max payload | 256 KB |
| Destinations | 3 |
| Routes/flows | 3 |
| Provider templates | Stripe, GitHub, Twilio, Shopify, Custom |
| Ingress | Shared static public ingress |
| Pool | Shared Pool |
| Deployment region | AWS regions as available |
| Event/log retention | 7 days |
| S3 log export | Not included |
| Seats | 1 (owner only) |
| Support | Community / best-effort |
| SLA | Not included |
| On-call | Not included |
| Dedicated public IP | Not included |

## Pro — Early Bird

| Feature | Limit |
|---|---|
| Price | $29/month early bird (reference standard: $49/month) |
| Promo | 6 months free with monthly product feedback survey |
| Webhook endpoints | 50 |
| Webhooks per month | 500,000 |
| Max payload | 1 MB |
| Destinations | 25 |
| Routes/flows | 50 |
| Provider templates | Stripe, GitHub, Twilio, Shopify, Custom |
| Ingress | Shared static public ingress |
| Pool | Shared Pool |
| Deployment region | AWS regions as available |
| Event/log retention | 30 days |
| S3 log export | Included (delivery logs only) |
| Seats | 1 (owner only) |
| Support | Email + Slack/Discord best-effort |
| SLA | Not included |
| On-call | Not included |
| Dedicated public IP | Not included |

## Business (Coming Soon)

| Feature | Status |
|---|---|
| Status | Coming soon — qualitative only |
| Limits | No public numeric limits |
| Adapters | Dedicated adapters planned |
| Isolation | Namespace, container, and network-policy isolation planned |
| Dedicated public IP | Planned as add-on |
| Multi-seat | Planned |
| S3 payload export | Planned |
| S3 Object Lock | Planned |
| SLA | Planned |
| On-call | Planned as option |
| DPA | Planned |

## Enterprise

Contact us for custom requirements including custom commercial terms, data residency, deployment planning, security/procurement review, custom S3 export and compliance workflows, and custom support.

## How Webhooks Are Counted

- A webhook is counted when Zen Mesh receives an inbound webhook request at an endpoint.
- Provider retries count as additional inbound webhooks.
- Zen Mesh internal delivery retries do not count as additional webhooks.
- Filtered or dropped requests may count against abuse and rate limits even if they are not delivered downstream.

## S3 Log Export

Pro S3 log export writes delivery log records to a customer-owned S3 bucket. It does not export raw webhook payloads. Customers manage bucket lifecycle rules, retention, replication, access policies, and deletion.

### What is included in Pro S3 log export

- Delivery log records: event ID, tenant ID, endpoint ID, source/provider, delivery status, attempt count, timestamp, HTTP status, error category, size in bytes
- A `payload_included: false` marker indicating that raw payload is omitted

### What is NOT included in Pro

- Raw webhook payload body
- Raw request/response body
- Authorization headers, provider signatures, cookies, tokens, API keys, OAuth codes
- Full webhook headers (unless explicitly allowlisted/redacted)
- S3 Object Lock / immutable retention
- Zen Mesh-managed retention

### Customer-owned bucket

Customers provide their own S3 bucket and credentials/keys. Zen Mesh writes log objects to the configured bucket. Customers are responsible for retention, lifecycle rules, access policies, replication, and deletion in their own bucket.

### Business+ (planned)

- Raw payload fan-out (planned)
- S3 Object Lock / immutable retention workflows (planned)
- Stronger compliance/retention workflows (planned)

Business+ is coming soon. Do not assume these features are live.

### Enterprise

Contact us for custom S3 export and compliance workflows.

## See Also

- [Current Status](../start-here/current-status) — plan readiness and evidence maturity
- [Rate Limits](../api/rate-limits) — API rate limits by plan
- [Pricing](https://www.zen-mesh.io/pricing) — pricing page on the website

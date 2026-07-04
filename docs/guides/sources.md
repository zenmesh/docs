---
sidebar_label: Sources (Legacy)
description: Supported webhook source types — Stripe, GitHub, Twilio, Shopify, and Custom HTTP sources. Configure ingestion, verification, and event processing for each source type.
---

# Sources (Legacy)

> **Status:** LEGACY TERMINOLOGY — This page uses legacy terminology. The current canonical term is **Endpoint** for the webhook entry-point configuration. See [Endpoints Guide](./endpoints) for the current guide and [Zen Mesh Concepts — Endpoint](../concepts/zen-mesh-concepts#endpoint) for the definition.
>
> This page remains available as a reference for supported provider types. For configuration workflows, use the [Endpoints](./endpoints) guide.

Zen Mesh can ingest webhook events from any HTTP source. Supported providers include pre-built integrations for Stripe, GitHub, Twilio, and Shopify, plus a custom source type for any other webhook sender.

## Supported Source Types

| Source Type | Description | Verification |
|-------------|-------------|-------------|
| **Stripe** | Stripe webhook events (charges, subscriptions, invoices, etc.) | `Stripe-Signature` header with signing secret — [Guide](./stripe) |
| **GitHub** | GitHub webhook events (push, pull_request, issues, etc.) | `X-Hub-Signature-256` header, HMAC-SHA256 — [Guide](./github) |
| **Twilio** | Twilio webhook events (SMS, voice, messaging, etc.) | `Twilio-Signature` header validation — [Guide](./twilio) |
| **Shopify** | Shopify webhook events (orders, products, customers, etc.) | `X-Shopify-Hmac-SHA256` header, HMAC-SHA256 — [Guide](./shopify) |
| **Custom** | Any HTTP webhook source | Configurable header validation, IP allowlisting, HMAC-SHA256 |

## Stripe Source

Stripe is a common webhook source for payment processing. See the [Stripe Integration Guide](./stripe) for detailed setup instructions including event types, webhook configuration, and signature verification.

## GitHub Source

GitHub sends events for repository activity including pushes, pull requests, issue comments, and workflow runs. See the [GitHub Integration Guide](./github) for detailed setup instructions including event types, webhook configuration, and signature verification.

## Twilio Source

Twilio sends webhook events for SMS, voice calls, and messaging services. See the [Twilio Integration Guide](./twilio) for detailed setup instructions including signature verification and webhook configuration.

## Shopify Source

Shopify sends webhook events for store activity including orders, products, customers, and fulfillment updates. See the [Shopify Integration Guide](./shopify) for detailed setup instructions including signature verification and webhook configuration.

## Custom HTTP Source

For any other webhook source that sends HTTP requests:

1. Create a Custom HTTP endpoint in Zen Mesh
2. Configure verification (header validation, IP allowlisting, HMAC-SHA256)
3. Point your source to the Zen Mesh ingestion URL
4. Apply [JSONPath Routing](../delivery/jsonpath-routing) for event filtering and [JSONPath Transforms](../delivery/jsonpath-transforms) for payload normalization

## Ingestion URLs

Each source gets a unique ingestion URL:

```
https://ingest.zen-mesh.io/hooks/<hook-id>
```

Configure your webhook provider to send events to this URL. Zen Mesh validates, routes, and delivers events to your configured destinations.

## Related

- [Stripe Integration Guide](./stripe) — detailed Stripe setup
- [GitHub Integration Guide](./github) — detailed GitHub setup
- [Twilio Integration Guide](./twilio) — detailed Twilio setup
- [Shopify Integration Guide](./shopify) — detailed Shopify setup
- [Endpoints Guide](./endpoints) — creating and managing endpoints
- [First Webhook Tutorial](../getting-started/first-webhook) — end-to-end walkthrough

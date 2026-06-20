---
sidebar_label: Sources
description: Supported webhook source types — Stripe, GitHub, Twilio, Shopify, and Custom HTTP sources. Configure ingestion, verification, and event processing for each source type.
---

# Sources

Zen Mesh can ingest webhook events from any HTTP source. Supported providers include pre-built integrations for Stripe, GitHub, Twilio, and Shopify, plus a custom source type for any other webhook sender.

## Supported Source Types

| Source Type | Description | Verification |
|-------------|-------------|-------------|
| **Stripe** | Stripe webhook events (charges, subscriptions, invoices, etc.) | `Stripe-Signature` header with signing secret |
| **GitHub** | GitHub webhook events (push, pull_request, issues, etc.) | `X-Hub-Signature-256` header, HMAC-SHA256 |
| **Twilio** | Twilio webhook events (SMS, voice, messaging, etc.) | `Twilio-Signature` header validation |
| **Shopify** | Shopify webhook events (orders, products, customers, etc.) | `X-Shopify-Hmac-SHA256` header, HMAC-SHA256 |
| **Custom** | Any HTTP webhook source | Configurable header validation, IP allowlisting, HMAC-SHA256 |

## Stripe Source

Stripe is a common webhook source for payment processing. See the [Stripe Integration Guide](./stripe) for detailed setup instructions including event types, webhook configuration, and signature verification.

## GitHub Source

GitHub sends events for repository activity including pushes, pull requests, issue comments, and workflow runs. To set up a GitHub source:

1. Create a Zen Mesh endpoint for the GitHub source
2. In your GitHub repository, go to **Settings → Webhooks**
3. Set the Payload URL to your Zen Mesh ingestion URL
4. Set Content type to `application/json`
5. Configure a secret for HMAC signature verification
6. Select the events you want to receive

## Twilio Source

Twilio sends webhook events for SMS, voice calls, and messaging services. To set up a Twilio source:

1. Create a Zen Mesh endpoint for the Twilio source
2. In your Twilio console, configure the webhook URL to your Zen Mesh ingestion URL
3. Zen Mesh validates requests using the `Twilio-Signature` header and your Twilio auth token
4. Configure the events you want to receive

## Shopify Source

Shopify sends webhook events for store activity including orders, products, customers, and fulfillment updates. To set up a Shopify source:

1. Create a Zen Mesh endpoint for the Shopify source
2. In your Shopify admin, go to **Settings → Notifications → Webhooks**
3. Set the webhook URL to your Zen Mesh ingestion URL
4. Configure a shared secret for HMAC-SHA256 signature verification
5. Select the events you want to receive

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
- [Endpoints Guide](./endpoints) — creating and managing endpoints
- [First Webhook Tutorial](../getting-started/first-webhook) — end-to-end walkthrough

---
sidebar_label: Sources
description: Supported webhook source types — Stripe, GitHub, Shopify, Twilio, and generic HTTP sources. Configure ingestion, verification, and event processing for each source type.
---

# Sources

Zen Mesh can ingest webhook events from any HTTP source. Supported providers include integration guides for Stripe, GitHub, Shopify (launch target), and Twilio (launch target), plus a generic source type for any other webhook sender.

## Supported Source Types

| Source Type | Description | Verification |
|-------------|-------------|-------------|
| **Stripe** | Stripe webhook events (charges, subscriptions, invoices, etc.) | Stripe-Signature header with signing secret |
| **GitHub** | GitHub webhook events (push, pull_request, issues, etc.) | HMAC-SHA256 signature with shared secret |
| **Shopify** ⚡ | Shopify webhook events (orders, products, customers, etc.) | HMAC-SHA256 signature with shared secret |
| **Twilio** ⚡ | Twilio webhook events (SMS, voice, status callbacks) | X-Twilio-Signature with Auth Token |
| **Generic HTTP** | Any HTTP webhook source | Configurable header validation, IP allowlisting, HMAC |

> ⚡ Launch target — connector validation in progress. Not yet live at launch.

## Stripe Source

Stripe is the most common webhook source for payment processing. See the [Stripe Integration Guide](./stripe) for detailed setup instructions including event types, webhook configuration, and signature verification.

## GitHub Source

GitHub sends events for repository activity including pushes, pull requests, issue comments, and workflow runs. To set up a GitHub source:

1. Create a Zen Mesh endpoint for the GitHub source
2. In your GitHub repository, go to **Settings → Webhooks**
3. Set the Payload URL to your Zen Mesh ingestion URL
4. Set Content type to `application/json`
5. Configure a secret for HMAC signature verification
6. Select the events you want to receive

## Shopify Source

Shopify sends events for store activity including orders, products, and customers. See the [Shopify Integration Guide](./shopify) for detailed setup instructions including event types, webhook configuration, and signature verification.

> Shopify is a launch target. Connector validation is in progress and the source type is not yet available at launch.

## Twilio Source

Twilio sends events for SMS, voice calls, and status callbacks. See the [Twilio Integration Guide](./twilio) for detailed setup instructions including event types, webhook configuration, and signature verification.

> Twilio is a launch target. Connector validation is in progress and the source type is not yet available at launch.

## Generic HTTP Source

For any other webhook source that sends HTTP requests:

1. Create a Generic HTTP endpoint in Zen Mesh
2. Configure verification (header validation, IP allowlisting, HMAC)
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
- [Shopify Integration Guide](./shopify) — detailed Shopify setup (launch target)
- [Twilio Integration Guide](./twilio) — detailed Twilio setup (launch target)
- [Endpoints Guide](./endpoints) — creating and managing endpoints
- [First Webhook Tutorial](../getting-started/first-webhook) — end-to-end walkthrough

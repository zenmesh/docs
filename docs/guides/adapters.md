---
sidebar_label: Adapters
---

# Adapters

Adapters connect Zen Mesh delivery targets to external services. When an event arrives at your cluster, an adapter transforms it into the format the target service expects.

## Supported Adapters

## Stripe

Receive and process Stripe webhook events.

- **Delivery**: POST to Stripe webhook endpoint
- **Format**: CloudEvents → Stripe event format
- **Features**: Signature verification, event-type filtering

## GitHub

Forward GitHub webhook events to delivery targets.

- **Delivery**: POST to GitHub webhook endpoint
- **Format**: CloudEvents → GitHub event format
- **Features**: Signature verification, event-type routing

## Twilio

Process Twilio webhook events (SMS, voice, status callbacks).

- **Delivery**: POST to Twilio webhook endpoint
- **Format**: CloudEvents → Twilio event format
- **Features**: Twilio signature validation, media handling

## Shopify

Receive and process Shopify webhook events.

- **Delivery**: POST to Shopify webhook endpoint
- **Format**: CloudEvents → Shopify event format
- **Features**: HMAC verification, topic-based routing

## Creating an Adapter

1. Navigate to **Adapters** in the dashboard
2. Click **Add Adapter**
3. Select the adapter type
4. Configure the connection (URL, auth token, etc.)
5. Map delivery targets to the adapter

## Adapter Configuration

All adapter secrets (API keys, tokens) are stored in [zen-lock](../zen-lock.md) with zero-knowledge encryption. They are never stored in plaintext.

## Custom Adapters

Zen Mesh supports custom adapters via a generic webhook adapter. Configure any HTTP endpoint as a target, and Zen Mesh will deliver CloudEvents payloads to it.

```yaml
# Example: Custom adapter via Helm values
adapter:
  type: webhook
  endpoint: https://your-service.internal/webhooks
  headers:
    Authorization: "Bearer ${SECRET_NAME}"
  secretRef:
    name: my-adapter-credentials
```

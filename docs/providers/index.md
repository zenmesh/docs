# Providers

Webhook sources supported by Zen Mesh.

## Supported at Launch

| Provider | Status | Documentation |
|----------|--------|---------------|
| [Stripe](stripe) | Supported at launch | Payment events |
| [GitHub](github) | Supported at launch | Repository events |
| [Custom](custom) | Supported at launch | Any HTTP webhook |

## Launch Targets (Not Proven)

| Provider | Status |
|----------|--------|
| [Shopify](shopify) | Target — not runtime-proven |
| [Twilio](twilio) | Target — not runtime-proven |

## Roadmap

- NATS integration
- MQ integration
- Slack integration

## Adding a Custom Provider

Custom providers accept any HTTP webhook. Configure the signing key and endpoint URL to start receiving events.

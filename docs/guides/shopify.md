---
sidebar_label: Shopify Integration
---

# Shopify Webhook Integration

Receive Shopify webhooks through Zen Mesh with signature verification.

## How Shopify Webhooks Work

Shopify sends webhook notifications to your configured endpoint when events occur in your store (order creation, product updates, etc.). Each request includes an `X-Shopify-Hmac-SHA256` header that Zen Mesh can validate.

## Setting Up a Shopify Webhook in Zen Mesh

1. **Create an endpoint** following the [Quick Start](../getting-started/quick-start)
2. Select **Shopify** as the source template
3. Copy the ingestion URL provided by Zen Mesh
4. In your Shopify admin: **Settings → Notifications → Webhook**
5. Create a webhook with the Zen Mesh ingestion URL

## Signature Verification

Zen Mesh verifies Shopify webhooks using the `X-Shopify-Hmac-SHA256` header:

- **Algorithm**: HMAC-SHA256
- **Header**: `X-Shopify-Hmac-SHA256`
- **Validation**: The body is hashed using HMAC-SHA256 with the shared secret, base64-encoded, and compared against the `X-Shopify-Hmac-SHA256` header value

To configure signature verification, provide your Shopify shared secret when setting up the source.

## Verification States

| State | Meaning |
|---|---|
| **valid** | Signature matches — request is authenticated |
| **missing** | No `X-Shopify-Hmac-SHA256` header present |
| **invalid** | Signature does not match — possible tampering |
| **disabled** | Signature verification is not configured for this source |

## External Validation

Signature verification is implemented and tested for Shopify when configured. Live external provider validation is separate from backend signature-verification tests. Verify end-to-end delivery using a test webhook from your Shopify admin.

## See Also

- [Header Validation](../security/header-validation) — signature verification overview
- [Endpoints Guide](../guides/endpoints) — endpoint configuration overview
- [Stripe Integration](../guides/stripe) — Stripe webhook setup
- [GitHub Integration](../guides/github) — GitHub webhook setup

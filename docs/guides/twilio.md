---
sidebar_label: Twilio Integration
---

# Twilio Webhook Integration

Receive Twilio webhooks through Zen Mesh with signature verification.

## How Twilio Webhooks Work

Twilio sends webhook requests to your configured endpoint for events like incoming calls, SMS messages, and status callbacks. Each request includes a `Twilio-Signature` header that Zen Mesh can validate.

## Setting Up a Twilio Webhook in Zen Mesh

1. **Create an endpoint** following the [Quick Start](../getting-started/quick-start)
2. Select **Twilio** as the source template
3. Copy the ingestion URL provided by Zen Mesh
4. Configure your Twilio phone number or service to send webhooks to this URL

## Signature Verification

Zen Mesh verifies Twilio webhooks using the `Twilio-Signature` header:

- **Algorithm**: HMAC-SHA1 over the full URL + sorted form parameters
- **Header**: `Twilio-Signature`
- **Validation**: The signature is computed over the request URL concatenated with the sorted POST body parameters, then compared against the `Twilio-Signature` header value

To configure signature verification, provide your Twilio Auth Token when setting up the source.

## Verification States

| State | Meaning |
|---|---|
| **valid** | Signature matches — request is authenticated |
| **missing** | No `Twilio-Signature` header present |
| **invalid** | Signature does not match — possible tampering |
| **disabled** | Signature verification is not configured for this source |

## External Validation

Signature verification is implemented and tested for Twilio when configured. Live external provider validation is separate from backend signature-verification tests. Verify end-to-end delivery using a test webhook from your Twilio console.

## See Also

- [Header Validation](../security/header-validation) — signature verification overview
- [Endpoints Guide](../guides/endpoints) — endpoint configuration overview
- [Stripe Integration](../guides/stripe) — Stripe webhook setup
- [GitHub Integration](../guides/github) — GitHub webhook setup

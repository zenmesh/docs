---
sidebar_label: Header Validation
description: Verify webhook event source authenticity through configurable header validation and signature verification.
---

# Webhook Header Validation

Verify the authenticity of incoming webhook events through configurable header validation and signature verification.

## What It Is

Header validation checks that incoming webhook requests contain the required headers and, where supported, verifies cryptographic signatures to confirm the event originated from the expected source.

## How It Works

Header validation operates on incoming webhook requests:

1. The request headers are inspected for required fields and accepted value patterns
2. Where signature verification is supported, the signature is validated against the expected secret
3. Requests with missing, invalid, or mismatched headers are rejected before delivery processing
4. Validation outcomes are recorded in delivery evidence for audit purposes

## Supported Providers

| Provider | Signature Header | Scheme |
|----------|-----------------|--------|
| **Stripe** | `Stripe-Signature` | Timestamped HMAC-SHA256 with signing secret |
| **GitHub** | `X-Hub-Signature-256` | HMAC-SHA256 with shared secret |
| **Twilio** | `Twilio-Signature` | Twilio-Signature validation using URL, params, and auth token |
| **Shopify** | `X-Shopify-Hmac-SHA256` | HMAC-SHA256 with shared secret |
| **Custom** | User-configured | HMAC-SHA256 with user-configured secret |

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Required headers** | Headers that must be present on incoming webhook requests |
| **Accepted values/patterns** | Expected values or patterns for validated headers |
| **Signature header** | Support for provider-specific signature headers |
| **Failure behavior** | What happens when header validation fails (reject, log, route to quarantine) |

## Operational Status

Signature verification is implemented and tested for Stripe, GitHub, Shopify, and Twilio when configured. Custom/generic HMAC/header validation is available where configured.

- **Stripe**: `Stripe-Signature` header verification — implemented and validated
- **GitHub**: `X-Hub-Signature-256` header verification — implemented and validated
- **Twilio**: `Twilio-Signature` header verification — implemented and validated
- **Shopify**: `X-Shopify-Hmac-SHA256` header verification — implemented and validated
- **Custom**: User-configured secret with HMAC-SHA256 — available

Live external provider validation is distinct from backend signature-verification tests.

## Example Scenario

An organization receives webhooks from Stripe, GitHub, Twilio, and Shopify. Header validation is configured for each provider's signature scheme. A forged webhook request without a valid signature is rejected — protecting downstream services from processing unverified events.

## Related Capabilities

- [Webhook IP Allowlisting](./ip-allowlisting)
- [Cryptographic Enrollment](./cryptographic-enrollment)

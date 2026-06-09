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
2. Where signature verification is supported (e.g., Stripe webhook signatures, GitHub HMAC-SHA256), the signature is validated against the expected secret
3. Requests with missing, invalid, or mismatched headers are rejected before delivery processing
4. Validation outcomes are recorded in delivery evidence for audit purposes

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Required headers** | Headers that must be present on incoming webhook requests |
| **Accepted values/patterns** | Expected values or patterns for validated headers |
| **Signature header** | Support for provider-specific signature headers (Stripe, GitHub, generic HMAC) |
| **Failure behavior** | What happens when header validation fails (reject, log, route to quarantine) |

## Operational Limits

- Webhook signature verification is implemented and validated for Stripe and GitHub
- Generic header filtering and validation is partially implemented
- Evidence references: AC-004 (PARTIAL), Stripe/GitHub signature verification (DONE)

## Example Scenario

An organization receives webhooks from both Stripe and GitHub. Header validation is configured to verify Stripe's `Stripe-Signature` header and GitHub's `X-Hub-Signature-256` header. A forged webhook request without a valid signature is rejected — protecting downstream services from processing unverified events.

## Related Capabilities

- [Webhook IP Allowlisting](./ip-allowlisting)
- [Cryptographic Enrollment](./cryptographic-enrollment)

## Evidence and Status

**Status as of 2026-06:** Signature verification for Stripe and GitHub providers is implemented and validated. Comprehensive generic header filtering and validation is under active development.

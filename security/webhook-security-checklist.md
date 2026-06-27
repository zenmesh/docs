# Webhook Security Checklist

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** ASSET

## Overview

Zen Mesh addresses the most common webhook security risks. Use this checklist to evaluate your current webhook setup and see where Zen helps.

## Ingestion Security

**Zen helps secure what enters your system.**

- ✅ **HTTPS/TLS:** All webhooks should arrive over HTTPS. Zen enforces HTTPS on managed endpoints.
- ✅ **Provider signature verification:** Many providers (Stripe, Shopify, GitHub, Twilio) sign webhooks. Zen verifies signatures where supported.
- ✅ **Raw body preservation:** Zen stores the raw webhook body for verification, replay, and audit.
- ✅ **Event schema validation:** Zen validates event structure and required fields before processing.
- ✅ **Ingestion rate limiting:** Zen enforces rate limits to prevent abuse from malicious providers.

**What to check:**
- Do you validate webhook signatures where supported?
- Can you replay failed webhooks without asking the provider again?
- Do you log raw webhook bodies for audit?

## Delivery Reliability

**Zen helps ensure webhooks arrive.**

- ✅ **Delivery confirmation:** Zen confirms webhook delivery to targets.
- ✅ **Idempotency:** Zen ensures events aren't processed multiple times.
- ✅ **Dead-letter queue:** Zen holds failed webhooks for retry or manual review.
- ✅ **Retries with backoff:** Zen automatically retries failed deliveries with exponential backoff.
- ✅ **Evidence and audit:** Zen records all delivery attempts, success, and failures.

**What to check:**
- Do you retry failed webhooks automatically?
- Can you replay failed webhooks from a dead-letter queue?
- Do you have an audit trail of webhook delivery?

## Transport Security

**Zen helps secure what leaves your system.**

- ✅ **HTTPS/mTLS on managed paths:** Zen enforces secure transport on all Zen-managed endpoints and targets.
- ✅ **Signed targets:** Zen validates target TLS certificates to prevent man-in-the-middle attacks.
- ✅ **Transport-layer security:** Zen uses TLS 1.2+ on all connections.

**What to check:**
- Are all Zen-managed delivery paths HTTPS-only?
- Do you validate TLS certificates for your webhook targets?

## Abuse Protection

**Zen helps prevent webhook abuse.**

- ✅ **IP allowlist/block:** Zen can allowlist/block specific IPs from sending webhooks (Pro+).
- ✅ **Endpoint rate limiting:** Zen enforces rate limits at the endpoint level (Free tier).
- ✅ **Provider signature verification:** Verifying provider signatures prevents spoofing.

**What to check:**
- Do you allowlist specific IPs from sending webhooks?
- Do you limit webhook rate at the endpoint level?

## Evidence and Audit

**Zen helps you prove what happened.**

- ✅ **Delivery evidence:** Zen records whether webhooks succeeded or failed.
- ✅ **Replay capability:** Zen lets you replay failed webhooks for testing or recovery.
- ✅ **Audit trail:** Zen maintains a complete history of webhook events.
- ✅ **Redacted logs:** Zen can redact sensitive data in logs for compliance.

**What to check:**
- Can you prove which webhooks succeeded and which failed?
- Do you have an audit trail of webhook delivery?

## Where Zen Makes the Difference

**What Zen adds compared to direct webhook handling:**

1. **Signature verification where supported:** Stripe, Shopify, GitHub, Twilio
2. **Automatic retries and backoff:** Reduces false negatives
3. **Replay from DLQ:** Recovery without provider intervention
4. **Idempotency:** Prevents duplicate processing
5. **Delivery evidence:** Proves delivery success/failure
6. **Audit trail:** Complete webhook history
7. **Transport security:** HTTPS/mTLS enforced
8. **Abuse protection:** Rate limits and IP allowlists

## Common Webhook Threats

**Zen helps defend against these threats:**

| Threat | Zen Protection |
|--------|----------------|
| **Signature spoofing** | Provider signature verification |
| **Silent webhook failures** | Retry logic, DLQ, replay |
| **Duplicate processing** | Idempotency keys |
| **Man-in-the-middle** | HTTPS/mTLS, cert validation |
| **Rate abuse** | Rate limiting, IP allowlists |
| **No audit trail** | Complete delivery evidence |

## Provider-Specific Notes

**Zen signature verification for common providers:**

- **Stripe:** Webhooks are signed with HMAC SHA-256. Zen verifies signatures.
- **Shopify:** Webhooks are signed. Zen verifies signatures.
- **GitHub:** Webhooks are signed. Zen verifies signatures.
- **Twilio:** Webhooks are signed. Zen verifies signatures.
- **Custom webhooks:** You can configure signature verification for custom providers.

**What Zen does NOT do:**

- Does NOT guarantee 100% delivery (network failures, provider outages)
- Does NOT prevent all webhook attacks (0-risk is impossible)
- Does NOT provide customer-controlled encryption keys (BYOK/V1.1 planned)

## Free vs Pro+ Security Features

**Zen security features by tier:**

| Feature | Free | Pro+ |
|---------|------|------|
| HTTPS/TLS on managed paths | ✅ | ✅ |
| Provider signature verification | ✅ | ✅ |
| Endpoint rate limiting | ✅ | ✅ |
| Delivery evidence and audit | ✅ | ✅ |
| Replay from DLQ | ✅ | ✅ |
| Idempotency | ✅ | ✅ |
| IP allowlist/block | ✗ | ✅ |
| Per-target rate policies | ✗ | ✅ |
| Provider-specific security alerts | ✗ | ✅ |

## Get Started

**Start securing your webhooks with Zen in 5 minutes:**

1. **Create a Zen account** (Free tier)
2. **Add your webhook provider** (Stripe, Shopify, GitHub, Twilio, etc.)
3. **Configure a Flow** to route webhooks to a target
4. **Review delivery evidence** in the dashboard
5. **Replay failed webhooks** from the DLQ

**See the [migration guide](./migration-from-direct-webhook-handling.md) for step-by-step instructions.**

## Related

- [Webhook Security Defense-in-Depth](./webhook-security-defense-in-depth.md)
- [Webhook Security Tiering](./webhook-security-tiering.md)
- [Zen V1 GTM and Expansion Decision](../strategy/zen-v1-gtm-and-expansion-decision-record.md)

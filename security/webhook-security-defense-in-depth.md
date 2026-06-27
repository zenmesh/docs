# Webhook Security Defense-in-Depth

Zen Mesh provides layered webhook security protections. What's available and what's tiered depends on your plan.

## Overview

Webhook delivery through Zen Mesh includes multiple security layers by default. This document explains what's supported today, what's Pro+, and what's planned for higher tiers.

## What Zen Supports Today

Zen verifies provider signatures where provider support exists, preserves raw bodies for verification, and enforces HTTPS on all managed paths. Zen's managed paths (webhook endpoint, relay, and log/evidence download) require TLS with mTLS available for strict environments.

**Strong baseline:**
- Signature verification for supported providers
- Raw-body preservation (configurable)
- HTTPS-required managed paths
- Default endpoint abuse/rate protections
- Redacted/basic logs (visible in dashboard)

## What Is Included by Default

**Free tier includes:**

* **Signature verification** - Where provider supports it (Shopify, Twilio, and other major providers have signatures; less mature providers may not)
* **Raw-body preservation** - Configurable per provider (raw body is available for webhook verification)
* **HTTPS-required managed paths** - All Zen-managed paths (webhook receiver, relay, logs, evidence) require TLS
* **Default endpoint abuse protection** - Basic endpoint-level rate limiting and flood protection
* **Redacted/basic logs** - Logs in dashboard are redacted (no full payload)
* **Basic dashboard visibility** - Can see inbound webhooks, delivery status, and error counts

## What Is Pro+

**Pro tier includes:**

* **IP allowlist/block** - Restrict which IPs can send webhooks (see Per-Provider Policies)
* **Configurable endpoint limits** - Set max deliveries per minute per endpoint
* **Provider/source-specific rate policies** - When validated, per-source/provider limits are available (currently under validation)
* **Webhook security alerts** - Anomaly detection and alerting (basic events only in Free)
* **Longer evidence/log retention** - If product supports it (configurable in Pro settings)

## What Is Business/Enterprise

**Business/Enterprise tiers include:**

* **Customer AGE keys (BYOK-lite)** - Plan to allow customer-provided encryption keys for logs and evidence downloads (currently planned/V1.1 candidate, not implemented)
* **Encrypted log/evidence downloads** - Long-term logs and evidence exports are encrypted with customer-provided keys
* **Advanced redaction rules** - Customizable data redaction policies (not available in Free/Pro)
* **SIEM/PagerDuty/Slack routing** - Security signals and alerts can be routed to external tools (requires higher-tier configuration)
* **Team/audit controls** - Granular access control and audit logging for security-sensitive workflows

**Enterprise-specific:**
* **KMS/custom key lifecycle** - For teams with complex key management needs
* **Dedicated infrastructure/IPs** - For strict compliance requirements
* **Custom trust roots/private CA** - For internal-only webhooks
* **Custom retention and compliance workflows** - Configurable data retention and compliance pipelines

## What Is Planned / Not Yet Implemented

**Free/Pro:**
- Per-source/provider rate limiting - Endpoint-level limits exist, but provider-specific source-level limits need proof/implementation
- Advanced redaction - Currently only basic redaction; advanced rules are planned

**Business/Enterprise:**
- Customer AGE keys/BYOK-lite - Planned for V1.1, not currently implemented
- Encrypted log/evidence downloads - Depends on customer keys; not yet live
- SIEM/PagerDuty/Slack routing - Planned feature

## Provider-Specific Notes

| Provider | Signature Supported | HTTPS/Transport | Notes |
|----------|---------------------|-----------------|-------|
| Shopify | Yes | Required | Signature verification available; raw body preserved |
| Twilio | Yes | Required | Signature verification available; raw body preserved |
| Other providers | Varies | Required | Check provider docs for signature availability |
| Less mature providers | May vary | Required | Signature support depends on provider implementation |

## Live Validation Status

**Shopify:** Signature verification is implemented and verified locally; prod-live validation pending final deployment.

**Twilio:** Signature verification is implemented and verified locally; prod-live validation pending final deployment.

**Other providers:** Validation status varies; check provider-specific documentation.

## Security-Hardening Gaps

**Free tier:**
- Basic redaction only (no advanced rules)
- Basic alerts only (no SIEM integration)

**Pro tier:**
- No provider-specific source rate limiting (endpoint only)
- Alerts are basic (no advanced anomaly detection)

**Business/Enterprise:**
- Customer AGE keys/BYOK-lite not yet implemented
- Encrypted log/evidence downloads not yet live

**All tiers:**
- Per-source/provider rate limiting needs proof and implementation
- Advanced security signals and logging need hardening

## Conclusion

Zen provides strong baseline webhook security for Free tier and Pro tier adds meaningful conversion security features like IP allowlist/block and configurable limits. Customer controls and BYOK are planned for higher tiers but not yet implemented. No unsupported public claims are made—security posture is layered and tiered appropriately.

**Do not claim:**
- "All webhook attacks prevented"
- "Fully secure"
- "BYOK complete"
- "Per-provider secrets supported"

**Do claim:**
- "Signature verification where configured"
- "HTTPS-required managed paths"
- "Endpoint-level abuse protection"
- "Pro+ IP allowlist/block"
- "Customer AGE/BYOK is planned/V1.1"

See also: [Tiering](./webhook-security-tiering.md)

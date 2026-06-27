# Webhook Security Tiering

Zen Mesh webhook security features are divided by tier to balance security with conversion. Free tier provides safe defaults; Pro+ adds meaningful conversion security; Business/Enterprise adds customer controls and advanced capabilities.

## Free Tier

**Core security posture:**

* **Safe defaults** - Zen enforces HTTPS on all managed paths by default
* **Signature verification** - Where provider support exists (Shopify, Twilio)
* **Raw-body preservation** - Available for verification
* **HTTPS-required managed paths** - Webhook receiver, relay, logs, evidence all require TLS
* **Default endpoint abuse protection** - Basic rate limiting and flood protection
* **Redacted/basic logs** - Logs visible in dashboard are redacted (no full payloads)
* **Basic dashboard visibility** - See inbound webhooks, delivery status, error counts

**What's NOT in Free:**
- IP allowlist/block
- Per-source/provider rate limiting
- Advanced redaction rules
- SIEM/PagerDuty/Slack routing
- Customer AGE keys
- Encrypted log/evidence downloads
- Team/audit controls

## Pro Tier

**Additional security posture:**

* **All Free tier features** - Baseline security is the same
* **IP allowlist/block** - Restrict which IPs can send webhooks (conversion security)
* **Configurable endpoint limits** - Set max deliveries per minute per endpoint
* **Provider/source-specific rate policies** - When validated, per-source/provider limits are available
* **Webhook security alerts** - Anomaly detection and alerting (basic events)
* **Longer evidence/log retention** - If product supports it

**What's NOT in Pro:**
- Customer AGE keys (BYOK-lite)
- Encrypted log/evidence downloads
- Advanced redaction rules
- SIEM/PagerDuty/Slack routing
- Team/audit controls

## Business Tier

**Additional security posture:**

* **All Pro tier features** - Pro security posture with Pro controls
* **Customer AGE keys (BYOK-lite)** - Plan to allow customer-provided encryption keys for logs and evidence downloads (planned, not yet implemented)
* **Encrypted log/evidence downloads** - Long-term logs and evidence exports are encrypted with customer-provided keys
* **Advanced redaction rules** - Customizable data redaction policies
* **SIEM/PagerDuty/Slack routing** - Security signals and alerts can be routed to external tools
* **Team/audit controls** - Granular access control and audit logging

**What's NOT in Business:**
- KMS/custom key lifecycle
- Dedicated infrastructure/IPs
- Custom trust roots/private CA
- Custom retention and compliance workflows

## Enterprise Tier

**Advanced security posture:**

* **All Business tier features** - Business controls with enterprise-grade capabilities
* **KMS/custom key lifecycle** - For teams with complex key management needs
* **Dedicated infrastructure/IPs** - For strict compliance requirements
* **Custom trust roots/private CA** - For internal-only webhooks
* **Custom retention and compliance workflows** - Configurable data retention and compliance pipelines

**What's planned:**
- Customer AGE keys (BYOK-lite) - Planned as a Business+ or Enterprise feature
- Advanced team/audit controls - Continuously evolving

## Conversion-Focused Security Features

| Feature | Free | Pro | Business | Enterprise |
|---------|------|-----|----------|------------|
| Signature verification | ✓ | ✓ | ✓ | ✓ |
| HTTPS-required managed paths | ✓ | ✓ | ✓ | ✓ |
| Raw-body preservation | ✓ | ✓ | ✓ | ✓ |
| Default endpoint abuse protection | ✓ | ✓ | ✓ | ✓ |
| Basic redaction | ✓ | ✓ | ✓ | ✓ |
| IP allowlist/block | ✗ | ✓ | ✓ | ✓ |
| Configurable endpoint limits | ✗ | ✓ | ✓ | ✓ |
| Per-source/provider rate limiting | ✗ | ✗ | ✗ | ✗ (needs proof) |
| Webhook security alerts | ✗ | ✓ | ✓ | ✓ |
| Longer evidence/log retention | ✗ | ✓ (if supported) | ✓ (if supported) | ✓ (if supported) |
| Customer AGE keys (BYOK-lite) | ✗ | ✗ | Planned | Planned |
| Encrypted log/evidence downloads | ✗ | ✗ | Planned | Planned |
| Advanced redaction rules | ✗ | ✗ | ✓ | ✓ |
| SIEM/PagerDuty/Slack routing | ✗ | ✗ | ✓ | ✓ |
| Team/audit controls | ✗ | ✗ | ✓ | ✓ |
| KMS/custom key lifecycle | ✗ | ✗ | ✗ | ✓ |
| Dedicated infrastructure/IPs | ✗ | ✗ | ✗ | ✓ |
| Custom trust roots/private CA | ✗ | ✗ | ✗ | ✓ |
| Custom retention workflows | ✗ | ✗ | ✗ | ✓ |

## Planning Notes

**Free:** Strong baseline security; focused on safe defaults and low barrier to entry.

**Pro:** Adds IP allowlist/block and configurable limits—primary conversion security features for teams that want inbound control.

**Business:** Adds customer controls (BYOK-lite, encryption, advanced redaction, SIEM routing). These are higher-tier features with meaningful differentiation.

**Enterprise:** Adds enterprise-specific controls (KMS, dedicated infrastructure, custom trust roots, compliance workflows).

**Note:** Per-source/provider rate limiting is claimed to exist but needs proof/public evidence. Customer AGE keys/BYOK-lite are planned/V1.1 candidate, not implemented.

## See Also

- [Webhook Security Defense-in-Depth](./webhook-security-defense-in-depth.md)
- [Trust Lab](../../trust-lab/)
- [Provider Template Packs](../../providers/)

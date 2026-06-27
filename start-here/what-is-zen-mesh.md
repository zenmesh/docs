---
sidebar_label: What is Zen Mesh?
---

# What is Zen Mesh?

Zen Mesh is security-first webhook delivery for teams that cannot afford silent webhook failure, spoofing, or audit gaps.

## V1 Wedge

**Zen V1 focuses on:**

- ✅ **Provider signature verification** where supported (Stripe, Shopify, GitHub, Twilio)
- ✅ **Reliable webhook delivery** with retries, DLQ, and replay
- ✅ **Complete audit trails** and delivery evidence
- ✅ **HTTPS/mTLS on Zen-managed paths**

**Zen V1 is security-first webhook delivery to one target per flow, with verification, evidence, and replay built-in.**

## Who should use it?

- **Engineering teams** that manage multiple webhook integrations and struggle with silent failures
- **DevOps teams** that need reliable webhook delivery and automatic retries
- **Security teams** that require signature verification, audit trails, and evidence
- **Compliance-focused teams** that need to prove webhook delivery success/failure
- **Teams that don't want to manually retry failed webhooks**

## How Zen Works

**Simple, security-first webhook delivery:**

```
Provider (Stripe, Shopify, GitHub, Twilio)
  → Zen Webhook Receiver
    → Signature Verification
      → Zen-managed Flow
        → Target Endpoint
          → Delivery Confirmation
```

**Key steps:**

1. **Ingestion:** Zen receives webhooks from providers
2. **Verification:** Zen verifies provider signatures where supported
3. **Routing:** Zen routes webhooks to your target endpoint
4. **Delivery:** Zen confirms successful delivery
5. **Evidence:** Zen records delivery status for audit

## Security-First Approach

**Zen prioritizes security:**

- ✅ **HTTPS/TLS on all paths:** Zen enforces HTTPS/mTLS on managed endpoints
- ✅ **Provider signature verification:** Verifies signatures where supported
- ✅ **No raw secret leakage:** Zen does not expose or train on your secrets
- ✅ **Customer controls data:** Zen does not own or control your data
- ✅ **Audit trail:** Complete evidence of webhook delivery

**What Zen does NOT claim:**

- ❌ Zero risk or "prevents all attacks"
- ❌ "Fully secure" or "unbreakable"
- ❌ "BYOK complete" or "customer keys complete"
- ❌ "Per-provider secrets fully supported"
- ❌ "All providers live-validated"

## V1 Security Features

**Zen security features available in V1:**

| Feature | Status |
|---------|--------|
| HTTPS/TLS on managed paths | ✅ Implemented |
| Provider signature verification | ✅ Implemented (Stripe, Shopify, GitHub, Twilio) |
| Endpoint rate limiting | ✅ Implemented |
| Delivery evidence and audit | ✅ Implemented |
| Replay from DLQ | ✅ Implemented |
| Idempotency | ✅ Implemented |

**Security features coming in Pro+ (post-V1):**

- ✗ IP allowlist/block
- ✗ Per-target rate policies
- ✗ Provider-specific security alerts

**See [webhook security checklist](../security/webhook-security-checklist.md) for a detailed security evaluation.**

## Quick Links

| If you want to... | Start here |
|---|---|
| Deploy in your cluster | [Quick Start](../getting-started/quick-start) |
| Review delivery reliability | [Webhook Reliability](../delivery/) |
| Review security controls | [Security Checklist](../security/webhook-security-checklist.md) |
| Understand security defense-in-depth | [Security Defense-in-Depth](../security/webhook-security-defense-in-depth.md) |
| Review security tiering | [Security Tiering](../security/webhook-security-tiering.md) |
| Review non-claims | [Non-Claims](../ai/non-claims) |
| Validate locally | [Verification](../ai/verification) |
| See webhook FAQs | [Webhook FAQ](../reference/webhook-faq) |
| Get started with Stripe | [Stripe Integration](../guides/stripe) |
| Get started with Shopify | [Shopify Integration](../guides/shopify) |
| Get started with GitHub | [GitHub Integration](../guides/github) |
| Get started with Twilio | [Twilio Integration](../guides/twilio) |

## Security Checklist

**Evaluate your current webhook setup:**

- [ ] Do you verify provider signatures where supported?
- [ ] Can you replay failed webhooks without contacting the provider?
- [ ] Do you have an audit trail of webhook delivery?
- [ ] Do you retry failed webhooks automatically?
- [ ] Do you prevent duplicate event processing?
- [ ] Are all webhook endpoints HTTPS-only?

**Use our [webhook security checklist](../security/webhook-security-checklist.md) to see where Zen helps.**

## Related

- [Webhook Security Checklist](../security/webhook-security-checklist.md)
- [Webhook Security Defense-in-Depth](../security/webhook-security-defense-in-depth.md)
- [Webhook Security Tiering](../security/webhook-security-tiering.md)
- [V1 GTM and Expansion Decision](../strategy/zen-v1-gtm-and-expansion-decision-record.md)

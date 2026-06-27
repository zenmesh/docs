# Zen V1 GTM and Expansion Decision Record

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** APPROVED

## Decision Summary

Zen has enough architecture for a narrow V1 wedge. The immediate risk is GTM: can buyers understand the pain, trust the solution, and pay?

### Main Current Bottleneck

**GTM, not architecture.**

Zen has sufficient infrastructure to secure webhook ingestion, verification, and delivery. The critical gap is customer-facing clarity and trust-building. If buyers cannot see and understand the security value proposition, they will not convert even if the technical implementation is sound.

### V1 Wedge

**Security-first webhook delivery for teams that cannot afford silent webhook failure, spoofing, or audit gaps.**

V1 must focus on a single, concrete problem that customers can immediately recognize and evaluate:

* **Ingestion security:** Provider signature verification where supported (Shopify, Twilio, etc.)
* **Delivery reliability:** Idempotency, DLQ, replay, and retry semantics
* **Evidence and audit:** Delivery history, JSON evidence, replay capabilities
* **Transport security:** HTTPS and mTLS on Zen-managed paths
* **Basic protection:** IP allowlist/block (Pro+), endpoint-level rate limiting

### V1 Public Promise

**What V1 commits to deliver and communicate:**

- Provider-verified webhook ingestion (where provider support exists)
- Secure delivery to one Target per Flow
- Evidence, replay, DLQ, idempotency
- HTTPS/mTLS posture on all managed paths
- IP allowlist/block as Pro+ feature
- Safe logs and security signals baseline
- Provider Template Packs for common providers

**What V1 does NOT promise:**

- Multi-Target fan-out (Pro+)
- AI Transform (Business+)
- Slack approval workflows (Business+)
- Encrypted logs/evidence downloads (Business+)
- Customer AGE keys/BYOK (V1.1 / Business+ planned)
- Per-provider/environment customer secrets (not implemented)
- Cross-tenant fan-out or delegation
- Zero-risk, all-attacks-prevented posture

### Expansion Ladder

**How V1 expands to Pro+, Business+, and Enterprise:**

#### Free Tier
- Single Target per Flow
- Provider signature verification where configured
- Endpoint-level rate limiting and abuse protection
- Basic dashboard visibility
- Safe (redacted) logs

#### Pro+ Tier
- Multiple Targets per Flow (conditional fan-out)
- IP allowlist/block
- Configurable endpoint limits
- Provider/source-specific rate policies (when validated)
- Webhook security alerts
- Longer evidence/log retention (if supported)

#### Business+ Tier
- All Pro features
- AI Transform (proposes, humans approve, rules captured)
- Slack approval (approve once, reject, edit, hold, save as rule, apply)
- Encrypted log/evidence downloads
- Advanced redaction rules
- SIEM/PagerDuty/Slack routing
- Team/audit controls

#### Enterprise Tier
- All Business features
- KMS/customer key lifecycle
- Dedicated infrastructure/IPs
- Custom trust roots/private CA
- Custom retention and compliance workflows

### Architecture Parking Lot

**Post-V1 ideas that should not enter V1 scope:**

1. **Fan-out/branch templates** - YAML-driven branch logic, not hardcoded Go
2. **AI Transform with Slack approval** - Human-in-the-loop AI workflows
3. **Customer AGE keys / BYOK** - Customer-controlled encryption keys
4. **Per-provider/customer secrets** - Provider-specific runtime secrets
5. **Cross-tenant delegation** - Scoped delegation model
6. **Advanced egress controls** - Agent/MCP network control (Business+/Enterprise)
7. **SIEM integration defaults** - Out-of-box integrations

### What Must Not Enter V1 Scope

**Architecture that should remain for future expansions:**

1. **Flow model** - Must support future branch/sub-delivery IDs
2. **Evidence model** - Must support future per-target keys and partial success
3. **Policy framework** - Policy should attach to future branch/Target, not only global Flow
4. **Logs** - Must distinguish source event from target delivery

**Any architectural change that does not directly enable V1 buyer conversion should be deferred.**

### What Must Not Be Publicly Claimed Yet

**Claims that would overpromise and damage trust:**

1. "Multiple Targets" or "fan-out" as V1 features
2. "AI Transform" or "Slack approval" as available capabilities
3. "Customer AGE keys" or "BYOK" as implemented
4. "Per-provider secrets" or "BYOK" as supported
5. "Zen prevents all webhook attacks" or "fully secure"
6. "Zero risk" or "guaranteed delivery"
7. "All providers live-validated"
8. "Cross-tenant fan-out" or "scoped delegation"
9. "Agent egress enforced by Zen" (bypass must be closed by customer infrastructure)

### Next GTM Assets Needed

**Must-have assets for V1 launch:**

1. **Homepage hero** - Clear value proposition
2. **Webhook security checklist page** - Position against attack surface
3. **Stripe landing page** - First primary use case
4. **Shopify landing page** - Second primary use case
5. **GitHub landing page** - Third primary use case
6. **Twilio landing page** - Fourth primary use case
7. **Demo video/GIF** - Visual proof of concept
8. **Pricing/tier page** - Clear Free/Pro/Business/Enterprise differentiation
9. **Design partner pitch** - For strategic adoption
10. **Migration guide** - "Replacing a webhook handler with Zen"
11. **Public evidence/trust page** - Evidence-linked trust markers
12. **Docs freshness/live deployment validator** - Proof of current status

## Rule

**If it does not help get the first 10 serious users, it is post-V1 unless it is required to make the V1 buyer promise true.**

This rule ensures we maintain a narrow, GTM-focused scope for V1. Any architectural or product feature that does not directly contribute to V1 buyer conversion must wait for post-V1 expansion phases.

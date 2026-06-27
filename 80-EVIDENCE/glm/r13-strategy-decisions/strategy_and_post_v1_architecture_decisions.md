# Strategy and Post-V1 Architecture Decisions

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** APPROVED

## Overview

This document records strategic decisions for Zen V1 GTM and post-V1 architecture expansion. These decisions establish a durable framework for product, tiering, and architectural planning without overpromising.

## Decisions Documented

### 1. V1 GTM-First Discipline

**Decision:** Main bottleneck is GTM, not architecture. V1 must focus on a narrow wedge that solves a concrete problem.

**Details:**
- V1 wedge: Security-first webhook delivery for teams that cannot afford silent webhook failure, spoofing, or audit gaps
- V1 public promise: Provider signature verification (where supported), secure delivery to one Target per Flow, evidence and replay, HTTPS/mTLS, IP allowlist/block (Pro+), safe logs and security signals baseline, Provider Template Packs
- Expansion ladder: Free (single Target, safe defaults) → Pro+ (multiple Targets, IP allowlist/block, alerts) → Business+ (AI Transform, Slack approval, encrypted evidence) → Enterprise (KMS, private infrastructure, custom workflows)
- Rule: If it does not help get the first 10 serious users, it is post-V1 unless it is required to make the V1 buyer promise true

### 2. Post-V1 Fan-Out Architecture

**Decision:** Multiple Targets/fan-out is Pro+ and post-V1. Fan-out must be branch/template driven, not hardcoded Go business logic.

**Details:**
- V1: One active Target per Flow
- Pro+: Conditional fan-out with YAML templates
- Business+: Advanced branching, per-branch policies, approval workflows
- Enterprise: Cross-tenant delegation (future scoped delegation model)
- V1 compatibility contract: Flow model branch-compatible, evidence model supports future branch/sub-delivery IDs, idempotency supports per-target keys, DLQ supports partial success, logs distinguish source event from target delivery

### 3. AI Transform and Slack Approval

**Decision:** AI Transform is Business+/post-V1. AI proposes, humans approve, Zen records evidence, repeated approvals can become deterministic YAML rules.

**Details:**
- Core principle: AI discovers patterns; humans approve intent; YAML captures policy; Go enforces deterministically
- Slack approval is first likely approval channel
- Buttons: Approve once, reject, edit and approve, hold/quarantine, save as rule draft, apply as permanent rule
- Permanent rule creation requires scope, audit, rollback, validation
- AI output must be structured JSON and schema-validated
- AI must not be the sole enforcement boundary (deterministic gates wrap AI before and after)
- Security: No raw secret leakage in evidence, no training on customer payloads by default
- Tiering: Free (no AI), Pro (deterministic fan-out only), Business+ (AI Transform + Slack approval), Enterprise (private models, KMS, custom workflows)

### 4. Customer Secrets and AGE Keys

**Decision:** Admin/deployment secrets are separate from customer/provider secrets. Customer/provider secrets are not implemented or proven. Customer-specific AGE keys are a desired Business+/V1.1 direction.

**Details:**
- Admin/deployment secrets: Vercel deployment token, Kubernetes credentials, CI/CD deployment secrets (Zen-managed, do NOT count as customer secret support)
- Customer/provider secrets: Provider API keys, environment-specific secrets, customer-controlled sensitive material (NOT implemented in V1)
- Vercel token: Deployment credential for hosting, not customer-facing, not webhook handling, does not equal "customer secret support"
- Customer AGE keys: Enable encrypted logs/evidence downloads, BYOK-lite, rotation/revocation boundary, customer retains full control
- Tiering: Free (Zen-managed only), Pro+ (Zen-managed, no AGE yet), Business+ (customer AGE keys/BYOK-lite), Enterprise (KMS/customer key lifecycle)

### 5. Webhook vs Egress Boundaries

**Decision:** Zen secures traffic that is routed through Zen. Direct network bypass must be closed by customer infrastructure or future Zen egress controls for Zen to act as the enforcement boundary.

**Details:**
- Zen enforces: HTTPS/TLS/mTLS, signature verification, rate limiting, idempotency, replay/DLQ, evidence collection, policy compliance for Zen-managed Endpoints/Flows/Targets
- Customer controls: Network routing, destination validation, transform logic, provider API calls, bypass configuration
- If bypass is configured: Zen is NOT the enforcement boundary for bypassed traffic
- Future egress controls: Business+/Enterprise feature (outbound network policing, agent/MCP control, cross-tenant delegation)
- Correct framing: Webhook control (Zen) vs egress control (Customer + future Zen)

### 6. GTM Asset Checklist

**Decision:** V1 requires a clear GTM asset map with P0/P1/P2 priorities.

**Details:**
- P0 (Immediate): Homepage hero, webhook security checklist page, demo video/GIF, pricing/tier page, migration guide
- P1 (High): Stripe landing page, Shopify landing page, design partner pitch
- P2 (Medium): GitHub landing page, Twilio landing page
- P3 (Low): Testimonials, case studies, webinars
- Each asset has status, owner, priority, description, target audience, approval gates

## V1 Scope

**Confirmed V1 scope:**

- Single Target per Flow
- Provider signature verification (where supported)
- HTTPS/mTLS on Zen-managed paths
- Endpoint-level rate limiting
- Evidence and replay
- DLQ/idempotency
- Safe logs (redacted)
- Security signals baseline
- Provider Template Packs

**Confirmed NOT in V1:**

- Multiple Targets/fan-out
- AI Transform
- Slack approval
- Encrypted logs/evidence downloads
- Customer AGE keys/BYOK
- Per-provider/customer secrets
- Egress control (outbound policing)
- Agent/MCP control
- Cross-tenant delegation

## Post-V1 Scope

**Post-V1 items (planned but not implemented):**

1. **Fan-out:**
   - Pro+: Conditional fan-out with YAML templates
   - Business+: Advanced branching, per-branch policies, approval workflows
   - Enterprise: Cross-tenant delegation (future scoped delegation model)

2. **AI Transform:**
   - Business+: AI proposes, humans approve, rules captured
   - Enterprise: Private models, KMS, custom workflows

3. **Customer secrets:**
   - Business+: Customer AGE keys/BYOK-lite
   - Enterprise: KMS/customer key lifecycle

4. **Egress control:**
   - Business+: Outbound network policing
   - Enterprise: Agent/MCP control, advanced egress governance

5. **Advanced security features:**
   - SIEM integration (Business+)
   - Advanced redaction rules (Business+)
   - Team/audit controls (Business+)
   - Custom compliance workflows (Enterprise)

## Pro+/Business+/Enterprise Features

**Pro+ features (conversion-focused):**

- Multiple Targets per Flow
- IP allowlist/block
- Configurable endpoint limits
- Provider/source-specific rate policies (when validated)
- Webhook security alerts
- Longer evidence/log retention (if supported)

**Business+ features:**

- All Pro features
- AI Transform with Slack approval
- Encrypted log/evidence downloads
- Advanced redaction rules
- SIEM/PagerDuty/Slack routing
- Team/audit controls

**Enterprise features:**

- All Business features
- KMS/customer key lifecycle
- Dedicated infrastructure/IPs
- Custom trust roots/private CA
- Custom retention and compliance workflows

## Forbidden Claims

**What must NOT be publicly claimed:**

- "Multiple Targets" or "fan-out" as V1 features
- "AI Transform" or "Slack approval" as available
- "Customer AGE keys" or "BYOK" as implemented
- "Per-provider secrets" or "BYOK" as supported
- "Zen prevents all webhook attacks" or "fully secure"
- "Zero risk" or "guaranteed"
- "All providers live-validated"
- "Cross-tenant fan-out" or "scoped delegation"
- "Agent egress enforced by Zen" (bypass must be closed by customer infrastructure)

## GTM Assets Needed

**Required assets for V1 launch:**

1. Homepage hero
2. Webhook security checklist page
3. Stripe landing page
4. Shopify landing page
5. GitHub landing page
6. Twilio landing page
7. Demo video/GIF
8. Pricing/tier page
9. Design partner pitch
10. Migration guide: replacing a webhook handler
11. Public evidence/trust page
12. Docs freshness/live deployment validator

## Architecture Parking Lot

**Post-V1 ideas that should not enter V1:**

1. Fan-out/branch templates (designed but not implemented)
2. AI Transform with Slack approval (designed but not implemented)
3. Customer AGE keys/BYOK (designed but not implemented)
4. Per-provider/customer secrets (not implemented)
5. Cross-tenant delegation (scoped model needed)
6. Advanced egress controls (Business+/Enterprise)
7. SIEM integration defaults (Business+)
8. Agent/MCP control (Business+/Enterprise)

## Runtime Followups

**For Hermes/AI agents to verify:**

1. Verify no V1 feature claims in public documentation
2. Verify admin secrets are separated from customer secrets in docs
3. Verify fan-out, AI Transform, customer secrets, AGE keys are correctly marked as post-V1
4. Verify webhook-vs-egress boundary is clearly documented
5. Verify GTM asset checklist is up to date
6. Verify claim safety scan passes on all public docs

## Claim Safety Status

**Status:** PASSED

**All new documents:**

- ✅ Evidence-backed claims
- ✅ Correctly positioned as V1 vs post-V1
- ✅ Marked as planned/future when appropriate
- ✅ No competitor references
- ✅ No unsupported compliance claims
- ✅ No dangerous overclaims

**No security or compliance overclaims found in scan.**

## Related Documents

- [Zen V1 GTM and Expansion Decision](../strategy/zen-v1-gtm-and-expansion-decision-record.md)
- [Fan-Out and Branch Templates Architecture](../architecture/post-v1-fanout-and-branch-templates.md)
- [AI Transform and Slack Approval](../architecture/post-v1-ai-transform-and-approval.md)
- [Customer Secrets and AGE Keys](../architecture/post-v1-customer-secrets-and-age-keys.md)
- [Webhook vs Egress Boundaries](../security/webhook-vs-egress-boundaries.md)
- [V1 GTM Asset Checklist](../strategy/v1-gtm-asset-checklist.md)

# V1 GTM Asset Checklist

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** ASSET MAP

## Overview

This checklist maps the GTM assets required for V1 launch. Each asset is classified by status, owner, and priority. This is a planning tool, not a task tracker.

## Homepage Hero

**Status:** Missing
**Owner:** Design/Content
**Priority:** P0 (Immediate)
**Description:** Clear, concise value proposition on homepage

**Required elements:**
- Tagline: "Security-first webhook delivery"
- Subheadline: "Verify provider signatures, ensure reliable delivery, and maintain audit trails"
- CTA: "Start free" or "Request demo"

**Target audience:**
- DevOps engineers
- Engineering managers
- CTOs/CIOs

## Webhook Security Checklist Page

**Status:** Missing
**Owner:** Product/Docs
**Priority:** P0 (Immediate)
**Description:** Attack surface checklist page that positions Zen against common webhook threats

**Required elements:**
- Attack surface checklist (e.g., signature verification, HTTPS, mTLS, audit trails)
- "Zen addresses these threats" vs "You need this security" positioning
- Provider-specific security notes (Shopify, Stripe, Twilio, etc.)

**Target audience:**
- Security-conscious engineering teams
- Compliance-focused teams

## Stripe Landing Page

**Status:** Missing
**Owner:** Product (Stripe team)
**Priority:** P1 (High)
**Description:** Dedicated landing page for Stripe webhook use case

**Required elements:**
- Problem: Silent Stripe webhook failures, spoofing risks
- Solution: Zen signature verification, delivery evidence, replay
- Social proof: Case studies, testimonials
- CTA: "Integrate with Stripe in 5 minutes"

**Target audience:**
- Stripe developers
- FinTech teams

## Shopify Landing Page

**Status:** Missing
**Owner:** Product (Shopify team)
**Priority:** P1 (High)
**Description:** Dedicated landing page for Shopify webhook use case

**Required elements:**
- Problem: Silent Shopify webhook failures, cache invalidation risks
- Solution: Zen signature verification, delivery evidence, replay
- CTA: "Integrate with Shopify in 5 minutes"

**Target audience:**
- Shopify developers
- E-commerce teams

## GitHub Landing Page

**Status:** Missing
**Owner:** Product (GitHub team)
**Priority:** P2 (Medium)
**Description:** Dedicated landing page for GitHub webhook use case

**Required elements:**
- Problem: Silent GitHub webhook failures, CI/CD disruptions
- Solution: Zen signature verification, delivery evidence, replay
- CTA: "Integrate with GitHub in 5 minutes"

**Target audience:**
- GitHub developers
- DevOps teams

## Twilio Landing Page

**Status:** Missing
**Owner:** Product (Twilio team)
**Priority:** P2 (Medium)
**Description:** Dedicated landing page for Twilio webhook use case

**Required elements:**
- Problem: Silent Twilio webhook failures, SMS delivery issues
- Solution: Zen signature verification, delivery evidence, replay
- CTA: "Integrate with Twilio in 5 minutes"

**Target audience:**
- Twilio developers
- Communication teams

## Demo Video/GIF

**Status:** Missing
**Owner:** Product/Design
**Priority:** P0 (Immediate)
**Description:** Visual proof of concept showing webhook ingestion and delivery

**Required elements:**
- Short (60-90s) video or GIF
- Shows provider → Zen → customer target flow
- Highlights signature verification and delivery evidence
- Clear CTA at end

**Target audience:**
- Technical buyers
- Decision makers

## Pricing/Tier Page

**Status:** Existing, needs review
**Owner:** Product/Pricing
**Priority:** P0 (Immediate)
**Description:** Clear Free/Pro/Business/Enterprise tiering with security features

**Required elements:**
- Free: Safe defaults, single Target, endpoint-level protection
- Pro+: Multiple Targets, IP allowlist/block, alerts
- Business+: AI Transform, Slack approval, encrypted evidence
- Enterprise: KMS, dedicated infrastructure, custom compliance workflows
- Clear "What's in Free vs Pro+" differentiation
- Conversion-focused security features

**Target audience:**
- All buyers
- Pricing gatekeepers

## Design Partner Pitch

**Status:** Missing
**Owner:** Sales/Go-to-Market
**Priority:** P1 (High)
**Description:** Outreach document for design partner program

**Required elements:**
- Problem statement for early adopters
- What design partners get (early access, feedback, discounted pricing)
- What design partners provide (real-world usage, feedback, testimonials)
- FAQ for potential partners

**Target audience:**
- Early adopter companies
- Strategic partners

## Migration Guide: Replacing a Webhook Handler

**Status:** Missing
**Owner:** Docs/Product
**Priority:** P0 (Immediate)
**Description:** Step-by-step migration guide from direct webhook handling to Zen

**Required elements:**
- "You're currently handling webhooks directly. Here's how to move to Zen."
- Step-by-step integration guide
- Code examples for common providers (Stripe, Shopify, GitHub, Twilio)
- Before/after comparison (direct handling vs Zen)
- Troubleshooting common migration issues

**Target audience:**
- Existing users migrating to Zen
- Technical buyers evaluating Zen

## Public Evidence/Trust Page

**Status:** Partial (evidence exists)
**Owner:** Product/Trust
**Priority:** P0 (Immediate)
**Description:** Evidence-linked trust markers showing proof of security posture

**Required elements:**
- Evidence pages (delivery proofs, trust proofs)
- Live deployment validator badge
- Security validation gates
- Trust timeline (what has been proven)
- Non-claims page (what is NOT claimed)

**Target audience:**
- Security-conscious buyers
- Compliance-focused teams

## Docs Freshness/Live Deployment Validator

**Status:** Partial (validator exists)
**Owner:** Product/Docs
**Priority:** P0 (Immediate)
**Description:** Proof that docs are fresh and deployment is live

**Required elements:**
- Live deployment validator badge
- "Docs are fresh and deployment is live" indicator
- Evidence that all docs are from the live deployment
- Link to live deployment validator script

**Target audience:**
- All buyers
- Technical teams

## Checklist Summary

### P0 (Immediate)
- [ ] Homepage hero
- [ ] Webhook security checklist page
- [ ] Demo video/GIF
- [ ] Pricing/tier page
- [ ] Migration guide

### P1 (High)
- [ ] Stripe landing page
- [ ] Shopify landing page
- [ ] Design partner pitch

### P2 (Medium)
- [ ] GitHub landing page
- [ ] Twilio landing page

### P3 (Low/Backlog)
- [ ] Video testimonials
- [ ] Case study library
- [ ] Developer blog posts
- [ ] Webinars/recorded demos

## Owner Alignment

**Cross-functional ownership:**

- **Product:** Sets feature requirements and security posture
- **Docs:** Writes and maintains technical documentation
- **Design:** Creates visual assets (hero, video, landing pages)
- **Sales:** Manages design partner program and outreach
- **Pricing:** Defines tiering and monetization strategy
- **Engineering:** Validates technical accuracy of GTM assets

## Approval Gates

**Each asset requires approval from:**

1. **Security team:** Validates security posture claims
2. **Product team:** Validates feature completeness and accuracy
3. **Docs team:** Validates technical accuracy and clarity
4. **Design team:** Validates visual quality and consistency
5. **Legal team:** Validates compliance and non-claim language

## Timeline

**Suggested timeline for P0 assets:**

- **Week 1:** Homepage hero, security checklist page, demo video
- **Week 2:** Pricing page, migration guide
- **Week 3:** Design partner pitch
- **Week 4:** P1/P2 assets (Stripe, Shopify, GitHub, Twilio)

**Phase 2 timeline (post-V1 launch):**

- Testimonials, case studies, webinars

## Success Metrics

**GTM asset completeness:**

- 100% of P0 assets completed before V1 launch
- 80% of P1 assets completed before V1 launch
- 50% of P2 assets completed before V1 launch

**Asset quality:**

- No security overclaims (verified by security team)
- No factual errors (verified by docs team)
- Positive user feedback on all assets

## Related

- [Zen V1 GTM and Expansion Decision](./zen-v1-gtm-and-expansion-decision-record.md)
- [Webhook Security Defense-in-Depth](../security/webhook-security-defense-in-depth.md)
- [Webhook Security Tiering](../security/webhook-security-tiering.md)

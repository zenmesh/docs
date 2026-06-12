# DOCSAI023 V1/V1.1 Scope Proposal

> **Task ID:** DOCSAI023
> **Date:** 2026-06-12
> **Status:** DRAFT — Leonardo decision needed

## V1 Scope (Launch)

### Webhook Providers (Supported at Launch)
- **Stripe:** Runtime proof exists — supported-at-launch
- **GitHub:** Runtime proof exists — supported-at-launch
- **Custom:** Documented — supported-at-launch

### Webhook Providers (Targets, Not Live Unless Proven)
- **Shopify:** WP-006 — Launch target, not live unless runtime proven
- **Twilio:** WP-007 — Launch target, not live unless runtime proven

### Future/Post-Launch
- **GitLab:** WP-008 — Post-V1
- **Alipay:** WP-009 — Post-V1 (if applicable)
- **NATS/MQ:** Roadmap only
- **Slack:** Roadmap only

### Delivery Targets
- **HTTP/HTTPS:** Supported — core delivery
- **Object store fan-out:** NOT claimed for Day 1 unless runtime proven (LD-014)
- **K8s CRD target:** NOT public pre-prod-live (LD-015)

### MCP
- **Read/scoped:** Current capability
- **Write/mutation:** Future — not available at launch
- **Draft system:** Documented — human-apply only

### Permissions
- **UI/API/MCP:** Design/contract only — not runtime-proven
- **Allow MCP for env=dev:** Proposed pattern
- **Deny MCP for env=prod:** Proposed pattern

### Plan Tiers
- **Free:** Launch-facing
- **Pro:** Launch-facing (notify me)
- **Business:** Coming soon
- **Enterprise:** Contact/evaluation only

## V1.1 Scope (Post-Launch)

- GitLab webhook support (WP-008)
- Alipay integration (WP-009, if applicable)
- SVID-based identity (ST-003)
- Business tier activation
- MCP write contract (if approved)
- Object store fan-out (if runtime proven)
- K8s CRD target (if runtime proven)
- Shopify/Twilio (if runtime proven)

## Reconciliation: 251 vs 338 Items

Note: References to 251 or 338 registry items from earlier tracking should not be used as authoritative counts. The actual current state must be verified against the live registry. DocsAI does not own registry reconciliation — this is Leonardo/Helper territory.

## Scope Decision Matrix

| Item | V1 | V1.1 | Decision Needed | Hermes Dep |
|------|-----|------|-----------------|------------|
| Stripe webhook | Yes | — | None | No (proven) |
| GitHub webhook | Yes | — | None | No (proven) |
| Custom webhook | Yes | — | None | No |
| Shopify webhook | No | Yes | LD-014 (runtime proof) | Yes |
| Twilio webhook | No | Yes | LD-014 (runtime proof) | Yes |
| GitLab webhook | No | Yes | None (deferred) | Yes |
| Object store fan-out | No | Yes | LD-014 | Yes |
| K8s CRD target | No | Yes | LD-015 | Yes |
| MCP write | No | Yes | LD-013 | Yes |
| Business tier | No | Yes | LD-006 | Yes (billing) |
| Billing system | No | Yes | LD-006/007/008 | Yes |

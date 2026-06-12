---
sidebar_label: Pricing Decision Packet
---

# Pricing Tier Naming Decision Packet

> **Owner:** Leonardo
> **Created by:** DocsAI021
> **Status:** Decision needed

## Current State

### Public Site (zen-mesh.io)
- Uses **Preview** and **Team** tier names on `/pricing`
- "Enterprise" referenced as contact/evaluation
- No "Free" or "Pro" tier names on public site

### Docs Site (docs.zen-mesh.io)
- Uses **Free** and **Pro** tier names in getting-started/upgrade-free-to-pro.md
- References "Free plan" and "Pro plan" in upgrade documentation
- References billing/overage in contracts

### Conflict
The public site and docs site use different tier names. This creates confusion for anyone navigating between site and docs.

## Options

### Option A: Free / Pro / Business coming soon / Enterprise contact (RECOMMENDED)

| Tier | Status | Wording |
|------|--------|---------|
| Free | Launch-facing | "Free plan — starts at $0/month" |
| Pro | Launch-facing (after Hermes billing proof) | "Pro plan — advanced features" |
| Business | Coming soon | "Business plan — coming soon" |
| Enterprise | Contact only | "Enterprise evaluation — contact us" |

**Files to change:**
- `src/pages/pricing.astro`: Replace "Preview" → "Free", "Team" → "Pro"
- `src/pages/get-started.astro`: Update tier references if any
- `src/pages/index.astro`: Update hero card references if any
- Site metadata, sitemap, llms.txt: Update tier references

**Docs files already use Free/Pro — minimal changes needed.**

**Risks:** Cannot claim Pro is "live" until Hermes proves Stripe billing runtime.

### Option B: Preview / Team / Enterprise

| Tier | Status | Wording |
|------|--------|---------|
| Preview | Current | "Preview — early access" |
| Team | Current | "Team — advanced features" |
| Enterprise | Contact only | "Enterprise — contact us" |

**Files to change:**
- `docs/getting-started/upgrade-free-to-pro.md`: Rename "Free" → "Preview", "Pro" → "Team"
- Any docs referencing "Free plan" or "Pro plan"

**Risks:** "Preview" and "Team" are non-standard SaaS tier names. Less clear for buyer audience.

### Option C: Private Preview Only Until Billing Proof

Single tier: "Private Preview" — no paid tiers visible until Hermes billing runtime is proven.

**Files to change:**
- `src/pages/pricing.astro`: Replace all tiers with single "Private Preview" card
- `docs/getting-started/upgrade-free-to-pro.md`: Remove or mark as future
- All billing/upgrade references: Mark as "not yet available"

**Risks:** Most conservative but may delay buyer engagement. Reduces launch scope.

## Recommendation

**Option A (Free / Pro / Business coming soon / Enterprise contact)**

Reasons:
1. Standard SaaS naming — buyers understand immediately
2. Docs already use Free/Pro, reducing migration work
3. "Business coming soon" is honest about readiness
4. "Enterprise contact" maintains enterprise sales path
5. No paid-live claim needed — Free and Pro can coexist with Pro features marked as "after billing proof"

## Regardless of Option

The following claims must NOT be made:
- "Pro is live" (until Hermes proves Stripe billing)
- "Stripe billing is active" (until runtime proof)
- "Paid plans available" (until billing runtime proven)
- "Upgrade to Pro today" (should be "Pro plan is being prepared")
- "Business plan available" (should be "Business is coming soon")

## Leonardo Action Required

Choose Option A, B, or C. Then DocsAI will update all references to match.

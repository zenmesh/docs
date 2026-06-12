---
sidebar_label: Upgrade from Free to Pro
description: When to upgrade, what you get, and how the transition works.
---

# Upgrade from Free to Pro

Zen Mesh offers a Free plan to get started and a Pro plan for production use. This guide helps you decide when to upgrade and what changes.

## Free Plan Limits

| Resource | Free Limit |
|----------|------------|
| Endpoints (sources + targets) | 3 total |
| Events per month | 1,000 |
| Team members | 1 (you) |
| Delivery evidence retention | 7 days |
| Merkle inclusion proofs | Not available |
| Labels | 5 per resource |
| Support | Community docs + email (support@zen-mesh.io) |

## When to Upgrade

Consider upgrading when:

- You're approaching the **1,000 event/month** limit
- You need **more than 3 endpoints** across sources and targets
- You want to **add team members** to collaborate
- You need **longer evidence retention** for compliance or troubleshooting
- You want **Merkle inclusion proofs** (Pro+ tier)

## Pro Plan Pricing

:::note
Pricing is in early-access phase and subject to change.
:::

| Billing | Price | Per-Month Equivalent |
|---------|-------|---------------------|
| Monthly | $29/mo | $29 |
| Annual | $276/yr | $23/mo |

Pro includes:

| Resource | Pro Limit |
|----------|-----------|
| Endpoints | 50 |
| Events per month | 100,000 |
| Team members | 5 |
| Delivery evidence retention | 30 days |
| Labels | 50 per resource |
| Support | Email (support@zen-mesh.io); Slack workspace not yet confirmed |

### Pro+ Tier

An additional tier (Pro+) is in development with higher event volumes, Merkle inclusion proofs, and dedicated support. Contact zen@zen-mesh.io for details.

## How to Upgrade

1. Go to the [Zen Mesh pricing page](https://zen-mesh.io/pricing)
2. Click **Upgrade to Pro**
3. Choose **Monthly** ($29/mo) or **Annual** ($276/yr)
4. Enter your payment details
5. Confirm

## What Changes Immediately

Once the upgrade processes:

- Endpoint and event limits are lifted immediately
- Additional team members can be invited (see [Invite Users and Groups](./invite-users-groups))
- Label limits increase per resource
- Evidence retention extends to 30 days (existing records are not retroactively extended)

All existing sources, targets, and routes continue working — no reconfiguration needed.

## Design Partner Program

We're looking for design partners to shape the roadmap. Benefits include:

- **6 months free** on the Pro plan
- Direct access to the engineering team
- Influence on feature prioritization
- Early access to new capabilities

To apply, email zen@zen-mesh.io with a brief description of your use case.

## Downgrading

:::note
Downgrade behavior is planned but not yet available via self-service.
:::

If you downgrade from Pro to Free:

- Resources exceeding Free limits will be **paused** (not deleted)
- You'll have read-only access to evidence records beyond the 7-day window
- Re-upgrading restores paused resources

Contact zen@zen-mesh.io to request a downgrade.

## See Also

- [Invite Users and Groups](./invite-users-groups)
- [Use Labels](./use-labels)
- [Read Delivery Evidence](./read-delivery-evidence)
- [Limits Reference](../start-here/limits)

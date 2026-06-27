---
sidebar_label: Security Plan Tiering
---

# Security Feature Tiering

Zen Mesh security features are tiered by plan. This page defines which features
are available at each tier for V1 and the V1.1 roadmap.

## V1 — Plan Tiering

### IP Allowlist / Block

| Plan | IP Allowlist/Block |
|------|-------------------|
| **Free** | Not included. Upgrade CTA shown. |
| **Pro** | IP allowlist/block **included**. |
| **Business** | IP allowlist/block included. |
| **Enterprise** | IP allowlist/block included. |

IP allowlist/block is surfaced under Endpoint/Webhook Security in the UI.
Free plan users see an upgrade prompt when accessing this feature.

### What IP Allowlist/Block Does

Restricts which source networks can deliver webhooks to Zen Mesh ingesters.
Reduces attack surface by deny-by-default enforcement on source IP.

## V1.1 — Planned Features

### HTTP Header Management

| Plan | Header Filtering/Block/Transform |
|------|----------------------------------|
| **Free** | Not included. |
| **Pro** | Not included. |
| **Business** | Header filtering/blocking/transform management **planned**. |
| **Enterprise** | Header filtering/blocking/transform management planned. |

Header management is aligned with the V1.1 release and the Business plan launch.
It is **not** a V1 blocker. Do not claim header management is available in V1
unless implementation is complete and product explicitly approves the claim.

### Dedicated IP

| Plan | Dedicated IP |
|------|-------------|
| **Free** | Not included. |
| **Pro** | Not included. |
| **Business** | Dedicated IP add-on (planned). |
| **Enterprise** | Advanced/dedicated controls (planned). |

Dedicated IP remains Business+ / Enterprise. Do not claim availability unless
implementation is complete.

## Summary Table

| Feature | Free | Pro | Business | Enterprise | Version |
|---------|------|-----|----------|------------|---------|
| HMAC signature verification | ✓ | ✓ | ✓ | ✓ | V1 |
| IP allowlist/block | — | ✓ | ✓ | ✓ | V1 |
| TLS/mTLS transport | ✓ | ✓ | ✓ | ✓ | V1 |
| Hash-chain evidence | ✓ | ✓ | ✓ | ✓ | V1 |
| Header filtering/block/transform | — | — | Planned | Planned | V1.1 |
| Dedicated receive IP | — | — | Planned | Planned | V1.1+ |

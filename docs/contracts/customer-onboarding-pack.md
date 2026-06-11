---
sidebar_label: Customer Onboarding Pack
description: Customer onboarding documentation — signup flow, first project, provider selection, data-plane selector, route setup, test event, evidence, upgrade, overage cap, support.
---

# Customer Onboarding Pack

> **Preparation materials for launch.** This documents the intended customer onboarding flow.

## 1. Public Signup Flow

1. User visits [zen-mesh.io](https://zen-mesh.io) and clicks "Get Started"
2. Free plan signup — no credit card required
3. Email verification
4. Tenant created — user lands in empty dashboard
5. Guided onboarding prompt: "Create your first webhook source"

## 2. First Project / Workspace Checklist

- [ ] Create a source (Stripe, GitHub, or Custom Webhook)
- [ ] Create a target (your service URL)
- [ ] Create a route connecting source to target
- [ ] Send a test webhook event
- [ ] View delivery evidence
- [ ] (Optional) Add labels to organize resources
- [ ] (Optional) Invite team members

## 3. Provider Selection

| Provider | Status | Onboarding Guide |
|----------|--------|-----------------|
| **Stripe** | Supported at launch | [First Stripe Webhook](/docs/getting-started/first-stripe-webhook) |
| **GitHub** | Supported at launch | [First GitHub Webhook](/docs/getting-started/first-github-webhook) |
| **Custom Webhook** | Supported at launch | [First Custom Webhook](/docs/getting-started/first-custom-webhook) |
| **Shopify** | Launch target — not yet available | [First Shopify Webhook](/docs/getting-started/first-shopify-webhook) |
| **Twilio** | Launch target — not yet available | [First Twilio Webhook](/docs/getting-started/first-twilio-webhook) |

## 4. Data-Plane Selector

At launch, the data-plane selector in the UI shows:

- **One selectable entry point** — the active data plane for webhook ingestion
- **Faded "coming soon" entries** — planned future locations (EU, APAC)
- **Provider-native region names** — e.g., `gcp-northamerica-northeast2` not custom names
- No data residency claims
- System label: `zen-mesh.io/plane` is set by the system and not customer-mutable

See [Entry Point Decision Prep](/docs/contracts/entry-point-decision) for the open decisions.

## 5. First Route / Test Event / Evidence

Step-by-step:

1. **Create source** — choose provider, configure verification (signing secret, HMAC key, or header)
2. **Create target** — enter your destination URL (public or private network)
3. **Create route** — connect source to target, optionally add filtering or JSONPath transforms
4. **Send test event** — use curl or the provider dashboard to send a webhook
5. **View delivery log** — check status code, timestamp, metadata
6. **View evidence** — delivery receipt with timestamps, labels, status code

See [Send a Test Webhook](/docs/getting-started/send-test-webhook) and [Read Delivery Evidence](/docs/getting-started/read-delivery-evidence).

## 6. Free to Pro Upgrade Path

- **Free:** 3 endpoints, 3 sources, 3 targets, 3 routes, 1K events/month, 7-day log retention
- **Pro:** 50 each, 100K events/month, 30-day retention, email support, JSONPath transforms/filters
- **Upgrade:** From dashboard billing settings. Stripe billing integration required before paid Pro launch.
- **Annual discount:** 20% off ($23/month vs $29/month)

See [Plans & Limits](/docs/start-here/limits) and [Upgrade Guide](/docs/getting-started/upgrade-free-to-pro).

## 7. Pro Overage Opt-In Cap

- Pro customers may set an **optional monthly overage cap**
- Caps limit how much overage spend can accrue in a billing cycle
- After cap is reached, soft limit with upgrade guidance
- Without a cap, Pro customers receive overage or upgrade guidance (no hard stop)
- Caps are audited and logged

See [Plans & Limits](/docs/start-here/limits) for over-limit behavior details.

## 8. Support Request — Safe Payload Guidance

When contacting support:

- **Do not paste raw secrets** — redact API keys, tokens, passwords
- **Do include:** tenant ID, provider, event ID, route ID, error message, timestamps (UTC)
- **Customer-controlled:** You decide what payload data to share
- **Safe path:** Email to [support@zen-mesh.io](mailto:support@zen-mesh.io) with redacted samples

See [Support](/docs/start-here/support) and [Support Payload Access Contract](/docs/contracts/support-payload-access).

## See Also

- [Getting Started Guides](/docs/getting-started/quick-start) — step-by-step onboarding
- [Provider Guides](/docs/guides/sources) — source configuration
- [Plans & Limits](/docs/start-here/limits) — plan comparison
- [Support Center D1 Spec](/docs/contracts/support-center-d1-spec) — support form specification

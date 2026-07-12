---
title: Provider Template Packs
description: Reusable packages for common webhook sources — structured defaults for endpoint setup, verification, and operations.
---

# Provider Template Packs

Provider Template Packs are reusable packages for common webhook sources that provide structured defaults for endpoint configuration, provider verification, event classification, and operational visibility.

## Overview

Zen Mesh provides Provider Template Packs for popular webhook sources. Each pack includes:

- **Endpoint Setup** — Pre-configured endpoint defaults
- **Provider Verification** — Signature verification (HMAC) for authenticity
- **Event Classification** — Structured event types and transformations
- **Flow Patterns** — Recommended endpoint-to-target routing
- **Operations** — Retry policy, dead-letter queue, and observability guidance

## Available Packs

| Provider | Status | Signature Verification |
|----------|--------|----------------------|
| Stripe | Production | HMAC-SHA256 (Stripe-Signature header) |
| GitHub | Production | HMAC-SHA256 (X-Hub-Signature-256 header) |
| Shopify | Production | HMAC-SHA256 (X-Shopify-Hmac-Sha256 header) |
| Twilio | Production | HMAC-SHA1 (X-Twilio-Signature header) |
| Custom Signed | Supported | Configurable HMAC via base transform |

### Maturity Levels

Packs follow the [Provider Pack Commercial Lifecycle Contract](https://github.com/zenmesh/zen-platform/blob/main/provider-packs/contract/provider-pack-commercial-lifecycle-contract.md):

- **Experimental** — Newly introduced. Usage is metered but quota-exempt. No GA SLA.
- **Beta** — Eligible after approximately 90 clean days plus evidence. Usage remains metered and quota-exempt. Customers receive at least 30 days' notice before normal billing.
- **GA** — Normal quota and billing at explicit effective date. Applicable SLA applies.

Promotion is evidence-driven and governed. Time alone never causes promotion.

All four core provider packs (Stripe, GitHub, Shopify, Twilio) are currently at **Experimental** maturity in the canonical registry. Documentation references to "Production" or "GA" maturity reflect legacy classification and are superseded by the lifecycle contract.

## Architecture Mapping

Provider Template Packs map to Zen Mesh concepts:

| Pack Component | Zen Mesh Concept |
|---------------|------------------|
| Endpoint config | Endpoint CRD |
| Provider verification | AuthProfile / Transform rules |
| Event classification | Transform package rules |
| Flow patterns | Target / Routing |
| Operations | Retry / DLQ / Observability |

## Usage

Packs are optional. You can:

1. **Use a pack** — Accelerates setup with sensible defaults
2. **Custom endpoint** — Full control without any pack
3. **Mix and match** — Pack for one provider, custom for another

Packs do not remove user control. All endpoints, targets, and flows remain configurable.

## Security Model

All provider packs enforce the same security model:

- **Signature Verification** — HMAC validation for provider authenticity
- **mTLS** — Mutual TLS on data-plane path (ingester → egress)
- **SPIFFE/SPIRE** — Workload identity for automated certificate rotation
- **Scoped Secrets** — Provider secrets stored encrypted, never logged

## Operations

Packs provide operational defaults:

- **Retry Policy** — Exponential backoff with configurable attempts
- **Dead Letter Queue** — Failed deliveries queued for manual inspection
- **Replay** — Ability to replay events from evidence
- **Observability** — Structured logs, metrics, and traces

## Custom Signed Webhooks

For providers not in the standard set, Zen Mesh supports custom signed webhooks:

1. Use the base transform package
2. Configure custom HMAC header name
3. Set your secret in the AuthProfile

Custom signed webhooks use the same security model as provider packs.

## Non-Claims

- No Provider Pack is production-live or GA
- No quota enforcement is implemented in runtime
- No governed promotion workflow is automated
- Packs are optional accelerators — all configuration remains under user control
- Deleting a pack does not remove underlying generic platform capabilities
- Experimental and Beta packs have no production SLA

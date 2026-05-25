---
sidebar_label: Webhook Operations Wedge
---

# Webhook Operations Wedge — Evidence Overview

Zen helps teams receive, validate, observe, and operate webhooks across Stripe, GitHub, and custom sources, with a planned expansion path to Shopify, Twilio, GitLab, Alipay, and similar providers.

## Current Readiness: DEMO

All evidence is **local/demo/sandbox only**. Not customer-ready or production-live.

## What Is Proven

| Capability | Status | Proof Scope |
|---|---|---|
| Stripe webhook ingestion | PROVEN | local/mock |
| Delivery attempt recording and outcomes | PROVEN | local/mock |
| Retry with DLQ exhaustion routing | PROVEN | local/mock |
| Duplicate detection via idempotency keys | PROVEN | local/mock |
| mTLS on internal paths | PROVEN | local/mock |
| HMAC payload verification with replay protection | PROVEN | local/mock |
| Machine-readable evidence with Merkle integrity | PROVEN | local/mock |
| SPIFFE/SPIRE identity for workload auth | PROVEN | local/mock |

## What Is Partial / Planned

| Capability | Status | Limitation |
|---|---|---|
| GitHub webhook ingestion | PARTIAL | Provider adapter present; webhook-specific signature validation not yet tested |
| Custom webhook ingestion | PLANNED | Generic ingestion pipeline designed; provider-specific handling per adapter |
| Compliance control mapping | PARTIAL | Internal readiness only; no certification |
| UI route quality and delivery dashboard | PARTIAL | Route UI exists; dashboard planned |
| Provider expansion (Shopify, Twilio, GitLab, Alipay) | PLANNED | Modular provider adapter model — not yet validated |

## What Is Not Claimed

See the [wedge non-claims](/ai/evidence/v1/wedge-non-claims.json) for the full list. Key points:

- **Not production-live or customer-ready**
- **No public edge/mesh/relay capability claim**
- **No exactly-once or zero-loss delivery guarantee**
- **No compliance certification**
- **SVID rotation not yet automated**
- **Provider scope**: Stripe tested (local/mock), GitHub adapter present (not fully validated), Custom planned
- **Shopify, Twilio, GitLab, Alipay are roadmap only** — not currently supported
- **Custom webhook support does not imply every provider-specific signature scheme is implemented**
- **Modular provider adapter design is not a claim of full marketplace coverage**

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `/ai/evidence/v1/wedge-claim-map.json` | Structured claim matrix (webhook wedge) |
| `/ai/evidence/v1/wedge-non-claims.json` | Explicit non-claims for wedge scope |
| `/ai/evidence/v1/manifest.json` | Full platform capability manifest |

## Security Posture

- **mTLS**: Enforced on internal paths
- **HMAC-SHA256**: Payload verification with nonce-based replay protection
- **SPIFFE/SPIRE**: Workload identity for service auth (SVID rotation not yet automated)
- **Machine-readable evidence**: Delivery outcomes recorded with Merkle integrity verification

## Test Methodology

All proofs are tested in a local mock harness with deterministic scenarios. See the [verification guide](./verification) for how to validate evidence.

## Known Limitations

- Stripe native webhook signing secret integration not yet validated
- GitHub webhook-specific signature verification not yet validated
- No real webhook event validated on a cloud deployment
- Custom webhook signature schemes are provider-specific
- Comprehensive delivery status dashboard is planned
- SVID rotation is not yet automated

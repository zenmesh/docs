---
sidebar_label: Webhook Operations Wedge
---

# Webhook Operations Wedge — Evidence Overview

Zen helps teams receive, validate, observe, and operate webhooks across Stripe, GitHub, Twilio, Shopify, and custom sources.

## Current Readiness: DEMO

All evidence is **local/demo/sandbox only**. Not customer-ready or production-live.

## What Is Proven

| Capability | Status | Proof Scope |
|---|---|---|
| Stripe webhook ingestion | PROVEN | local/mock |
| GitHub webhook ingestion | PROVEN | local/mock |
| Twilio webhook ingestion | PROVEN | local/mock |
| Shopify webhook ingestion | PROVEN | local/mock |
| Custom webhook ingestion | PROVEN | local/mock |
| Delivery attempt recording and outcomes | PROVEN | local/mock |
| Retry with DLQ exhaustion routing | PROVEN | local/mock |
| Duplicate detection via idempotency keys | PROVEN | local/mock |
| mTLS on internal paths | PROVEN | local/mock |
| HMAC payload verification with replay protection | PROVEN | local/mock |
| Machine-readable evidence with integrity | PROVEN | local/mock |
| SPIFFE/SPIRE identity for workload auth | PROVEN | local/mock |

## What Is Partial / Planned

| Capability | Status | Limitation |
|---|---|---|
| Compliance control mapping | PARTIAL | Internal readiness only; no certification |
| UI route quality and delivery dashboard | PARTIAL | Route UI exists; dashboard planned |

## What Is Not Claimed

- **Not production-live or customer-ready**
- **No public edge/mesh/relay capability claim**
- **No exactly-once or zero-loss delivery guarantee**
- **No compliance certification**
- **SVID rotation not yet automated**
- **Custom webhook support does not imply every provider-specific signature scheme is implemented**

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `ai/evidence-v1-supersession.md#wedge-claim-map` | Structured claim matrix (webhook wedge) |
| `ai/evidence-v1-supersession.md#non-claims` | Explicit non-claims for wedge scope |
| `ai/evidence-v1-supersession.md#manifest` | Full platform manifest |

## Security Posture

- **mTLS**: Enforced on internal paths
- **HMAC-SHA256**: Payload verification with nonce-based replay protection
- **SPIFFE/SPIRE**: Workload identity for service auth (SVID rotation not yet automated)
- **Machine-readable evidence**: Delivery outcomes recorded with integrity verification

## Test Methodology

All proofs are tested in a local mock harness with deterministic scenarios. See the [verification guide](./verification) for how to validate evidence.

## Known Limitations

- No real webhook event validated on a cloud deployment
- Custom webhook signature schemes are provider-specific
- Comprehensive delivery status dashboard is planned
- SVID rotation is not yet automated

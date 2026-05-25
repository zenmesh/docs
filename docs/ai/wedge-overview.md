---
sidebar_label: Stripe Webhook Wedge
---

# Stripe Webhook Wedge — Evidence Overview

Zen helps teams receive, validate, observe, and operate Stripe webhooks with stronger reliability, visibility, and security posture.

## Current Readiness: DEMO

All evidence is **local/demo/sandbox only**. Not customer-ready or production-live.

## What Is Proven

| Capability | Status | Proof Scope |
|---|---|---|
| Stripe webhook ingestion with signature verification | PROVEN | local/mock |
| Delivery attempt recording and outcomes | PROVEN | local/mock |
| Retry with DLQ exhaustion routing | PROVEN | local/mock |
| Duplicate detection via idempotency keys | PROVEN | local/mock |
| mTLS on internal control-plane paths | PROVEN | local/mock |
| HMAC payload verification with replay protection | PROVEN | local/mock |
| Machine-readable evidence with Merkle integrity | PROVEN | local/mock |
| SPIFFE/SPIRE identity for workload auth | PROVEN | local/mock |

## What Is Partial / Planned

| Capability | Status | Limitation |
|---|---|---|
| Compliance control mapping | PARTIAL | Internal readiness only; no certification |
| UI route quality and delivery dashboard | PARTIAL | Route UI exists; dashboard planned |

## What Is Not Claimed

See the [wedge non-claims](/ai/evidence/v1/wedge-non-claims.json) for the full list. Key points:

- **Not production-live or customer-ready**
- **No public edge/mesh/relay capability claim** — wedge is Stripe webhook scope only
- **No exactly-once or zero-loss delivery guarantee**
- **No compliance certification**
- **SVID rotation not yet automated**
- **Only Stripe webhook provider validated**

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `/ai/evidence/v1/wedge-claim-map.json` | Structured claim matrix (Stripe webhook only) |
| `/ai/evidence/v1/wedge-non-claims.json` | Explicit non-claims for wedge scope |
| `/ai/evidence/v1/manifest.json` | Full platform capability manifest |

## Security Posture

- **mTLS**: Enforced on internal control-plane paths
- **HMAC-SHA256**: Payload verification with nonce-based replay protection
- **SPIFFE/SPIRE**: Workload identity for control-plane auth (SVID rotation not yet automated)
- **Machine-readable evidence**: Delivery outcomes recorded with Merkle integrity verification

## Test Methodology

All proofs are tested in a local mock harness with deterministic scenarios. See the [verification guide](./verification) for how to validate evidence.

## Known Limitations

- Stripe native webhook signing secret integration not yet validated
- DLQ retry UI is separate from wedge scope
- No real Stripe event validated on a cloud deployment
- Comprehensive delivery status dashboard is planned

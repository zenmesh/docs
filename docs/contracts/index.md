---
sidebar_label: Contracts Overview
description: Contract-first documentation for Zen Mesh launch architecture — multi-target delivery, payload encryption, tenant keys, data-plane selection, and evidence export.
---

# Contracts Overview

This section documents Zen Mesh's **contract-first architecture decisions** for the initial launch and beyond. Each contract defines V1 launch behavior, planned/future capabilities, and open design decisions.

Contracts guide future implementation before code changes. They are living documents — updated as design decisions are finalized and as capabilities move from planned to V1 scope.

## Contracts

| Contract | Status | Scope |
|----------|--------|-------|
| [Multi-Target Delivery](./multi-target-delivery) | V1 | Multi-destination HTTP webhook delivery with per-destination policies |
| [Object-Store Fan-Out](./object-store-fan-out) | Launch target | S3-compatible object-store fan-out — contract-defined, not V1 |
| [Payload Encryption, Replay & DLQ](./payload-encryption-replay-dlq) | V1 | Encrypted tenant-scoped payloads, staff-no-access default, service-scoped runtime keys |
| [Tenant Key Management](./tenant-key-management) | V1 | Zen-managed per-tenant envelope keys, BYOK planned |
| [Support Payload Access](./support-payload-access) | V1 | Customer-authorized time-bounded payload access |
| [Data-Plane Selection](./data-plane-selection) | V1 | Single entry point at launch, multi-region planned |
| [Evidence Export](./evidence-export) | V1 | Export by plan — Free UI, Pro API+bulk |

## Decision Traceability

Each contract page marks:

- **V1 behavior** — what ships at launch
- **Planned/Future** — confirmed roadmap items
- **Open decisions** — design tensions not yet resolved
- **Cross-links** — to related contracts, provider docs, security, trust, support, pricing, and limits

> For public-facing capability descriptions, see the [Provider Guides](/docs/guides/sources), [Security Overview](/docs/security/), and [Plans & Limits](/docs/start-here/limits).

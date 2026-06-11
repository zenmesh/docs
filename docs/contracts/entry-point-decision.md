---
sidebar_label: Entry Point Decision Prep
description: Decision preparation for the first data-plane entry point provider and region — options, reliability concerns, UI behavior, and open questions.
---

# Entry Point Decision Prep

> **Preparation materials for Leonardo's review.**
>
> This page consolidates what is known, what is open, and what needs decision
> regarding the first data-plane entry point for webhook ingestion.

## Current State

- **SaaS control plane:** GCP Toronto (`northamerica-northeast2`) — live
- **Data-plane entry point:** Provider and region to be confirmed before launch
- **Single entry point at launch** is confirmed. Multi-region (EU, APAC) is planned.

## Decision Required

| Question | Options | Notes |
|----------|---------|-------|
| Entry point provider | GCP / AWS / other | Provider-native region names should be used |
| Entry point region | TBD | Must be a region where the provider operates |
| Reliability / failover | Single-region vs multi-region at launch | Multi-region resilience is planned, not V1 |
| Traffic routing | Direct vs CDN-assisted | Open question for reliability and latency |
| Residency implications | No residency claim at launch | Entry point choice should not imply data residency guarantees |

## Options Table

| Provider | Pros | Cons | Region Candidates |
|----------|------|------|-------------------|
| **GCP** | Same provider as control plane; consistent IAM; existing relationship | Single provider lock-in; may not be ideal for latency in all geos | `us-east4` (Virginia), `us-central1` (Iowa), `europe-west1` (Belgium) |
| **AWS** | Broad regional coverage; mature CDN (CloudFront); many teams already use AWS | Different cloud provider than control plane; separate operational overhead | `us-east-1` (N. Virginia), `eu-west-1` (Ireland), `ap-southeast-1` (Singapore) |
| **Multi-cloud (future)** | No single-provider dependency; geographic flexibility | Complex operational model; networking between providers | Not V1 |

## Reliability Concerns

- **Single entry point risk:** If the entry point is unavailable, all webhook ingestion stops. Multi-region resilience mitigates this.
- **Provider-specific risk:** Regional outages, network partitions, and upstream provider failures affect availability.
- **Mitigations (V1):** Retry logic, DLQ for failed deliveries, outbound-only egress (ingestion is separate from delivery).
- **Mitigations (future):** Multi-region entry points with automatic failover.

## UI Behavior (D1)

At launch, the data-plane selector in the UI should:

1. Show the single available entry point as a selected option
2. Display additional planned locations as faded "coming soon" entries
3. Use **provider-native region names** (e.g., `us-east4`, not custom names)
4. Not make data residency claims
5. Show label `zen-mesh.io/plane` as reserved (system-set, not customer-mutable)

## Open Questions

- Should entry point selection be per-tenant (all flows) or per-route/flow?
- Should the data-plane label use `zen-mesh.io/plane=data-plane` or a different convention?
- What is the migration path if the entry point provider changes post-launch?
- How are entry point health and latency monitored and communicated to customers?

## See Also

- [Data-Plane Selection Contract](/docs/contracts/data-plane-selection) — V1 data-plane contract
- [Launch Contracts Index](/docs/contracts/) — full contract catalog and status matrices
- [Geography](/docs/start-here/geography) — current and planned data processing locations
- [Data Handling](/docs/start-here/data-handling) — data processing and retention

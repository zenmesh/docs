---
sidebar_label: Data-Plane Selection
description: Data-plane selection contract — SaaS entry point choice, geography, and customer-facing plane selection semantics.
---

# Data-Plane Selection Contract

**Status:** V1 contract

## V1 Scope

- **SaaS control plane:** Toronto, GCP (`northamerica-northeast2`)
- **Entry point:** Single entry point at launch. The entry point location will be confirmed at launch.
- **UI behavior:** If only one data plane exists, the UI shows one selectable option plus a faded "coming soon" indicator for future locations/providers
- Use **provider-native region names** where possible (e.g., GCP region names, not custom names)
- Label: `zen-mesh.io/plane` (confirmed reserved label space). This label is set by the system and not mutable by customers. It is used internally for routing and selection.
- **No data residency claim at launch** — customers cannot choose their data plane. A single entry point is the V1 behavior.

## Planned / Future

- **Multi-region data plane:** Multiple selectable entry points (EU, APAC) — planned, not committed
- **Customer data-plane selection:** UI/API for choosing which data plane processes a flow's events
- **Data residency:** Residency guarantees tied to data-plane selection — requires multi-region availability first
- **Per-flow data-plane affinity:** Select data plane at the route or flow level

## Open Decisions

- Whether data-plane selection is per-tenant (all flows) or per-route/flow (individual selection)
- Whether to use a dedicated label (`zen-mesh.io/plane`) or a different mechanism for plane affinity
- Multi-region provider selection (GCP only, or multi-cloud)

## See Also

- [Geography](/docs/start-here/geography) — current and planned data processing locations
- [Data Handling](/docs/start-here/data-handling) — data processing and retention
- [Architecture Overview](/docs/architecture/overview) — three-plane architecture
- [Labels Platform](/docs/guides/labels) — reserved label namespaces
- [Contracts: Tenant Key Management](/docs/contracts/tenant-key-management)

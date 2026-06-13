# Platform Layers

> **Zen Mesh models runtime behavior across planes and layers.** Planes describe placement and ownership. Layers describe dependency stage and failure domain.

## Overview

The three-plane model (Control Plane, Data Plane, Edge Plane) answers **where** components run. The four-layer model answers **what dependency stage** they are in and **what failure domain** they share.

| Layer | Name | Dependency Stage |
|-------|------|-----------------|
| L1 | Base | Cluster deployment, installation, enrollment |
| L2a | Flow Mutation | DeliveryFlow and Destination creation/changes |
| L2b | Flow Maintenance/Survival | Maintaining existing flow state, local sync/cache |
| L3 | Traffic | Actual event/webhook delivery |

## Dependency Chain

```
L1 (Base) → L2a (Flow Mutation) → L2b (Flow Maintenance) → L3 (Traffic)
```

Each layer depends on its predecessor:

- **L3 traffic** depends on **L2b** maintained local state for route truth.
- **L2b flow maintenance** depends on **L2a** flow mutation/sync.
- **L2a flow mutation** depends on **L1** installation/enrollment foundation.

## Failure Domain and Blast Radius

## L1 Failure
- No new clusters, components, or enrollment.
- Existing L2b/L3 flows may continue if already provisioned and local state is intact.

## L2a Failure
- No new or changed flows.
- Existing flow maintenance may continue if L2b is implemented and functional.

## L2b Failure
- Existing flow state maintenance/survival is impaired.
- L3 traffic may degrade depending on local cache freshness.
- **24h survivability** is a target/planned proof gate, not a proven capability.

## L3 Failure
- Event delivery interrupted or degraded.
- Does not necessarily imply L1, L2a, or L2b failure.

## SaaS Outage Model

When the SaaS control plane is unavailable:

- **L1**: New installations blocked. Existing clusters continue.
- **L2a**: New flows blocked. Existing flows continue on local state.
- **L2b**: Sync impaired. Local cache serves route truth until stale.
- **L3**: Delivery continues on cached routes if L2b local state is available.

## Mapping to Planes

| Plane \ Layer | L1 | L2a | L2b | L3 |
|--------------|----|----|----|----|
| Control Plane | ✓ | ✓ | — | — |
| Data Plane | ✓ | ✓ | ✓ | ✓ |
| Edge Plane | ✓ | — | ✓ | ✓ |

## Mapping to Evidence and API

Each layer maps to specific evidence artifacts, API surfaces, and MCP tools. See the [platform layer matrix](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/architecture/platform_layer_matrix.json) for the full cross-reference.

## Non-Claims

- This model is a dependency and failure domain framework, not a guarantee.
- L2b 24h survivability is a target/planned proof gate, not a proven capability.
- Layer failure does not imply complete system failure — degradation is bounded by blast radius.
- No exactly-once, zero-loss, or general at-least-once delivery guarantees are implied by this model.
- Integrity receipts (hash-based) provide structural verification only — they are not authentication, identity, encryption, replay prevention, access control, delivery guarantee, or survivability guarantee.

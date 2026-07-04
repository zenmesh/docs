---
sidebar_label: Choose a Runtime Path
---

# Choose a Runtime Path

**Status:** PUBLIC_CONTRACT_DRAFT — Paths may have different readiness levels. See each page for status.

Zen Mesh offers several runtime paths depending on your use case, infrastructure, and scale requirements.

## Decision Table

| I want to... | Install this | What it gives | Limitations | Status |
|---|---|---|---|---|
| Try Zen Mesh quickly without Kubernetes | [Edge Lite](./edge-lite) | Single-container eval, same enrollment bundle, no Kubernetes needed | Not production-ready; design-partner evaluation only | DESIGN_PARTNER_EVAL |
| Run edge delivery on my Kubernetes cluster | [Kubernetes Edge Plane](./kubernetes-edge-plane) | Full edge plane with zen-agent, optional ingester/egress | Requires Kubernetes cluster, kubectl access | WIRED_SANDBOX |
| Deploy the full data plane for production workloads | [Data Plane](./data-plane) | zen-ingester, zen-egress, zen-bridge, retry, replay, DLQ | More infrastructure; requires edge plane | WIRED_SANDBOX |
| Explore the API or inspect docs only | No runtime needed | API access via `https://api.zen-mesh.io` | No event delivery | PUBLIC_CONTRACT_DRAFT |

## Path Descriptions

### Edge Lite
Lightweight non-Kubernetes path. Single-container evaluation mode using Docker. Same enrollment bundle contract as Kubernetes Edge Plane. See [Edge Lite](./edge-lite).

### Kubernetes Edge Plane
Full edge plane running in your Kubernetes cluster. zen-agent connects outbound for enrollment and configuration sync. Optional zen-ingester and zen-egress for local event processing. See [Kubernetes Edge Plane](./kubernetes-edge-plane).

### Data Plane
The delivery runtime. Handles event ingestion, routing, retry, replay, and DLQ management. Can be Zen-operated or customer-operated. See [Data Plane](./data-plane).

## Related

- [Planes](../concepts/planes)
- [Current Status](../reference/current-status)

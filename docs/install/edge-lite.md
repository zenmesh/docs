---
sidebar_label: Edge Lite
---

# Edge Lite

**Role:** Lightweight single-node production tier for private delivery (product_role), distinct from current release_status.  
**Release Status:** Evidence-gated — public image and installer not yet published. See Current Status below.

## What Is Edge Lite

Edge Lite is Zen Mesh's **lightweight, single-node production tier** for secure delivery to private destinations where multi-node high availability and automated failover are not required. It uses a Docker-based installation with the same enrollment bundle contract as the [Kubernetes Edge Plane](./kubernetes-edge-plane).

Edge Lite is suitable for DevOps, IaC, internal tooling, and lower-volume private integrations. For Tier-1 business-critical flows requiring multi-node HA, use the [Kubernetes Edge Plane](./kubernetes-edge-plane).

## Who Is It For

- DevOps and IaC workflows needing private webhook delivery
- Internal tooling and CI/CD notification pipelines
- Lower-volume private integrations (GitHub, GitLab, Jira, Terraform Cloud, etc.)
- Developers who want to evaluate before scaling to Kubernetes

See [use cases](https://www.zen-mesh.io/use-cases) for examples of when Edge Lite fits your workflow.

## What It Provides

- Same enrollment bundle model as Kubernetes Edge Plane
- Docker-based single-container installation
- Outbound connection to control plane
- Basic event delivery capability (where supported)

## Distinction from Kubernetes Edge Plane

| Dimension | Edge Lite | Kubernetes Edge Plane |
|-----------|-----------|----------------------|
| Runtime | Docker single-node | Kubernetes multi-node |
| Availability | Single-node production | Multi-node HA with failover |
| Best for | DevOps, IaC, internal tooling | Tier-1 financial, business-critical |
| Ingester | Not supported | Supported (optional) |

## Current Status

Edge Lite's public image and installer availability are evidence-gated. The following table tracks current implementation status:

| Capability | Status |
|---|---|
| Product role | Lightweight single-node production (defined) |
| Public Docker image | Not yet published |
| Installer | Not yet published |
| Enrollment bundle contract | Contract-level support (runtime pending) |
| Heartbeat | Pending runtime implementation |
| Delivery | Pending runtime implementation |
| Private delivery proof | Pending runtime implementation |

## Non-Claims

- launch_ready = false (runtime not yet published)
- customer_ready = false (runtime not yet published)
- prod_live = false (runtime not yet published)
- Not a replacement for Kubernetes Edge Plane for multi-node HA workflows

## Related

- [Planes](../concepts/planes)
- [Kubernetes Edge Plane](./kubernetes-edge-plane)
- [Edge Plane](./edge-plane)
- [Choose a Runtime Path](./choose-runtime-path)
- [Current Status](../reference/current-status)

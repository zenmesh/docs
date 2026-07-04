---
sidebar_label: Edge Lite
---

# Edge Lite

**Status:** DESIGN_PARTNER_EVAL — Design-partner evaluation only. Not production-ready. Not customer-ready.

## What Is Edge Lite

Edge Lite is a **lightweight non-Kubernetes runtime path** for the Zen Mesh edge plane. It uses a Docker-based installation with the same enrollment bundle contract as the [Kubernetes Edge Plane](./kubernetes-edge-plane).

**Do not use Edge Lite for production workloads.** Edge Lite is for evaluation, design partners, and low-traffic scenarios where full Kubernetes infrastructure is not available.

## Who Is It For

- Developers who want to evaluate Zen Mesh without Kubernetes
- Design partners exploring the platform
- Low-traffic or free-tier use cases

## What It Provides

- Same enrollment bundle model as Kubernetes Edge Plane
- Docker-based single-container installation
- Outbound connection to control plane
- Basic event delivery capability (where supported)

## Limitations

| Area | Limitation | Status |
|---|---|---|
| Throughput | Lower than Kubernetes Edge Plane | Not benchmarked |
| Availability | Single-container, no HA | Design-partner eval |
| Provider support | Limited provider validation | Not production-live |
| Security model | Reduced isolation vs Kubernetes | Zero-trust not complete |
| Secrets management | zen-lock deployment dependent | Per install path |

## Install (Design Partner Access)

```bash
curl -fsSL https://get.zen-mesh.io | bash
```

The script will:
1. Create a short-lived install session
2. Open your browser for signup/login
3. Configure a basic edge plane
4. Print your webhook URL and management URL

## When to Use Kubernetes Edge Plane Instead

Use the [Kubernetes Edge Plane](./kubernetes-edge-plane) when you need:
- Production-grade availability and scalability
- Full Kubernetes security model (network policies, RBAC, secrets)
- zen-ingester or zen-egress for local event processing
- Multi-tenant or high-throughput workloads

## Relationship to the Full Edge Plane

Edge Lite is a **variant** of the edge plane. It shares the same enrollment contract, trust anchors, and outbound-only connection model. The difference is the runtime substrate: Docker vs. Kubernetes.

## Current Status

| Capability | Status |
|---|---|
| Enrollment bundle contract | Contract-level support (runtime pending S171) |
| Heartbeat | Pending S171 runtime implementation |
| Delivery | Pending S172 runtime implementation |
| Operator visibility | Fixture/demo data only |
| Signing/provenance | Pending keyless identity |

## Non-Claims

- launch_ready = false
- customer_ready = false
- prod_live = false
- free_tier_ready = false
- zero_trust_complete = false
- Not a replacement for Kubernetes Edge Plane for production

## Related

- [Planes](../concepts/planes)
- [Kubernetes Edge Plane](./kubernetes-edge-plane)
- [Edge Plane](./edge-plane)
- [Choose a Runtime Path](./choose-runtime-path)
- [Current Status](../reference/current-status)

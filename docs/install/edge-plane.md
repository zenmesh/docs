---
sidebar_label: Edge Plane
---

# Edge Plane

**Status:** WIRED_SANDBOX — The edge plane is the customer-proximity runtime for the Zen Mesh delivery platform. See [Current Status](../reference/current-status) for per-component readiness.

## What Is the Edge Plane

The edge plane runs in the **customer environment** and connects outbound to the control plane and data plane. It never requires inbound ports.

The edge plane has two variants:
- **[Kubernetes Edge Plane](./kubernetes-edge-plane)** — runs on your Kubernetes cluster
- **[Edge Lite](./edge-lite)** — lightweight non-Kubernetes path

## Required Components

| Component | Role | Status |
|---|---|---|
| zen-agent | Enrollment, heartbeat, configuration sync | WIRED_SANDBOX |

## Optional Components

| Component | Role | Status | Caveat |
|---|---|---|---|
| zen-ingester | Local event ingestion | WIRED_SANDBOX | Not required for all deployments |
| zen-egress | Local event delivery to private services | WIRED_SANDBOX | Depends on deployment model |

## Connection Model

```
Edge Plane → Control Plane: outbound (HTTPS + mTLS)
Edge Plane → Data Plane: outbound (HTTPS + mTLS)
Control Plane → Edge Plane: never initiates (no inbound ports)
```

## Non-Claims

- No claim that edge plane implies inbound ports
- No claim that all deployments need zen-ingester or zen-egress
- No claim that Edge Lite is a full replacement for Kubernetes Edge Plane
- No production-live attestation for all component combinations

## Related

- [Planes](../concepts/planes)
- [Choose a Runtime Path](./choose-runtime-path)
- [Kubernetes Edge Plane](./kubernetes-edge-plane)
- [Edge Lite](./edge-lite)

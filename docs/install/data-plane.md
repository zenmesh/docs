---
sidebar_label: Data Plane
---

# Data Plane

**Status:** WIRED_SANDBOX — The data plane is the delivery runtime. See [Current Status](../reference/current-status) for per-component readiness.

## What Is the Data Plane

The data plane is the **delivery runtime** that processes events from source to target. It handles event ingestion, routing, retry, backpressure, DLQ management, and evidence generation.

The data plane operates independently of the control plane. If the control plane is unavailable, already-configured delivery continues.

## Where It Runs

The data plane can be:
- **Zen-operated** — managed by Zen Mesh as part of the SaaS delivery infrastructure
- **Customer-operated** — deployed in the customer's environment for dedicated processing

## Components

| Component | Role | Required? | Status |
|---|---|---|---|
| zen-ingester | Receive events from external sources | Required | WIRED_SANDBOX |
| zen-egress | Deliver events to targets | Required | WIRED_SANDBOX |
| zen-bridge | Internal data-plane routing | Required | WIRED_SANDBOX |
| zen-agent | Configuration sync only (syncs from control plane) | For edge plane | WIRED_SANDBOX |

## Relationship to Edge Plane

The edge plane and data plane are distinct:

| Aspect | Edge Plane | Data Plane |
|---|---|---|
| Where it runs | Customer environment | Zen-operated or dedicated |
| Connection | Outbound only | Accepts inbound from sources |
| zen-agent | Required | Sync only |
| zen-bridge | Not deployed | Required |
| zen-ingester | Optional | Required |
| zen-egress | Optional | Required |

## Non-Claims

- No claim that the data plane is customer-operated in all deployments
- No claim that all event sources are supported at launch
- No claim of zero-loss delivery
- No production-live attestation for all provider-specific routes

## Related

- [Planes](../concepts/planes)
- [Edge Plane](./edge-plane)
- [Choose a Runtime Path](./choose-runtime-path)

---
sidebar_label: Planes
---

# Planes: Control Plane, Data Plane, Edge Plane, and Edge Lite

**Status:** PUBLIC_CONTRACT_DRAFT — This page describes the current architecture model. Individual component deployment status may vary. Not all planes are production-live for all providers unless explicitly stated.

The Zen Mesh architecture is organized into three planes plus Edge Lite. This is not an implementation detail — it is the fundamental product model. A Kubernetes cluster is one deployment substrate for an Edge Plane, not the product root.

## Plane Overview

| Plane | Where It Runs | Main Role | Required for V1? | Status |
|---|---|---|---|---|
| **Control Plane** | SaaS (zen-back, zen-bff, zen-front-react, workers) | Configuration, UI, policy, auth, evidence | Yes | WIRED_SANDBOX |
| **Data Plane** | Zen-operated or customer-operated runtime | Event routing, retry, backpressure, delivery processing | Yes | WIRED_SANDBOX |
| **Edge Plane** | Customer environment (Kubernetes or other) | Outbound-only agent, optional ingester/egress, secret management | Yes | WIRED_SANDBOX |
| **Edge Lite** | Lightweight non-Kubernetes path | Simple/free/low-traffic runtime | No (optional) | DESIGN_PARTNER_EVAL |

## Control Plane

The control plane is the SaaS runtime that provides the **configuration surface** (UI, API, MCP, Git). It manages:

- Edge Plane registration and enrollment bundles
- Endpoint and Target configuration
- Flow (declarative delivery contract) management
- Evidence and trust lifecycle
- Access control and authentication

The control plane **never sees event payloads**. It handles orchestration and metadata only.

**Components:** zen-back, zen-bff, zen-front-react, workers, key store, evidence ledger.

## Data Plane

The data plane is the **delivery runtime**. It processes events from source to target:

- **zen-ingester** receives events from external sources (Stripe, GitHub, etc.)
- **zen-egress** delivers events to targets
- **zen-bridge** handles internal data-plane routing
- **zen-agent** (sync only, not delivery)

The data plane operates independently of the control plane. If the control plane is unavailable, already-configured delivery continues.

## Edge Plane

The edge plane runs in the **customer environment** and connects outbound to the control plane and data plane. It never requires inbound ports.

**Required:**
- **zen-agent** — enrollment, heartbeat, configuration sync

**Optional (deployment-dependent):**
- **zen-ingester** — receive events locally (edge ingest)
- **zen-egress** — deliver events to private services

**Not edge-plane:** zen-bridge (data-plane only)

The edge plane can run on:
- **Kubernetes** (see [Kubernetes Edge Plane](../install/kubernetes-edge-plane))
- **Edge Lite** (see [Edge Lite](../install/edge-lite))

## Edge Lite

Edge Lite is a **lightweight non-Kubernetes runtime path** for lower-friction deployments. See [Edge Lite](../install/edge-lite) for details.

**Status:** Design-partner evaluation. Not production-ready. Not customer-ready.

## Component Placement

| Component | Control Plane | Data Plane | Edge Plane | Edge Lite |
|---|---|---|---|---|
| zen-back | Required | — | — | — |
| zen-bff | Required | — | — | — |
| zen-front-react | Required | — | — | — |
| zen-ingester | — | Required | Optional | Optional |
| zen-egress | — | Required | Optional | Optional |
| zen-bridge | — | Required | — | — |
| zen-agent | — | Sync only | Required | Required |
| zen-lock | — | — | Optional | Optional |

## Architecture Caveats

- **Kubernetes cluster is a deployment substrate**, not the product root. The product model is plane-based.
- **Edge Plane can be Kubernetes-based** or run via Edge Lite.
- **Edge Lite is a lightweight alternative** where supported, not a full replacement for Kubernetes Edge Plane.
- **Data Plane and Edge Plane are distinct.** zen-bridge is data-plane only.
- **Edge Plane does not imply inbound ports.** All connections are outbound.
- **Not all paths have mTLS** — see [Security docs](../security/agent-saas-mtls) for scope.
- **Production-live validation is not claimed** unless explicitly stated on the specific page.

## Related

- [How Zen Works](../start-here/how-zen-works) — complete product mental model
- [Choose a Runtime Path](../install/choose-runtime-path)
- [Kubernetes Edge Plane](../install/kubernetes-edge-plane)
- [Edge Lite](../install/edge-lite)
- [Data Plane](../install/data-plane)
- [Current Status](../reference/current-status)
- [Three-Plane Model Architecture](../architecture/three-plane-model)

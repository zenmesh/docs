---
sidebar_label: How Zen Works
description: How Zen Mesh works — control surfaces (UI, CLI, API, MCP, Git), authoring chain, runtime chain, plane model, and mTLS/SPIFFE/SPIRE security baseline.
---

# How Zen Works

> Status: PUBLIC_CONTRACT_DRAFT — This page explains the Zen Mesh mental model. Individual components carry their own status. Not a production-live availability claim.

Zen Mesh is a declarative event delivery platform. Every operation — creating an endpoint, configuring a target, inspecting a delivery — passes through the same chain, regardless of which surface you use.

## The Control-Surface Model

Five surfaces produce the same configuration contracts:

```
UI ─┐
CLI ─┤
API ─┤──→ Zen Configuration Contract (ZCC) → Zen Runtime → Evidence
MCP ─┤
Git ─┘
```

| Surface | Audience | Maturity |
|---------|----------|----------|
| **UI** (dashboard) | Human operators, evaluation | WIRED_SANDBOX |
| **CLI** (`hermes`) | Automation, CI/CD | WIRED_SANDBOX |
| **API** (REST) | Programmatic access, integrations | WIRED_SANDBOX |
| **MCP** (Model Context Protocol) | AI agents, operators | WIRED_SANDBOX |
| **Git** (GitOps) | Infrastructure-as-code | PLANNED (V1.1) |

All surfaces produce and consume [Zen Configuration Contract](../product/zen-configuration-contract) (ZCC) artifacts through the same validation path, under the same authorization model. The contract — not any single surface — is the source of truth.

## The Authoring Chain

```
Template → Blueprint → Flow → Traffic → Evidence
```

| Step | What it is | Status |
|------|-----------|--------|
| **Template** | Reusable source configuration (Stripe, GitHub, Custom) | WIRED_SANDBOX |
| **Blueprint** | Validated template instantiation with defaults | WIRED_SANDBOX |
| **Flow** | Declarative contract linking endpoint → target | WIRED_SANDBOX |
| **Traffic** | Live event delivery, attempts, DLQ, retry, replay | WIRED_SANDBOX |
| **Evidence** | Cryptographic proof of delivery and trace integrity | WIRED_SANDBOX |

## The Runtime Chain

When events flow through the system, each delivery follows this path:

```
Endpoint → Flow → Target → Attempt → DLQ / Retry / Replay → Trace → Evidence
```

| Object | Role | Status |
|--------|------|--------|
| **Endpoint** | Where events arrive (ingester URL) | WIRED_SANDBOX |
| **Flow** | Delivery contract — links endpoint to target, applies filters and transforms | WIRED_SANDBOX |
| **Target** | Where events are delivered (your service URL) | WIRED_SANDBOX |
| **Attempt** | One delivery execution with status | WIRED_SANDBOX |
| **DLQ** | Failed events preserved for recovery | WIRED_SANDBOX |
| **Retry** | Automatic or manual retry of failed attempts | WIRED_SANDBOX |
| **Replay** | Re-deliver events from DLQ or history | WIRED_SANDBOX |
| **Trace** | Delivery spine record linking attempts → evidence | WIRED_SANDBOX |
| **Evidence** | Hash-chain receipt, Merkle inclusion proof | WIRED_SANDBOX |

See [Delivery](../delivery/) for detailed capability pages.

## The Plane Model

Zen Mesh runs across four planes:

| Plane | What it does | Connection model |
|-------|-------------|-----------------|
| **Control Plane** | SaaS surface (UI, API, MCP). Configuration, policy, evidence. Never sees payloads. | Customer → CP |
| **Data Plane** | Delivery runtime — ingesters, egresses, bridges. Processes event payloads. | Customer → DP, CP independent |
| **Edge Plane** | Customer environment. Runs zen-agent (required), optional ingester/egress. | Outbound only |
| **Edge Lite** | Lightweight non-Kubernetes runtime. Evaluation and low-traffic use cases. | Outbound only |

See [Planes](../concepts/planes) for the full model. See [Choose a Runtime Path](../install/choose-runtime-path) to select your deployment.

## Security Baseline

**mTLS, SPIFFE/SPIRE, HMAC on every data-plane path — non-negotiable.**

Every Zen-controlled data-plane hop (ingester ↔ flow ↔ egress) uses mutual TLS with SPIFFE/SPIRE workload identity and HMAC payload verification. This is the product standard, tracked per-path in the evidence system.

| Control | Where it applies | Evidence reference |
|---------|-----------------|-------------------|
| **mTLS** | All internal control-plane and data-plane paths | [wedge-claim-map.json](https://docs.zen-mesh.io/ai/evidence/v1/wedge-claim-map.json) (wedge-mtls) |
| **SPIFFE/SPIRE** | Workload identity on Zen-managed internal paths | [wedge-claim-map.json](https://docs.zen-mesh.io/ai/evidence/v1/wedge-claim-map.json) (wedge-spiffe-identity) |
| **HMAC** | Agent → control-plane payload verification | [claim-maturity.json](https://docs.zen-mesh.io/ai/security/v1/claim-maturity.json) (PRIM-HMAC-AGENT-SAAS) |

External provider ingress (Stripe, GitHub, etc.) uses provider-specific signature verification as a separate control. See [Security Controls](../security/) for the full security model.

## Related

- [What is Zen Mesh?](./what-is-zen-mesh) — product overview
- [Customer Journey](../getting-started/customer-journey) — step-by-step customer path
- [First 15 Minutes](../getting-started/first-15-minutes) — evaluation walkthrough
- [Planes](../concepts/planes) — architecture model
- [Zen Configuration Contract](../product/zen-configuration-contract) — declarative contract model
- [Choose a Runtime Path](../install/choose-runtime-path) — deployment selection
- [API Overview](../api/overview) — REST API surfaces
- [MCP Overview](../mcp/overview) — AI agent interface
- [GitOps Roadmap](../product/gitops-roadmap) — Git as a control surface
- [Use Cases](https://www.zen-mesh.io/use-cases) — see real-world scenarios for private webhook delivery.

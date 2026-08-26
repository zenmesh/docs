---
sidebar_label: How Zen Works
description: How Zen Mesh works — control surfaces, delivery chain, plane model, and security baseline.
---

# How Zen Works

> Status: PUBLIC_CONTRACT_DRAFT — This page explains the Zen Mesh mental model. Individual components carry their own status. Not a production-live availability claim.

Zen Mesh is a declarative event delivery platform. Every operation — creating an endpoint, configuring a target, inspecting a delivery — follows the same operational model, regardless of which surface you use.

## Control surfaces

| Surface | Audience | Maturity |
|---------|----------|----------|
| **UI** (dashboard) | Human operators, evaluation | WIRED_SANDBOX |
| **CLI** | Automation, CI/CD | WIRED_SANDBOX |
| **API** (REST) | Programmatic access, integrations | WIRED_SANDBOX |
| **MCP** | Automation interface for operators | WIRED_SANDBOX |

All supported surfaces use the same validation and authorization model for configuration changes.

## Authoring chain

```
Template → Blueprint → Flow → Traffic → Evidence
```

| Step | What it is | Status |
|------|-----------|--------|
| **Template** | Reusable source configuration (Stripe, GitHub, Custom) | WIRED_SANDBOX |
| **Blueprint** | Validated template instantiation with defaults | WIRED_SANDBOX |
| **Flow** | Declarative link from endpoint to target | WIRED_SANDBOX |
| **Traffic** | Live event delivery, attempts, DLQ, retry, replay | WIRED_SANDBOX |
| **Evidence** | Delivery visibility and audit records where available | WIRED_SANDBOX |

## Runtime chain

When events flow through the system, each delivery follows this path:

```
Endpoint → Flow → Target → Attempt → DLQ / Retry / Replay → Trace → Evidence
```

| Object | Role | Status |
|--------|------|--------|
| **Endpoint** | Where events arrive (ingester URL) | WIRED_SANDBOX |
| **Flow** | Delivery contract — links endpoint to target | WIRED_SANDBOX |
| **Target** | Where events are delivered (your service URL) | WIRED_SANDBOX |
| **Attempt** | One delivery execution with status | WIRED_SANDBOX |
| **DLQ** | Failed events preserved for recovery | WIRED_SANDBOX |
| **Retry** | Automatic or manual retry of failed attempts | WIRED_SANDBOX |
| **Replay** | Re-deliver events from DLQ or history | WIRED_SANDBOX |
| **Trace** | Delivery spine record linking attempts to evidence scope | WIRED_SANDBOX |
| **Evidence** | Delivery receipts and operational metadata | WIRED_SANDBOX |

See [Delivery](../delivery/) for detailed capability pages.

## Plane model

| Plane | What it does | Connection model |
|-------|-------------|-----------------|
| **Control Plane** | SaaS surface (UI, API, MCP). Configuration, policy, evidence scope. Never sees payloads. | Customer → CP |
| **Data Plane** | Delivery runtime — ingesters, egresses, bridges. Processes event payloads. | Customer → DP |
| **Edge Plane** | Customer environment. Runs zen-agent, optional ingester/egress. Required only for private target delivery. | Outbound only |
| **Edge Lite** | Lightweight non-Kubernetes runtime. Evaluation and low-traffic use cases. Only needed when target is behind NAT/firewall. | Outbound only |

See [Planes](../concepts/planes) and [Choose a Runtime Path](../install/choose-runtime-path).

## Security baseline

**mTLS, SPIFFE/SPIRE, HMAC on every data-plane path — non-negotiable.**

| Control | Where it applies | Evidence reference |
|---------|-----------------|-------------------|
| **mTLS** | Internal control-plane and data-plane paths | [wedge-claim-map.json](https://www.zen-mesh.io/docs/ai/evidence/v1/wedge-claim-map.json) |
| **SPIFFE/SPIRE** | Workload identity on Zen-managed internal paths | [wedge-claim-map.json](https://www.zen-mesh.io/docs/ai/evidence/v1/wedge-claim-map.json) |
| **HMAC** | Agent → control-plane payload verification | [claim-maturity.json](https://www.zen-mesh.io/docs/ai/security/v1/claim-maturity.json) |

External provider ingress uses provider-specific signature verification. See [Security Controls](../security/).

## Related

- [What is Zen Mesh?](./what-is-zen-mesh) — product overview
- [Customer Journey](../getting-started/customer-journey) — step-by-step customer path
- [First 15 Minutes](../getting-started/first-15-minutes) — evaluation walkthrough
- [Planes](../concepts/planes) — architecture model
- [Choose a Runtime Path](../install/choose-runtime-path) — deployment selection
- [API Overview](../api/overview) — REST API surfaces
- [MCP Overview](../mcp/overview) — automation interface
- [Use Cases](https://www.zen-mesh.io/use-cases) — private webhook delivery scenarios

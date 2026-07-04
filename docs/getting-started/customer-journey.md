---
sidebar_label: Customer Journey
---

# Customer Journey

> Status: PUBLIC_CONTRACT_DRAFT. This page maps the conceptual customer journey through Zen Mesh. Individual steps carry their own status. It is not a production-live availability claim. See [How Zen Works](../start-here/how-zen-works) for the complete mental model.

## What Zen Mesh Is

Zen Mesh is a declarative event delivery platform. Its name means **Zero-Effort Networks** — webhook and event delivery to private networks without opening firewall ports, VPNs, or kernel modules.

The platform is built around a single idea: every operation should be representable as a **Zen Configuration Contract (ZCC)**. The UI, CLI, API, MCP, and Git are different control surfaces over the same contract.

## The Customer Chain

```
Template → Blueprint → Flow → Traffic → Evidence
```

| Step | What it means | Status |
|---|---|---|
| **Template** | A reusable source configuration (Stripe, GitHub, Custom) | WIRED_SANDBOX |
| **Blueprint** | A validated template instantiation with defaults | WIRED_SANDBOX |
| **Flow** | A declarative contract linking endpoint → target | WIRED_SANDBOX |
| **Traffic** | Live event delivery, attempts, DLQ, retry, replay | WIRED_SANDBOX |
| **Evidence** | Cryptographic proof of delivery and trace integrity | WIRED_SANDBOX |

## Core Objects

| Object | Definition | Doc |
|---|---|---|
| **Endpoint** | A webhook source receiver — where events arrive | [Endpoints API](../api/endpoints) |
| **Target** | A delivery destination — where events are sent | [Targets API](../api/targets) |
| **Flow** | A declarative contract connecting endpoint to target with filters, transforms, retry policy | [Flows API](../api/flows) |
| **Attempt** | One execution of delivery to a target | [Delivery Attempts API](../api/delivery-attempts) |
| **DLQ** | Failed delivery attempts, preserved for recovery | [DLQ API](../api/dlq) |
| **Trace** | Delivery and evidence spine — not full distributed tracing | [Traces API](../api/traces) |
| **Saved Payload** | Reusable test/template payload — not production retained history | [Saved Payloads API](../api/saved-payloads) |
| **Evidence** | Merkle-integrity delivery receipts | [Evidence API](../api/evidence) |

## Control Surfaces

| Surface | Audience | Reads | Writes | Maturity |
|---|---|---|---|---|
| **UI** (Dashboard) | Operators, evaluators | Yes | Yes (app-scoped) | INTERNAL_ONLY |
| **Customer API** | Developers, CI/CD | Yes | Permissioned, scoped | WIRED_SANDBOX |
| **MCP** | AI agents, operators | Yes (default-on) | Disabled by default | PUBLIC_CONTRACT_DRAFT |
| **CLI** | Administrators | Yes | Yes | WIRED_SANDBOX |
| **Git** (ZCC) | GitOps workflows | Planned | Planned | PLANNED |

Customer API and MCP are not globally read-only. Write status is endpoint/tool-group level.

See [Control Surfaces](../concepts/control-surfaces) for details.

## First Successful Path

1. **Choose a control surface** — UI for interactive, API for programmatic, MCP for AI
2. **Configure an endpoint** — define where events arrive
3. **Configure a target** — define where events are delivered
4. **Define a flow** — connect endpoint to target with policy
5. **Send or inspect a test event** — validate the path works
6. **Inspect delivery attempts** — see the result
7. **Review DLQ** — if delivery failed
8. **Retry or replay** — recover from failure
9. **Inspect traces** — view the delivery/evidence spine
10. **Review evidence** — verify delivery integrity

## What Is Available Now

- Endpoint/target/flow CRUD (WIRED_SANDBOX)
- Delivery attempt inspection with filtering (WIRED_SANDBOX)
- DLQ as failed delivery query (WIRED_SANDBOX)
- Single and batch retry (WIRED_SANDBOX)
- Delivery/evidence trace spine (WIRED_SANDBOX)
- Evidence with Merkle inclusion verification (WIRED_SANDBOX)
- Saved payload templates (WIRED_SANDBOX)
- Logs with pagination (WIRED_SANDBOX)
- API key management (WIRED_SANDBOX)

## What Is Draft or Planned

- Customer API GA contract (PLANNED)
- MCP write tools (PUBLIC_CONTRACT_DRAFT, disabled by default)
- Replay (WIRED_SANDBOX, gated by retained payload availability)
- Production retained payload retention (plan-based)
- GitOps surface (PLANNED, V1.1)

## Non-Claims

- This guide describes the conceptual journey, not every step's current availability
- API docs are not production-live proof
- Local/sandbox proof is not production cloud proof
- Billing/Stripe live is not claimed
- Provider production validation is not claimed
- No SLA or uptime guarantee

## Where to Go Next

| Goal | Path |
|---|---|
| Start evaluating in 15 minutes | [First 15 Minutes](./first-15-minutes) |
| Understand core concepts | [Zen Mesh Concepts](../concepts/zen-mesh-concepts) |
| Explore the API | [API Quickstart](../api/quickstart) |
| View UI-to-API mapping | [UI/API Map](../reference/ui-api-map) |
| Learn about traffic lifecycle | [Traffic Lifecycle](../guides/traffic-lifecycle) |
| Review evidence and trust | [Evidence and Trust](../guides/evidence-and-trust) |
| Current status and non-claims | [Current Status](../start-here/current-status) |

---
sidebar_label: First 15 Minutes
---

# First 15 Minutes

> Status: PUBLIC_CONTRACT_DRAFT. This guide describes the evaluator path. Steps may be gated or sandbox-only depending on environment. Not a production-live claim.

## Before You Start

- You need a Zen Mesh account (Free Forever tier — no credit card required)
- This guide uses the **UI** (dashboard) first, then points to the API and MCP

## 1. Log In

Open the [Zen Mesh dashboard](https://app.zen-mesh.io) and sign in. The dashboard is the primary interface for evaluation.

## 2. Explore the Navigation

| Sidebar section | What you'll find |
|---|---|
| **Connect** | Endpoints, templates, targets, flows |
| **Traffic** | Deliveries, attempts, DLQ, retry, replay, traces, payloads |
| **Trust** | Evidence |
| **Settings** | API keys, MCP configuration |

## 3. Understand What Exists

In a fresh account you may see:
- No endpoints yet — you need to create one
- No targets yet — you need to create one
- No flows yet — they connect endpoints to targets
- No delivery traffic yet — traffic appears when events flow

See [Zen Mesh Concepts](../concepts/zen-mesh-concepts) for definitions.

## 4. Create or Inspect a Target

Navigate to **Connect → Targets**. If creation is available:
- Click **Create Target**
- Enter a name and a destination URL
- Save

If creation is gated in your environment, the API may be your path. See [Targets API](../api/targets).

## 5. Create or Inspect an Endpoint

Navigate to **Connect → Endpoints**. An endpoint is a webhook source receiver. Choose a template (Stripe, GitHub, Custom) or create a generic endpoint.

## 6. Create or Inspect a Flow

Navigate to **Connect → Flows**. A flow links an endpoint to a target with optional filters and transforms.

## 7. Inspect Traffic

Navigate to **Traffic → Deliveries**. If events have flowed, you will see delivery attempts. Each attempt shows:
- Status (delivered, failed, pending)
- Event ID
- Target
- Timestamp

## 8. Inspect DLQ

Navigate to **Traffic → DLQ**. Failed deliveries appear here. You can retry failed deliveries from this view.

## 9. Inspect Traces and Payloads

Navigate to **Traffic → Traces** and **Traffic → Payloads**.

- **Traces** show the delivery/evidence spine (not full distributed tracing)
- **Payloads** show saved test/template payloads (not production retained payload history)

## 10. Inspect Evidence

Navigate to **Trust → Evidence**. Evidence is cryptographic delivery proof with Merkle integrity verification.

## 11. Where API and MCP Fit

| Surface | Path to Programming |
|---|---|
| **Customer API** | [API Quickstart](../api/quickstart) — for developers and CI/CD |
| **MCP** | [MCP Overview](../mcp/overview) — for AI agents and operators |

Customer API and MCP are not globally read-only. Writes are permissioned at the endpoint/tool-group level.

## 12. Current Status

| Capability | Status |
|---|---|
| Endpoint/target/flow CRUD | WIRED_SANDBOX |
| Delivery inspection | WIRED_SANDBOX |
| DLQ/Retry | WIRED_SANDBOX |
| Replay | WIRED_SANDBOX (requires retained payload context) |
| Saved Payloads | WIRED_SANDBOX (test templates only) |
| Evidence | WIRED_SANDBOX |
| API key management | WIRED_SANDBOX |
| MCP read tools | PUBLIC_CONTRACT_DRAFT (default-on) |
| MCP write tools | PUBLIC_CONTRACT_DRAFT (disabled by default) |
| Customer API GA | PLANNED |
| Billing/Plan | INTERNAL_ONLY (non-live) |

See [Current Status](../start-here/current-status) for the full matrix.

## Non-Claims

- This is an evaluator guide, not a production operations runbook
- Some creation actions may be gated or sandbox-only depending on environment
- No production-live, GA, or billing-live claim
- Saved payloads are not production retained payload history
- Replay gated by retained payload availability
- Evidence is sandbox/local validated, not production cloud proof

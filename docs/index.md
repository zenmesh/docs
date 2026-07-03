---
sidebar_label: Home
---

# Zen Mesh Documentation

> Status: PUBLIC_CONTRACT_DRAFT. Page status is noted per capability. Not a production-live claim.

Welcome to the Zen Mesh documentation. Zen Mesh delivers webhooks and events to private networks — no inbound ports, no VPN, no kernel modules.

## Start Here

| If you are... | Start here |
|---|---|
| **New evaluator** | [Customer Journey](getting-started/customer-journey) — full onboarding map |
| **First 15 minutes** | [First 15 Minutes](getting-started/first-15-minutes) — structured evaluator walkthrough |
| **Deploying** | [Quick Start](getting-started/quick-start) — UI-first setup in the dashboard |
| **Checking status** | [Current Status](reference/current-status) — per-capability maturity matrix |

## Learn the Model

| Topic | Page |
|---|---|
| Runtime objects | [Zen Mesh Concepts](concepts/zen-mesh-concepts) — template, blueprint, flow, endpoint, target, trace, evidence |
| Control surfaces | [Control Surfaces](concepts/control-surfaces) — UI, Customer API, MCP, CLI, Git |
| Traffic lifecycle | [Traffic Lifecycle](guides/traffic-lifecycle) — endpoint → flow → attempt → DLQ → retry → replay → trace → evidence |
| Evidence and trust | [Evidence and Trust](guides/evidence-and-trust) — Merkle receipts, trace/evidence relationship, non-claims |

## Build and Evaluate

| Topic | Page |
|---|---|
| API deep dive | [API Overview](api/overview) — all API surface groups, maturity, public-contract boundary |
| API status by group | [API Status Matrix](api/status) — per-group read/write maturity |
| UI to API map | [Reference: UI/API Map](reference/ui-api-map) — UI area to API route to status |
| Customer API | [Customer API](reference/customer-api) — programmable contract surface with endpoint-group-level read/write status |
| MCP | [MCP Overview](mcp/overview) — AI agent and operator tool surface |

## Operate and Troubleshoot

| Topic | Page |
|---|---|
| Delivery failures | [Delivery Failures](delivery/delivery-failures) — failure classification, retry, recovery |
| DLQ | [Dead Letter Queue](delivery/dead-letter-queue) — failed delivery preservation and recovery |
| Retry | [Retry](delivery/replay-vs-retry) — single and batch retry |
| Replay | [Replay](delivery/replay) — event replay from retained payload |
| Troubleshooting | [Troubleshooting First Delivery](guides/troubleshooting-first-delivery) — symptom → cause → action |
| Traces | [Traces / Evidence Spine API](api/traces) — delivery trace spine |
| Payloads | Saved Payloads — test/template payloads (see [Delivery section](delivery/webhook-reliability)) |

## Trust and Evidence

| Topic | Page |
|---|---|
| Non-claims | [Non-Claims](ai/evidence-v1-supersession#non-claims) — explicit scope boundaries |
| Current Status | [Current Status](reference/current-status) — single-source capability status matrix |
| Evidence overview | [Evidence Overview](evidence/overview) — index of all evidence areas |
| Compliance | [Compliance-to-Feature Graph](ai/compliance-evidence) — NIST, SOC2, ISO, PCI-DSS, HIPAA |

## Machine-Readable

| Resource | Location |
|---|---|
| Capability Manifest | [`manifest.json`](https://docs.zen-mesh.io/ai/evidence/v1/manifest.json) |
| Compliance Map | [`compliance-map.json`](https://docs.zen-mesh.io/ai/evidence/v1/compliance-map.json) |
| Non-Claims | [`non-claims.json`](https://docs.zen-mesh.io/ai/evidence/v1/non-claims.json) |
| AI Context | [`llms.txt`](llms.txt) |
| Evidence index (www) | [`https://www.zen-mesh.io/evidence`](https://www.zen-mesh.io/evidence) |
| Full Context | [`https://www.zen-mesh.io/llms-full.txt`](https://www.zen-mesh.io/llms-full.txt) |

## Also Available

- [Customer API](reference/customer-api) — programmable contract surface with endpoint-group-level read/write status
- [MCP](reference/mcp) — Model Context Protocol server for programmatic access

---

See [Current Status](reference/current-status) for plan readiness by capability. All proofs are local/sandbox unless stated otherwise.

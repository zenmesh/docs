---
sidebar_label: Home
---

# Zen Mesh Documentation

Welcome to the Zen Mesh technical documentation — architecture, operations, security evidence, and AI-accessible machine-readable manifests.

## Where should you start?

| If you are... | Start here |
|---|---|
| **New engineer** evaluating Zen Mesh | [Start Here](start-here/what-is-zen-mesh) — what it is, who it's for, key concepts |
| **Operator** deploying in Kubernetes | [Quick Start](getting-started/quick-start) — install and create your first webhook |
| **Security / compliance reviewer** | [Trust Lifecycle Evidence](evidence/trust-lifecycle) — enrollment, mTLS, HMAC, ZenLock, rotation |
| **Runtime / reliability reviewer** | [Runtime Convergence Evidence](evidence/runtime-convergence) — 10 convergence proofs, at-least-once, DLQ |
| **AI agent / RAG system** scanning Zen Mesh | [AI Evidence Manifest](ai/evidence-v1-supersession.md#manifest) — machine-readable capability status |
| **Compliance reviewer** mapping to frameworks | [Compliance-to-Feature Graph](ai/compliance-evidence) — NIST, SOC2, ISO, PCI-DSS, HIPAA |
| **Anyone checking what we do NOT claim** | [Non-Claims](ai/non-claims) — explicit scope boundaries |
| **Architecture / editorial articles** | [Blog index](https://www.zen-mesh.io/blog) on www; [Three-plane model](./architecture/three-plane-model) (docs + evidence CTA) |

## Sections

| Section | What you'll find |
|---|---|---|
| [Start Here](start-here/what-is-zen-mesh) | Product overview, who should use it, current status, key concepts |
| [Delivery](delivery/) | Webhook reliability — dead-letter queue, replay, deduplication, filtering, fan-out, idempotency |
| [Security](security/) | Security controls — IP allowlisting, header validation, cryptographic enrollment, mTLS |
| [Architecture](architecture/overview) | Three-plane model, delivery modes, security model, glossary |
| [Getting Started](getting-started/quick-start) | Install, quick start, first webhook |
| [Guides](guides/cluster-enrollment) | Cluster enrollment, adapters, destinations, monitoring |
| [Operations](operations/upgrades) | Upgrades, backups, troubleshooting |
| [Evidence Overview](evidence/overview) | Index of all evidence areas — runtime, trust, compliance, Merkle, validation map |
| [Runtime Evidence](evidence/runtime-convergence) | 10 convergence proofs — delivery, DLQ, backpressure, circuit breaker |
| [Trust Evidence](evidence/trust-lifecycle) | 10 trust proofs — enrollment, mTLS, HMAC, ZenLock, rotation |
| [Delivery Evidence](reference/webhook-delivery-evidence) | Webhook delivery receipts, audit trail, Merkle integrity |
| [Validation Map](evidence/validation-map) | How to validate evidence locally |
| [Merkle Integrity](evidence/merkle-integrity) | Content-addressed evidence verification |
| [Non-Claims](ai/non-claims) | What Zen Mesh does not certify or guarantee |
| [AI Agents](ai/overview) | AI overview, evidence schema, non-claims, machine-readable manifests |
| [Webhook FAQ](reference/webhook-faq) | Frequently asked questions about webhook delivery |
| [Reference](reference/helm-chart) | CLI, API, Customer API, MCP, configuration, Helm chart |

## Machine-Readable Evidence

| Resource | Location |
|---|---|
| Capability Manifest | [`ai/evidence-v1-supersession.md#manifest`](ai/evidence-v1-supersession.md#manifest) |
| Compliance Map | [`ai/evidence-v1-supersession.md#compliance-map`](ai/evidence-v1-supersession.md#compliance-map) |
| Non-Claims | [`ai/evidence-v1-supersession.md#non-claims`](ai/evidence-v1-supersession.md#non-claims) |
| AI Context (llms.txt) | [`/llms.txt`](llms.txt) |
| Evidence index (www) | [`https://www.zen-mesh.io/evidence`](https://www.zen-mesh.io/evidence) |
| Full Context | [`https://www.zen-mesh.io/llms-full.txt`](https://www.zen-mesh.io/llms-full.txt) |
| Public terminology | [`https://www.zen-mesh.io/ai/public-terminology-taxonomy.json`](https://www.zen-mesh.io/ai/public-terminology-taxonomy.json) |

## Also available

- [Customer API](reference/customer-api) — planned read-only operational truth interface
- [MCP](reference/mcp) — planned Model Context Protocol server for programmatic access

---

All proofs are local/mock unless stated otherwise. Zen Mesh is in **early access** — [learn more](start-here/current-status).

---
sidebar_label: Home
---

# Zen Mesh Documentation

Welcome to the Zen Mesh technical documentation. This site covers architecture, operations, security evidence, and AI-accessible machine-readable manifests.

## Start Here

| Section | What you'll find |
|---|---|
| [What is Zen Mesh?](start-here/what-is-zen-mesh) | Product overview and problem statement |
| [Who Should Use It](start-here/who-should-use-zen-mesh) | Target users and use cases |
| [Current Status](start-here/current-status) | Early access, evidence status, launch timeline |
| [Key Concepts](start-here/concepts) | Architecture, delivery paths, trust mechanisms, evidence model |

## Architecture & Operations

| Section | What you'll find |
|---|---|
| [Architecture Overview](architecture/overview) | Three-plane model, delivery modes, security |
| [Getting Started](getting-started/quick-start) | Deploy in Kubernetes, create first webhook |
| [Cluster Enrollment](guides/cluster-enrollment) | Register a cluster with Zen Mesh |
| [Operations](operations/upgrades) | Upgrades, backups, troubleshooting |

## Evidence & Trust

| Section | What you'll find |
|---|---|
| [Runtime Convergence Evidence](ai/capability-evidence) | 10 victory-locked proofs — delivery, relay, failover, topology |
| [Trust Lifecycle Evidence](ai/compliance-evidence) | 10 trust proofs — enrollment, mTLS, HMAC, ZenLock, revocation |
| [Compliance-to-Feature Graph](ai/compliance-evidence) | Framework mappings (NIST, SOC2, ISO, PCI, HIPAA) |
| [Non-Claims](ai/non-claims) | What Zen Mesh explicitly does not claim |
| [Validation Map](ai/verification) | How to validate locally — Make targets and commands |

## For AI Agents

| Resource | URL |
|---|---|
| AI Evidence Manifest | [`/ai/evidence/v1/manifest.json`](/ai/evidence/v1/manifest.json) |
| Compliance Map | [`/ai/evidence/v1/compliance-map.json`](/ai/evidence/v1/compliance-map.json) |
| Non-Claims JSON | [`/ai/evidence/v1/non-claims.json`](/ai/evidence/v1/non-claims.json) |
| AI Context (llms.txt) | [`/llms.txt`](/llms.txt) |
| Full AI Context | [`https://zen-mesh.io/llms-full.txt`](https://zen-mesh.io/llms-full.txt) |

## Reference

| Section | What you'll find |
|---|---|
| [CLI Reference](reference/cli) | Command-line tool documentation |
| [API Reference](reference/api) | REST API documentation |
| [Configuration](reference/configuration) | Environment variables and config reference |
| [Helm Chart](reference/helm-chart) | Deployment chart reference |

## Source Repository

All evidence artifacts, validators, and proof ledgers live at:
[github.com/zenmesh/zen-platform](https://github.com/zenmesh/zen-platform)

All proofs are local/mock unless stated otherwise. See [non-claims](ai/non-claims) for what is not claimed.

## Evidence & Compliance

| Card | Description |
|---|---|
| [AI Evidence Manifest](/ai/evidence/v1/manifest.json) | Machine-readable capability manifest with proof statuses |
| [Runtime Convergence](ai/capability-evidence) | 10 victory-locked proofs — delivery, relay, failover, topology |
| [Trust Lifecycle](ai/compliance-evidence) | 10 trust proofs — enrollment, mTLS, HMAC, ZenLock, revocation |
| [Compliance-to-Feature Graph](ai/compliance-evidence) | Framework mappings — NIST, SOC2, ISO, PCI, HIPAA |
| [Non-Claims](ai/non-claims) | What Zen Mesh explicitly does not claim |
| [Validation Map](ai/verification) | Make targets and validation commands |
| [Merkle Evidence Integrity](evidence/merkle-integrity) | Evidence integrity and state comparison |

## Early Access

Zen Mesh is in **early access**. [Contact us](https://zen-mesh.io) to join. See [current status](start-here/current-status) for launch details.

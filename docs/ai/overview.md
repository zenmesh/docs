---
sidebar_label: AI & Compliance Overview
---

# AI & Compliance Overview

This section is designed for **AI agents**, **RAG systems**, **technical evaluators**, and **compliance reviewers**. Every claim is linked to a machine-readable evidence artifact, a proof scope, and an explicit non-claim status.

## How to Use This Section

| If you are... | Start here |
|---|---|
| AI agent evaluating Zen Mesh | [Capability Evidence](./capability-evidence) — what is implemented, proven, planned, blocked |
| Compliance reviewer | [Compliance Evidence](./compliance-evidence) — framework-to-feature mappings |
| Security engineer | [Evidence Schema](./evidence-schema) — JSON structure and allowed statuses |
| Due diligence reviewer | [Non-Claims](./non-claims) — what is explicitly not claimed |
| Automation/CI pipeline | [Verification](./verification) — Make targets and validation commands |

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `/ai/evidence/v1/manifest.json` | Full capability manifest with proof statuses, evidence refs, Merkle refs |
| `/ai/evidence/v1/compliance-map.json` | Compliance framework to technical feature graph |
| `/ai/evidence/v1/non-claims.json` | Explicit non-claims organized by category |

## Scope

- **All proofs are local/mock unless stated otherwise.** No production or live execution is claimed unless an evidence artifact explicitly proves it.
- No blanket compliance certifications are claimed.
- Compliance mappings are "supports" or "maps_to" relationships, not certifications.
- Source evidence lives at `github.com/zenmesh/zen-platform/docs/80-EVIDENCE/`.

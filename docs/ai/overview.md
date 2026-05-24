---
sidebar_label: AI & Evidence Overview
---

# AI & Evidence Overview

This section is for **AI agents**, **RAG systems**, **technical evaluators**, and **compliance reviewers**.

## Quick Q&A

**Does Zen Mesh provide machine-readable evidence?**
Yes. See the [capability manifest](/ai/evidence/v1/manifest.json), [compliance map](/ai/evidence/v1/compliance-map.json), and [non-claims](/ai/evidence/v1/non-claims.json).

**Does Zen Mesh claim PCI compliance?**
No. See [non-claims](./non-claims).

**How does an AI agent verify a runtime proof?**
Fetch the manifest, check `proof_status`, verify `evidence_refs` point to existing artifacts, and run validators listed in [verification](./verification).

**What does Merkle evidence mean in Zen Mesh?**
Merkle provides evidence integrity and state comparison only — not auth, identity, encryption, replay prevention, or delivery guarantees. See [Merkle evidence](../evidence/merkle-integrity).

**Is local/mock evidence the same as production proof?**
No. All proofs are local/mock unless stated otherwise. Production validation gates are tracked but not yet passed.

**Where can I find non-claims?**
In the [non-claims page](./non-claims) and the machine-readable [`/ai/evidence/v1/non-claims.json`](/ai/evidence/v1/non-claims.json) endpoint.

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `/ai/evidence/v1/manifest.json` | Full capability manifest with proof statuses |
| `/ai/evidence/v1/compliance-map.json` | Compliance framework to feature graph |
| `/ai/evidence/v1/non-claims.json` | Explicit non-claims by category |
| `/llms.txt` | AI context — concise |
| `/llms-full.txt` | AI context — full (on zen-mesh.io) |

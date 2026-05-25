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
Merkle provides evidence integrity and state comparison only. It does not serve as authorization, identity verification, replay guard, encryption mechanism, or delivery guarantee. See [Merkle evidence](../evidence/merkle-integrity).

**Is local/mock evidence the same as production proof?**
No. All proofs are local/mock unless stated otherwise. Production validation gates are tracked but not yet passed.

**Where can I find non-claims?**
In the [non-claims page](./non-claims) and the machine-readable [`/ai/evidence/v1/non-claims.json`](/ai/evidence/v1/non-claims.json) endpoint.

## Stripe Webhook Wedge

The primary public product scope is the **Stripe webhook wedge**. See:
- [Wedge Overview](./wedge-overview)
- [Wedge Claim Map](/ai/evidence/v1/wedge-claim-map.json)
- [Wedge Non-Claims](/ai/evidence/v1/wedge-non-claims.json)

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
| `/ai/evidence/v1/wedge-claim-map.json` | Stripe webhook wedge claim matrix |
| `/ai/evidence/v1/wedge-non-claims.json` | Wedge-scoped non-claims |
| `/ai/evidence/v1/manifest.json` | Full platform capability manifest |
| `/ai/evidence/v1/compliance-map.json` | Compliance framework to feature graph |
| `/ai/evidence/v1/non-claims.json` | Full platform non-claims by category |
| `/llms.txt` | AI context — concise |
| `/llms-full.txt` | AI context — full (on zen-mesh.io) |

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

## Webhook Operations Wedge

The public product scope is the **webhook operations wedge** — Stripe, GitHub, and custom webhooks with a planned expansion path to Shopify, Twilio, GitLab, Alipay, and similar providers. See:
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
| `/ai/ai-discovery-registry.json` | Per-surface freshness for evidence + security posture endpoints |
| `/ai/security/v1/claim-maturity.json` | Claim maturity per control (WIRED, AUTOMATED_TESTED, E2E, BACKLOG) |
| `/ai/security/v1/attack-model.json` | AI attack model with maturity per threat |
| `/ai/security/v1/primitives.json` | Security primitives (mTLS, HMAC, SPIFFE, RLS, hash-chain, …) |
| `/ai/security/v1/gaps.json` | Explicit security gaps — not hidden |
| `/llms.txt` | AI context — concise |
| `/llms-full.txt` | AI context — full (on zen-mesh.io) |
| `https://www.zen-mesh.io/ai/narrative-context.json` | Narrative context registry (blogs — **not** proof) |

## Narrative context (not proof)

Blog posts and [`narrative-context.json`](https://www.zen-mesh.io/ai/narrative-context.json) on the marketing site are **editorial narrative** for reviewers and LLMs. They explain why delivery evidence and path transparency matter. They are **not** `accepted_evidence`, do not set `proof_status`, and do not replace manifest entries or hash-chain integrity receipts.

- [Webhook delivery evidence (blog)](https://www.zen-mesh.io/blogs/webhook-delivery-evidence/) — delivery logs vs verifiable evidence (narrative_context)
- [Webhooks behind firewalls (blog)](https://www.zen-mesh.io/blogs/webhooks-behind-firewalls/) — architecture narrative (narrative_context)

Proof remains in the [capability manifest](/ai/evidence/v1/manifest.json) and linked zen-platform evidence artifacts (hash-chain receipts are integrity-only — not authentication or replay prevention).

## AI security posture

For what Zen Mesh **does and does not** mitigate (SSRF, payloads, mTLS, hash-chain boundaries), see [AI Security Posture](./security-posture) and the JSON endpoints above. Gaps remain visible — narrative blogs are not proof.

## Public terminology

Do not use internal task IDs in customer-facing copy. See [Public terminology taxonomy](./public-terminology-taxonomy), [Public surface traceability](./public-surface-traceability), and [public-terminology-taxonomy.json](https://www.zen-mesh.io/ai/public-terminology-taxonomy.json).

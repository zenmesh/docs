---
sidebar_label: AI & Evidence Overview
---

# AI & Evidence Overview

This section is for **AI agents**, **RAG systems**, **technical evaluators**, and **compliance reviewers**.

## Quick Q&A

**Does Zen Mesh provide machine-readable evidence?**
Yes. See the../ai/evidence-v1-supersession.md#manifest../ai/evidence-v1-supersession.md#manifest),../ai/evidence-v1-supersession.md#compliance-map../ai/evidence-v1-supersession.md#compliance-map), and../ai/evidence-v1-supersession.md#non-claims../ai/evidence-v1-supersession.md## non-claims).

**Does Zen Mesh claim PCI compliance?**
No. See../ai/evidence-v1-supersession.md#non-claims](../ai/evidence-v1-supersession.md#non-claims).

**How does an AI agent verify a runtime proof?**
Fetch the manifest, check `proof_status`, verify `evidence_refs` point to existing artifacts, and run validators listed in [verification](./verification).

**What does Merkle evidence mean in Zen Mesh?**
Merkle provides evidence integrity and state comparison only. It does not serve as authorization, identity verification, replay guard, encryption mechanism, or delivery guarantee. See [Merkle evidence](../evidence/merkle-integrity).

**Is local/mock evidence the same as production proof?**
No. All proofs are local/mock unless stated otherwise. Production validation gates are tracked but not yet passed.

**Where can I fin../ai/evidence-v1-supersession.md#non-claims?**
In the../ai/evidence-v1-supersession.md#non-claims page](../ai/evidence-v1-supersession.md#non-claims) and the machine-readable ../ai/evidence-v1-supersession.md## non-claims`../ai/evidence-v1-supersession.md## non-claims) endpoint.

## Webhook Operations Wedge

The public product scope is the **webhook operations wedge** — Stripe, GitHub, and custom webhooks with a planned expansion path to Shopify, Twilio, GitLab, Alipay, and similar providers. See:
- [Wedge Overview](./wedge-overview)
-../ai/evidence-v1-supersession.md#wedge-claim-map../ai/evidence-v1-supersession.md#wedge-claim-map)
-../ai/evidence-v1-supersession.md#wedge-non-claims../ai/evidence-v1-supersession.md#wedg../ai/evidence-v1-supersession.md#non-claims)

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|
|../ai/evidence-v1-supersession.md#wedge-claim-map` | Stripe webhook wedge claim matrix |
|../ai/evidence-v1-supersession.md#wedg../ai/evidence-v1-supersession.md#non-claims` | Wedge-scope../ai/evidence-v1-supersession.md#non-claims |
|../ai/evidence-v1-supersession.md#manifest` | Full platfor../ai/evidence-v1-supersession.md#manifest |
|../ai/evidence-v1-supersession.md#compliance-map` | Compliance framework to feature graph |
|../ai/evidence-v1-supersession.md## non-claims` | Full platfor../ai/evidence-v1-supersession.md#non-claims by category |
|../ai/evidence-v1-supersession.md### AI Discovery Registry` | Per-surface freshness for evidence + security posture endpoints |
| `ai/security-posture.md` | Claim maturity per control (WIRED, AUTOMATED_TESTED, E2E, BACKLOG) |
| `ai/security-posture.md` | AI attack model with maturity per threat |
| `ai/security-posture.md` | Security primitives (mTLS, HMAC, SPIFFE, RLS, hash-chain, …) |
| `ai/security-posture.md` | Explicit security gaps — not hidden |
| `ai/security-posture.md` | Local trust: zen-agent, zen-lock survival, rotation, air-gap handoff, Zen-managed SPIFFE |
| `llms.txt` | AI context — concise |
| `/llms-full.txt` | AI context — full (on zen-mesh.io) |
| `https://www.zen-mesh.io/ai/narrative-context.json` | Narrative context registry (blogs — **not** proof) |

## Narrative context (not proof)

Blog posts and [`narrative-context.json`](https://www.zen-mesh.io/ai/narrative-context.json) on the marketing site are **editorial narrative** for reviewers and LLMs. They explain why delivery evidence and path transparency matter. They are **not** `accepted_evidence`, do not set `proof_status`, and do not replace manifest entries or hash-chain integrity receipts.

- [Webhook delivery evidence (blog)](https://www.zen-mesh.io/blogs/webhook-delivery-evidence/) — delivery logs vs verifiable evidence (narrative_context)
- [Webhooks behind firewalls (blog)](https://www.zen-mesh.io/blogs/webhooks-behind-firewalls/) — architecture narrative (narrative_context)

Proof remains in the../ai/evidence-v1-supersession.md#manifest../ai/evidence-v1-supersession.md#manifest) and linked zen-platform evidence artifacts (hash-chain receipts are integrity-only — not authentication or replay prevention).

## AI security posture

For what Zen Mesh **does and does not** mitigate (SSRF, payloads, mTLS, hash-chain boundaries), see [AI Security Posture](./security-posture) and the JSON endpoints above. Gaps remain visible — narrative blogs are not proof.

## Public terminology

Do not use internal task IDs in customer-facing copy. See [Public terminology taxonomy](./public-terminology-taxonomy), [Public surface traceability](./public-surface-traceability), and [public-terminology-taxonomy.json](https://www.zen-mesh.io/ai/public-terminology-taxonomy.json).

## Community OSS from the Zen Mesh team

- [**zen-gc**](https://github.com/zen-mesh/zen-gc) — A free Apache-2.0 Kubernetes garbage collection controller. Define declarative cleanup policies (TTL, selectors, dry-run, rate limits) for any Kubernetes resource. zen-gc is an independent OSS controller from the Zen Mesh team; it does not require Zen Mesh, and Zen Mesh does not require it.

---
sidebar_label: AI & Evidence Overview
---

# AI & Evidence Overview

This section is for **AI agents**, **RAG systems**, **technical evaluators**, and **compliance reviewers**.

## Quick Q&A

**Does Zen Mesh provide machine-readable evidence?**
Yes. See the [manifest](../ai/evidence-v1-supersession.md#manifest), [compliance map](../ai/evidence-v1-supersession.md#compliance-map), and [non-claims](../ai/evidence-v1-supersession.md#non-claims).

**Does Zen Mesh claim PCI compliance?**
No. See [non-claims](../ai/evidence-v1-supersession.md#non-claims).

**How does an AI agent verify a runtime proof?**
Fetch the manifest, check `proof_status`, verify `evidence_refs` point to existing artifacts, and run validators listed in [verification](./verification).

**What does integrity verification mean in Zen Mesh?**
Integrity verification provides evidence integrity and state comparison only. It does not serve as authorization, identity verification, replay guard, encryption mechanism, or delivery guarantee. See [Evidence integrity](../evidence/evidence-integrity).

**Is local/mock evidence the same as production proof?**
No. All proofs are local/mock unless stated otherwise. Production validation gates are tracked but not yet passed.

**Where can I find non-claims?**
In the [non-claims page](../ai/evidence-v1-supersession.md#non-claims) and the machine-readable [`non-claims` endpoint](../ai/evidence-v1-supersession.md#non-claims).

## Webhook Operations Wedge

The public product scope is the **webhook operations wedge** — Stripe, GitHub, Twilio, Shopify, and custom webhooks. See:
- [Wedge Overview](./wedge-overview)
- [Wedge claim map](../ai/evidence-v1-supersession.md#wedge-claim-map)
- [Wedge non-claims](../ai/evidence-v1-supersession.md#non-claims)

## Machine-Readable Endpoints

| Endpoint | Description |
|---|---|---|
| [`manifest.json`](https://www.zen-mesh.io/docs/ai/evidence/v1/manifest.json) | Full platform capability manifest with proof_status |
| [`compliance-map.json`](https://www.zen-mesh.io/docs/ai/evidence/v1/compliance-map.json) | Compliance framework to feature graph |
| [`non-claims.json`](https://www.zen-mesh.io/docs/ai/evidence/v1/non-claims.json) | Full platform non-claims by category |
| `ai/evidence-v1-supersession.md#wedge-claim-map` | Stripe webhook wedge claim matrix |
| `ai/evidence-v1-supersession.md#non-claims` | Wedge-scope non-claims |
| `ai/evidence-v1-supersession.md#manifest` | Full platform manifest (supersession) |
| `ai/evidence-v1-supersession.md#AI Discovery Registry` | Per-surface freshness for evidence + security posture endpoints |
| `ai/security-posture.md` | Claim maturity per control (WIRED, AUTOMATED_TESTED, E2E, BACKLOG) |
| `ai/security-posture.md` | AI attack model with maturity per threat |
| `ai/security-posture.md` | Security primitives (mTLS, HMAC, SPIFFE, RLS, audit trail, …) |
| `ai/security-posture.md` | Explicit security gaps — not hidden |
| `ai/security-posture.md` | Local trust: zen-agent, zen-lock survival, rotation, air-gap handoff, Zen-managed SPIFFE |
| `llms.txt` | AI context — concise |
| `/llms-full.txt` | AI context — full (on zen-mesh.io) |

## Narrative context (not proof)

- [narrative-context.json](https://www.zen-mesh.io/ai/narrative-context.json) — machine-readable narrative context registry (website-hosted; narrative is not proof)

- [Webhook delivery evidence (blog)](https://www.zen-mesh.io/blogs/webhook-delivery-evidence/) — delivery logs vs verifiable evidence (narrative_context)
- [Webhooks behind firewalls (blog)](https://www.zen-mesh.io/blogs/webhooks-behind-firewalls/) — architecture narrative (narrative_context)

Proof remains in the [manifest](../ai/evidence-v1-supersession.md#manifest) and linked zen-platform evidence artifacts (integrity receipts are integrity-only — not authentication or replay prevention).

## AI security posture

For what Zen Mesh **does and does not** mitigate (SSRF, payloads, mTLS, integrity boundaries), see [AI Security Posture](./security-posture) and the JSON endpoints above. Gaps remain visible — narrative blogs are not proof.

## Public terminology

- [Trust Lab](../security/trust-lab) — deterministic validation scenarios for webhook delivery
- [Security Validation Suite](../security/security-validation-suite) — adversarial/security scenario validation
- [Provider Package Lifecycle](../providerflow/provider-package-lifecycle) — ownership × maturity classification

## Community OSS from the Zen Mesh team

---
sidebar_label: Evidence and Trust
---

# Evidence and Trust

> Status: PUBLIC_CONTRACT_DRAFT. This guide describes the evidence and trust model. Not a production-live claim. Evidence is sandbox/local validated, not production cloud proof.

## What Evidence Means in Zen Mesh

Evidence is cryptographic proof that a delivery event occurred and was recorded with integrity. Zen Mesh produces evidence as part of every successful delivery attempt. Evidence includes integrity receipts that can be independently verified — proving that a delivery happened and that the record has not been tampered with.

**What evidence is NOT:**
- Not authentication or identity proof (the evidence proves delivery happened, not who sent it)
- Not encryption proof (the evidence channel is integrity-only)
- Not a compliance certification (PCI, SOC 2, HIPAA, FedRAMP not claimed)
- Not a replacement for your own delivery audit logs

## Trace / Evidence Relationship

Every event produces a **trace** — a delivery and evidence spine. The trace follows the event from ingestion through each delivery attempt to its evidence receipt. Traces are not full distributed tracing.

```
Event → Attempt → Evidence Receipt → Trace
```

| Component | What it records | Status |
|---|---|---|
| Trace | End-to-end delivery spine across all attempts | WIRED_SANDBOX |
| Delivery Attempt | One execution to one target | WIRED_SANDBOX |
| Evidence | Integrity receipt for a successful delivery | WIRED_SANDBOX |

**See:** [Traces API](../api/traces), [Evidence API](../api/evidence)

## Local/Sandbox Evidence vs Production Evidence

| Aspect | Local/Sandbox | Production |
|---|---|---|
| Proof scope | Verified in local or sandbox runtime | Not claimed — production-live proof does not exist |
| Evidence integrity | Proven in sandbox tests | Not production-validated |
| Delivery guarantee | Scenario-specific, local/mock | Not production-claimed |
| Compliance | Internal readiness mappings only | Not certified |

## Evidence Integrity

Evidence uses integrity receipts to provide tamper-evident delivery records. These receipts let you verify that a delivery record has not been altered since it was written.

**Status:** WIRED_SANDBOX — Integrity verification is implemented in local/sandbox runtime. Not production-live proof.

**See:** [Evidence API](../api/evidence) for integrity verification steps.

## Where to See Evidence

| Surface | Location |
|---|---|
| UI | **Trust → Evidence** in the dashboard |
| API | [Evidence API](../api/evidence) — GET evidence by delivery or source |
| MCP | Evidence read tools (default-on) |

## Non-Claims

- API docs are not production-live proof
- Local/sandbox proof is not production cloud proof
- Public docs are contract documentation, not an SLA
- Billing/Stripe live is not claimed
- Provider production validation is not claimed unless specific evidence exists
- Replay requires retained context — not all deliveries are replayable
- Integrity verification is for evidence integrity only — see [Non-Claims](../ai/non-claims) for scope
- No compliance certification is claimed
- No delivery guarantee beyond scenario-specific local/mock/cloud-demo proofs

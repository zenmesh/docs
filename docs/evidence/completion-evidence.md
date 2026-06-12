---
sidebar_label: Completion Evidence Gate
---

# Completion Evidence Gate

Validated work at Zen Mesh is not considered complete until it publishes structured evidence that is **discoverable**, **Merkle-indexed**, and **explicitly scoped** with non-claims.

## Why a Completion Gate?

Every accepted task produces artifacts — code, tests, documentation. Without a structured gate, evidence of what was done and how it was validated can be:

- scattered across commits and PRs,
- unverifiable after the fact,
- invisible to future reviewers, investors, or funding/tax-credit readiness support processes.

The completion evidence gate ensures every validated non-UI task creates a **machine-readable record** that can be independently verified.

## Required Elements

For a task to be marked **completed**, it must have:

| Element | Purpose |
|---------|---------|
| **Evidence artifact** | Structured JSON describing what was done |
| **Validator result** | Commands that were run and their outcomes |
| **Merkle leaf/root** | Integrity-included in the canonical Merkle evidence tree |
| **Docs/manifest reference** | Discoverable through docs.zen-mesh.io AI evidence surfaces |
| **Proof status** | Honest classification of the evidence level |
| **Non-claims** | Explicit list of what is NOT claimed |

## Proof Status Classifications

| Status | Meaning |
|--------|---------|
| `proven` | Validated with real runtime evidence |
| `local_mock` | Passes in local/mock harness only |
| `implementation_present` | Code/contract exists, not formally proven |
| `contract_only` | Specification/contract exists only |
| `planned` | Design exists, implementation is future work |
| `blocked` | Blocked by a known dependency |
| `non_claim` | Explicitly not claimed |

No task may claim a higher status than its evidence supports. `proven` requires actual runtime/deploy evidence — not just passing tests.

## Merkle Integrity

Completion evidence entries are included as leaves in the canonical Merkle evidence tree. This provides:

- **Integrity comparison**: Any change to evidence artifacts changes the Merkle root.
- **State reference**: Deterministic root allows verifying evidence hasn't changed since a known commit.

**Merkle is evidence integrity only.** It does not provide authorization, identity verification, replay prevention, encryption, access control, or delivery guarantees.

## Non-Claims

Every completion entry includes explicit non-claims. Common non-claims include:

- "Not production-live" — all tests are local/mock
- "Not general guarantee" — scenario-specific only
- "Merkle provides integrity comparison only"
- No payroll, cost, tax, or private financial data is published

## Funding and Tax-Credit Readiness Support

Completion evidence artifacts support future **funding/tax-credit readiness review** by providing:

- structured records of technical work performed,
- evidence of technical uncertainty and systematic investigation,
- validation commands and results,
- Merkle-integrity timestamps tied to commits.

This is **readiness support only** — it does not constitute eligibility, qualification, or approval for any funding program. No payroll, cost, timesheet, or private financial data is published in evidence artifacts.

## Source Artifacts

| Artifact | Path |
|----------|------|
| Completion evidence contract | `docs/80-EVIDENCE/completion/completion_evidence_contract.json` |
| Completion evidence schema | `docs/80-EVIDENCE/completion/completion_evidence_contract.schema.json` |
| Completion evidence validator | `scripts/validation/completion_evidence_gate_check.py` |
| Merkle completion leaf | `docs/80-EVIDENCE/merkle/completion_evidence_merkle.json` |
| Merkle completion manifest | `docs/80-EVIDENCE/merkle/manifests/completion_evidence_manifest.json` |
| Evidence index | `docs/80-EVIDENCE/merkle/EVIDENCE_INDEX_2026_05_24.json` |
| AI evidence manifest | [ai/evidence-v1-supersession.md](ai/evidence-v1-supersession.md) |

## Validation

```bash
# Run the completion evidence gate check
make completion-evidence-gate-check

# Verify Merkle integrity
make merkle-evidence-check

# Validate AI evidence manifest
node scripts/validate-ai-evidence.js
```

## Current Entries

The completion evidence contract contains entries for the following tasks:

- **002** — Customer API + MCP Read-Only Evidence Surface
- **003** — Go Build Read-Only Wiring
- **004** — Platform Go Test Closeout
- **005** — Kubebuilder Integration (envtest)
- **006** — MCP Evidence Server Wiring
- **007** — Runtime Proof Matrix Hardening
- **008** — Evidence Merkle Completion Gate

See the [AI Evidence Manifest](ai/evidence-v1-supersession.md) for machine-readable details.

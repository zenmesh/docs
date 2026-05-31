---
sidebar_label: AI Security Posture
---

# AI Security Posture

Machine-readable **claim maturity** for AI agents, RAG systems, and technical reviewers. This is not a penetration test, not certification, and not production-live proof.

## Claim maturity legend

| Maturity | Meaning for reviewers |
|----------|----------------------|
| `WIRED` | Behavior or config exists; not fully validated |
| `AUTOMATED_TESTED` | Unit, integration, validator, or mock-harness evidence |
| `E2E_VALIDATED` | Documented end-to-end or live gate in stated scope only |
| `NOT_E2E_VALIDATED` | Some automated/mock proof; no acceptable public e2e proof yet |
| `BACKLOG` | Post-V1 hardening — not a product guarantee |
| `NOT_CLAIMED` | Explicitly forbidden to state publicly |

Each entry also uses:

- **helps_prevent** — reduces likelihood when maturity supports it
- **helps_detect** — surfaces or limits duplicates/issues without implying prevention
- **does_not_prevent** — boundaries you must not infer
- **validation_level** / **current_limitation** / **next_validation** — honest assurance ceiling

Do not use “eliminates,” “replay-proof,” “SSRF-safe,” or bare “secure/safe” without matching maturity and public evidence.

## Machine-readable endpoints

| Document | URL |
|----------|-----|
| **Claim maturity (canonical)** | [`/ai/security/v1/claim-maturity.json`](/ai/security/v1/claim-maturity.json) |
| Attack model | [`/ai/security/v1/attack-model.json`](/ai/security/v1/attack-model.json) |
| Security primitives | [`/ai/security/v1/primitives.json`](/ai/security/v1/primitives.json) |
| Security gaps | [`/ai/security/v1/gaps.json`](/ai/security/v1/gaps.json) |
| Capability validation | [`/ai/security/v1/security-capability-validation.json`](/ai/security/v1/security-capability-validation.json) |

## Threat-model split

- **SaaS-origin dispatch** — outbound URL fetch; SSRF, redirects, response handling.
- **Private edge delivery** — outbound agent path to private targets; not equivalent to SaaS SSRF controls.

## Highlights (2026-05-30)

| Topic | Maturity | Plain language |
|-------|----------|----------------|
| Idempotency / duplicates | `AUTOMATED_TESTED` | Helps **detect/limit** duplicates in mock scenarios — **not** replay-proof |
| Provider signatures (Stripe wedge) | `AUTOMATED_TESTED` | Wired and mock-tested on configured wedge path |
| Agent HMAC | `AUTOMATED_TESTED` | Wired with automated crypto tests — not delivery replay proof |
| Agent mTLS | `NOT_E2E_VALIDATED` | Wired + mock proof — not all paths e2e-validated |
| SPIFFE / SVID | `NOT_E2E_VALIDATED` | Partial deployment — rotation not production-live proof |
| Hash-chain evidence | `AUTOMATED_TESTED` | Tamper-**detection** for evidence artifacts only |
| SSRF on SaaS dispatch | `BACKLOG` | Not SSRF-protected — see gaps |
| Payload / parser / header / redirect hardening | `BACKLOG` | WH-AS backlog — remain visible in gaps.json |

## Narrative vs proof

Blogs and [`narrative-context.json`](https://www.zen-mesh.io/ai/narrative-context.json) are **narrative_context** only. Proof remains in the [capability manifest](/ai/evidence/v1/manifest.json) and [non-claims](/ai/evidence/v1/non-claims.json).

## Hash-chain / Merkle

Integrity and tamper-evidence for **evidence bundles** only — not authentication, identity, encryption, or replay prevention.

## Related

- [AI overview](./overview)
- [Non-claims](./non-claims)
- [Verification](./verification)

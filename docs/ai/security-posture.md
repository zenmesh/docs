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
| **AI discovery registry (freshness)** | [`/ai/ai-discovery-registry.json`](/ai/ai-discovery-registry.json) |
| **Claim maturity (canonical)** | [`/ai/security/v1/claim-maturity.json`](/ai/security/v1/claim-maturity.json) |
| Attack model | [`/ai/security/v1/attack-model.json`](/ai/security/v1/attack-model.json) |
| Security primitives | [`/ai/security/v1/primitives.json`](/ai/security/v1/primitives.json) |
| Security gaps | [`/ai/security/v1/gaps.json`](/ai/security/v1/gaps.json) |
| Local trust posture | [`/ai/security/v1/local-trust-posture.json`](/ai/security/v1/local-trust-posture.json) |
| Capability validation | [`/ai/security/v1/security-capability-validation.json`](/ai/security/v1/security-capability-validation.json) |

## Threat-model split

- **SaaS-origin dispatch** — outbound URL fetch; SSRF, redirects, response handling.
- **Private edge delivery** — outbound agent path to private targets; not equivalent to SaaS SSRF controls.

## Local trust architecture (V1)

- **zen-agent** — visible customer-plane local authority/supervisor for enrollment, flows, and projected trust material.
- **zen-lock** — encrypted local survival store; adapters/ingester/egress consume **projected** material on hot paths, not per-delivery SaaS fetches.
- **SPIFFE/SPIRE-native identity** — internal and **Zen-managed** in V1; customers **do not** operate SPIRE.
- **Fail-closed** — expired/invalid local material is rejected on enforced paths.
- **Not claimed:** validated 24h survival, compliance certification, customer-managed SPIRE, ST-003/N086/DeliveryPolicy PASS without evidence.

See [`local-trust-posture.json`](/ai/security/v1/local-trust-posture.json) and primitive IDs `PRIM-ZEN-LOCAL-TRUST-AUTHORITY`, `PRIM-ZEN-LOCK-SURVIVAL-STORE`, `PRIM-KEY-MATERIAL-ROTATION`, `PRIM-AIR-GAPPED-ADAPTER-HANDOFF`, `PRIM-SPIFFE-SPIRE-NATIVE-INTERNAL`, `PRIM-LOCAL-MATERIAL-EXPIRY-FAIL-CLOSED`.

## Highlights (2026-05-31)

| Topic | Maturity | Plain language |
|-------|----------|----------------|
| Idempotency / duplicates | `AUTOMATED_TESTED` | Helps **detect/limit** duplicates in mock scenarios — **not** replay-proof |
| Provider signatures (Stripe wedge) | `AUTOMATED_TESTED` | Wired and mock-tested on configured wedge path |
| Agent HMAC | `AUTOMATED_TESTED` | Wired with automated crypto tests — not delivery replay proof |
| Agent mTLS | `NOT_E2E_VALIDATED` | Wired + mock proof — not all paths e2e-validated |
| SPIFFE / SVID (Zen-managed internal) | `WIRED` / `NOT_E2E_VALIDATED` | Customers do not operate SPIRE in V1 — rotation not production-live proof |
| Local trust / 24h survival | `NOT_CLAIMED` | Material projection helps short gaps — **not** validated 24h survival |
| Air-gapped adapter handoff | `WIRED` | Contract-defined — not compliance-certified air-gap program |
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

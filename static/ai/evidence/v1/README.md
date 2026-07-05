# AI Evidence Manifest v1

This directory contains machine-readable evidence artifacts for AI-assisted analysis of Zen Mesh proofs, capabilities, and compliance mappings.

## Files

| File | Purpose |
|------|---------|
| `manifest.schema.json` | JSON Schema for the manifest format |
| `manifest.json` | AI evidence manifest — 10 runtime proofs, 10 trust proofs, proof levels, validation targets |
| `compliance-map.json` | Compliance-to-feature mapping (PCI-DSS, NIST, SOC2, ISO 27001, HIPAA) — all maps_to or supports relationships |
| `non-claims.json` | Explicit list of capabilities and claims NOT made — prevents overclaim by AI tools |

## Key Principles

- **Scope is local_mock_harness_only** — no production claims
- **All relationships use "supports" or "maps_to"** — not "satisfies" or "compliant_with"
- **Proof statuses**: `victory_locked`, `proven_local_mock`, `implementation_present`, `planned`, `blocked`, `not_claimed`
- **No forbidden status words**: certified, authorized, compliant, satisfied, guaranteed
- **No FedRAMP, HIPAA/BAA, SOC2 certified, PCI compliant claims**
- **No integrity auth/replay/identity/delivery claims**
- **No secrets, employee names, or internal-only paths**

## Source Evidence

All evidence artifacts are in `github.com/zenmesh/zen-platform/docs/80-EVIDENCE/`.

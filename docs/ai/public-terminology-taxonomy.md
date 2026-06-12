---
sidebar_label: Public terminology
---

# Public terminology taxonomy

Customer-facing website and docs copy must use **public capability names**, not internal task IDs (ST-003, N086, FLOW-0x, HELPER###, H###, checkpoint/blocker IDs).

## Machine-readable source

- [public-terminology-taxonomy.json](https://www.zen-mesh.io/ai/public-terminology-taxonomy.json) on the marketing site
- [Human guide](https://www.zen-mesh.io/docs/public-terminology-taxonomy)

## Policy

| Use in public copy | Do not use in customer summaries |
|---|---|
| Runtime workload identity (SVID) rotation | ST-003 |
| DeliveryPolicy TLS/trust-chain controls | N086 |
| Sandbox delivery validation (direct / egress / relay) | FLOW-01, FLOW-02, FLOW-03, FLOW123 |
| Planes management UI (T1) | L1 /planes T1 as internal shorthand |
| Hash-chain integrity comparison | HELPER### / H### task labels |

`internal_ref` fields in [non-claims.json](ai/evidence-v1-supersession.md#non-claims) may retain internal linkage for machines only.

## Proof boundaries

- **Blogs** — `narrative_context` only; see [narrative-context.json](https://www.zen-mesh.io/ai/narrative-context.json)
- **Proof** — [manifest.json](ai/evidence-v1-supersession.md#manifest) and hash-chain receipts
- **Merkle** — integrity/tamper-evidence only; not authentication, identity, encryption, or replay prevention

## Validators

Run on zen-mesh.io before publish:

```bash
python3 scripts/validation/public_terminology_taxonomy_check.py
python3 scripts/validation/public_copy_internal_id_guard.py
```

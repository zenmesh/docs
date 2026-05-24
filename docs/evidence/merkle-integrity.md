---
sidebar_label: Merkle Evidence Integrity
---

# Merkle Evidence Integrity

Zen Mesh uses a Merkle tree to provide **evidence integrity and state comparison** for runtime and trust evidence artifacts.

## What it does

- Produces a hash root over evidence artifacts
- Enables tamper-evident verification of evidence chains
- Supports independent re-computation of hashes

## What it does NOT do

Merkle in Zen Mesh is **not** used for:

- ❌ Authentication — does not verify identity
- ❌ Identity — does not issue or validate workload identities
- ❌ Replay prevention — does not detect duplicate events
- ❌ Encryption — does not encrypt payloads
- ❌ Delivery guarantees — does not ensure at-least-once or exactly-once delivery
- ❌ Access control — does not authorize or deny requests

## Verification

```bash
make merkle-evidence-check
```

This validates the Merkle tree against current evidence artifacts.

## Source

Evidence Merkle roots and leaf hashes are stored in `zen-platform/docs/80-EVIDENCE/merkle/`.

All current Merkle roots use the `mock:` prefix — no production Merkle tree is deployed.

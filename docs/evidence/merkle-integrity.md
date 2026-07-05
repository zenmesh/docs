---
sidebar_label: Evidence Integrity
---

# Evidence Integrity

Zen Mesh provides tamper-evident verification capabilities for runtime and trust evidence artifacts.

## What it does

- Enables integrity verification of evidence chains
- Supports independent verification of evidence artifacts

## What it does NOT do

Evidence integrity checks are **not** used for:

- ❌ Authentication — does not verify identity
- ❌ Identity — does not issue or validate workload identities
- ❌ Replay prevention — does not detect duplicate events
- ❌ Encryption — does not encrypt payloads
- ❌ Delivery guarantees — does not ensure at-least-once or exactly-once delivery
- ❌ Access control — does not authorize or deny requests

## Verification

See the evidence overview for current verification tooling.

## Source

Evidence integrity information is stored in `zen-platform/docs/80-EVIDENCE/`.

All evidence integrity features are currently validated in local/sandbox environments.
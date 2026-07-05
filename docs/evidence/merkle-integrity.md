---
sidebar_label: Evidence Integrity
---

# Evidence Integrity

Zen Mesh provides evidence-oriented delivery visibility, including delivery receipts, operational metadata, and validation scope where available. Detailed evidence mechanisms are documented only when approved for public release.

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

# Public Docs Claim Audit

**Audit ID:** PUBLIC-DOCS-CLAIM-AUDIT-001
**Date:** 2026-05-24
**Source Repo:** ~/zenmesh/zen-platform @ 7d41a92b1
**Docs Repo:** ~/zenmesh/docs @ 3bd3ef3

## Audit Results by Doc

## docs/architecture/security-model.md

| Claim | Classification | Action |
|---|---|---|
| mTLS certs issued via SPIFFE/SPIRE | needs_scope | cert-manager issues workload certs with SPIFFE URI SAN; SPIRE NOT_YET_BUILT |
| SPIFFE/SPIRE workload identity / auto-rotation | supported_but_missing_evidence_refs | cert-manager auto-renewal is COMPLETE; SPIRE SVID rotation NOT_YET_BUILT |
| HMAC: "Duplicate events are detected and rejected" | needs_scope | HMAC provides integrity/tamper protection, not dedup |
| Enrollment flow | supported_as_written | TRUST-PROOF-001/002 match |
| ZenLock/zero-knowledge secrets | supported_as_written | TRUST-PROOF-005/009 match |
| Encryption layers | supported_as_written | mTLS enforcement confirmed |

## docs/architecture/delivery-modes.md — All claims supported_as_written

## docs/guides/cluster-enrollment.md — All claims supported_as_written

## docs-zen-lock/security-properties.md — All claims supported_as_written

## Changes Applied

1. **security-model.md**: Scoped SPIFFE/SPIRE claim to cert-manager issuance, marked SPIRE as planned.
2. **security-model.md**: Clarified HMAC provides integrity/tamper protection; dedup handled by idempotency layer.
3. Remaining docs: no changes needed — claims match current evidence.

## Non-Claims

- No changes introduced new claims.
- No content removed where implementation exists but proof is local/mock.
- No production/live proof claimed.

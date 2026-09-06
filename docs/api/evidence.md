---
sidebar_label: Evidence API
---

# Evidence API

The Evidence API provides cryptographic proofs of delivery for webhook events processed through the evidence pipeline (current scope: WIRED_SANDBOX). Each recorded delivery produces an integrity-tree inclusion proof that can be independently verified.

> Status: WIRED_SANDBOX. This page describes the current contract surface and known non-claims. It is not a production-live availability claim.

## Audience

Customer / developer verifying delivery integrity.

## Endpoint table

| Method | Path | Description | Read/Write | Status | Auth/scopes | Idempotency | OpenAPI |
|--------|------|-------------|------------|--------|-------------|-------------|---------|
| `GET` | `/tenants/{tid}/evidence/{delivery_id}` | Read delivery evidence | Read | WIRED_SANDBOX | `read:evidence` | Not required | Partial |
| `GET` | `/tenants/{tid}/sources/{sid}/evidence` | List evidence for a source | Read | WIRED_SANDBOX | `read:evidence` | Not required | Partial |

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Read delivery evidence | Yes | — | WIRED_SANDBOX |
| List evidence for a source | Yes | — | WIRED_SANDBOX |

Evidence API is read-only for public customer use. Evidence is created by the platform runtime as part of delivery processing, not by direct customer write. Evidence verification is an offline/client-side operation.

## Read delivery evidence

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/evidence/<delivery_id>"
```

**Response:**

```json
{
  "delivery_id": "dlv_abc123",
  "integrity_root": "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",
  "inclusion_proof": ["x1y2z3...", "p4q5r6..."],
  "leaf_hash": "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "timestamp": "2026-07-03T12:00:03Z",
  "status": "confirmed"
}
```

## List evidence for a source

```bash
curl -sS -H "Authorization: Bearer <api_key>" \
  "https://api.zen-mesh.io/v1/tenants/<tenant_id>/sources/<source_id>/evidence?limit=10"
```

## Verify an inclusion proof

Clients can verify delivery integrity without trusting the platform:

1. Retrieve the evidence proof for the delivery
2. Compute `SHA-256(delivery_payload + timestamp + tenant_id)`
3. Combine with the `inclusion_proof` hashes per the integrity tree algorithm
4. Compare the resulting root with `integrity_root`

If the computed root matches the published root, the delivery is cryptographically confirmed.

## Error examples

### 404 Evidence not found

```json
{
  "type": "https://api.zen-mesh.io/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Evidence not found for delivery dlv_abc123.",
  "instance": "req_abc123"
}
```

### 403 Insufficient scope

```json
{
  "type": "https://api.zen-mesh.io/errors/insufficient-scope",
  "title": "Insufficient Scope",
  "status": 403,
  "detail": "API key does not have read:evidence scope.",
  "required_scope": "read:evidence"
}
```

## Pagination

Evidence list supports cursor-based pagination with `limit` and `cursor` parameters. See [Pagination and Filtering](./pagination).

## Auth

Bearer JWT or API key in `Authorization` header. Tenant-scoped via path parameter. See [Authentication](./authentication) for scope model.

## OpenAPI coverage

Partially covered in `zen-back.v1.yaml`. See [OpenAPI Spec Index](./openapi).

## UI mapping

Trust → Evidence, Traffic → Traces

## Related

- [Traces / Evidence Spine API](./traces) — delivery trace spine with evidence correlation
- [Delivery Attempts API](./delivery-attempts) — delivery execution tracking
- [Write Safety Model](./write-safety) — authorization and safety

## Non-claims

- WIRED_SANDBOX: implemented in local/sandbox runtime. Not production-live.
- Evidence receipts are integrity-only — not auth, identity, encryption, or delivery guarantee.
- Evidence is created by the platform, not by direct customer write.
- Evidence verification is an offline operation; the API does not verify on your behalf.

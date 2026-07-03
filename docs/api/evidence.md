---
sidebar_label: Evidence API
---

# Evidence API

The Evidence API provides cryptographic proofs of delivery for every webhook event processed by Zen Mesh. Each delivery produces a Merkle-tree inclusion proof that can be independently verified.

## Read Delivery Evidence

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/evidence/<delivery-id>
```

Response:

```json
{
  "delivery_id": "dlv_abc123",
  "merkle_root": "a1b2c3d4e5f67890...",
  "inclusion_proof": [
    "x1y2z3...",
    "p4q5r6..."
  ],
  "leaf_hash": "abcdef...",
  "timestamp": "2026-06-01T12:00:03Z",
  "status": "confirmed"
}
```

## List Evidence for a Source

```bash
curl -H "Authorization: Bearer $ZEN_API_KEY" \
  -H "X-Tenant-ID: $ZEN_TENANT_ID" \
  https://api.zen-mesh.io/v1/sources/<source-id>/evidence?limit=10
```

## Verify a Merkle Inclusion Proof

Clients can verify delivery integrity without trusting the platform:

1. Retrieve the evidence proof for the delivery
2. Compute `SHA-256(delivery_payload + timestamp + tenant_id)`
3. Combine with the `inclusion_proof` hashes per the Merkle tree algorithm
4. Compare the resulting root with `merkle_root`

If the computed root matches the published root, the delivery is cryptographically confirmed.

## Read/write status

| Operation | Read | Write | Status |
|---|---|---|---|
| Read delivery evidence | Yes | — | WIRED_SANDBOX |
| List evidence for a source | Yes | — | WIRED_SANDBOX |

Evidence API is read-only for public customer use. Evidence is created by the platform runtime as part of delivery processing, not by direct customer write. Evidence verification is an offline/client-side operation.

## Pagination

Evidence lists support cursor-based pagination with `limit` and `cursor` parameters.

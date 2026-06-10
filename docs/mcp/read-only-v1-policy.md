---
sidebar_label: Read-Only V1 Policy
---

# MCP Read-Only V1 Policy

## Scope

The MCP server provides **read-only** access to Zen Mesh platform data for AI agents. No write operations — event submission, source creation, or configuration changes — are supported in V1.

## What Is Supported (V1)

- Query delivery status and history
- Read evidence proofs and Merkle receipts
- Inspect webhook source metadata
- List configured destinations
- Retrieve platform health information
- Fetch tenant-scoped logs

## What Is Not Supported (V1)

| Operation | Reason |
|-----------|--------|
| Event submission | Requires write authorization — not in V1 scope |
| Source CRUD | Configuration management — not in V1 scope |
| Destination CRUD | Configuration management — not in V1 scope |
| Replay trigger | Mutating operation — not in V1 scope |
| Evidence creation | Platform-internal operation |

## Rationale

The V1 MCP interface prioritizes safe, auditable read access for AI agents. Write and configuration operations carry additional authorization, idempotency, and audit requirements that are deferred to a future V2 iteration.

## Enforcement

Write-denial is enforced at the MCP proxy layer in zen-back. Attempted write operations return a clear denial response indicating the operation is not supported in V1 (see [MCP Examples](./examples.md) for denied write scenarios).

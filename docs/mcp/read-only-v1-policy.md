---
sidebar_label: V1 Policy
---

# MCP V1 Policy

## Scope

The MCP server provides both **read-only** and **read-write** tool groups for AI agents in V1. Read-write tools are **default-off** and must be explicitly enabled per tool group by an operator. This ensures safe, auditable access while preserving full operational capability when authorized.

## Default Surface (Read-Only)

By default, the MCP server exposes read-only operational truth:

- Query delivery status and history
- Read evidence proofs and Merkle receipts
- Inspect webhook source metadata
- List configured destinations
- Retrieve platform health information
- Fetch tenant-scoped logs

## Write Tools (V1, Default-Off)

Write tools are included in V1 but are **disabled by default**. An operator must explicitly enable each write tool group before it becomes available:

| Operation | V1 Status | Default |
|-----------|-----------|---------|
| Event submission | V1 (RW) | Off |
| Source CRUD | V1 (RW) | Off |
| Destination CRUD | V1 (RW) | Off |
| Replay trigger | V1 (RW) | Off |
| Evidence creation | Platform-internal | Off |

## Rationale

The V1 MCP interface prioritizes safe, auditable access for AI agents. Read-only tools are available by default. Write tools require explicit operator enablement per tool group, ensuring that mutating operations are authorized, idempotent, and audited before use.

## Enforcement

Tool-group gating is enforced at the MCP proxy layer in zen-back. Write tools that are not enabled return a clear denial response indicating the tool group must be explicitly activated (see [MCP Examples](./examples.md) for denied and enabled write scenarios).

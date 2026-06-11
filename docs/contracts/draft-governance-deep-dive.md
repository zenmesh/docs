---
sidebar_label: Draft Governance Deep Dive
description: Deep dive into propose vs apply separation — human, AI, API, and MCP draft creation, review, approval, audit, and evidence.
---

# Draft Governance Deep Dive

> **Propose vs apply separation — the governance model for infrastructure changes.**

## Propose vs Apply Separation

Every infrastructure change in Zen Mesh follows a two-step process:

1. **Propose** — a draft is created describing the proposed change
2. **Apply** — a human reviews and applies the draft (or discards it)

These steps are always separate. Create does not equal mutate. Apply is always a distinct, audited action.

## Draft Sources

Drafts can be created through any channel, depending on future channel permission configuration:

| Channel | Can Create Draft? | Can Apply Draft? | Notes |
|---------|------------------|-----------------|-------|
| **Human (UI)** | Yes | Yes | Standard workflow |
| **Human (API)** | Yes | Yes | Requires explicit apply |
| **AI (MCP)** | Yes (endpoints V1) | No (403) | Propose only |
| **AI (API)** | Future | Future | Requires channel permission |

### Change Proposal Provenance

Every draft records:
- **Creator** — who or what created it (user ID, API key ID, agent ID)
- **Channel** — how it was created (UI, API, MCP)
- **Timestamp** — when it was created
- **Proposed spec** — the exact configuration change
- **Proposed spec digest** — hash of the proposed configuration

## Review and Approval

### Review Surface

Drafts are reviewed through:
- **UI dashboard** — draft list with status, type, creator, expiry, diff view
- **CLI** — `draft list`, `draft show <id>`, `draft apply <id>`, `draft discard <id>`
- **API** (V1.1+) — programmatic draft review

### Approval Boundary

- Apply is gated by channel permission (future)
- Apply requires explicit human intent (no silent auto-apply)
- Apply-time validation runs before the change takes effect (9 checks, fail-closed)
- High-risk changes may require additional approval

## Audit Trail

Every draft lifecycle event produces evidence:

| Event | Fields |
|-------|--------|
| `draft_created` | draft_id, type, created_by, channel, created_at, proposed_spec_digest, merkle_position |
| `draft_applied` | draft_id, applied_by, applied_at, resource_created, merkle_position, previous_digest |
| `draft_discarded` | draft_id, discarded_by, discarded_at, reason |
| `draft_expired` | draft_id, expired_at |

## Evidence After Apply

After a draft is applied:
1. The resource is created/updated in production
2. Apply evidence is generated with the applied configuration
3. The evidence artifact is linked to the draft creation evidence
4. Both are included in the Merkle integrity chain
5. The draft record transitions to `applied` status

## Key Principles

- **Draft creation does not equal mutation** — no production resource is modified until apply
- **Apply is separate regardless of source** — whether the draft came from UI, API, or MCP
- **No auto-approve** — all applies require explicit human action
- **Audit-first** — all lifecycle events are recorded before any production change
- **Fail-closed** — if validation fails, the apply is rejected

## See Also

- [MCP Draft System](/docs/mcp/draft-system) — current MCP draft implementation
- [Permission Channels Contract](/docs/contracts/permission-channels) — channel permissions design
- [MCP Safety](/docs/contracts/mcp-safety) — MCP safety model

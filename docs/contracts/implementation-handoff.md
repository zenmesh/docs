---
sidebar_label: Implementation Handoff
description: Implementation handoff for channel-aware permissions — data model, API expectations, UI behavior, MCP boundary, validators, negative controls, non-goals.
---

# Implementation Handoff

> **Handoff/spec — not implementation.**
>
> This document describes the expected behavior for implementing UI/API/MCP channel-aware permissions. No code is included.

## Data Model Concepts

### Permission Structure

```
Permission = Channel + Action + Scope + DenyRules
```

| Field | Type | Description |
|-------|------|-------------|
| `channel` | enum (`ui`, `api`, `mcp`) | Which access channel this permission applies to |
| `action` | enum (`read`, `write`, `admin`) | What operations are allowed |
| `scope` | map of label key → value | Resources this permission applies to (AND semantics) |
| `deny` | list of label scopes | Explicit deny scopes that block access |
| `audit` | boolean | Whether all actions using this permission are audit-logged |

### User/Group Model

```
User
  ├── id (string)
  ├── groups (list of Group IDs)
  └── overrides (list of ChannelPermission, optional)

Group
  ├── id (string)
  ├── channels (map of channel → ChannelPermission)
  └── members (list of User IDs)
```

### Draft Model

```
Draft
  ├── id (string)
  ├── type (enum: endpoint, route, source, target, policy)
  ├── status (enum: pending, applied, discarded, expired)
  ├── created_by (user/agent ID)
  ├── channel (enum: ui, api, mcp)
  ├── proposed_spec (the change)
  ├── created_at (timestamp)
  ├── applied_at (timestamp, nullable)
  └── expires_at (timestamp)
```

## API Surface Expectations

### Expected Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/permissions` | List all permissions for current user |
| `GET` | `/api/v1/groups/{id}/permissions` | List permissions for a group |
| `PUT` | `/api/v1/groups/{id}/permissions` | Set permissions for a group |
| `GET` | `/api/v1/users/{id}/permissions` | List effective permissions for a user |
| `PUT` | `/api/v1/users/{id}/overrides` | Set user-level overrides |
| `GET` | `/api/v1/drafts` | List drafts |
| `POST` | `/api/v1/drafts` | Create a draft |
| `POST` | `/api/v1/drafts/{id}/apply` | Apply a draft (human only) |
| `GET` | `/api/v1/audit/permissions` | Query permission audit log |

### Response Shape (Permissions)

```json
{
  "user": {
    "id": "usr_abc123",
    "groups": ["grp_dev", "grp_payments"]
  },
  "effective_permissions": [
    {
      "channel": "mcp",
      "actions": ["routes:read", "delivery:read"],
      "scope": {"team": "payments", "zen-mesh.io/env": "dev"},
      "source": "group:grp_payments"
    }
  ]
}
```

## UI Behavior Expectations

### Permission Editor

- Channel checkboxes: UI, API, MCP
- Action radio buttons: Read, Write, Admin (per channel)
- Label selector: multi-input with autocomplete from existing labels
- Deny rule builder: add label scopes where channel is blocked
- Source indicator: shows whether permission is inherited (from group) or is an override
- Preview button: shows resolved effective permissions
- Audit reason field: required for changes to admin or production-scoped permissions

### Risk Hints

The UI should indicate risk for certain configurations:

- **"Warning: MCP has write access to production resources"** (when MCP write + `env=prod`)
- **"Warning: API key has admin scope"** (when API channel has `admin` action)
- **"Warning: No label scoping — wide blast radius"** (when scope is empty)
- **"Info: User override active"** (when user-level override overrides group default)
- **"Info: Group defaults apply"** (when no channel-specific config exists)

### Proposed vs Applied State

- Drafts show a clear "PENDING — not applied" badge
- Applied drafts show "APPLIED — changes live" badge
- Expired drafts show "EXPIRED — no longer available"
- Discarded drafts show "DISCARDED — rejected"
- Draft list shows diff preview before apply

## MCP Boundary Expectations

- MCP tools call zen-back only — no direct database access
- MCP authentication uses `mcp_` prefix API keys
- MCP create draft endpoint is allowed (V1)
- MCP apply draft is rejected with 403 (MCP_CANNOT_APPLY)
- MCP write to production is not allowed without explicit channel permission
- All MCP tool calls are audited

## Validators Needed

| Validator | Scope | Purpose |
|-----------|-------|---------|
| Channel validator | Permission create/update | Ensure channel values are valid enum |
| Action validator | Permission create/update | Ensure action values are valid enum |
| Label validator | Scope/deny create/update | Ensure label keys are valid format |
| Reserved namespace validator | Label create/update | Reject `zen-mesh.io/*` creation by customers |
| Forbidden namespace validator | Label create/update | Reject `zen/*` namespace |
| Scope overlap validator | Permission deny | Warn if deny scope overlaps with grant scope |
| Maximum permissions validator | Permission save | Enforce plan limits on permission count |
| Expiry validator | User override | Ensure temporary grants have expiry dates |

## Negative Controls Needed

| Control | What It Prevents |
|---------|-----------------|
| No implicit channel inheritance | API permission does not imply MCP permission |
| No silent scope expansion | Adding labels to scope requires explicit save |
| No auto-approve drafts | Apply requires explicit human action |
| No MCP bypass of apply | MCP cannot apply drafts (403) |
| No cross-tenant permission escape | Permissions are tenant-scoped |
| No label mutation via MCP | MCP cannot create/update/delete labels |
| No silent override | User overrides require explicit save and audit |

## Non-Goals

- Cross-tenant permission management
- Permission delegation (user A grants user B)
- Time-based auto-escalation
- Dynamic label inference
- Permission suggestion engine
- Role hierarchy (beyond user→group)

## Forbidden Shortcuts

| Shortcut | Why It Is Forbidden |
|----------|-------------------|
| Granting API full admin scoped to `*` for all users | Violates principle of least privilege |
| Making MCP apply default-on | Apply must be opt-in with explicit channel permission |
| Auto-approving drafts from trusted sources | Violates propose/apply separation |
| Using user ID as API key scope | Keys must be scoped to roles, not individuals |
| Silently inheriting permissions across channels | Channels must be independently configurable |

## See Also

- [Permission Channels Contract](/docs/contracts/permission-channels) — full contract/design
- [UI Permission Editor Spec](/docs/contracts/permission-channels#permission-editor-ui-spec) — UI behavior spec
- [Draft Governance Deep Dive](/docs/contracts/draft-governance-deep-dive) — propose vs apply model
- [Policy Templates](/docs/contracts/policy-templates) — template configurations

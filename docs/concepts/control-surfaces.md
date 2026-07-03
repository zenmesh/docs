---
sidebar_label: Control Surfaces
---

# Control Surfaces

> Status: PUBLIC_CONTRACT_DRAFT. Individual surfaces carry their own maturity. Not a production-live availability claim.

## What Is a Control Surface?

A control surface is a path to interact with Zen Mesh. Every surface reads and writes the same **Zen Configuration Contract (ZCC)** — the contract is the source of truth, not any single surface. Surfaces differ in audience, auth model, and write permissions, but they do not differ in contract validation or audit.

Customer API and MCP are **not globally read-only**. Write status is determined at the endpoint-group or tool-group level, not globally.

## Control Surface Overview

| Surface | Audience | Base path / protocol | Reads | Writes | Maturity |
|---|---|---|---|---|---|
| **UI (Dashboard)** | Operators, evaluators | Web app at app.zen-mesh.io | Yes | Yes (app-scoped) | INTERNAL_ONLY |
| **Customer API** | Developers, CI/CD | `/v1/...` REST | Yes | Permissioned, scoped, audited | WIRED_SANDBOX |
| **MCP** | AI agents, operators | MCP protocol | Yes (default-on) | Disabled by default, per-tool-group enablement | PUBLIC_CONTRACT_DRAFT |
| **CLI** | Administrators | `hermes` command | Yes | Yes | WIRED_SANDBOX |
| **Git (ZCC)** | GitOps workflows | Git repository | Planned | Planned | PLANNED (V1.1) |
| **Dashboard/BFF** | Dashboard UI only | `/api/bff/v1` | Yes | Yes (dashboard-scoped) | INTERNAL_ONLY |

## UI (Dashboard)

The primary interactive surface for operators and evaluators. The dashboard provides visual management of endpoints, targets, flows, traffic, DLQ, retry, traces, payloads, and evidence.

- **Reads:** Yes, full read access
- **Writes:** Yes, through app-scoped operations
- **Auth:** Session-based (OIDC) or API key
- **Status:** INTERNAL_ONLY — app-facing, not a public customer API

## Customer API

The programmable REST API for developers, CI/CD pipelines, and programmatic management. Endpoint groups carry individual read/write statuses. Operations require API key authentication, tenant scoping, and appropriate scopes.

- **Reads:** Yes, per-endpoint-group availability
- **Writes:** Permissioned, scoped, audited, idempotent where relevant
- **Auth:** Bearer JWT or API key in `Authorization` header
- **Status:** WIRED_SANDBOX (runtime APIs), PLANNED (GA contract)

See [API Overview](../api/overview), [Authentication](../api/authentication), [Write Safety](../api/write-safety).

## MCP (Model Context Protocol)

The AI agent control surface. MCP provides read and write tools for AI agents, operators, and internal tooling. Read tools are default-on. Write tools are disabled by default and must be explicitly enabled per tool group by an operator.

- **Reads:** Yes, default-on per V1 policy
- **Writes:** Disabled by default, per-tool-group enablement
- **Auth:** MCP API key with scopes
- **Status:** PUBLIC_CONTRACT_DRAFT

See [MCP Overview](../mcp/overview), [MCP V1 Policy](../mcp/read-only-v1-policy).

## CLI

The command-line surface for administrators and scripting. The CLI provides direct access to Zen Mesh operations from the terminal.

- **Reads:** Yes
- **Writes:** Yes
- **Auth:** API key or session
- **Status:** WIRED_SANDBOX

## Git (ZCC / GitOps)

The declarative GitOps surface. Planned for V1.1 as a Business+ capability. Git as a ZCC control surface would allow managing Zen Mesh resources through Git repositories with pull-request-based workflows.

- **Reads:** Planned
- **Writes:** Planned (V1.1)
- **Auth:** Git credentials + ZCC validation
- **Status:** PLANNED

## Dashboard/BFF API

The internal app-facing API used by the dashboard UI. This is not a public customer contract and should not be consumed directly by external integrations. It exists for the dashboard and may change without notice.

- **Reads:** Yes (app-scoped)
- **Writes:** Yes (app-scoped)
- **Auth:** Session, BFF API key
- **Status:** INTERNAL_ONLY

## Which Surface Should I Use?

| Goal | Recommended surface |
|---|---|
| Interactive exploration | UI (Dashboard) |
| Programmatic integration | Customer API |
| AI agent or operator automation | MCP |
| Scripting and admin tasks | CLI |
| GitOps / infrastructure-as-code | Git (planned) |

## Non-Claims

- Customer API is not globally read-only — read/write is endpoint-group level
- MCP is not globally read-only — write tools exist but are disabled by default
- The Dashboard/BFF API is not a public customer contract
- GitOps is planned for V1.1, not available in V1
- API availability does not imply production-live or GA status
- Write permissions are gated by scopes, tenant authorization, and plan gates

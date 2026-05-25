# Agent → SaaS mTLS

**Status:** Required — fail-closed in production
**Related:** [Security Capability Validation](/docs/security/security-capability-validation)

---

## Overview

The Zen Mesh agent communicates with the SaaS backend exclusively through mTLS (Mutual TLS). This is not optional. It is not planned. It is **required** and enforced fail-closed.

## Architecture

The agent uses `SAAS_SYNC_URL` which points to the mTLS service (port 9443) for ALL operations:

- **Desired-state polling** — `GET /agent/v1/clusters/{cid}/desired-state`
- **Heartbeat** — `POST /agent/v1/heartbeat`, `POST /agent/v1/heartbeats`
- **Adapter sync** — `POST /agent/v1/clusters/{cluster_id}/adapters/sync`
- **Allowlist** — `GET /agent/v1/allowlist`

All routes require both **mTLS** and **HMAC** authentication.

## Source of Truth

| Component | File | Key Line |
|---|---|---|
| mTLS listener | `src/saas/back/cmd/mtls_listener.go` | Lines 201-248: agent routes registered on mTLS listener |
| mTLS enforcement | `src/saas/back/src/main.go` | Line 3181: "Apply mTLS enforcement to agent ingest routes (fail-closed)" |
| mTLS identity middleware | `src/saas/back/src/middleware/mtls_identity.go` | Line 136: "RequireMTLSIdentity enforces mTLS identity for agent routes" |
| Bootstrap SPIFFE | `src/saas/back/src/handlers/agent_bootstrap_handler.go` | Lines 334-384: SPIFFE ID verification on bootstrap |

## Security Matrix

| Property | Agent → SaaS |
|---|---|
| TLS | Required |
| mTLS | Required |
| HMAC | Required |

## CAP-004 Clarification

The capability evidence entry **CAP-004 "SPIFFE/SPIRE workload identity"** has status `planned`. This refers to the **fuller workload identity model** with SPIRE Workload API integration — the comprehensive, dynamic workload identity with automatic SVID rotation via SPIRE agents.

**It does NOT mean mTLS is planned.** mTLS is required today. The "planned" item is the deeper SPIRE Workload API integration for a more comprehensive identity model.

## Enforcement

- **Production:** mTLS enforcement is fail-closed. If mTLS middleware is nil, the system logs a fatal error.
- **Bootstrap:** Agent bootstrap can require SPIFFE identity (`BOOTSTRAP_REQUIRE_SPIFFE`).
- **HMAC:** HMAC middleware is also fail-closed (SECURITY RATCHET).

## Non-Claims

- No claim that all data-plane paths have mTLS
- No claim that SPIRE Workload API is fully deployed
- No production-live proof for all paths (evidence is local/mock)

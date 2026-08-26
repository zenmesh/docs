# Agent → SaaS mTLS

**Status:** Required — fail-closed (source-validated, not production-live attested)
**Related:** [Security Capability Validation](./security-capability-validation), [MCP Authentication & mTLS](../mcp/authentication-and-mtls)

---

## Overview

The Zen Mesh agent communicates with the SaaS backend through mTLS (Mutual TLS). This is enforced fail-closed at the middleware layer.

**Caveat:** The evidence below is source-validated against the current codebase. Production-live attestation is not claimed here — refer to the [evidence index](../evidence/overview.md) for deployment-specific validation status.

## Architecture

The agent uses `SAAS_SYNC_URL` which points to the mTLS service (port 9443) for post-bootstrap sync operations:

| Route | Method | Auth | Scope |
|---|---|---|---|
| `/agent/v1/clusters/{cid}/desired-state` | GET | mTLS + HMAC | Desired-state polling |
| `/agent/v1/heartbeat` | POST | mTLS + HMAC | Agent heartbeat |
| `/agent/v1/heartbeats` | POST | mTLS + HMAC | Agent heartbeat |
| `/agent/v1/clusters/{cluster_id}/adapters/sync` | POST | mTLS + HMAC | Adapter registration |
| `/agent/v1/allowlist` | GET | mTLS + HMAC | Egress/adapter allowlist |
| `/agent/v1/agents/bootstrap` | POST | mTLS (no HMAC) | Agent bootstrap |
| `/agent/v1/agents/rekey` | POST | mTLS (no HMAC) | Agent rekey |

Bootstrap and rekey routes are on the mTLS listener without HMAC — the agent has not yet enrolled and cannot present an HMAC identity at that stage.

## Security Matrix

| Control | Status | Scope | Evidence Reference | Public Caveat |
|---|---|---|---|---|
| mTLS listener | Implemented | Port 9443, internal CP↔EP/DP routes | `mtls_listener.go`: agent route registration on mTLS listener | Source-validated at commit time; no production-live attestation here |
| mTLS identity middleware | Implemented | Agent routes (tenant/cluster identity from cert) | `mtls_identity.go`: RequireMTLSIdentity middleware | Extracts identity from client cert; fails 401 if missing |
| mTLS enforcement (fail-closed) | Implemented | All internal CP↔EP/DP routes | `main.go`: mTLS enforcement initialization | Fatal error if mTLS enforcement cannot initialize; applies to API v1 routes |
| HMAC middleware | Implemented | Agent routes under `/agent/v1` | HMACVerifier initialization in `main.go` | Fail-closed in production; non-nil check |
| Bootstrap SPIFFE gate | Config-driven (optional) | Agent bootstrap handler | `agent_bootstrap_handler.go`: `BOOTSTRAP_REQUIRE_SPIFFE` | Optional; when enabled, requires valid SPIFFE ID in client cert |
| SPIRE Workload API | Planned | Full workload identity model | CAP-004 evidence entry | Planned for post-V1 hardening; does not affect current mTLS requirement |

## CAP-004 Clarification

The capability evidence entry **CAP-004 "SPIFFE/SPIRE workload identity"** has status `planned`. This refers to the **fuller workload identity model** with SPIRE Workload API integration — the comprehensive, dynamic workload identity with automatic SVID rotation via SPIRE agents.

**It does NOT mean mTLS is planned.** mTLS is required today. The "planned" item is the deeper SPIRE Workload API integration for a more comprehensive identity model.

## Enforcement

- **Production:** mTLS enforcement is fail-closed. If mTLS middleware initialization fails, the system logs a fatal error and refuses to start.
- **Bootstrap:** Agent bootstrap can optionally require SPIFFE identity via `BOOTSTRAP_REQUIRE_SPIFFE`.
- **HMAC:** HMAC middleware is also fail-closed in production.
- **Route isolation:** Agent routes are ONLY reachable via the mTLS listener (port 9443), not on the public listener.

## Non-Claims

- mTLS claimed as product standard on every data-plane path (see [llms.txt](../llms.txt)). Per-path evidence maturity tracked in [wedge-claim-map.json](https://www.zen-mesh.io/docs/ai/evidence/v1/wedge-claim-map.json). See also [claim-maturity.json](https://www.zen-mesh.io/docs/ai/security/v1/claim-maturity.json) (primitive PRIM-MTLS-AGENT-SAAS) and [security-capability-validation.json](https://www.zen-mesh.io/docs/ai/security/v1/security-capability-validation.json) for per-scope validation scope.
- No claim that SPIRE Workload API is fully deployed
- No production-live proof for all paths (evidence is source-validated, not live-attested)
- No claim that bootstrap SPIFFE gate is enabled in all deployments

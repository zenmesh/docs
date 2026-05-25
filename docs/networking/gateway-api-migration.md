# Gateway API Migration Readiness

**Status:** Planning — inventory and modeling only. No runtime migration performed.
**Last Updated:** 2026-05-24
**Related Evidence:** [gateway_api_migration_readiness.json](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/gateway_api_migration_readiness.json)

---

## Purpose

This page documents the readiness state for migrating Zen Mesh from Kubernetes Ingress (networking.k8s.io/v1) to Gateway API. It is **planning and inventory only** — no runtime traffic cutover has been performed.

## Why Gateway API

Gateway API provides:
- **Role-based routing** — cluster operators, app developers, and security teams each get their own RBAC scope
- **Multi-tenant gateway sharing** — better resource isolation than shared Ingress
- **Protocol-native routing** — GRPCRoute, TCPRoute, TLSRoute beyond HTTP
- **Portable cross-provider config** — less vendor lock-in than nginx-specific annotations

## Current State

All Zen Mesh routing currently uses **Kubernetes Ingress** with the **nginx** ingress class.

### Hostname Ownership

| Host | Plane | Owner | Ingress Template |
|---|---|---|---|
| app.zen-mesh.io | Control Plane | Hermes (UI) | ingress-frontend.yaml |
| api.zen-mesh.io | Control Plane | nanobot | ingress-api.yaml |
| ingest.zen-mesh.io | Data Plane | nanobot | ingress-webhook.yaml |
| platform.zen-mesh.io | Control Plane | nanobot | customer-api-ingress.yaml, mcp-ingress.yaml |
| m2m.zenmesh.io | Control Plane | nanobot | ingress-m2m.yaml |

### Route Inventory

**19 routes inventoried** across control plane and data plane:

- **14 SaaS control-plane routes** — frontend, BFF, back API, health, metrics, Stripe, billing, WebSocket
- **5 data-plane / platform routes** — webhook ingestion, gRPC health, customer API, MCP, M2M

### TLS Ownership

All routes use **cert-manager** for TLS certificate management:
- Public routes: `letsencrypt-prod` ClusterIssuer
- Internal routes: `zenmesh-tls` static secret or cert-manager
- mTLS paths: cert-manager CA issuer for SVID/client certs

## Target State

Migration target is **Gateway API v1.0+** with:
- 5 Gateway resources (gateway-api, gateway-app, gateway-dp, gateway-platform, gateway-m2m)
- 19 HTTPRoute/GRPCRoute resources matching current Ingress paths
- Full TLS parity with cert-manager
- Rate limiting, timeouts, and backend protocol preserved

### Planned Gateways

| Gateway | Hosts | Routes | Status |
|---|---|---|---|
| gateway-api | api.zen-mesh.io | 12 control-plane API routes | planned |
| gateway-app | app.zen-mesh.io | 5 frontend/BFF routes | planned |
| gateway-dp | ingest.zen-mesh.io, api.zen-mesh.io | 2 data-plane routes | planned |
| gateway-platform | platform.zen-mesh.io | 2 platform API routes | planned |
| gateway-m2m | m2m.zenmesh.io | 1 M2M route | planned |

## What Is Validated

- ✅ All 19 Ingress routes inventoried with hosts, paths, TLS, security requirements
- ✅ Candidate Gateway API resources modeled (19 HTTPRoute/GRPCRoute)
- ✅ Plane/layer classification complete (CONTROL_PLANE, DATA_PLANE; L1-L3)
- ✅ TLS ownership classified per route
- ✅ Public/internal and customer-visible classification complete
- ✅ Rollback requirements defined for all customer-facing routes
- ✅ Security requirements captured (mTLS, HMAC, TLS, rate limiting)
- ✅ Controller evaluation: NGINX Gateway Fabric, GKE Gateway Controller, Envoy Gateway
- ✅ CRD readiness: Gateway API v1 CRDs not yet installed in clusters
- ✅ All 9 gateway validators PASS

## What Is NOT Yet Migrated

- ❌ No Gateway API resources created in any cluster
- ❌ No runtime traffic cutover
- ❌ No DNS changes
- ❌ No cert rotation performed
- ❌ No Ingress removal
- ❌ No GRPCRoute support verified (requires Gateway API v1.2+)
- ❌ No BackendTLSPolicy for HTTPS backend-protocol routes

## Blockers

| Blocker | Routes Affected | Resolution |
|---|---|---|
| GRPCRoute requires Gateway API v1.2+ | grpc-ingester-healthz | Install v1.2 CRDs; verify NGINX Gateway Fabric support |
| BackendTLSPolicy needed for HTTPS backend | m2m-api | Model BackendTLSPolicy; verify controller support |
| Controller not yet selected | All | Complete controller evaluation (NGINX Gateway Fabric leading) |

## Non-Claims

- No runtime migration performed
- No production-live Gateway API claim
- No DNS cutover
- No cert rotation performed
- No traffic proof
- No app UI freshness claim
- No Ingress removal
- No Gateway API runtime cutover

## Related

- [Ingress Route Inventory](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/ingress_route_inventory.json)
- [Migration Readiness](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/gateway_api_migration_readiness.json)
- [Candidate Plan](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/gateway_api_candidate_plan.json)
- [Controller Selection](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/gateway_controller_selection.json)
- [CRD Readiness](https://github.com/zenmesh/zen-platform/blob/main/docs/80-EVIDENCE/gateway-api/gateway_crd_readiness.json)

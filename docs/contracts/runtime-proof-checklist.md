---
sidebar_label: Runtime Proof Checklist
description: Internal runtime proof checklist — gates requiring validation before public launch. Sandbox/demo scope, not production-live claims.
---

# Runtime Proof Checklist

> **Internal preparation — not a public launch gate.**
>
> This checklist captures runtime validations needed before public launch.
> Items are scoped to sandbox/demo validation — not production-live claims.

## Delivery Gates

| # | Gate | Scope | Status |
|---|------|-------|--------|
| 1 | **Stripe source → public target** | End-to-end delivery from Stripe webhook to public HTTP target | Needs validation |
| 2 | **Stripe source → private target (egress relay)** | Delivery through zen-egress to private network service | Needs validation |
| 3 | **GitHub source → public/private target** | End-to-end with HMAC verification | Needs validation |
| 4 | **Custom webhook → target** | Generic HTTP source with header validation | Needs validation |
| 5 | **Multi-destination delivery (fan-out)** | Single event to multiple targets with isolated policies | Needs validation |
| 6 | **DLQ + replay** | Failed event lands in DLQ, replay restores delivery | Needs validation |

## Security Gates

| # | Gate | Scope | Status |
|---|------|-------|--------|
| 7 | **RBAC/ABAC via labels** | Label-based access control policies enforced correctly | Needs validation |
| 8 | **Label isolation** | Cross-tenant label filtering does not leak data | Needs validation |
| 9 | **MCP read-only enforcement** | MCP tools cannot mutate resources | Needs validation |
| 10 | **SSRF/redirect protection** | Delivery to internal/private addresses is controlled | Needs validation |
| 11 | **Payload access control** | Staff cannot browse raw payloads without authorization | Needs validation |
| 12 | **Secrets redaction** | Secrets never appear in logs or API responses | Needs validation |

## Entitlement Gates

| # | Gate | Scope | Status |
|---|------|-------|--------|
| 13 | **Same-tenant entitlements** | User within tenant sees only their tenant's resources | Needs validation |
| 14 | **Cross-tenant isolation** | User in Tenant A cannot access Tenant B's data | Needs validation |
| 15 | **Admin permissions/policies** | Admin role has correct scope — not unlimited | Needs validation |
| 16 | **API key scoping** | Keys scoped to single tenant and permission set | Needs validation |

## Provider Gates

| # | Gate | Scope | Status |
|---|------|-------|--------|
| 17 | **Shopify connector validation** | Shopify webhook ingestion and delivery | Not started (launch target) |
| 18 | **Twilio connector validation** | Twilio webhook ingestion and delivery | Not started (launch target) |
| 19 | **Object-store fan-out validation** | S3-compatible delivery | Not started (launch target) |

## Permission-Axis Gates

| # | Gate | Scope | Status |
|---|------|-------|--------|
| 20 | **UI channel enforcement** | UI permissions scoped correctly | Needs validation |
| 21 | **API channel enforcement** | API permissions scoped correctly | Needs validation |
| 22 | **MCP channel enforcement** | MCP permissions scoped correctly | Needs validation |
| 23 | **Group defaults** | Group-level permission inheritance works | Needs validation |
| 24 | **User overrides** | User-level overrides add to group permissions correctly | Needs validation |
| 25 | **Label constraints** | Label scoping narrows permission blast radius | Needs validation |
| 26 | **Proposed/applied separation** | Drafts do not mutate until applied | Needs validation |
| 27 | **Audit trail** | All permission changes are logged with before/after | Needs validation |
| 28 | **Negative controls** | No implicit channel inheritance, no cross-tenant escape | Needs validation |

## See Also

- [Launch Readiness Gap-to-Action](/docs/contracts/launch-readiness-gap-to-action) — overall launch blocker index
- [First-Customer Rehearsal Checklist](/docs/contracts/first-customer-rehearsal) — rehearsal walkthrough
- [Launch Contracts Index](/docs/contracts/) — full contract catalog

---
sidebar_label: V1 Live Truth Matrix
---

# V1 Live Truth Matrix

This page documents the current V1 launch readiness state across all platform
dimensions. It is the canonical source for distinguishing what is verified,
what is gated, and what remains NO-GO until final live gates pass.

---

## Status Definitions

| Status | Meaning |
|--------|---------|
| `local_ready` | Validated in local/sandbox environment |
| `contract_verified` | Package contract, fixtures, goldens, evidence artifacts accepted |
| `cloud_gated` | Requires public cloud endpoint deployment |
| `credential_gated` | Requires live provider test accounts |
| `live_validated` | End-to-end validated on production cloud with live provider credentials |
| `ga` | Generally available — live validated, SLA-backed, billed |
| `public_launch_ready` | All gates passed; public launch is GO |

---

## V1 Live State

| Component | Status | Notes |
|-----------|--------|-------|
| **Control plane cloud deploy** | Planned | Not yet live. Cloud infrastructure in preparation. |
| **First owned data-plane** | Planned | Not yet live. Data-plane deploy follows control plane. |
| **Fabric Planes** | `local_ready` | Local/deployed sandbox ready. Live cloud pending. |
| **Fabric Adapters** | `contract_verified` | Sandbox deployed proof accepted. Live provider validation pending. |
| **Provider Registry** | Verified semantics being corrected by GLM | GA not claimed. Maturity semantics under active correction. |
| **Stripe** | `contract_verified` | Verified local/contract readiness. Live E2E cloud_gated / credential_gated. |
| **GitHub** | `contract_verified` | Verified local/contract readiness. Live E2E cloud_gated / credential_gated. |
| **Shopify** | `contract_verified` | Verified local/contract readiness. Live E2E cloud_gated / credential_gated. |
| **Twilio** | `contract_verified` | Verified local/contract readiness. Live E2E cloud_gated / credential_gated. |
| **Billing / Stripe subscriptions** | `cloud_gated` | Requires cloud/public endpoint deployment. |
| **Backups / restore** | `cloud_gated` | Prep-ready or cloud-gated depending on current docs. |
| **CI guardrails** | GLM-owned | Pending unless confirmed landed in GLM R58. |
| **Public / docs / AI surfaces** | Claim-guarded | Public launch NO-GO. No overclaims published. |

---

## Explicit Launch Boundary

- **V1 public launch remains NO-GO until final live gates pass.**
- IP-restricted prod validation does not equal public launch.
- Provider `verified` does not mean live provider E2E is complete.
- GA requires post-cloud live validation evidence.

---

## Provider Validation Dependency

Live provider E2E validation requires the following dependencies to be
satisfied in order:

1. **Public cloud endpoint** — Control plane deployed to a publicly reachable
   endpoint.
2. **Provider test accounts** — Live credentials for each provider at a minimum
   tier that permits webhook event generation.
3. **Leonardo** will create test accounts after prod cloud deploy.
4. **Live validation sequence**:
   - Stripe: Revalidation with live credentials against prod cloud.
   - GitHub: First-time live validation against prod cloud.
   - Shopify: First-time live validation against prod cloud.
   - Twilio: First-time live validation against prod cloud.

Until these dependencies are met, every provider's live E2E status is
`cloud_gated` / `credential_gated`.

---

## Public Claim Policy

The following claims must not appear anywhere in public or AI-discoverable
surfaces:

- ❌ Public launch GO
- ❌ Providers are live validated
- ❌ Provider Registry is GA
- ❌ "Free is evaluation-only / dev-only / not for production use"

Contact: [support@zen-mesh.io](mailto:support@zen-mesh.io)

---

## Related

- [Provider Package Lifecycle](../providerflow/provider-package-lifecycle) —
  ProviderFlow maturity semantics and quality gates
- [ProviderFlow Overview](../providerflow/overview) — Provider lifecycle canon
- [Provider Package V1 Readiness Matrix](../providerflow/provider-package-v1-readiness-matrix) —
  Per-provider gap tracking
- [Launch Status](../start-here/launch-status) — Existing launch status summary
- [Current Status](../start-here/current-status) — Evidence maturity and scope
- [V1 Security Validation Summary](../ai/v1-security-validation-summary) —
  V1 runtime security validation

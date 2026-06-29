---
sidebar_label: Post-Cloud Publication Plan
---

# Post-Cloud Publication Plan

This plan defines the publication stages for post-cloud provider validation
results. It applies only to docs, AI surfaces, and llms.txt updates that
reference live provider validation status.

## Rules

1. **No publication before all four providers pass** — Individual provider live
   validation results are not published until Stripe, GitHub, Shopify, and
   Twilio all pass their post-cloud validation.
2. **No public launch claim** — `public_launch=NO_GO` remains throughout. IP-restricted
   prod validation does not equal public launch.
3. **Evidence first, status second** — Evidence must be collected and claim-guarded
   before any status string is updated in AI surfaces or docs.
4. **llms.txt is the last surface updated** — The AI-discovery index is updated only
   after all other docs surfaces are finalized.
5. **Contact remains `support@zen-mesh.io`** — No new support email is introduced.

## Publication Sequence

```
Phase A: All four providers pass post-cloud validation
  └─ Step 1: Store evidence artifacts in 80-EVIDENCE/
  └─ Step 2: Claim-guard each artifact (verify no overclaims)
  └─ Step 3: Update v1-live-truth-matrix.md per-provider rows
      (live_e2e_status: cloud_gated → live_validated)
  └─ Step 4: Update v1-live-truth-matrix.json per-provider entries
  └─ Step 5: Update v1-live-evidence-index.md statuses
  └─ Step 6: Update llms.txt entry
  └─ Step 7: Update static/llms.txt entry (crawler-facing)

Phase B: All launch gates pass (public launch GO)
  └─ (Separate plan; not covered here)
```

## What Does NOT Change

| Surface | Stays As |
|---------|----------|
| `public_launch` | `NO_GO` (until separate launch gate) |
| `provider_registry.ga_claimed` | `false` (until GA program established) |
| `maturity` | `verified` (reflects local/contract readiness) |
| Free tier copy | Remains "Free Forever" — not "evaluation-only" |
| Support email | `support@zen-mesh.io` |

## Forbidden Publication

The following are **never** published, regardless of validation results:

- ❌ "Providers are live validated" as a blanket ecosystem claim
- ❌ "Provider Registry is GA"
- ❌ "Public launch GO"
- ❌ "Free is evaluation-only / dev-only / not for production use"
- ❌ Live credentials, API keys, tokens in any evidence artifact

## Related

- [V1 Live Truth Matrix](./v1-live-truth-matrix) — Canonical launch readiness state
- [V1 Live Evidence Index](./v1-live-evidence-index) — Evidence artifact tracking
- [Post-Cloud Provider Validation Overview](../providerflow/post-cloud-provider-validation-overview)
- [Public Claim Policy](./v1-live-truth-matrix#public-claim-policy)

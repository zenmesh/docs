---
sidebar_label: Provider Package Lifecycle
---

# Provider Package Lifecycle

Provider packages are Zen Mesh's strategic GTM surface for integrations. They are
YAML-first, versioned, and validated declarative definitions that control how
webhook events are processed and delivered. The runtime stays stable while
provider capabilities expand through new packages.

## Two Dimensions: Ownership × Maturity

Provider packages are classified along two independent dimensions. This replaces
the deprecated single-axis "experimental" label.

### Ownership

| Ownership | Meaning |
|-----------|---------|
| **Official** | Maintained by Zen Mesh. Full quality gates, SLA-backed for GA packages. |
| **Verified Community** | Community-contributed, reviewed and validated by Zen Mesh. |
| **Community** | Community-contributed, not yet verified. Best-effort support. |

### Maturity

| Maturity | Meaning |
|----------|---------|
| **Draft** | Schema exists but not all quality gates pass. Internal only. |
| **Preview** | Functional with core quality gates passing. Free/quota-exempt. |
| **Beta** | Most quality gates passing. Free grace period active. |
| **Verified** | All quality gates passing. Production-ready. |
| **GA** | Generally available. Counts toward normal billing. |

## Lifecycle Progression

```text
Draft → Preview → Beta → Verified → GA
```

A package moves through stages by passing progressively more quality gates.
A package may be at different maturity levels for different provider API versions.

## Billing Model

| Stage | Billing |
|-------|---------|
| **Draft** | Internal only — no billing. |
| **Preview** | Free / quota-exempt for at least 90 days. |
| **Beta promotion** | Notifies users of a 30-day free grace period, after which the package counts toward normal billing. |
| **GA** | Counts toward normal billing per plan limits. |

- Preview packages are **not** production-supported.
- Do not claim Preview/Beta packages are GA-quality.
- Do not imply unlimited free access beyond the defined grace periods.

## Preferred Language

| Say | Don't Say |
|-----|-----------|
| "Shopify Provider Package v1 is Preview" | "Shopify is experimental" |
| "Terraform Cloud Provider Package is Community Preview" | "Terraform is unsupported" |
| "Stripe Provider Package is GA" | "Stripe is production-ready (vague)" |

## Quality Gates

Every package should eventually pass all of these before GA:

1. Schema validation
2. Transforms
3. Policies/mappings
4. Fixtures
5. Golden outputs
6. Examples
7. Quickstart
8. E2E runbook
9. Troubleshooting
10. Readiness gate
11. Launch hardening
12. Observability mappings
13. Compatibility matrix
14. Version support policy
15. Migration guide from native provider setup
16. Benchmark/performance profile
17. Evidence status

### Stage Gate Summary

| Gate | Draft | Preview | Beta | Verified | GA |
|------|-------|---------|------|----------|----|
| Schema validation | ✓ | ✓ | ✓ | ✓ | ✓ |
| Fixtures | — | ✓ | ✓ | ✓ | ✓ |
| Golden outputs | — | ✓ | ✓ | ✓ | ✓ |
| Transforms | — | — | ✓ | ✓ | ✓ |
| Quickstart | — | — | ✓ | ✓ | ✓ |
| E2E runbook | — | — | ✓ | ✓ | ✓ |
| Readiness gate | — | — | — | ✓ | ✓ |
| Benchmark/perf | — | — | — | ✓ | ✓ |
| Evidence status | — | — | — | — | ✓ |

## Package Metadata

Every package carries metadata for discoverability and lifecycle management:

```yaml
metadata:
  name: stripe-v2
  version: 2.0.0
  provider: stripe
  ownership: Official
  maturity: GA
  provider_api_versions: ["2024-06-20"]
  test_status: passing
  last_validation: "2026-06-26T00:00:00Z"
  compatibility:
    min_platform_version: "1.0.0"
  evidence_status: verified
  maintainer: zenmesh
```

## Contribution Model

- Packages are defined as YAML files in the platform repository.
- Community contributions follow a PR-based workflow.
- Packages are validated (schema + fixtures + golden outputs) before promotion.
- Future direction: a standalone package repository for ecosystem growth.

### Ecosystem Goal

The long-term target is a provider/package ecosystem competitive with
~120 provider options, without lowering quality. Each package must pass
its quality gates at the appropriate maturity level before public listing.

## Current Packages

| Package | Provider | Ownership | Maturity | Notes |
|---------|----------|-----------|----------|-------|
| stripe-v2 | Stripe | Official | GA | Reference package |
| github-webhooks | GitHub | Official | GA | Reference package |
| shopify-webhooks | Shopify | Official | Preview | Parity path in progress |
| twilio-webhooks | Twilio | Official | Preview | Parity path in progress |

### Future Candidates (Community Preview)

These are roadmap candidates, not currently supported:

- Terraform Cloud
- Doppler
- PagerDuty
- Slack
- Datadog

Do not claim these are available today.

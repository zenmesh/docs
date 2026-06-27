---
sidebar_label: V1 Provider Package Readiness
---

# V1 Provider Package Readiness Matrix

Generated: 2026-06-26

## Purpose

This matrix audits the four V1 provider packages (Stripe, GitHub, Shopify, Twilio) against the full provider package contract. It identifies gaps that must be closed before each provider can be claimed as launch-complete.

**Do not claim a provider is V1-ready unless all gaps annotated as V1_BLOCKER are closed.**

## Legend

| Status | Meaning |
|--------|---------|
| ✅ DONE | Artifact exists and is validated |
| 🔶 PARTIAL | Artifact exists but has known gaps |
| ❌ MISSING | Artifact does not exist |
| ⬜ CLAIMED_ONLY | Artifact claimed but not evidenced |
| ➖ N/A | Not applicable (reason noted) |

## Matrix

| Artifact | Stripe | GitHub | Shopify | Twilio |
|----------|--------|--------|---------|--------|
| **Ownership** | Official | — | Official | — |
| **Maturity (docs)** | GA | — | Preview | — |
| **Maturity (package.yaml)** | production | production | production | production |
| **Package docs** | ✅ stripe-v2.md | ❌ MISSING | ✅ shopify-v2.md | ❌ MISSING |
| **Transform package** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Event YAML definitions** | ✅ 4 files | ✅ 3 files | ✅ 3 files | ✅ 4 files |
| **Fixtures** | ✅ 13 scenarios | 🔶 1 scenario | ✅ 5 scenarios | ✅ 5 scenarios |
| **Golden outputs** | ✅ 13 goldens | 🔶 1 golden | ✅ 5 goldens | ✅ 5 goldens |
| **Golden test validation** | 🔶 EXCLUDED | ✅ PASS | ✅ PASS | ✅ PASS |
| **Offline transform tests** | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| **Example files** | ✅ 1 | ✅ 1 | ✅ 1 | ✅ 1 |
| **Quickstart** | ✅ DONE | 🔶 Partial | ✅ DONE | ✅ DONE |
| **E2E runbook** | ✅ DONE | ❌ MISSING | ✅ DONE | ✅ DONE |
| **Troubleshooting** | ❌ MISSING | ❌ MISSING | ✅ DONE | ✅ DONE |
| **Readiness gate** | ❌ MISSING | ❌ MISSING | ✅ DONE | ✅ DONE |
| **Launch hardening** | ❌ MISSING | ❌ MISSING | ✅ DONE | ✅ DONE |
| **Authprofile module** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Ingester examples** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **HMAC/signature enforcement** | ✅ DONE | ✅ DONE | 🔶 PENDING | 🔶 PENDING |
| **Live E2E validated** | ✅ Validated | ❌ Not done | ❌ Not done | ❌ Not done |
| **Observability mappings** | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| **Compatibility matrix** | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| **Version support policy** | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| **Migration guide** | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| **Benchmark profile** | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| **Evidence manifest** | 🔶 PARTIAL | 🔶 PARTIAL | 🔶 PARTIAL | 🔶 PARTIAL |
| **llms/public AI sync** | 🔶 Implicit only | 🔶 Implicit only | 🔶 Implicit only | 🔶 Implicit only |

## V1 Blocker Summary

| Blocker | Providers | Severity |
|---------|-----------|----------|
| HMAC/signature enforcement PENDING | Shopify, Twilio | V1_BLOCKER (security) |
| Live E2E validation not performed | GitHub, Shopify, Twilio | V1_BLOCKER (integration) |
| Thin fixture coverage (1 fixture) | GitHub | V1_BLOCKER (quality) |
| Missing package docs | GitHub, Twilio | V1_BLOCKER (documentation) |
| Missing readiness gate doc | Stripe, GitHub | V1_BLOCKER (governance) |
| Missing launch hardening doc | Stripe, GitHub | V1_BLOCKER (governance) |
| Missing troubleshooting doc | Stripe, GitHub | V1_BLOCKER (operability) |
| Golden test suite excludes Stripe | Stripe | V1_BLOCKER (validation) |
| package.yaml maturity=production vs docs maturity mismatch | All | Needs reconciliation |

## V1.1 Items

| Item | Rationale |
|------|-----------|
| Observability mappings | Not required for initial launch; post-launch capability |
| Compatibility matrix | Needed when version drift becomes customer-facing, not at launch |
| Version support policy | Needed when deprecation policy is productized |
| Migration guide | Needed when v2 packages are released |
| Benchmark profile | Needed for SLA commitments, not V1 |

## Per-Provider V1 Readiness Assessment

### Stripe — CONDITIONAL PASS
- Strongest fixture coverage (13 scenarios)
- Live E2E validated with multiple runbooks
- **Blockers**: Missing readiness gate, launch hardening, troubleshooting docs; excluded from golden test suite
- **To close**: Add READINESS_GATE.md, LAUNCH_HARDENING.md, TROUBLESHOOTING.md; include Stripe in golden validation

### GitHub — V1_BLOCKED
- Thinnest coverage of all providers (1 fixture)
- No provider docs package in docs/providerflow/packages/
- No E2E runbook, no troubleshooting, no readiness gate, no launch hardening
- **To close**: Add docs package doc; expand fixtures (minimum 5); add E2E runbook, troubleshooting, readiness gate, launch hardening

### Shopify — V1_BLOCKED
- Template parity achieved but two V1_BLOCKER gaps:
  1. HMAC signature enforcement PENDING (high severity)
  2. Live webhook receipt NOT VALIDATED
- **To close**: Implement HMAC-SHA256 verification in authprofile; run live E2E with Shopify development store

### Twilio — V1_BLOCKED
- Template parity achieved but two V1_BLOCKER gaps:
  1. Request signature validation PENDING (high severity)
  2. Live webhook receipt NOT VALIDATED
  3. Form-encoding parsing runtime verification PENDING
- **To close**: Implement X-Twilio-Signature validation in authprofile; run live E2E with Twilio trial account

## Cross-Cutting Actions

| Action | Owner | Target |
|--------|-------|--------|
| Reconcile package.yaml `maturity: production` with actual readiness | Hermes + DocsAI | Pre-V1 |
| Add READINESS_GATE.md and LAUNCH_HARDENING.md for Stripe and GitHub | DocsAI | Pre-V1 |
| Add TROUBLESHOOTING.md for Stripe and GitHub | DocsAI | Pre-V1 |
| Include Stripe in golden validation test suite | Hermes | Pre-V1 |
| Expand GitHub fixtures to minimum 5 scenarios | Hermes | Pre-V1 |
| Add docs package for GitHub and Twilio | DocsAI | Pre-V1 |

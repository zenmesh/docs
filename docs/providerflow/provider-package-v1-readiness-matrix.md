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
| **Ownership** | Official | Official | Official | Official |
| **Maturity (docs)** | GA | Preview | Preview | Preview |
| **Maturity (package.yaml)** | production | production | production | production |
| **Package docs** | ✅ stripe-v2.md | ✅ github-v2.md | ✅ shopify-v2.md | ✅ twilio-v2.md |
| **Transform package** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Event YAML definitions** | ✅ 4 files | ✅ 3 files | ✅ 3 files | ✅ 4 files |
| **Fixtures** | ✅ 13 scenarios | 🔶 1 scenario | ✅ 5 scenarios | ✅ 5 scenarios |
| **Golden outputs** | ✅ 13 goldens | 🔶 1 golden | ✅ 5 goldens | ✅ 5 goldens |
| **Golden test validation** | 🔶 EXCLUDED | ✅ PASS | ✅ PASS | ✅ PASS |
| **Offline transform tests** | ✅ PASS | ✅ PASS | ✅ PASS | ✅ PASS |
| **Example files** | ✅ 1 | ✅ 1 | ✅ 1 | ✅ 1 |
| **Quickstart** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **E2E runbook** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Troubleshooting** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Readiness gate** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
| **Launch hardening** | ✅ DONE | ✅ DONE | ✅ DONE | ✅ DONE |
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

| Blocker | Providers | Severity | Owner |
|---------|-----------|----------|-------|
| HMAC/signature enforcement PENDING | Shopify, Twilio | V1_BLOCKER (security) | Hermes |
| Live E2E validation not performed | GitHub, Shopify, Twilio | V1_BLOCKER (integration) | Hermes + DocsAI |
| Thin fixture coverage (1 fixture) | GitHub | V1_BLOCKER (quality) | Hermes |
| Docs package created | Twilio | ✅ CLOSED | DocsAI |
| Golden test suite excludes Stripe | Stripe | V1_BLOCKER (validation) | Hermes |
| package.yaml maturity=production vs docs maturity mismatch | All | Needs reconciliation | Hermes + DocsAI |

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
- **Docs-owned blockers closed**: Readiness gate, launch hardening, troubleshooting — ✅ DONE
- **Remaining blocker**: Excluded from golden test suite (ST-02, Hermes)
- **To close**: Include Stripe in golden validation (Hermes — ST-02)

### GitHub — V1_BLOCKED
- Thinnest coverage of all providers (1 fixture)
- **Docs-owned blockers closed**: Package doc, E2E runbook, troubleshooting, readiness gate, launch hardening — ✅ DONE
- **Remaining blockers**: Fixture expansion (GH-01, Hermes), live E2E validation (Hermes + DocsAI)
- **To close**: Expand fixtures to minimum 5 (Hermes — GH-01); run live E2E validation and capture evidence

### Shopify — V1_BLOCKED
- Template parity achieved but two V1_BLOCKER gaps:
  1. HMAC signature enforcement PENDING (high severity)
  2. Live webhook receipt NOT VALIDATED
- **To close**: Implement HMAC-SHA256 verification in authprofile; run live E2E with Shopify development store

### Twilio — V1_BLOCKED
- Template parity achieved with package doc (twilio-v2.md) — ✅ DONE
- **Docs-owned blockers closed**: Package doc — ✅ DONE
- **Remaining blockers**: Request signature enforcement (TW-01, Hermes), Live E2E validation (TW-02, Hermes + DocsAI), Form-encoding runtime verification (TW-03, Hermes)
- **To close**: Close TW-01, TW-02, TW-03 before V1 claim

## Cross-Cutting Actions

| Action | Owner | Target | Status |
|--------|-------|--------|--------|
| Reconcile package.yaml `maturity: production` with actual readiness | Hermes + DocsAI | Pre-V1 | 🔶 PENDING |
| GitHub docs package (github-v2.md) | DocsAI | Pre-V1 | ✅ DONE |
| GitHub E2E runbook, troubleshooting, readiness gate, launch hardening | DocsAI | Pre-V1 | ✅ DONE |
| Stripe readiness gate, launch hardening, troubleshooting docs | DocsAI | Pre-V1 | ✅ DONE |
| Include Stripe in golden validation test suite | Hermes | Pre-V1 | ❌ PENDING (ST-02) |
| Expand GitHub fixtures to minimum 5 scenarios | Hermes | Pre-V1 | ❌ PENDING (GH-01) |
| Add Twilio docs package (twilio-v2.md) | DocsAI | Pre-V1 | ✅ DONE |

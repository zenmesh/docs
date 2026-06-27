---
sidebar_label: Trust Scenario Registry
---

# Trust Scenario Registry

Generated: 2026-06-26

## Purpose

This registry catalogs all Trust Scenarios for Zen Mesh webhook delivery validation. It is a planning and tracking document, not an implementation. Scenarios are grouped by maturity tier (V1, V1.1, Post-V1).

## Registry

### V1 Scenarios

| ID | Title | Validator Path | Evidence Path | Safe in Prod | Customer Runnable | AI Runnable | Owner | Status | Next Action |
|----|-------|---------------|---------------|-------------|-------------------|-------------|-------|--------|-------------|
| AUTH-2FA-01 | Local login returns TWO_FACTOR_REQUIRED when 2FA enabled | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ❌ No | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Implement 2FA enrollment path; prove TWO_FACOR_REQUIRED 403 |
| AUTH-2FA-02 | TOTP enrollment or sandbox-safe seed available | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ❌ No | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Implement TOTP enrollment; seed must be sandbox-safe for testing |
| AUTH-2FA-03 | Invalid OTP rejected | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ✅ Yes | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Implement OTP verification with rejection of invalid codes |
| AUTH-2FA-04 | Valid OTP completes authentication | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ✅ Yes | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Implement OTP verification with acceptance of valid codes |
| AUTH-2FA-05 | /me endpoint succeeds after 2FA | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ✅ Yes | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Verify authenticated /me call succeeds after 2FA completion |
| AUTH-2FA-06 | Authenticated route matrix succeeds after 2FA | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ✅ Yes | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Verify route access after 2FA for all V1 routes |
| AUTH-2FA-07 | 2FA enrollment/success/failure emits audit/security event | N/A — event path | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ❌ No | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Wire audit event emission for 2FA lifecycle events |
| AUTH-2FA-08 | Recovery/reset path exists or is operator-controlled | N/A — runtime endpoint | ~/zenmesh/docs/docs/80-EVIDENCE/docsai/r5-2fa-v1-security-contract/ | ❌ No | ❌ No | ❌ No | Hermes | ❌ V1_BLOCKER | Document recovery path; operator-controlled reset for V1 |
|----|-------|---------------|---------------|-------------|-------------------|-------------|-------|--------|-------------|
| TS-001 | Replay attack rejection (Stripe) | `testdata/stripe/stale_signature.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-002 | Replay attack rejection (Shopify) | N/A — dedup only | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on SH-01 (HMAC enforcement) |
| TS-003 | Replay attack rejection (Twilio) | N/A — dedup only | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on TW-01 (signature enforcement) |
| TS-004 | Invalid signature rejection (Stripe) | `testdata/stripe/invalid_signature.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-005 | Invalid signature rejection (Shopify) | N/A — HMAC not implemented | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on SH-01 |
| TS-006 | Invalid signature rejection (Twilio) | N/A — signature not implemented | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on TW-01 |
| TS-007 | Expired timestamp rejection (Stripe) | `testdata/stripe/stale_signature.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-008 | Missing signature header rejection | `testdata/stripe/missing_id.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-009 | Payload tampering rejection (Stripe) | Covered by HMAC validation | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-010 | Payload tampering rejection (Shopify) | Blocked on SH-01 | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on SH-01 |
| TS-011 | Payload tampering rejection (Twilio) | Blocked on TW-01 | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | Blocked on TW-01 |
| TS-012 | Malformed request rejection (Stripe) | `testdata/stripe/malformed_payload.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-013 | Duplicate delivery behavior (Stripe) | `testdata/stripe/payment_intent_succeeded_duplicate.*` + go test | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-014 | Duplicate delivery behavior (Shopify) | Dedup via idempotency key | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-015 | Duplicate delivery behavior (Twilio) | Dedup via MessageSid/CallSid | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-016 | Oversized payload rejection | Payload size enforcement | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ❌ No | Hermes | ✅ DONE | Maintain |
| TS-017 | Unknown event type rejection | Event type validation | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-018 | IP allowlist enforcement | IP allowlist validator | docs/providerflow/ | ✅ Yes | ✅ Yes | ❌ No | Hermes | ✅ DONE | Maintain |
| TS-019 | Missing required event fields | Schema validation | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ✅ Yes | Hermes | ✅ DONE | Maintain |
| TS-020 | Invalid content-type rejection | Content-type validation | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ❌ No | Hermes | ✅ DONE | Maintain |
| TS-021 | Delivery timeout enforcement | Timeout handling | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ❌ No | Hermes | ✅ DONE | Maintain |
| TS-022 | Unknown provider endpoint rejection | Provider routing | zen-platform docs/80-EVIDENCE/ | ✅ Yes | ❌ No | ❌ No | Hermes | ✅ DONE | Maintain |

### V1.1 Scenarios

| ID | Title | Validator Path | Evidence Path | Safe in Prod | Customer Runnable | AI Runnable | Owner | Status | Next Action |
|----|-------|---------------|---------------|-------------|-------------------|-------------|-------|--------|-------------|
| TS-101 | Trust Lab automated suite | N/A — framework not built | N/A | ❌ No | ❌ No | ❌ No | Hermes + DocsAI | ❌ PENDING | V1.1 framework |
| TS-102 | Header filtering validation | Header management module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 Business+ |
| TS-103 | Header blocking validation | Header management module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 Business+ |
| TS-104 | Header transform validation | Header management module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 Business+ |
| TS-105 | GitHub BaseURL SSRF hardening | SSRF prevention module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 (V1_PARTIAL risk) |
| TS-106 | GitLab BaseURL SSRF hardening | SSRF prevention module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 (V1_SAFE_WITH_DOC) |
| TS-107 | Bitbucket BaseURL SSRF hardening | SSRF prevention module | N/A | ❌ No | ❌ No | ❌ No | Hermes | ❌ PENDING | V1.1 (V1_SAFE_WITH_DOC) |
| TS-108 | mTLS certificate expiry rejection | Certificate validation | N/A | ❌ No | ❌ No | ❌ No | Hermes | 🔶 PARTIAL | Platform-level exists; per-webhook pending |
| TS-109 | Cross-tenant isolation / RLS | Tenant isolation | N/A | ❌ No | ❌ No | ❌ No | Hermes | 🔶 PARTIAL | Design exists; per-webhook RLS pending |

### Post-V1 Scenarios

| ID | Title | Status | Owner |
|----|-------|--------|-------|
| TS-201 | Customer-runnable Trust Scenarios | ❌ PENDING | DocsAI |
| TS-202 | AI-orchestrated Trust Scenarios | ❌ PENDING | DocsAI + Hermes |
| TS-203 | Synthetic monitoring integration | ❌ PENDING | Hermes |
| TS-204 | Historical trust evidence comparison | ❌ PENDING | Hermes |
| TS-205 | DNS rebinding on delivery target | ❌ PENDING | Hermes |

## Summary

| Tier | Total | DONE | PENDING | PARTIAL | V1_BLOCKER |
|------|-------|------|---------|---------|------------|
| V1 | 30 | 15 | 6 | 1 | 8 |
| V1.1 | 9 | 0 | 8 | 1 | 0 |
| Post-V1 | 5 | 0 | 5 | 0 | 0 |
| **Total** | **44** | **15** | **19** | **2** | **8** |

## Key Gaps

The 6 pending V1 scenarios are blocked on Shopify/Twilio HMAC/signature enforcement (SH-01, TW-01). The 8 AUTH-2FA-* scenarios are all V1_BLOCKER pending Hermes R22 runtime evidence. Core Stripe scenarios are all DONE.

## Usage

- **Hermes**: Update this registry when scenarios are implemented or status changes.
- **DocsAI**: Sync registry changes to public surfaces when scenarios become customer-facing.
- **Reviewers**: Before claiming a security capability, verify it appears in this registry with DONE status.

## Related

- [Trust Lab](./trust-lab)
- [Security Validation Suite](./security-validation-suite)
- [Security Validation V1 Cutline](./security-validation-v1-cutline)
- [Security Tiering](./security-tiering)

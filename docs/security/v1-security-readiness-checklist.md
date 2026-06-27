---
sidebar_label: V1 Security Readiness Checklist
---

# V1 Security Readiness Checklist

Generated: 2026-06-26

## Purpose

This checklist defines the security controls and validations required to claim V1 security readiness. It is a tracking document, not an implementation. Items are V1_BLOCKER unless otherwise noted.

## Checklist

| # | Item | Category | Owner | Status | Evidence |
|---|------|----------|-------|--------|----------|
| 1 | Provider signature verification (Stripe) | provider security | Hermes | ✅ DONE | stripe-signature-v1 authProfile |
| 2 | Provider signature verification (Shopify HMAC) | provider security | Hermes | ❌ V1_BLOCKER (SH-01) | — |
| 3 | Provider signature verification (Twilio) | provider security | Hermes | ❌ V1_BLOCKER (TW-01) | — |
| 4 | Live E2E validation (GitHub) | provider integration | Hermes + DocsAI | ❌ V1_BLOCKER (GH-01) | — |
| 5 | Live E2E validation (Shopify) | provider integration | Hermes + DocsAI | ❌ V1_BLOCKER (SH-02) | — |
| 6 | Live E2E validation (Twilio) | provider integration | Hermes + DocsAI | ❌ V1_BLOCKER (TW-02) | — |
| 7 | Twilio form-encoding runtime verification | provider security | Hermes | ❌ V1_BLOCKER (TW-03) | — |
| 8 | Stripe golden test suite inclusion | provider validation | Hermes | ❌ V1_BLOCKER (ST-02) | — |
| 9 | Local/password auth 2FA enrollment | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 10 | Local/password auth 2FA verification (invalid OTP rejected) | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 11 | Local/password auth 2FA verification (valid OTP accepted) | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 12 | Route matrix accessible after 2FA | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 13 | /me endpoint succeeds after 2FA | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 14 | 2FA audit/security events | observability | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 15 | 2FA recovery/reset path | authentication | Hermes | ❌ V1_BLOCKER (pending R22) | — |
| 16 | OIDC MFA delegation to IdP (when configured) | authentication | Hermes | 🔶 V1_PARTIAL (requires docs) | — |
| 17 | Acceptance gate contract-aware | infrastructure | Hermes | 🔶 PARTIAL | R21 gate |
| 18 | Authenticated routes fail 403 TWO_FACTOR_REQUIRED | authentication | Hermes | 🔶 PARTIAL | R21 gate |

## 2FA/MFA Notes

- **Local/password auth**: App-level 2FA (TOTP) is a V1 prerequisite. Enrollment, OTP verification (valid + invalid), route acceptance, audit events, and recovery path are all required.
- **Google/OIDC auth**: May rely on identity provider MFA for V1 when configured. This is V1_PARTIAL — the IdP MFA configuration must be documented. If app-level MFA is later required for OIDC as well, that becomes a future hardening item.
- **Status**: 2FA/MFA is V1_BLOCKER until Hermes R22 proves end-to-end enrollment, verification, and route acceptance after 2FA.

## Legend

| Status | Meaning |
|--------|---------|
| ✅ DONE | Implemented and evidenced |
| ❌ V1_BLOCKER | Must be resolved before V1 claim |
| 🔶 V1_PARTIAL | Works for some configurations or requires documentation |
| 🔶 PARTIAL | Implemented for some paths |

## Related

- [Security Validation V1 Cutline](./security-validation-v1-cutline)
- [Trust Scenario Registry](./trust-scenario-registry)
- [Security Validation Suite](./security-validation-suite)

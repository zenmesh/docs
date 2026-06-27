---
sidebar_label: Security Validation V1 Cutline
---

# Security Validation V1 Cutline

Generated: 2026-06-26

## Purpose

This page defines which security validation scenarios are required for V1, V1 Pro+, V1.1, and post-V1. It prevents overclaiming and ensures the validation roadmap is transparent.

## V1 Required (All Plans)

These are negative security basics that every V1 deployment must pass:

| Scenario | Control | Status |
|----------|---------|--------|
| Replay attack rejection | Nonce deduplication + timestamp window | 🔶 PARTIAL — Implemented for Stripe; Shopify/Twilio dedup-only |
| Expired timestamp rejection | Timestamp skew validation | 🔶 PARTIAL — Implemented for Stripe; Shopify/Twilio pending |
| Invalid signature rejection | Cryptographic signature verification | ✅ Stripe; ❌ Shopify HMAC PENDING; ❌ Twilio signature PENDING |
| Missing signature header rejection | Required header validation | ✅ DONE |
| Payload tampering rejection | HMAC covers full payload | ✅ Stripe; ❌ Shopify/Twilio |
| Malformed request rejection | Schema validation | ✅ DONE |
| Unknown event type rejection | Event type validation | ✅ DONE |
| Missing required event fields | Required field validation | ✅ DONE |
| Oversized payload rejection (>1 MB Pro, >256 KB Free) | Payload size limits | ✅ DONE |
| Invalid content-type rejection | Content-type validation | ✅ DONE |
| Unknown provider endpoint rejection | Provider routing validation | ✅ DONE |
| Duplicate delivery detection | Idempotency key matching | ✅ DONE |
| Delivery timeout enforcement | Delivery timeout | ✅ DONE |

## V1 Pro+ Required

| Scenario | Control | Plan | Status |
|----------|---------|------|--------|
| IP allowlist enforcement | Source IP deny-by-default | Pro+ | ✅ DONE |
| IP block enforcement | Explicit IP deny list | Pro+ | ✅ DONE |

## V1 Docs-Only / Non-Claim

These scenarios are documented in the Security Validation Suite but are NOT claimed as V1-complete. They describe design intent, not current capability.

| Scenario | Rationale |
|----------|-----------|
| mTLS certificate expiry rejection | mTLS is tested at infrastructure level; per-webhook mTLS validation is post-V1.1 |
| TLS version downgrade rejection | Platform-level enforcement exists; per-webhook TLS policy is post-V1.1 |
| Cross-tenant delivery target rejection | Tenant isolation design exists; per-webhook RLS validation is post-V1.1 |
| DNS rebinding on delivery target | Documented risk; no current mitigation |

## V1.1 Required

| Scenario | Control | Rationale |
|----------|---------|-----------|
| Header filtering/blocking/transform | HTTP header management | Business+ plan feature, V1.1 scope |
| GitHub user-controlled BaseURL SSRF hardening | SSRF prevention | Not exposed in V1 SaaS; V1.1 when self-hosted GitHub is supported |
| GitLab self-hosted BaseURL SSRF hardening | SSRF prevention | V1.1 when self-hosted GitLab is supported |
| Bitbucket self-hosted BaseURL SSRF hardening | SSRF prevention | V1.1 when self-hosted Bitbucket is supported |
| Trust Lab as full synthetic/continuous monitoring | Automated scenario execution | V1.1 framework; deterministic validators for V1 claims must exist before V1 |
| Provider-specific validation suites (Shopify, Twilio) | Negative security | Requires HMAC/signature implementation (V1 blocker for those providers) |

## Post-V1

| Scenario | Rationale |
|----------|-----------|
| Full Trust Lab automation (scheduled scenario runs) | V1.1+ product capability |
| Customer-runnable Trust Scenarios | Self-service validation, post-V1.1 |
| Synthetic monitoring integration | Post-V1.1 platform integration |
| AI-orchestrated Trust Scenarios | Post-V1.1 AI integration |

## Implementation Status Legend

| Status | Meaning |
|--------|---------|
| ✅ DONE | Implemented and evidenced |
| 🔶 PARTIAL | Implemented for some providers or configurations |
| ❌ PENDING | Not yet implemented |
| ➖ DESIGN | Design exists but not implemented |

## Key Rules

1. **Do not claim V1 security is complete** until all V1 Required scenarios are PASS for all V1-shipping providers.
2. **Do not claim SSRF protection** — SaaS SSRF is a documented gap (GAP-SSRF-SAAS-DISPATCH). SSRF hardening is V1.1.
3. **Do not claim Shopify/Twilio security validation** until HMAC/signature enforcement is implemented and live E2E validated.
4. **Deterministic validators for V1 claims must exist before V1.** AI-judged results are not sufficient for security claims.
5. **V1.1 items are not V1 blockers.** Do not block V1 on V1.1 scope.

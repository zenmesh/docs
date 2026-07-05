---
sidebar_label: V1 Security Validation Summary
---

# V1 Security Validation Summary

Local/sandbox attack validation for the V1 runtime baseline. This document summarizes validation results across 20 attack classes. **Not production-live proof. Not compliance certification. Not an external penetration test.**

## Scope

- All validation is **local/sandbox** unless explicitly marked otherwise.
- Cloud-gated checks are identified with `[CLOUD-GATED]`.
- `NOT_CLAIMED` entries are explicitly out of scope for V1.
- This is not a substitute for production-live penetration testing or compliance certification.

## Validation Results

| Attack Class | Status | Notes |
|-------------|--------|-------|
| Provider signature verification (Stripe wedge) | PROVEN | Local/mock validation on configured wedge path |
| Provider signature verification (GitHub) | PROVEN | Local/mock |
| Provider signature verification (Shopify) | PROVEN | Local/mock |
| Provider signature verification (Custom HMAC) | PROVEN | Local/mock |
| Provider signature verification (Twilio) | PARTIAL | Not V1-complete — form-urlencoded routing is PARTIAL |
| mTLS enforcement (agent routes) | PROVEN | Local/mock validated |
| HMAC verification (agent routes) | PROVEN | Local/mock validated |
| Idempotency / duplicate detection | PROVEN | Local/sandbox (FO-005, FO-006) |
| Tenant isolation (application layer) | PROVEN | Local/sandbox negative tests |
| API-key enumeration resistance | PROVEN | Negative-tested |
| MCP permission boundary | PROVEN | Handler-level negative tests |
| Integrity evidence | PROVEN | Automated integrity verification |
| Outbound-only edge delivery model | PROVEN | Architectural, validated in local/sandbox |
| Stripe cloud E2E proof | `[CLOUD-GATED]` | Historical proof exists on GKE; current revalidation AUTHORIZATION_BLOCKED |
| SSRF on SaaS dispatch | BACKLOG | Scoped controls exist (ValidateTargetURL, SSRFDialContext, FLOW-02/03 hardening) — SaaS-wide dispatch not validated |
| Redirect-chain abuse | PARTIAL | Webhook dispatch path uses NoRedirects/SafeRedirects — most other clients follow redirects by default |
| Parser / payload bombs | NOT_CLAIMED | No global validated parser limits |
| Rate-limit bypass | NOT_CLAIMED | Not validated across alternate surfaces |
| Timing side-channels | NOT_CLAIMED | Not validated |
| Header / forwarded-identity spoofing | NOT_CLAIMED | Trust boundary not validated |

## Machine-Readable Summary

For AI agents and automated tooling, a machine-readable version of this summary is available:

- **JSON:** [`/ai/security/v1/v1-security-validation-summary.json`](/ai/security/v1/v1-security-validation-summary.json)

## Related Resources

- [AI Security Posture](./security-posture) — claim maturity legend and reviewer highlights
- [Claim Maturity JSON](/ai/security/v1/claim-maturity.json) — maturity per control
- [Attack Model JSON](/ai/security/v1/attack-model.json) — threats and non-claims per attack
- [Security Gaps JSON](/ai/security/v1/gaps.json) — explicit post-V1 gaps
- [Non-Claims Registry](/ai/evidence/v1/non-claims.json) — global non-claims

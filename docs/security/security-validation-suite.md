---
sidebar_label: Security Validation Suite
description: Adversarial and boundary validation scenarios for webhook delivery security controls.
---

# Security Validation Suite

The Security Validation Suite (also referred to as the **Negative Security Test Suite**) validates that Zen Mesh security controls correctly reject, detect, or handle adversarial inputs and boundary conditions.

## Structure

Every scenario follows a consistent schema:

| Field | Description |
|-------|-------------|
| **Scenario / Attack** | What is being tested |
| **Result** | Accepted, Rejected, or Detected |
| **Why Rejected / Detected** | The control or mechanism that produced the result |
| **Evidence Artifact** | Where the result is recorded |
| **Operator Visibility** | How an operator can observe the result |

## Scenarios

### Authentication and Integrity

| Scenario | Expected Result | Control |
|----------|-----------------|---------|
| Invalid HMAC signature | Rejected | Signature verification rejects payload |
| Missing signature header | Rejected | Required header validation |
| Expired timestamp / stale nonce | Rejected | Replay protection (timestamp window + nonce tracking) |
| Replayed payload with valid signature | Detected / Rejected | Nonce deduplication |
| Payload tampering after signature | Rejected | HMAC covers full payload |
| Unknown provider endpoint | Rejected | Provider routing validation |

### Authorization and Identity

| Scenario | Expected Result | Control |
|----------|-----------------|---------|
| Request from IP outside allowlist | Rejected | IP allowlisting (deny-by-default) |
| Request without valid bearer token | Rejected | Bearer token validation |
| Request with expired API key | Rejected | API key validation |
| Cross-tenant delivery target | Rejected | Tenant isolation / RLS |
| Unauthorized delivery endpoint | Rejected | Target authentication |

### 2FA/MFA Authentication

| Scenario | Expected Result | V1 Status | Notes |
|----------|-----------------|-----------|-------|
| Local login with 2FA enabled | TWO_FACTOR_REQUIRED (403) | V1_BLOCKER pending R22 | Route returns 403 until 2FA completed |
| TOTP enrollment | Seed provisioned | V1_BLOCKER pending R22 | Sandbox-safe seed path required for testing |
| Invalid OTP verification | Rejected (401) | V1_BLOCKER pending R22 | Deterministic OTP validation |
| Valid OTP verification | Authenticated (200) | V1_BLOCKER pending R22 | Session/token issued after 2FA |
| /me after 2FA | Route accessible | V1_BLOCKER pending R22 | Proves auth session carries 2FA context |
| Authenticated routes after 2FA | Full route matrix accessible | V1_BLOCKER pending R22 | All V1 routes pass auth gate |
| 2FA audit event emission | Event recorded | V1_BLOCKER pending R22 | Enrollment/success/failure events |
| OIDC IdP MFA (when configured) | Delegated to IdP | V1_PARTIAL | Must be documented; no app-level MFA for OIDC V1 |

These scenarios are V1_BLOCKER until Hermes R22 proves end-to-end enrollment, verification, and route acceptance after 2FA. Do not claim 2FA is complete until all scenarios pass with runtime evidence.

### Schema and Input Validation

| Scenario | Expected Result | Control |
|----------|-----------------|---------|
| Malformed JSON payload | Rejected | Schema validation |
| Missing required event fields | Rejected | Required field validation |
| Unknown event type | Rejected | Event type validation |
| Oversized payload (>1 MB Pro, >256 KB Free) | Rejected | Payload size limits |
| Invalid content-type header | Rejected | Content-type validation |

### Delivery and Reliability

| Scenario | Expected Result | Control |
|----------|-----------------|---------|
| Delivery endpoint unreachable | Detected | Retry with DLQ exhaustion |
| Delivery endpoint returns 5xx | Detected | Retry with exponential backoff |
| Duplicate delivery request | Detected | Idempotency key matching |
| Delivery timeout | Detected | Delivery timeout enforcement |

### Infrastructure and Connectivity

| Scenario | Expected Result | Control |
|----------|-----------------|---------|
| Edge Lite agent network disconnect | Detected | Agent heartbeat / reconnect |
| mTLS certificate expiry | Rejected | Certificate validation |
| TLS version downgrade attempt | Rejected | TLS minimum version enforcement |
| DNS rebinding on delivery target | Rejected | DNS resolution validation |

## Scope and Limitations

- Scenarios validate **individual controls**, not full system compromise chains.
- Some scenarios require specific configuration (e.g., IP allowlisting requires an allowlist to be configured).
- Results depend on the runtime environment (sandbox validation environment vs. production).
- The suite covers Stripe, GitHub, Shopify, Twilio, and Custom webhook providers. Not every scenario is implemented for every provider.
- See [Trust Lab](./trust-lab) for operational/correctness validation scenarios.

## Status

The Security Validation Suite is under active development. Scenario coverage varies by provider. See the [capability manifest](https://www.zen-mesh.io/docs/ai/evidence/v1/manifest.json) for current proof_status per security control.

## Related

- [Trust Lab](./trust-lab)
- [Security Capability Validation](./security-capability-validation)
- [IP Allowlisting](./ip-allowlisting)
- [Header Validation](./header-validation)
- [Security Model](../providerflow/security-model)

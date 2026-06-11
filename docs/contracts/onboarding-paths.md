---
sidebar_label: Onboarding Happy and Failure Paths
description: Customer onboarding with happy path and failure path guides — signup, first source, first target, first route, failed signature, failed delivery, Free limit, upgrade path, evidence export, support request.
---

# Onboarding Happy and Failure Paths

> **Internal preparation — intended onboarding flows with common failure paths.**

## Happy Paths

### 1. Signup Happy Path

1. User visits [zen-mesh.io](https://zen-mesh.io)
2. Clicks "Get Started"
3. Fills in email, password, accepts terms
4. Verifies email via confirmation link
5. Tenant created — lands in empty dashboard
6. Guided prompt: "Create your first webhook source"

**Failure path:** Email verification timeout, password too weak, email already registered — see below.

### 2. First Source Happy Path

Latest provider: Stripe.

1. Dashboard → Create Source
2. Select "Stripe"
3. Enter source name (e.g. "Stripe Production")
4. Paste Stripe webhook signing secret
5. Save → source created, status: active
6. System begins listening for events from this source

**Failure path:** Invalid signing secret, network timeout, quota exceeded — see below.

### 3. First Target Happy Path

1. Dashboard → Create Target
2. Enter target URL (public or private with egress relay)
3. Optionally configure retry policy, timeout
4. Save → target created, status: active

**Failure path:** Invalid URL, connectivity check timeout, private target without egress relay.

### 4. First Route Happy Path

1. Dashboard → Create Route
2. Select source (from step 2)
3. Select target (from step 3)
4. Optionally add event type filters or JSONPath transforms
5. Save → route created, status: active
6. System begins delivering matching events from source to target

**Failure path:** Source/target not active, invalid filter, incompatible source/target configuration.

### 5. Send Test Event Happy Path

1. From the source details page, copy the webhook URL
2. Use curl or provider dashboard to send a test event
3. Navigate to Delivery Log
4. See the event with HTTP status 200
5. Click to view delivery evidence — timestamps, labels, status code

**Failure path:** Payload too large, source suspended, rate limited — see below.

### 6. Upgrade to Pro Happy Path

1. Dashboard → Billing Settings
2. Select Pro plan
3. Enter payment method (Stripe)
4. Confirm upgrade
5. Limits increase immediately

**Failure path:** Payment declined, Stripe integration not yet live (paid Pro not available until Stripe billing integration is complete).

### 7. Evidence Export Happy Path

1. Dashboard → Delivery Log
2. Select event
3. Click "Export Evidence"
4. Download delivery evidence JSON
5. (Pro+) Use API for bulk evidence export

**Failure path:** Free plan limit exceeded (UI-only export), Pro plan not provisioned.

### 8. Support Request Happy Path

1. Navigate to Support page
2. Fill in support form with tenant ID, description, redacted sample
3. Confirm consent checkbox
4. Submit
5. Receive auto-confirmation email
6. Support team responds per plan target response time

**Failure path:** Missing consent checkbox, unredacted secrets, incomplete form fields.

## Failure Paths

### A. Failed Signature Verification

| Step | What happens | Error code | Resolution |
|------|-------------|------------|------------|
| Event received | Source accepts the webhook POST | — | — |
| Signature check | HMAC or signing secret does not match | `signature_mismatch` | Rotate or re-copy the signing secret |
| Delivery status | Event delivered but marked `signature_failed` | — | Check signing secret configuration |
| Notification | Dashboard shows failed event with reason | — | Update source configuration |

### B. Failed Delivery (Target Unreachable)

| Step | What happens | Error code | Resolution |
|------|-------------|------------|------------|
| Event received | Source accepts the webhook POST | — | — |
| Route lookup | Route found, target identified | — | — |
| Delivery attempt | Target returns connection refused or timeout | `connection_refused`, `timeout` | Verify target service is running and reachable |
| Retry | Automatic retry with exponential backoff | — | Up to configured max retries |
| DLQ | After max retries, event moves to DLQ | — | Replay from DLQ after fixing target |

### C. Free Plan Hard Limit (429)

| Step | What happens | Error code | Resolution |
|------|-------------|------------|------------|
| POST to source | Webhook arrives at the ingress | — | — |
| Quota check | Monthly event limit or rate limit exceeded | `429 Too Many Requests` | See rate limit header for reset time |
| Response | HTTP 429 with `upgrade_url` to Pro | `rate_limit_exceeded` or `quota_exceeded` | Upgrade to Pro or wait for reset |
| Event handling | Event rejected, not processed | — | Re-send after limit resets or upgrade |

### D. Payment Declined (Pro Upgrade)

| Step | What happens | Resolution |
|------|-------------|------------|
| User enters card details | Stripe processes payment | — |
| Payment declined | Card issuer declines | Use different card, check with bank, contact support |
| Upgrade status | Upgrade incomplete — account remains on Free | — |
| Notification | Error message in billing UI | Try again with valid payment method |

### E. Overage Limit Reached (Pro with Opt-In Cap)

| Step | What happens | Resolution |
|------|-------------|------------|
| Usage exceeds plan limit | System checks overage cap | — |
| Cap is set | Soft limit enforced — upgrade guidance shown | Increase cap, upgrade to Business, or wait |
| Cap is not set | Soft limit with upgrade guidance | Customer can set an overage cap, upgrade, or do nothing |

### F. Support Request with Unredacted Secrets

| Step | What happens | Resolution |
|------|-------------|------------|
| Customer submits form | Support form received | — |
| Secrets detected | Support staff identifies unredacted secrets | Staff asks customer to resubmit with redacted data |
| Data handling | Support staff does not store unredacted payload | — |
| Resolution | Customer resubmits with redacted sample | — |

## See Also

- [Customer Onboarding Pack](/docs/contracts/customer-onboarding-pack) — full onboarding flow
- [Support Templates](/docs/contracts/support-templates) — customer-facing support templates
- [Getting Started Guides](/docs/getting-started/quick-start) — step-by-step guides
- [Plans & Limits](/docs/start-here/limits) — resource limits and over-limit behavior
- [Send a Test Webhook](/docs/getting-started/send-test-webhook) — test event guide

---
sidebar_label: Support Safe Payload Handling
description: Checklist for safely handling customer payload data in support — never paste secrets, redaction, customer authorization, time-bounded grant, audit, metadata-first default.
---

# Support Safe Payload Handling

> **Operational checklist for support staff handling customer payload data.** This describes the intended V1 behavior.

## Golden Rules

1. **Metadata first** — default support operations use metadata only (delivery status, timestamps, labels, event types, HTTP status codes). No raw payloads without authorization.
2. **Never request secrets** — support staff MUST NOT request raw API keys, tokens, passwords, SSH keys, certificates, or unredacted payloads as part of standard troubleshooting.
3. **Customer authorizes all payload access** — raw payload inspection requires explicit customer authorization per request.

## Customer-Facing: Never Paste Secrets

When contacting support, customers should:

- [ ] Redact API keys, tokens, passwords before sharing any data
- [ ] Redact PII (names, emails, addresses, phone numbers)
- [ ] Redact target URLs — remove embedded credentials
- [ ] Redact private certificates and SSH keys
- [ ] Double-check redacted payloads before sending

## Support Staff Checklist

When handling a support request:

- [ ] **Start with metadata** — check delivery status, timestamps, labels, event types first
- [ ] **Ask for redacted samples** — never ask for unredacted payloads
- [ ] **If payload inspection is needed:**
  - [ ] Request explicit customer authorization (scope, purpose, duration)
  - [ ] Log the authorization — who, what scope, what duration, why
  - [ ] Access only the minimum payload data needed
  - [ ] Do not browse or explore beyond the authorized scope
  - [ ] Revoke access when the issue is resolved
- [ ] **Never** browse raw payloads without authorization
- [ ] **Never** share payload data outside the support team
- [ ] **Always** log what was accessed and why

## Time-Bounded Grant Process

For cases where payload inspection is required:

1. **Customer initiates** — customer contacts support saying they need help with a payload-related issue
2. **Support explains** — staff explains what data access is needed and why
3. **Customer authorizes** — customer explicitly agrees to time-bounded payload access
4. **Access granted** — staff receives scoped access to specific event payloads only
5. **Access audited** — purpose, scope, duration are recorded in the audit log
6. **Access revoked** — when the issue is resolved or the time bound expires
7. **Customer can revoke** — at any time

## Audit Trail

Every payload access grant is recorded:

| Field | Value |
|-------|-------|
| Tenant ID | Who owns the data |
| Support staff ID | Who accessed it |
| Purpose | Why access was needed |
| Scope | Which events/resources were accessed |
| Duration | Time bound for the grant |
| Customer authorization | Proof of customer consent |
| Revocation time | When access was revoked |

## What Support Can See Without Authorization

| Data | Default access |
|------|---------------|
| Delivery status | Yes |
| Timestamps | Yes |
| Labels | Yes |
| Event types | Yes |
| HTTP status codes | Yes |
| Error messages | Yes (with secrets automatically redacted) |
| Source/target/route configuration | Yes |
| Raw payload content | No — requires customer authorization |

## See Also

- [Support Payload Access Contract](/docs/contracts/support-payload-access) — V1 contract for payload access
- [Support Templates](/docs/contracts/support-templates) — customer-facing support templates
- [Support Center D1 Spec](/docs/contracts/support-center-d1-spec) — support center specification
- [Support](/docs/start-here/support) — support channels
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, access policy

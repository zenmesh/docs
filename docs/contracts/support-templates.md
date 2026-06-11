---
sidebar_label: Support Templates
description: Customer-facing support templates — incident report, billing issue, provider webhook issue, delivery failure, payload/sample sharing guidance, refund request, deletion/export request.
---

# Support Templates

> **Customer-facing templates for common support requests.** These are guidance, not a guarantee of response time or resolution.

## Incident Report Template

Use this to report a delivery incident:

```
Subject: [Incident] <brief description>

Tenant ID: <your-tenant-id>
Plan: Free / Pro / Business
Provider: Stripe / GitHub / Custom / Shopify / Twilio
Event ID (if known): <event-id>
Route ID (if known): <route-id>
Start time (UTC): <YYYY-MM-DD HH:MM UTC>
End time (UTC): <YYYY-MM-DD HH:MM UTC>

Description:
<what happened, what you observed, what you expected>

Affected resources:
<list of sources, targets, routes affected>

Impact:
<how many events, which customers, which endpoints>

Steps taken so far:
<what you've tried>
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

## Billing Issue Template

Use this for billing questions, overage disputes, or upgrade/downgrade issues:

```
Subject: [Billing] <brief description>

Tenant ID: <your-tenant-id>
Plan: Free / Pro / Business
Invoice ID (if known): <invoice-id>

Issue type:
[ ] Charge not expected
[ ] Upgrade/downgrade issue
[ ] Overage cap question
[ ] Refund request
[ ] Payment method issue
[ ] Other

Description:
<what happened>

Expected resolution:
<what you'd like to happen>
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

## Provider Webhook Issue Template

Use this for issues with a specific webhook provider (Stripe, GitHub, Custom):

```
Subject: [Provider] <provider name> — <brief description>

Tenant ID: <your-tenant-id>
Provider: Stripe / GitHub / Custom
Source ID: <source-id>
Provider event type: <event type, e.g. invoice.paid, push>
Event ID: <event-id>

Issue type:
[ ] Event not received
[ ] Event received but not delivered
[ ] Signature verification failed
[ ] Incorrect event data
[ ] Rate limiting
[ ] Other

Error message:
<copy the error from delivery log, with secrets redacted>

Redacted payload (if applicable):
<include a redacted sample of the webhook payload — remove all secrets, keys, tokens>
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

## Delivery Failure Template

Use this for a failed delivery to your target:

```
Subject: [Delivery Failure] <brief description>

Tenant ID: <your-tenant-id>
Route ID: <route-id>
Target ID: <target-id>
Event ID: <event-id>
Delivery attempt number: <1, 2, 3...>

Target URL: <redacted destination URL — remove credentials>
HTTP status received: <status code>
Error message: <from delivery log>

Retry behavior:
[ ] Delivery retried automatically (how many times?)
[ ] Delivery not retried
[ ] Event landed in DLQ

Target service logs:
<what your target service observed, if available — no secrets>
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

## Payload / Sample Sharing Guidance

When sharing payload samples with support:

**Never include:**
- API keys, tokens, passwords, or authentication credentials
- SSH keys, certificates, or private keys
- PII (personally identifiable information) — names, emails, addresses, phone numbers
- Full target URLs with embedded credentials
- Customer secrets or sensitive business data

**Redaction process:**
1. Copy the payload
2. Replace key values with `[REDACTED]`
3. Verify no secrets remain
4. Submit with the consent checkbox confirmed

**Example — before:**
```json
{
  "api_key": "sk_live_abc123def456",
  "customer_email": "customer@example.com",
  "plan": "pro"
}
```

**Example — after:**
```json
{
  "api_key": "[REDACTED]",
  "customer_email": "[REDACTED]",
  "plan": "pro"
}
```

## Refund Request Template

Use this to request a refund:

```
Subject: [Refund Request] <tenant-id>

Tenant ID: <your-tenant-id>
Invoice ID: <invoice-id>
Plan: Pro / Business
Amount paid: <amount>
Payment date: <date>

Reason for refund:
<why you're requesting a refund>

Preferred resolution:
[ ] Full refund
[ ] Partial refund
[ ] Credit toward future billing
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

Refunds are processed according to the plan terms. See [Plans & Limits](/docs/start-here/limits).

## Deletion / Export Request Template

Use this to request data deletion or export (available to all plans):

```
Subject: [Data Request] <tenant-id> — Deletion / Export

Tenant ID: <your-tenant-id>
Request type:
[ ] Delete all data for this tenant
[ ] Export all data for this tenant
[ ] Delete specific resources (list below)
[ ] Export specific resources (list below)

Resource IDs (if specific):
<source-id, target-id, route-id, event-id>

Reason (for deletion):
<what prompted this request>

Preferred contact method:
Email: <email>
```

Send to [support@zen-mesh.io](mailto:support@zen-mesh.io).

**Processing time:** Reasonable efforts to process within 30 days of verified request.

## Permission Issue Support Playbook

Use this for suspected over-permissioning or access issues.

### Safe Initial Questions

When a user reports a permission issue, ask:

- **User or group experiencing the issue?** — helps identify the affected scope
- **Which channel?** — UI, API, or MCP?
- **What action was attempted?** — read, write, admin?
- **Label filter (if any)?** — what labels were scoping the access
- **Route or provider involved?** — helps narrow the resource scope
- **Event or evidence ID?** — if the issue involves data access

### Never Ask By Default

- Raw API keys, tokens, or passwords
- Raw webhook payloads (ask for redacted samples)
- SSH keys, certificates, or private keys
- Full target URLs with embedded credentials

### Escalation

If a user reports suspected over-permissioning (e.g., a user can see resources they should not):

1. Verify the user's group membership and channel configuration
2. Check the audit log for recent permission changes
3. Review label scopes on the affected resources
4. If confirmed, revoke or narrow the permission
5. Log the finding and resolution
6. Escalate to security@ if the over-permissioning exposed sensitive data

## See Also

- [Support Center D1 Spec](/docs/contracts/support-center-d1-spec) — support center specification
- [Support Safe Payload Handling](/docs/contracts/support-safe-payload-handling) — payload handling checklist
- [Support Payload Access Contract](/docs/contracts/support-payload-access) — payload access policy
- [Support](/docs/start-here/support) — support channels
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, access policy

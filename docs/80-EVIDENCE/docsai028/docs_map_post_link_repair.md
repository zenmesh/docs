# Docs Map for Reviewers — DOCSAI028

## Current Status

All 46 pre-existing broken links from DOCSAI027 have been repaired.

## Key Components

### Legal Draft Pages (12)
- [Terms](./legal/terms.md)
- [Privacy](./legal/privacy.md)
- [DPA](./legal/dpa.md)
- [AUP](./legal/aup.md)
- [Cookie/Tracker Disclosure](./legal/cookie-disclosure.md)
- [Subprocessors](./legal/subprocessors.md)
- [SCC Transfer](./legal/scc-transfer.md)
- [Responsible Disclosure](./legal/responsible-disclosure.md)
- [Billing/Refund/Plan Terms](./legal/billing-terms.md)
- [Design Partner Terms](./legal/design-partner-terms.md)
- [Retention/Lifecycle](./legal/retention-lifecycle.md)
- [Breach Notice](./legal/breach-notice.md)

### Trust Center (1)
- [Trust Center/Buyer Room](./trust/trust-center.md)

### AI Pages (5)
- [Overview](./ai/overview.md)
- [Security Posture](./ai/security-posture.md)
- [Wedge Overview](./ai/wedge-overview.md)
- [Evidence Schema](./ai/evidence-schema.md)
- [Non-Claims](./ai/non-claims.md)

### Evidence Supersession (1)
- [AI Evidence V1 Supersession](./ai/evidence-v1-supersession.md)

### Security Pages (10)
- [Security Overview](./security/index.md)
- [Capability Validation](./security/security-capability-validation.md)
- [Agent-SaaS mTLS](./security/agent-saas-mtls.md)
- [ZenLock Credential Lifecycle](./security/zenlock-credential-lifecycle.md)
- [IP Allowlisting](./security/ip-allowlisting.md)
- [Header Validation](./security/header-validation.md)
- [Cryptographic Enrollment](./security/cryptographic-enrollment.md)
- [Secure Webhook Delivery](./security/secure-webhook-delivery.md)
- [Webhook Access Control](./security/webhook-access-control.md)
- [Tenant Isolation](./security/tenant-isolation.md)

### API Reference (15)
- [Overview](./api/overview.md)
- [Quick Start](./api/quickstart.md)
- [Examples](./api/examples.md)
- [Authentication](./api/authentication.md)
- [Errors](./api/errors.md)
- [Webhooks](./api/webhooks.md)
- [Evidence](./api/evidence.md)
- [Logs](./api/logs.md)
- [Events](./api/events.md)
- [Idempotency](./api/idempotency.md)
- [Replay](./api/replay.md)
- [Versioning](./api/versioning.md)
- [Rate Limits](./api/rate-limits.md)
- [Changelog](./api/changelog.md)
- [KubeZen Back API](./api/reference/kubezen-back-api.info.mdx)

### MCP Pages (7)
- [Overview](./mcp/overview.md)
- [Read-Only V1 Policy](./mcp/read-only-v1-policy.md)
- [Tools](./mcp/tools.md)
- [Examples](./mcp/examples.md)
- [Authentication](./api/authentication.md)
- [Authentication](./mcp/authentication.md)
- [Safety and Boundaries](./mcp/safety-and-boundaries.md)

### Reference (10)
- [Helm Chart](./reference/helm-chart.md)
- [CLI](./reference/cli.md)
- [API](./reference/api.md)
- [Customer API](./reference/customer-api.md)
- [MCP](./reference/mcp.md)
- [Configuration](./reference/configuration.md)
- [Webhook Delivery Evidence](./reference/webhook-delivery-evidence.md)
- [Webhook Observability](./reference/webhook-observability-and-evidence.md)
- [Delivery Status](./reference/delivery-status.md)
- [Webhook FAQ](./reference/webhook-faq.md)

### Additional Files (2)
- [llms.txt](./llms.txt) - Documentation index
- [zen-lock.md](./zen-lock.md) - Redirect stub

## Broken Links

**Before:** 46
**After:** 0

All broken links have been repaired through:
1. Replacing `/ai/evidence/v1/*.json` with `ai/evidence-schema.md`
2. Fixing `api/reference/kubezen-back-api` references
3. Creating `llms.txt` page
4. Creating `zen-lock.md` redirect stub
5. Creating `ai/evidence-v1-supersession.md` page

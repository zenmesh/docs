---
sidebar_label: Troubleshooting First Delivery
---

# Troubleshooting Your First Delivery

> Status: PUBLIC_CONTRACT_DRAFT. Not a production-live claim. Some actions may be gated or sandbox-only.

## Cannot Log In

| Problem | Likely cause | Next action |
|---|---|---|
| Dashboard returns error | Account may not be activated | Check your email for confirmation |
| Session expired | Token timed out | Log in again at app.zen-mesh.io |
| OIDC error | Identity provider issue | Try incognito/private window, clear cookies |

## No Targets

| Problem | Likely cause | Next action |
|---|---|---|
| Targets list is empty | No targets created yet | Create a target in **Connect → Targets** or via the [Targets API](../api/targets) |
| Target creation not available | UI gating or permissions | Use the API — [Targets API](../api/targets) |

## No Endpoints

| Problem | Likely cause | Next action |
|---|---|---|
| Endpoints list is empty | No endpoints created yet | Create an endpoint in **Connect → Endpoints** or via the [Endpoints API](../api/endpoints) |
| Ingestion URL missing | Endpoint not fully configured | Complete the endpoint setup in the dashboard |

## No Flows

| Problem | Likely cause | Next action |
|---|---|---|
| Flows list is empty | No flows created yet | Create a flow in **Connect → Flows** or via the [Flows API](../api/flows) |
| Cannot create flow | Endpoint or target not configured | Create an endpoint and target first |
| Flow validation error | Filter or transform syntax issue | Check JSONPath syntax — see [JSONPath Routing](../delivery/jsonpath-routing) |

## No Delivery Attempts

| Problem | Likely cause | Next action |
|---|---|---|
| Deliveries list is empty | No events have been sent yet | Send a test webhook to your endpoint's ingestion URL |
| Expected deliveries not showing | Flow not active or filter rules exclude events | Verify flow status and filter rules — see [Flows API](../api/flows) |

## Delivery Failed

| Problem | Likely cause | Next action |
|---|---|---|
| Delivery status is `failed` | Target rejected or unreachable | Inspect attempt details for HTTP response and error message |
| Target returned 4xx/5xx | Target application error | Check target URL and application logs |
| Target timed out | Network or application delay | Verify target reachability and response time |

## DLQ Empty

| Problem | Likely cause | Next action |
|---|---|---|
| DLQ shows no entries | No deliveries have failed | Check **Traffic → Deliveries** with status filter |
| DLQ retention expired | Failed delivery outside retention window | DLQ retention is configurable (default 7 days) |

## Retry Unavailable

| Problem | Likely cause | Next action |
|---|---|---|
| Retry option disabled | Delivery is not in `failed` state | Only failed deliveries can be retried |
| Retry not shown | UI gating | Use [Retry API](../api/retry) |

## Replay Unavailable

| Problem | Likely cause | Next action |
|---|---|---|
| Replay option disabled | Retained payload/context not available | Delivery may be outside retention window or payload not retained |
| Replay returns error | Replay requires retained context | Replay is gated by retained payload availability — see [Replay API](../api/replay) |

## Saved Payload Not Visible

| Problem | Likely cause | Next action |
|---|---|---|
| Saved payloads list empty | No payloads saved yet | Create a saved payload in **Traffic → Payloads** or via [Saved Payloads API](../api/saved-payloads) |
| Saved payload not found | Wrong tenant or deleted | Saved payloads are user-managed — they can be deleted |

## Evidence Unavailable

| Problem | Likely cause | Next action |
|---|---|---|
| Evidence not found | Delivery did not complete successfully | Evidence is only generated for successful deliveries |
| Evidence endpoint returns 404 | Wrong delivery ID or tenant | Verify delivery ID and tenant context |

## MCP Writes Disabled

| Problem | Likely cause | Next action |
|---|---|---|
| MCP write tool returns error | Write tools disabled by default | Enable write tool group in MCP configuration |
| Authorization error | MCP key lacks required scope | Issue MCP key with appropriate scopes |

## Billing Locked

| Problem | Likely cause | Next action |
|---|---|---|
| Plan upgrade not available | Billing is non-live/locked/planned | Free Forever tier covers evaluation needs |
| Payment method required | Not available in V1 | No billing is live for Free Forever tier |

## When to Contact Support

If you have tried the steps above and the issue persists:

- **Email:** support@zen-mesh.io
- **Include in your message:**
  - Description of the problem and what you were trying to do
  - Tenant/account context (if safe to share)
  - Trace or event IDs if available
  - What you have already tried
- **Do NOT include:**
  - API keys, tokens, or passwords
  - Credentials or secrets
  - Any sensitive data

Support is best-effort for Free and Pro tiers. No SLA or guaranteed response time.

---
sidebar_label: Custom Webhooks
description: Receive webhooks from any HTTP source — configure generic ingestion, signature verification, IP allowlisting, and routing for custom webhook providers.
---

# Custom Webhooks

Receive webhooks from any HTTP source that is not Stripe or GitHub.

## Overview

Zen Mesh can ingest webhooks from any HTTP client. A generic HTTP source accepts POST requests and applies configurable verification, filtering, and routing before delivery. This is suitable for custom applications, internal systems, or any webhook provider not covered by the built-in integrations.

## Creating a Generic Source

1. In the Zen Mesh dashboard, navigate to **Sources → Add Source**
2. Select **Generic HTTP** as the provider type
3. Configure:
   - **Name**: A descriptive identifier (e.g., `custom-analytics-events`)
   - **Ingestion URL**: The Zen Mesh URL where your source sends events
   - **Verification**: Choose your verification method
4. Save the source

## Verification Options

| Method | Description | Configured Via |
|--------|-------------|----------------|
| **HMAC-SHA256** | Verify request signature against a shared secret | Source settings |
| **Header Validation** | Check for required header values | Source settings |
| **IP Allowlisting** | Restrict accepted source IPs | Source settings |
| **None** | Accept all requests (not recommended for production) | Source settings |

### HMAC Verification

If your custom source supports signing requests:

1. Generate a shared secret
2. Configure it in both your source and Zen Mesh
3. Your source sends an `X-Signature-256` header with the HMAC-SHA256 digest of the request body
4. Zen Mesh computes the expected signature and rejects mismatches

### Header Validation

Require specific headers to be present on incoming requests:

```
Required Headers:
  X-Source-Token: <expected-value>
  X-Source-Version: ^2024\..*
```

Requests missing required headers or with non-matching values are rejected before delivery.

## Ingestion URLs

Each source receives a unique ingestion URL:

```
https://ingest.zen-mesh.io/hooks/<hook-id>
```

Your custom application sends POST requests to this URL. The request body must be valid JSON.

## Example: Custom Application Webhook

```bash
curl -X POST https://ingest.zen-mesh.io/hooks/hook_abc123 \
  -H "Content-Type: application/json" \
  -H "X-Source-Token: s3cr3t-t0k3n" \
  -d '{
    "event": "order.created",
    "data": {
      "order_id": "ORD-12345",
      "amount": 2999,
      "currency": "USD"
    }
  }'
```

## Filtering and Routing

Apply [JSONPath Routing](../delivery/jsonpath-routing) to filter events by content:

```json
{
  "match": {
    "jsonpath": "$.event",
    "exact": "order.created"
  }
}
```

Use [JSONPath Transforms](../delivery/jsonpath-transforms) to normalize payloads:

```json
[
  { "target": "event_id",  "source": "jsonpath", "expression": "$.data.order_id" },
  { "target": "amount",    "source": "jsonpath", "expression": "$.data.amount" },
  { "target": "source",    "source": "static",   "value": "custom-app" }
]
```

## Content Type

Zen Mesh accepts `application/json` payloads. The request body is parsed as JSON for filtering and transform operations. Other content types are delivered as-is but cannot be processed by JSONPath rules.

## Test Event Flow

To verify your custom webhook integration, send a test event using curl:

```bash
curl -X POST https://ingest.zen-mesh.io/hooks/<your-hook-id> \
  -H "Content-Type: application/json" \
  -H "X-Source-Token: s3cr3t-t0k3n" \
  -H "X-Signature-256: test_signature_value" \
  -d '{
    "event": "order.created",
    "data": {
      "order_id": "ORD-12345",
      "amount": 2999,
      "currency": "USD"
    }
  }'
```

Check delivery in the Zen Mesh dashboard under **Delivery Logs** — look for a `200` status and a successful delivery record. See [Send a Test Webhook](../getting-started/send-test-webhook) for more options.

## Payload, Log, and Evidence Visibility

| What | Visible To |
|------|------------|
| Delivery logs | Timestamps, HTTP status, destination URL (domain only), event type, label metadata |
| Evidence records | Delivery receipt, status code, label snapshots, optional payload if configured |
| Metadata (timestamps, status, labels) | Zen support by default |
| Raw payload content | Never stored in operational logs |
| Payload-level access | Requires explicit customer authorization per request |

Raw payload content is never written to operational logs. Payload inspection at the event level requires explicit authorization per request. See [Data Handling](../start-here/data-handling) and [Evidence Overview](../evidence/overview) for details.

## Labels and RBAC Recommendations

Apply labels to your custom webhook source and delivery flow resources:

```yaml
labels:
  team: analytics
  service: custom-scheduler
  environment: production
```

Label filters use AND semantics — specifying `team=analytics,environment=production` matches resources with both labels.

| Plan | Label Limit |
|------|-------------|
| Free | 5 labels per resource |
| Pro | 20 labels per resource |
| Business | 50 labels per resource (planned) |
| Enterprise | Custom |

RBAC and ABAC via label selectors are planned capabilities. The MCP can read and filter labels but cannot mutate them. See [Labels Platform](../guides/labels).

## Limits and Plan Notes

| Feature | Free | Pro |
|---------|------|-----|
| Endpoints | 3 | 50 |
| Events per month | 1,000 | 100,000 |
| Max payload size | 256 KB | 2 MB |
| JSONPath filters/transforms | — | Pro+ only |
| Evidence views/export | All plans | All plans |
| Fan-out | No | S3 fan-out planned/target |

**Over-limit behavior:** Free plans receive an HTTP 429 hard stop with an upgrade path. Pro plans receive warnings with overage and upgrade options.

See [Plans & Limits](../start-here/limits).

## Troubleshooting

**HMAC and header validation failures**
- Ensure the signing secret matches between your source and Zen Mesh
- Header validation is case-sensitive — verify header names and values match exactly
- Clock skew can cause HMAC mismatches if timestamps are part of the signing scheme

**Delivery failures**
- Verify the destination URL is reachable from Zen Mesh
- Check TLS configuration on your destination endpoint
- Review the delivery logs for HTTP status codes

**Missing events**
- Confirm your application is sending POST requests to the correct ingestion URL
- Check JSONPath routing filters — an overly restrictive filter may drop events
- Verify header validation rules are not rejecting valid requests

**Rate limiting**
- If your source sends events in bursts, consider adding client-side buffering
- If you see 429 responses, contact Zen Mesh support

See [Delivery Failures](../delivery/delivery-failures) and [Operations Troubleshooting](../operations/troubleshooting).

## Launch Status

Custom webhook integration is supported at launch. Configurable header validation, IP allowlisting, HMAC verification, and private network delivery are available.

## See Also

- [Onboarding: Create Your First Source](../getting-started/create-first-source)
- [Onboarding: Send a Test Webhook](../getting-started/send-test-webhook)
- [Onboarding: Read Delivery Evidence](../getting-started/read-delivery-evidence)
- [Security Overview](../security/)
- [Data Handling](../start-here/data-handling)
- [Support](../start-here/support)
- [Pricing](https://zen-mesh.io/pricing)
- [Plans & Limits](../start-here/limits)

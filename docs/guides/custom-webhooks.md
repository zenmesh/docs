---
sidebar_label: Custom Webhooks
description: Receive webhooks from any HTTP source — configure generic ingestion, signature verification, IP allowlisting, and routing for custom webhook providers.
---

# Custom Webhooks

Receive webhooks from any HTTP source that is not Stripe or GitHub.

## Overview

Zen Mesh can ingest webhooks from any HTTP client. A generic HTTP source accepts POST requests and applies configurable verification, filtering, and routing before delivery. This is suitable for custom applications, internal systems, or any webhook provider not covered by the built-in integrations.

## Creating a Generic Endpoint

1. In the Zen Mesh dashboard, navigate to **Endpoints → Add Endpoint**
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

## HMAC Verification

If your custom source supports signing requests:

1. Generate a shared secret
2. Configure it in both your source and Zen Mesh
3. Your source sends an `X-Signature-256` header with the HMAC-SHA256 digest of the request body
4. Zen Mesh computes the expected signature and rejects mismatches

## Header Validation

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

## Related

- [Sources (Legacy)](./sources) — all supported source types (reference)
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering by content
- [JSONPath Transforms](../delivery/jsonpath-transforms) — payload normalization
- [IP Allowlisting](../security/ip-allowlisting) — restrict source networks
- [Header Validation](../security/header-validation) — validate incoming headers
- [Private Network Delivery](https://www.zen-mesh.io/use-cases/webhook-delivery-to-private-networks) — private network delivery scenario on the marketing site

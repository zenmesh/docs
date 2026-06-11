---
sidebar_label: First Custom Webhook
description: Send webhooks from any HTTP client to Zen Mesh — configure a generic source, route events, and verify delivery to your target.
---

# Your First Custom Webhook

Send webhooks from any HTTP client — a custom application, internal service, or any webhook-capable system that is not Stripe or GitHub.

Zen Mesh ingests generic HTTP POST requests, applies optional verification, routes through your configured pipeline, and delivers to your target. This is the most flexible webhook source type.

**Status:** Available at launch.

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io)
- An application or script that can send HTTP POST requests with a JSON body
- A [target](./create-first-target) configured and reachable _(optional for testing — you can verify ingestion without a target)_

## Step-by-Step

### 1. Create a Generic HTTP Source

1. In the Zen Mesh dashboard, go to **Sources → Add Source**
2. Enter a name, for example `custom-monitoring-alerts`
3. Select **Generic HTTP** as the provider type
4. Under **Verification**, choose one of the following:

   **No verification (testing only):**

   ```
   verification:
     method: "none"
   ```

   **Shared secret verification (recommended before production):**

   ```
   verification:
     method: "secret_based"
     secret: "your_shared_secret"
     header: "X-Zen-Signature-256"
   ```

5. Optionally configure:
   - **Rate Limit** — max events per second from this source (default: 100)
   - **Allowed IPs** — restrict which source IPs can send events
6. Save the source and copy the ingestion URL

   ```
   https://ingest.zen-mesh.io/hooks/hook_ghi012jkl345
   ```

### 2. Create a Target

1. Go to **Targets → Add Target**
2. Enter a name, for example `alert-receiver`
3. Enter the URL of your service
4. If the service is on a private network, select your connected cluster
5. Click **Save**

See [Create Your First Target](./create-first-target) for details.

### 3. Create a Route

1. Go to **Routes → Add Route**
2. Enter a name, for example `monitoring-alerts-to-receiver`
3. Select the generic HTTP source you created
4. Select the target you created
5. Save and toggle the route to **Active**

See [Create Your First Route](./create-first-route) for details.

### 4. Add Labels

```
labels:
  team: platform
  environment: production
```

See [Use Labels](./use-labels).

## Test Your Integration

Send a test event with curl:

```bash
curl -X POST "https://ingest.zen-mesh.io/hooks/hook_ghi012jkl345" \
  -H "Content-Type: application/json" \
  -H "X-Zen-Event-Type: custom.event" \
  -d '{
    "id": "evt_001",
    "type": "alert.triggered",
    "source": "monitoring-agent-1",
    "severity": "warning",
    "message": "CPU threshold exceeded",
    "timestamp": "2026-06-11T15:00:00Z"
  }'
```

Expected response:

```
202 Accepted
x-zen-event-id: evt_abc123def456
x-zen-request-id: req_xyz789
```

If you enabled shared secret verification, include the signature header:

```bash
curl -X POST "https://ingest.zen-mesh.io/hooks/hook_ghi012jkl345" \
  -H "Content-Type: application/json" \
  -H "X-Zen-Signature-256: your_shared_secret" \
  -H "X-Zen-Event-Type: custom.event" \
  -d '{"type": "alert.triggered", "message": "test"}'
```

## Verify Delivery

1. Go to **Deliveries** in the Zen Mesh dashboard
2. Find the event by its `x-zen-event-id`
3. Confirm the status shows **delivered** (if you configured a target and route) or **pending** (if delivery is in progress)

## Check the Evidence Record

1. Click the event to open the evidence record
2. Review ingestion timestamp, delivery attempts, and payload hash

See [Read Delivery Evidence](./read-delivery-evidence).

## Troubleshooting

| Problem | Likely Cause |
|---------|--------------|
| `404` on POST | Ingestion URL is incorrect — verify the hook ID in the URL |
| `410` on POST | Source has been deleted — check your source still exists |
| `413 Payload Too Large` | Payload exceeds your plan's max size — see limits below |
| `202` but event not delivered | Route is paused or target is unreachable — check route status and target connectivity |
| `401` when verification is enabled | Shared secret mismatch — verify the secret header value matches the source config |
| **curl: exit code 6** | DNS resolution failure — check the URL hostname |
| Delivery shows `retrying` | Target returned a 5xx or timed out — Zen Mesh retries automatically |

## Relevant Limits

- **Free plan**: 1,000 events/month, 256 KB max payload, 3 sources
- **Pro plan**: 100,000 events/month, 2 MB max payload, 50 sources
- **Rate limit**: 60 req/min (Free), 600 req/min (Pro)
- Payloads exceeding your plan's max size are rejected with `413 Payload Too Large`

See [Plans & Limits](../start-here/limits) for the full breakdown.

## See Also

- [Custom Webhooks Guide](../guides/custom-webhooks) — full reference, verification methods, and IP allowlisting
- [Send a Test Webhook](./send-test-webhook)
- [Read Delivery Evidence](./read-delivery-evidence)
- [Plans & Limits](../start-here/limits)
- [Support](../start-here/support)

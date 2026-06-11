---
sidebar_label: Create Your First Source
description: Define an event origin in Zen Mesh — Stripe, GitHub, or generic HTTP.
---

# Create Your First Source

A **source** represents an external system that emits webhook events — Stripe, GitHub, a custom application, or any HTTP-capable origin. Sources are the entry point for events flowing through Zen Mesh.

## Prerequisites

- A Zen Mesh account ([free tier](https://zen-mesh.io))
- You've completed the [Quick Start](./quick-start)

## Navigate to Sources

1. Log in to the [Zen Mesh dashboard](https://dashboard.zen-mesh.io)
2. Click **Sources** in the sidebar
3. Click **Add Source**

## Configure Your Source

### Step 1: Choose a Name

Give your source a descriptive name:

| Field | Example |
|-------|---------|
| Name | `stripe-prod-payments` |
| Description (optional) | `Stripe payment events from production` |

### Step 2: Select Provider Type

Zen Mesh supports these source types:

| Provider | When to Use | Status |
|----------|-------------|--------|
| **Stripe** | Payment events, invoice lifecycle, dispute tracking | Available |
| **GitHub** | Push, PR, issue, and workflow events | Available |
| **Generic HTTP** | Any custom or internal system that sends HTTP webhooks | Available |
| **Shopify** | Order creation, fulfillment, inventory | Planned |
| **Twilio** | SMS, voice, conversation events | Planned |

Select the provider that matches your event origin. For this guide, choose **Generic HTTP**.

### Step 3: Verification Settings

Configure how Zen Mesh authenticates incoming events:

```yaml
verification:
  method: "secret_based"        # secret_based | signature_based | none
  secret: "whsec_your_secret"   # shared secret (provider-dependent)
  header: "X-Zen-Signature-256" # header containing the signature
```

For Generic HTTP sources, you can start without verification:

```
verification:
  method: "none"
```

We recommend adding verification before production use.

### Step 4: Configure the Ingestion URL

Zen Mesh generates a unique ingestion URL for each source:

```
https://ingest.zen-mesh.io/hooks/<source-id>
```

You can optionally set:
- **Rate Limit**: Max events per second from this source (default: 100)
- **Allowed IPs**: Restrict which IPs can send events to this source

### Step 5: Save and Copy Your Hook URL

1. Click **Save**
2. The source detail page shows your ingestion URL
3. Click the copy icon next to the URL

```
https://ingest.zen-mesh.io/hooks/hook_abc123def456
```

This URL is your endpoint — you configure it in Stripe, GitHub, or anywhere webhooks are sent.

## Verify the Source Appears

Your new source should appear in the Sources list:

```
Sources
├── stripe-prod-payments    ● Active    Hook: hook_abc123...
├── github-ci-webhooks       ● Active    Hook: hook_def789...
└── internal-monitoring      ● Active    Hook: hook_ghi012...
```

Status indicators:
- **Active**: Source is accepting events
- **Paused**: Source exists but events are not ingested
- **Error**: Configuration issue needs attention

## Next Steps

Now that you have a source, [create a target](./create-first-target) to define where events should be delivered.

## See Also

- [Sources Guide](../guides/sources)
- [Create Your First Target](./create-first-target)
- [Send a Test Webhook](./send-test-webhook)
- [API Overview](../api/overview)

---
sidebar_label: Quick Start
---

# Quick Start

Get webhooks flowing to your private network in under 5 minutes.

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io) (Free Forever tier available — no credit card required)
- A Kubernetes cluster (any version 1.24+)
- `helm` CLI installed

## Step 1: Create or open your Zen Mesh account

Sign up for the Free Forever plan. No credit card required. After signing in, navigate to the dashboard.

## Step 2: Create a webhook endpoint

1. Navigate to **Endpoints** in the sidebar
2. Click **Create Endpoint**
3. Give it a name (e.g., `stripe-payments`)

## Step 3: Choose a source template

Select the source type for your webhook:

| Source | Template |
|---|---|
| Stripe | Pre-configured Stripe webhook template |
| GitHub | Pre-configured GitHub webhook template |
| Twilio | Pre-configured Twilio webhook template |
| Shopify | Pre-configured Shopify webhook template |
| Custom | Generic HTTP webhook with configurable header validation |

Copy the ingestion URL provided by Zen Mesh (e.g., `https://ingest.zen-mesh.io/hooks/<hook-id>`).

## Step 4: Choose delivery mode

| Mode | When to use |
|---|---|
| **Standard delivery** | Your destination is reachable from the Zen Mesh data plane |
| **Outbound-only private delivery** | Your destination is behind NAT or firewall (requires edge enrollment) |

Default is **Standard delivery**.

## Step 5: Configure a destination

1. Navigate to **Destinations** in the sidebar
2. Click **Add Destination**
3. Enter the URL of the service that should receive webhooks
4. Select the delivery mode

## Step 6: Point your webhook source

Configure your webhook provider to send events to your ingestion URL:

- **Stripe**: Dashboard → Developers → Webhooks → Add endpoint
- **GitHub**: Repository → Settings → Webhooks → Add webhook
- **Twilio**: Console → Phone Numbers → Webhook configuration
- **Shopify**: Settings → Notifications → Webhook
- **Custom**: Configure your HTTP client to POST to the ingestion URL

## Step 7: Send a test event

Trigger a test event from your webhook source. In the dashboard **Deliveries** view, you should see the event with status details.

## Step 8: Verify delivery

Check the delivery status and logs in the dashboard. Your service should receive the payload.

## Next Steps

- [Configure delivery modes](../architecture/delivery-modes) for your network topology
- [Set up header validation](../security/header-validation) for source authenticity
- [Review plans and limits](../start-here/current-status) for Free/Pro boundaries
- Follow the [Stripe integration guide](../guides/stripe) or [GitHub integration guide](../guides/github) for detailed source setup

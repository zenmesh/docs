---
sidebar_label: Quick Start
---

# Quick Start

> Status: PUBLIC_CONTRACT_DRAFT. Steps reference capabilities at various statuses — see [Current Status](../reference/current-status) for per-capability maturity. Not a production-live claim.

Get webhooks flowing from a source (Stripe, GitHub, Twilio, Shopify, or any HTTP client) to your target service in the dashboard. Provider maturity varies — Stripe cloud E2E is pending revalidation, Twilio form-urlencoded routing is partial. See [Current Status](../reference/current-status) for per-provider detail.

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io) — sign up for Free Forever, no credit card required
- A target URL where events should be delivered (your service, a test endpoint, or a public webhook testing tool)

## Step 1: Log in and explore

Navigate to the [dashboard](https://app.zen-mesh.io) and log in. The left sidebar shows the three main areas:

| Area | What you manage |
|---|---|
| **Connect** | Endpoints, targets, flows — the routing chain |
| **Traffic** | Deliveries, DLQ, retry, replay, traces, saved payloads |
| **Trust** | Evidence, compliance information |

**See:** [Customer Journey](../getting-started/customer-journey) for the full onboarding map.

## Step 2: Create a target

1. Go to **Connect → Targets**
2. Click **Create Target**
3. Enter:
   - **Name:** `my-first-target`
   - **URL:** Your target service URL (e.g., `https://webhook.site/your-uuid`)
4. Click **Save**

The target is where events will be delivered. You can use a webhook testing service like [webhook.site](https://webhook.site) to see delivery details without setting up your own service.

**Status:** WIRED_SANDBOX

**See:** [Targets API](../api/targets) for programmatic creation.

## Step 3: Create an endpoint

1. Go to **Connect → Endpoints**
2. Click **Create Endpoint**
3. Enter:
   - **Name:** `my-first-endpoint`
   - **Source type:** Choose a template (Stripe, GitHub, Twilio, Shopify, or Custom)
4. Copy the **Ingestion URL** shown after creation — this is where your webhook source sends events

The endpoint is the receiver — where events first arrive in Zen Mesh.

**Status:** WIRED_SANDBOX

**See:** [Endpoints API](../api/endpoints), [Sources Guide](../guides/sources).

## Step 4: Create a flow

1. Go to **Connect → Flows**
2. Click **Create Flow**
3. Select your endpoint and target
4. Configure optional filter rules and transforms (JSONPath)
5. Click **Save**

The flow connects the endpoint to the target — it is the delivery contract.

**Status:** WIRED_SANDBOX

**See:** [Flows API](../api/flows).

## Step 5: Send a test event

Send an event to your endpoint's ingestion URL:

```bash
curl -X POST "https://ingest.zen-mesh.io/hooks/<your-hook-id>" \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": "hello from zen-mesh"}'
```

Or trigger a real event from your provider (Stripe test event, GitHub push, etc. — provider E2E status varies; see [Current Status](../reference/current-status)).

## Step 6: Verify delivery

1. Go to **Traffic → Deliveries**
2. You should see the event with a status
3. Click on the delivery to see attempt details — HTTP response, timing, status

**Status:** WIRED_SANDBOX

**See:** [Delivery Attempts API](../api/delivery-attempts).

## What's Available vs What's Planned

See the [Current Status Matrix](../reference/current-status) for a complete per-capability status reference.

| Capability | Status |
|---|---|
| Endpoint creation (dashboard) | WIRED_SANDBOX |
| Target creation (dashboard) | WIRED_SANDBOX |
| Flow creation (dashboard) | WIRED_SANDBOX |
| Delivery management (dashboard) | WIRED_SANDBOX |
| Customer API (all endpoints) | WIRED_SANDBOX |
| MCP read tools | PUBLIC_CONTRACT_DRAFT |
| MCP write tools | PUBLIC_CONTRACT_DRAFT (per-tool-group enablement) |
| GitOps | PLANNED |

## Non-Claims

- The dashboard is INTERNAL_ONLY — it is not a public customer contract
- Capabilities are WIRED_SANDBOX unless noted — no production-GA claim
- Delivery is scenario-specific (local/sandbox), not production-level
- MCP write tools are disabled by default — enable per tool group
- Customer API writes are permissioned and scoped — not available on all key types
- Retry is idempotent but does not guarantee delivery success
- See [Non-Claims](../ai/non-claims) for the full scope

## Next Steps

- [First 15 Minutes](../getting-started/first-15-minutes) — structured evaluator walkthrough
- [Customer Journey](../getting-started/customer-journey) — full onboarding map
- [Guides](../guides/traffic-lifecycle) — traffic lifecycle, evidence, troubleshooting
- [API Overview](../api/overview) — programmatic access
- [MCP Overview](../mcp/overview) — AI agent access
- [Plans and Limits](../start-here/plans-and-limits) — Free Forever vs Pro vs Business
- [Use Cases](https://www.zen-mesh.io/use-cases) — explore common private webhook delivery scenarios.

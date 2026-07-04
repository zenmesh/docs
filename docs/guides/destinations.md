---
sidebar_label: Destinations
---

# Destinations

A destination is a URL in your cluster where Zen Mesh delivers webhook events. Each destination is associated with a cluster and optionally an adapter.

## Creating a Destination

1. Navigate to **Destinations** in the dashboard
2. Click **Add Target**
3. Fill in:
   - **Name**: A descriptive name (e.g., `stripe-to-payment-service`)
   - **URL**: The internal URL of your service (e.g., `http://payment-svc:8080/webhooks`)
   - **Cluster**: Select the cluster where this service runs
   - **Adapter** (optional): Transform events for a specific service
4. Click **Save**

## Ingestion URL

After creating a destination, Zen Mesh provides an ingestion URL:

```
https://ingest.zen-mesh.io/hooks/<hook-id>
```

Configure your webhook source (Stripe, GitHub, etc.) to send events to this URL.

## Environment Scoping

Destinations can be scoped to environments (e.g., `production`, `staging`). This lets you route the same webhook source to different clusters based on the environment:

- `production` environment → delivers to production cluster
- `staging` environment → delivers to staging cluster

## Health Checks

Zen Mesh monitors destination health:

- **Healthy**: Delivery succeeding within SLA
- **Degraded**: High latency or intermittent failures
- **Unhealthy**: Consecutive delivery failures

Unhealthy destinations trigger automatic backoff and retry with exponential backoff.

## Delivery Guarantees

| Guarantee | Description |
|-----------|-------------|
| **At-least-once** | Events are retried until acknowledged or DLQ'd |
| **Ordered** | Events from the same source are delivered in order |
| **Idempotent** | Duplicate events are detected via HMAC signatures |

## Dead Letter Queue

Events that fail delivery after all retries are moved to a Dead Letter Queue (DLQ). You can inspect and replay DLQ events from the dashboard.

## Configuration Reference

| Setting | Description | Default |
|---------|-------------|---------|
| **Name** | Human-readable identifier for the destination | Required |
| **URL** | Target service URL where events are delivered | Required |
| **Cluster** | Cluster where the destination service runs | Required |
| **Adapter** | Transform events for provider-specific payloads | Optional |
| **Environment** | Environment scoping (production, staging, etc.) | Optional |
| **Retry Policy** | Max retries, backoff interval, timeout | Inherited from delivery flow |

## Example: Multiple Destinations

Route Stripe charge events to a payment service and an analytics pipeline:

```yaml
destinations:
  - name: payment-processor
    url: http://payment-svc:8080/webhooks
    cluster: prod-us-east
  - name: analytics-pipeline
    url: http://analytics:9090/events
    cluster: prod-us-east
```

## Related

- [Endpoints](./endpoints) — webhook entry point configuration
- [Delivery Flows and Routing](../delivery/routing-and-fan-out) — connect sources to destinations
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering and routing

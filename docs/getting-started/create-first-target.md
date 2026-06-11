---
sidebar_label: Create Your First Target
description: Define where webhooks are delivered — a URL in your cluster, a cloud endpoint, or behind your VPN.
---

# Create Your First Target

A **target** (also called a destination) is the endpoint where Zen Mesh delivers webhook events. Every target has a URL that Zen Mesh can reach — either directly (public endpoints) or through the `zen-egress` agent (private network).

## Prerequisites

- A Zen Mesh account and a connected cluster ([Quick Start](./quick-start))
- A [source](./create-first-source) to route events from

## Navigate to Targets

1. In the dashboard, click **Targets** in the sidebar
2. Click **Add Target**

## Configure Your Target

### Step 1: Name

```
Name: payment-webhook-receiver
Description (optional): Receives Stripe payment events in production
```

### Step 2: Service URL

The URL where Zen Mesh should deliver events:

| Target Type | Example URL |
|-------------|-------------|
| Public | `https://webhooks.myapp.com/events` |
| Cluster (Mode A) | `http://webhook-svc.namespace.svc.cluster.local:8080/hooks` |
| Cluster (Mode B) | `https://webhook-svc.namespace.svc.cluster.local/events` |

### Step 3: Cluster Selection (for private targets)

If your target runs inside a Kubernetes cluster, select which connected cluster can reach it:

```
Cluster: production-us-east
Target URL: http://webhook-receiver:8080/webhooks
```

Private network targets require `zen-egress` to be running in your cluster. `zen-egress` is installed by default with the Helm chart and handles mTLS-secured delivery to internal services.

### Step 4: Labels (Optional)

Attach labels to organize your targets:

```
labels:
  team: payments
  environment: production
  project: stripe-integration
```

Labels help you filter and discover targets later. See [Use Labels](./use-labels).

## Save and Verify

1. Click **Save**
2. The target appears in the targets list with a **Pending** status
3. Zen Mesh performs a connectivity check — the status changes to **Active** once reachable

```
Targets
├── payment-webhook-receiver    ● Active    → webhook-receiver:8080
├── slack-alerts               ● Active    → hooks.slack.com/services/...
└── internal-audit-log          ⚠ Pending → audit.internal:443
```

### Private Network Targets

If your target URL resolves only within your cluster or VPN, ensure:

1. `zen-egress` is deployed (included in the Helm chart)
2. The target's cluster is set to a **Connected** cluster
3. The target URL is resolvable from within the cluster

Without `zen-egress`, Zen Mesh cannot reach services on private networks or `localhost` addresses.

## Next Steps

Now that you have a source and a target, [create a route](./create-first-route) to connect them.

## See Also

- [Delivery Modes](../architecture/delivery-modes)
- [Targets Guide](../guides/destinations)
- [Create Your First Route](./create-first-route)
- [API Overview](../api/overview)

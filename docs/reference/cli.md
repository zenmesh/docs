---
sidebar_label: CLI
---

# CLI Reference

The Zen Mesh CLI provides command-line access to platform operations. Most configuration operations are also available through the dashboard and API.

## Prerequisites

- Zen Mesh CLI tool installed
- API key with appropriate scope (see [Authentication](../api/authentication))

## Commands

## `zen-mesh enroll`

Generate an enrollment bundle for a cluster.

```bash
zen-mesh enroll --cluster my-cluster --endpoint https://api.zen-mesh.io
```

| Flag | Description | Required |
|------|-------------|----------|
| `--cluster` | Cluster name | Yes |
| `--endpoint` | API endpoint URL | Yes |
| `--environment` | Environment scope (production, staging) | No |

## `zen-mesh status`

Check the enrollment and delivery status of your cluster.

```bash
zen-mesh status
```

Output includes cluster health, destination status, and recent delivery stats.

## `zen-mesh destinations`

Manage delivery destinations.

```bash
# List destinations
zen-mesh destinations list

# Show destination details
zen-mesh destinations show <destination-id>

# Create a destination
zen-mesh destinations create --name payment-svc --url http://svc:8080/webhooks
```

## `zen-mesh deliveries`

Inspect and manage webhook deliveries.

```bash
# List recent deliveries
zen-mesh deliveries list --last 1h

# Show delivery details
zen-mesh deliveries show <delivery-id>

# Show delivery attempts
zen-mesh deliveries attempts <delivery-id>

# List failed deliveries
zen-mesh deliveries list --status failed --last 24h
```

## `zen-mesh replay`

Replay events from the dead-letter queue.

```bash
zen-mesh replay <delivery-id>
```

## `zen-mesh sources`

Manage webhook sources.

```bash
# List sources
zen-mesh sources list

# Show source details
zen-mesh sources show <source-id>
```

## `zen-mesh help`

Show help for any command.

```bash
zen-mesh help
zen-mesh help deliveries
```

## Configuration

The CLI uses the following environment variables:

| Variable | Description |
|----------|-------------|
| `ZEN_API_KEY` | API key for authentication |
| `ZEN_TENANT_ID` | Tenant identifier |
| `ZEN_ENDPOINT` | API endpoint (default: https://api.zen-mesh.io) |

## Related

- [API Reference](../api/overview) — REST API documentation
- [Authentication](../api/authentication) — API key management
- [Delivery Status Reference](./delivery-status) — delivery state machine and troubleshooting

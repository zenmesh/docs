---
sidebar_label: Configuration
---

# Configuration

Zen Mesh components are configured via Helm values, environment variables, and CRDs.

## Environment Variables

### Agent

| Variable | Default | Description |
|----------|---------|-------------|
| `ZEN_SAAS_ENDPOINT` | `https://api.zen-mesh.io` | Control plane API endpoint |
| `ZEN_CLUSTER_ID` | — | Cluster ID (set during enrollment) |
| `ZEN_TENANT_ID` | — | Tenant ID (extracted from enrollment bundle) |
| `ZEN_LOG_LEVEL` | `info` | Log level: `debug`, `info`, `warn`, `error` |

### Egress

| Variable | Default | Description |
|----------|---------|-------------|
| `ZEN_TLS_ENABLED` | `true` | Enable mTLS for delivery |
| `ZEN_HMAC_ENFORCE` | `true` | Enforce HMAC validation on delivered events |

## CRDs

### DeliveryFlow

Defines how events are routed from an ingester to a destination.

### Destination

A delivery target (URL + cluster + adapter mapping).

### EndpointConfig

Configuration for delivery endpoints (timeouts, retries, headers).

### Ingester

An event intake point with its routing rules.

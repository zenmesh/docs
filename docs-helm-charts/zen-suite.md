---
sidebar_label: zen-suite
---

# zen-suite Chart

The umbrella chart that installs the complete Zen Mesh stack: agent, egress, ingester, and zen-lock.

## When to Use zen-suite

Use `zen-suite` instead of `zen-agent` when you want to:

- Run your own **local ingester** (self-hosted event intake)
- Deploy the **complete data plane** in your cluster
- Have full control over all Zen Mesh components

**Most customers should use `zen-agent` instead.** The standard setup uses the SaaS-hosted ingester — you only need the agent, egress, and zen-lock in your cluster.

## Install

```bash
helm repo add zenmesh https://zenmesh.github.io/helm-charts
helm repo update

helm upgrade --install zen-suite zenmesh/zen-suite \
  --namespace zen-mesh \
  --create-namespace \
  --set saas.endpoint="https://api.zen-mesh.io" \
  --set agent.enrollment.secretRef.name="zen-enrollment-bundle"
```

## What Gets Installed

| Component | Kind | Included in zen-agent? |
|-----------|------|----------------------|
| `zen-agent` | Deployment | ✅ Yes |
| `zen-egress` | Deployment | ✅ Yes |
| `zen-lock` | Deployment + Webhook | ✅ Yes |
| `zen-ingester` | Deployment | ❌ **No** — this is the difference |

## Additional Values

zen-suite includes all values from `zen-agent` plus:

### Ingester

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ingester.enabled` | bool | `true` | Deploy local ingester |
| `ingester.image.repository` | string | `zenmesh/zen-ingester` | Container image |
| `ingester.image.tag` | string | Chart appVersion | Image tag |
| `ingester.replicas` | int | `1` | Number of replicas |
| `ingester.tls.enabled` | bool | `true` | Enable TLS on ingester endpoint |
| `ingester.resources.requests.cpu` | string | `100m` | CPU request |
| `ingester.resources.requests.memory` | string | `128Mi` | Memory request |
| `ingester.ingress.enabled` | bool | `false` | Create Ingress resource |
| `ingester.ingress.className` | string | `""` | Ingress class name |
| `ingester.ingress.hosts` | list | `[]` | Ingress hostnames |
| `ingester.ingress.tls` | list | `[]` | TLS configuration |

## Example: Self-Hosted Ingester with Ingress

```yaml
# values-self-hosted.yaml
saas:
  endpoint: "https://api.zen-mesh.io"

ingester:
  ingress:
    enabled: true
    className: nginx
    hosts:
      - host: ingest.example.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: ingest-tls
        hosts:
          - ingest.example.com
```

```bash
helm upgrade --install zen-suite zenmesh/zen-suite \
  --namespace zen-mesh \
  -f values-self-hosted.yaml
```

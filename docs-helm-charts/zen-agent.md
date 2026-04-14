---
sidebar_label: zen-agent
---

# zen-agent Chart

The primary chart for deploying Zen Mesh edge components into your cluster.

## Prerequisites

- Kubernetes 1.24+
- Helm 3.8+

## Install

```bash
helm repo add zenmesh https://zenmesh.github.io/helm-charts
helm repo update

helm upgrade --install zen-agent zenmesh/zen-agent \
  --namespace zen-mesh \
  --create-namespace \
  --set saas.endpoint="https://api.zen-mesh.io" \
  --set agent.enrollment.secretRef.name="zen-enrollment-bundle"
```

## What Gets Installed

| Component | Kind | Purpose |
|-----------|------|---------|
| `zen-agent` | Deployment | Enrollment, heartbeat, config sync with control plane |
| `zen-egress` | Deployment | Delivers events to private services via mTLS |
| `zen-lock` | Deployment + MutatingWebhook | Zero-knowledge secret management |

## Values

### Global

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `global.imageRegistry` | string | `""` | Override global image registry |
| `global.imagePullSecrets` | list | `[]` | Image pull secrets for private registries |
| `saas.endpoint` | string | `https://api.zen-mesh.io` | Control plane API endpoint |

### Agent

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `agent.enabled` | bool | `true` | Deploy zen-agent |
| `agent.image.repository` | string | `zenmesh/zen-agent` | Container image |
| `agent.image.tag` | string | Chart appVersion | Image tag |
| `agent.image.pullPolicy` | string | `IfNotPresent` | Image pull policy |
| `agent.replicas` | int | `1` | Number of replicas |
| `agent.resources.requests.cpu` | string | `100m` | CPU request |
| `agent.resources.requests.memory` | string | `128Mi` | Memory request |
| `agent.resources.limits.cpu` | string | `500m` | CPU limit |
| `agent.resources.limits.memory` | string | `256Mi` | Memory limit |
| `agent.enrollment.secretRef.name` | string | — | **Required.** Name of the enrollment Secret |
| `agent.enrollment.secretRef.namespace` | string | Release namespace | Namespace of the enrollment Secret |
| `agent.logLevel` | string | `info` | `debug`, `info`, `warn`, `error` |
| `agent.extraEnv` | list | `[]` | Additional environment variables |
| `nodeSelector` | object | `{}` | Node selection constraints |
| `tolerations` | list | `[]` | Tolerations for taints |

### Egress

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `egress.enabled` | bool | `true` | Deploy zen-egress |
| `egress.image.repository` | string | `zenmesh/zen-egress` | Container image |
| `egress.image.tag` | string | Chart appVersion | Image tag |
| `egress.replicas` | int | `1` | Number of replicas |
| `egress.tls.enabled` | bool | `true` | Enable mTLS to data plane bridge |
| `egress.hmac.enforce` | bool | `true` | Enforce HMAC validation on delivered events |
| `egress.resources.requests.cpu` | string | `100m` | CPU request |
| `egress.resources.requests.memory` | string | `128Mi` | Memory request |

### zen-lock

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `zenLock.enabled` | bool | `true` | Deploy zen-lock |
| `zenLock.image.repository` | string | `zenmesh/zen-lock` | Container image |
| `zenLock.image.tag` | string | Chart appVersion | Image tag |
| `zenLock.resources.requests.cpu` | string | `50m` | CPU request |
| `zenLock.resources.requests.memory` | string | `64Mi` | Memory request |

## Examples

### Production (High Availability)

```yaml
# values-production.yaml
saas:
  endpoint: "https://api.zen-mesh.io"

agent:
  replicas: 2
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 512Mi

egress:
  replicas: 2
  tls:
    enabled: true
  hmac:
    enforce: true
```

```bash
helm upgrade --install zen-agent zenmesh/zen-agent \
  --namespace zen-mesh \
  -f values-production.yaml
```

### Private Registry

```bash
helm upgrade --install zen-agent zenmesh/zen-agent \
  --namespace zen-mesh \
  --set global.imageRegistry=my-registry.example.com/zenmesh \
  --set global.imagePullSecrets[0].name=registry-creds \
  --set saas.endpoint="https://api.zen-mesh.io" \
  --set agent.enrollment.secretRef.name="zen-enrollment-bundle"
```

## Upgrading

```bash
helm repo update
helm upgrade zen-agent zenmesh/zen-agent \
  --namespace zen-mesh \
  --reuse-values
```

## Uninstalling

```bash
helm uninstall zen-agent --namespace zen-mesh
kubectl delete namespace zen-mesh
```

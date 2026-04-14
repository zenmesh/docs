---
sidebar_label: Values Reference
---

# Values Reference

Complete values reference for all Zen Mesh Helm charts.

## zen-agent

See [zen-agent chart](./zen-agent) for the full values table. Key categories:

- **Global**: `saas.endpoint`, `global.imageRegistry`, `global.imagePullSecrets`
- **Agent**: `agent.replicas`, `agent.resources`, `agent.enrollment.*`, `agent.logLevel`
- **Egress**: `egress.enabled`, `egress.replicas`, `egress.tls.*`, `egress.hmac.*`
- **zen-lock**: `zenLock.enabled`, `zenLock.image.*`, `zenLock.resources`
- **Scheduling**: `nodeSelector`, `tolerations`, `affinity`

## zen-suite

zen-suite includes all zen-agent values plus:

- **Ingester**: `ingester.enabled`, `ingester.replicas`, `ingester.ingress.*`, `ingester.tls.*`

## Common Patterns

### Override Image Tag

```bash
--set agent.image.tag=v0.3.1
--set egress.image.tag=v0.3.1
```

### Set Resource Limits

```yaml
agent:
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 512Mi
egress:
  resources:
    requests:
      cpu: 200m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 512Mi
```

### Node Affinity

```yaml
nodeSelector:
  node-role.kubernetes.io/worker: "true"

tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "zen-mesh"
    effect: "NoSchedule"
```

### Disable a Component

```yaml
# Don't deploy zen-lock (if you have your own secret management)
zenLock:
  enabled: false

# Don't deploy egress (Mode A — direct public target only)
egress:
  enabled: false
```

## Environment Variables

All components support extra environment variables via `extraEnv`:

```yaml
agent:
  extraEnv:
    - name: HTTP_PROXY
      value: "http://proxy.internal:3128"
    - name: NO_PROXY
      value: "api.zen-mesh.io"
```

---
sidebar_label: Operations
---

# Operations

Metrics, alerts, health endpoints, and troubleshooting for running zen-lock in production.

## Health Endpoints

| Component | Endpoints |
|-----------|-----------|
| Webhook / controller | `/healthz`, `/readyz` on `:8081`; Prometheus metrics on `:8080` |
| CSI provider | `/healthz`, `/readyz` on `:8081`; metrics on `:8080` (per node) |
| Runtime admin server | `/version` (build provenance) on `:8082`; lifecycle state Active/Failed/Disabled |

Kubernetes startup, liveness, and readiness probes are wired into the deployments. OpenTelemetry tracing is available via the standard `OTEL_*` environment variables.

## Key Metrics

Prometheus metrics are exposed at `/metrics` on port 8080. The families that matter most:

| Metric | Type | What it tells you |
|--------|------|-------------------|
| `zenlock_webhook_injection_total{namespace,zenlock_name,result}` | counter | Injection attempts (`success`/`error`/`denied`) |
| `zenlock_webhook_injection_duration_seconds` | histogram | Admission latency — watch P95 against the 10s webhook timeout |
| `zenlock_decryption_total{namespace,zenlock_name,result}` | counter | Decrypt successes/failures |
| `zenlock_decryption_duration_seconds` | histogram | Decrypt cost |
| `zenlock_reconcile_total{namespace,name,result}` / `..._duration_seconds` | counter/histogram | Controller health |
| `zenlock_cache_hits_total` / `zenlock_cache_misses_total` | counter | ZenLock cache effectiveness |
| `zenlock_validation_failures_total{namespace,reason}` | counter | Malformed/unauthorized ZenLock usage |
| `zenlock_rotation_phase{namespace}` | gauge | 0 = idle, 1 = rotating, 2 = deprecated |
| `zenlock_rotation_grace_hits_total` | counter | Decrypts served by the previous key — should trend to 0 during rotation |
| `zenlock_rotation_reencrypt_total{result}` | counter | Background re-encryption progress |
| `zenlock_rotation_safe_to_deprecate` | gauge | 1 = previous key removable (see [Key Rotation](./key-rotation)) |

The CSI provider exports the same metric family names, per node.

## Alerts

Suggested Prometheus rules ship in `deploy/prometheus/prometheus-rules.yaml` and a Grafana dashboard in `deploy/grafana/` (both included in the distribution package):

| Alert | Condition |
|-------|-----------|
| `ZenLockControllerDown` | Controller metrics gone |
| `ZenLockHighReconciliationErrorRate` | Reconcile errors > 5/s |
| `ZenLockWebhookInjectionFailures` | Injection errors > 2/s |
| `ZenLockWebhookInjectionDenials` | Denials — usually an `allowedSubjects` mismatch worth investigating |
| `ZenLockDecryptionFailures` | Decrypt errors > 3/s — typically a rotated-away key or corrupted resource |
| `ZenLockSlowWebhookInjection` | P95 injection > 2s |
| `ZenLockSlowDecryption` | P95 decrypt > 1s |
| `ZenLockRotationStalled` / `ZenLockRotationTooLong` | Rotation not progressing / > 72h in `rotating` |

## Troubleshooting

| Symptom | Likely cause | Check |
|---------|--------------|-------|
| Pod stuck in `ContainerCreating`, admission error mentioning decrypt | Master key doesn't match the ZenLock's public key | `kubectl get zenlock <name>` → `PHASE: Error`; verify the key Secret |
| Every injection fails after fresh Helm install | Placeholder master key still in place | See the warning in [Installation](./installation#2-provide-the-master-key) |
| Injection `denied` | Pod's ServiceAccount not in `allowedSubjects` (or list empty — that denies everyone) | `kubectl get zenlock <name> -o yaml` → `spec.allowedSubjects` |
| CSI mount fails with `FailedPrecondition` | Secrets Store driver installed without the `zen-lock` audience tokenRequest, or provider missing its key | See the warning in [CSI Driver](./csi-driver#prerequisites) |
| CSI mount fails with `PermissionDenied` | Token/ServiceAccount mismatch or not in `allowedSubjects` | Check the pod's `serviceAccountName` vs the ZenLock |
| `ROTATION: rotating` never ends | Re-encryption blocked or grace hits continuing | `zenlock_rotation_grace_hits_total`, `zenlock_rotation_pending`; a GitOps tool may be re-applying old-key ciphertext |
| Ephemeral Secrets outlive pods | Orphan-TTL sweep (default 15 min) hasn't run yet | Wait or check controller logs; OwnerReference cleanup normally fires at pod deletion |

Useful commands:

```bash
# Webhook/controller logs
kubectl logs -n zen-lock-system deployment/zen-lock-webhook --tail=50

# ZenLock status and conditions
kubectl describe zenlock <name>

# Rotation state across the fleet
kubectl get zenlocks -A -o wide
```

## Sizing

See the capacity table in [High Availability](./high-availability#capacity-pointers). The webhook is latency-sensitive (it sits in pod admission) — keep its P95 injection duration well under the 10-second webhook timeout and scale replicas before you hit CPU limits.

---
sidebar_label: Backups
---

# Backups

Zen Mesh state is split between the control plane (SaaS-managed) and your cluster (locally managed).

## What Needs Backing Up

## Control Plane (Managed by Zen Mesh)

Tenant configuration, API keys, destination settings, and delivery history are managed by Zen Mesh and automatically backed up. No action needed on your side.

## Edge Plane (Your Responsibility)

| Resource | How to Back Up |
|----------|---------------|
| Helm values | `helm get values zen-agent -n zen-mesh > values-backup.yaml` |
| zen-lock CRDs | `kubectl get zenlocks -n zen-mesh -o yaml > zenlocks-backup.yaml` |
| Adapter configs | Stored in dashboard — export via API |

## Restoring

## Helm Values

```bash
helm upgrade --install zen-agent zenmesh/zen-agent \
  --namespace zen-mesh \
  -f values-backup.yaml
```

## zen-lock CRDs

```bash
kubectl apply -f zenlocks-backup.yaml
```

:::warning
Enrollment bundles cannot be restored — they are single-use and time-limited. If you lose your cluster, generate a new enrollment bundle from the dashboard.
:::

## Disaster Recovery (DR)

## Recovery Objectives

| Metric | Target |
|--------|--------|
| **RPO** (Recovery Point Objective) | Configuration: ≤24 hours. Delivery events: determined by retention policy. |
| **RTO** (Recovery Time Objective) | Standard failure: ≤4 hours. Regional outage: ≤24 hours. |

## Recovery Procedure

1. **Provision a new edge plane** following the [Kubernetes Edge Plane](../install/kubernetes-edge-plane) guide
2. **Restore Helm values** from backup to reinstall zen-agent:
   ```bash
   helm upgrade --install zen-agent zenmesh/zen-agent \
     --namespace zen-mesh \
     -f values-backup.yaml
   ```
3. **Restore ZenLock CRDs** to recover credential material:
   ```bash
   kubectl apply -f zenlocks-backup.yaml
   ```
4. **Re-enroll the cluster** by generating a new enrollment bundle from the dashboard
5. **Verify delivery** by checking the dashboard for healthy destinations

## What Cannot Be Restored

- Enrollment bundles are single-use and time-limited. You must generate a new bundle.
- Delivery event history older than the retention window is not recoverable.
- Evidence integrity chain is append-only and cannot be reconstructed from backup.

## DR Runbook

## Scenario: Cluster Failure (Total Loss)

1. Provision new Kubernetes cluster
2. Install Zen Mesh agent with latest Helm chart
3. Restore Helm values and ZenLock CRDs from backup
4. Generate and apply new enrollment bundle
5. Verify destinations show healthy status
6. Replay critical events from DLQ if needed

## Scenario: Configuration Corruption

1. Identify the corrupted configuration (dashboard or API)
2. Restore from last known good configuration backup
3. Reconcile any state drift via the dashboard
4. Verify delivery flows are operational

## Scenario: Credential Compromise

1. Revoke affected API keys in the dashboard
2. Rotate shared secrets for affected sources (Stripe, GitHub, etc.)
3. Generate new enrollment bundle if ZenLock material is compromised
4. Update destination configurations with new credentials

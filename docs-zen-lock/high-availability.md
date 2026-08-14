---
sidebar_label: High Availability
---

# High Availability

zen-lock is highly available **by construction**: no database, no PVC, no sharding. Everything durable lives in the Kubernetes API server (etcd), and every component scales horizontally.

## Scaling Model per Component

| Component | HA model | Scaling |
|-----------|----------|---------|
| `zen-lock-webhook` | Stateless; webhooks scale horizontally | `kubectl scale deployment/zen-lock-webhook --replicas=3` |
| `zen-lock-controller` | Leader election (one active reconciler, standbys hot) | Extra replicas are standbys; they take over if the leader dies |
| `zen-lock-csi-provider` | DaemonSet, one pod per trusted node | Add trusted nodes |
| `zen-lock-retrieval` | Stateless; every replica serves (custody in the K8s API) | `kubectl scale deployment/zen-lock-retrieval --replicas=3` |

There is no node-local durable state anywhere: lose a node and the pod reschedules elsewhere with the same view of the world, because the source of truth is etcd's raft-replicated store.

## Availability of Secret Delivery

Webhook mode runs with `failurePolicy: Fail` on purpose — if the webhook can't process a pod, that pod does **not** start without its secrets. To keep admission working during webhook outages:

- Run ≥ 2 webhook replicas across failure domains
- The webhook is stateless (a 5-minute ZenLock cache is a performance cache, not a correctness dependency)
- Monitor the `ZenLockWebhookInjectionFailures` alert (see [Operations](./operations))

CSI mode has no admission dependency: mounts are served by the node-local provider, so a control-plane-side webhook outage does not affect already-scheduled CSI workloads.

## Key Custody

The `zen-lock-retrieval` server serves **age-encrypted signing key material** held in custody for authorized Zen Trust workloads (mTLS, retrieval-only — zen-lock never signs anything). Its HA design replaces what would traditionally be a database with two purpose-built CRDs:

| Resource | Purpose | Why this shape |
|----------|---------|----------------|
| `ZenLockCustody` | One small object (&lt; 4 KB) per custody entry: tenant, key reference, version, AGE-encrypted private key (ciphertext only, ≤ 32 KB), lifecycle status | Small objects keep etcd happy; names are derived deterministically (`<tenant>-<keyref>-v<n>`) |
| `NonceBucket` | Replay-protection nonces, sharded per minute, stored as SHA-256 digests only | Delta-patches with compare-and-swap; buckets pruned after 15 minutes |

Properties of this design:

- **Ciphertext-only invariant holds here too** — the API server and etcd only ever see age ciphertext for custody material.
- **Separate keys**: custody material is encrypted with a dedicated custody key (`ZEN_LOCK_CUSTODY_KEY`), independent from the customer-secret master key and independently rotatable.
- **RBAC-separated**: the retrieval ServiceAccount can read custody objects but **cannot** read the master-key Secret; the webhook ServiceAccount cannot read custody material.
- **Hot path never hits the API server for reads** — informer caches serve key lookups; the API server sees roughly one write per retrieval (nonce recording) plus watches.
- **Fail-closed everywhere**: missing TLS material fails startup; replayed nonces are rejected; custody payloads above 24 KB are rejected.

`ZEN_LOCK_RETRIEVAL_STORE=k8s` is the default and only production composition — a `memory` store exists for single-replica development, and a governance test enforces that production never ships it.

## Node Loss and Failure Behavior

| Failure | Effect | Recovery |
|---------|--------|----------|
| Webhook pod dies | Remaining replicas serve; pod creation unaffected (or briefly blocked if no replica is up, per `failurePolicy: Fail`) | Rescheduling |
| Controller leader dies | Standby takes the leader lease; rotation/cleanup resume | Automatic |
| Retrieval replica dies | Other replicas serve; no custody data was on the node | Rescheduling |
| A trusted node dies (CSI) | Provider pod goes with it; nothing durable lost | Replacement node labeled trusted |
| etcd quorum loss | Nothing decrypts or schedules — this is cluster-wide failure beyond zen-lock | etcd recovery |

## Capacity Pointers

Sizing guidance from the operator guide, by fleet scale:

| Scale | Webhook/controller requests |
|-------|------------------------------|
| &lt; 100 ZenLocks | 100m / 128Mi |
| 100–500 ZenLocks | 250m / 256Mi |
| 500–1,000 ZenLocks | 500m / 512Mi |
| &gt; 1,000 ZenLocks or &gt; 50,000 Pods | 1000m / 1Gi (limits 4000m / 4Gi) |

For high-throughput signing fleets retrieving keys through `zen-lock-retrieval`, the K8s API store is rated for the default profile — contact Zen Mesh for the CRDB-backed store profile if retrieval QPS dominates your API server budget.

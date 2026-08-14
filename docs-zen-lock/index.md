---
slug: /
title: zen-lock
sidebar_label: Overview
---

# zen-lock

**Kubernetes-native secret management with client-side encryption — safe for GitOps.**

zen-lock stores secrets as **ciphertext only**. You encrypt sensitive values on your machine with an [age](https://github.com/FiloSottile/age) public key, commit the resulting `ZenLock` custom resource to Git, and apply it to your cluster like any other manifest. The Kubernetes API server and etcd never see plaintext — decryption happens at pod startup and the plaintext is delivered straight to the workload that needs it.

zen-lock is a Zen Mesh component — its container images are published publicly as part of the Zen solution — and runs in two contexts:

- **Standalone**: a secret manager for any Kubernetes cluster with GitOps workflows. You install it, generate keys, and encrypt secrets with the `zen-lock` CLI.
- **As part of Zen Mesh**: the secret layer of a Zen Mesh edge installation, where it protects enrollment credentials, HMAC keys, and mTLS material automatically. If you're a Zen Mesh customer, [enrollment handles this for you](./enrollment-and-secrets).

:::note Version status
zen-lock is at **0.1.0-alpha**. The webhook injection path is fully supported. The [CSI driver](./csi-driver) is ready for restricted, trusted-node canary deployments but not broad node deployment yet.
:::

## Two Ways Secrets Reach a Pod

| Delivery mode | How plaintext is delivered | Kubernetes Secret object created? | Best for |
|---------------|---------------------------|-----------------------------------|----------|
| **Webhook injection** (default) | Mutating webhook decrypts at pod admission and injects an ephemeral Secret as a volume | Yes — short-lived, owned by the pod | Most workloads; zero pod changes beyond an annotation |
| **CSI driver** | Secrets Store CSI provider decrypts and mounts files directly into the pod | No — read-only tmpfs files, never a Secret | Clusters where no plaintext Secret object may exist, even briefly |

Both modes can run side by side in the same cluster, and workloads migrate between them one at a time. See [How It Works](./how-it-works) and [CSI Driver](./csi-driver).

## Key Properties

- **Ciphertext-only storage**: `ZenLock` resources hold age ciphertext. The API server, etcd, backups, and Git repos never contain plaintext.
- **GitOps-safe**: encrypted manifests are ordinary YAML — reviewable, diffable, committable.
- **Ephemeral delivery**: decrypted material exists only as a short-lived Secret tied to a pod's lifetime (webhook mode) or a read-only tmpfs mount (CSI mode).
- **Workload authorization**: each `ZenLock` can restrict which ServiceAccounts may receive it (`allowedSubjects`). An empty list denies everyone — there is no bypass.
- **Highly available by construction**: no database, no PVC, no sharding. State lives in the Kubernetes API itself; every component scales by adding replicas. See [High Availability](./high-availability).

## A Precise Security Claim

Zero-knowledge applies to the `ZenLock` resource: the API server and etcd **cannot read the ZenLock payload**. At runtime, delivery necessarily exposes plaintext **to the workload** and, in webhook mode, to any principal that can read the generated ephemeral Kubernetes Secret. zen-lock is not a defense against a compromised node or a cluster-admin who execs into your pod — see [Security Properties](./security-properties) for the full threat model, including what zen-lock deliberately does *not* claim.

## When to Use zen-lock (and When Not To)

**Use zen-lock when** you have static secrets (API keys, tokens, certificates, database credentials) and want them encrypted at rest inside Git and inside the cluster, with Kubernetes-native delivery.

**Use something else when** you need:

- **Dynamic, leased credentials** (auto-rotating database or cloud IAM credentials) — zen-lock stores static values; it does not generate or lease secrets.
- **A centralized secrets platform** with auth methods, policy engines, and audit devices — that is intentionally out of scope.
- **A "sync from external provider" operator** — zen-lock's source of truth is the encrypted CRD in your cluster, not an upstream vault.
- **Protection against cluster-admin or node compromise** — no secret manager can deliver plaintext to a pod and survive those; see [Security Properties](./security-properties).

## Where to Go Next

- [How It Works](./how-it-works) — architecture, encrypt/decrypt flows, delivery modes
- [Installation](./installation) — Helm chart, CLI, and the master key
- [Using Secrets](./using-secrets) — encrypt a secret, mount it in a pod, restrict access
- [CSI Driver](./csi-driver) — file projection without a Secret object
- [High Availability](./high-availability) — multi-replica operation and key custody
- [Key Rotation](./key-rotation) — rotating the age master key with zero downtime
- [Security Properties](./security-properties) — threat model, non-claims, compliance notes
- [Operations](./operations) — metrics, alerts, health checks, troubleshooting
- [Enrollment and Secrets](./enrollment-and-secrets) — how Zen Mesh uses zen-lock during enrollment

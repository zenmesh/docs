---
sidebar_label: Installation
---

# Installation

How zen-lock gets installed: as part of Zen Mesh (the normal path), or standalone (distributed by the Zen Mesh team).

## The Normal Path: Zen Mesh

zen-lock ships with every Zen Mesh edge installation. Installing the `zen-agent` Helm chart installs zen-lock, enabled by default (`zenLock.enabled=true`) — nothing extra to do:

- Follow the [Kubernetes Edge Plane installation guide](/docs/zen-mesh/install/kubernetes-edge-plane)
- The zen-lock components run in the `zen-mesh` namespace alongside the agent

## Standalone Installation

zen-lock is a Zen Mesh component, not an open-source project. Its Helm chart is published in Zen Mesh's public chart repository; the `zenmesh/*` container images and the `zen-lock` CLI are distributed directly by the Zen Mesh team:

```bash
helm repo add zenmesh https://zenmesh.github.io/helm-charts
helm install zen-lock zenmesh/zen-lock \
  --namespace zen-lock-system \
  --create-namespace
```

If you don't already have access to the `zenmesh` image registry, request it via [Zen Mesh support](/docs/zen-mesh/start-here/support).

A standalone install deploys the same components the platform uses, in the `zen-lock-system` namespace:

- The `ZenLock` CRD (`security.zen-mesh.io/v1beta1`)
- The `zen-lock-webhook` Deployment and `zen-lock-mutating-webhook` MutatingWebhookConfiguration
- The `zen-lock-controller` Deployment (leader-elected)

:::warning Use the zenmesh chart versions only
Only zen-lock chart versions **0.1.0-beta** and above are supported by these docs.
:::

## Prerequisites

- Kubernetes **1.26+** with `kubectl` and cluster-admin access
- An age keypair for the master key (see below)
- For the [CSI driver](./csi-driver) only: the Secrets Store CSI driver v1.4+

## 2. Provide the Master Key

The webhook decrypts ZenLocks with an age **private key**, supplied as a Kubernetes Secret named `zen-lock-master-key` (key `key.txt`):

```bash
# Generate a keypair (never commit the private key)
zen-lock keygen --output /tmp/zen-lock-master-age-key
kubectl create secret generic zen-lock-master-key \
  --namespace zen-lock-system \
  --from-file=key.txt=/tmp/zen-lock-master-age-key
```

:::warning Replace the placeholder before deploying workloads
With Helm defaults (`privateKey.createPlaceholder: true`) the chart creates a placeholder Secret so the install succeeds — but **every pod annotated with `zen-lock/inject` will fail admission with a decryption error** until you replace it. Prefer pre-creating the Secret and installing with `--set privateKey.createPlaceholder=false`.
:::

If you installed with the placeholder, replace it:

```bash
zen-lock keygen --output /tmp/zen-lock-master-age-key
kubectl create secret generic zen-lock-master-key \
  --namespace zen-lock-system \
  --from-file=key.txt=/tmp/zen-lock-master-age-key \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl rollout restart deployment/zen-lock-webhook -n zen-lock-system
```

Keep the private key somewhere safe outside the cluster (password manager, KMS). Losing it means every existing ZenLock becomes permanently undecryptable. The matching **public** key is what you'll pass to `zen-lock encrypt`.

### Previous key (rotation window only)

During [key rotation](./key-rotation), a second Secret entry (`age-previous`) or the `ZEN_LOCK_PREVIOUS_KEY_FILE` holds the old identity so both keys can decrypt during the grace window.

## 3. Get the CLI

The `zen-lock` CLI encrypts secrets and drives rotation from your workstation or CI. It is distributed with the standalone distribution package (see [Standalone Installation](#standalone-installation) above) — linux/darwin, amd64/arm64. Zen Mesh platform customers don't need it: enrollment manages platform secrets automatically.

Verify once installed:

```bash
zen-lock --version
# zen-lock version 0.1.0-beta
```

## 4. Verify the Installation

```bash
# Pods running and ready
kubectl get pods -n zen-lock-system

# CRD registered
kubectl get crd zenlocks.security.zen-mesh.io

# End-to-end: encrypt, apply, and inject a test secret (see Using Secrets)
zen-lock keygen --output /tmp/test-age-key
zen-lock encrypt --pubkey "$(zen-lock pubkey --input /tmp/test-age-key)" \
  --input test-secret.yaml --output test-zenlock.yaml
kubectl apply -f test-zenlock.yaml
kubectl get zenlock test-secret
# PHASE should be Ready
```

## Uninstall

```bash
helm uninstall zen-lock -n zen-lock-system
kubectl delete crd zenlocks.security.zen-mesh.io
kubectl delete crd zenlockcustodies.security.zen-mesh.io
kubectl delete crd noncebuckets.security.zen-mesh.io
kubectl delete secret zen-lock-master-key -n zen-lock-system
```

Existing ZenLock resources are ciphertext and harmless to leave behind, but deleting the CRD deletes the objects themselves. If you later reinstall with the same master key, existing encrypted manifests reapply and decrypt normally.

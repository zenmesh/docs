---
sidebar_label: Installation
---

# Installation

How to install zen-lock's controller/webhook (Helm), the CLI, and — optionally — the CSI provider.

## Prerequisites

- Kubernetes **1.26+** with `kubectl` and cluster-admin access
- An age keypair for the master key (generated during installation below)
- For the [CSI driver](./csi-driver) only: the Secrets Store CSI driver v1.4+

:::note Zen Mesh installations
If you installed Zen Mesh via the `zen-agent` Helm chart, zen-lock is already included and enabled by default (`zenLock.enabled=true`) — you do not need this page. Standalone installs below use the `zen-lock-system` namespace.
:::

## 1. Install the Controller and Webhook

```bash
helm repo add zen-lock https://zenmesh.github.io/zen-lock
helm repo update
helm install zen-lock zen-lock/zen-lock \
  --namespace zen-lock-system \
  --create-namespace
```

This installs:

- The `ZenLock` CRD (`security.zen-mesh.io/v1alpha1`)
- The `zen-lock-webhook` Deployment and `zen-lock-mutating-webhook` MutatingWebhookConfiguration
- The `zen-lock-controller` Deployment (leader-elected)

To install with raw manifests instead: `kubectl apply` the CRD base, RBAC roles, and webhook manifests from the [repository](https://github.com/zenmesh/zen-lock) (`config/crd/bases/`, `config/rbac/`, `config/webhook/`).

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

## 3. Install the CLI

The CLI encrypts secrets and drives rotation from your workstation or CI:

```bash
# Homebrew
brew tap zenmesh/tap && brew install zen-lock

# Or the install script (linux/darwin, amd64/arm64)
curl -sSL https://raw.githubusercontent.com/zenmesh/zen-lock/main/install.sh | bash
```

Verify:

```bash
zen-lock version
# 0.1.0-alpha (commit: …, built: …)
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
kubectl delete secret zen-lock-master-key -n zen-lock-system
```

Existing ZenLock resources are ciphertext and harmless to leave behind, but deleting the CRD deletes the objects themselves. If you later reinstall with the same master key, existing encrypted manifests reapply and decrypt normally.

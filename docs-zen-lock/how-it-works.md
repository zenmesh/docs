---
sidebar_label: How It Works
---

# How zen-lock Works

A technical deep dive into zen-lock's encrypt/decrypt lifecycle within Zen Mesh.

## Architecture

zen-lock runs as a Kubernetes controller with a mutating admission webhook in your cluster:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  zen-lock    │     │  K8s API     │     │  Your Pods   │
│  Controller  │────▶│  Server      │────▶│  (egress,    │
│  + Webhook   │     │  (etcd)      │     │   agent)     │
└──────────────┘     └──────────────┘     └──────────────┘
     │                      │                      │
     │  Only ciphertext     │  Only ciphertext     │  Plaintext
     │  stored here         │  stored here         │  exists here
```

## The Encrypt Flow

When the control plane generates an enrollment bundle:

```bash
# Simplified: what happens under the hood
zen-lock encrypt \
  --public-key age1y... \
  --input enrollment-credentials.json \
  --output ZenLock CRD (ciphertext only)
```

1. The control plane has an age public key
2. Sensitive fields are encrypted with age
3. The resulting ciphertext is packaged into a Kubernetes Secret
4. The Secret is applied to your cluster

**Your cluster's etcd never sees plaintext.** The API server stores and serves only ciphertext.

## The Decrypt Flow (Mutating Webhook)

When a pod starts that needs access to secrets (e.g., zen-egress needs the mTLS private key):

1. **Pod creation request** hits the Kubernetes API server
2. **zen-lock webhook** intercepts the request
3. Webhook checks: does this pod have a `zen-lock` annotation or volume reference?
4. **If yes**: Webhook reads the ZenLock CRD, decrypts the ciphertext
5. Webhook injects a **temporary K8s Secret** into the pod's namespace
6. Pod mounts the ephemeral Secret as a volume
7. **Pod starts** with access to plaintext secrets

```
Pod spec with zen-lock reference
         │
         ▼
┌─────────────────────┐
│ Mutating Webhook    │
│ 1. Read ZenLock CRD │
│ 2. Decrypt with age │
│ 3. Create ephemeral │
│    K8s Secret       │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Pod starts with     │
│ ephemeral Secret    │
│ mounted as volume   │
└─────────────────────┘
```

## Ephemeral Lifecycle

The decrypted K8s Secret is **not permanent**:

- Created by the webhook just before the pod starts
- Mounted into the pod as a volume
- **Deleted automatically** when the pod terminates (orphan TTL)
- Never committed to Git, never visible in `kubectl get secrets` for more than the pod's lifetime

This means:
- A compromised etcd dump reveals only ciphertext
- A compromised backup reveals only ciphertext
- Plaintext exists only in running pod memory

## Age Encryption

zen-lock uses [age](https://github.com/FiloSottile/age), a modern file encryption tool:

- **Simple**: One public key, no PKI infrastructure needed
- **Small**: Minimal dependency, no heavy crypto libraries
- **Auditable**: Go implementation, easy to verify
- **Standard**: age is becoming a standard for K8s secret encryption (used by SOPS, Flux, etc.)

## What You'll See in Your Cluster

After enrollment, you'll see zen-lock resources:

```bash
# The controller
kubectl get pods -n zen-mesh -l app=zen-lock

# Encrypted CRDs (ciphertext only)
kubectl get zenlocks -n zen-mesh

# Ephemeral secrets (temporary, created by webhook)
kubectl get secrets -n zen-mesh | grep ephemeral
```

The `zenlocks` contain only ciphertext. The ephemeral secrets exist only while pods are running.

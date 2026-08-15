---
sidebar_label: Quickstart
---

# Quickstart

Get zen-lock running in 5 minutes. This guide covers the essential steps to encrypt a secret and inject it into a pod.

## Prerequisites

- Kubernetes 1.26+ cluster with `kubectl` access
- [zen-lock CLI](/zen-lock/cli-reference) installed locally

## Step 1: Install zen-lock

Add the Helm chart and install:

```bash
# Add the repository
helm repo add zenmesh https://zenmesh.github.io/helm-charts
helm repo update

# Install zen-lock (standalone)
helm install zen-lock zenmesh/zen-lock \
  --namespace zen-lock-system \
  --create-namespace
```

Wait for pods to be ready:

```bash
kubectl get pods -n zen-lock-system
# NAME                      READY   STATUS
# zen-lock-webhook-xxx      1/1     Running
# zen-lock-controller-xxx   1/1     Running
```

## Step 2: Generate a Master Key

Generate an age keypair for encryption:

```bash
# Generate keys (never commit the private key!)
zen-lock keygen --output ~/zen-lock-keys/master.key

# Get the public key
zen-lock pubkey --input ~/zen-lock-keys/master.key
# Output: age1ql3z8h3q2c6mau7gq4w9x2y5z7...
```

Store the private key securely (password manager, KMS). The public key is shared with your team for encryption.

## Step 3: Create the Master Key Secret

Add the private key to your cluster:

```bash
kubectl create secret generic zen-lock-master-key \
  --namespace zen-lock-system \
  --from-file=key.txt=~/zen-lock-keys/master.key
```

Restart the webhook to pick up the key:

```bash
kubectl rollout restart deployment/zen-lock-webhook -n zen-lock-system
```

## Step 4: Encrypt a Secret

Create a Secret YAML with `stringData`:

```yaml title="db-creds.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
stringData:
  DB_USER: admin
  DB_PASSWORD: my-secret-password
```

Encrypt it:

```bash
zen-lock encrypt \
  --pubkey "age1ql3z8h3q2c6mau7gq4w9x2y5z7..." \
  --input db-creds.yaml \
  --output zenlock-db.yaml
```

The output is a `ZenLock` CRD with encrypted values — safe to commit to Git.

## Step 5: Apply the ZenLock

```bash
kubectl apply -f zenlock-db.yaml

# Verify
kubectl get zenlock
# NAME             PHASE
# db-credentials   Ready
```

## Step 6: Inject into a Pod

Annotate your pod to request the secret:

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
      annotations:
        zen-lock/inject: "db-credentials"
    spec:
      serviceAccountName: my-app
      containers:
      - name: app
        image: nginx:1.25
        volumeMounts:
        - name: zen-secrets
          mountPath: /etc/secrets
          readOnly: true
      volumes:
      - name: zen-secrets
        emptyDir: {}
```

Apply and check:

```bash
kubectl apply -f deployment.yaml

# The secret is mounted at /etc/secrets/
kubectl exec deploy/my-app -- cat /etc/secrets/DB_USER
# Output: admin
```

## What's Next?

- **[Using Secrets](/zen-lock/using-secrets)** — Full guide to encryption, mounting, and access control
- **[Key Rotation](/zen-lock/key-rotation)** — Rotate your master key with zero downtime
- **[Security Properties](/zen-lock/security-properties)** — Understand what zen-lock protects
- **[CLI Reference](/zen-lock/cli-reference)** — All available commands and flags

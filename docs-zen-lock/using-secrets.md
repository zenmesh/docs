---
sidebar_label: Using Secrets
---

# Using Secrets

The end-to-end workflow: encrypt a secret, apply it, mount it into a pod, and restrict who can receive it.

## 1. Encrypt a Secret

Start from ordinary Secret-shaped YAML with `stringData`:

```yaml title="db-credentials.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: default
stringData:
  DB_USER: "admin"
  DB_PASS: "SuperSecret123!"
```

Encrypt it with the cluster's age **public** key:

```bash
zen-lock encrypt \
  --pubkey age1ql3z... \
  --input db-credentials.yaml \
  --output zenlock-db-credentials.yaml
```

The output is a `ZenLock` resource — every value is base64 age ciphertext, safe to commit:

```yaml title="zenlock-db-credentials.yaml"
apiVersion: security.zen-mesh.io/v1alpha1
kind: ZenLock
metadata:
  name: db-credentials
  namespace: default
spec:
  algorithm: age
  encryptedData:
    DB_USER: <base64 ciphertext>
    DB_PASS: <base64 ciphertext>
```

Apply it (directly or through your GitOps tool):

```bash
kubectl apply -f zenlock-db-credentials.yaml
kubectl get zenlock db-credentials
# NAME             PHASE    AGE
# db-credentials   Ready    5s
```

`PHASE: Ready` means the controller was able to decrypt and validate the resource. `Error` usually means the cluster's master key doesn't match the public key you encrypted with.

## 2. Mount It in a Pod

Annotate the pod (or pod template) to request injection:

```yaml title="deployment.yaml (excerpt)"
spec:
  template:
    metadata:
      annotations:
        zen-lock/inject: "db-credentials"   # ZenLock name
        # zen-lock/mount-path: "/etc/config"  # optional, default /zen-lock/secrets
        # zen-lock/inject-env: "true"         # optional: also expose as env vars
    spec:
      containers:
        - name: app
          image: my-app:1.4.2
          volumeMounts:
            - name: zen-secrets
              mountPath: /zen-lock/secrets
              readOnly: true
      volumes:
        - name: zen-secrets
          emptyDir: {}   # replaced by the webhook with the ephemeral Secret
```

At admission the webhook decrypts the ZenLock, creates an ephemeral Secret owned by the pod, and rewires the volume. The container reads files from the mount:

```bash
cat /zen-lock/secrets/DB_USER
```

### Annotations Reference

| Annotation | Effect |
|------------|--------|
| `zen-lock/inject: <name>` | Request the named ZenLock (required to trigger injection) |
| `zen-lock/mount-path: <path>` | Mount path for the injected volume (default `/zen-lock/secrets`) |
| `zen-lock/inject-env: "true"` | Additionally add an `envFrom` secretRef so every key becomes an environment variable |

## 3. Restrict Which Workloads Can Receive a Secret

By default **no one** may receive a ZenLock — an absent or empty `allowedSubjects` denies every pod, with no bypass. Grant access explicitly to ServiceAccounts:

```yaml title="zenlock-db-credentials.yaml (excerpt)"
spec:
  allowedSubjects:
    - kind: ServiceAccount
      name: my-app
      namespace: default
```

Only pods running as `system:serviceaccount:default:my-app` can mount this ZenLock. Everything else — including pods with the annotation but the wrong identity — is denied at admission.

ServiceAccount is the only supported subject kind in v1alpha1; User and Group subjects are planned.

## 4. Day-2 Operations

```bash
# Which pods received a given ZenLock
kubectl get secrets -A \
  -l zen-lock.security.zen-mesh.io/zenlock-name=db-credentials

# Rotation state (see Key Rotation)
kubectl get zenlocks -o wide
# NAME             PHASE   ROTATION   GRACEHITS
# db-credentials   Ready   idle       0

# Debug: decrypt locally (never in CI)
zen-lock decrypt --privkey /path/to/master-age-key \
  --input zenlock-db-credentials.yaml
```

## Choosing Webhook vs CSI Delivery

| | Webhook injection | [CSI driver](./csi-driver) |
|---|---|---|
| Pod changes | One annotation | SecretProviderClass + CSI volume + node scheduling |
| Kubernetes Secret created | Yes (ephemeral, pod-owned) | No |
| Files visible to Secret readers | Yes | No |
| Node trust requirement | None | Provider must run on the node (`csi-trusted` label) |
| Maturity | Default, fully supported | Trusted-node canary |

Both modes honor `allowedSubjects` and both can run simultaneously — migrate workloads one at a time.

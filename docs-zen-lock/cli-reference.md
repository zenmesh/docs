---
sidebar_label: CLI Reference
slug: zen-lock/cli-reference
---

# CLI Reference

The `zen-lock` CLI encrypts secrets, generates keys, and drives key rotation. Install via the [standalone distribution](./installation#standalone-installation) or use within Zen Mesh platform (enrollment handles secrets automatically).

## Commands Overview

| Command | Purpose |
|---------|---------|
| [`keygen`](#keygen) | Generate a new age key pair |
| [`pubkey`](#pubkey) | Extract public key from private key |
| [`encrypt`](#encrypt) | Encrypt secret YAML into a ZenLock CRD |
| [`decrypt`](#decrypt) | Decrypt a ZenLock CRD (debug only) |

## keygen

Generate a new age encryption key pair. The private key should be kept secure and never committed. The public key is used for encryption.

```bash
zen-lock keygen [flags]
```

### Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--output` | `-o` | `private-key.age` | Output file for the private key |

### Example

```bash
# Generate a keypair, saving to a specific location
zen-lock keygen --output /tmp/zen-lock-master-key

# Output shows the public key:
# age1ql3z8h3q2c6mau7gq4w9x2y5z7...
```

:::warning Never commit the private key
Store the private key in a password manager or external KMS. Losing it means permanent data loss.
:::

## pubkey

Extract and display the public key from a private key file. Share the public key with your team for encryption.

```bash
zen-lock pubkey [flags]
```

### Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--input` | `-i` | (required) | Input file containing the private key |

### Example

```bash
# Get the public key from a private key file
zen-lock pubkey --input /tmp/zen-lock-master-key

# Output:
# age1ql3z8h3q2c6mau7gq4w9x2y5z7...
```

## encrypt

Encrypt a YAML file containing secret data into a ZenLock CRD. The input file should use Kubernetes Secret `stringData` format.

```bash
zen-lock encrypt [flags]
```

### Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--input` | `-i` | (required) | Input YAML file with `stringData` |
| `--output` | `-o` | stdout | Output file for the ZenLock CRD |
| `--pubkey` | `-p` | (required) | Age public key for encryption |

### Input Format

The input should be a Kubernetes Secret-style YAML:

```yaml title="secrets.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: my-secrets
  namespace: default
stringData:
  DB_PASSWORD: "super-secret-password"
  API_KEY: "api-key-12345"
```

### Example

```bash
# Encrypt secrets with the cluster's public key
zen-lock encrypt \
  --pubkey "age1ql3z8h3q2c6mau7gq4w9x2y5z7..." \
  --input secrets.yaml \
  --output zenlock-secrets.yaml

# Result is a ZenLock CRD with encrypted values
```

### Output Format

```yaml
apiVersion: security.zen-mesh.io/v1beta1
kind: ZenLock
metadata:
  name: my-secrets
  namespace: default
spec:
  algorithm: age
  encryptedData:
    DB_PASSWORD: <base64-encoded ciphertext>
    API_KEY: <base64-encoded ciphertext>
```

## decrypt

Decrypt a ZenLock CRD back to plaintext. This is intended for debugging and disaster recovery only — never run in CI or commit decrypted output.

```bash
zen-lock decrypt [flags]
```

### Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--input` | `-i` | (required) | Input ZenLock YAML file |
| `--output` | `-o` | stdout | Output file for decrypted YAML |
| `--privkey` | `-k` | (required) | Private key file for decryption |

### Example

```bash
# Decrypt a ZenLock CRD locally (never in CI)
zen-lock decrypt \
  --privkey /path/to/master-key.age \
  --input zenlock-secrets.yaml \
  --output decrypted-secrets.yaml
```

### Output Format

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secrets
  namespace: default
stringData:
  DB_PASSWORD: "super-secret-password"
  API_KEY: "api-key-12345"
```

## Shell Completion

Generate autocompletion scripts for your shell:

```bash
# Bash
zen-lock completion bash > /etc/bash_completion.d/zen-lock

# Zsh
zen-lock completion zsh > "${fpath[1]}/_zen-lock"

# Fish
zen-lock completion fish > ~/.config/fish/completions/zen-lock.fish
```

## Version

Check your CLI version:

```bash
zen-lock --version
# zen-lock version 0.1.0-beta
```

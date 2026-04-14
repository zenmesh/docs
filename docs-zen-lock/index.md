---
slug: /
title: zen-lock
sidebar_label: Overview
---

# zen-lock in Zen Mesh

**Zero-knowledge secret management — built into Zen Mesh.**

zen-lock is the secret management layer that ships with every Zen Mesh installation. It ensures that enrollment credentials, HMAC keys, and mTLS certificates are **never stored in plaintext** — not in your cluster's etcd, not in Git, not anywhere persistent.

As a Zen Mesh customer, you don't interact with zen-lock directly. It works automatically during enrollment and delivery. But understanding it helps you trust the security model.

## What zen-lock Does

| Operation | Who Triggers It | What Happens |
|-----------|----------------|--------------|
| Enrollment | Dashboard → agent | Age-encrypted bundle stored as ciphertext CRD |
| Certificate issuance | Agent ↔ control plane | mTLS certs injected ephemerally into egress pods |
| HMAC key storage | Control plane → agent | Delivery signing keys stored in zen-lock CRDs |
| Secret rotation | Automatic | Certs and keys auto-rotate on schedule |

## Key Properties

- **Zero-knowledge**: Only ciphertext is stored. Your Kubernetes API server cannot read the secrets.
- **Ephemeral**: Decrypted secrets exist only as temporary K8s Secrets, cleaned up when pods terminate.
- **GitOps-safe**: Encrypted CRDs can be committed to Git without exposing plaintext.
- **Automatic**: No manual key management. Enrollment handles everything.

## See Also

- [Enrollment and Secrets](./enrollment-and-secrets) — How zen-lock protects enrollment bundles
- [How It Works](./how-it-works) — Technical deep dive into the encrypt/decrypt lifecycle
- [Security Properties](./security-properties) — What zen-lock protects against (and what it doesn't)

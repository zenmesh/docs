---
sidebar_label: Cryptographic Enrollment
description: "Cryptographic enrollment establishes trust between Zen Mesh components using governed opaque AGE artifacts, Zen Identity issuance, and proof-of-possession validation."
title: "Cryptographic Enrollment | Zen Mesh Security"
---

# Cryptographic Enrollment

Establish trust between Zen Mesh components using cryptographic enrollment for secure identity establishment.

## What It Is

Cryptographic enrollment is the process by which Zen Mesh components establish trusted identity with the control plane. Using governed opaque AGE artifacts, Zen Identity issuance, and proof-of-possession (PoP) validation, each component receives a cryptographic identity that is verified on every interaction.

## How It Works

Enrollment follows a one-time authorization flow:

1. **Artifact issuance**: The control plane generates a governed opaque AGE (Authenticating Groundwork Envelope) enrollment artifact
2. **Opaque transport**: The enrollment artifact is encrypted and transported to the component without exposing private credentials
3. **Zen Identity issuance**: The control plane issues a Zen Identity certificate bound to the component
4. **Proof of possession**: The component demonstrates control over the identity without transmitting raw private keys
5. **Placement validation**: The control plane validates the component's placement and custody domain
6. **Local custody**: Private keys remain in the local custody domain (Control-local, Data-local, or Edge-local)

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Enrollment artifact** | Opaque AGE enrollment artifact (one-time authorization) |
| **Zen Identity issuance** | Identity certificate issued by control plane |
| **Proof of possession** | Component demonstrates key custody without raw key transmission |
| **Placement validation** | Control plane validates component's custody domain |
| **Authorization revision** | Secure identity update and revision process |
| **Workload identity** | Identity issued to workloads with proper custody boundaries |

## Operational Limits

- Governed opaque AGE artifacts with Zen Identity issuance is implemented at runtime
- Local private-key custody in Control/Data/Edge domains
- Evidence references: SECURITY_MECHANISM_OPERATIONAL_MATRIX (IMPLEMENTED_RUNTIME)

## Example Scenario

A new zen-agent is deployed in a Kubernetes cluster. During initial bootstrap, it receives a governed opaque AGE enrollment artifact through encrypted transport. The agent demonstrates proof of possession and receives a Zen Identity certificate from the control plane. The agent now communicates with the ingester and egress components using mTLS with its enrolled identity — all subsequent traffic is authenticated and authorized based on this enrollment, while private keys remain in local custody.

## Related Capabilities

- [Webhook IP Allowlisting](./ip-allowlisting)
- [Webhook Header Validation](./header-validation)
- [Zen Lock Security Properties](/docs/zen-lock/security-properties)

## Evidence and Status

**Status as of 2026-06:** Governed opaque AGE artifacts with Zen Identity issuance and proof-of-possession validation is implemented and runtime-validated. Local private-key custody in Control/Data/Edge domains is enforced.

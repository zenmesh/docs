---
sidebar_label: Cryptographic Enrollment
description: "Cryptographic enrollment establishes trust between Zen Mesh components using HMAC-based enrollment with X.509 SVID and age-encrypted enrollment bundles."
title: "Cryptographic Enrollment | Zen Mesh Security"
---

# Cryptographic Enrollment

Establish trust between Zen Mesh components using cryptographic enrollment for secure identity establishment.

## What It Is

Cryptographic enrollment is the process by which Zen Mesh components establish trusted identity with the control plane. Using HMAC-based enrollment with X.509 SVID (SPIFFE Verifiable Identity Document) and enrollment bundles, each component receives a cryptographic identity that is verified on every interaction.

## How It Works

Enrollment follows a challenge-response flow:

1. A new component (e.g., zen-agent) generates an enrollment request with its identity material
2. The control plane validates the request and issues an enrollment bundle containing cryptographic credentials
3. The component uses the enrollment bundle to establish authenticated communication with the control plane and other components
4. All subsequent communications use the enrolled identity for mTLS and HMAC verification

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Identity material** | Cryptographic material used during enrollment (HMAC key, X.509 CSR) |
| **Enrollment flow** | Sequence of steps for enrollment (request, validate, issue, confirm) |
| **Rotation/expiry** | Credential lifecycle — when and how enrolled identities are rotated |
| **Evidence/audit references** | Audit trail of enrollment events for compliance and verification |

## Operational Limits

- HMAC enrollment with X.509 SVID and enrollment bundle is implemented at runtime
- Full SPIRE Workload API SVID rotation is planned for post-V1 hardening
- Evidence references: SECURITY_MECHANISM_OPERATIONAL_MATRIX (IMPLEMENTED_RUNTIME)

## Example Scenario

A new zen-agent is deployed in a Kubernetes cluster. During initial bootstrap, it generates cryptographic identity material and sends an enrollment request to the control plane. The control plane validates the request and returns an enrollment bundle. The agent now communicates with the ingester and egress components using mTLS with its enrolled identity — all subsequent traffic is authenticated and authorized based on this enrollment.

## Related Capabilities

- [Webhook IP Allowlisting](./ip-allowlisting)
- [Webhook Header Validation](./header-validation)

## Evidence and Status

**Status as of 2026-06:** HMAC-based cryptographic enrollment with X.509 SVID and enrollment bundle is implemented and runtime-validated. Full SPIRE Workload API SVID rotation for comprehensive workload identity management is on the post-V1 hardening roadmap.

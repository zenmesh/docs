---
title: Payload Locality Invariant | Zen Mesh Documentation
description: "Zen Mesh payload locality commitment: customer event payloads are processed inside regional Traffic Plane, never proxied by control plane."
sidebar_label: Payload Locality Invariant
---

# Payload Locality Invariant

Zen Mesh makes a hard architectural commitment: **customer event payloads are processed inside the regional or customer-owned Traffic Plane where they enter Zen Mesh. The control plane does not proxy, replicate, or retain those payloads.**

## The Commitment

Customer event payloads are received, verified, transformed, routed, retried, and delivered **inside the regional or customer-owned Traffic Plane** where they enter Zen Mesh. This is not an implementation detail. This is not a capability target. This is an architectural invariant.

### What This Means

1. **Payload reception:** Customer event payloads arrive at the regional Traffic Plane.
2. **Local processing:** All verification, transformation, and routing happens in the Traffic Plane.
3. **No control-plane relay:** The Zen Mesh control plane never proxies the payload.
4. **Bounded metadata only:** Only bounded operational metadata (resource identifiers, policy versions, cryptographic digests, health, delivery outcomes, audit receipts, evidence metadata) may reach the control plane.

### Cross-Boundary Delivery

A payload crosses a regional or jurisdictional boundary **only when the customer explicitly configures a destination across that boundary**. Until then, the payload remains local to the Traffic Plane where it entered Zen Mesh.

## Control Plane vs. Traffic Plane

### Control Plane

- **Location:** Canadian-based for China market strategy
- **Role:** Governs delivery policies, manages resource allocation
- **Payload handling:** Receives **only bounded operational metadata**
- **Responsibilities:**
  - Resource identifiers and state
  - Policy versions and enforcement
  - Cryptographic digests for payload integrity
  - Health monitoring and operational visibility
  - Delivery outcomes and retry logic
  - Audit receipts and evidence metadata
  - Evidence manifest generation and maintenance

### Traffic Plane

- **Location:** Regional (China market Traffic Plane) or customer-owned
- **Role:** Receives, processes, and delivers customer event payloads
- **Payload handling:** Receives **full customer event payloads**
- **Responsibilities:**
  - Receive customer event payloads
  - Verify payload integrity (signatures, digests)
  - Transform payloads as needed
  - Route to configured destinations
  - Handle retries and error recovery
  - Generate delivery evidence

## Regional Deployment Stance

For the China market strategy:

- **Canadian control-plane:** Planned
- **Regional China-market Traffic Plane:** Planned
- **Hong Kong Traffic Plane:** Under evaluation for account and ingress feasibility
- **Mainland China Traffic Plane:** Account feasibility review (not production-live)

**Regional deployed proof:** NOT YET PRODUCTION-LIVE

## Evidence and Assurance

### Evidence-Backed Commitment

The payload locality commitment is backed by:

1. **Architectural design:** Traffic Plane architecture explicitly separates payload processing from control-plane operations.
2. **Bounded metadata:** Control plane receives only bounded metadata, never full payloads.
3. **Explicit customer-directed delivery:** Payloads only cross boundaries when customer explicitly configures destinations.
4. **Evidence manifest:** Every deployment generates an evidence manifest that validates payload locality.

### Evidence Manifest

The evidence manifest (`/ai/evidence/v1/manifest.json`) documents:

- **Capability maturity:** Claims about payload locality
- **Evidence status:** Whether payload locality is currently production-live, sandbox-tested, or planned
- **Source commit:** Current repository HEAD
- **Proof artifacts:** Links to relevant architecture documentation, deployments, and validation

### Non-Claims

Explicitly **not** claimed at this time:

- Full production-live payload locality enforcement in regional deployments
- Exactly-once delivery guarantee for payload locality
- Specific regional deployment locations (beyond planned/under-evaluation status)

## Operational Boundaries

### What May Cross to Control Plane

- Resource identifiers (e.g., `zen-workload:abc123`)
- Policy versions and configurations
- Cryptographic digests (SHA-256 hashes) of payloads
- Health status and operational metrics
- Delivery outcomes (success/failure/retry count)
- Audit receipts and evidence metadata
- Evidence manifest files

### What Must Remain Local

- Full customer event payloads
- Raw request/response bodies
- User data or personal information
- Sensitive authentication credentials (except provider secrets for verification)
- Provider-specific data structures

## Provider Integration Considerations

For Chinese payment provider integrations (Antom/Alipay, WeChat Pay, UnionPay):

1. **Provider notifications:** Received by Traffic Plane
2. **Verification:** Happens in Traffic Plane (signature verification, payload validation)
3. **Transformation:** Happens in Traffic Plane (format conversion, normalization)
4. **Routing:** Happens in Traffic Plane (to your destinations)
5. **Metadata only:** Control plane receives metadata for delivery policy enforcement

This ensures that even if the control plane were to fail or be compromised, customer event payloads remain in the Traffic Plane and are not exposed.

## Future Regional Deployments

As regional deployments are planned or executed:

1. **Traffic Plane isolation:** Regional Traffic Plane is isolated from control plane
2. **Customer-directed routing:** Customer controls where payloads go across regional boundaries
3. **Local evidence generation:** Each regional Traffic Plane generates local evidence
4. **Control-plane metadata:** Control plane receives only regional-specific metadata (not payloads)

## Conclusion

Payload locality is a **hard architectural commitment**, not an implementation detail. Customer event payloads stay in the Traffic Plane where they enter Zen Mesh. The control plane never proxies, replicates, or retains full payloads. This commitment is backed by architecture, evidence, and explicit operational boundaries.

**Regional deployed proof:** NOT YET PRODUCTION-LIVE (as of 2026-08-05)

---
sidebar_label: Glossary
---

# Concepts Glossary

## Three-Plane Model
The Zen Mesh architecture separates control (SaaS), data (edge), and customer planes. See [Three Plane Model](../architecture/three-plane-model).

## mTLS (Mutual TLS)
Both client and server verify each other's certificates. Required on internal Zen Mesh paths. See TRUST-PROOF-004/006.

## HMAC-SHA256
Message authentication code for payload integrity. Prevents tampering and verifies source. Proven in TRUST-PROOF-003.

## SPIFFE/SPIRE
SPIFFE provides workload identity via URI SAN in mTLS certs. SPIRE-based SVID rotation is planned (TD-011).

## ZenLock
Ciphertext-only secret management via Kubernetes CRDs. Proven in TRUST-PROOF-005/009.

## Enrollment
Process of registering a K8s cluster via age-encrypted bundle + zen-agent. Proven in TRUST-PROOF-001/002.

## Delivery Modes
- **Direct**: Standard delivery — destination reachable from data plane
- **Standard delivery**: Default delivery mode — the destination is reachable from the selected Zen Mesh data plane (maps to `transport.mode=direct`)
- **Outbound-only private delivery**: Delivery mode for destinations behind NAT/firewall — an enrolled edge adapter maintains an outbound relay connection (maps to `transport.mode=relay`)

Proven in PROOF-001/008/009/010.

## Evidence Pack
Consolidated machine-readable JSON with proof status and evidence refs. One per domain (runtime, trust). See [Non-Claims](../ai/non-claims).

## Victory Lock
A commit-pinned proof artifact that records scenario, evidence refs, validation commands, and non-claims boundaries.

## Proof Ledger
Index of all proofs with status, scenario, and evidence file paths.

## Replay Verifier
Validator script that checks all proof artifacts, ledgers, claims guard, and blocker state.

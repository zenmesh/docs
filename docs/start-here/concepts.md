---
sidebar_label: Key Concepts
---

# Key Concepts

## Architecture

| Concept | Description |
|---|---|
| **Control Plane** | SaaS layer — manages configuration, policy, and evidence. Never in the delivery path. |
| **Data Plane** | Edge infrastructure — ingesters, egresses, bridges that route events. |
| **Edge Plane** | Customer-managed clusters running zen-agent and zen-egress. |

## Delivery Paths

| Path | Description | Evidence |
|---|---|---|
| **Direct** | Ingester → public target | PROOF-001, 003, 004 |
| **Relay** | Ingester → egress (mTLS) → NAT/firewalled target | PROOF-008, 009 |
| **Private Edge** | Edge source → private_edge path → mock data target | PROOF-010 |

## Trust Mechanisms

| Mechanism | Description | Evidence |
|---|---|---|
| **mTLS** | Mutual TLS on all internal paths | TRUST-PROOF-004, 006 |
| **HMAC** | Payload integrity via SHA-256 signature | TRUST-PROOF-003 |
| **SPIFFE** | Workload identity via URI SAN in certs | TRUST-PROOF-004 |
| **ZenLock** | Ciphertext-only secret management | TRUST-PROOF-005, 009 |
| **Enrollment** | K8s cluster registration via age-encrypted bundle | TRUST-PROOF-001, 002 |

## Evidence Model

| Concept | Description |
|---|---|
| **Evidence Pack** | Consolidated JSON with proof status, refs../ai/evidence-v1-supersession.md#non-claims |
| **Victory Lock** | Commit-pinned proof artifact with validation commands |
| **Proof Ledger** | Index of all proofs with scenarios and statuses |
| **Replay Verifier** | Validator checking all artifacts and claims guard |
| **State Machine** | Transition model for delivery, connectivity, topology, buffer |
| **Non-Claims** | Explicitly unclaimed capabilities (not false, just not proven) |

## Status Classifications

| Status | Meaning |
|---|---|
| victory_locked | Proof committed, verified, witnessed |
| local_mock_proven | Demonstrated in deterministic mock harness |
| implementation_present | Code exists but no execution proof artifact |
| planned | Design documented, implementation not started |
| blocked | Cannot proceed due to known blocker |
| not_claimed | Explicitly not claimed |
| supports / maps_to | Compliance relationship (not certification) |

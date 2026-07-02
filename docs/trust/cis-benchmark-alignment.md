---
sidebar_label: CIS Benchmark Alignment
---

# Kubernetes CIS Benchmark Alignment

Zen Mesh intends to test SaaS control-plane and data-plane cluster baselines against the CIS Kubernetes Benchmark where applicable. This is a technical hardening signal, not formal CIS certification. It is not a claim that customer clusters are compliant.

## Current Status

**Maturity Level: 0 — Not assessed**

No CIS Benchmark runs have been completed for Zen Mesh SaaS or data-plane clusters. This is a planned evidence initiative.

## Maturity Ladder

| Level | Description | Current |
|-------|-------------|---------|
| **0** | Not assessed | Active |
| **1** | Benchmark run completed — all checks executed | Planned |
| **2** | Critical and high findings remediated or justified | Planned |
| **3** | Repeatable CIS evidence pack published | Planned |
| **4** | Recurring CIS drift check — benchmark runs in CI | Planned |
| **5** | Externally reviewed or formal audit support | Not planned |

## Scope

| Component | Benchmark Applicability | Status | Note |
|-----------|------------------------|--------|------|
| SaaS control-plane clusters | CIS Kubernetes Benchmark | Planned | Managed cloud provider control-plane components may be provider-managed and not directly testable |
| Data-plane agent clusters | CIS Kubernetes Benchmark | Planned | Customer-deployed agents; benchmark applicable to customer-managed nodes |
| Managed control-plane (EKS, GKE, AKS) | Provider-managed | Not applicable | Control-plane components managed by cloud provider; not directly testable by Zen Mesh |

## Non-Claims

- This is not a formal CIS certification.
- This is not a claim that customer clusters are compliant with the CIS Benchmark.
- This is not a claim that Zen Mesh SaaS or its data-plane is fully hardened.
- Benchmark results will show pass, fail, warn, and not-applicable — not a binary pass/fail.
- Managed cloud control-plane checks may be provider-managed or not testable at all.

## Related

- [Trust Overview](./index)
- [Compliance Coverage](./compliance-coverage)
- [Security](/docs/security/)

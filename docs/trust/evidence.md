---
sidebar_label: Evidence
---

# Trust Evidence

This page covers how Zen Mesh generates, organizes, and retains evidence that can support trust and compliance initiatives.

## Evidence Types

| Type | Description | Current Status |
|------|-------------|----------------|
| **Validation evidence** | Proof that Zen Mesh capabilities behave as claimed | Active — see [Evidence Overview](/docs/evidence/overview) |
| **Runtime evidence** | Delivery receipts, Merkle-anchored proof ledger, convergence proofs | Active — see [Runtime Convergence](/docs/evidence/runtime-convergence) |
| **Release readiness evidence** | Validation maps, verification suites, non-claims | Active — see [Validation Map](/docs/evidence/validation-map) |
| **Export / retention** | Evidence export via API; S3/object-store export | Planned — Business+ feature |

## Where Evidence Lives

- **Public documentation evidence** — `docs/evidence/` in the [docs repo](https://github.com/zenmesh/docs)
- **Runtime proof ledger** — `docs/80-EVIDENCE/runtime/` in [zen-platform](https://github.com/zenmesh/zen-platform)
- **Trust lifecycle evidence** — `docs/80-EVIDENCE/security/` in [zen-platform](https://github.com/zenmesh/zen-platform)
- **Zen-GC / Kubernetes validation** — [Zen-GC overview](/zen-gc/) (separate repo)

## Validation Evidence

The [Evidence Overview](/docs/evidence/overview) catalogs all validation evidence by area:

- **Runtime convergence** — 10 proofs covering delivery, DLQ, backpressure, circuit breaker
- **Trust lifecycle** — 10 proofs covering enrollment, mTLS, HMAC, ZenLock, rotation
- **Completion evidence** — validated work-gate evidence and Merkle integrity
- **Non-claims** — capabilities explicitly not claimed

See the [Evidence Index](/docs/evidence/evidence-index) for a complete artifact listing.

## Evidence Export

| Method | Status | Details |
|--------|--------|---------|
| API export | Active | Delivery receipts available via delivery status API |
| S3 / object store | Planned (Business+) | Evidence export destination on the roadmap |
| Manual download | Active | Summary reports available in dashboard |

Evidence export to S3 or other object-store destinations is planned for Business+ plans. It is not currently live.

## Evidence Retention

| Plan | Event Log Retention | Evidence Availability |
|------|--------------------|-----------------------|
| Free | 7 days | API access |
| Pro | 30 days | API access |
| Business | Up to 90 days | API access; S3 export planned |
| Enterprise | Custom | Custom retention available |

## Related

- [Trust Overview](/docs/trust/)
- [Compliance Coverage](./compliance-coverage)
- [Evidence Overview](/docs/evidence/overview)
- [Non-Claims](/docs/evidence/non-claims)
- [Validation Map](/docs/evidence/validation-map)

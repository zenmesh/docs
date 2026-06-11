---
sidebar_label: Object-Store Runtime Status
description: Object-store fan-out runtime readiness — contract status vs runtime proof needed for S3-compatible, GCS, Wasabi, and other object stores.
---

# Object-Store Runtime Status Prep

> **Preparation materials for Leonardo's review.**
>
> This page tracks the gap between contract-defined object-store fan-out and
> actual runtime implementation/proof. It informs launch decisions about
> what target types to publicly surface.

## Status Summary

| Store Type | Contract Status | Runtime Proof | Public Surface |
|------------|----------------|---------------|----------------|
| **S3-compatible** (AWS S3, MinIO, etc.) | Contract-defined | None | Yes (as launch target — not V1) |
| **GCS** | Roadmap | None | No |
| **Wasabi** | Roadmap | None | No |
| **Azure Blob** | Roadmap | None | No |

## Contract vs Runtime Gap

The [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out) defines
the expected behavior for S3-compatible object-store delivery:

- Durable, replayable backup of webhook events
- Customer-defined retention
- Evidence records for object-store deliveries
- Per-destination policy for retry, timeout, and DLQ

**However, none of this has runtime implementation or validation.** The contract is
a design specification ready for implementation — it is not a statement of current
capability.

## What Must Be True to Move to V1

For object-store fan-out to move from "launch target" to "V1":

1. **Runtime implementation** — actual code in the data plane for object-store delivery
2. **Validation** — delivery to an S3-compatible store must be tested and passing in at least sandbox/demo
3. **Evidence coverage** — delivery evidence records must include object-store deliveries
4. **Plan limits defined** — limits per plan (Free vs Pro vs Business) for object-store destinations
5. **Documentation** — setup guide, troubleshooting, and limits page updated

## Wording Guidance

| Context | Correct Wording | Incorrect Wording |
|---------|-----------------|-------------------|
| Public docs | "Object-store fan-out is a launch target. S3-compatible stores are contract-defined. Not yet available." | "Object-store delivery supported" |
| Marketing | "Object store support is on the roadmap." | "Deliver webhooks to S3" |
| Internal | "Contract-defined for S3-compatible. No runtime proof. GCS/Wasabi/Azure are roadmap only." | "S3 fan-out is done" |

## Guarded Terms

- ❌ "Object-store delivery is supported" — implies V1 capability
- ❌ "Deliver webhooks directly to S3" — not yet implemented
- ❌ "S3 fan-out target" — implies live feature
- ✅ "S3-compatible fan-out is contract-defined as a launch target"
- ✅ "Object-store destinations are on the roadmap"

## See Also

- [Object-Store Fan-Out Contract](/docs/contracts/object-store-fan-out) — full contract specification
- [Multi-Target Delivery Contract](/docs/contracts/multi-target-delivery) — multi-destination delivery
- [Target / Fan-Out Matrix](/docs/contracts/#target--fan-out-matrix) — status in the launch contracts index
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — broader open decisions

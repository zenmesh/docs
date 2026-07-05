---
sidebar_label: Delivery Evidence
description: Webhook delivery evidence — delivery receipts, audit trails, and machine-readable evidence manifests.
---

# Webhook Delivery Evidence

Zen Mesh records delivery evidence for every webhook event, providing audit trail, tamper-evident integrity, and machine-readable verification.

## What It Is

Delivery evidence is a tamper-evident record of each webhook delivery attempt. Every event that passes through the data plane generates a delivery receipt with metadata about the source, destination, delivery outcome, and integrity information.

## Evidence Types

| Type | Description |
|------|-------------|
| **Delivery receipts** | Per-event delivery outcome with timestamps, source, destination, and status |
| **Delivery history** | Complete history of delivery attempts, including retries and DLQ events |
| **Integrity chain** | Evidence chain for tamper detection |
| **Validation maps** | Local validation guides for verifying evidence |

## How It Works

1. When an event is delivered, a delivery receipt is generated with the event ID, source, destination, delivery mode, timestamp, and outcome
2. Receipts are appended to an audit log with linking for tamper evidence
3. Machine-readable manifests expose capability status and evidence references

## Related Capabilities

- [Webhook Reliability](../delivery/) — operational delivery controls
- [Webhook Replay and Recovery](../delivery/replay-and-recovery) — replay uses delivery history
- [Evidence Overview](../evidence/overview) — full evidence index

## Evidence and Status

**Status as of 2026-06:** Delivery receipts and audit logs are generated per-event. Evidence chain is implemented. Machine-readable evidence manifests are published. All evidence is currently validated in local/sandbox environments.
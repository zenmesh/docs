---
sidebar_label: Delivery Evidence
description: Webhook delivery evidence — delivery receipts and audit trails.
---

# Webhook Delivery Evidence

Zen Mesh records delivery evidence for every webhook event, providing audit trail and machine-readable verification.

## What It Is

Delivery evidence is a record of each webhook delivery attempt. Every event that passes through the data plane generates a delivery receipt with metadata about the source, destination, delivery outcome, and status.

## Evidence Types

| Type | Description |
|------|-------------|
| **Delivery receipts** | Per-event delivery outcome with timestamps, source, destination, and status |
| **Delivery history** | Complete history of delivery attempts, including retries and DLQ events |
| **Validation maps** | Local validation guides for verifying evidence |

## How It Works

1. When an event is delivered, a delivery receipt is generated with the event ID, source, destination, delivery mode, timestamp, and outcome
2. Receipts are stored in an audit log for review
3. Capability status and evidence references are available through the evidence API

## Related Capabilities

- [Webhook Reliability](../delivery/) — operational delivery controls
- [Webhook Replay and Recovery](../delivery/replay-and-recovery) — replay uses delivery history
- [Evidence Overview](../evidence/overview) — full evidence index

## Evidence and Status

**Status as of 2026-06:** Delivery receipts and audit logs are generated per-event. All evidence is currently validated in local/sandbox environments.
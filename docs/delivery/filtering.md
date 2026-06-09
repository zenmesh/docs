---
sidebar_label: Filtering
description: Route or suppress webhook events according to configured conditions for targeted delivery to specific destinations.
---

# Webhook Filtering

Route or suppress webhook events according to configured conditions, enabling targeted delivery to specific destinations.

## What It Is

Event filtering allows operators to define conditions that control which events are delivered to which destinations. Instead of forwarding all events to all targets, filtering enables selective routing based on event attributes.

## How It Works

Filtering operates at the ingester level during event processing:

1. An event arrives and is parsed for routing-relevant attributes
2. Configured filter conditions are evaluated against the event headers, body, or metadata
3. Matching events are forwarded to their designated destinations
4. Non-matching events are dropped or routed to an alternate destination

Filters support multiple evaluation modes:

- **Allow conditions** — events matching specific criteria are delivered
- **Drop conditions** — events matching specific criteria are suppressed
- **Route conditions** — events are directed to specific destinations based on attribute values

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Condition fields** | Event fields evaluated by filtering rules (header, body path, metadata) |
| **Header/metadata selectors** | Selection criteria based on event headers or metadata attributes |
| **Allow/drop/route behavior** | Action taken when a filter condition matches or does not match |

## Operational Limits

- Basic ingester-level filtering is implemented; comprehensive header and attribute-based filtering is partial
- Evidence references: AC-004 (PARTIAL)

## Example Scenario

An organization receives webhooks from multiple GitHub repositories but only needs to process events from the `production` and `staging` repositories in their primary delivery flow. A filter condition is configured to match repository name — events from other repositories are routed to a secondary queue.

## Related Capabilities

- [Webhook Fan-Out](./fan-out)
- [Webhook Deduplication](./deduplication)

## Evidence and Status

**Status as of 2026-06:** Basic ingester-level filtering is operational. Comprehensive header-, body-, and attribute-based filtering is under active development (AC-004 PARTIAL).

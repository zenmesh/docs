---
sidebar_label: IP Allowlisting
description: Restrict accepted webhook delivery sources using IP allowlisting with identity-based deny-by-default enforcement.
---

# Webhook IP Allowlisting

Restrict accepted webhook delivery sources by configuring which networks are permitted to send events to your destinations.

## What It Is

IP allowlisting controls which source networks can deliver webhooks to Zen Mesh ingesters. By restricting accepted delivery sources to known IP ranges, allowlisting reduces the attack surface of webhook ingestion.

## How It Works

IP allowlisting operates at the ingester enforcement point:

1. An incoming webhook connection includes a source IP address
2. The source IP is evaluated against the configured allowlist rules
3. If the source IP matches an allowed CIDR range, the connection proceeds to authentication and delivery
4. If the source IP does not match any allowed range, the connection is rejected

The allowlist is deny-by-default — only explicitly permitted sources are allowed.

## Configuration Options

| Setting | Description |
|---------|-------------|
| **Allowed CIDRs** | One or more CIDR notation ranges defining permitted source networks |
| **Source identity** | Additional identity-based allowlist alongside IP restrictions |
| **Enforcement point** | Where allowlisting is applied (ingester edge, per-destination) |
| **Update workflow** | Process for adding, removing, or modifying allowed CIDRs |

## Operational Limits

- Component identity allowlist (deny-by-default) is implemented
- Per-IP source allowlisting is partially implemented
- Evidence references: AC-004 (PARTIAL)

## Example Scenario

A platform team wants to ensure that only Stripe's published webhook IP ranges can deliver events to their webhook endpoints. They configure the ingester allowlist with Stripe's CIDR ranges — any event arriving from outside those ranges is automatically rejected.

## Plan Tiering

IP allowlist/block is a **Pro+** feature (V1). Free plan users see an upgrade prompt when accessing this feature. See [Security Feature Tiering](./security-tiering) for details.

## Related Capabilities

- [Security Feature Tiering](./security-tiering)
- [Webhook Header Validation](./header-validation)
- [Cryptographic Enrollment](./cryptographic-enrollment)

## Evidence and Status

**Status as of 2026-06:** Identity-based allowlisting (deny-by-default) is implemented. Per-IP source allowlisting is partially implemented and under active development.

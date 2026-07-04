---
sidebar_label: Stripe Behind Firewall
description: Receive Stripe webhook events in private networks behind firewalls using Zen Mesh outbound-only Edge Plane — no inbound ports required.
---

# Stripe Webhooks Behind a Firewall

Receive Stripe webhook events in a private network without inbound ports, VPN, or reverse proxy.

## How It Works

Stripe sends events to Zen Mesh over the public internet. Zen Mesh delivers them through an outbound-only Edge Plane connection to your private infrastructure. Your network never needs inbound firewall rules.

## Setup

1. [Configure a target](../guides/destinations) pointing to your internal Stripe handler
2. [Create a flow](../guides/endpoints) linking Stripe to your target
3. [Set up Stripe in the Stripe Dashboard](../guides/stripe) to send events to Zen Mesh

## Full Guide

See [Stripe Integration](../guides/stripe) for the complete step-by-step walkthrough, including event types, signature verification, and JSONPath transforms.

## Related

- [Edge Plane](../install/edge-plane) — outbound-only delivery model
- [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — deploy on Kubernetes
- [Security: mTLS and SPIFFE/SPIRE](../security/)

---
sidebar_label: Stripe Behind Firewall
description: Receive Stripe webhook events in private networks behind firewalls using Zen Mesh outbound-only Edge Plane — no inbound ports required.
---

# Stripe Webhooks Behind a Firewall

Receive Stripe webhook events in a private network without inbound ports, VPN, or reverse proxy.

## How It Works

Stripe sends events to Zen Mesh over the public internet. Zen Mesh delivers them through an outbound-only Edge Plane connection to your private infrastructure. Your network never needs inbound firewall rules.

Each delivery is tracked through the Flow → Attempt → Trace → Evidence chain. Every attempt carries a trace identifier and produces a cryptographic receipt. See [How Zen Works](../start-here/how-zen-works) for the full mental model.

## Prerequisites

- A Zen Mesh account with Edge Plane access
- A private network where your Stripe handler runs (Kubernetes or Edge Lite)
- A Stripe account with webhook configuration access

## Setup

1. [Choose a runtime path](../install/choose-runtime-path) — Kubernetes Edge Plane or Edge Lite
2. Deploy the runtime:
   - [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — Helm-based
   - [Edge Lite](../install/edge-lite) — Docker-based
3. [Configure a target](../guides/destinations) pointing to your internal Stripe handler
4. [Create a flow](../guides/endpoints) linking Stripe to your target
5. [Set up Stripe in the Stripe Dashboard](../guides/stripe) to send events to Zen Mesh

## Full Guide

See [Stripe Integration](../guides/stripe) for the complete step-by-step walkthrough, including event types, signature verification, and JSONPath transforms.

## Related

- [How Zen Works](../start-here/how-zen-works) — mental model
- [Edge Plane](../install/edge-plane) — outbound-only delivery model
- [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — deploy on Kubernetes
- [Security: mTLS and SPIFFE/SPIRE](../security/)

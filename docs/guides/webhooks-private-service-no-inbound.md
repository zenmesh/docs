---
sidebar_label: Webhooks to Private Services
description: Receive webhooks on services behind NAT, firewall, or in private networks without opening inbound ports — using Zen Mesh outbound-only Edge Plane.
---

# Webhooks to Private Services Without Inbound Ports

Deliver webhooks to services behind NAT, firewall, or in private networks without opening inbound ports, setting up a VPN, or deploying a reverse proxy.

## How It Works

Zen Mesh uses an outbound-only Edge Plane architecture. The zen-agent in your environment establishes a persistent outbound connection to Zen Mesh. When a webhook arrives, Zen Mesh delivers it through this tunnel to your private service. Your network never accepts inbound connections.

This works for:

- **Kubernetes services** behind NAT or firewalls
- **Docker containers** in private networks
- **Legacy services** without public endpoints
- **Development environments** not exposed to the internet

## Setup

1. [Choose a runtime path](../install/choose-runtime-path) — Edge Plane (Kubernetes) or Edge Lite (Docker)
2. Deploy your runtime:
   - [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — Helm-based deployment
   - [Edge Lite](../install/edge-lite) — lightweight Docker-based deployment
3. [Configure a target](../guides/destinations) pointing to your internal service URL
4. [Set up your webhook source](../guides/sources) — Stripe, GitHub, Twilio, Shopify, or custom HTTP

## Related

- [Architecture: Delivery Modes](../architecture/delivery-modes) — standard vs. private delivery
- [Edge Plane](../install/edge-plane) — outbound-only architecture
- [Custom Webhooks](../guides/custom-webhooks) — any HTTP webhook source
- [Security: mTLS and SPIFFE/SPIRE](../security/)

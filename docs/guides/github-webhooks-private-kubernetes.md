---
sidebar_label: GitHub to Private K8s
description: Receive GitHub webhook events in private Kubernetes clusters using Zen Mesh Edge Plane — no inbound ports, no ingress controller exposure.
---

# GitHub Webhooks to Private Kubernetes

Deliver GitHub webhook events to services running in private Kubernetes clusters — no inbound ports, no load balancer exposure.

## How It Works

GitHub sends events to Zen Mesh over the public internet. Zen Mesh delivers them through an outbound-only Edge Plane connection to your Kubernetes cluster. Your services remain unreachable from the public internet.

## Setup

1. Deploy the [zen-agent on your cluster](../install/kubernetes-edge-plane) via Helm
2. [Configure a target](../guides/destinations) pointing to your internal service
3. [Create a flow](../guides/endpoints) linking GitHub events to your target
4. [Set up the GitHub webhook](../guides/github) in your repository settings

## Full Guide

See [GitHub Integration](../guides/github) for the complete walkthrough, including event types, HMAC-SHA256 signature verification, and JSONPath transforms.

## Related

- [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — Helm deployment guide
- [Delivery Modes](../architecture/delivery-modes) — standard vs. outbound-only private delivery

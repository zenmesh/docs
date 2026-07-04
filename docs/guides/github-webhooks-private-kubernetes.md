---
sidebar_label: GitHub to Private K8s
description: Receive GitHub webhook events in private Kubernetes clusters using Zen Mesh Edge Plane — no inbound ports, no ingress controller exposure.
---

# GitHub Webhooks to Private Kubernetes

Deliver GitHub webhook events to services running in private Kubernetes clusters — no inbound ports, no load balancer exposure.

## How It Works

GitHub sends events to Zen Mesh over the public internet. Zen Mesh delivers them through an outbound-only Edge Plane connection to your Kubernetes cluster. Your services remain unreachable from the public internet.

Each delivery is tracked through the Flow → Attempt → Trace → Evidence chain. Every attempt carries a trace identifier and produces a cryptographic receipt. See [How Zen Works](../start-here/how-zen-works) for the full mental model.

## Prerequisites

- A Zen Mesh account with Edge Plane access
- A private Kubernetes cluster with Helm 3 installed
- A GitHub account with webhook configuration access

## Setup

1. [Choose a runtime path](../install/choose-runtime-path) — Kubernetes Edge Plane or Edge Lite
2. Deploy the [zen-agent on your cluster](../install/kubernetes-edge-plane) via Helm
3. [Configure a target](../guides/destinations) pointing to your internal service
4. [Create a flow](../guides/endpoints) linking GitHub events to your target
5. [Set up the GitHub webhook](../guides/github) in your repository settings

## Full Guide

See [GitHub Integration](../guides/github) for the complete walkthrough, including event types, HMAC-SHA256 signature verification, and JSONPath transforms.

## Related

- [How Zen Works](../start-here/how-zen-works) — mental model
- [Kubernetes Edge Plane](../install/kubernetes-edge-plane) — Helm deployment guide
- [Delivery Modes](../architecture/delivery-modes) — standard vs. outbound-only private delivery

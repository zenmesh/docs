---
slug: /
title: Zen-GC
sidebar_label: Overview
---

# Zen-GC — Kubernetes Garbage Collection Controller

Zen-GC is a Free Apache-2.0 Kubernetes garbage collection controller that applies declarative TTL cleanup policies to namespaced resources. It is independent OSS released by the Zen Mesh team.

## How it fits

- **Retention hygiene:** Automatically prune stale resources based on resource age, labels, or custom TTL annotations — reducing storage costs and namespace clutter.
- **Evidence lifecycle:** Apply retention windows to delivery logs, audit entries, and evidence artifacts so expired data is cleaned up without manual operator intervention.
- **Operational cleanup:** Remove completed or abandoned pipeline resources (Pods, Jobs, ConfigMaps) that accumulate in long-running clusters.
- **Safe platform maintenance:** Declarative policy-driven deletion avoids accidental mass cleanup — resources are removed only when TTL conditions are met.

## Getting started

```bash
# Clone the repository
git clone https://github.com/zen-mesh/zen-gc

# Deploy with default policies
kubectl apply -f deploy/
```

See the [zen-gc repository](https://github.com/zen-mesh/zen-gc) for full documentation, policy configuration, and examples.

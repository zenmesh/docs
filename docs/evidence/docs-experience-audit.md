# Docs Experience Audit

**Date:** 2026-05-24
**Repo:** ~/zenmesh/docs @ a85025e

## Structure

| Category | Pages | Issues |
|---|---|---|
| Getting Started | 3 | Missing "What is Zen Mesh?" intro page; quick-start assumes K8s |
| Architecture | 4 | Missing concepts glossary; overlaps with How-It-Works on website |
| Guides | 4 | Enrollment requires internal control-plane host (not publicly reachable) (currently dead); no "Create your first route" |
| Reference | 4 | API doc is placeholder; needs OpenAPI if available |
| Operations | 3 | Missing monitoring/alerts setup |
| AI Agents | 6 | Duplicate with evidence/ section |
| Evidence | 6 | Duplicate with ai/ section; confusing overlap |

## Issues

- P0: docs/evidence/ and docs/ai/ have overlapping content — need dedup
- P0: No "What is Zen Mesh?" introduction page in docs
- P0: "Getting Started" has no path for non-K8s users
- P1: "Enrollment" guide references internal control-plane host (not publicly reachable) (dead link)
- P1: API reference is minimal/placeholder
- P1: No concepts glossary (three-plane model, mTLS, enrollment, etc.)
- P1: No link to zen-platform evidence from docs pages
- P2: Sidebar has no sub-categories for deep content
- P2: Evidence section accessible from both "Evidence" and "AI Agents" sidebar items

## Recommended Restructure

```
Start Here
  What is Zen Mesh?
  Quick Start (K8s)
  Launch Status / Early Access

Architecture
  Three Plane Model
  Delivery Modes
  Security Model
  Concepts Glossary

Trust & Security
  Security Model
  Enrollment
  mTLS/Certificate Trust
  HMAC & Integrity
  ZenLock Secrets

Guides
  Cluster Enrollment
  Adapters
  Destinations
  Monitoring

Operations
  Upgrades
  Backups
  Troubleshooting

Reference
  CLI
  API
  Configuration
  Helm Chart

Evidence & Compliance
  Overview (points to source)
  Runtime Convergence
  Trust Lifecycle
  Non-Claims
  Evidence Schema
  Verification
  For AI Agents
```

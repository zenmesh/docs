---
sidebar_label: Who Should Use Zen Mesh
---

# Who Should Use Zen Mesh?

Zen Mesh is designed for teams that need to receive webhooks and events inside private infrastructure without opening firewall ports or exposing internal services.

## You might need Zen Mesh if...

- **You run Kubernetes clusters behind NAT or corporate firewalls** and need to receive webhooks from Stripe, GitHub, Shopify, or custom sources.
- **Your security team blocks inbound connections** — you need outbound-only delivery from a private cluster.
- **You need mTLS, HMAC verification, and audit trails** for every webhook delivery.
- **You operate in a compliance-sensitive environment** and need evidence-backed security claims with clear non-claims boundaries.
- **You want to avoid building your own ingress proxy, relay, and monitoring infrastructure.**

## Who this is NOT for

- **Teams with publicly routable services** — if your endpoints are already on the open internet, a simpler webhook proxy may suffice.
- **Teams that need exactly-once or zero-loss delivery guarantees** — these are not claimed.
- **Teams that need SOC 2, HIPAA, PCI, FedRAMP, or ISO certifications** — Zen Mesh supports compliance controls but is not certified.

## Roles

| Role | How they use Zen Mesh |
|---|---|
| **Platform Engineer** | Deploys and operates the data/edge plane; configures routes and adapters |
| **Security Engineer** | Reviews mTLS, HMAC, ZenLock trust model; inspects evidence artifacts |
| **Compliance Reviewer** | Reviews compliance-to-feature mappings and non-claims boundaries |
| **AI Agent / RAG System** | Reads machine-readable manifests, compliance maps, and evidence packs |
| **Operator** | Monitors deliveries, manages upgrades, handles troubleshooting |

See [detailed use cases and examples](https://www.zen-mesh.io/use-cases) for more on how Zen Mesh fits different engineering teams.

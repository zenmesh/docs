---
sidebar_label: Geography
description: Where Zen Mesh processes your data — SaaS hosting, entry points, and future plans.
---

# Geographic Transparency

This page documents where your data is processed and where webhook traffic enters the Zen Mesh network.

> **Note:** The information on this page reflects the current launch configuration and planned expansion. Do not use this page for binding compliance or data-sovereignty decisions.

## Our SaaS runs in Canada

The Zen Mesh SaaS control plane — including billing, configuration, user management, and the API gateway — runs on Google Cloud Platform in Toronto, Canada.

## Entry Points

Your webhook traffic enters through your chosen entry point. Currently available:

- **AWS us-east-1** — the initial data plane entry point for webhook ingestion and delivery

All webhook sources can be located anywhere. Traffic routes from the source through the configured entry point to your infrastructure.

Entry point selection is a roadmap item. Users will eventually be able to choose where flows run, including Free users. Do not rely on future entry points for current compliance or architecture decisions.

## Planned data planes

EU and APAC entry points are planned for teams with data sovereignty requirements. These are not yet available.

- **EU** — planned, not yet available
- **APAC** — planned, not yet available
- **China** — planned, not yet available

Data residency can be revisited when a second data plane launches. Do not claim data residency beyond what is documented on this page.

## Data-Plane Choice

Data-plane selection is a planned capability. Users will eventually be able to select which entry point processes their events:

- **Free:** Data-plane selection is planned for all plans. Do not rely on future entry points for current architecture decisions.
- **Pro:** Data-plane selection is planned.
- **Business/Enterprise:** Dedicated adapters for specific data-plane regions are a future/contact-us capability, not live.

## Multi-Data-Plane Resilience

Multi-data-plane resilience — running webhook delivery across multiple entry points for redundancy — is a roadmap concept. It is not currently available.

- Active-active delivery across regions is not available at launch.
- Failover between data planes is not automated at launch.
- This capability is under evaluation for future plans, starting with Business and Enterprise tiers.

## Data flow

```
Webhook Source → Entry Point (AWS us-east-1) → Zen Mesh Data Plane → Your Infrastructure
                                                  ↕
                                         Control Plane (Toronto, Canada / GCP)
```

The control plane handles configuration and billing but does not sit in the runtime event delivery path. Events flow through the data plane directly to your infrastructure.

## What we do not claim

- We do not claim data residency beyond Toronto/GCP for the control plane and AWS us-east-1 for the data plane.
- We do not claim EU, APAC, or China availability until those entry points are documented as available on this page.
- We do not claim data sovereignty compliance for any specific jurisdiction.
- We do not claim data-plane choice is available at launch.
- We do not claim multi-data-plane resilience.
- We do not claim dedicated adapters per region outside Business/Enterprise as a contact-us capability.

## See also

- [Data Handling](/docs/start-here/data-handling) — retention, encryption, and access policy
- [Security Model](/docs/security/) — three-plane architecture and security controls
- [Plans & Limits](/docs/start-here/limits) — plan tiers and limits

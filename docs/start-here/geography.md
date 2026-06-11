---
sidebar_label: Geography
description: Where Zen Mesh processes your data — SaaS hosting, entry points, and future plans.
---

# Geographic Transparency

This page documents where your data is processed and where webhook traffic enters the Zen Mesh network.

## Our SaaS runs in Canada

The Zen Mesh SaaS control plane — including billing, configuration, user management, and the API gateway — runs in Canada.

## Current entry point: AWS us-east-1

Your webhook traffic enters through your chosen entry point. Currently available:

- **AWS / us-east-1** — available now

All webhook sources can be located anywhere. Traffic routes from the source through the configured entry point to your infrastructure.

## Planned entry points

EU and APAC entry points are planned for teams with data sovereignty requirements. These are not yet available.

- **EU** — planned, not yet available
- **APAC** — planned, not yet available
- **China** — planned, not yet available

Do not rely on future entry points for current compliance or architecture decisions.

## Data flow

```
Webhook Source → Entry Point (AWS us-east-1) → Zen Mesh Data Plane → Your Infrastructure
                                       ↕
                              Control Plane (Canada)
```

The control plane handles configuration and billing but does not sit in the runtime event delivery path. Events flow through the data plane directly to your infrastructure.

## What we do not claim

- We do not claim data residency beyond Canada SaaS and AWS us-east-1 entry point.
- We do not claim EU, APAC, or China availability until those entry points are documented as available on this page.
- We do not claim data sovereignty compliance for any specific jurisdiction.

## See also

- [Data Handling](/docs/start-here/data-handling) — retention, encryption, and access policy
- [Security Model](/docs/security/) — three-plane architecture and security controls
- [Plans & Limits](/docs/start-here/limits) — plan tiers and limits

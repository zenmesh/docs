---
sidebar_label: Geography
description: Where Zen Mesh processes your data — SaaS hosting, entry points, and future plans.
---

# Geographic Transparency

This page documents where your data is processed and where webhook traffic enters the Zen Mesh network.

> **Note:** Entry point provider and region are to be confirmed before launch. EU, APAC, and China entry points are planned but not yet available. Do not use this page for binding compliance or data-sovereignty decisions beyond what is documented here.

## Our SaaS runs in Canada

The Zen Mesh SaaS control plane — including billing, configuration, user management, and the API gateway — runs on Google Cloud Platform in Toronto, Canada.

## Entry Points

Your webhook traffic enters through your chosen entry point. The entry point provider and region will be confirmed before launch.

All webhook sources can be located anywhere. Traffic routes from the source through the configured entry point to your infrastructure.

> "Our SaaS runs in Canada. Your webhook traffic enters through your chosen entry point. Entry point provider and region to be confirmed before launch. EU and APAC entry points are planned for teams with data sovereignty requirements."

## Planned data planes

EU and APAC entry points are planned for teams with data sovereignty requirements. These are not yet available.

- **EU** — planned, not yet available
- **APAC** — planned, not yet available
- **China** — planned, not yet available

Data residency can be revisited when a second data plane launches. Do not claim data residency beyond what is documented on this page.

## Data-Plane Choice

Data-plane selection is a planned capability. Users will eventually be able to select which entry point processes their events:

- **Free:** Data-plane selection is planned for all plans. Do not rely on future entry points for current architecture decisions.
- **Pro:** Same planned capability.
- **Business / Enterprise:** Same planned capability, with dedicated entry points planned for Enterprise.

Data-plane choice is not available at launch. When it becomes available, users will be able to choose where flows run from the dashboard and API.

## See also

- [Plans & Limits](/docs/start-here/limits) — plan comparison and limits
- [Data Handling](/docs/start-here/data-handling) — retention, encryption, and access policy
- [Security Model](/docs/architecture/security-model) — three-plane architecture
- [Support](/docs/start-here/support) — support channels by plan

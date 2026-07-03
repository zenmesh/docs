---
sidebar_label: Template Registry Roadmap
---

# Template Registry Roadmap

Zen Mesh Templates are reusable, versioned configuration packages that produce Blueprints. The Registry organizes Templates across four trust tiers.

## Registry model

| Tier | Description | Availability |
|------|-------------|-------------|
| **Official** | Zen-maintained, verified, versioned, security-reviewed, supported | V1 (read-only) |
| **Community** | Submitted by community, preview/experimental, validation status visible, no SLA unless promoted | Planned V1.1 |
| **Organization** | Private tenant/org templates, internal use, controlled sharing | Planned V1.1 (Business+) |
| **Personal** | User-owned drafts/templates, private workspace use | V1 |

## Trust model

| Dimension | Official | Community | Organization | Personal |
|-----------|----------|-----------|--------------|----------|
| Maintainer | Zen Mesh | Community contributor | Tenant admin | User |
| Verification | Full | Status visible | Configurable | None |
| Versioning | Semantic | Labeled | Labeled | None |
| Security review | Yes | Validation Lab | Tenant policy | None |
| SLA | Supported | No SLA unless promoted | Tenant-determined | None |
| Maturity | Draft/Preview/Beta/Verified/GA | Preview/Experimental | Tenant-managed | Draft |

## Roadmap staging

### V1 — Official templates, read-only
- Official registry with Zen-maintained Templates
- Template cards with "Best for" tags
- Version badges on template cards
- "Based on" relationship when creating a Blueprint
- View YAML on template detail where feasible
- No public community submission

### V1.1 — Community and collaboration foundation (Business+)
- Community Preview section
- PR or controlled submission path
- Security Validation Lab for community submissions
- Provenance display: publisher, signed yes/no, reviewed yes/no, maturity label
- Update/diff/merge when upstream template changes
- Organization registry for Business+ tenants
- GitOps for Templates and Blueprints
- Pending Changes from any surface (Git, MCP, API, CLI, UI) under ZCC

### V2 — Ecosystem
- Contributor pages and profiles
- AI-assisted template generation
- Automated regression testing across template updates
- Compatibility matrices
- Broader packages beyond Templates:
  - Policies
  - Processors
  - Transforms
  - CloudEvents mappings
  - Validation rules
  - Target profiles

## Non-goals for V1

- Community registry submissions
- Organization private registry
- AI template generation
- Automated regression testing
- Template compatibility matrices

## Related

- [Zen Configuration Contract](./zen-configuration-contract) — ZCC north-star model
- [GitOps Roadmap](./gitops-roadmap) — GitOps for Templates and Blueprints
- [V1 Roadmap](./v1-roadmap) — V1 launch blockers and staging
- [Provider Package Lifecycle](../providerflow/provider-package-lifecycle) — Template maturity model

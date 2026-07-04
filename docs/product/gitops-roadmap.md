---
sidebar_label: GitOps Roadmap
---

# GitOps Roadmap

GitOps in Zen means treating Git as a control surface for the Zen Configuration Contract (ZCC). A Git change produces the same ZCC artifact the UI, CLI, API, and MCP would produce. Zen validates it, records evidence, and either queues a Pending Change or applies it according to policy. See [How Zen Works](../start-here/how-zen-works) for the full mental model.

## Core principle

Git is not a separate runtime with different behavior. It is a file-based control surface that uses the same validation, authorization, and delivery paths as every other surface.

## V1.1 scope (Business+)

GitOps in Zen starts with the safest artifact boundary: Templates and Blueprints.

| Capability | Status |
|------------|--------|
| Connect a Git repository branch | Planned V1.1 |
| Any YAML file matching ZCC schema under `/blueprints/` is validated | Planned V1.1 |
| Security-Lab checked where applicable | Planned V1.1 |
| Optionally auto-applied or queued as a Pending Change | Planned V1.1 |
| Human approval path by default | Planned V1.1 |
| Same runtime, same evidence, same authorization | Design principle |

### What this means

- A Git push to a connected branch triggers ZCC validation.
- Valid YAML files produce the same runtime objects as UI/API/MCP submissions.
- Evidence records trace the Git commit hash.
- Authorization policies apply identically regardless of surface.
- Pending Changes can be reviewed and approved before runtime apply.

## Out of scope for V1.1

- Full tenant-as-Git configuration export/import
- Git as the sole configuration source (hybrid model — surfaces coexist)
- Git-driven policy, evidence, or Registry artifact management (later)
- Automated rollback from Git history (manual recovery path)

## Future

- Full tenant configuration export/import (V2 horizon)
- Policy-as-code through Git (V2 horizon)
- Registry artifact management through Git (V2 horizon)
- Git-driven rollback and recovery (later)

## Related

- [Zen Configuration Contract](./zen-configuration-contract) — ZCC north-star model
- [Template Registry Roadmap](./template-registry-roadmap) — Registry staging
- [V1 Roadmap](./v1-roadmap) — V1 launch blockers and staging
- [MCP Overview](../mcp/overview) — MCP as another ZCC surface

---
sidebar_label: Zen Configuration Contract
---

# Zen Configuration Contract

Every operation in Zen must be representable as a declarative contract. Every control surface is an alternative way to author or manage that same contract.

## What ZCC is

The **Zen Configuration Contract (ZCC)** is the canonical declarative model for all Zen Mesh configuration. A ZCC artifact is a validated, versioned, and authorization-checked description of what the system should do — a Template, Blueprint, Flow, Target, Policy, or Registry entry expressed in a portable format.

ZCC is not a separate file format. It is the principle that every configuration object in Zen has a single declarative representation, regardless of which surface created or modified it.

## One contract, five surfaces

```
                Zen Configuration Contract (ZCC)
                           |
     -------------------------------------------------
     |       |       |       |                      |
    UI      CLI     API     MCP                    Git
     |       |       |       |                      |
     -------------------------------------------------
                           |
                     Same Runtime
                           |
                     Same Evidence
                           |
                   Same Authorization
```

Zen does not maintain five separate implementations. Every surface authors or manages the same declarative contract:

- **UI** — visual management, form-driven, real-time validation
- **CLI** — scriptable, pipeable, terminal-oriented
- **API** — programmatic, RESTful, idempotent
- **MCP** — AI-native, tool-call driven, same schema
- **Git** — file-based, branch-gated, CI-validated

All produce and consume ZCC artifacts from the same runtime, through the same validation path, under the same authorization model.

## Same runtime, evidence, and authorization

When a Blueprint is created through the UI, an API call, an MCP action, a CLI command, or a Git commit, the result is the same runtime object, producing the same delivery evidence, under the same authorization policies.

This means:

- Security teams audit one authorization model, not five.
- Platform engineers validate one schema, not five implementations.
- Operators see one delivery behavior regardless of how configuration was authored.
- Tools and automations interoperate without surface-specific adapters.

## How ZCC relates to existing concepts

| Concept | Relationship to ZCC |
|---------|-------------------|
| Templates | Declarative configuration templates that produce Blueprints. A Template IS a ZCC artifact. |
| Blueprints | Instantiated configurations derived from Templates. Every Blueprint has a ZCC representation. |
| Flows | Delivery routing definitions. A Flow is a ZCC artifact. |
| Targets | Destination configurations. A Target is a ZCC artifact. |
| Policies | IP allow/block, header validation, transform rules. Policies are ZCC artifacts. |
| Evidence | Delivery receipts, audit trails. Evidence verifies that runtime behavior matches the ZCC contract. |
| Registry | Catalog of published ZCC artifacts (Official, Community, Organization, Personal). |

## Why MCP is not special code

MCP (Model Context Protocol) is often seen as a separate, AI-only path. Under ZCC, MCP is just another control surface. An MCP action to create a Blueprint produces the same ZCC artifact as a UI form submission or an API call. The MCP server does not have its own execution path — it validates through the same runtime and records the same evidence.

## Why GitOps is a control surface, not a separate runtime

GitOps in Zen starts with the safest artifact boundary: Templates and Blueprints. A Git change produces the same ZCC artifact the UI, CLI, API, and MCP would produce. Zen validates it, records evidence, and either queues a Pending Change or applies it according to policy.

Git is not a special runtime with different behavior. It is a file-based control surface that uses the same validation, authorization, and delivery paths as every other surface.

## What is V1, V1.1, and later

| Horizon | ZCC scope |
|---------|-----------|
| **V1** | Core runtime surfaces (UI, CLI, API, MCP) all produce the same runtime objects. Templates and Blueprints exist. No full GitOps, no registry ecosystem, no View YAML on every screen. The principle exists; the full surface coverage is staged. |
| **V1.1** | Business+ GitOps for Templates and Blueprints. Organization registry. Community Preview section. View YAML on key screens. Customize wizard. Pending Changes from any surface. |
| **V2** | Broader ZCC ecosystem: policies as contracts, processors, transforms, CloudEvents mappings, validation rules, target profiles as first-class ZCC artifacts. AI-assisted template generation. Contributor registry. Automated regression testing across template updates. |

## Non-goals for V1

- Full GitOps (Templates/Blueprints scope targeted for V1.1)
- Full registry ecosystem (Official templates read-only in V1; Community and Organization in V1.1)
- Every screen has View YAML (targeted for key screens in V1.1)
- AI template generation (V2 horizon)
- Full tenant-as-Git configuration export/import (later)

## Nirvana: ZCC and NIRVANA

NIRVANA gives the protocol and delivery model. ZCC gives the operational contract model.

- NIRVANA defines how webhooks are received, validated, routed, and delivered.
- ZCC defines how configuration is authored, validated, stored, authorized, and versioned.

Templates, Blueprints, Flows, Targets, Policies, Evidence, and Registry entries are declarative artifacts under ZCC. Runtime behavior is derived from contracts, not hidden per-surface imperative logic. The two models together mean every delivery operation traces to a declarative contract that can be authored from any surface, validated through one path, and authorized under one model.

## Related

- [V1 Roadmap](./v1-roadmap) — launch blockers and V1 feature staging
- [Template Registry Roadmap](./template-registry-roadmap) — registry staging and trust model
- [GitOps Roadmap](./gitops-roadmap) — GitOps V1.1 scope and staging
- [Plans and Limits](../start-here/plans-and-limits) — feature quotas by plan

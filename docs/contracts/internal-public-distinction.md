---
sidebar_label: Internal vs Public Distinction
description: How to distinguish internal launch-gate pages from public-facing contract pages — marking conventions, trust hierarchy, and public-safe handoff rules.
---

# Internal vs Public Distinction

> **Conventions for keeping internal launch gates, draft legal text, and preparation pages distinct from final public-facing contracts.**

## Classification

Every page under `contracts/` has a **Status** label in the [Launch Contracts Index](/docs/contracts/):

| Status | Meaning | Example |
|--------|---------|---------|
| **V1** | Contract for V1 behavior — public-safe, describes what the system does at launch | Multi-Target Delivery, Evidence Export |
| **Preparation** | Internal launch gate or decision prep — NOT a public contract | Launch Readiness Gap-to-Action, Legal Launch Checklist |
| **Launch target** | Contract-defined capability that is NOT YET available | Object-Store Fan-Out |
| **Living** | Continuously updated record of open decisions | Open Launch Decisions |

## Marking Conventions

### Draft / Not Effective

Legal pages (Terms, Privacy, AUP, DPA, Cookie) are marked with:

```markdown
> **⚠ DRAFT — PENDING LEGAL REVIEW. NOT EFFECTIVE.**
```

This banner appears at the top of every legal page. These pages are **not** binding terms.

### Launch Gate Pages

Pages that are internal launch gates or decision preparations use:

```markdown
> **Preparation materials for launch.** This documents the intended behavior or decision options.
```

or

```markdown
> **Internal preparation — not a public launch gate.**
```

or

```markdown
> **Do not merge until all items are confirmed.**
```

These pages describe what is **intended or planned**, not what is currently true.

### Contract Pages

V1 contract pages describe current V1 behavior:

```markdown
> **V1 contract** — defines current system behavior at launch.
```

These are the closest thing to "public truth" about what the system does.

## Trust Hierarchy

```
Public truth
  └─ V1 Contracts — what the system does at launch
  └─ Documentation — how to use it
  └─ Landing pages — product positioning
Internal truth
  └─ Preparation pages — decision prep, checklists, gaps
  └─ Legal drafts — not effective, pending review
  └─ Open decisions — unresolved design tensions
```

## Public-Safe Handoff Rules

1. **Never link to a Preparation page as if it describes current behavior.** Preparation pages are internal.
2. **Never claim a Launch Target capability is available.** It is contract-defined only.
3. **Never reference draft legal text as binding.** All legal pages carry the draft banner.
4. **Never reference open decisions as resolved.** They are documented as open.
5. **Never claim "V1" for a capability that is a Launch Target.** The status column in the index is authoritative.

## See Also

- [Launch Contracts Index](/docs/contracts/) — status matrix for every contract page
- [Open Launch Decisions](/docs/contracts/open-launch-decisions) — unresolved tensions
- [Legal Launch Checklist](/docs/contracts/legal-launch-checklist) — legal readiness
- [Draft Branch Merge Checklist](/docs/contracts/draft-branch-merge-checklist) — pre-merge review

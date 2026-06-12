# DOCSAI023 Leonardo Decision Queue (Definitive)

> **Task ID:** DOCSAI023
> **Date:** 2026-06-12
> **Status:** 16 open decisions requiring owner input

## Decisions

| ID | Topic | Status | Options | Safest Default | Risk if Deferred | Blocker Impact |
|----|-------|--------|---------|-----------------|-------------------|----------------|
| LD-001 | Edge Lite public visibility | OPEN | (a) Keep public with clearer header, (b) Add unlisted: true | (a) Keep public | Low | None |
| LD-002 | Blog strategy | OPEN | (a) 2-3 launch posts, (b) Remove blog from footer | (b) Remove blog | Low | None |
| LD-003 | launch-status.md evidence stats | OPEN | (a) Add qualifier, (b) Remove counts | (a) Add qualifier | Low | None |
| LD-004 | Subprocessor list for DPA | OPEN-LEGAL | (a) Legal provides list, (b) Remove reference | (b) Remove reference | Medium | DPA effective |
| LD-005 | Responsible disclosure template | OPEN | (a) Create security.txt, (b) Defer | (b) Defer | Low | None |
| LD-006 | Plan limits | OPEN | (a) Define exact limits, (b) Use TBD | (b) Use TBD | Low | Pricing accuracy |
| LD-007 | Over-limit behavior | OPEN | (a) Hard cutoff, (b) Warning+overage, (c) Queue | (c) Queue | Medium | Billing docs |
| LD-008 | Refund policy | OPEN-LEGAL | (a) Define policy, (b) Keep generic | (b) Keep generic | Low | Terms |
| LD-009 | Public Leonardo name | OPEN | (a) Use real name, (b) Keep anonymous | (b) Keep anonymous | Low | About page |
| LD-010 | Jurisdiction statement | OPEN-LEGAL | (a) Specify, (b) Defer to legal | (b) Defer | High | All legal effective |
| LD-011 | Slack support channel | OPEN | (a) Create and document, (b) Do not claim | (b) Do not claim | Low | Support docs |
| LD-012 | Discord community | OPEN | (a) Create, (b) Do not create | (b) Do not create | None | Support docs |
| LD-013 | MCP write contract scope | OPEN | (a) Document full contract, (b) Keep as future | (b) Future only | Low | MCP docs |
| LD-014 | Object store fan-out V1 claim | OPEN | (a) Claim if proven, (b) Do not claim | (b) Do not claim | High | Delivery docs |
| LD-015 | K8s CRD target public | OPEN | (a) Public docs, (b) Internal only | (b) Internal only | Low | Provider docs |
| LD-016 | Data plane provider/region | OPEN | (a) Announce specific, (b) Keep unresolved | (b) Keep unresolved | Critical | All residency claims |

## Priority Order
1. LD-016 — Data plane provider/region (critical risk)
2. LD-004 — Subprocessor list (legal blocker)
3. LD-010 — Jurisdiction (legal completeness)
4. LD-006 — Plan limits (pricing accuracy)
5. LD-014 — Object store fan-out (overclaim risk)
6. LD-008 — Refund policy (legal)
7. LD-007 — Over-limit behavior (billing UX)
8. LD-009 — Public Leonardo name (privacy)
9. Remaining — low risk, deferrable

## Hermes Runtime Dependencies
LD-006, LD-007, LD-008: Blocked on billing implementation
LD-014: Blocked on object store delivery proof

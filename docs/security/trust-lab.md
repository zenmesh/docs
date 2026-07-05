---
sidebar_label: Trust Lab
description: Continuous Trust Validation — deterministic validation scenarios for webhook delivery security and reliability.
---

# Trust Lab

Trust Lab is Zen Mesh's deterministic validation framework for webhook delivery. It runs **Trust Scenarios** — repeatable, deterministic checks that produce pass/fail results with verifiable evidence.

## What Trust Lab Is

Trust Lab is a **product capability** — a catalog of Trust Scenarios that validate webhook delivery behavior, security boundaries, and operational correctness. Results are produced by deterministic validators (not AI judgment) and can be used to support synthetic monitoring, regression gates, and historical trust evidence.

### Key Properties

- **Deterministic** — Same inputs always produce the same result.
- **Verifiable** — Every execution produces evidence artifacts.
- **Composable** — Scenarios can be run individually or as suites.
- **Auditable** — Results are stored for historical comparison.

## Trust Scenarios

A Trust Scenario is a structured, repeatable validation:

| Field | Description |
|-------|-------------|
| `id` | Unique scenario identifier |
| `purpose` | What this scenario validates |
| `prerequisites` | Conditions that must be met before execution |
| `execution steps` | Step-by-step procedure |
| `expected result` | Deterministic pass/fail criteria |
| `deterministic validator` | The tool or process that decides pass/fail |
| `evidence produced` | Artifact generated on execution |
| `severity if failed` | Impact classification |
| `safe_in_prod` | Whether the scenario can run in production |
| `customer_runnable` | Whether customers can execute this scenario |
| `ai_runnable` | Whether an AI assistant can execute this scenario |
| `cadence` | Recommended execution frequency |

### Example Scenarios

| Scenario | What It Validates |
|----------|-------------------|
| Replay attack rejection | A replayed webhook with a valid signature but reused nonce/timestamp is rejected |
| Invalid signature rejection | A webhook with a forged or mismatched signature is rejected |
| Expired timestamp rejection | A webhook with a timestamp outside the allowed window is rejected |
| Malformed request rejection | A webhook with missing or malformed required fields is rejected |
| Duplicate delivery behavior | A duplicate webhook is handled according to idempotency policy |
| Stripe validation suite | End-to-end Stripe webhook ingestion, validation, delivery |
| GitHub validation suite | End-to-end GitHub webhook ingestion, validation, delivery |
| Shopify validation suite | End-to-end Shopify webhook ingestion, validation, delivery |
| Twilio validation suite | End-to-end Twilio webhook ingestion, validation, delivery |
| Policy freshness | DeliveryPolicy and AuthProfile updates take effect within expected window |
| Integrity verification | Delivery evidence integrity chain is verifiable |
| Tenant isolation / RLS | Cross-tenant data isolation is enforced |
| Edge Lite reconnect | Edge Lite agent reconnects after network interruption within SLO |
| Evidence chain validation | Full evidence chain from ingestion to delivery is intact |

## Who Runs Scenarios

Trust Scenarios can be executed by multiple actors:

| Actor | Scope |
|-------|-------|
| **Zen Mesh operators** | Full catalog — CI, scheduled, on-demand |
| **AI assistant** | AI-runnable scenarios (subset gated by `ai_runnable`) — the AI is a client/orchestrator, not the decision authority |
| **Customers** | Customer-runnable scenarios (subset gated by `customer_runnable`) — self-service validation |
| **CI/CD** | Automated regression gates |

**AI is a client and orchestrator, not the product.** Trust Lab does not require an AI to function. Pass/fail is decided by deterministic validators, not by AI judgment. When an AI orchestrates a Trust Scenario, it executes the steps and reads the deterministic pass/fail result — it does not decide the outcome.

## Validation Lab

For broader or non-branded contexts, refer to **Validation Lab**. This is the generic term for the validation environment that hosts Trust Scenarios. Trust Lab is the branded product capability name.

## Relationship to Security Validation

Trust Scenarios validate correctness, security boundaries, and operational reliability. Adversarial/security-specific scenarios (attack simulation, boundary testing, fuzzing) belong to the [Security Validation Suite / Negative Security Test Suite](./security-validation-suite), which follows a separate schema:

- Scenario / attack
- Result (accepted / rejected / detected)
- Why the result occurred
- Evidence artifact
- Operator visibility level

Trust Scenarios and Security Validation Suite scenarios share the same deterministic-first philosophy but target different audiences: Trust Scenarios for operational validation, Security Validation Suite for adversarial verification.

## Status

Trust Lab is under active development. Not all scenarios listed above are implemented. See the [capability manifest](https://docs.zen-mesh.io/ai/evidence/v1/manifest.json) for current proof_status per scenario.

## Related

- [Security Validation Suite](./security-validation-suite)
- [Security Capability Validation](./security-capability-validation)
- [Provider Package Lifecycle](../providerflow/provider-package-lifecycle)
- [Package Validation](../providerflow/package-validation)

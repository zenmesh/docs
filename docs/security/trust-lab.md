---
sidebar_label: Trust Lab
---

# Trust Lab — Continuous Trust Validation

Trust Lab is Zen Mesh's framework for deterministic, repeatable trust and
security validation. It replaces the internal "AI Sandbox" terminology for
public positioning. AI assistants are **clients** of Trust Lab, not the product.

## Core Principle

> Pass/fail comes from **deterministic validators**, not AI judgment.

Trust Lab defines Trust Scenarios — executable, deterministic validation
artifacts that can be run by:

- Humans (manual or guided)
- CI pipelines
- Scheduled synthetic monitoring
- AI assistants (orchestration and explanation only)
- Customers, where the scenario is explicitly safe

## What Trust Lab Is

Trust Lab is a collection of Trust Scenarios that validate security properties
of webhook delivery, signature verification, replay protection, tenant isolation,
and evidence integrity. Each scenario produces a deterministic pass/fail result
with evidence artifacts.

## What Trust Lab Is Not

- Not an AI product. AI is one orchestrator among several.
- Not a substitute for compliance audits.
- Not a claim of universal protection. Scope is stated per scenario.

## Trust Scenario Schema

Each Trust Scenario is defined with:

| Field | Description |
|-------|-------------|
| `id` | Unique scenario identifier |
| `title` | Human-readable title |
| `purpose` | What security property is being validated |
| `prerequisites` | What must be set up before running |
| `execution_steps` | Deterministic steps to execute |
| `expected_result` | What the validator expects |
| `deterministic_validator` | The code/logic that decides pass/fail |
| `evidence_produced` | Artifacts generated (logs, receipts, hashes) |
| `severity_if_failed` | Critical / High / Medium / Low |
| `safe_in_prod` | Whether this scenario can run against production |
| `customer_runnable` | Whether customers can run this safely |
| `ai_runnable` | Whether an AI assistant can orchestrate this |
| `schedule` | Revalidation cadence (e.g., daily, weekly) |
| `historical_result_storage` | Where results are stored for trend analysis |

## Scenario Categories

### Signature and Authenticity

| Scenario | Validates |
|----------|-----------|
| Invalid signature rejection | HMAC mismatch detected and rejected |
| Missing signature rejection | Required header absent — request rejected |
| Payload tampering rejection | Digest/signature mismatch on modified payload |

### Replay Protection

| Scenario | Validates |
|----------|-----------|
| Replay attack rejection | Duplicate nonce/timestamp detected and rejected |
| Expired timestamp rejection | Request outside skew window rejected |

### Request Integrity

| Scenario | Validates |
|----------|-----------|
| Malformed request rejection | Invalid structure detected |
| Missing/tampered header rejection | Required headers validated |
| Unsupported content type rejection | Policy enforcement on content types |
| Oversized payload rejection | Size limit enforced |

### Provider-Specific

| Scenario | Validates |
|----------|-----------|
| Stripe validation suite | Stripe signature verification end-to-end |
| GitHub validation suite | GitHub HMAC verification end-to-end |
| Shopify validation suite | Shopify HMAC-SHA256 verification |
| Twilio validation suite | Twilio-Signature verification |

### Evidence and Trust Chain

| Scenario | Validates |
|----------|-----------|
| Merkle verification | Hash-chain evidence integrity |
| Evidence chain validation | End-to-end delivery evidence chain |
| Policy freshness | Active policies match expected state |

### Tenant Isolation (Safe Contexts Only)

| Scenario | Validates | Safe In Prod? |
|----------|-----------|---------------|
| Tenant isolation / RLS | Row-level security enforcement | No — synthetic data only |
| Edge Lite reconnect | Reconnection after network interruption | Yes |

> RLS / tenant isolation scenarios use synthetic data and are not run against
> customer production environments.

## Historical Trust Evidence

Trust Lab stores historical results for trend analysis. This enables detection
of behavioral or security regressions that ordinary monitoring might miss.

## Security Validation Suite

The deterministic validators backing Trust Lab are collectively called the
**Security Validation Suite** (also: **Negative Security Test Suite**). Each
validator tests a specific attack vector and produces evidence.

### Display Pattern

| Attack / Scenario | Result | Why Rejected | Evidence Artifact | Operator Visibility |
|--------------------|--------|--------------|-------------------|---------------------|
| Replay attack | Rejected | Duplicate nonce/timestamp policy | validator output | Security event recorded |
| Invalid signature | Rejected | HMAC mismatch | validator output | Audit/security event |
| Expired timestamp | Rejected | Outside skew window | validator output | Audit log |
| Missing signature | Rejected | Required header absent | validator output | Security event |
| Payload tampering | Rejected | Digest/signature mismatch | validator output | Security event |

### Scope Statement

Validators prove rejection within their defined scope (time window, provider,
header set). They do not claim universal protection against all attack vectors.
Scope is stated explicitly per scenario.

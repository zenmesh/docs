---
sidebar_label: Sandbox Validation
---

# Sandbox Validation Runbook

**Status:** Sandbox-Only
**Audience:** Operators
**Priority:** P0

## Objective

Validate ProviderFlow packages in the sandbox environment using fixtures, goldens, traces, and scans.

## Prerequisites

- ✅ ProviderFlow package contract defined
- ✅ Fixtures defined
- ✅ Goldens defined
- ✅ Access to sandbox environment

## Overview

Sandbox validation is an automated process that validates ProviderFlow packages against fixtures and goldens. It is **sandbox-only** and does not involve production.

## When to Use

This runbook is for:
- ✅ New package development
- ✅ Package updates
- ✅ Pre-deployment validation
- ✅ CI/CD integration

This runbook is **NOT** for:
- ❌ Production deployment validation
- ❌ Production monitoring
- ❌ Real-time webhook handling

## Validation Steps

### Step 1: Verify Package Contract

Ensure the package contract is valid:

```bash
zen package validate <package-path>
```

**Expected output:**
```
✅ YAML syntax: PASS
✅ Required fields: PASS
✅ Type validation: PASS
✅ Dependency validation: PASS
✅ Contract conformance: PASS
✅ Authentication configuration: PASS
✅ Event type validation: PASS
```

### Step 2: Run Validation

Validate the package:

```bash
zen package validate <package-path> --output=json
```

**Expected exit code:** 0 (success)

### Step 3: Generate Evidence

Collect validation evidence:

```bash
zen package evidence <package-path> --output=json
```

**Output includes:**
- Fixture comparison results
- Golden file differences
- Trace data
- Delivery statistics
- Validation summary

### Step 4: Inspect Package

Review package metadata:

```bash
zen package inspect <package-path>
```

**Output includes:**
- Package name and version
- Package type (provider)
- Package visibility (internal/private)
- Validation status
- Dependencies

### Step 5: Run Tests

Test package with real webhook payloads:

```bash
zen package test <package-path> --output=json
```

**Expected exit code:** 0 (all tests pass)

**Test coverage:**
- All event types in contract
- Authentication boundaries
- Routing logic
- Output format validation

### Step 6: Scan Package

Scan for potential issues:

```bash
zen package scan <package-path> --output=json
```

**Scans for:**
- YAML syntax errors
- Security issues
- Validation failures
- Missing required files

### Step 7: Review Traces

Review execution traces:

```bash
cat traces/<provider>/summary.json
```

**Traces include:**
- Event ID
- Timestamp
- Event type
- Contract name
- Endpoint name
- Target name
- Status (success/failure)
- Output data

## Validation Artifacts

### Fixtures

Test input data representing real webhook payloads:

```
fixtures/<provider>/<event-type>.json
```

**Example:**
```
fixtures/stripe/payment_intent.succeeded.json
```

### Goldens

Expected output data:

```
goldens/<provider>/<event-type>.json
```

**Example:**
```
goldens/stripe/payment_intent.succeeded.json
```

### Traces

Execution traces:

```
traces/<provider>/<event-type>.jsonl
```

**Example:**
```
traces/stripe/payment_intent.succeeded.jsonl
```

### Scans

Automated validation scans:

```
scans/<provider>/<scan-type>.json
```

**Example:**
```
scans/stripe/security.json
```

### Evidence

Validation summary:

```
evidence/<package>/summary.json
```

**Example:**
```
evidence/stripe-v2/summary.json
```

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Validation successful |
| `1` | General error |
| `2` | Authentication error |
| `3` | Validation error |
| `4` | Authorization error |

## Successful Validation

Validation is successful when:
- ✅ Exit code is 0
- ✅ All fixtures pass
- ✅ All goldens match
- ✅ All traces collected
- ✅ All tests pass
- ✅ No security issues found

## Validation Failure

Validation fails when:
- ❌ Exit code is non-zero
- ❌ Fixtures fail
- ❌ Goldens don't match
- ❌ Tests fail
- ❌ Security issues found

**Troubleshooting:**

1. Review error messages
2. Check fixtures
3. Check goldens
4. Check logs
5. Fix issues and re-validate

## Security Considerations

### Authentication

All authentication configurations are validated:

```bash
zen package validate <package-path>
```

**Checks:**
- ✅ API key validation
- ✅ Bearer token validation
- ✅ Header-based authentication
- ✅ Authentication boundaries enforced

### No Arbitrary Execution

Packages do not execute arbitrary JavaScript or runtime code:

- ✅ Deterministic YAML/DAG processing only
- ✅ No JavaScript execution
- ✅ No arbitrary runtime code
- ✅ No plugins or extensions

### Secret Redaction

All secrets are redacted from outputs:

- ✅ API keys redacted
- ✅ Tokens redacted
- ✅ Credentials redacted
- ✅ No secrets in traces

## Production Readiness

### Current State: Sandbox Validated

- ✅ Automated validation against fixtures and goldens
- ✅ Evidence generation and collection
- ✅ Real webhook testing
- ⚠️ Production deployment requires controlled rollout and explicit approval

### Production Requirements

To move to production:

1. ✅ Sandbox validation passes
2. ✅ Evidence collected and reviewed
3. ⚠️ Controlled deployment to production
4. ⚠️ Explicit approval from operators
5. ⚠️ Prod revalidation completed

**Note:** Prod revalidation is pending until controlled deploy and approved validation.

## Related

- [Package Validation](../providerflow/package-validation.md)
- [Fixtures, Goldens, Traces](../providerflow/fixtures-goldens-traces.md)
- [Security Model](../providerflow/security-model.md)

---

**Next:** [Prod Revalidation](./prod-revalidation.md)

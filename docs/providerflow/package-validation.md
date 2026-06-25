---
sidebar_label: Package Validation
---

# Package Validation

Package validation is a multi-stage process that ensures ProviderFlow packages are safe to deploy. Validation uses **fixtures, goldens, traces, and evidence** to verify deterministic behavior.

## Validation Stages

### 1. Sandbox Validation

Automated validation against fixtures and goldens in a sandbox environment.

```bash
zen package validate <package-path>
```

**Validation checks:**

- ✅ YAML syntax validation
- ✅ Required field validation
- ✅ Type validation
- ✅ Dependency validation
- ✅ Contract conformance
- ✅ Authentication configuration
- ✅ Event type validation

**Exit codes:**
- `0`: Package is valid
- `1`: Package has validation errors
- `2`: Package file not found
- `3`: Package validation failed

### 2. Evidence Generation

Collect trace data and scan results.

```bash
zen package evidence <package-path>
```

**Evidence includes:**

- Fixture comparison results
- Golden file differences
- Trace data
- Delivery statistics
- Validation summary

### 3. Real Webhook Testing

Test package with real webhook payloads.

```bash
zen package test <package-path>
```

**Test coverage:**

- All event types in contract
- Authentication boundaries
- Routing logic
- Output format validation

**Exit codes:**
- `0`: All tests pass
- `1`: Tests failed
- `2`: Package not found

### 4. Prod Revalidation (Pending)

Manual validation after controlled deploy and explicit approval.

**Requirements:**

- ✅ Controlled deployment to production
- ✅ Explicit approval from operators
- ✅ Evidence collected from production
- ✅ Validation against production data

## Validation Artifacts

### Fixtures

Test input data that represents real webhook payloads from providers.

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd"
  }
}
```

### Goldens

Expected output data for each fixture.

```json
{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "payload": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Traces

Execution traces for each event processed.

```json
{
  "event_id": "evt_12345",
  "timestamp": "2026-06-24T10:00:00Z",
  "contract": "stripe-v2",
  "endpoint": "payment-event",
  "target": "data-warehouse",
  "status": "success",
  "output": {...}
}
```

### Scans

Automated validation scans.

```json
{
  "scan_type": "security",
  "results": {
    "no_rce": true,
    "no_arbitrary_code": true,
    "auth_verified": true
  }
}
```

### Evidence

Summary of all validation results.

```json
{
  "package": "stripe-v2",
  "validations": {
    "yaml_syntax": "PASS",
    "required_fields": "PASS",
    "contract_conformance": "PASS",
    "fixture_comparison": "PASS",
    "golden_comparison": "PASS"
  },
  "exit_code": 0,
  "timestamp": "2026-06-24T10:00:00Z"
}
```

## Validation Commands

### Validate Package

```bash
zen package validate <package-path>
```

### Inspect Package

```bash
zen package inspect <package-path>
```

Displays package metadata and validation status.

### Get Package Evidence

```bash
zen package evidence <package-path>
```

Returns validation evidence.

### Scan Package

```bash
zen package scan <package-path>
```

Scans for potential issues (security, validation, etc.).

### Test Package

```bash
zen package test <package-path>
```

Tests package with real webhook payloads.

---

## Security Validation

### Authentication Validation

✅ All authentication configurations are validated
✅ Secrets are redacted from all outputs
✅ Authentication boundaries are enforced

### No Arbitrary Execution

✅ No JavaScript execution
✅ No arbitrary runtime code
✅ Deterministic YAML/DAG processing only

### Input Validation

✅ All webhook payloads are validated against contract
✅ Event types are validated
✅ Schema validation is enforced

---

## Production Readiness

### Current State: Sandbox Validated

- ✅ Automated validation against fixtures and goldens
- ✅ Evidence generation and collection
- ✅ Real webhook testing
- ⚠️ Production deployment requires explicit approval

### Production Requirements

To move to production:

1. ✅ Sandbox validation passes
2. ✅ Evidence collected and reviewed
3. ⚠️ Controlled deployment to production
4. ⚠️ Explicit approval from operators
5. ⚠️ Prod revalidation completed

**Note:** Prod revalidation is pending until controlled deploy and approved validation.

---

## Related

- [YAML/DAG Contract](./yaml-dag-contract)
- [Package Contract](./package-contract)
- [Security Model](./security-model)
- [Fixtures, Goldens, Traces](./fixtures-goldens-traces)

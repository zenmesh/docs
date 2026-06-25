---
sidebar_label: Fixtures, Goldens, Traces
---

# Fixtures, Goldens, Traces

ProviderFlow uses three types of validation artifacts to ensure deterministic behavior: fixtures, goldens, and traces.

## Fixtures

Fixtures are test input data that represent real webhook payloads from providers.

### Purpose

- Test input for validation
- Baseline for golden comparison
- Documentation of expected input format

### Format

Fixtures are JSON files representing webhook events.

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
    "created": 1719184800
  }
}
```

### Naming Convention

```
fixtures/<provider>/<event-type>.json
```

Example:
- `fixtures/stripe/payment_intent.succeeded.json`
- `fixtures/stripe/charge.succeeded.json`

### Validation

Fixtures are validated for:

- ✅ Valid JSON format
- ✅ Event type format
- ✅ Required fields
- ✅ Type consistency

## Goldens

Goldens are expected output data for each fixture.

### Purpose

- Define expected output format
- Enable deterministic validation
- Document output contract

### Format

Goldens are JSON files representing expected output.

```json
{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "customer": "cus_67890",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

### Naming Convention

```
goldens/<provider>/<event-type>.json
```

Example:
- `goldens/stripe/payment_intent.succeeded.json`
- `goldens/stripe/charge.succeeded.json`

### Validation

Goldens are validated for:

- ✅ Valid JSON format
- ✅ Destination format
- ✅ Timestamp format
- ✅ Payload structure

## Traces

Traces are execution traces for each event processed.

### Purpose

- Debugging and troubleshooting
- Audit trail
- Evidence collection

### Format

Traces are JSON lines (one per event).

```json
{
  "event_id": "evt_12345",
  "timestamp": "2026-06-24T10:00:00Z",
  "event_type": "payment_intent.succeeded",
  "contract": "stripe-v2",
  "endpoint": "payment-event",
  "target": "data-warehouse",
  "status": "success",
  "output": {
    "destination": "data-warehouse",
    "event_type": "payment_intent.succeeded",
    "payload": {...}
  }
}
```

### Validation

Traces are validated for:

- ✅ Valid JSON format
- ✅ Required fields (event_id, timestamp, status)
- ✅ Status is one of success/failure

## Validation Pipeline

### Phase 1: Fixture Validation

```bash
zen package validate <package-path>
```

Validates all fixtures.

**Checks:**
- ✅ YAML syntax
- ✅ Required fields
- ✅ Type consistency

### Phase 2: Golden Comparison

Compares output against goldens.

**Checks:**
- ✅ Structure matches
- ✅ Types match
- ✅ Values match

**Output:**
```json
{
  "fixture": "payment_intent.succeeded",
  "golden": "PASS",
  "differences": []
}
```

### Phase 3: Trace Collection

Collects traces for each event.

**Output:**
```bash
zen package evidence <package-path>
```

**Files generated:**
- `traces/<provider>/<event-type>.jsonl`
- `traces/<provider>/summary.json`

### Phase 4: Evidence Generation

Generates final evidence summary.

**Output:**
```json
{
  "package": "stripe-v2",
  "validations": {
    "fixtures": "PASS",
    "goldens": "PASS",
    "traces": "COLLECTED"
  },
  "summary": "Package is valid"
}
```

## Example Workflow

### 1. Define Fixtures

```bash
echo '{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd"
  }
}' > fixtures/stripe/payment_intent.succeeded.json
```

### 2. Define Goldens

```bash
echo '{
  "destination": "data-warehouse",
  "event_type": "payment_intent.succeeded",
  "payload": {
    "id": "pi_12345",
    "amount": 2000,
    "currency": "usd",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}' > goldens/stripe/payment_intent.succeeded.json
```

### 3. Validate

```bash
zen package validate stripe-v2
```

### 4. Collect Evidence

```bash
zen package evidence stripe-v2
```

### 5. Review Traces

```bash
cat traces/stripe/summary.json
```

---

## Related

- [Package Validation](./package-validation)
- [Security Model](./security-model)

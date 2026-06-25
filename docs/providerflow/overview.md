---
sidebar_label: Overview
---

# ProviderFlow Overview

ProviderFlow is a deterministic YAML/DAG-based framework for managing webhook-driven data pipelines. It provides a declarative model for ingesting, processing, and delivering webhook events from providers to downstream systems.

## What is ProviderFlow?

ProviderFlow is a **internal/private framework for V1** that defines how webhook events flow through the platform. It is not a public marketplace or production-ready deployment mechanism.

### Key Characteristics

- **Deterministic YAML/DAG**: Configuration is expressed as YAML and processed as a directed acyclic graph
- **No arbitrary execution**: Packages do not execute arbitrary JavaScript or runtime code
- **Validation-driven**: All packages are validated against fixtures, goldens, traces, and evidence
- **Sandbox-first**: Initial validation happens in sandbox environment
- **Prod revalidation pending**: Full production deployment and validation requires controlled rollout and explicit approval

## Architecture

ProviderFlow consists of three canonical objects:

### 1. Endpoint

The canonical inbound webhook source. Represents where webhook events from providers arrive.

**Example:**
```yaml
name: payment-webhook
provider: stripe
url: https://your-domain.com/webhooks/stripe
```

### 2. Target

The canonical outbound delivery destination. Represents where processed events are sent.

**Example:**
```yaml
name: data-warehouse
provider: stripe
url: https://api.data-warehouse.com/events
```

### 3. Flow

The canonical virtual connection between endpoints and targets. Represents the data flow between them.

**Example:**
```yaml
name: payment-events
provider: stripe
endpoint: payment-webhook
target: data-warehouse
```

## Package Structure

A ProviderFlow package consists of:

- **YAML/DAG contract**: Defines endpoints, targets, and flows
- **Fixtures**: Test input data
- **Goldens**: Expected output data
- **Traces**: Execution traces for validation
- **Scans**: Automated validation scans
- **Evidence**: Validation results and artifacts

## Validation

Package validation happens in three stages:

1. **Sandbox validation**: Automated validation against fixtures and goldens
2. **Evidence generation**: Collection of trace data and scan results
3. **Prod revalidation**: Manual validation after controlled deploy (pending approval)

## Security

- All webhook payloads are validated against contract definitions
- Authentication boundaries are enforced
- Secrets are redacted from all logs and outputs
- No arbitrary code execution

## Public vs Private

**IMPORTANT: ProviderFlow is private/internal for V1**

- ✅ Packages are validated and documented
- ✅ Operator visibility through evidence and traces
- ❌ No public marketplace
- ❌ No public package listings
- ❌ No production validation until explicitly approved

## Next Steps

- [YAML/DAG Contract](./yaml-dag-contract)
- [Package Contract](./package-contract)
- [Package Validation](./package-validation)
- [Security Model](./security-model)
- [Fixtures, Goldens, Traces](./fixtures-goldens-traces)
- [Known Nonclaims](./nonclaims)

---

## Related

- [CLI Reference](../reference/cli.md) — CLI commands for ProviderFlow operations
- [Runbooks](../runbooks) — Operational procedures

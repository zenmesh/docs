---
sidebar_label: Known Nonclaims
---

# Known Nonclaims

ProviderFlow is **NOT** a public marketplace or production-ready deployment mechanism. These are explicitly stated non-claims.

> **See also:** [Provider Package Lifecycle](./provider-package-lifecycle) for
> the ownership/maturity classification system that replaces the deprecated
> "experimental" label.

## What ProviderFlow Is

ProviderFlow is an **internal/private framework for V1** that defines how webhook events flow through the platform.

### Supported Capabilities

- ✅ Declarative YAML/DAG contract
- ✅ Deterministic event processing
- ✅ Sandbox validation
- ✅ Evidence generation
- ✅ Security model
- ✅ Audit trail

## What ProviderFlow Is NOT

### Marketplace

❌ **NOT a public marketplace**

ProviderFlow is not a public marketplace for provider packages.

**Evidence:**
- Packages are not listed in a public marketplace
- No public package search
- No public package listings
- No public package ratings or reviews

### Production Deployment

❌ **NOT production-ready**

ProviderFlow packages are **sandbox validated**, not production-validated.

**Evidence:**
- Packages are validated in sandbox environment
- Prod revalidation is pending until controlled deploy and explicit approval
- No production deployment automation
- No production monitoring

### Public Packages

❌ **NOT public packages**

ProviderFlow packages are **internal/private**.

**Evidence:**
- Packages are not public-facing
- Operator visibility through evidence and traces
- No public package visibility

### Arbitrary Execution

❌ **NOT arbitrary code execution**

ProviderFlow does not execute arbitrary JavaScript or runtime code.

**Evidence:**
- Deterministic YAML/DAG processing only
- No JavaScript execution
- No runtime code execution
- No plugins or extensions

### AI Routing

❌ **NOT AI routing**

ProviderFlow does not route events using AI.

**Evidence:**
- Events are routed according to contract definition
- No AI-based routing
- No machine learning-based routing

### Zen-cross

❌ **NOT Zen-cross**

ProviderFlow is not part of the Zen-cross initiative.

**Evidence:**
- ProviderFlow is a V1 internal framework
- No Zen-cross integration
- No Zen-cross deployment mechanism

### Multi-Protocol

❌ **NOT multi-protocol**

ProviderFlow supports provider-specific event types, not multiple protocols.

**Evidence:**
- Provider-specific event types
- Provider-specific contracts
- No multi-protocol support

### Production-Validated

❌ **NOT production-validated**

ProviderFlow packages are sandbox validated, not production-validated.

**Evidence:**
- Packages validated in sandbox environment
- Evidence collected in sandbox
- Prod revalidation pending

### NIRVANA

❌ **NOT NIRVANA**

ProviderFlow is not part of the NIRVANA initiative.

**Evidence:**
- ProviderFlow is V1 internal
- No NIRVANA integration
- No NIRVANA dependencies

---

## Status

### Current State

ProviderFlow packages are:

- ✅ **Sandbox validated**: Validated against fixtures and goldens
- ✅ **Internal/private**: Not part of public marketplace
- ⚠️ **Prod revalidation pending**: Production deployment requires controlled rollout and explicit approval

### Future State (Future V2)

Possible improvements (not current state):

- Potential for controlled production deployment
- Potential for package marketplace (future consideration)
- Potential for production monitoring

**Current:** Sandbox validation only
**Future:** Production deployment (future consideration, not current state)

---

## Operator Visibility

While packages are not public, operators have visibility through:

- ✅ **Evidence**: Validation evidence and traces
- ✅ **Traces**: Execution traces for debugging
- ✅ **Goldens**: Expected output for validation
- ✅ **Fixtures**: Input data for testing

---

## Related

- [Overview](./overview)
- [Package Contract](./package-contract)
- [Package Validation](./package-validation)

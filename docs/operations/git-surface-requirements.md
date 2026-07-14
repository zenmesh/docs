# Git Surface Requirements (Non-Normative)

**Status:** NOT_IMPLEMENTED
**Version:** v0.1 (non-normative proposal)

This document defines bounded requirements for a future Git-based declarative configuration surface. It is not an architecture decision, contract, or blueprint. Implementation requires separate architecture approval.

**No Git reconciliation surface exists today.** This document describes potential future capabilities that have not been designed, approved, or implemented.

## Scope

GitOps for Zen Mesh means managing Endpoint, Target, Flow, and Provider Pack configuration through a Git repository as the desired-state source. This document does not propose implementation.

## Requirements Questions

### Is Git intended as a desired-state authoring surface?

Yes — Git should be a declarative desired-state authoring surface alongside UI, CLI, API, and MCP. Git operations would write through the same application services as imperative surfaces, not bypass them.

### Which resources may be represented?

- Endpoint (ingress webhook receiver)
- Target (delivery destination)
- Flow (Endpoint-to-Target delivery contract)
- Provider Pack association
- Resource disable/enable state

### Which resources are forbidden?

- Secrets (API keys, signing secrets, certificates)
- Tenant-scoped credentials
- Plane enrollment tokens
- Runtime evidence (read-only, managed by system)

### How is tenant identity established?

Each Git repository or directory maps to a single tenant. Tenant identity is determined by the Git repository's registered association in the platform, not by file content or commit authorship.

### How is authorization evaluated?

Authorization is evaluated at apply time against the tenant-bound service identity associated with the Git integration. The service identity carries scoped permissions equivalent to an API key for the tenant.

### How are entitlements evaluated?

Entitlements (plan limits, feature gates) are evaluated at apply time by the same entitlement service used by UI/API/MCP. Git does not bypass plan enforcement.

### How is commit identity attributed?

Commits are attributed to the Git user who authored/pushed them. The Git integration associates a verified identity (GitHub user, GitLab user, etc.) with a platform identity.

### Are signed commits required?

Recommended for production use. Not required for evaluation/sandbox. The platform should verify commit signatures when configured.

### How are schemas validated?

YAML manifests are validated against the same JSON Schema used by the API. Validation occurs before preview and before apply. Invalid manifests produce structured errors with field-level detail.

### How are preview and diff generated?

A preview endpoint compares the declared desired state (from Git) against the current observed state. The diff is rendered as a structured change set showing added, modified, and removed resources.

### How is apply performed?

Apply is triggered by a pull-request merge or a webhook event. The platform reads the repository state at the applied commit, computes the diff from current observed state, and executes the changes through the same reconciliation service used by the API.

### How does reconciliation work?

The platform periodically reconciles desired state (from Git) against observed state. Divergence is reported as drift. Git-originated resources are tagged to distinguish them from UI/API/MCP-originated resources.

### How is drift reported?

Drift is reported through:
- The UI dashboard (desired vs observed state comparison)
- Webhook notifications
- Evidence records with drift assessment
- Status API endpoints

### What happens when UI/API/MCP and Git conflict?

The last-applied surface wins by default. Resources are tagged with their originating surface. A dry-run/preview step always warns about conflicting management surfaces. In v1.1, surface-level resource locking may be supported.

### What is the rollback model?

Rollback is performed by reverting the Git commit and reapplying. The platform does not support automatic Git revert. A rollback creates a new apply cycle from the reverted desired state.

### How does evidence reference a Git commit?

Evidence records reference:
- The Git commit SHA that triggered the apply
- The repository URL
- The file path within the repository
- The originating surface marker (git)

### How are secrets excluded?

Secrets must not be stored in Git. Secret references in YAML manifests point to pre-provisioned secrets in the platform by name or ID. The platform resolves secret references at apply time.

### What is proposed for v1.1?

- Git read-only (desired-state observability)
- Single repository per tenant
- Endpoint and Target YAML manifests
- Preview/diff via the API
- Pull-request triggered dry-run comments

### What remains post-v1.1?

- Git write (apply from Git)
- Flow YAML manifests
- Drift detection and reconciliation
- Multi-repository tenants
- Signed-commit enforcement
- Rollback automation
- Secret resource references

## Non-Claims

- Git surface is not available in v1.1. The above requirements require architecture approval, contract definition, blueprinting, and implementation.
- Git does not provide higher authorization than the API.
- Secret material must never be committed to Git.
- This document is non-normative and does not create any commitment to implement.
- No Git reconciliation surface exists today. Nothing in this document should be interpreted as a product roadmap or delivery commitment.

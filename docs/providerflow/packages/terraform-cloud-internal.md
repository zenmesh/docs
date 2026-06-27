---
sidebar_label: Terraform Cloud Internal
---

# Terraform Cloud Internal Package

**Ownership:** Community
**Maturity:** Preview
**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Infra
**Canonical Area:** Infrastructure-as-Code

## Overview

The Terraform Cloud internal package processes Terraform Cloud webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `terraform_plan`
- ✅ `terraform_apply`
- ✅ `terraform_run_cancelled`
- ✅ `terraform_run_failed`
- ✅ `terraform_run_success`
- ✅ `terraform_workspace_created`
- ✅ `terraform_workspace_destroyed`

## YAML/DAG Contract

```yaml
package:
  name: terraform-cloud-internal
  version: 1.0.0
  provider: terraform
  visibility: internal/private
  description: "Terraform Cloud webhook processing package for IaC"
  canonical_layer: infra
  canonical_area: infrastructure-as-code

endpoints:
  - name: terraform-webhook
    provider: terraform
    url: https://your-domain.com/webhooks/terraform
    auth: {type: bearer, token: {{TERRAFORM_TOKEN}}}
    events:
      - terraform_plan
      - terraform_apply
      - terraform_run_cancelled
      - terraform_run_failed
      - terraform_run_success
      - terraform_workspace_created
      - terraform_workspace_destroyed

targets:
  - name: infrastructure-logs
    provider: terraform
    url: https://api.terraform-logs.com/events
    auth: {type: bearer, token: {{INFRASTRUCTURE_LOGS_TOKEN}}}
    events:
      - terraform_plan
      - terraform_apply
      - terraform_run_cancelled
      - terraform_run_failed
      - terraform_run_success
      - terraform_workspace_created
      - terraform_workspace_destroyed

flows:
  - name: terraform-events
    provider: terraform
    endpoint: terraform-webhook
    target: infrastructure-logs
    events:
      - terraform_plan
      - terraform_apply
      - terraform_run_cancelled
      - terraform_run_failed
      - terraform_run_success
      - terraform_workspace_created
      - terraform_workspace_destroyed
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: bearer
  token: {{TERRAFORM_TOKEN}}
```

Uses Terraform Cloud API token for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{INFRASTRUCTURE_LOGS_TOKEN}}
```

Uses bearer token for infrastructure logs delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/terraform/terraform_plan.json`

```json
{
  "event": "terraform_plan",
  "workspace": "production",
  "status": "pending",
  "execution_id": "run-12345",
  "created_at": "2026-06-24T10:00:00Z"
}
```

## Goldens

Expected output data.

**Example:** `goldens/terraform/terraform_plan.json`

```json
{
  "destination": "infrastructure-logs",
  "event_type": "terraform_plan",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "event": "terraform_plan",
    "workspace": "production",
    "status": "pending",
    "execution_id": "run-12345",
    "processed_at": "2026-06-24T10:00:00Z"
  }
}
```

## Sandbox Validation State

✅ **Sandbox Validated**

- All event types validated
- Authentication boundaries verified
- Output format validated against goldens
- No errors or warnings

## Production Revalidation

⚠️ **Pending**

Full production deployment and validation requires:

1. Controlled deployment to production
2. Explicit approval from operators
3. Production evidence collection
4. Production validation against real data

## Real Webhook Runbook

Runbook not yet available for production validation.

## Known Nonclaims

- ❌ **NOT a public marketplace package**
- ❌ **NOT production-validated**
- ❌ **NOT part of a public package listing**
- ❌ **NOT Zen-cross**

## Usage

Validate the package:

```bash
zen package validate terraform-cloud-internal
```

Inspect the package:

```bash
zen package inspect terraform-cloud-internal
```

Get package evidence:

```bash
zen package evidence terraform-cloud-internal
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

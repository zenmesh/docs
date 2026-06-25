---
sidebar_label: GitLab Internal
---

# GitLab Internal Package

**Visibility:** Internal/Private
**Public Listing:** No
**Canonical Layer:** Data
**Canonical Area:** DevOps

## Overview

The GitLab internal package processes GitLab webhook events and delivers them to downstream systems. This is an **internal/private package for V1** and is not part of a public marketplace.

## Supported Event Types

- ✅ `repository.update`
- ✅ `merge_request.update`
- ✅ `merge_request.merge`
- ✅ `merge_request.open`
- ✅ `merge_request.close`
- ✅ `pipeline.success`
- ✅ `pipeline.failure`

## YAML/DAG Contract

```yaml
package:
  name: gitlab-internal
  version: 1.0.0
  provider: gitlab
  visibility: internal/private
  description: "GitLab webhook processing package for devops"
  canonical_layer: data
  canonical_area: devops

endpoints:
  - name: gitlab-webhook
    provider: gitlab
    url: https://your-domain.com/webhooks/gitlab
    auth: {type: bearer, token: {{GITLAB_TOKEN}}}
    events:
      - repository.update
      - merge_request.update
      - merge_request.merge
      - merge_request.open
      - merge_request.close
      - pipeline.success
      - pipeline.failure

targets:
  - name: gitops-logs
    provider: gitlab
    url: https://api.gitops-logs.com/events
    auth: {type: bearer, token: {{GITOPS_LOGS_TOKEN}}}
    events:
      - repository.update
      - merge_request.update
      - merge_request.merge
      - merge_request.open
      - merge_request.close
      - pipeline.success
      - pipeline.failure

flows:
  - name: gitlab-events
    provider: gitlab
    endpoint: gitlab-webhook
    target: gitops-logs
    events:
      - repository.update
      - merge_request.update
      - merge_request.merge
      - merge_request.open
      - merge_request.close
      - pipeline.success
      - pipeline.failure
```

## Authentication

### Endpoint Authentication

```yaml
auth:
  type: bearer
  token: {{GITLAB_TOKEN}}
```

Uses GitLab API token for webhook authentication.

### Target Authentication

```yaml
auth:
  type: bearer
  token: {{GITOPS_LOGS_TOKEN}}
```

Uses bearer token for gitops logs delivery.

## Fixtures

Test input data for validation.

**Example:** `fixtures/gitlab/pipeline/success.json`

```json
{
  "object_kind": "pipeline",
  "ref": "main",
  "status": "success",
  "build_id": 12345,
  "build_name": "main",
  "sha": "abc123",
  "created_at": "2026-06-24T10:00:00Z"
}
```

## Goldens

Expected output data.

**Example:** `goldens/gitlab/pipeline/success.json`

```json
{
  "destination": "gitops-logs",
  "event_type": "pipeline.success",
  "timestamp": "2026-06-24T10:00:00Z",
  "payload": {
    "object_kind": "pipeline",
    "ref": "main",
    "status": "success",
    "build_id": 12345,
    "build_name": "main",
    "sha": "abc123",
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
zen package validate gitlab-internal
```

Inspect the package:

```bash
zen package inspect gitlab-internal
```

Get package evidence:

```bash
zen package evidence gitlab-internal
```

## Related

- [ProviderFlow Overview](../overview)
- [Package Contract](../package-contract)
- [Package Validation](../package-validation)

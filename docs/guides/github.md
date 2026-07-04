---
sidebar_label: GitHub Integration
description: Receive and process GitHub webhook events through Zen Mesh — event types, webhook setup, signature verification, and secure delivery to private infrastructure.
---

# GitHub Integration

Receive GitHub webhook events securely in your private infrastructure.

## Overview

Zen Mesh ingests GitHub webhook events and delivers them to your internal services. GitHub sends event notifications for repository activity — pushes, pull requests, issues, workflow runs, and more — to Zen Mesh, which validates signatures and delivers to your configured destinations.

## Supported Event Types

GitHub sends events for all repository and organization activity:

| Category | Example Events |
|----------|---------------|
| **Code** | `push`, `pull_request`, `pull_request_review`, `create`, `delete` |
| **Issues** | `issues`, `issue_comment`, `label`, `milestone` |
| **Repositories** | `repository`, `fork`, `star`, `release`, `deployment` |
| **CI/CD** | `workflow_run`, `workflow_job`, `check_run`, `check_suite` |
| **Security** | `code_scanning_alert`, `dependabot_alert`, `secret_scanning_alert` |
| **Organization** | `member`, `team`, `organization`, `org_block` |
| **Projects** | `project`, `project_card`, `project_column` |
| **Wiki** | `gollum` (wiki pages) |
| **Packages** | `package`, `registry_package` |

## Setting Up Delivery

## 1. Create a Target

Create a target pointing to your internal service:

```
Name: github-ci-pipeline
URL: http://ci-svc:8080/webhooks/github
Cluster: prod-us-east
```

## 2. Configure the Delivery Flow

Set up a delivery flow that routes GitHub events to your destination. Use [JSONPath Routing](../delivery/jsonpath-routing) to filter by event type or repository:

```json
{
  "match": {
    "any": [
      { "jsonpath": "$.type", "exact": "push" },
      { "jsonpath": "$.type", "exact": "pull_request" }
    ]
  }
}
```

## 3. Configure GitHub Webhook

In your GitHub repository (or organization), go to **Settings → Webhooks → Add webhook**:

1. **Payload URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **Content type**: `application/json`
3. **Secret**: A shared secret for HMAC signature verification
4. **Events**: Select individual events or "Send me everything"
5. **SSL verification**: Enable (Zen Mesh supports TLS 1.3)

## 4. Signature Verification

GitHub signs webhook events using HMAC-SHA256 with a shared secret. Configure the secret in Zen Mesh:

1. Copy the secret you configured in GitHub
2. Configure it in the Zen Mesh dashboard under your source settings
3. Zen Mesh verifies the `X-Hub-Signature-256` header on each incoming event
4. Events with invalid or missing signatures are rejected

## Event Payload Structure

GitHub events follow a standard format:

```json
{
  "ref": "refs/heads/main",
  "repository": {
    "full_name": "myorg/myrepo",
    "html_url": "https://github.com/myorg/myrepo"
  },
  "pusher": { "name": "alice", "email": "alice@example.com" },
  "head_commit": { "id": "abc123", "message": "Fix bug" }
}
```

## JSONPath Transform Example

Use [JSONPath Transforms](../delivery/jsonpath-transforms) to normalize GitHub payloads:

```json
[
  { "target": "source_event", "source": "direct", "value": "github_push" },
  { "target": "repository", "source": "jsonpath", "expression": "$.repository.full_name" },
  { "target": "commit_sha", "source": "jsonpath", "expression": "$.head_commit.id" },
  { "target": "author", "source": "jsonpath", "expression": "$.pusher.name" }
]
```

## Related

- [Endpoints Guide](./endpoints) — endpoint configuration overview
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering and routing
- [JSONPath Transforms](../delivery/jsonpath-transforms) — payload normalization
- [Stripe Integration](./stripe) — similar setup for payment webhooks

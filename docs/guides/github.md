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

### 1. Create a Destination

Create a destination pointing to your internal service:

```
Name: github-ci-pipeline
URL: http://ci-svc:8080/webhooks/github
Cluster: prod-us-east
```

### 2. Configure the Delivery Flow

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

### 3. Configure GitHub Webhook

In your GitHub repository (or organization), go to **Settings → Webhooks → Add webhook**:

1. **Payload URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **Content type**: `application/json`
3. **Secret**: A shared secret for HMAC signature verification
4. **Events**: Select individual events or "Send me everything"
5. **SSL verification**: Enable (Zen Mesh supports TLS 1.3)

### 4. Signature Verification

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

## Test Event Flow

To verify your GitHub integration, send a test push event using curl:

```bash
curl -X POST https://ingest.zen-mesh.io/hooks/<your-hook-id> \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=test_signature_value" \
  -H "X-GitHub-Event: push" \
  -d '{
    "ref": "refs/heads/main",
    "repository": {
      "full_name": "myorg/myrepo",
      "html_url": "https://github.com/myorg/myrepo"
    },
    "pusher": {
      "name": "alice",
      "email": "alice@example.com"
    },
    "head_commit": {
      "id": "abc123def456",
      "message": "Update config",
      "committer": {
        "name": "Alice",
        "email": "alice@example.com"
      }
    }
  }'
```

Check delivery in the Zen Mesh dashboard under **Delivery Logs** — look for a `200` status and a successful delivery record. See [Send a Test Webhook](../getting-started/send-test-webhook) for more options.

## Payload, Log, and Evidence Visibility

| What | Visible To |
|------|------------|
| Delivery logs | Timestamps, HTTP status, destination URL (domain only), event type, label metadata |
| Evidence records | Delivery receipt, status code, label snapshots, optional payload if configured |
| Metadata (timestamps, status, labels) | Zen support by default |
| Raw payload content | Never stored in operational logs |
| Payload-level access | Requires explicit customer authorization per request |

Raw payload content is never written to operational logs. Payload inspection at the event level requires explicit authorization per request. See [Data Handling](../start-here/data-handling) and [Evidence Overview](../evidence/overview) for details.

## Labels and RBAC Recommendations

Apply labels to your GitHub source and delivery flow resources:

```yaml
labels:
  team: devops
  project: ci-pipeline
  environment: production
  service: github-webhook
```

Label filters use AND semantics — specifying `team=devops,environment=production` matches resources with both labels.

| Plan | Label Limit |
|------|-------------|
| Free | 5 labels per resource |
| Pro | 20 labels per resource |
| Business | 50 labels per resource (planned) |
| Enterprise | Custom |

RBAC and ABAC via label selectors are planned capabilities. The MCP can read and filter labels but cannot mutate them. See [Labels Platform](../guides/labels).

## Limits and Plan Notes

| Feature | Free | Pro |
|---------|------|-----|
| Endpoints | 3 | 50 |
| Events per month | 1,000 | 100,000 |
| Max payload size | 256 KB | 2 MB |
| JSONPath filters/transforms | — | Pro+ only |
| Evidence views/export | All plans | All plans |
| Fan-out | No | S3 fan-out planned/target |

**Over-limit behavior:** Free plans receive an HTTP 429 hard stop with an upgrade path. Pro plans receive warnings with overage and upgrade options.

See [Plans & Limits](../start-here/limits).

## Troubleshooting

**Signature verification failures**
- Ensure the HMAC secret matches the one configured in your GitHub webhook settings
- Check for clock skew between your systems — HMAC verification is time-sensitive
- Replayed events carry the same signature; Zen Mesh detects duplicates by delivery ID

**Delivery failures**
- Verify the destination URL is reachable from Zen Mesh
- Check TLS configuration on your destination endpoint
- Review the delivery logs for HTTP status codes

**Missing events**
- Confirm the event type is selected in the GitHub webhook configuration
- Check JSONPath routing filters — an overly restrictive filter may drop events
- Verify the webhook is marked as active in the GitHub repository settings

**Rate limiting**
- GitHub sends events individually; bursts are possible during large pushes or merges
- If you see 429 responses, contact Zen Mesh support

See [Delivery Failures](../delivery/delivery-failures) and [Operations Troubleshooting](../operations/troubleshooting).

## Launch Status

GitHub integration is supported at launch. HMAC verification, event routing, and private network delivery are available.

## See Also

- [Onboarding: Create Your First Source](../getting-started/create-first-source)
- [Onboarding: Send a Test Webhook](../getting-started/send-test-webhook)
- [Onboarding: Read Delivery Evidence](../getting-started/read-delivery-evidence)
- [Security Overview](../security/)
- [Data Handling](../start-here/data-handling)
- [Support](../start-here/support)
- [Pricing](https://zen-mesh.io/pricing)
- [Plans & Limits](../start-here/limits)

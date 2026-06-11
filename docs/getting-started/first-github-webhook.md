---
sidebar_label: First GitHub Webhook
description: Connect GitHub to Zen Mesh — configure a GitHub source, HMAC verification, and deliver push, PR, and issue events to your target.
---

# Your First GitHub Webhook

Connect GitHub to Zen Mesh and deliver push, pull request, issue, and workflow events to your internal services.

GitHub sends event notifications for repository and organization activity. Zen Mesh validates HMAC signatures at ingestion, routes events through your configured pipeline, and delivers them to your target.

**Status:** Available at launch.

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io) with a configured [source](./create-first-source)
- **Admin access** to the GitHub repository or organization you want to configure webhooks for
- A [target](./create-first-target) configured and reachable

## Step-by-Step

### 1. Create a GitHub Source

1. In the Zen Mesh dashboard, go to **Sources → Add Source**
2. Enter a name, for example `github-ci-webhooks`
3. Select **GitHub** as the provider type
4. Under **Verification**, configure HMAC secret verification:

   ```
   verification:
     method: "signature_based"
     secret: "your_hmac_secret"
     header: "X-Hub-Signature-256"
   ```

   The HMAC secret is a shared value you choose. Zen Mesh and GitHub both use it to sign and verify payloads. Use a randomly generated string (e.g. `openssl rand -hex 32`).

5. Save the source and copy the ingestion URL

   ```
   https://ingest.zen-mesh.io/hooks/hook_def789ghi012
   ```

### 2. Create a Target

1. Go to **Targets → Add Target**
2. Enter a name, for example `webhook-processor`
3. Enter the URL of your service that will process GitHub events
4. If the service is on a private network, select your connected cluster
5. Click **Save**

See [Create Your First Target](./create-first-target) for details.

### 3. Create a Route

1. Go to **Routes → Add Route**
2. Enter a name, for example `github-events-to-processor`
3. Select the GitHub source you created
4. Select the target you created
5. Optionally add filters for specific event types:

   ```yaml
   filters:
     event_types:
       - push
       - pull_request
       - issues
   ```

6. Click **Save** and toggle the route to **Active**

See [Create Your First Route](./create-first-route) for details.

### 4. Configure GitHub Webhook

1. In your GitHub repository, go to **Settings → Webhooks → Add webhook**
2. Paste your Zen Mesh ingestion URL as the **Payload URL**

   ```
   https://ingest.zen-mesh.io/hooks/hook_def789ghi012
   ```

3. Set **Content type** to `application/json`
4. Paste your HMAC secret into the **Secret** field
5. Choose which events to trigger the webhook:
   - **Just the `push` event** — minimal, good for testing
   - **Send me everything** — all event types
   - **Let me select individual events** — choose specific events (recommended for production)
6. Ensure **Active** is checked
7. Click **Add webhook**

### 5. Add Labels

Attach labels to organize your GitHub pipeline:

```
labels:
  team: devops
  project: ci-pipeline
```

Apply these to your source, target, and route. See [Use Labels](./use-labels).

## Test Your Integration

Push to your repository:

```bash
git commit --allow-empty -m "test github webhook"
git push
```

GitHub sends a `push` event to your Zen Mesh ingestion URL. Expect the event to appear in **Deliveries** within seconds.

## Verify Delivery

1. Go to **Deliveries** in the Zen Mesh dashboard
2. Find the push event by its `x-zen-event-id`
3. Confirm the status shows **delivered** with a 2xx response from your target
4. In GitHub, navigate to **Settings → Webhooks → your webhook** — the **Recent Deliveries** section should show a green checkmark

## Check the Evidence Record

1. Click the event in the Deliveries view to open the evidence record
2. Review:
   - **Ingestion timestamp** — when GitHub sent the event
   - **Delivery attempts** — per-attempt status codes and latency
   - **Payload hash** — SHA-256 of the original GitHub payload for integrity checks
   - **Labels** — inherited from your source and route

See [Read Delivery Evidence](./read-delivery-evidence) for details.

## Troubleshooting

| Problem | Likely Cause |
|---------|--------------|
| GitHub shows **500** in Recent Deliveries | Ingestion URL is incorrect or the source is paused — check your Zen Mesh source status |
| GitHub shows **401** in Recent Deliveries | HMAC secret mismatch — verify the secret in GitHub matches the one in your Zen Mesh source |
| Events not appearing in Deliveries | Route is paused or inactive — check the route status in Zen Mesh |
| `push` events arrive but `pull_request` do not | Route filters exclude pull_request events — review your filter config |
| GitHub reports **302** redirect | Ensure the ingestion URL is entered exactly (no trailing characters) |
| Webhook shows **504** timeout | Target may be slow to respond — check your target application health |
| **Recent Delivery** shows dropped or missing events | GitHub does not retry on non-2xx after a timeout window — check your target availability |

**HMAC verification notes:** Zen Mesh expects the `X-Hub-Signature-256` header as sent by GitHub. If you have a proxy or CDN in front of Zen Mesh that modifies headers, HMAC verification may fail. Ensure the signature header passes through unchanged.

## Relevant Limits

- **Free plan**: 1,000 events/month, 3 sources, 3 routes
- **Pro plan**: 100,000 events/month, 50 sources, 50 routes
- GitHub's own webhook rate limits also apply — GitHub may drop webhooks if your endpoint is consistently slow or unavailable

See [Plans & Limits](../start-here/limits) for the full breakdown.

## See Also

- [GitHub Integration Guide](../guides/github) — full reference, event catalog, and advanced configuration
- [Send a Test Webhook](./send-test-webhook)
- [Read Delivery Evidence](./read-delivery-evidence)
- [Plans & Limits](../start-here/limits)
- [Support](../start-here/support)

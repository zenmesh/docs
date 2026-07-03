---
id: api-recipes-create-webhook-endpoint
---

# Create Webhook Endpoint

Learn how to configure webhook endpoints for integration with external services.

## What This Recipe Does

This recipe explains webhook endpoint configuration for Zen Mesh integrations.

## Important Notes

> **Webhook endpoints are pre-configured integrations**, not user-created endpoints.

You can configure the following pre-built integrations:

- Slack
- ServiceNow
- Jira
- Datadog
- PagerDuty

## List Available Integrations

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   "$ZEN_API_BASE/integrations"
```

**Example Response**:

```json
{
  "integrations": [
    {
      "id": "slack",
      "name": "Slack",
      "enabled": true
    },
    {
      "id": "servicenow",
      "name": "ServiceNow",
      "enabled": false
    }
  ]
}
```

## Webhook Configuration

### Slack Webhook

For Slack integrations, configure your Slack webhook URL in the Zen Mesh UI:

1. Navigate to your plane's settings in the Zen Mesh UI
2. Go to Integrations → Slack
3. Paste your Slack webhook URL

### Jira Webhook

For Jira integrations, configure your Jira webhook URL:

1. Navigate to plane settings in the Zen Mesh UI
2. Go to Integrations → Jira
3. Paste your Jira webhook URL

### ServiceNow Webhook

For ServiceNow integrations, configure your ServiceNow webhook URL:

1. Navigate to plane settings in the Zen Mesh UI
2. Go to Integrations → ServiceNow
3. Paste your ServiceNow webhook URL

## API Endpoints

Zen Mesh provides webhook endpoints for each integration:

- POST `/webhooks/slack`
- POST `/webhooks/servicenow`
- POST `/webhooks/jira`
- POST `/webhooks/datadog`
- POST `/webhooks/pagerduty`

These endpoints are used by Zen Mesh to send notifications to your configured integrations.

## Common Errors

- **404 Not Found**: The integration endpoint does not exist
- **400 Bad Request**: Invalid webhook configuration

## Next Steps

- [List Planes](../list-planes-and-adapters)
- [Create a Target](../create-target)
- [Create a Flow](../create-flow)

---

**Full API Reference**: [API Overview](/docs/api/overview)

**More Information**: [Authentication](../../authentication) | [Common Errors](../../errors)

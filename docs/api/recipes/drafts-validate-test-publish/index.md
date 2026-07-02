---
id: api-recipes-drafts-validate-test-publish
---

# Validate, Test, and Publish a Draft

Learn how to validate and test flows using the Zen Mesh UI workflow.

## What This Recipe Does

This recipe covers the UI-based workflow for:

1. Validating flow configurations
2. Testing flows with sample data
3. Publishing flows for production use

## Important Note

> **Public API for Drafts**: The current Zen Mesh public API does not include endpoints for creating, validating, or publishing drafts programmatically. These operations are performed through the Zen Mesh UI.

## Create a Flow

Before you can validate or publish a flow, you must create it first.

See [Create a Flow]() for instructions on creating a flow using the API.

## Validating a Flow

### In the UI

1. Navigate to your plane's delivery flows in the Zen Mesh UI
2. Click on the flow you want to validate
3. Click **Validate** in the flow details

The system will:

- Check for configuration errors
- Validate against schema constraints
- Test connection to the destination
- Report any issues

### Common Validation Errors

- **Invalid configuration**: Check that required fields are present and correctly formatted
- **Connection failed**: Verify the destination is reachable and properly configured
- **Schema violation**: Ensure the configuration matches the destination schema

## Testing a Flow

### In the UI

1. Navigate to your plane's delivery flows
2. Click on the flow you want to test
3. Click **Test** in the flow details

The system will:

- Send a test payload to the source
- Forward the payload through the flow
- Verify it reaches the destination
- Report success or failures

### Testing with curl

You can also test your flow using curl:

```bash
curl -sS   -H "Authorization: Bearer $ZEN_API_TOKEN"   -H "Content-Type: application/json"   "$ZEN_API_BASE/tenants/$ZEN_TENANT_ID/clusters/$ZEN_PLANE_ID/delivery-flows/$FLOW_ID/test"
```

## Publishing a Flow

### In the UI

1. Navigate to your plane's delivery flows
2. Click on the flow you want to publish
3. Click **Publish** in the flow details

The system will:

- Validate the flow configuration
- Perform final checks
- Activate the flow for production use
- Enable automatic delivery

### Publishing Prerequisites

- Flow must pass validation
- All required destinations must be configured
- No critical errors or warnings

## Versioning

When you publish a flow, it becomes a new version. The previous version remains available for rollback if needed.

## Common Errors

- **404 Not Found**: The flow ID does not exist
- **400 Bad Request**: Invalid flow configuration
- **409 Conflict**: Cannot publish while another version is being updated

## Next Steps

- [Create a Flow]()
- [Inspect Flows]()
- [Troubleshooting](../../errors)

---

**Full API Reference**: [API Overview](/docs/api/overview)

**More Information**: [Authentication](../../authentication) | [Common Errors](../../errors)

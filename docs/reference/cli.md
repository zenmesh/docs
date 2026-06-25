---
sidebar_label: CLI
---

# CLI Reference

The Zen Mesh CLI provides command-line access to platform operations. Most configuration operations are also available through the dashboard and API.

## Prerequisites

- Zen Mesh CLI tool installed
- API key with appropriate scope (see [Authentication](../api/authentication))

## General Flags

### Safe Confirmation

Many commands that perform destructive operations require explicit confirmation. Use `--yes` to skip confirmation prompts and proceed with the operation:

```bash
# Skip confirmation and apply draft immediately
zen draft apply --yes

# Skip confirmation and delete target
zen target delete --yes
```

**Warning:** The `--yes` flag disables all safety prompts. Only use it in automated pipelines or when you are certain the operation is safe.

### Output Formats

Commands support JSON and table output:

```bash
# JSON output
zen draft list --output=json

# Table output (default)
zen draft list --output=table
```

### Exit Codes

Commands return exit codes to indicate success/failure:

- `0`: Success
- `1`: General error
- `2`: Authentication error
- `3`: Validation error
- `4`: Authorization error

## Authentication

### API Key Configuration

Set your API key via environment variable:

```bash
export ZEN_API_KEY=your-api-key
```

### Set Tenant and Endpoint

Configure tenant and endpoint:

```bash
export ZEN_TENANT_ID=your-tenant-id
export ZEN_ENDPOINT=https://api.zen-mesh.io
```

### Authentication Status

Check your current authentication state:

```bash
zen auth status
```

Output includes:
- API key status
- Tenant ID
- API endpoint
- Session expiration

### Authentication Scopes

Authentication is scoped to tenant/workspace. Ensure your API key has appropriate permissions for the operation you're performing.

## Configuration

Manage configuration values:

```bash
# Show current configuration
zen config show

# Set configuration values
zen config set key=value
```

Configuration values are stored locally and are separate from API keys.

## Version Information

Check your CLI version:

```bash
zen version
```

## Commands

---

## `zen draft`

Manage drafts, which are pending changes that have not yet been committed to the platform. Drafts represent pending changes in the cross-object inbox.

### List Drafts

```bash
# List all drafts
zen draft list

# List drafts with filtering
zen draft list --status pending --output=table
```

### Get Draft Details

```bash
zen draft get <draft-id>
```

Output includes draft status, changes, and validation results.

### Validate Draft

```bash
zen draft validate <draft-id>
```

Validates the draft without applying it. Returns exit code 0 if valid, non-zero otherwise.

### Diff Draft

```bash
zen draft diff <draft-id>
```

Shows the differences between the draft and the current state.

### Apply Draft

```bash
zen draft apply <draft-id>
```

Applies the draft to the platform. Requires explicit confirmation unless `--yes` is used.

```bash
# Apply with confirmation
zen draft apply <draft-id>

# Apply without confirmation (use with caution)
zen draft apply --yes <draft-id>
```

**Warning:** Applying a draft commits changes to the platform. Use `zen draft diff` first to verify changes.

### Schedule Draft

Schedule a draft for later application:

```bash
zen draft schedule <draft-id> --time="2026-06-24T10:00:00Z"
```

### Cancel Scheduled Draft

Cancel a scheduled draft:

```bash
zen draft cancel <draft-id>
```

### Get Draft Evidence

Retrieve evidence for a draft:

```bash
zen draft evidence <draft-id>
```

Evidence includes validation results, fixture comparisons, and golden file differences.

### Batch Operations

```bash
# Validate multiple drafts
zen draft batch validate <draft-id-1> <draft-id-2> ...

# Apply selected drafts
zen draft batch apply-selected --yes
```

---

## `zen endpoint`

Manage endpoints, which are the canonical inbound webhook sources for ProviderFlow packages.

### List Endpoints

```bash
# List all endpoints
zen endpoint list

# List endpoints by provider
zen endpoint list --provider=stripe
```

### Get Endpoint Details

```bash
zen endpoint get <endpoint-id>
```

Output includes:
- Endpoint name
- Provider
- URL
- Status
- Last webhook received
- Validation status

### Validate Endpoint

```bash
zen endpoint validate <endpoint-id>
```

Validates the endpoint configuration. Returns exit code 0 if valid.

### Diff Endpoint

```bash
zen endpoint diff <endpoint-id>
```

Shows differences between the current endpoint configuration and the package's expected configuration.

### Apply Endpoint

```bash
zen endpoint apply <endpoint-id>
```

Applies the endpoint configuration to the platform.

### Create Endpoint

```bash
zen endpoint create --name payment-webhook --provider stripe --url https://your-domain.com/webhooks/stripe
```

**Note:** Endpoints are created as part of package installation. Use this command for manual endpoint configuration.

### Get Endpoint Evidence

```bash
zen endpoint evidence <endpoint-id>
```

Evidence includes webhook delivery statistics, validation results, and fixture comparisons.

---

## `zen target`

Manage targets, which are the canonical outbound delivery destinations for ProviderFlow packages.

### List Targets

```bash
# List all targets
zen target list

# List targets by provider
zen target list --provider=stripe
```

### Get Target Details

```bash
zen target get <target-id>
```

Output includes:
- Target name
- Provider
- URL
- Status
- Last delivery
- Success rate

### Validate Target

```bash
zen target validate <target-id>
```

Validates the target configuration.

### Diff Target

```bash
zen target diff <target-id>
```

Shows differences between the current target configuration and the package's expected configuration.

### Apply Target

```bash
zen target apply <target-id>
```

Applies the target configuration to the platform.

### Delete Target

```bash
zen target delete <target-id>
```

**Warning:** Deleting a target removes all associated delivery configurations. Use `--yes` to skip confirmation.

### Get Target Evidence

```bash
zen target evidence <target-id>
```

Evidence includes delivery statistics, validation results, and fixture comparisons.

---

## `zen flow`

Manage flows, which are the canonical virtual connections between endpoints and targets for ProviderFlow packages.

### List Flows

```bash
# List all flows
zen flow list

# List flows by provider
zen flow list --provider=stripe
```

### Get Flow Details

```bash
zen flow get <flow-id>
```

Output includes:
- Flow name
- Provider
- Status
- Endpoint configuration
- Target configuration
- Last delivery

### Validate Flow

```bash
zen flow validate <flow-id>
```

Validates the flow configuration.

### Diff Flow

```bash
zen flow diff <flow-id>
```

Shows differences between the current flow configuration and the package's expected configuration.

### Apply Flow

```bash
zen flow apply <flow-id>
```

Applies the flow configuration to the platform.

### Get Flow Evidence

```bash
zen flow evidence <flow-id>
```

Evidence includes delivery statistics, validation results, and fixture comparisons.

---

## `zen package`

Validate and inspect ProviderFlow packages. Packages are internal/private for V1 and are not part of a public marketplace.

### Validate Package

```bash
zen package validate <package-path>
```

Validates a package's YAML/DAG contract and fixture/golden/trace files.

**Exit codes:**
- `0`: Package is valid
- `1`: Package has validation errors
- `2`: Package file not found
- `3`: Package validation failed

### Test Package

```bash
zen package test <package-path>
```

Tests the package with real webhook payloads. Returns exit code 0 if all tests pass.

### Inspect Package

```bash
zen package inspect <package-path>
```

Displays package metadata:
- Package name and version
- Package type (provider)
- Package visibility (internal/private)
- Validation status
- Dependencies

### Trace Package

```bash
zen package trace <package-path> --duration=1h
```

Traces webhook deliveries through the package and generates a detailed report.

### Get Package Evidence

```bash
zen package evidence <package-path>
```

Returns validation evidence:
- Fixture comparison results
- Golden file differences
- Trace data
- Delivery statistics

### Scan Package

```bash
zen package scan <package-path>
```

Scans the package for potential issues:
- YAML syntax errors
- Security issues
- Validation failures
- Missing required files

---

## `zen enroll`

Generate an enrollment bundle for a cluster.

```bash
zen enroll --cluster my-cluster --endpoint https://api.zen-mesh.io
```

**Flags:**
- `--cluster`: Cluster name (required)
- `--endpoint`: API endpoint URL (required)
- `--environment`: Environment scope (optional, default: sandbox)

**Output:** Creates an enrollment bundle file with the necessary configuration and credentials.

---

## `zen status`

Check the enrollment and delivery status of your environment.

```bash
zen status
```

Output includes:
- Cluster health
- Endpoint status
- Target status
- Recent delivery statistics
- Package validation status

---

## `zen help`

Show help for any command.

```bash
# Show general help
zen help

# Show help for a specific command
zen help draft
zen help endpoint
zen help target
zen help flow
zen help package
```

---

## Security Considerations

### Secret Redaction

API keys and secrets are automatically redacted from command output. Sensitive information is never logged to stdout.

### Authorization

Some operations require explicit authorization. Always verify you have appropriate permissions before applying changes.

### Tenant/Workspace Scopes

All operations are scoped to your tenant/workspace. Ensure you're operating in the correct tenant before making changes.

### Safe Confirmation

Always use `zen draft diff`, `zen endpoint diff`, `zen target diff`, and `zen flow diff` before applying changes. The `--yes` flag disables all safety prompts.

---

## Related

- [API Reference](../api/overview) — REST API documentation
- [Authentication](../api/authentication) — API key management
- [Delivery Status Reference](./delivery-status) — delivery state machine and troubleshooting
- [ProviderFlow Overview](../providerflow/overview) — ProviderFlow documentation
- [Runbooks](../runbooks) — Operational runbooks

---

## Legacy Commands

The following commands are deprecated and will be removed in a future version:

- ~~`zen-mesh sources`~~ → Use `zen endpoint` instead
- ~~`zen-mesh destinations`~~ → Use `zen target` instead
- ~~`zen-mesh replay`~~ → Use `zen draft` instead
- ~~`zen-mesh deliveries`~~ → Use `zen flow` instead

Legacy commands are still functional but should not be used in new deployments.

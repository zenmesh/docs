---
sidebar_label: Inconsistent State Recovery
---

# Inconsistent State Recovery Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P1

## Objective

Detect and remediate divergences between desired state and observed state for Edge Plane and Edge Lite configurations.

## Important Limitation

**Automatic convergence is NOT_SUPPORTED in v1.1.** The system does not automatically reconcile when desired state and observed state diverge. The recommended approach is to reapply the desired configuration. Operators must manually detect and resolve state inconsistencies.

## Symptoms

- Dashboard shows configuration drift warning or flag
- Desired state (from enrollment bundle or config) differs from observed state in agent status
- Configuration apply command succeeded but changes are not reflected in behavior
- Partial update visible — some settings applied, others not
- Concurrent modification errors in agent logs
- Reconciliation endpoint returns errors or remains permanently pending
- Event routing or delivery behavior inconsistent with configured rules

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `STATE_APPLY_NOT_COMPLETED` | Configuration apply was interrupted or did not reach a terminal state |
| `STATE_PARTIAL_UPDATE` | Only a subset of configuration changes were applied successfully |
| `STATE_CONCURRENT_MODIFICATION` | Two configuration changes were applied simultaneously, causing conflict |
| `STATE_RECONCILIATION_FAILED` | Reconciliation process encountered an error and could not complete |
| `STATE_VERSION_SKEW` | Configuration version in the agent differs from the control plane's expected version |
| `STATE_DRIFT_DETECTED` | Observed state changed outside of a configuration apply (manual modification or external factor) |

## Safe Checks

1. Compare desired state vs. observed state:
   - Retrieve desired configuration: Check enrollment bundle or dashboard configuration
   - Retrieve observed state: Check agent status endpoint or logs
2. Check the configuration version number on both the control plane and agent
3. Review agent logs for apply or reconciliation errors:
   - Kubernetes: `kubectl logs -n zen-mesh -l app=zen-agent --tail=100`
   - Edge Lite: `docker logs zen-agent --tail=100`
4. Verify there are no concurrent configuration change operations in progress
5. Confirm the agent is connected and heartbeating normally
6. Check for external modifications to configuration sources (e.g., direct edits to ConfigMaps or Helm values outside of the apply workflow)

## Evidence to Collect

- Desired state configuration (from enrollment bundle or control plane API)
- Observed state report from the agent
- Configuration version numbers (desired vs. observed)
- Agent logs covering the apply window (last 200 lines)
- Concurrent operation timestamps from audit logs
- Reconciliation attempt history with error messages
- Any manual changes made outside of the apply workflow

## Corrective Actions

1. **Apply not completed** — Reapply the desired configuration:
   - Re-upload the enrollment bundle or re-run the configuration apply command
   - Verify the apply completes with exit code 0
   - Check agent logs for successful configuration load
2. **Partial update** — Identify which settings were not applied. Reapply only the missing settings. If the apply mechanism is atomic, reapply the full configuration.
3. **Concurrent modification** — Coordinate with other operators to avoid overlapping applies. Reapply the configuration after the conflicting operation completes. Use a serialization mechanism (e.g., a change request ticket) to prevent concurrent applies.
4. **Reconciliation failure** — Review reconciliation error logs. Fix the underlying cause (e.g., invalid configuration value, network issue during reconciliation). Trigger a fresh reconciliation by reapplying the configuration.
5. **Version skew** — Ensure the agent is running a version compatible with the control plane. If the agent is outdated, upgrade it. If the configuration version is newer than the agent supports, downgrade the configuration or upgrade the agent.
6. **Drift detected** — Determine the source of the drift (external modification, failed apply, automation conflict). Reapply the desired state. Implement controls to prevent manual modifications outside the apply workflow.

## Retry Conditions

- Configuration apply command is available and verified correct
- Concurrent modification operations have been coordinated or completed
- Agent is running and connected to the control plane
- Underlying cause of reconciliation failure (if any) has been addressed
- Version compatibility confirmed between agent and control plane

## Stop Conditions

- Desired state matches observed state for all configuration parameters
- Configuration version numbers are aligned between control plane and agent
- No reconciliation errors in logs for 5 consecutive minutes
- Drift identified as a one-time event requiring no further action (e.g., authorized maintenance window change)
- Error identified as a permanent limitation of the current version (document as known limitation)

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Manually editing agent configuration files to force state alignment**
- **Disabling state comparison checks to suppress drift warnings**
- **Applying configuration simultaneously from multiple sources without coordination**

## Escalation

If state divergence persists after corrective actions, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include: desired vs. observed state diff, configuration version numbers, agent logs, concurrent operation audit trail, and reconciliation attempt history.

## Recovery Verification

1. Configuration apply completes successfully with exit code 0
2. Desired state matches observed state:
   ```bash
   # Compare desired configuration with agent status output
   ```
3. Agent logs confirm successful configuration load:
   ```
   INFO Configuration applied successfully
   INFO State reconciled
   ```
4. Dashboard no longer shows configuration drift
5. Event routing and delivery behavior matches the expected configuration
6. No reconciliation errors in logs for 5 consecutive minutes

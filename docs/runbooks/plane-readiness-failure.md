---
sidebar_label: Plane Readiness Failure
---

# Plane Readiness Failure Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P1

## Objective

Resolve Edge Plane or Edge Lite node readiness check failures to restore connectivity and delivery capability.

## Symptoms

- Dashboard shows plane status as `Unhealthy` or `Not Ready`
- Readiness probe fails for `zen-agent` or other components
- Heartbeat missing for longer than the expected interval
- Agent logs show readiness check failures
- Delivery events fail with `plane_not_ready` error
- Kubernetes pod shows `CrashLoopBackOff` or `Error` state

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `READINESS_CONNECTIVITY_LOST` | Edge plane cannot reach control plane or data plane |
| `READINESS_IDENTITY_FAILURE` | Identity verification (mTLS or HMAC) failed during check |
| `READINESS_COMPONENT_DOWN` | Required component (zen-agent, zen-ingester, zen-egress) not running |
| `READINESS_VERSION_MISMATCH` | Agent version does not match the expected control plane version |
| `READINESS_HEARTBEAT_MISSED` | Heartbeat interval exceeded without successful check-in |
| `READINESS_RESOURCE_EXHAUSTED` | Out of memory, disk, or file descriptors |

## Safe Checks

1. Verify component status:
   - Kubernetes: `kubectl get pods -n zen-mesh`
   - Edge Lite: `docker ps --filter name=zen`
2. Check recent agent logs for readiness probe failures:
   - Kubernetes: `kubectl logs -n zen-mesh -l app=zen-agent --tail=50`
   - Edge Lite: `docker logs zen-agent --tail=50`
3. Confirm outbound connectivity from the plane to `api.zen-mesh.io`:
   ```bash
   curl -v https://api.zen-mesh.io/health
   ```
4. Verify mTLS certificates are not expired:
   ```bash
   openssl s_client -connect api.zen-mesh.io:443 -showcerts 2>&1 | openssl x509 -noout -dates
   ```
5. Check system resources:
   ```bash
   free -h && df -h && ulimit -n
   ```
6. Compare agent version against expected control plane version:
   ```bash
   kubectl get pods -n zen-mesh -l app=zen-agent -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}'
   ```

## Evidence to Collect

- Kubernetes pod status and events:
  ```bash
  kubectl describe pods -n zen-mesh -l app=zen-agent
  kubectl get events -n zen-mesh --sort-by=.lastTimestamp
  ```
- Agent logs (last 200 lines)
- Connectivity trace to control plane and data plane endpoints
- Certificate expiry report
- System resource snapshot (memory, disk, inodes, file descriptors)
- Heartbeat timestamps from agent logs
- Version information for all plane components

## Corrective Actions

1. **Connectivity lost** — Verify firewall, proxy, and DNS resolution. Ensure outbound HTTPS on port 443 is permitted. Restart the agent after network restoration.
2. **Identity verification failure** — Check mTLS certificate validity. Regenerate enrollment bundle if certificate is expired or revoked. Verify trust bundle is current.
3. **Component not running** — Restart the failed component:
   - Kubernetes: `kubectl rollout restart -n zen-mesh deployment/zen-agent`
   - Edge Lite: `docker restart zen-agent`
   - Review component logs to determine why it stopped.
4. **Version mismatch** — Upgrade the plane agent to match the control plane version. Follow the upgrade procedure for the platform:
   - Kubernetes: Update Helm chart values
   - Edge Lite: Re-run the installer with the updated binary
5. **Heartbeat missed** — If the agent is running but not heartbeating, check for clock skew. Restart the agent. Verify the heartbeat endpoint is reachable.
6. **Resource exhausted** — Increase resource limits:
   - Kubernetes: Update Helm values for agent/egress/ingester memory and CPU
   - Edge Lite: Increase Docker container memory limit: `docker update zen-agent --memory=<new-limit>`

## Retry Conditions

- Network connectivity restored and confirmed
- Component restarted and status shows `Running`
- Agent version matches control plane version
- Certificates confirmed valid
- System resources are within limits
- Clock skew resolved (NTP synchronized within 5 seconds)

## Stop Conditions

- Readiness check passes and dashboard shows `Healthy`
- All components report `Running` for 5 consecutive minutes
- Heartbeat interval is within expected range
- Persistent failure requiring platform-level fix identified
- Error determined to be a permanent incompatibility

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Manually patching component readiness probes without authorization**
- **Downgrading the agent version to bypass compatibility checks**

## Escalation

If readiness failures persist after corrective actions, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include: pod/container status dump, agent logs, network trace, certificate status, and version information.

## Recovery Verification

1. Readiness check passes:
   ```bash
   kubectl wait --for=condition=Ready pods -n zen-mesh -l app=zen-agent --timeout=60s
   ```
2. Dashboard shows `Healthy` status for the plane
3. Agent heartbeat visible within the last 60 seconds
4. No readiness probe failure entries in logs for 5 minutes
5. Test event delivery succeeds (if applicable)

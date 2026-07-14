---
sidebar_label: Edge Plane Enrollment Failure
---

# Edge Plane Enrollment Failure Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P1

## Objective

Resolve Edge Plane enrollment failures for both Kubernetes Edge Plane and Edge Lite deployments.

## Symptoms

- Agent shows `Not Connected` or `Enrollment Failed` status in dashboard
- Enrollment bundle rejected by control plane
- mTLS handshake failure during enrollment
- Agent logs contain enrollment-related errors
- `zenctl enroll` or equivalent command exits with non-zero

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `ENROLL_TOKEN_EXPIRED` | Enrollment bundle expired (valid for 30 minutes after generation) |
| `ENROLL_NETWORK_UNREACHABLE` | Agent cannot reach `api.zen-mesh.io:443` |
| `ENROLL_IDENTITY_CONFLICT` | Node ID already enrolled under a different tenant |
| `ENROLL_ALREADY_REGISTERED` | Node is already enrolled and active |
| `ENROLL_MTLS_FAILURE` | mTLS certificate or trust bundle mismatch |
| `ENROLL_BUNDLE_INVALID` | Bundle content malformed or tampered |

## Safe Checks

1. Verify the enrollment bundle generation timestamp:
   ```bash
   # Inspect bundle metadata
   ```
2. Confirm outbound HTTPS to `api.zen-mesh.io`:
   ```bash
   curl -v https://api.zen-mesh.io/health
   ```
3. Check if the node already appears in the dashboard under the same tenant
4. Verify agent logs for specific error messages:
   - Kubernetes: `kubectl logs -n zen-mesh -l app=zen-agent --tail=50`
   - Edge Lite: `docker logs zen-agent --tail=50`
5. Confirm system clock is synchronized (NTP):
   ```bash
   timedatectl show --property=NTPSynchronized
   ```

## Evidence to Collect

- Enrollment bundle contents (redact sensitive fields)
- Agent logs with timestamps (last 100 lines)
- Network connectivity trace:
  ```bash
  curl -v https://api.zen-mesh.io/health 2>&1
  ```
- mTLS certificate details:
  ```bash
  openssl s_client -connect api.zen-mesh.io:443 -showcerts 2>&1
  ```
- Dashboard enrollment status and error message
- Bundle expiry timestamp vs. attempted enrollment time

## Corrective Actions

1. **Token expired** — Generate a new enrollment bundle from the dashboard. Bundles expire after 30 minutes. Re-run enrollment with the fresh bundle.
2. **Network unreachable** — Verify firewall and proxy settings allow outbound HTTPS to `api.zen-mesh.io:443`. Check DNS resolution.
3. **Identity conflict** — If the node ID is already enrolled under another tenant, deregister the old enrollment from the dashboard first, or generate a new bundle with a unique node identifier.
4. **Already enrolled** — No action needed. Verify the node is healthy in the dashboard. If re-enrollment is required, deregister first.
5. **mTLS failure** — Verify trust bundle is current. Check `zen-lock` status on the control plane. Regenerate enrollment bundle.
6. **Bundle invalid** — Re-download the enrollment bundle from the dashboard. Verify integrity checksum.

## Retry Conditions

- New enrollment bundle generated
- Network connectivity confirmed to `api.zen-mesh.io`
- Identity conflict resolved (old enrollment deregistered)
- System clock synchronized within 5 minutes of NTP time
- Trust bundle verified or refreshed

## Stop Conditions

- Enrollment confirmed successful in dashboard
- Error persists after three distinct corrective actions
- Error indicates tenant-level misconfiguration requiring support intervention
- Security-related error (suspected bundle tampering)

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Manually editing enrollment bundle contents**
- **Reusing an enrollment bundle across different nodes**

## Escalation

If enrollment continues to fail after all corrective actions, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include: agent logs, enrollment bundle metadata (no secrets), safe check results, and dashboard error screenshot.

## Recovery Verification

1. Enrollment command exits with code 0
2. Agent status shows `Connected` in the dashboard
3. Agent heartbeat timestamp is recent (within last 60 seconds)
4. Event delivery test succeeds (if applicable)
5. Agent logs show successful enrollment confirmation:
   ```
   INFO Enrollment successful
   INFO mTLS connection established
   ```

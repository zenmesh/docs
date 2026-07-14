---
sidebar_label: Edge Lite Install Failure
---

# Edge Lite Install Failure Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P1

## Objective

Resolve Edge Lite installation failures on Docker-based single-node deployments.

## Symptoms

- Installation script exits with non-zero status
- `curl` error during installer download
- `systemctl` shows `zen-agent` service in failed state
- `Permission denied` errors in install output
- Binary fails to execute (incorrect architecture or OS)
- Port conflict or existing installation detected
- `docker run` fails to start the container

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `INSTALL_CURL_FAILURE` | curl could not reach the installer URL or was interrupted |
| `INSTALL_PERMISSION_DENIED` | Running installer without sufficient privileges |
| `INSTALL_BINARY_INCOMPATIBLE` | Binary architecture does not match host (e.g., arm64 binary on x86) |
| `INSTALL_SYSTEMD_FAILURE` | systemd unit failed to start or enable |
| `INSTALL_CONFLICT` | Existing Edge Lite or Edge Plane installation detected |
| `INSTALL_DOCKER_FAILURE` | Docker daemon not running or container failed to start |

## Safe Checks

1. Confirm Docker is installed and the daemon is running:
   ```bash
   docker info
   ```
2. Verify the host architecture matches the downloaded binary:
   ```bash
   uname -m
   ```
3. Check if an existing Edge Lite container or Edge Plane is already running:
   ```bash
   docker ps -a --filter name=zen
   ```
4. Verify outbound HTTPS access to `api.zen-mesh.io`:
   ```bash
   curl -v https://api.zen-mesh.io/health
   ```
5. Confirm the installation user has sufficient privileges:
   ```bash
   id
   ```

## Evidence to Collect

- Installer exit code and full output
- Docker daemon logs: `journalctl -u docker --tail=50`
- systemd unit status: `systemctl status zen-agent`
- Host architecture and OS version: `uname -a`
- `/tmp/zen-mesh-install.log` (if present)
- Container logs if container started but failed:
  ```bash
  docker logs zen-agent --tail=50
  ```

## Corrective Actions

1. **Curl errors** — Verify network connectivity and firewall rules. Re-run installer with `curl -fsSL` flags.
2. **Permission denied** — Re-run the installer with `sudo` or as root. Ensure `/usr/local/bin` is writable.
3. **Binary incompatibility** — Download the correct binary for the host architecture. Supported: `linux/amd64`, `linux/arm64`.
4. **Systemd failure** — Review unit file in `/etc/systemd/system/zen-agent.service`. Run `systemctl daemon-reload && systemctl restart zen-agent`.
5. **Existing installation conflict** — Stop and remove existing containers before retrying:
   ```bash
   docker stop zen-agent && docker rm zen-agent
   ```
6. **Docker failure** — Restart Docker daemon: `sudo systemctl restart docker`. Verify resource limits are sufficient.

## Retry Conditions

- Curl error resolved and network confirmed reachable
- Correct binary downloaded for the host architecture
- Conflicting installation removed or stopped
- Docker daemon confirmed running
- systemd unit file corrected and daemon-reloaded

## Stop Conditions

- Installation succeeds
- Error persists after three retries with different corrective actions applied
- Error indicates permanent incompatibility (e.g., unsupported OS version)

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Installing on unsupported architectures without validation**
- **Manually modifying binary checksums or signatures**

## Escalation

If the installation continues to fail after all corrective actions are exhausted, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include the full evidence bundle (installer output, system logs, and safe check results).

## Recovery Verification

1. Run the installer successfully to completion
2. Verify the container is running:
   ```bash
   docker ps --filter name=zen-agent
   ```
3. Confirm the agent heartbeat is visible in the dashboard
4. Run a test event delivery or check agent logs for successful enrollment:
   ```bash
   docker logs zen-agent --tail=20
   ```

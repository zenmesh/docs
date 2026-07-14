---
sidebar_label: Certificate Renewal Failure
---

# Certificate Renewal Failure Runbook

**Status:** Bounded Public
**Audience:** Operators
**Priority:** P1

## Objective

Resolve TLS certificate renewal failures for Edge Plane and Edge Lite nodes. Certificate renewal is manual in v1.1 for most cases.

## Symptoms

- mTLS handshake failures between agent and control plane
- Certificate expiry warnings in agent logs
- `x509: certificate has expired or is not yet valid` errors
- Dashboard shows certificate nearing or past expiry
- `zen-lock` logs show certificate distribution failures
- Egress delivery failures with TLS errors

## Likely Reason Codes

| Code | Description |
|------|-------------|
| `CERT_EXPIRY_DETECTED` | Certificate expiry detected but automatic renewal was not triggered |
| `CERT_CA_UNREACHABLE` | `cert-manager` cannot reach the CA to request renewal |
| `CERT_CREDENTIAL_INVALID` | The credential used for renewal is invalid or revoked |
| `CERT_REPEATED_FAILURE` | Renewal has failed multiple times consecutively |
| `CERT_ZENLOCK_DISTRIBUTION` | ZenLock cannot distribute the renewed certificate to components |
| `CERT_TRUST_BUNDLE_STALE` | The trust bundle used for validation is outdated |

## Manual Renewal Required

**Certificate renewal is MANUAL_IN_V1_1 for most cases.** Automatic certificate rotation is not supported in v1.1. Operators must manually intervene when certificate expiry is detected. For Kubernetes Edge Plane, `cert-manager` handles automatic renewal (24h default check interval), but failures still require operator intervention. For Edge Lite, no automatic renewal mechanism exists in v1.1.

## Safe Checks

1. Check certificate expiry dates:
   - Kubernetes: `kubectl get certificates -n zen-mesh`
   - Agent logs: search for `x509` or `certificate` entries
2. Verify `cert-manager` pod is running:
   ```bash
   kubectl get pods -n zen-mesh -l app=cert-manager
   ```
3. Check ZenLock pod status:
   ```bash
   kubectl get pods -n zen-mesh -l app=zen-lock
   ```
4. Verify system clock is synchronized (certificate validation depends on accurate time):
   ```bash
   timedatectl show --property=NTPSynchronized
   ```
5. Review certificate renewal logs:
   ```bash
   kubectl logs -n zen-mesh -l app=cert-manager --tail=50
   ```

## Evidence to Collect

- Certificate list and expiry timestamps:
  ```bash
  kubectl get certificates -n zen-mesh -o wide
  ```
- `cert-manager` logs (last 100 lines)
- ZenLock logs (last 50 lines):
  ```bash
  kubectl logs -n zen-mesh -l app=zen-lock --tail=50
  ```
- Agent TLS handshake errors from agent logs
- `openssl` verification output:
  ```bash
  openssl s_client -connect api.zen-mesh.io:443 -showcerts 2>&1
  ```
- Certificate renewal event history from Kubernetes events:
  ```bash
  kubectl get events -n zen-mesh --field-selector reason=Certificate renewal
  ```

## Corrective Actions

1. **Expiry detected** — Trigger manual certificate renewal through `cert-manager` or regenerate certificates:
   ```bash
   kubectl delete certificate -n zen-mesh <certificate-name>
   kubectl apply -f <certificate-manifest>
   ```
   For Edge Lite, regenerate the enrollment bundle from the dashboard (enrollment includes fresh certificate material).
2. **CA unreachable** — Verify network connectivity between `cert-manager` and the CA endpoint. Check `cert-manager` issuer configuration.
3. **Credential invalid** — Verify the issuer credentials are current. Update or reissue the issuer secret. Check if the issuing account has been rotated or deactivated.
4. **Repeated failures** — Suspend automatic retry and investigate the root cause. Check `cert-manager` logs for the specific failure reason. If the CA is degraded, use a backup CA if available.
5. **ZenLock distribution failure** — Verify ZenLock is operational. Restart ZenLock if necessary:
   ```bash
   kubectl rollout restart -n zen-mesh deployment/zen-lock
   ```
6. **Trust bundle stale** — Re-import the current trust bundle from the control plane. Restart the agent to pick up the updated bundle.

## Retry Conditions

- CA endpoint confirmed reachable
- Issuer credentials verified or replaced
- ZenLock confirmed operational
- Trust bundle updated
- Time-synchronization confirmed within 5 minutes of NTP

## Stop Conditions

- Certificate renewal confirmed with valid expiry date
- All mTLS handshakes restored
- No further certificate errors in agent logs
- `cert-manager` reports `CertificateReady` condition: `True`
- Error identified as permanent (e.g., issuer account permanently deactivated)

## Prohibited Actions

- Direct database mutations
- Bypassing authorization
- Copying credentials between tenants
- Deleting evidence to clear an error
- Uncontrolled repeated retries
- **Manually modifying certificate secrets in Kubernetes**
- **Setting certificate expiry dates to the past to suppress warnings**
- **Using self-signed certificates for production without authorization**

## Escalation

If certificate renewal continues to fail after corrective actions, escalate to:

1. **Internal:** #zen-ops Slack channel
2. **Vendor:** zen@zen-mesh.io with evidence bundle attached
3. **GitHub:** File an issue at https://github.com/zenmesh/zen-platform/issues

Include: certificate list, `cert-manager` logs, ZenLock logs, agent TLS errors, and network trace to CA endpoint.

## Recovery Verification

1. Certificate expiry date shows future date:
   ```bash
   kubectl get certificates -n zen-mesh -o wide
   ```
2. Agent establishes mTLS connection without error:
   ```bash
   kubectl logs -n zen-mesh -l app=zen-agent --tail=20 | grep -i tls
   ```
3. No `x509` errors in any component logs for 5 minutes
4. Dashboard shows certificate status as valid
5. Test event delivery succeeds (if applicable)

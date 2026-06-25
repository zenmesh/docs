---
sidebar_label: Prod Republish
---

# Production Republish Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P1

## Objective

Republish ProviderFlow packages to production with explicit approval.

## Prerequisites

- ✅ Package successfully deployed to production
- ✅ Authorization to perform production republish
- ✅ Change justification documented
- ✅ Rollback plan approved

## Overview

Production republish is a manual process that republishes ProviderFlow packages to production. It is **requires authorization**.

## When to Use

This runbook is for:
- ⚠️ Production package updates (requires authorization)
- ⚠️ Production bug fixes (requires authorization)
- ⚠️ Production feature additions (requires authorization)

This runbook is **NOT** for:
- ❌ Sandbox validation
- ❌ Pre-deployment validation
- ❌ Automated updates

## Authorization Required

⚠️ **Production republish requires explicit authorization from operators.**

**Authorization process:**
1. Submit request to operations team
2. Provide change justification
3. Document impact
4. Await approval
5. Perform republish
6. Document results

## Republish Steps

### Step 1: Verify Current Version

Verify current version:

```bash
zen package inspect <package-name>
```

**Output includes:**
- Package name and version
- Deployment status
- Package visibility (internal/private)
- Validation status
- Current version

### Step 2: Document Change

Document the change:

**Change information:**
- Package name
- Previous version
- New version
- Change description
- Change justification
- Impact assessment
- Rollback plan

### Step 3: Review Change Impact

Review change impact:

```bash
zen package diff <package-name> --version=<previous-version>
```

**Output includes:**
- Differences between versions
- Changed fields
- New fields
- Removed fields
- Breaking changes

### Step 4: Approve Rollback Plan

Approve rollback plan:

**Rollback plan checklist:**
- [ ] Rollback command documented
- [ ] Rollback process documented
- [ ] Rollback verification documented
- [ ] Rollback timeline acceptable

### Step 5: Perform Republish

Republish package to production:

```bash
zen package republish <package-name> --version=<new-version> --yes
```

**Flags:**
- `--version`: New version to deploy
- `--yes`: Skip confirmation

**Expected output:**
```
✅ Package republished successfully
✅ Version: 2.0.0
✅ Environment: production
✅ Deployment status: active
```

### Step 6: Verify Deployment

Verify deployment:

```bash
zen package inspect <package-name>
```

**Check:**
- ✅ Deployment status is active
- ✅ Version is correct
- ✅ No errors
- ✅ All event types deployed

### Step 7: Verify Event Types

Verify event types:

```bash
zen package inspect <package-name> --event-types
```

**Check:**
- ✅ All event types are deployed
- ✅ No missing event types
- ✅ No extra event types

### Step 8: Monitor Initial Traffic

Monitor initial traffic:

```bash
zen status --monitor
```

**Monitor:**
- Event processing
- Delivery success rate
- Error rate
- Latency

### Step 9: Document Results

Document results:

**Republish report includes:**
- Package name
- Previous version
- New version
- Republish date
- Deployment status
- Event types deployed
- Initial traffic stats
- Error rate
- Success rate
- Recommendations

## Republish Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Republish successful |
| `1` | General error |
| `2` | Authentication error |
| `3` | Validation error |
| `4` | Authorization error |

## Successful Republish

Republish is successful when:
- ✅ Exit code is 0
- ✅ Deployment status is active
- ✅ Version is correct
- ✅ All event types deployed
- ✅ No errors
- ✅ Initial traffic is normal
- ✅ Error rate is low (< 1%)

## Republish Failure

Republish fails when:
- ❌ Exit code is non-zero
- ❌ Deployment status is not active
- ❌ Version is incorrect
- ❌ Event types are missing
- ❌ High error rate
- ❌ Delivery failures

**Troubleshooting:**

1. Review error messages
2. Check deployment status
3. Check event types
4. Check logs
5. Fix issues
6. Re-republish

## Rollback Procedure

If republish fails:

### Step 1: Rollback

```bash
zen package rollback <package-name> --version=<previous-version> --yes
```

### Step 2: Verify Rollback

```bash
zen package inspect <package-name>
```

**Check:**
- ✅ Deployment status is active
- ✅ Version is correct
- ✅ No errors

### Step 3: Investigate

Investigate root cause:

- Review error logs
- Review deployment logs
- Review traffic logs
- Identify failure point

### Step 4: Fix Issues

Fix identified issues:

1. Fix code/contract issues
2. Update tests
3. Update documentation
4. Update fixtures/goldens

### Step 5: Re-Submit

Re-submit for republish:

1. Document fix
2. Document impact
3. Await approval
4. Perform republish

## Authorization

⚠️ **Production republish requires explicit authorization from operators.**

**Authorization checklist:**
- [ ] Change justification documented
- [ ] Impact assessment completed
- [ ] Rollback plan approved
- [ ] Timeline is acceptable
- [ ] Risk is acceptable

## Security Considerations

### Authentication

All authentication configurations are validated:

```bash
zen package inspect <package-name>
```

**Checks:**
- ✅ API key validation
- ✅ Bearer token validation
- ✅ Header-based authentication
- ✅ Authentication boundaries enforced

### No Arbitrary Execution

Packages do not execute arbitrary JavaScript or runtime code:

- ✅ Deterministic YAML/DAG processing only
- ✅ No JavaScript execution
- ✅ No arbitrary runtime code
- ✅ No plugins or extensions

### Secret Redaction

All secrets are redacted from outputs:

- ✅ API keys redacted
- ✅ Tokens redacted
- ✅ Credentials redacted
- ✅ No secrets in traces

### Audit Trail

All operations are logged for audit purposes:

- ✅ Republish operations logged
- ✅ Version changes logged
- ✅ Deployment status logged
- ✅ Error logs logged

## Production Monitoring

### Real-Time Monitoring

Monitor production:

```bash
zen status --monitor
```

**Output includes:**
- Event processing
- Delivery success rate
- Error rate
- Latency

### Alerting

Set up alerts for:

- ❌ High error rate (> 5%)
- ❌ Delivery failures (> 10%)
- ❌ High latency (> 500ms)
- ❌ Rollback triggers

## Related

- [Prod Revalidation](./prod-revalidation.md)
- [Package Contract](../providerflow/package-contract.md)
- [Package Validation](../providerflow/package-validation.md)

---

**Next:** [Real Webhook Validation](./real-webhook-validation.md)

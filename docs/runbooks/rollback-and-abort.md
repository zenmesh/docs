---
sidebar_label: Rollback and Abort
---

# Rollback and Abort Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Rollback ProviderFlow packages to previous version or abort failed deployments.

## Prerequisites

- ✅ Authorization to perform rollback or abort
- ✅ Package version history
- ✅ Rollback plan approved

## When to Use

This runbook is for:
- ⚠️ Rollback failed deployment (requires authorization)
- ⚠️ Abort failed deployment (requires authorization)
- ⚠️ Revert to previous version (requires authorization)

## Rollback Steps

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

### Step 2: Determine Previous Version

Determine previous version:

```bash
# From version history
# Or from deployment logs
```

### Step 3: Approve Rollback Plan

Approve rollback plan:

**Rollback plan checklist:**
- [ ] Rollback command documented
- [ ] Rollback process documented
- [ ] Rollback verification documented
- [ ] Rollback timeline acceptable

### Step 4: Perform Rollback

Rollback package to previous version:

```bash
zen package rollback <package-name> --version=<previous-version> --yes
```

**Flags:**
- `--version`: Previous version to deploy
- `--yes`: Skip confirmation

**Expected output:**
```
✅ Package rolled back successfully
✅ Version: 1.0.0
✅ Environment: production
✅ Deployment status: active
```

### Step 5: Verify Rollback

Verify rollback:

```bash
zen package inspect <package-name>
```

**Check:**
- ✅ Deployment status is active
- ✅ Version is correct
- ✅ No errors

### Step 6: Monitor Rollback

Monitor rollback:

```bash
zen status --monitor
```

**Monitor:**
- Event processing
- Delivery success rate
- Error rate
- Latency

## Abort Steps

### Step 1: Verify Current Version

Verify current version:

```bash
zen package inspect <package-name>
```

### Step 2: Approve Abort Plan

Approve abort plan:

**Abort plan checklist:**
- [ ] Abort command documented
- [ ] Abort process documented
- [ ] Abort verification documented
- [ ] Abort timeline acceptable

### Step 3: Perform Abort

Abort deployment:

```bash
zen package abort <package-name> --yes
```

**Flags:**
- `--yes`: Skip confirmation

**Expected output:**
```
✅ Package abort successful
✅ Package: <package-name>
✅ Status: stopped
```

### Step 4: Verify Abort

Verify abort:

```bash
zen package inspect <package-name>
```

**Check:**
- ✅ Deployment status is stopped
- ✅ No errors

### Step 5: Clean Up

Clean up artifacts:

```bash
# Remove traces
rm -rf traces/production/<package-name>

# Remove evidence
rm -rf evidence/<package-name>/production
```

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Rollback/Abort successful |
| `1` | General error |
| `2` | Authentication error |
| `3` | Validation error |
| `4` | Authorization error |

## Successful Rollback

Rollback is successful when:
- ✅ Exit code is 0
- ✅ Deployment status is active
- ✅ Version is correct
- ✅ No errors
- ✅ Monitoring shows normal traffic

## Successful Abort

Abort is successful when:
- ✅ Exit code is 0
- ✅ Deployment status is stopped
- ✅ No errors
- ✅ No pending deliveries

## Rollback/Abort Failure

Rollback/Abort fails when:
- ❌ Exit code is non-zero
- ❌ Deployment status is not correct
- ❌ Version is incorrect
- ❌ High error rate

**Troubleshooting:**

1. Review error messages
2. Check deployment status
3. Check logs
4. Check traffic
5. Fix issues
6. Re-rollback/re-abort

## Authorization

⚠️ **Rollback and abort require explicit authorization from operators.**

**Authorization checklist:**
- [ ] Rollback/abort plan approved
- [ ] Timeline is acceptable
- [ ] Risk is acceptable
- [ ] Rollback plan documented
- [ ] Abort plan documented

## Related

- [Prod Revalidation](./prod-revalidation.md)
- [Prod Republish](./prod-republish.md)
- [Sandbox Validation](./sandbox-validation.md)

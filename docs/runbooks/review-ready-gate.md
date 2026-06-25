---
sidebar_label: Review Ready Gate
---

# Review Ready Gate Runbook

**Status:** Sandbox-Only
**Audience:** QA / Operators
**Priority:** P0

## Objective

Validate review-ready gate.

## Prerequisites

- ✅ Code deployed
- ✅ Review gate configured
- ✅ Review gate tools

## Overview

Review-ready gate validates that code is ready for review. This is **sandbox-only**.

## When to Use

This runbook is for:
- ✅ Review gate validation in sandbox
- ✅ Code quality validation
- ✅ Review readiness validation

This runbook is **NOT** for:
- ❌ Production validation
- ❌ Production monitoring

## Validation Steps

### Step 1: Run Review Ready Gate

Run review ready gate:

```bash
npm run gate:review-ready
```

**Expected output:**
```
Running review ready gate...
✅ Lint: PASS
✅ Type check: PASS
✅ Test: PASS
✅ Security scan: PASS
✅ Review ready: YES
```

### Step 2: Review Gate Results

Review gate results:

```bash
npm run gate:review-ready -- --output=json
```

**Check:**
- ✅ All gates pass
- ✅ No warnings
- ✅ No errors

### Step 3: Review Gate Issues

Review any gate issues:

```bash
npm run gate:review-ready -- --issues
```

**Issues include:**
- Linting errors
- Type errors
- Test failures
- Security issues
- Performance issues

### Step 4: Fix Gate Issues

Fix gate issues:

1. Fix linting errors
2. Fix type errors
3. Fix test failures
4. Fix security issues
5. Fix performance issues

### Step 5: Re-run Gate

Re-run gate:

```bash
npm run gate:review-ready
```

**Check:**
- ✅ All gates pass
- ✅ No issues

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Review ready gate passes |
| `1` | Review ready gate fails |
| `2` | Gate not configured |

## Successful Validation

Validation is successful when:
- ✅ All gates pass
- ✅ No warnings
- ✅ No errors
- ✅ Code is review ready

## Validation Failure

Validation fails when:
- ❌ Gates fail
- ❌ Warnings exist
- ❌ Errors exist
- ❌ Code is not review ready

**Troubleshooting:**

1. Review gate output
2. Fix gate issues
3. Re-run gate
4. Verify fixes

## Security Considerations

### No Bypass

Never use `--no-verify` or other bypass flags.

### Safe Confirmation

Always use `--yes` flag for destructive operations.

### No Break-Glass

Never use AUTH_SKIP_CI or other break-glass flags.

## Authorization

⚠️ **Review ready gate validation requires authorization for production validation.**

This runbook is **sandbox-only**. Production validation requires separate authorization.

## Related

- [UI Browser Gates](./ui-browser-gates.md)
- [Auth Aware UI Gates](./auth-aware-ui-gates.md)
- [Asset Cache Integrity](./asset-cache-integrity.md)

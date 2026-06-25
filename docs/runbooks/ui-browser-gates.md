---
sidebar_label: UI Browser Gates
---

# UI Browser Gates Runbook

**Status:** Sandbox-Only
**Audience:** QA / Operators
**Priority:** P1

## Objective

Validate UI browser gates using Playwright.

## Prerequisites

- ✅ UI deployed to browser
- ✅ Playwright installed
- ✅ Test environment accessible

## Overview

UI browser gates validate UI components using Playwright. This is **sandbox-only**.

## When to Use

This runbook is for:
- ✅ UI validation in sandbox
- ✅ UI smoke tests
- ✅ UI regression tests

This runbook is **NOT** for:
- ❌ Production validation
- ❌ Production monitoring

## Validation Steps

### Step 1: Run Playwright Tests

Run Playwright tests:

```bash
npm run test:ui
```

**Expected output:**
```
Running Playwright tests...
✅ Test passed: should display dashboard
✅ Test passed: should display settings
✅ All tests passed
```

### Step 2: Review Test Results

Review test results:

```bash
npm run test:ui -- --reporter=html
```

**Check:**
- ✅ All tests pass
- ✅ No flaky tests
- ✅ No visual regressions

### Step 3: Generate Screenshots

Generate screenshots:

```bash
npm run test:ui -- --screenshot
```

**Screenshots include:**
- Test scenario screenshots
- Error screenshots
- Regression screenshots

### Step 4: Generate Videos

Generate videos:

```bash
npm run test:ui -- --video
```

**Videos include:**
- Test scenario videos
- Error videos

### Step 5: Validate Links

Validate UI links:

```bash
npm run validate:links
```

**Check:**
- ✅ All links are valid
- ✅ No broken links
- ✅ No 404 errors

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | All tests pass |
| `1` | Tests failed |
| `2` | Link validation failed |

## Successful Validation

Validation is successful when:
- ✅ All tests pass
- ✅ All links are valid
- ✅ No visual regressions
- ✅ No flaky tests

## Validation Failure

Validation fails when:
- ❌ Tests fail
- ❌ Links are broken
- ❌ Visual regressions found

**Troubleshooting:**

1. Review test output
2. Review screenshots
3. Review videos
4. Fix issues
5. Re-run tests

## Security Considerations

### No Bypass

Never use `--no-verify` or other bypass flags.

### Safe Confirmation

Always use `--yes` flag for destructive operations.

### No Break-Glass

Never use AUTH_SKIP_CI or other break-glass flags.

## Authorization

⚠️ **UI browser gates require authorization for production validation.**

This runbook is **sandbox-only**. Production validation requires separate authorization.

## Related

- [Auth Aware UI Gates](./auth-aware-ui-gates.md)
- [Review Ready Gate](./review-ready-gate.md)

---

**Next:** [Auth Aware UI Gates](./auth-aware-ui-gates.md)

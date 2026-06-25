---
sidebar_label: Auth Aware UI Gates
---

# Auth Aware UI Gates Runbook

**Status:** Sandbox-Only
**Audience:** QA / Operators
**Priority:** P0

## Objective

Validate UI auth-aware gates using Playwright.

## Prerequisites

- ✅ UI deployed to browser
- ✅ Playwright installed
- ✅ Test environment accessible

## Overview

Auth-aware UI gates validate UI components with authentication. This is **sandbox-only**.

## When to Use

This runbook is for:
- ✅ UI auth validation in sandbox
- ✅ Auth gate smoke tests
- ✅ Auth gate regression tests

This runbook is **NOT** for:
- ❌ Production validation
- ❌ Production monitoring

## Validation Steps

### Step 1: Run Auth Aware Tests

Run auth-aware tests:

```bash
npm run test:auth-aware
```

**Expected output:**
```
Running auth-aware tests...
✅ Test passed: should deny access without token
✅ Test passed: should allow access with valid token
✅ Test passed: should deny access with invalid token
✅ All tests passed
```

### Step 2: Review Test Results

Review test results:

```bash
npm run test:auth-aware -- --reporter=html
```

**Check:**
- ✅ All tests pass
- ✅ No flaky tests
- ✅ No auth bypasses

### Step 3: Test Auth Scenarios

Test auth scenarios:

```bash
npm run test:auth-aware -- --scenario=<scenario-name>
```

**Scenarios:**
- Unauthorized access
- Valid token access
- Invalid token access
- Expired token access
- Missing token access

### Step 4: Test Permission Gates

Test permission gates:

```bash
npm run test:auth-aware -- --permission=<permission>
```

**Permissions:**
- admin
- operator
- viewer

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | All tests pass |
| `1` | Tests failed |
| `2` | Auth bypass found |

## Successful Validation

Validation is successful when:
- ✅ All tests pass
- ✅ All auth gates work correctly
- ✅ No auth bypasses
- ✅ No flaky tests

## Validation Failure

Validation fails when:
- ❌ Tests fail
- ❌ Auth gates are bypassed
- ❌ Invalid access granted
- ❌ Valid access denied

**Troubleshooting:**

1. Review test output
2. Check auth tokens
3. Check permission gates
4. Fix issues
5. Re-run tests

## Security Considerations

### No Bypass

Never use `--no-verify` or other bypass flags.

### Safe Confirmation

Always use `--yes` flag for destructive operations.

### No Break-Glass

Never use AUTH_SKIP_CI or other break-glass flags.

### Auth Token Management

- Use test tokens
- Never use production tokens
- Rotate tokens regularly

## Authorization

⚠️ **Auth-aware UI gates require authorization for production validation.**

This runbook is **sandbox-only**. Production validation requires separate authorization.

## Related

- [UI Browser Gates](./ui-browser-gates.md)
- [Review Ready Gate](./review-ready-gate.md)

---

**Next:** [Asset Cache Integrity](./asset-cache-integrity.md)

---
sidebar_label: Asset Cache Integrity
---

# Asset Cache Integrity Runbook

**Status:** Sandbox-Only
**Audience:** SRE / QA
**Priority:** P1

## Objective

Validate asset cache integrity.

## Prerequisites

- ✅ Assets deployed
- ✅ Cache configured
- ✅ Cache validation tools

## Overview

Asset cache integrity validates that cached assets are not corrupted or tampered with. This is **sandbox-only**.

## When to Use

This runbook is for:
- ✅ Asset cache validation in sandbox
- ✅ Cache integrity checks
- ✅ Cache corruption detection

This runbook is **NOT** for:
- ❌ Production validation
- ❌ Production monitoring

## Validation Steps

### Step 1: Run Cache Integrity Check

Run cache integrity check:

```bash
npm run validate:cache
```

**Expected output:**
```
Running cache integrity check...
✅ Asset: index.html - valid
✅ Asset: bundle.js - valid
✅ Asset: styles.css - valid
✅ All assets valid
```

### Step 2: Check Cache Headers

Check cache headers:

```bash
curl -I https://your-domain.com/
```

**Check:**
- ✅ Cache-Control header is set
- ✅ ETag is present
- ✅ Last-Modified is present
- ✅ No no-cache headers

### Step 3: Verify Asset Hashing

Verify asset hashing:

```bash
# Check if assets have content-based hashes
curl -s https://your-domain.com/bundle.js | md5sum
```

**Check:**
- ✅ Assets have unique hashes
- ✅ Hash changes when content changes
- ✅ No duplicate hashes

### Step 4: Verify Cache Invalidation

Verify cache invalidation:

```bash
# After deploying new version
curl -s https://your-domain.com/bundle.js | md5sum
```

**Check:**
- ✅ Hash changes after deployment
- ✅ Old version is not served
- ✅ New version is served

## Exit Codes

| Exit Code | Description |
|-----------|-------------|
| `0` | Cache integrity valid |
| `1` | Cache integrity invalid |
| `2` | Cache not configured |

## Successful Validation

Validation is successful when:
- ✅ All assets are valid
- ✅ Cache headers are correct
- ✅ Asset hashing is working
- ✅ Cache invalidation works

## Validation Failure

Validation fails when:
- ❌ Assets are corrupted
- ❌ Cache headers are incorrect
- ❌ Asset hashing is not working
- ❌ Cache invalidation is not working

**Troubleshooting:**

1. Review cache configuration
2. Check cache headers
3. Check asset hashes
4. Check invalidation logic
5. Fix issues
6. Re-validate

## Security Considerations

### No Tampering

- Never modify cached assets
- Use content-based hashing
- Verify integrity with checksums

### Safe Cache Invalidation

- Use cache-busting techniques
- Use versioned URLs
- Use ETag and Last-Modified headers

### No Cache Poisoning

- Never accept untrusted content into cache
- Validate content before caching
- Use secure cache headers

## Authorization

⚠️ **Asset cache integrity checks require authorization for production validation.**

This runbook is **sandbox-only**. Production validation requires separate authorization.

## Related

- [Review Ready Gate](./review-ready-gate.md)

---

**Next:** [Review Ready Gate](./review-ready-gate.md)

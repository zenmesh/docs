---
sidebar_label: Prod Revalidation
---

# Production Revalidation Runbook

**Status:** Requires Authorization
**Audience:** Operators
**Priority:** P0

## Objective

Validate ProviderFlow packages in production environment after controlled deployment.

## Prerequisites

- ✅ Package successfully deployed to production
- ✅ Authorization to perform production validation
- ✅ Access to production evidence

## Overview

Production revalidation is a manual process that validates ProviderFlow packages in the production environment. It is **requires authorization** and is **sandbox-only pre-deployment**.

## When to Use

This runbook is for:
- ⚠️ Production deployment validation (requires authorization)
- ⚠️ Post-deployment verification
- ⚠️ Production evidence collection

This runbook is **NOT** for:
- ❌ Automated validation
- ❌ Sandbox validation
- ❌ Pre-deployment validation

## Authorization Required

⚠️ **Production revalidation requires explicit authorization from operators.**

**Authorization process:**
1. Submit request to operations team
2. Provide justification for production validation
3. Await approval
4. Perform validation
5. Document results

## Validation Steps

### Step 1: Verify Deployment

Verify package is deployed:

```bash
zen package inspect <package-name>
```

**Output includes:**
- Package name and version
- Deployment status
- Package visibility (internal/private)
- Validation status

### Step 2: Collect Production Evidence

Collect production evidence:

```bash
zen package evidence <package-name> --environment=production
```

**Output includes:**
- Production trace data
- Production delivery statistics
- Production validation summary
- Production error logs

### Step 3: Review Traces

Review production traces:

```bash
cat traces/production/<package>/summary.json
```

**Traces include:**
- Event ID
- Timestamp
- Event type
- Contract name
- Endpoint name
- Target name
- Status (success/failure)
- Output data

### Step 4: Review Delivery Statistics

Review delivery statistics:

```bash
cat traces/production/<package>/delivery-stats.json
```

**Statistics include:**
- Total events processed
- Successful deliveries
- Failed deliveries
- Success rate
- Average processing time

### Step 5: Review Error Logs

Review error logs:

```bash
cat traces/production/<package>/errors.json
```

**Errors include:**
- Error ID
- Timestamp
- Error type
- Error message
- Event ID
- Remediation steps

### Step 6: Validate Against Production Goldens

Compare against production goldens:

```bash
zen package validate <package-name> --environment=production --output=json
```

**Validation checks:**
- ✅ YAML syntax validation
- ✅ Required field validation
- ✅ Type validation
- ✅ Dependency validation
- ✅ Contract conformance
- ✅ Authentication configuration
- ✅ Event type validation

### Step 7: Generate Validation Report

Generate validation report:

```bash
zen package evidence <package-name> --environment=production --report
```

**Report includes:**
- Validation summary
- Delivery statistics
- Error logs
- Recommendations
- Approval status

## Validation Artifacts

### Production Traces

Production execution traces:

```
traces/production/<package>/<event-type>.jsonl
```

**Example:**
```
traces/production/stripe-v2/payment_intent.succeeded.jsonl
```

### Production Delivery Statistics

Delivery statistics:

```
traces/production/<package>/delivery-stats.json
```

**Example:**
```
traces/production/stripe-v2/delivery-stats.json
```

### Production Error Logs

Error logs:

```
traces/production/<package>/errors.json
```

**Example:**
```
traces/production/stripe-v2/errors.json
```

### Production Evidence

Production evidence summary:

```
evidence/<package>/production/summary.json
```

**Example:**
```
evidence/stripe-v2/production/summary.json
```

## Successful Revalidation

Revalidation is successful when:
- ✅ All production traces collected
- ✅ Delivery statistics are acceptable
- ✅ Error rate is low
- ✅ Production goldens match
- ✅ Exit code is 0
- ✅ All validation checks pass

## Revalidation Failure

Revalidation fails when:
- ❌ High error rate
- ❌ Delivery failures
- ❌ Goldens don't match
- ❌ Security issues found
- ❌ Exit code is non-zero

**Troubleshooting:**

1. Review error logs
2. Check delivery statistics
3. Review traces
4. Identify root cause
5. Fix issues
6. Re-validate

## Production Readiness Criteria

### Must Satisfy

1. ✅ Exit code is 0
2. ✅ Error rate < 1%
3. ✅ Delivery success rate > 99%
4. ✅ All production goldens match
5. ✅ No security issues found
6. ✅ All traces collected

### Should Satisfy

1. ⚠️ Average processing time < 100ms
2. ⚠️ Memory usage is acceptable
3. ⚠️ CPU usage is acceptable
4. ⚠️ No memory leaks
5. ⚠️ No performance degradation

### Nice to Have

1. 💡 Delivery statistics documented
2. 💡 Error patterns identified
3. 💡 Recommendations provided
4. 💡 Future improvements identified

## Production Monitoring

### Real-Time Monitoring

Monitor production:

```bash
zen status
```

**Output includes:**
- Cluster health
- Endpoint status
- Target status
- Recent delivery statistics
- Package validation status

### Alerting

Set up alerts for:

- ❌ High error rate (> 5%)
- ❌ Delivery failures (> 10%)
- ❌ High latency (> 500ms)
- ❌ Memory leaks
- ❌ Security issues

## Security Considerations

### Authentication

All authentication configurations are validated:

```bash
zen package validate <package-name> --environment=production
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

- ✅ Event processing logged
- ✅ Authentication attempts logged
- ✅ Delivery failures logged
- ✅ Errors and warnings logged

## Authorization

⚠️ **Production revalidation requires explicit authorization from operators.**

**Authorization process:**
1. Submit request to operations team
2. Provide justification for production validation
3. Await approval
4. Perform validation
5. Document results

**Authorization checklist:**
- [ ] Package is deployed to production
- [ ] Authorization is approved
- [ ] Timeline is acceptable
- [ ] Risk is acceptable

## Production Deployment

### Controlled Deployment

Production deployment requires:

1. ✅ Sandbox validation passes
2. ✅ Evidence collected and reviewed
3. ⚠️ Controlled deployment to production
4. ⚠️ Explicit approval from operators
5. ⚠️ Prod revalidation completed

### Rollback Plan

If revalidation fails:

1. ⚠️ Rollback to previous version
2. ⚠️ Investigate root cause
3. ⚠️ Fix issues
4. ⚠️ Re-deploy with fixes
5. ⚠️ Re-validate

**Rollback command:**
```bash
zen package rollback <package-name> --version=<previous-version>
```

## Related

- [Sandbox Validation](./sandbox-validation.md)
- [Package Validation](../providerflow/package-validation.md)
- [Fixtures, Goldens, Traces](../providerflow/fixtures-goldens-traces.md)
- [Security Model](../providerflow/security-model.md)

---

**Next:** [Prod Republish](./prod-republish.md)

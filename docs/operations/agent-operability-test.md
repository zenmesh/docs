---
sidebar_label: Agent Operability Test
---

# External Agent Operability Test

This test simulates an external agent with access only to public documentation. Each task is scored PASS, PARTIAL, FAIL, or NOT_IMPLEMENTED.

## Test Tasks

### 1. Install Edge Lite

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Edge Lite is linked from Install section in sidebar and llms.txt |
| Prerequisites | PASS | Requirements documented: Linux, curl, sudo, systemd |
| Surface instructions | PASS | CLI-based install at docs/install/edge-lite.md |
| Executable example | PASS | `curl -fsSL https://get.zen-mesh.io | sh` |
| Expected result | PASS | Agent binary installed, service running |
| Failure guidance | PARTIAL | Troubleshooting covers some install issues but no dedicated runbook |
| Recovery guidance | FAIL | No dedicated Edge Lite install failure runbook |
| Evidence | PASS | Install script SHA-256 available |
| Non-claims | PASS | Linux-only explicitly stated |

**Score: PARTIAL** — Missing dedicated install failure runbook.

### 2. Enroll Edge Plane

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Edge Plane docs in Install section |
| Prerequisites | PASS | Requires installed runtime path |
| Surface instructions | PASS | Both Edge Lite and Kubernetes paths documented |
| Executable example | PARTIAL | Enrollment process described but no single CLI command example |
| Expected result | PARTIAL | Outcome described but no structured verification |
| Failure guidance | PARTIAL | Enrollment failures mentioned in troubleshooting |
| Recovery guidance | FAIL | No enrollment failure runbook |
| Evidence | FAIL | Enrollment evidence not clearly documented |
| Non-claims | PASS | Does not auto-configure mTLS in all modes |

**Score: PARTIAL** — Missing enrollment failure runbook and evidence guidance.

### 3. Verify Readiness

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | FAIL | No dedicated readiness verification guide |
| Prerequisites | FAIL | Not clearly documented |
| Surface instructions | FAIL | No structured verification procedure |
| Executable example | FAIL | No example |
| Expected result | FAIL | Not documented |
| Failure guidance | FAIL | Not documented |
| Recovery guidance | FAIL | Not documented |
| Evidence | FAIL | Not documented |
| Non-claims | FAIL | Not documented |

**Score: FAIL** — Readiness verification is not documented as an independent operation.

### 4. Create an Endpoint

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Endpoints in Guides and API Reference |
| Prerequisites | PASS | Requires authentication |
| Surface instructions | PASS | UI, API, and CLI procedures documented |
| Executable example | PASS | API example with curl, CLI example |
| Expected result | PASS | Endpoint ID returned |
| Failure guidance | PASS | Error codes documented |
| Recovery guidance | PARTIAL | No dedicated endpoint failure runbook |
| Evidence | PASS | Endpoint ID serves as evidence |

**Score: PASS** — Well-documented across all surfaces.

### 5. Select a Provider Pack

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Provider guides in Guides section |
| Prerequisites | PASS | Requires Endpoint first |
| Surface instructions | PASS | Per-provider setup guides |
| Executable example | PASS | Stripe, GitHub, Shopify, Twilio examples |
| Expected result | PASS | Provider associated with Endpoint |
| Failure guidance | PASS | Signature verification errors documented |
| Recovery guidance | PARTIAL | No dedicated provider failure runbook |
| Evidence | PASS | Provider association in Endpoint details |

**Score: PASS** — Well-documented per-provider.

### 6. Create a Target

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Targets in API Reference |
| Prerequisites | PASS | Requires URL and auth |
| Surface instructions | PASS | UI, API, CLI documented |
| Executable example | PASS | API and CLI examples |
| Expected result | PASS | Target ID returned |
| Failure guidance | PASS | Error codes documented |
| Recovery guidance | FAIL | No target failure runbook |
| Evidence | PASS | Target ID serves as evidence |

**Score: PASS** — Well-documented.

### 7. Create and Apply a Flow

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Flows in API Reference and Quickstart |
| Prerequisites | PASS | Requires Endpoint and Target |
| Surface instructions | PASS | UI, API, CLI documented |
| Executable example | PASS | End-to-end example in Quickstart |
| Expected result | PASS | Flow ID returned, status active after apply |
| Failure guidance | PARTIAL | Validation errors documented but no apply failure runbook |
| Recovery guidance | FAIL | No apply failure recovery guidance |
| Evidence | PASS | Flow ID and status serve as evidence |

**Score: PASS** — Minor gaps in failure recovery.

### 8. Submit a Test Event

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Webhook delivery docs |
| Prerequisites | PASS | Requires active Endpoint |
| Surface instructions | PASS | API documented |
| Executable example | PASS | curl example |
| Expected result | PASS | Event ID returned |
| Failure guidance | PASS | Delivery failure codes documented |
| Recovery guidance | PASS | Retry and DLQ documented |
| Evidence | PASS | Delivery attempt records |

**Score: PASS** — Well-documented.

### 9. Inspect Operation Status

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Delivery status reference |
| Prerequisites | PASS | Requires delivery ID |
| Surface instructions | PASS | UI, API, MCP documented |
| Executable example | PASS | API and CLI examples |
| Expected result | PASS | Status value with reason codes |
| Failure guidance | PASS | Status transitions documented |
| Recovery guidance | PARTIAL | No structured diagnosis flow |
| Evidence | PASS | Status response serves as evidence |

**Score: PASS** — Minor gaps in diagnosis flow.

### 10. Inspect Evidence

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Evidence docs in Reference and Evidence sections |
| Prerequisites | PASS | Requires delivery ID |
| Surface instructions | PASS | UI, API, MCP documented |
| Executable example | PASS | API example |
| Expected result | PASS | Evidence bundle returned |
| Failure guidance | PASS | Not finding evidence documented |
| Recovery guidance | FAIL | No evidence-missing runbook |
| Evidence | PASS | Evidence bundle is self-describing |

**Score: PASS** — Minor gaps in evidence-missing recovery.

### 11. Diagnose a Failure

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Delivery failures doc |
| Prerequisites | PASS | Requires failed delivery ID |
| Surface instructions | PASS | Symptom/cause/action table |
| Executable example | PASS | Diagnostic flow |
| Expected result | PASS | Failure cause identified |
| Failure guidance | PASS | Per-code guidance |
| Recovery guidance | PASS | Retry, DLQ, replay documented |
| Evidence | PASS | Delivery attempts, reason codes |

**Score: PASS** — Well-documented.

### 12. Recover Safely

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Replay and recovery docs |
| Prerequisites | PASS | Requires understanding of failure cause |
| Surface instructions | PASS | Retry, DLQ, replay, reapply documented |
| Executable example | PASS | Recovery examples |
| Expected result | PASS | Delivery resume or event replayed |
| Failure guidance | PARTIAL | Some recovery actions may not work for all scenarios |
| Recovery guidance | PARTIAL | General recovery but no scenario-specific runbooks |
| Evidence | PASS | Recovery evidence documented |
| Non-claims | PASS | Limits of recovery documented |

**Score: PARTIAL** — Missing scenario-specific failure runbooks.

### 13. Retire Resources

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | FAIL | No retirement documentation |
| Prerequisites | FAIL | Not documented |
| Surface instructions | FAIL | Delete is the only option |
| Executable example | FAIL | No example |
| Expected result | FAIL | Not documented |
| Failure guidance | FAIL | Not documented |
| Recovery guidance | FAIL | Not documented |
| Evidence | FAIL | Not documented |
| Non-claims | FAIL | Not documented |

**Score: FAIL** — Retirement with evidence is not implemented.

## Overall Score

| Task | Score |
|------|-------|
| 1. Install Edge Lite | PARTIAL |
| 2. Enroll Edge Plane | PARTIAL |
| 3. Verify Readiness | FAIL |
| 4. Create Endpoint | PASS |
| 5. Select Provider Pack | PASS |
| 6. Create Target | PASS |
| 7. Create and Apply Flow | PASS |
| 8. Submit Test Event | PASS |
| 9. Inspect Status | PASS |
| 10. Inspect Evidence | PASS |
| 11. Diagnose Failure | PASS |
| 12. Recover Safely | PARTIAL |
| 13. Retire Resources | FAIL |

**Result: PARTIAL (10/13 tasks scorable, 7 PASS, 2 PARTIAL, 2 FAIL)**

The external agent operability test passes for basic operations (create Endpoint, Target, Flow, submit events, inspect status/evidence, diagnose failures). It fails for readiness verification and retirement. It is partial for installation and enrollment edge cases.

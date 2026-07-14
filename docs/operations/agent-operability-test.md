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

**Score: PARTIAL**
**Blocker:** Edge Lite runtime (public Docker image and installer) is DESIGN_PARTNER_EVAL, not generally published. Install failure runbook exists but edge cases (network-restricted environments, incompatible systemd) are not covered.

### 2. Create Enrollment Intent

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | FAIL | No documented standalone enrollment-intent operation |
| Prerequisites | FAIL | Not independently documented |
| Surface instructions | PARTIAL | Enrollment intent is implicit in the dashboard workflow (generate bundle) |
| Executable example | PARTIAL | Dashboard-only — no API/CLI example for intent creation |
| Expected result | PARTIAL | Bundle generated but not as separate evidence |
| Failure guidance | FAIL | Intent-specific failures not documented |
| Recovery guidance | FAIL | Not documented |
| Evidence | FAIL | Intent is not recorded as independent evidence |

**Score: PARTIAL**
**Blocker:** Enrollment intent is not a documented standalone operation. It is bundled into the dashboard workflow. No API or CLI surface exists to create intent independently. Failure and recovery guidance are absent.

### 3. Enroll Edge Plane

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Edge Plane enrollment in Install section |
| Prerequisites | PASS | Requires installed runtime and generated bundle |
| Surface instructions | PASS | Both Edge Lite and Kubernetes paths documented |
| Executable example | PARTIAL | Enrollment process described but no single CLI command |
| Expected result | PARTIAL | Outcome described but no structured verification |
| Failure guidance | PARTIAL | Enrollment failures mentioned in troubleshooting |
| Recovery guidance | FAIL | Enrollment failure runbook exists but not linked from enrollment docs |
| Evidence | FAIL | Enrollment evidence not clearly documented |
| Non-claims | PASS | Does not auto-configure mTLS in all modes |

**Score: PARTIAL**
**Blocker:** No single CLI command for enrollment. No structured verification outcome. Enrollment failure runbook is not cross-referenced from enrollment documentation.

### 4. Verify Plane Readiness

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

**Score: FAIL**
**Blocker:** Readiness verification is not documented as an independent operation. No procedure, example, expected outcomes, or failure guidance exists. A plane-readiness runbook was created but the underlying product capability for structured readiness verification is absent.

### 5. Create Endpoint

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

**Score: PASS**

### 6. Associate Provider Pack

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

**Score: PASS**

### 7. Create Target

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

**Score: PASS**

### 8. Create Flow

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

**Score: PASS**

### 9. Apply Configuration

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Apply is documented in API Reference and Quickstart |
| Prerequisites | PASS | Requires Flow, Endpoint, and Target |
| Surface instructions | PASS | Apply via UI, API, CLI documented |
| Executable example | PASS | API and CLI examples |
| Expected result | PASS | Configuration applied, status reflected |
| Failure guidance | PARTIAL | Validation errors documented but no apply-specific runbook |
| Recovery guidance | PASS | Reapply is the recommended approach |
| Evidence | PASS | Status response serves as evidence |

**Score: PASS**

### 10. Submit and Inspect a Test Event

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Webhook delivery docs |
| Prerequisites | PASS | Requires active Endpoint |
| Surface instructions | PASS | API and CLI documented |
| Executable example | PASS | curl example for submission, API and CLI for inspection |
| Expected result | PASS | Event ID returned, delivery status inspectable |
| Failure guidance | PASS | Delivery failure codes documented |
| Recovery guidance | PASS | Retry and DLQ documented |
| Evidence | PASS | Delivery attempt records and status |

**Score: PASS**

### 11. Inspect Status and Evidence

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Delivery status reference and Evidence docs |
| Prerequisites | PASS | Requires delivery ID |
| Surface instructions | PASS | UI, API, MCP documented for both status and evidence |
| Executable example | PASS | API examples for status and evidence retrieval |
| Expected result | PASS | Status value with reason codes and evidence bundle |
| Failure guidance | PASS | Status transitions and evidence-not-found documented |
| Recovery guidance | PARTIAL | Evidence-missing recovery is UNRESOLVED |
| Evidence | PASS | Evidence bundle is self-describing |

**Score: PARTIAL**
**Blocker:** Evidence-missing recovery is documented with status UNRESOLVED — the system behavior when automatic evidence collection fails is not specified.

### 12. Diagnose and Recover

| Criterion | Score | Notes |
|-----------|-------|-------|
| Discoverability | PASS | Delivery failures doc, replay and recovery docs |
| Prerequisites | PASS | Requires understanding of failure cause |
| Surface instructions | PASS | Retry, DLQ, replay, reapply documented |
| Executable example | PASS | Recovery examples |
| Expected result | PARTIAL | Delivery can be recovered but no automated recovery for inconsistent state |
| Failure guidance | PASS | Per-code guidance |
| Recovery guidance | PARTIAL | Inconsistent-state recovery is MANUAL_IN_V1_1 |
| Evidence | PASS | Recovery evidence documented |
| Non-claims | PASS | Limits of recovery documented |

**Score: PARTIAL**
**Blocker:** Inconsistent-state recovery is MANUAL_IN_V1_1 — no automated recovery. Resource retirement with evidence is NOT_SUPPORTED. Diagnosis is well-documented but recovery depends on scenario and may require manual intervention.

### 13. Retire Resources Safely

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

**Score: FAIL**
**Blocker:** Resource retirement with evidence is NOT_SUPPORTED in v1.1. Only delete (permanent removal) is available. Formal retirement with evidence, reason codes, and non-claims is PLANNED_V1_1.

## Overall Score

| # | Task | Score | Blocker |
|---|---|---|---|
| 1 | Install Edge Lite | PARTIAL | Edge Lite runtime DESIGN_PARTNER_EVAL; edge-case runbook absent |
| 2 | Create enrollment intent | PARTIAL | Not a documented standalone operation; no API/CLI surface |
| 3 | Enroll Edge Plane | PARTIAL | No single CLI command; no structured verification; runbook not cross-linked |
| 4 | Verify Plane readiness | FAIL | No independent readiness verification procedure documented |
| 5 | Create Endpoint | PASS | — |
| 6 | Associate Provider Pack | PASS | — |
| 7 | Create Target | PASS | — |
| 8 | Create Flow | PASS | — |
| 9 | Apply configuration | PASS | — |
| 10 | Submit and inspect a test event | PASS | — |
| 11 | Inspect status and evidence | PARTIAL | Evidence-missing recovery UNRESOLVED |
| 12 | Diagnose and recover | PARTIAL | Inconsistent-state recovery MANUAL_IN_V1_1 |
| 13 | Retire resources safely | FAIL | Retirement with evidence NOT_SUPPORTED |

**Result: PARTIAL (13/13 tasks scorable, 6 PASS, 5 PARTIAL, 2 FAIL, 0 NOT_IMPLEMENTED)**

The external agent operability test demonstrates that basic CRUD operations (create Endpoint, Target, Flow, apply configuration, submit and inspect events) are well-documented and pass. Readiness verification and resource retirement fail due to absent product implementation. Installation, enrollment, evidence inspection, and recovery are partial — the documentation provides guidance but each area has documented blockers.

This corrects the prior report which incorrectly stated PASS: 7, PARTIAL: 2, FAIL: 2 (totaling 11). The corrected count is PASS: 6, PARTIAL: 5, FAIL: 2 = 13.

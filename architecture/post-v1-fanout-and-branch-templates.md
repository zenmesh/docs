# Post-V1 Fan-Out and Branch Templates Architecture

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** PLANNED / POST-V1

## Overview

Multiple Targets/fan-out is a Pro+ feature and should be implemented after V1 has validated product-market fit. Fan-out must be branch/template driven, not hardcoded in Go business logic.

## Decisions

### Core Fan-Out Architecture

1. **Multiple Targets/fan-out is post-V1.** V1 supports one active Target per Flow.

2. **Multiple Targets is Pro+.** Fan-out unlocks meaningful conversion value while remaining GTM-feasible.

3. **Conditional fan-out is Business+.** Advanced routing conditions, event-based triggers, and per-destination policy enforcement require higher-tier logic.

4. **Fan-out must be branch/template driven, not hardcoded Go business logic.** 

   - Go is the validator/compiler/execution engine
   - YAML templates define branch logic, target policy, transform policy, approval policy, and evidence requirements
   - Templates can be versioned, audited, and rolled back

5. **Same-tenant only for initial fan-out.** Cross-tenant delegation remains forbidden until a future scoped delegation model is designed and proven.

### V1 Compatibility Contract

**Fan-out architecture must remain V1-compatible:**

1. **V1 supports one active Target per Flow.**
   - Each Flow has a single primary Target configuration
   - Fan-out rules and branch templates exist as design artifacts, not runtime enforcement

2. **Flow model must remain branch-compatible.**
   - Branch structure in templates must not break existing V1 Flow CRDs
   - Existing Flows must continue to work when fan-out is enabled/forbidden

3. **Evidence model must support future branch/sub-delivery IDs.**
   - Evidence records must include source event ID
   - Future per-target delivery IDs and partial success tracking require schema evolution

4. **Idempotency must support future per-target keys.**
   - Current V1 idempotency uses global Flow-level keys
   - Fan-out requires per-target or per-branch idempotency

5. **DLQ must support future partial success.**
   - V1 DLQ tracks entire Flow failures
   - Fan-out requires granular DLQ per target or per branch

6. **Policy should attach to future branch/Target, not only global Flow.**
   - Current V1 policies are global Flow-level
   - Fan-out requires granular policies per branch/Target

7. **Logs must distinguish source event from target delivery.**
   - V1 logs treat the Flow as the atomic unit
   - Fan-out requires source event, branch context, and per-target delivery metadata

### Conceptual Model

```
Endpoint
  -> Flow
    -> Branch A -> Target A policy -> Egress A -> Evidence A
    -> Branch B -> Target B policy -> Egress B -> Evidence B
```

**Key elements:**

- **Endpoint:** Webhook receiver (V1)
- **Flow:** Event routing orchestration (V1 + future fan-out)
- **Branch:** Fan-out path within a Flow (post-V1)
- **Target:** Destination endpoint (V1 + fan-out)
- **Policy:** Delivery, idempotency, rate limiting, approval (V1 + fan-out)
- **Egress:** Network outbound (future Zen egress controls)
- **Evidence:** Delivery proof and audit trail (V1 + future granularity)

### What Is NOT Implemented Today

- Branch/template-driven fan-out (design only)
- Per-branch policies (V1 only has Flow-level policies)
- Per-target idempotency (V1 uses global Flow keys)
- Granular DLQ per target (V1 has one DLQ per Flow)
- Evidence filtering per branch (V1 evidence is Flow-level)
- Advanced routing conditions (V1 has basic header/body matching)

### Fan-Out Template Specification

**YAML template structure (post-V1 design):**

```yaml
# flow-branch-template.yaml
apiVersion: zenmesh.io/v1
kind: DeliveryBranchTemplate
metadata:
  name: stripe-subscription-created
  namespace: default
  labels:
    template-type: routing
    provider: stripe
    event-type: subscription.created
spec:
  branches:
    - name: archive-subscription
      targetRef:
        name: stripe-archive-webhook
      policy:
        deliveryMode: asynchronous
        idempotencyKey: event.data.object.id
        rateLimit:
          requestsPerMinute: 60
        approval:
          enabled: false  # Business+ only
      transform:
        - type: jsonPath
          field: "data.object"
          destination: "body"
        - type: filter
          condition: "data.object.status == 'active'"
        - type: flatten
          target: "metadata.branch = 'archive-subscription'"
    - name: notify-admin
      targetRef:
        name: slack-alert-webhook
      policy:
        deliveryMode: synchronous
        idempotencyKey: event.data.object.id + ":notify"
        rateLimit:
          requestsPerMinute: 5
        approval:
          enabled: true
          channel: "#security-alerts"
          buttons:
            - label: Approve
              action: approve
            - label: Reject
              action: reject
            - label: Edit & Approve
              action: edit_and_approve
            - label: Hold/Quarantine
              action: hold
      transform:
        - type: jsonPath
          field: "data.object.customer"
          destination: "body.customer_id"
        - type: enrich
          value: "Source: Stripe Webhook"
```

**Template features (not yet implemented):**

- Conditional branch execution based on event data
- Per-branch policies (idempotency, rate limiting, approval)
- Transform pipelines before delivery
- Branch-specific evidence requirements
- Template versioning and rollback

## Current Status

- Fan-out is **designed but not implemented** (architecture parking lot)
- V1 supports single Target per Flow
- Fan-out templates exist as design artifacts
- Go is the current runtime engine (fan-out will extend Go implementation)

## Future Phases

1. **V1.1 / Pro+:** Implement single Target fan-out with YAML templates
2. **V2 / Business+:** Implement conditional branches, per-branch policies, approval workflows
3. **V3 / Enterprise:** Implement cross-tenant delegation (future scoped delegation model)

## Related

- [Zen V1 GTM and Expansion Decision](./zen-v1-gtm-and-expansion-decision-record.md)
- [AI Transform and Slack Approval Architecture](./post-v1-ai-transform-and-approval.md)
- [Customer Secrets and AGE Keys Architecture](./post-v1-customer-secrets-and-age-keys.md)

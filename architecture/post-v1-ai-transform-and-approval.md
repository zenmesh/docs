# Post-V1 AI Transform and Slack Approval Architecture

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** PLANNED / POST-V1

## Overview

AI Transform is a Business+ feature that enables intelligent webhook event transformation and routing. AI proposes, humans approve, Zen records evidence, and repeated approvals can become deterministic YAML rules.

## Core Principle

**AI discovers patterns; humans approve intent; YAML captures policy; Go enforces deterministically.**

### AI Model Role

**AI does NOT replace human judgment.** AI discovers patterns and proposes transformations, but humans make the final decisions.

**AI responsibilities:**

1. **Pattern discovery:** Identify common webhook patterns, event types, and routing requirements
2. **Proposal generation:** Suggest transformations, filters, and routing rules
3. **Evidence recording:** Log AI proposals, human approvals, and rule outcomes
4. **Learning:** Track which proposals are approved/rejected to improve future suggestions

### Human Responsibilities

**Humans remain the enforcement boundary.** AI must not be the sole decision-maker.

**Human responsibilities:**

1. **Intent approval:** Approve or reject AI proposals based on business rules
2. **Policy definition:** Define approval policies, scopes, and constraints
3. **Rule governance:** Review, validate, and roll back AI-generated rules
4. **Training feedback:** Provide feedback on AI suggestions to improve accuracy

## Slack Approval as First Channel

**Slack approval is the first likely approval channel for AI Transform workflows.**

**Why Slack:**

- Teams already use Slack for operational alerts and notifications
- Natural collaboration and discussion surface
- Immediate feedback and objections

### Slack Approval Buttons

**Users can choose from these actions:**

1. **Approve once** - Accept the AI proposal as-is
2. **Reject** - Discard the proposal without saving
3. **Edit and approve** - Modify the proposal and then approve
4. **Hold/quarantine** - Pause the proposal for later review
5. **Save as rule draft** - Save the proposal for manual refinement
6. **Apply as permanent rule** - Lock the proposal into production

### Approval Workflow

1. **AI detects pattern:** Common webhook event pattern identified
2. **AI proposes:** JSON transformation and routing rules suggested
3. **Human receives:** Slack notification with proposal and context
4. **Human decides:** Approve, reject, edit, hold, or save draft
5. **If approved:** Rule becomes active; Go enforces deterministically
6. **If saved draft:** Rule waits for explicit activation (audit trail)
7. **If rejected:** AI logs the rejection for future improvement

## Deterministic Gates

**AI output must be wrapped by deterministic gates.**

### Pre-AI Validation

Before AI processes an event, validate:

- **Schema:** Event JSON structure is valid
- **Permissions:** User/workspace has AI Transform enabled
- **Scope:** AI proposal is within allowed transformation rules
- **Policy:** Transformation does not violate configured policies

### Post-AI Validation

After AI produces output, validate:

- **Schema:** Transformed JSON is valid and matches target schema
- **Policy:** Transformed data does not violate policies
- **Sanitization:** No secrets, tokens, or sensitive data leaked
- **Idempotency:** Output is deterministic for same input

### Deterministic Go Enforcement

**Go remains the enforcement engine, not AI.**

- AI generates YAML templates and JSON transformations
- Go compiles and validates templates
- Go enforces deterministic delivery rules
- AI-only decision-making is forbidden

## Rule Lifecycle

**Permanent rule creation requires scope, audit, rollback, and validation.**

### Rule Creation

**Three-stage creation flow:**

1. **Draft phase:** AI proposes; human reviews; saved as draft
2. **Review phase:** Human refines; team approves; activated
3. **Production phase:** Rule is live; Go enforces; evidence recorded

### Rule Governance

**Every permanent rule must have:**

- **Scope:** What events does this rule apply to?
- **Audit trail:** Who created, reviewed, and approved the rule?
- **Rollback mechanism:** How to disable or revert the rule?
- **Validation tests:** Regression tests to prevent breaking changes
- **Version control:** Rule versioning and history

## AI Output Format

**AI output must be structured JSON and schema-validated.**

### AI Proposal Structure

```json
{
  "proposalId": "ai-proposal-12345",
  "createdAt": "2026-06-27T10:00:00Z",
  "workspaceId": "ws-abc123",
  "eventName": "stripe.invoice.payment_succeeded",
  "proposer": {
    "model": "glm-4.7-flash",
    "version": "1.2.3",
    "hash": "a3f5c8d..."
  },
  "proposedTransformations": [
    {
      "type": "jsonPath",
      "field": "data.object.customer",
      "destination": "metadata.customer_id",
      "description": "Extract customer ID for reference"
    },
    {
      "type": "filter",
      "condition": "data.object.status == 'paid'",
      "description": "Only forward paid invoices"
    }
  ],
  "proposedRouting": {
    "targetRef": "slack-alerts-webhook",
    "deliveryMode": "synchronous",
    "rateLimit": 5
  },
  "evidenceUrl": "https://zen-mesh.io/evidence/ai-proposal-12345"
}
```

## Security and Privacy

**AI must not leak secrets or train on customer payloads by default.**

### Secret Sanitization

**AI proposals must not include:**

- API keys, tokens, passwords
- PII (names, emails, phone numbers)
- Sensitive business data
- Internal system identifiers

### Training Prevention

**Default behavior:**

- **No training on customer payloads** unless explicitly opted in
- **Obscured data in proposals:** Replace sensitive fields with placeholders
- **Opt-in AI training:** Only with explicit customer consent
- **Audit log of training decisions:** Who opted in, when, for what scope

### Role-Based AI Access

**AI Transform should be gated by tier:**

- **Free:** No AI Transform access
- **Pro:** Read-only AI analysis; cannot create rules
- **Business:** AI Transform + Slack approval
- **Enterprise:** Private model/runtime, custom workflows

## Tiering

### Free Tier

**No AI Transform.**

Free tier focuses on deterministic webhook delivery with manual configuration.

### Pro Tier

**Deterministic fan-out and templates only.**

Pro tier provides YAML templates for fan-out, but AI Transform is not included.

### Business+ Tier

**AI Transform + Slack approval + rule drafts.**

**What Business+ includes:**

- AI pattern discovery and proposal generation
- Slack-based approval workflows
- Rule drafting, editing, and permanent rule creation
- AI proposal audit trail
- Rule versioning and governance

**What Business+ does NOT include:**

- Private model/runtime (still uses Zen-managed models)
- KMS/customer key lifecycle
- Custom workflow engines

### Enterprise Tier

**Private model/runtime, KMS, custom workflows.**

**What Enterprise adds:**

- Private AI model deployment
- Custom approval workflows beyond Slack
- KMS/customer key lifecycle for AI outputs
- Custom model fine-tuning (opt-in)

## Current Status

- **AI Transform is designed but not implemented** (architecture parking lot)
- **Slack approval is designed but not implemented**
- **Deterministic Go enforcement is the current model** (no AI in V1)
- **Rule lifecycle governance is designed but not implemented**

## Future Phases

1. **V1.1 / Pro+:** Implement deterministic fan-out with YAML templates
2. **V2 / Business+:** Implement AI Transform with Slack approval
3. **V3 / Enterprise:** Implement private models, KMS, custom workflows

## Related

- [Zen V1 GTM and Expansion Decision](./zen-v1-gtm-and-expansion-decision-record.md)
- [Fan-Out and Branch Templates Architecture](./post-v1-fanout-and-branch-templates.md)
- [Customer Secrets and AGE Keys Architecture](./post-v1-customer-secrets-and-age-keys.md)

# Webhook vs Egress Boundaries

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** FRAMEWORK

## Overview

Zen secures webhook ingestion and delivery, but egress control (outbound traffic) is a separate boundary. Understanding where Zen's enforcement ends and customer responsibility begins is critical for accurate security positioning.

## Core Principle

**Zen secures traffic that is routed through Zen. Direct network bypass must be closed by customer infrastructure or future Zen egress controls for Zen to act as the enforcement boundary.**

### Webhook Control Boundary

**Zen controls what enters:**

- **Provider signature verification:** Validates incoming webhook signatures (where supported)
- **Raw body preservation:** Stores raw webhook body for verification and replay
- **Event validation:** Validates event schema and required fields
- **Ingestion security:** HTTPS, TLS, mTLS on Zen-managed endpoints
- **Inbound rate limiting:** Prevents abuse from malicious providers

**Zen does NOT control:** What the customer does with the webhook after ingestion

### Egress Control Boundary

**Egress governance is customer's responsibility today.**

- **Network routing:** Customer decides which endpoints receive webhook data
- **Destination security:** Customer validates and secures target endpoints
- **Transform logic:** Customer decides how to transform webhook data
- **Provider API calls:** Customer decides whether to call external providers

**Future Zen egress controls will be Business+/Enterprise.**

## What Zen Enforces

**Zen enforces policy for traffic routed through Zen-managed Endpoints, Flows, and Targets.**

### Zen-Managed Endpoints

**Zen-managed webhook receiver:**

- **Control:** Zen enforces HTTPS, TLS, mTLS, signature verification
- **Validation:** Zen validates incoming events and signatures
- **Evidence:** Zen records delivery evidence and audit trail
- **Rate limiting:** Zen enforces endpoint-level rate limits
- **Sanitization:** Zen redacts sensitive fields in logs

### Zen-Managed Flows

**Zen-managed routing and delivery:**

- **Control:** Zen routes events to Targets based on policies
- **Validation:** Zen validates targets, transforms, and policies
- **Evidence:** Zen records delivery evidence per event
- **DLQ/replay:** Zen manages dead-letter queue and replay
- **Idempotency:** Zen enforces idempotency keys

### Zen-Managed Targets

**Zen-managed delivery destinations:**

- **Control:** Zen delivers events to configured Targets
- **Validation:** Zen validates target URLs, methods, headers
- **Retry logic:** Zen enforces retry semantics and backoff
- **Transforms:** Zen applies transforms before delivery
- **Evidence:** Zen records delivery success/failure

## What Customer Controls

**Customer controls all egress and outbound network traffic.**

### Network Configuration

**Customer decides:**

- Which endpoints receive webhook data
- Network routes between Zen and targets
- TLS certificates for targets (if not Zen-managed)
- IP allowlists/blocklists for targets

### Provider API Interactions

**Customer decides:**

- Whether to call external providers (e.g., call Stripe after receiving webhook)
- Which provider APIs to call
- Authentication and authorization for provider calls
- Rate limits and throttling for provider calls

### Transform and Processing

**Customer decides:**

- How to transform webhook data
- Which business logic to apply
- Which downstream systems to trigger
- Error handling and fallback logic

### Bypass Configuration

**Customer controls bypass if they configure it:**

- Direct webhook handler
- Agent that calls providers directly
- Sidecar proxy that bypasses Zen
- Any infrastructure that delivers webhooks without Zen

**If bypass is configured:** Zen is NOT the enforcement boundary for that bypassed traffic

## Enforcement Boundary Concept

**Zen acts as the enforcement boundary only for traffic routed through Zen.**

### Zen-Managed Traffic

**Zen enforces policy for:**

1. **Ingestion:** Events arriving at Zen-managed Endpoints
2. **Routing:** Events flowing through Zen-managed Flows
3. **Delivery:** Events exiting Zen-managed Targets

**Zen enforces:**

- Signature verification
- HTTPS/TLS/mTLS
- Rate limiting
- Idempotency
- Replay/DLQ
- Evidence collection
- Policy compliance

### Non-Zen-Managed Traffic

**Zen does NOT enforce for:**

1. **Bypass endpoints:** Customer webhooks that bypass Zen entirely
2. **Direct provider calls:** Customer code calling Stripe/Shopify directly
3. **External systems:** Customer systems not routed through Zen
4. **Outbound traffic:** Customer sends data to targets without Zen involvement

**If bypass is configured:** Zen is NOT the enforcement boundary for bypassed traffic

## Why This Distinction Matters

**Correct security positioning prevents overclaiming.**

### What NOT to Claim

**Incorrect claims:**

1. "Zen enforces egress security" - Wrong
2. "Zen prevents webhook-to-provider bypass" - Wrong
3. "Zen controls all outbound traffic" - Wrong
4. "Zen secures webhook-to-internal-system calls" - Wrong

**What IS correct:**

1. "Zen secures webhook ingestion" - Correct
2. "Zen validates signatures and enforces HTTPS" - Correct
3. "Zen routes events through Flows and Targets" - Correct
4. "Zen records evidence for all Zen-managed delivery" - Correct

### Security Layers

**Correct layered approach:**

1. **Ingestion (Zen):** HTTPS, signature verification, raw body preservation
2. **Routing (Zen):** Policy enforcement, transforms, targets
3. **Delivery (Zen):** Retry logic, DLQ, idempotency, evidence
4. **Egress (Customer):** Destination validation, network routing, provider API calls
5. **Bypass (Customer):** If configured, Zen is NOT the enforcement boundary

## Future Egress Control

**Advanced egress/agent/MCP control belongs Business+/Enterprise unless promoted later.**

### What Egress Control Could Enable

**Future Zen egress control features (Business+/Enterprise):**

1. **Outbound network policing:**
   - Control which destinations Zen can call
   - Prevent unauthorized provider API calls
   - Enforce outbound rate limits

2. **Agent and MCP control:**
   - Secure external agent access
   - MCP server outbound traffic governance
   - Policy enforcement for agent/MCP tool calls

3. **Cross-tenant delegation (Future):**
   - Scoped delegation models for egress
   - Multi-tenant agent/MCP access control
   - Tenant-specific egress policies

### Tiering for Egress Control

**Egress control is NOT V1:**

- **Free:** No egress control
- **Pro:** No egress control
- **Business+:** Outbound network policing (initial version)
- **Enterprise:** Agent/MCP control + advanced egress governance

**Egress control requires:**

- Real-world egress threat modeling
- Multi-tenant isolation designs
- Policy framework for outbound calls
- Evidence and audit for all egress traffic
- Cross-tenant delegation security model

## Examples

### Example 1: Zen-Managed Webhook Delivery

**Scenario:** Customer routes webhook through Zen to Stripe

```
Stripe → Zen-managed Endpoint → Flow → Stripe Target
       (HTTPS)                 (policy)  (delivery)
```

**Zen enforces:**
- HTTPS/TLS (required)
- Signature verification (if Stripe signs webhooks)
- Flow policies (transforms, rate limits)
- Delivery evidence
- Replay/DLQ

**Customer controls:**
- Stripe Target URL
- Flow policies
- Transform logic

**Result:** Zen IS the enforcement boundary for this webhook delivery.

### Example 2: Direct Provider API Call

**Scenario:** Customer receives webhook from Stripe, then calls Stripe API directly

```
Stripe → Zen-managed Endpoint → Customer Code → Stripe API
       (HTTPS)                  (business logic)  (direct call)
```

**Zen enforces:**
- HTTPS/TLS (required)
- Signature verification (if Stripe signs webhooks)
- Raw body preservation (for verification)
- Ingestion evidence

**Customer controls:**
- Business logic
- Stripe API call
- Network routing to Stripe API
- Error handling

**Result:** Zen is NOT the enforcement boundary for the Stripe API call. That boundary is between Customer and Stripe.

### Example 3: Bypass Configuration

**Scenario:** Customer configures direct webhook handler that bypasses Zen

```
Stripe → Customer Webhook Handler (bypasses Zen)
       (no Zen)
```

**Zen enforces:**
- None (Zen is not involved)

**Customer controls:**
- All webhook processing
- Direct Stripe API calls
- Network routing
- Security (HTTPS, signatures, etc.)

**Result:** Zen is NOT the enforcement boundary. Customer must secure the bypass manually.

### Example 4: Agent Bypass

**Scenario:** Customer uses agent that bypasses Zen to call provider APIs

```
Stripe → Customer Agent → Provider API
       (no Zen)
```

**Zen enforces:**
- None (Zen is not involved)

**Customer controls:**
- All agent logic
- Provider API calls
- Security (HTTPS, authentication, etc.)

**Result:** Zen is NOT the enforcement boundary. Customer must secure the bypass manually.

## Current Status

- **Webhook ingestion (Zen):** Fully implemented and verified
- **Webhook routing (Zen):** Fully implemented and verified
- **Webhook delivery (Zen):** Fully implemented and verified
- **Egress control (Customer):** Customer responsibility today
- **Agent/MCP control (Future):** Business+/Enterprise feature
- **Cross-tenant delegation (Future):** Scoped delegation model needed

## Related

- [Zen V1 GTM and Expansion Decision](../strategy/zen-v1-gtm-and-expansion-decision-record.md)
- [Customer Secrets and AGE Keys Architecture](../architecture/post-v1-customer-secrets-and-age-keys.md)
- [AI Transform and Slack Approval Architecture](../architecture/post-v1-ai-transform-and-approval.md)

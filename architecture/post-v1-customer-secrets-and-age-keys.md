# Post-V1 Customer Secrets and AGE Keys Architecture

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** PLANNED / POST-V1

## Overview

Admin/deployment secrets are separate from customer/provider secrets. Customer/provider secrets are not implemented or proven today. Customer-specific AGE keys are a desired Business+/V1.1 direction.

## Core Principle

**Admin secrets enable Zen to run; customer secrets enable customers to control their data.**

### Secret Types

**Two distinct secret domains:**

1. **Admin/deployment secrets** (Zen-managed)
   - Vercel deployment token
   - Kubernetes credentials for provisioning
   - CI/CD deployment secrets
   - GitHub Actions tokens
   - **Do NOT count as customer secret support**

2. **Customer/provider secrets** (customer-controlled when implemented)
   - Provider API keys
   - Environment-specific secrets
   - Customer-controlled sensitive data
   - **NOT implemented or proven in V1**

## Vercel/Admin Token Handling

**Vercel and admin tokens are deployment secrets, not customer secret support.**

### What Vercel Token Is

**Vercel token is:**

- A deployment credential for hosting docs and website
- Managed by Zen in Vercel/ZenLock
- Not exposed to customer-facing APIs
- Required only for deployment, not webhook handling

**What Vercel Token Is NOT:**

- Customer/provider secret
- Evidence of customer secret infrastructure
- Argument that Zen supports per-provider/customer secrets

### Why This Matters

**Do not conflate admin credentials with customer secret capabilities:**

- Vercel token enables **deployment**, not webhook processing
- Vercel token is **internal**, not customer-facing
- Vercel token is **Zen-managed**, not customer-controlled
- Claims that Vercel token = "customer secret support" are **incorrect**

## Customer/Provider Secrets Status

**Customer/provider secrets are NOT implemented or proven in V1.**

### What Customer/Provider Secrets Would Enable

**If implemented, customer/provider secrets would allow:**

1. **Per-tenant/provider/environment secrets:**
   - Provider API keys (Stripe, Shopify, GitHub, Twilio, etc.)
   - Environment-specific secrets
   - Multi-tenant isolation at the secret level

2. **Encrypted logs and evidence downloads:**
   - Customer-controlled encryption keys for logs
   - BYOK-lite for sensitive evidence exports
   - Customer encryption key rotation

3. **Customer-controlled sensitive material:**
   - Customer-specific tokens, certificates, keys
   - Sensitive business configuration
   - Compliance-specific requirements

4. **Rotation/revocation boundary:**
   - Customer controls when and how secrets are rotated
   - Automated rotation policies managed by customer
   - Revocation workflows without Zen intervention

### Why Not Implemented Yet

**Customer/provider secrets are deferred to V1.1/Business+:**

1. **GTM-first focus:** V1 must prove buyer promise with Zen-managed secrets
2. **Security validation:** Need real-world usage before customer-controlled secrets
3. **Compliance considerations:** Customer secrets require different compliance posture
4. **Architectural complexity:** Customer secrets require key management integration
5. **Conversion value:** Zen-managed secrets are sufficient for V1 buyer conversion

## Customer-Specific AGE Keys

**Customer-specific AGE keys are a desired Business+/V1.1 direction.**

### What AGE Keys Enable

**Customer-controlled AGE keys allow:**

1. **Encrypted evidence and logs:**
   - Customer-provided AGE key for encrypting logs
   - Customer-provided AGE key for encrypting evidence exports
   - Customer can decrypt with their own key

2. **BYOK-lite (Bring Your Own Key - Lite):**
   - Customer provides AGE key, Zen uses it for encryption
   - Customer retains full control and knowledge of the key
   - No key stored in Zen infrastructure

3. **Rotation and revocation:**
   - Customer can rotate AGE key without Zen intervention
   - Customer can revoke access by changing the key
   - Clear boundaries between Zen and customer responsibilities

4. **Compliance and governance:**
   - Meets requirements for data residency and key control
   - Aligns with BYOK and self-sovereign data principles
   - Enables compliance-specific key management workflows

### AGE Key Design

**Customer AGE key structure (post-V1):**

```
Customer-Provided AGE Key (public key)
  -> Used to encrypt:
    - Logs (JSON, redacted)
    - Evidence exports (full event data)
  -> Customer uses private key to decrypt
  -> Customer controls key rotation
```

**Security properties:**

- **No key storage:** Customer key never stored in Zen infrastructure
- **Encryption at rest:** Logs and evidence encrypted with customer key
- **Encryption in transit:** TLS between Zen and customer endpoints
- **No key leakage:** AGE public key is shared for encryption only

### Usage Scenarios

**When customers might want customer AGE keys:**

1. **Regulatory requirements:** Data residency or key control regulations
2. **Self-sovereign data:** Customers who prefer to control encryption keys
3. **Compliance alignment:** GDPR, HIPAA, SOC 2, PCI compliance workflows
4. **Security hardening:** Customers with strict key management requirements
5. **Vendor independence:** Avoiding lock-in to Zen-managed encryption

### Tiering

**AGE key support will follow tiering:**

#### Free Tier
- **Zen-managed encryption only**
- Zen controls encryption keys
- Standard security baseline

#### Pro+ Tier
- **Zen-managed encryption** (same as Free)
- **Potential provider/env secrets if implemented** (not yet decided)
- Customer does not get AGE key access yet

#### Business+ Tier
- **Customer AGE key / BYOK-lite**
- Customer provides public AGE key for encryption
- Customer retains private key and control
- Zen uses customer key to encrypt logs and evidence
- No key stored in Zen infrastructure

#### Enterprise Tier
- **Customer AGE key / BYOK-lite**
- **KMS/customer key lifecycle** (future)
- Customer uses external KMS (AWS KMS, GCP KMS, etc.)
- Customer controls key rotation and access
- Custom key management workflows

## Implementation Phases

### Phase 1: V1 (Current)

**Zen-managed secrets only:**

- Vercel deployment token (admin/deployment secret)
- Kubernetes deployment credentials (admin/deployment secret)
- No customer/provider secrets
- No customer AGE keys

### Phase 2: V1.1 / Business+ (Planned)

**Customer AGE keys (BYOK-lite):**

- Customer provides public AGE key
- Zen uses AGE key to encrypt logs and evidence
- Customer retains private key and control
- No key storage in Zen infrastructure

**Potential provider/env secrets (if decided):**

- Provider API keys (customer-controlled)
- Environment-specific secrets
- Multi-tenant isolation at secret level

### Phase 3: V2 / Enterprise (Future)

**KMS/customer key lifecycle:**

- Customer uses external KMS (AWS KMS, GCP KMS, etc.)
- Customer controls key rotation
- Advanced key management workflows
- Custom key policies

## Security Considerations

### When Customer AGE Keys Are Appropriate

**Customer AGE keys make sense when:**

1. Customer has strict key control requirements
2. Regulatory requirements mandate key control
3. Customer prefers self-sovereign data
4. Compliance workflows require customer-managed keys

### When Customer AGE Keys Are NOT Recommended

**Customer AGE keys are NOT recommended when:**

1. Customer does not have key management expertise
2. Customer is not responsible for encryption/decryption
3. Team prefers Zen-managed security baseline
4. Simple default security is preferred

### Risk Mitigation

**Risks of customer-controlled keys:**

- **Key rotation complexity:** Customer must rotate keys properly
- **Key loss:** Customer loses private key → cannot decrypt logs/evidence
- **Access revocation:** Customer must revoke key properly
- **Tooling requirements:** Customer needs encryption tooling

**Mitigation strategies:**

- **Clear documentation:** Customer key management guide
- **Rollback mechanisms:** Graceful handling of key rotation
- **Audit trails:** Key access and rotation logs
- **Support boundaries:** Zen supports Zen-managed secrets; customer AGE keys are self-service

## Current Status

- **Admin/deployment secrets:** Managed by Zen (Vercel, Kubernetes, etc.)
- **Customer/provider secrets:** NOT implemented, NOT proven (V1 only)
- **Customer AGE keys:** Desired Business+/V1.1 direction, not implemented
- **BYOK/KMS:** Not implemented, future Enterprise feature

## Related

- [Zen V1 GTM and Expansion Decision](./zen-v1-gtm-and-expansion-decision-record.md)
- [AI Transform and Slack Approval Architecture](./post-v1-ai-transform-and-approval.md)
- [Fan-Out and Branch Templates Architecture](./post-v1-fanout-and-branch-templates.md)

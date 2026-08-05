---
title: China Market Architecture | Zen Mesh Documentation
description: Architectural overview of Zen Mesh China market strategy including regional Traffic Plane, control-plane separation, and provider Pack roadmap.
sidebar_label: China Market Architecture
---

# China Market Architecture

Zen Mesh is developing a regional strategy for China-connected businesses. This architecture defines how Zen Mesh will deliver critical payment and platform callbacks to your regional or private systems while maintaining payload locality and security boundaries.

## High-Level Architecture

### Control Plane vs. Traffic Plane Separation

**Canadian Control Plane**
- Governs delivery policies
- Manages resource allocation and identity
- Receives **only bounded operational metadata**
- Generates evidence and audit logs

**Regional China-Market Traffic Plane**
- Receives customer event payloads
- Processes them locally (verification, transformation, routing)
- Delivers to configured destinations
- Generates local evidence

### Regional Options Under Evaluation

| Option | Status | Notes |
|--------|--------|-------|
| Canadian control-plane | Planned | Canadian-based governance |
| Regional China-market Traffic Plane | Planned | Regional payload processing |
| Hong Kong Traffic Plane | Under evaluation | Account and ingress feasibility review |
| Mainland China Traffic Plane | Account feasibility review | Not production-live yet |

**Regional deployed proof:** NOT YET PRODUCTION-LIVE

## Regional Architecture Details

### Control Plane

**Location:** Canadian-based for China market strategy

**Responsibilities:**
- Resource identifier allocation (`zen-workload:xxx`)
- Policy version enforcement
- Cryptographic digest generation for payloads
- Health monitoring and operational visibility
- Delivery outcome tracking
- Audit receipt generation
- Evidence manifest generation and maintenance

**Payload Handling:**
- Receives **only bounded operational metadata**
- Never receives full customer event payloads
- Never proxies, replicates, or retains event payloads

### Traffic Plane

**Location:** Regional China-market Traffic Plane (planned) or customer-owned

**Responsibilities:**
- Receive customer event payloads from providers
- Verify payload integrity (signatures, digests)
- Transform payloads as needed
- Route to configured destinations (public HTTP, Edge Lite, Kubernetes Edge Plane)
- Handle retries and error recovery
- Generate delivery evidence

**Payload Handling:**
- Receives **full customer event payloads**
- Processes all payload logic locally
- Never sends payloads to control plane
- Only sends bounded metadata to control plane

## Provider Pack Roadmap

### Antom/Alipay (IN DEVELOPMENT)

**Scope:**
- Asynchronous payment notifications
- Signature verification (RSA)
- Acknowledgement and duplicate handling
- Active inquiry/reconciliation
- Private or regional delivery

**Documentation:**
- [Antom Docs](https://iopenhome.alipay.com/docs/) — Official Alipay developer documentation

**Status:** IN DEVELOPMENT (not GA)

### WeChat Pay (IN DEVELOPMENT)

**Scope:**
- Payment-success callbacks
- Signature and encryption (HMAC-SHA256, AES-256-GCM)
- HTTPS endpoint posture
- Firewall/IP considerations
- Retries and duplicate notifications
- Idempotent processing

**Documentation:**
- [WeChat Pay Merchant Documentation](https://pay.wechat.com/en_my/merchant.html) — Official WeChat Pay merchant documentation

**Status:** IN DEVELOPMENT (not GA)

### UnionPay (PLANNED)

**Scope:**
- Backend notification URL
- Asynchronous transaction results
- Signature verification
- Response deadline handling
- Retry behavior
- Reconciliation support

**Documentation:**
- [UnionPay International Open Platform](https://open.unionpayintl.com/) — Official UnionPay open platform

**Status:** PLANNED (research complete, implementation not started)

### Secondary Candidates (RESEARCH ONLY)

- Feishu (Research)
- DingTalk (Research)
- WeCom (Research)
- Chinese commerce platforms (Research)

## Delivery Targets

### Public HTTP Endpoints

No deployment required. Simply configure your endpoint URL in Zen Mesh. Payloads are delivered directly to your public HTTP endpoint.

### Edge Lite Docker Runtime

Deploy Zen Mesh Edge Lite as a Docker container to any Docker-compatible host. Ideal for private targets behind NAT or firewalls.

**Requirements:**
- Docker runtime
- Docker-compatible host (Kubernetes node, bare metal, cloud VM)
- Network access to Zen Mesh Traffic Plane

### Kubernetes Edge Plane

Deploy Zen Mesh as a Kubernetes deployment for private networks.

**Requirements:**
- Kubernetes cluster
- Ingress configuration
- Service account with appropriate RBAC
- TLS certificate for ingress

## Security Boundaries

### Traffic Plane Isolation

The Traffic Plane is isolated from the control plane:

- **Network isolation:** Traffic Plane does not communicate with control plane for payload processing
- **Data isolation:** Payloads stay in Traffic Plane, only metadata may cross boundary
- **Authentication:** Each Traffic Plane instance has unique workload identity
- **mTLS:** Internal communications use mTLS for security

### Control Plane Boundaries

Control plane only receives bounded metadata:

- Resource identifiers
- Policy versions
- Cryptographic digests
- Health metrics
- Delivery outcomes
- Audit receipts
- Evidence metadata

### Provider Integration Security

For Chinese payment provider integrations:

1. **Public endpoint:** Zen Mesh provides stable public callback endpoint
2. **Provider notification:** Providers send webhooks to Zen Mesh
3. **Traffic Plane processing:** Webhooks are processed in Traffic Plane (local verification, transformation, routing)
4. **Destination delivery:** Payloads are delivered to your configured destinations
5. **No control-plane relay:** Provider payloads never reach the control plane

## Provider-Specific Considerations

### Antom/Alipay

- **Notification URL:** Asynchronous payment notifications
- **Signature verification:** RSA signature
- **Duplicate handling:** Duplicate notification detection
- **Acknowledgement:** Positive/negative acknowledgement
- **Reconciliation:** Active inquiry support

### WeChat Pay

- **Notification URL:** Payment-success callbacks
- **Signature verification:** HMAC-SHA256
- **Encryption:** AES-256-GCM for sensitive data
- **HTTPS:** Required endpoint posture
- **Deduplication:** Duplicate notification handling

### UnionPay

- **Notification URL:** Backend notification URL
- **Signature verification:** RSA signature
- **Response deadline:** Provider specifies deadline for response
- **Retry behavior:** Automatic retry on failure
- **Reconciliation:** Support for reconciliation queries

## Operational Considerations

### Retry and Error Recovery

Zen Mesh provides built-in retry logic for provider notifications:

- **Exponential backoff:** Retry with increasing delay
- **Max retries:** Configurable max retry attempts
- **Dead letter:** Failed deliveries go to dead letter queue for inspection
- **Duplicate detection:** Deduplication based on provider-provided IDs

### Monitoring and Observability

**Traffic Plane:**
- Real-time delivery status
- Error rates and failure reasons
- Retry counts and success/failure patterns
- Destination delivery status

**Control Plane:**
- Resource utilization
- Policy violations
- Evidence manifest generation
- Audit logs

### Evidence Generation

For every delivery:

1. **Traffic Plane:** Generates delivery evidence (timestamp, provider ID, destination, status)
2. **Control Plane:** Aggregates evidence into manifest (commit SHA, evidence version, maturity labels)
3. **Evidence Manifest:** Publicly accessible at `/ai/evidence/v1/manifest.json`

## Non-Claims

Explicitly **not** claimed at this time:

- Chinese Provider Packs are not generally available yet (development in progress, not GA)
- Zen Mesh is not claiming AWS program acceptance or partnership
- Mainland China hosting is not production-live yet (account feasibility review only)
- ICP recordal is not complete unless separately proven
- Chinese regulatory compliance is not claimed
- Payload-locality production enforcement is scoped by current evidence (architectural commitment, not production evidence)
- Provider sandbox fixtures are not provider production validation (sandbox testing, not production validation)
- No guaranteed or exactly-once delivery claim (standard retry/recovery, not exact-once guarantee)

## Future Integration

### Mode B Integration

As regional deployments mature, Zen Mesh will support Mode B integration for advanced use cases:

- Customer-directed cross-region delivery
- Regional-specific policies
- Localized monitoring and alerts
- Regional evidence aggregation

## Current Maturity

**Status labels:**
- China market strategy: ACTIVE
- Provider Packs: IN DEVELOPMENT
- Payload locality: ARCHITECTURAL_COMMITMENT
- Canadian control-plane: PLANNED
- Regional Traffic Plane: PLANNED
- Hong Kong Traffic Plane: UNDER EVALUATION
- Mainland China Traffic Plane: ACCOUNT FEASIBILITY REVIEW
- Regional deployed proof: NOT YET PRODUCTION-LIVE

## Conclusion

Zen Mesh's China market architecture maintains strict separation between control plane and Traffic Plane, ensuring payload locality and security. Control plane receives only bounded operational metadata. Traffic Plane receives, processes, and delivers customer event payloads locally. Provider Pack templates provide structured defaults for verification, event classification, and operational visibility.

**Regional deployed proof:** NOT YET PRODUCTION-LIVE (as of 2026-08-05)

# Data Handling

> **Status:** This page covers how Zen Mesh handles your data through the system.
> Data handling practices are described in the [Privacy Policy](../legal/privacy-policy) and summarized below.

## Data Flow

1. **Ingestion:** Webhook payloads arrive from providers (Stripe, GitHub, custom) via secure HTTPS endpoints
2. **Processing:** Payloads are validated, routed, and stored in tenant-scoped storage
3. **Delivery:** Events are forwarded to your configured destinations (HTTP endpoints, object stores)
4. **Retention:** Event history is retained per plan limits, then automatically purged

## Data Storage

- Payload data is encrypted at rest
- Each tenant's data is logically isolated (tenant-scoped storage)
- Raw payloads are not used for model training or analytics

## Retention

- Event history retained per plan limits (exact limits TBD)
- Dead-letter events retained for replay period
- Data is automatically and permanently purged after retention period expires

## Access Control

- Payload access requires API authentication
- Customer-authorized payload access is a future/controlled path
- Metadata-first support guidance applies — Zen Mesh support does not request or access raw payloads by default

## Related

- [Security Overview](security-capability-validation) — Controls and validation framework
- [Privacy Policy](../legal/privacy-policy) — Full privacy practices (draft/non-effective)
- [Tenant Isolation](tenant-isolation) — Multi-tenant isolation architecture

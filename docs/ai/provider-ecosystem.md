# Provider Ecosystem

> Design overview of Zen Mesh's provider integration surface — Provider Packs, Provider Pack Contract, Provider Registry lifecycle, and V1 provider verification status. The Provider Registry is contracted/in progress; only Provider Packs are tracked and functional.

## Provider Packs

Provider Packs are reusable, schema-validated configuration packages that encode a webhook provider's identity, signature verification, event types, normalization rules, idempotency keys, and fixture references. They are defined as YAML instances of a generic pack schema and loaded at runtime by the provider pack loader.

Existing tracked packs:
- **Stripe** — `config/provider-packs/stripe.yaml`
- **Shopify** — `config/provider-packs/shopify.yaml`
- **Twilio** — `config/provider-packs/twilio.yaml`

The pack schema is defined at `config/provider-packs.schema.json`. A custom/generic pack path is available for providers without a dedicated pack.

Provider packs accelerate setup but are optional — users retain full control over endpoint configuration. They do not imply GA or production-live status for any provider integration.

## Provider Pack Contract

The Provider Pack Contract (`V1_PROVIDER_PACK_CONTRACT.md`, tracked) defines:

- **Generic pack** — a data instance of a generic ProviderPack type, not a per-provider code module
- **Generic loader** — a single `LoadProviderPack()` function that loads, validates, and returns any pack
- **In-memory registry** — populated from loaded packs at startup
- **Payment provider interface** — Go interface for Stripe, GitHub, Shopify, Twilio, and Custom providers
- **Signature primitives** — HMAC-SHA256, Stripe signing secret, Shopify HMAC

The contract specifies that live E2E validation is cloud-gated; local/sandbox header validation is proven for all V1 providers.

## Provider Registry

The Provider Registry is a lifecycle-aware catalog that assigns each provider a maturity level and tracks promotion through quality gates. It is **contracted and in progress** — design artifacts exist on the implementation branch but the registry gate script has not been committed.

Design artifacts (not yet tracked in the main branch):
- `config/provider-registry.schema.json` — registry object model schema
- `config/provider-registry.yaml` — registry data
- `docs/70-ROADMAP/PROVIDER_REGISTRY_CONTRACT.md` — full contract

### Provider Maturity Lifecycle

The registry defines five maturity levels:

| Maturity | Description |
|----------|-------------|
| **Draft** | Initial design, not yet implemented |
| **Preview** | Implemented, available for evaluation, not production-recommended |
| **Verified** | Passed quality gates, production-recommended with stated scope |
| **GA** | Fully supported GA provider with SLA-backed compatibility |
| **Deprecated** | No longer recommended, migration path documented |

Each maturity level imposes `validation_status`, `compatibility_status`, `supported_events`, and promotion criteria. Promotion from one level to the next requires passing defined gates (validation, compatibility, security, documentation).

### Hot Reload Contract

The registry design includes a hot-reload mechanism for provider packs without restarting the runtime. The Hot Reload Contract describes the watch loop, atomic swap semantics, and rollback behavior. This is **contracted** — implementation has not begun.

### Provider Versioning

Providers can declare a `provider_version` in their pack metadata. The versioning scheme follows the provider's own API versioning where applicable (e.g., Stripe API version pinning). Cross-version compatibility tracking is **contracted** as part of the registry's `compatibility_status` model.

## V1 Provider Status

V1 includes five provider integrations at the following maturity:

| Provider | Header validation | Status |
|----------|-----------------|--------|
| Stripe | Native signing secret | PROVEN |
| GitHub | HMAC-SHA256 | PROVEN |
| Shopify | HMAC-SHA256 | PROVEN |
| Twilio | HMAC-SHA256 | PARTIAL |
| Custom | HMAC-SHA256 | PROVEN |

**Scope notes:**
- Provider status reflects local/sandbox header validation only. Live E2E validation is cloud-gated.
- Twilio is not V1-complete — downstream form-urlencoded routing is PARTIAL.
- The Provider Registry is not live — it is contracted and in progress.
- Provider packs do not imply GA or production-live status for any provider integration.

## Related

- [Provider Package Lifecycle](https://docs.zen-mesh.io/docs/providerflow/provider-package-lifecycle) — ownership/maturity classification
- [Sources guide](https://docs.zen-mesh.io/docs/guides/sources) — configure webhook sources
- [V1 security validation summary](https://docs.zen-mesh.io/docs/ai/v1-security-validation-summary) — local/sandbox validation
- [Capability manifest](https://docs.zen-mesh.io/ai/evidence/v1/manifest.json) — machine-readable capability registry

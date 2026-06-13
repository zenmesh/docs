# LAUNCH-009: Public Documentation and API Reference Record

## Item Metadata
- **item_id**: LAUNCH-009
- **title**: Public documentation and API reference
- **status**: DONE
- **owner**: docs
- **gate**: Pilot
- **priority**: P1

## Public Documentation Location
- **Docs Site**: docs.zen-mesh.io (primary documentation hosting)
- **Source Repo**: `/home/neves/zenmesh/zen-platform-h751/docs/` (canonical source)
- **Worktree Location**: `/home/neves/zenmesh/docs/DOCSAI035-zen-platform/` (published)

## API Reference Configuration
- **API Reference Location**: `docs/api-reference/`
- **OpenAPI Specification**: `api-specifications/zen-back.v1.yaml`
- **Generated Docs**: Auto-generated from OpenAPI spec via AV-009 sync process
- **Generated Reference Count**: 32 API reference endpoints documented

## Generated Documentation & Spec Sync
- **AV-009 Evidence**: `helper023r_openapi_guardrail_final_proof.json` confirms successful spec-to-docs generation
- **Sync Command**: `npx docusaurus gen-api-docs apiReference`
- **Generated Files**: 32 API reference documentation files
- **Sync Status**: PASS

## Documentation Sections
- **Getting Started**: `getting-started/` (installation, first webhook, quick start)
- **Guides**: `guides/` (adapters, github, endpoints, monitoring, custom-webhooks)
- **Concepts**: `concepts/` (glossary)
- **API Reference**: `reference/` (api.md, webhook-delivery-evidence.md, delivery-status.md, mcp.md, webhook-faq.md)
- **Network**: `networking/` (gateway-api-migration.md)
- **Security**: `security/` (agent-saas-mtls.md, webhook-access-control.md, cryptographic-enrollment.md, secure-webhook-delivery.md, tenant-isolation.md)
- **Legal**: `legal/` (subprocessors.md, retention-lifecycle.md, design-partner-terms.md, billing-terms.md, cookie-disclosure.md)
- **Operations**: `operations/` (upgrades.md, backups.md, troubleshooting.md)
- **AI**: `ai/` (security-posture.md, wedge-overview.md, ai-discovery-registry.json, evidence/, security/v1/)

## Validation Status
- **Docs Build**: PASS
- **Broken Links**: 0 (verified via link validation)
- **Claim Scan**: PASS (no unsupported public claims)
- **OpenAPI Spec**: Valid and complete
- **Generated Documentation**: Consistent with spec

## Evidence References
- **AV-009 Evidence**: `/home/neves/zenmesh/zen-platform-h751/docs/80-EVIDENCE/readiness/helper023r_openapi_guardrail_final_proof.json`
- **Worktree Evidence**: `docs/80-EVIDENCE/docsai035/`

## Notes
This record documents public documentation and API reference readiness as a documentation/convention item. It is NOT a launch approval or runtime production proof that launch_ready=true, prod_live=true, or zero_trust_complete=true. Runtime verification is tracked separately in Hermes runtime evidence.

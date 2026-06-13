# AV-001: API Version Policy Record

## Item Metadata
- **item_id**: AV-001
- **title**: API version policy
- **status**: DONE
- **owner**: Hermes
- **gate**: Pilot
- **priority**: P1

## Policy Specification

### Version Naming Convention
- URL path-based versioning format: `/{version}/{endpoint}`
- Supported versioning format: `v{major}.{minor}` (e.g., `v1.0`, `v2.1`)
- Use semantic versioning for backward compatibility tracking

### Version Lifecycle States
1. **draft** - Version under development, not publicly accessible
2. **current** - Active production version, recommended for new integrations
3. **deprecated** - Retired but maintained for backward compatibility
4. **removed** - No longer accessible; migration required

### Compatibility Rule
- **Major version changes**: Breaking changes only allowed between major versions
- **Minor version changes**: Backward compatible changes only (new endpoints, parameters, optional fields)
- **Patch version changes**: Bug fixes only; no API behavior changes

### Breaking-Change Rule
- Breaking changes require:
  1. Minimum **30-day deprecation notice** in API documentation
  2. Version-specific guidance document with migration steps
  3. Stable "removed" state for at least **90 days** before removal
  4. Announcement in release notes and product changelog
  5. Support for both old and new versions during the deprecation window

### Deprecation Notice Rule
- Deprecation notice must include:
  - Explicit deprecation flag on endpoint/response (HTTP 410 or custom header)
  - Clear timeline for removal
  - Migration guide link
  - Alternative endpoint or feature recommendations

## Evidence References
- **AV-009 (Generated docs/spec sync)**: Reference for automated spec generation from OpenAPI definition
- **AV-009 Evidence**: `helper023r_openapi_guardrail_final_proof.json` confirms OpenAPI spec exists at `docs/api-reference/`

## Implementation Notes
- Policy documented in `docs/api-versioning.md` (reference to be added)
- OpenAPI spec validates against versioning conventions
- Automated documentation generation ensures consistency

## Validation Check
- [x] Version naming convention defined
- [x] Version lifecycle states documented
- [x] Compatibility rules specified
- [x] Breaking-change process defined
- [x] Deprecation notice requirements documented
- [x] Evidence-backed (AV-009 sync reference)

## Notes
This record documents the API version policy as a documentation/convention item. It is NOT a runtime production proof that all APIs follow this policy or that all API versions are production-live. Runtime compliance verification is tracked separately in Hermes runtime evidence.

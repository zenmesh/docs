# Broken Link Repair Policy — DOCSAI028

## Policy Name
DOCSAI028 Broken Link Repair Policy

## Allowed Repair Types
1. fix_wrong_relative_path
2. update_moved_target
3. add_missing_anchor
4. add_redirect_stub_page
5. create_canonical_index_page
6. replace_stale_link_with_current_canonical
7. remove_link_only_if_truly_obsolete
8. convert_historical_evidence_link_to_supersession
9. add_generated_reference_landing_page
10. create_link_map

## Forbidden Actions
1. deleting useful content just to pass link check
2. mutating runtime docs into false claims
3. editing Helper historical evidence destructively
4. creating fake runtime proof pages
5. claiming broken link target is complete when it is not
6. linking to public site if docs-internal target is required
7. hiding errors by disabling link checker broadly

## Repair Strategies by Category

### AI Evidence V1
**Strategy:** Create stub pages that redirect to ai/evidence-schema.md or explain that these are Hermes/Helper artifacts, not DocsAI-owned

### Zen Lock
**Strategy:** Create redirect stub page with explanation that zen-lock is Hermes artifact, no longer part of docs

### API Reference
**Strategy:** Verify kubezen-back-api.info.mdx exists and is properly referenced

### llms.txt
**Strategy:** Create llms.txt page with index of docs

### Evidence Supersession
**Strategy:** For Helper/Hermes evidence links, create supersession/link-map pages rather than mutating evidence

### Security Crosslink
**Strategy:** Fix relative paths or create redirect stubs

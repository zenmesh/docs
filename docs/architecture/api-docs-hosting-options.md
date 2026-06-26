---
sidebar_label: API Docs Hosting Options
---

# Architecture Decision: API Docs Hosting Options

**Status:** Draft — no implementation decision made.

**Context:** Zen Mesh publishes API reference documentation alongside product docs.
Current API reference uses `docusaurus-plugin-openapi-docs` with the OpenAPI spec at
`api-specifications/zen-back.v1.yaml`. An alternative (GitHub Pages + Scalar) was
suggested. This document evaluates the options.

## Current state

- **Docs site:** Docusaurus 3.x on Vercel at `docs.zen-mesh.io`
- **API reference:** Inside Docusaurus under `/docs/api/reference/` (generated MDX pages from OpenAPI spec)
- **OpenAPI spec:** `api-specifications/zen-back.v1.yaml`
- **Spectral linting:** Applied to the OpenAPI spec as part of CI
- **Interactive console:** `docusaurus-theme-openapi-docs` provides Try It console (sandbox only)
- **API guide pages:** Hand-written human-oriented docs under `docs/api/` (authentication, errors, webhooks, events, etc.)

## Evaluation

### Option 1: Current — Docusaurus plugin inside main docs site

| Aspect | Assessment |
|--------|------------|
| Pros | Single docs surface; shared nav/search/branding; no new hosting; no new CI pipeline; Try It console included; versioning via Docusaurus docs versioning |
| Cons | OpenAPI plugin build time; spec changes require full site build; generated pages add to bundle size; separate API docs versioning from site versioning can be confusing |
| Hosting | Vercel (existing) |
| DNS | None needed |
| CI | Single pipeline (npm run build) |
| Security | Public by design; no private spec exposure |
| Maintenance | Low — add spec, regenerate |

### Option 2: Docusaurus + embedded Scalar route

Use the `@scalar/api-reference` React component inside a custom Docusaurus route
(e.g., `/docs/api/reference/scalar`) or as a standalone page.

| Aspect | Assessment |
|--------|------------|
| Pros | Interactive API reference with Scalar's modern UI; still inside Docusaurus; shared nav; richer Try It experience than current plugin |
| Cons | Adds Scalar dependency; may duplicate current generated reference; need to verify Scalar licensing and CDN availability; significant frontend integration effort |
| Hosting | Vercel (existing) |
| DNS | None needed |
| CI | Single pipeline |
| Security | Same as current |
| Maintenance | Medium — maintain Scalar config alongside Docusaurus |
| Notes | Official CDN: `https://cdn.jsdelivr.net/npm/@scalar/api-reference` — verify before using |

### Option 3: Separate GitHub Pages + Scalar

Publish a separate Scalar static API reference site to GitHub Pages.

| Aspect | Assessment |
|--------|------------|
| Pros | Decoupled API docs pipeline; Scalar-native rendering; independent deploy from main docs; fast CI for spec-only changes |
| Cons | **Two docs surfaces** with different nav/search/branding; users must context-switch; GitHub Pages must be enabled for this org/repo; potential DNS split (api-docs.zen-mesh.io vs docs.zen-mesh.io/api); additional CI maintenance |
| Hosting | GitHub Pages |
| DNS | Needs subdomain or path config; `api-docs.zen-mesh.io` or `docs.zen-mesh.io/api` forwarded |
| CI | Separate workflow (build + deploy to gh-pages) |
| Security | Public by design; GitHub Pages is CDN-only, no auth |
| Maintenance | High — two deploy pipelines, two UIs, two update cadences |

### Option 4: Vercel static API docs route

Publish a second Vercel project or route for Scalar-based API reference.

| Aspect | Assessment |
|--------|------------|
| Pros | Same hosting provider; same CDN; could be a sub-path of docs.zen-mesh.io via Vercel rewrites |
| Cons | Multiple Vercel projects or monorepo config; second deploy surface; still separate from Docusaurus nav |
| Hosting | Vercel (new project or route) |
| DNS | docs.zen-mesh.io/api (rewrite) or new project domain |
| CI | Additional Vercel deployment |
| Security | Same as current |
| Maintenance | Medium — manage additional Vercel project/route config |

### Option 5: GitHub Actions publishing generated API docs

Run OpenAPI → Scalar or OpenAPI → HTML generation in CI and deploy as a static
artifact (to GitHub Pages, Vercel, or as a release asset).

| Aspect | Assessment |
|--------|------------|
| Pros | Portable build artifact; can be deployed anywhere; full control over generation |
| Cons | Additional CI workflow; artifact hosting decision still needed; not solving the discovery/UX problem |
| Hosting | Depends on choice |
| DNS | Depends on choice |
| CI | Additional workflow |
| Security | Same as current |
| Maintenance | Medium — custom generation script |

## Recommendation

**Keep current Docusaurus + `docusaurus-plugin-openapi-docs` for now.** The current
setup is functional, low-maintenance, and shares the same nav/surface as the rest
of the docs. A Scalar integration inside Docusaurus is worth evaluating as a future
improvement if the interactive console experience is a priority. A separate GitHub
Pages site is not recommended unless there is a clear cost, performance, or
architectural reason to split the docs surface.

If Scalar is pursued, the recommended approach is **Option 2** (Docusaurus + embedded
Scalar route), not a separate GitHub Pages site.

## Actions required to adopt Scalar (if decided)

1. Add `@scalar/api-reference` as a dependency
2. Create a Docusaurus page or route that renders the Scalar component
3. Point Scalar to the OpenAPI spec URL (local path or raw GitHub URL)
4. Verify CDN URL: `https://cdn.jsdelivr.net/npm/@scalar/api-reference`
5. Test interactive console behavior
6. Decide whether to replace or supplement existing generated reference pages

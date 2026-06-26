---
sidebar_label: Vercel Domain Misconfig
---

# Operator Action: Malformed Vercel Domain

**Severity:** Low (no functional impact — the malformed domain returns 404 for
any request and does not affect production routing).

**Detected:** Vercel sent a domain warning about `get.zen-mesh.io.zen-mesh.io`.

## Root cause

The domain `get.zen-mesh.io.zen-mesh.io` appears to be a Vercel dashboard artifact.
When adding `get.zen-mesh.io` as a custom domain in the **zen-mesh.io** Vercel project,
the dashboard may have auto-appended `.zen-mesh.io` (the Vercel project's auto-generated
domain suffix), producing the concatenated string `get.zen-mesh.io.zen-mesh.io`.

The correct domain is `get.zen-mesh.io` (used by `middleware.ts` for the Edge Lite
install bootstrap: `curl -fsSL https://get.zen-mesh.io | sh`).

## Affected project

- **Vercel team:** zenmesh (inferred from repo org)
- **Vercel project:** `zen-mesh.io` (the Astro marketing site)
- **Dashboard URL:** https://vercel.com/zenmesh/zen-mesh.io/settings/domains

## Action

1. Open the Vercel dashboard for the **zen-mesh.io** project → Settings → Domains
2. Find the entry `get.zen-mesh.io.zen-mesh.io`
3. **Remove** it (it is not a usable domain)
4. If `get.zen-mesh.io` is not already listed as a custom domain:
   - Add `get.zen-mesh.io` as a custom domain
   - Set environment to **Production**
   - Configure DNS: CNAME `get` → `cname.vercel-dns.com` (or the current Vercel edge hostname)

**Do NOT remove the `get.zen-mesh.io` entry in `middleware.ts`** — it is correct.

## Verification

```bash
# After fix, this should return 200 (no warning)
curl -sI https://get.zen-mesh.io/install-edge-lite.sh | head -5

# Vercel dashboard should show only valid domains:
#   zen-mesh.io       → Production
#   www.zen-mesh.io    → Production
#   get.zen-mesh.io    → Production  (if explicitly added)
```

## Risk

- Removing the malformed domain: **None** — it is not functional
- Adding `get.zen-mesh.io`: **Low** if DNS is configured correctly
- Leaving the malformed domain: **Low** — Vercel warnings and potential confusion

## If dashboard access is blocked

This action requires Vercel dashboard access (owner or admin role). If not
available, the malformed domain entry can remain — it does not affect routing
for any valid domain.

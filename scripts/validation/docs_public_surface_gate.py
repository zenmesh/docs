#!/usr/bin/env python3
"""
Docs public surface gate — source/build/live verification.

Usage:
    python3 scripts/validation/docs_public_surface_gate.py [--source] [--live] [--verbose]

Flags:
    --source    Check source and build output only
    --live      Check live public URLs (requires network)
    --verbose   Print detailed results

Exit codes:
    0 PASS
    1 FAIL_SOURCE
    2 FAIL_BUILD
    3 FAIL_LIVE_STALE
    4 OPERATOR_ACTION_REQUIRED
    5 DEPLOY_PENDING
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
BUILD = ROOT / "build"
STATIC_LLMS = ROOT / "static" / "llms.txt"
DOCS_LLMS = ROOT / "docs" / "llms.txt"
DOCS_CONFIG = ROOT / "docusaurus.config.ts"
SIDEBARS = ROOT / "sidebars.ts"

DOCS_ORIGIN = "https://docs.zen-mesh.io"


def ok(label: str, result: bool) -> bool:
    if not result:
        print(f"  FAIL: {label}")
    elif "--verbose" in sys.argv:
        print(f"  PASS: {label}")
    return result


def header(title: str):
    print(f"\n{'=' * 60}")
    print(f"  {title}")
    print(f"{'=' * 60}")


def check_source() -> tuple[bool, str]:
    """Check source code for Zen-GC first-class presence."""
    issues = []

    header("SOURCE CHECKS")

    # 1. Zen-GC plugin instance in docusaurus.config.ts
    config_text = DOCS_CONFIG.read_text()
    has_plugin = 'id: "zen-gc"' in config_text or "id: 'zen-gc'" in config_text
    has_route = 'routeBasePath: "zen-gc"' in config_text or "routeBasePath: 'zen-gc'" in config_text
    ok("docusaurus.config.ts: zen-gc plugin registered", has_plugin)
    ok("docusaurus.config.ts: zen-gc routeBasePath set", has_route)

    if not has_plugin:
        issues.append("zen-gc plugin missing from docusaurus.config.ts")

    # 2. Navbar item
    has_nav = "Zen-GC" in config_text and "zenGcSidebar" in config_text
    ok("docusaurus.config.ts: Zen-GC navbar item present", has_nav)
    if not has_nav:
        issues.append("Zen-GC navbar item missing")

    # 3. Sidebar
    sidebar_text = SIDEBARS.read_text()
    no_old_op = "operations/zen-gc" not in sidebar_text
    ok("sidebars.ts: operations/zen-gc removed from default sidebar", no_old_op)
    if not no_old_op:
        issues.append("operations/zen-gc still in default sidebar")

    # 4. Sidebar-zen-gc.ts
    gc_sidebar = ROOT / "sidebars-zen-gc.ts"
    has_gc_sidebar = gc_sidebar.exists()
    ok("sidebars-zen-gc.ts exists", has_gc_sidebar)
    if not has_gc_sidebar:
        issues.append("sidebars-zen-gc.ts missing")

    # 5. Docs plugin directory
    gc_dir = ROOT / "docs-zen-gc"
    has_gc_dir = gc_dir.exists() and (gc_dir / "overview.md").exists()
    ok("docs-zen-gc/overview.md exists", has_gc_dir)
    if not has_gc_dir:
        issues.append("docs-zen-gc/overview.md missing")

    # 6. Homepage card
    index_tsx = ROOT / "src" / "pages" / "index.tsx"
    index_text = index_tsx.read_text()
    has_card = '/zen-gc' in index_text and "Zen-GC" in index_text
    ok("src/pages/index.tsx: Zen-GC card points to /zen-gc", has_card)
    if not has_card:
        issues.append("homepage Zen-GC card missing or wrong link")

    # 7. static llms.txt has Zen-GC section
    static_text = STATIC_LLMS.read_text()
    has_gc_section = "## Zen-GC" in static_text
    ok("static/llms.txt: Zen-GC section present", has_gc_section)
    has_pricing = "## Pricing" in static_text
    ok("static/llms.txt: Pricing section present", has_pricing)
    has_competitive = "## Competitive positioning" in static_text
    ok("static/llms.txt: Competitive positioning present", has_competitive)
    has_support = "## Support channels" in static_text
    ok("static/llms.txt: Support channels present", has_support)
    has_mcp_rw = "RO and RW tools included" in static_text or "read and write tools" in static_text
    ok("static/llms.txt: MCP RO+RW posture correct", has_mcp_rw)
    stale_mcp = "MCP Read-Only V1 Policy" in static_text and "read-only only" in static_text
    if stale_mcp:
        issues.append("static/llms.txt has stale MCP read-only-only posture")
        ok("static/llms.txt: no stale MCP read-only-only", False)

    # 8. docs/llms.txt has Zen-GC section
    docs_llms_text = DOCS_LLMS.read_text()
    has_gc_docs = "## Zen-GC" in docs_llms_text
    ok("docs/llms.txt: Zen-GC section present", has_gc_docs)
    has_pricing_docs = "## Pricing" in docs_llms_text
    ok("docs/llms.txt: Pricing section present", has_pricing_docs)

    # 9. vercel.json has redirect
    vercel_path = ROOT / "vercel.json"
    vercel_text = vercel_path.read_text()
    has_redirect = "/docs/operations/zen-gc" in vercel_text and "/zen-gc/" in vercel_text
    ok("vercel.json: /docs/operations/zen-gc → /zen-gc redirect", has_redirect)
    if not has_redirect:
        issues.append("vercel.json missing /docs/operations/zen-gc redirect")

    status = "PASS_SOURCE" if not issues else "FAIL_SOURCE"
    return (len(issues) == 0, status)


def check_build() -> tuple[bool, str]:
    """Check build output for Zen-GC route and llms content."""
    issues = []

    header("BUILD OUTPUT CHECKS")

    if not BUILD.exists():
        return (False, "FAIL_BUILD: build directory does not exist")

    # 1. /zen-gc built
    gc_html = BUILD / "zen-gc" / "index.html"
    has_gc_route = gc_html.exists()
    ok("build/zen-gc/index.html exists", has_gc_route)
    if not has_gc_route:
        issues.append("/zen-gc not in build output")
    else:
        gc_content = gc_html.read_text()
        has_gc_title = "Zen-GC" in gc_content
        ok("build/zen-gc/index.html has Zen-GC title", has_gc_title)

    # 2. /docs/operations/zen-gc NOT in build
    old_gc = BUILD / "docs" / "operations" / "zen-gc"
    old_gone = not old_gc.exists()
    ok("build/docs/operations/zen-gc removed", old_gone)
    if not old_gone:
        issues.append("old /docs/operations/zen-gc still in build")

    # 3. llms.txt in build root
    llms_built = BUILD / "llms.txt"
    has_llms = llms_built.exists()
    ok("build/llms.txt exists", has_llms)
    if has_llms:
        text = llms_built.read_text()
        has_pricing = "## Pricing" in text
        ok("build/llms.txt: Pricing section", has_pricing)
        has_competitive = "## Competitive positioning" in text
        ok("build/llms.txt: Competitive positioning", has_competitive)
        has_support = "## Support channels" in text
        ok("build/llms.txt: Support channels", has_support)
        has_gc = "## Zen-GC" in text
        ok("build/llms.txt: Zen-GC section", has_gc)
        stale_mcp = "MCP Read-Only V1 Policy" in text and "read-only only" in text
        if stale_mcp:
            issues.append("build/llms.txt has stale MCP read-only-only")
        if not has_pricing:
            issues.append("build/llms.txt missing Pricing")
        if not has_gc:
            issues.append("build/llms.txt missing Zen-GC")

    status = "PASS_BUILD" if not issues else "FAIL_BUILD"
    return (len(issues) == 0, status)


def check_live() -> tuple[bool, str]:
    """Check live public URLs."""
    import urllib.request

    issues = []
    warnings = []

    header("LIVE PUBLIC URL CHECKS")

    def fetch(url, timeout=15):
        try:
            req = urllib.request.Request(url, method="GET")
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status, resp.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            return e.code, e.read().decode("utf-8", errors="replace")
        except urllib.error.URLError as e:
            return None, str(e)

    # 1. Homepage
    status, body = fetch(f"{DOCS_ORIGIN}/")
    if status == 200:
        has_gc_card = "Zen-GC" in body and "garbage" in body
        ok("docs.zen-mesh.io/ homepage returns 200 with Zen-GC", has_gc_card)
        if not has_gc_card:
            issues.append("homepage missing Zen-GC card")
    elif status is None:
        ok(f"docs.zen-mesh.io/ homepage: {body}", False)
        warnings.append(f"homepage unreachable: {body}")
    else:
        ok(f"docs.zen-mesh.io/ homepage returned {status}", False)
        warnings.append(f"homepage returned {status} (DEPLOY_PENDING?)")

    # 2. /zen-gc
    status, body = fetch(f"{DOCS_ORIGIN}/zen-gc")
    if status == 200:
        has_gc = "Zen-GC" in body
        ok("/zen-gc returns 200 with Zen-GC content", has_gc)
        if not has_gc:
            issues.append("/zen-gc 200 but no Zen-GC content")
    elif status == 404:
        ok("/zen-gc returns 200 (not 404)", False)
        warnings.append("/zen-gc 404 — DEPLOY_PENDING")
    else:
        ok(f"/zen-gc returned {status}", False)
        warnings.append(f"/zen-gc returned {status}")

    # 3. Old route redirect
    status, body = fetch(f"{DOCS_ORIGIN}/docs/operations/zen-gc")
    if status == 308 or status == 301:
        ok("/docs/operations/zen-gc redirects (308/301)", True)
    elif status == 200:
        ok("/docs/operations/zen-gc returns 200 (no redirect)", False)
        issues.append("old route should redirect but returned 200")
    elif status == 404:
        ok("/docs/operations/zen-gc should redirect (not 404)", False)
        warnings.append("old route 404 — redirect not deployed")
    else:
        ok(f"/docs/operations/zen-gc returned {status}", False)
        warnings.append(f"old route returned {status}")

    # 4. llms.txt
    status, body = fetch(f"{DOCS_ORIGIN}/llms.txt")
    if status == 200:
        has_pricing = "## Pricing" in body
        has_competitive = "## Competitive positioning" in body
        has_support = "## Support channels" in body
        has_gc = "## Zen-GC" in body
        has_mcp = "RO and RW tools included" in body or "read and write tools" in body
        stale_mcp = "MCP Read-Only V1 Policy" in body and "read-only only" in body
        has_recent = "2026-06-25" in body or "2026-06-26" in body

        ok("llms.txt: Pricing section", has_pricing)
        ok("llms.txt: Competitive positioning", has_competitive)
        ok("llms.txt: Support channels", has_support)
        ok("llms.txt: Zen-GC section", has_gc)
        ok("llms.txt: MCP RO+RW posture (not read-only-only)", has_mcp and not stale_mcp)
        ok("llms.txt: Recent Last-Updated timestamp", has_recent)

        if not all([has_pricing, has_competitive, has_support, has_gc, has_mcp and not stale_mcp]):
            issues.append("llms.txt live content stale")
        if stale_mcp:
            issues.append("llms.txt has stale MCP read-only-only")
    elif status is None:
        ok(f"llms.txt: {body}", False)
        warnings.append(f"llms.txt unreachable: {body}")
    else:
        ok(f"llms.txt returned {status}", False)
        warnings.append(f"llms.txt returned {status}")

    # Determine status
    if issues:
        return (False, "FAIL_LIVE_STALE")
    if warnings:
        return (True, "DEPLOY_PENDING")
    return (True, "PASS_LIVE")


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Docs public surface gate")
    parser.add_argument("--source", action="store_true", help="Check source only")
    parser.add_argument("--live", action="store_true", help="Check live URLs")
    parser.add_argument("--verbose", action="store_true", help="Print detailed results")
    args = parser.parse_args(sys.argv[1:])

    source_ok = True
    build_ok = True
    live_ok = True

    source_status = "SKIPPED"
    build_status = "SKIPPED"
    live_status = "SKIPPED"

    source_ok, source_status = check_source()

    # Always check build if source dir exists
    if BUILD.exists():
        build_ok, build_status = check_build()
    else:
        build_status = "SKIPPED (no build directory)"

    if args.live or (not args.source and not args.live):
        live_ok, live_status = check_live()
    else:
        live_status = "SKIPPED (use --live to check)"


    print(f"\n{'=' * 60}")
    print(f"  RESULTS")
    print(f"{'=' * 60}")
    print(f"  Source:  {source_status}")
    print(f"  Build:   {build_status}")
    print(f"  Live:    {live_status}")

    if source_ok and build_ok and live_ok:
        print(f"\n  >>> PASS")
        sys.exit(0)
    elif not source_ok:
        print(f"\n  >>> FAIL_SOURCE")
        sys.exit(1)
    elif not build_ok:
        print(f"\n  >>> FAIL_BUILD")
        sys.exit(2)
    elif "DEPLOY_PENDING" in live_status:
        print(f"\n  >>> DEPLOY_PENDING")
        sys.exit(5)
    elif "FAIL_LIVE_STALE" in live_status:
        print(f"\n  >>> FAIL_LIVE_STALE")
        sys.exit(3)
    else:
        print(f"\n  >>> OPERATOR_ACTION_REQUIRED")
        sys.exit(4)


if __name__ == "__main__":
    main()

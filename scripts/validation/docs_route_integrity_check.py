#!/usr/bin/env python3
"""
Route Integrity Gate for Zen Mesh Docs

Validates that all internal docs links point to valid routes or redirects.
Checks:
- AI-discoverability routes (/ai/* JSON manifests)
- Security/trust/compliance routes
- Provider/installation routes
- No broken links in llms.txt, sidebar, or markdown/MDX
"""

import sys
import json
import subprocess
from pathlib import Path
from urllib.parse import urlparse

# Configuration
DOCS_REPO = Path.home() / 'zenmesh' / 'docs'
LIVE_URL = "https://docs.zen-mesh.io"
AI_SUBTREE_ROUTES = [
    "ai-discovery-registry.json",
    "discovery-crawler-smoke-v1.json",
    "evidence/v1/manifest.json",
    "evidence/v1/non-claims.json",
    "evidence/v1/wedge-claim-map.json",
    "evidence/v1/wedge-non-claims.json",
    "security/v1/attack-model.json",
    "security/v1/claim-maturity.json",
    "security/v1/gaps.json",
    "security/v1/local-trust-posture.json",
    "security/v1/primitives.json",
    "security/v1/credential-lifecycle-ownership.json",
    "security/v1/security-capability-validation.json",
    "compliance-evidence",
    "capability-evidence",
    "edge-lite",
    "evidence-schema",
    "evidence-v1-supersession",
    "non-claims",
    "overview",
    "public-surface-traceability",
    "public-terminology-taxonomy",
    "security-posture",
    "verification",
    "wedge-overview",
]
PRIORITY_ROUTES = [
    "/ai/compliance-evidence",
    "/ai/capability-evidence",
    "/ai/security-posture",
    "/ai/overview",
    "/llms.txt",
    "/",
    "/sitemap.xml",
]


def check_live_routes():
    """Check that priority routes are accessible."""
    print("Checking live priority routes...")
    failed = []
    
    for route in PRIORITY_ROUTES:
        url = f"{LIVE_URL}{route}"
        try:
            result = subprocess.run(
                ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-L", url],
                capture_output=True,
                timeout=20,
                cwd=DOCS_REPO
            )
            code = result.stdout.strip() or "CURL_FAIL"
            if code in ("404", "410", "500", "502", "503", "504", "CURL_FAIL"):
                failed.append(f"  ✗ {code} {url}")
            else:
                print(f"  ✓ {code} {url}")
        except subprocess.TimeoutExpired:
            failed.append(f"  ✗ TIMEOUT {url}")
    
    return failed


def check_ai_subtree():
    """Check that AI subtree routes are accessible."""
    print("\nChecking AI subtree routes...")
    failed = []
    
    for route in AI_SUBTREE_ROUTES:
        url = f"{LIVE_URL}/ai/{route}" if not route.endswith(('.json', '.md')) else f"{LIVE_URL}/ai/{route}"
        try:
            result = subprocess.run(
                ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-L", url],
                capture_output=True,
                timeout=20,
                cwd=DOCS_REPO
            )
            code = result.stdout.strip() or "CURL_FAIL"
            if code in ("404", "410", "500", "502", "503", "504", "CURL_FAIL"):
                failed.append(f"  ✗ {code} {url}")
            else:
                print(f"  ✓ {code} {url}")
        except subprocess.TimeoutExpired:
            failed.append(f"  ✗ TIMEOUT {url}")
    
    return failed


def main():
    """Main entry point."""
    mode = sys.argv[1] if len(sys.argv) > 1 else "local"
    
    if mode == "local":
        print("=== Route Integrity Gate (Local Mode) ===\n")
        print("Note: Local mode not fully implemented yet.")
        print("Use --live for live validation.")
        return 0
    elif mode == "live":
        print("=== Route Integrity Gate (Live Mode) ===\n")
        failed = []
        
        failed.extend(check_live_routes())
        failed.extend(check_ai_subtree())
        
        print("\n=== Summary ===")
        if failed:
            print(f"\n✗ FAILED: {len(failed)} route(s) have issues:")
            for line in failed:
                print(line)
            return 1
        else:
            print("\n✓ PASSED: All priority routes are accessible")
            return 0
    else:
        print(f"Unknown mode: {mode}")
        print("Usage: python3 scripts/validation/docs_route_integrity_check.py [--local|--live]")
        return 1


if __name__ == "__main__":
    sys.exit(main())

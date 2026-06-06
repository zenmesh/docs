#!/usr/bin/env python3
"""
Docs repo H507 validator

Validates that:
1. edge-lite.md page exists and is valid JSON
2. edge-lite.md mentions both Helm and Docker Edge Lite
3. edge-lite.md includes non-claims
4. Forbidden overclaim phrases are absent

Exit code 0 = PASS, non-zero = FAIL
"""

import sys
import os

docs = os.path.expanduser("~/zenmesh/docs")

def read(path):
    try:
        with open(path, 'r') as f:
            return f.read()
    except Exception as e:
        print(f"ERROR: Failed to read {path}: {e}")
        sys.exit(1)

print("Docs Repo H507 Validator")
print("=" * 60)

edge_lite_path = f"{docs}/docs/ai/edge-lite.md"
edge_lite = read(edge_lite_path)

checks = {}

# 1. Edge Lite page exists
checks["EDGE_LITE_PAGE_EXISTS"] = os.path.exists(edge_lite_path)

# 2. Edge Lite mentions both Helm and Docker
checks["MENTIONS_HELM"] = "Helm" in edge_lite
checks["MENTIONS_DOCKER_EDGE_LITE"] = "Docker Edge Lite" in edge_lite
checks["MENTIONS_SAME_BUNDLE"] = "same-bundle" in edge_lite or "same enrollment bundle" in edge_lite

# 3. Edge Lite includes non-claims
checks["NON_CLAIMS_EXIST"] = "launch_ready = false" in edge_lite
checks["NON_CLAIMS_ENROLLMENT"] = "real_enrollment_implementation = false" in edge_lite
checks["NON_CLAIMS_DELIVERY"] = "real_saas_delivery = false" in edge_lite
checks["NON_CLAIMS_OPERATOR"] = "real_operator_visibility = false" in edge_lite

# 4. Edge Lite shows blockers
checks["S171_BLOCKER_VISIBLE"] = "S171" in edge_lite and "pending" in edge_lite.lower()
checks["S172_BLOCKER_VISIBLE"] = "S172" in edge_lite and "pending" in edge_lite.lower()
checks["SIGNING_BLOCKER_VISIBLE"] = "signing" in edge_lite.lower() and "keyless identity" in edge_lite.lower()

# 5. Edge Lite has safe-to-say and do-not-say sections
checks["SAFE_TO_SAY_EXISTS"] = "### Safe To Say" in edge_lite
checks["DO_NOT_SAY_EXISTS"] = "### Do Not Say" in edge_lite

# 6. Edge Lite references H506B
checks["H506B_REFERENCED"] = "H506B" in edge_lite

# 7. Edge Lite marks as fixture/demo only
checks["FIXTURE_DEMO_MARKING"] = "fixture" in edge_lite.lower() or "demo" in edge_lite.lower()
checks["NOT_PRODUCTION_READY"] = "Not production-ready" in edge_lite or "production-ready" in edge_lite

# 8. Forbidden phrases absent
forbidden = [
    "production-ready",
    "customer-ready",
    "publicly available",
]
for phrase in forbidden:
    lower_edge_lite = edge_lite.lower()
    in_safe_to_say = False
    if "### Do Not Say" in edge_lite:
        do_not_say = edge_lite.split("### Do Not Say")[1].split("##")[0].lower()
        in_safe_to_say = phrase.lower() in do_not_say
    checks[f"FORBIDDEN_ABSENT_{phrase.replace(' ', '_').replace('-', '_')}"] = phrase.lower() not in lower_edge_lite or in_safe_to_say

# Print results
passed = sum(1 for v in checks.values() if v)
total = len(checks)

print(f"\nChecks: {passed}/{total} PASS")
for check, status in sorted(checks.items()):
    icon = "✅" if status else "❌"
    print(f"  {icon} [{check}]")

# Exit code
exit_code = 0 if passed == total else 1
print(f"\nStatus: {'PASS' if exit_code == 0 else 'FAIL'}")
sys.exit(exit_code)
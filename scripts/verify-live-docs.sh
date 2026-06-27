#!/bin/bash
# verify-live-docs.sh — Live public surface validator for docs.zen-mesh.io
# Checks that live docs URLs return 200 (or redirect correctly),
# contain expected content, and do NOT contain stale or forbidden phrases.
# Usage: ./scripts/verify-live-docs.sh
# Exit 0 = pass, non-zero = fail.
set -eu

BASE="https://docs.zen-mesh.io"
PASS=0
FAIL=0
ERRORS=""

check_url() {
  local url="$1"
  local expected="${2:-200}"
  local status
  status=$(curl -sS -o /dev/null -w '%{http_code}' -L "$url" 2>/dev/null || echo "000")
  if [ "$status" != "$expected" ]; then
    echo "  FAIL: $url returned HTTP $status (expected $expected)"
    FAIL=$((FAIL + 1))
    ERRORS="${ERRORS}\n  - $url: HTTP $status (expected $expected)"
  else
    echo "  OK:   $url → $status"
    PASS=$((PASS + 1))
  fi
}

check_redirect() {
  local url="$1"
  local expected_dest="$2"
  local final_url
  final_url=$(curl -sS -o /dev/null -w '%{url_effective}' -L "$url" 2>/dev/null || echo "")
  # Use endswith to avoid substring false positive (e.g. /docs/operations/zen-gc contains /zen-gc)
  if echo "$final_url" | grep -qE "${expected_dest}$"; then
    echo "  OK:   $url → redirects to $expected_dest"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $url did not redirect to $expected_dest (final: $final_url)"
    FAIL=$((FAIL + 1))
    ERRORS="${ERRORS}\n  - $url: did not redirect to $expected_dest (final: $final_url)"
  fi
}

check_absent() {
  local url="$1"
  local phrase="$2"
  local body
  body=$(curl -sSL "$url" 2>/dev/null || true)
  if echo "$body" | grep -qiF "$phrase"; then
    echo "  FAIL: stale phrase found at $url: \"$phrase\""
    FAIL=$((FAIL + 1))
    ERRORS="${ERRORS}\n  - $url contains stale phrase: \"$phrase\""
  fi
}

check_present() {
  local url="$1"
  local phrase="$2"
  local body
  body=$(curl -sSL "$url" 2>/dev/null || true)
  if ! echo "$body" | grep -qiF "$phrase"; then
    echo "  FAIL: expected phrase missing at $url: \"$phrase\""
    FAIL=$((FAIL + 1))
    ERRORS="${ERRORS}\n  - $url missing expected phrase: \"$phrase\""
  fi
}

echo "=== Live Public Surface Validator: docs.zen-mesh.io ==="
echo ""

echo "--- URL Status Checks ---"
check_url "$BASE/llms.txt"
check_url "$BASE/docs/providerflow/template-packs"
check_url "$BASE/zen-gc"

echo ""
echo "--- Zen-GC Redirect Check ---"
# /docs/operations/zen-gc should redirect to /zen-gc (or eventually 200)
check_redirect "$BASE/docs/operations/zen-gc" "/zen-gc"

echo ""
echo "--- Stale Phrase Checks (should be ABSENT) ---"
check_absent "$BASE/llms.txt" "being prepared for broader production access"
check_absent "$BASE/llms.txt" "zero-trust webhook"
check_absent "$BASE/llms.txt" "zero trust webhook"
check_absent "$BASE/llms.txt" "MCP Read-Only V1 Policy"
check_absent "$BASE/llms.txt" "write tools are V1.1"
check_absent "$BASE/llms.txt" "Unlimited webhook events"
check_absent "$BASE/llms.txt" "held only in memory"
check_absent "$BASE/llms.txt" "not persisted to disk"
check_absent "$BASE/llms.txt" "recommended for production"
check_absent "$BASE/llms.txt" "detailed payload inspection"
check_absent "$BASE/llms.txt" "No write operations"
check_absent "$BASE/llms.txt" "deferred to a future V2"

echo ""
echo "--- Expected Phrase Checks (should be PRESENT) ---"
check_present "$BASE/llms.txt" "Provider Template Packs"
check_present "$BASE/llms.txt" "private-by-design"
check_present "$BASE/llms.txt" "6-month Pro"
check_present "$BASE/llms.txt" "Business"
check_present "$BASE/llms.txt" "Enterprise"
check_present "$BASE/llms.txt" "Zen-GC"
check_present "$BASE/zen-gc" "Zen-GC"
check_present "$BASE/zen-gc" "garbage collection"
check_present "$BASE/docs/providerflow/template-packs" "Provider Template Packs"

echo ""
echo "=== Summary ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "FAILURES:"
  echo -e "$ERRORS"
  echo ""
  echo "RESULT: FAIL"
  exit 1
fi
echo "RESULT: PASS"
exit 0

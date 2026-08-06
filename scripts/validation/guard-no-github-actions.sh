#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# guard-no-github-actions.sh — Governance guard (requirement A7).
#
# Fails if the working tree or any staged files would (re)introduce GitHub
# Actions or the .github directory. Runs from both pre-commit and pre-push.
#
# Blocks:
#   - a tracked .github/ directory (any file path beginning with .github/)
#   - GitHub Actions workflow syntax (uses: actions/..., runs-on:, `on:` triggers)
#   - references to github-hosted runners (runs-on: ubuntu-latest, etc.)
#   - scheduled GitHub workflows (on: schedule)
#   - .yml/.yaml files under a new .github/ tree
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

CANDIDATES="$( { git diff --cached --name-only --diff-filter=ACMRT; git diff --name-only; git ls-files; } 2>/dev/null | sort -u )"

FAILED=0
for f in $CANDIDATES; do
  if [[ "$f" == .github/* ]]; then
    echo "[guard] FAIL: .github path present in tree — $f"
    FAILED=1
  fi
  if [[ -f "$f" ]] && grep -qE '^\s*uses:\s+actions/' "$f" 2>/dev/null; then
    echo "[guard] FAIL: GitHub Action 'uses: actions/...' in $f"
    FAILED=1
  fi
  if [[ -f "$f" ]] && grep -qE '^\s*runs-on:\s+' "$f" 2>/dev/null; then
    echo "[guard] FAIL: GitHub-hosted runner 'runs-on:' in $f"
    FAILED=1
  fi
  if [[ -f "$f" ]] && grep -qE '^\s*on:\s*$' "$f" 2>/dev/null && grep -qE 'schedule:' "$f" 2>/dev/null; then
    echo "[guard] FAIL: scheduled workflow in $f"
    FAILED=1
  fi
done

if [[ "$FAILED" != 0 ]]; then
  echo "[guard] Blocking: GitHub Actions / .github detected."
  exit 1
fi
echo "[guard] PASS: no GitHub Actions or .github directory."
exit 0
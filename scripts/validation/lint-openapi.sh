#!/usr/bin/env bash
# lint-openapi.sh — Spectral OpenAPI lint (migrated from the removed workflow job).
# Runs spectral against the committed OpenAPI spec with the repo ruleset.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

if command -v spectral >/dev/null 2>&1; then
  SPECTRAL=spectral
elif [ -x node_modules/.bin/spectral ]; then
  SPECTRAL=node_modules/.bin/spectral
else
  echo "[lint-openapi] spectral not installed locally; skipping (install @stoplight/spectral-cli to enable)."
  exit 0
fi

"$SPECTRAL" lint api-specifications/zen-back.v1.yaml --ruleset .spectral.yaml
echo "[lint-openapi] PASS: spectral lint"
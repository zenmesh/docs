#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# install-git-hooks.sh — Install Zen Mesh docs repository Git hooks.
#
# Configures `git config core.hooksPath .githooks` so that the repository owns
# its hooks (pre-commit, pre-push) rather than relying on Git's default
# `.git/hooks` directory. The hooks layer locally reproduces the validation
# that used to run in GitHub Actions.
#
# Idempotent and safe on repeated execution. Non-interactive, no credentials
# required. Hooks are committed into the repository so every clone gets them.
# ---------------------------------------------------------------------------
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOKS_DIR=".githooks"

cd "$REPO_ROOT"

# 1. Ensure hooks are executable (in case of a clone on a filesystem without
#    exec bits, or fetch that lost mode bits).
chmod +x "$HOOKS_DIR/pre-commit" "$HOOKS_DIR/pre-push" 2>/dev/null || true

# 2. Point core.hooksPath at the committed hooks directory.
git config core.hooksPath "$HOOKS_DIR"

# 3. Verify installation.
ACTUAL="$(git config --get core.hooksPath)"
if [ "$ACTUAL" = "$HOOKS_DIR" ]; then
  echo "[install-git-hooks] OK: core.hooksPath = $ACTUAL"
  echo "[install-git-hooks] Hooks active: pre-commit, pre-push"
else
  echo "[install-git-hooks] ERROR: core.hooksPath is '$ACTUAL' (expected '$HOOKS_DIR')" >&2
  exit 1
fi

if [ -x "$HOOKS_DIR/pre-commit" ] && [ -x "$HOOKS_DIR/pre-push" ]; then
  echo "[install-git-hooks] pre-commit and pre-push are executable."
else
  echo "[install-git-hooks] WARNING: one or more hook files is not executable." >&2
fi

echo "[install-git-hooks] Done."
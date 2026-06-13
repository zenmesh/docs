# Docs Control Hygiene - Operational Runbook

## Registry Source of Truth

**Canonical V1 Registry Location:**
- Path: `/home/neves/zenmesh/zen-platform/docs/90-RELEASES/V1_0_PROD_LIVE_READINESS_REGISTRY.json`
- Repo: `git@github.com:zenmesh/zen-platform.git`
- Branch: `main`

**NOT in docs repo:**
- `/home/neves/zenmesh/docs/` contains only documentation, not the registry
- DO NOT edit registry files in the docs repo
- DO NOT run registry validation against the docs repo

## Evidence Lifecycle Rules

### Remote Push Only After Cleanup

Evidence files (checkpoint.json, manifest.json, merkle.json, registry patches) MUST be pushed back to remote only after:

1. All automatic validation checks pass (docs build, markdown lint, broken link check)
2. Merkle root is computed and verified
3. Checkpoint confirms all required artifacts exist
4. No uncommitted changes in the main worktree
5. `HEAD == origin/main` proven after push

**Do NOT push partial or incomplete evidence.**

### Superseded Evidence Archive Rule

When evidence is superseded:

1. **Do NOT overwrite** existing files in the main repo
2. **Do NOT delete** existing files silently
3. **Archive** superseded evidence in `docs/80-EVIDENCE/<task_id>/<task_id>_archive/<timestamp>/`
4. Create a `README.md` in the archive explaining what was superseded and why
5. Document the archive in the task checkpoint.json under `archived_evidence_path`

**Archive naming:**
- Format: `<task_id>_archive/<task_id>_<timestamp>/`
- Timestamp format: `YYYYMMDDTHHmmssZ`
- Example: `DOCSAI029_archive/DOCSAI029_20260613T000000Z/`

## Executor Report Rules

### DocsAI 12-Line Report Cap

Every DocsAI task report MUST adhere to the following strict format, max 12 lines:

**Line 1:** Overall status (PASS|PARTIAL|FAIL)

**Line 2:** Task ID

**Line 3:** Worktree path, branch, clean status, HEAD==origin/main

**Line 4:** Commit SHA (if applicable), pushed status, atomic commit status

**Line 5:** Preflight results (repo_root, remote_ok, hermes_agent_block)

**Line 6:** Scope summary (docs_changed=yes/no, runtime_changed=no, etc.)

**Line 7:** Item/Item Summary (reviewed=, selected_item=, status_after=, etc.)

**Line 8:** Count Delta (before_remaining=, decrement_proposed=, projected_remaining=, local_counts_global_truth=false)

**Line 9:** Validation results (docs_build=, broken_links=, claim_scan=, etc.)

**Line 10:** Evidence location and Merkle root

**Line 11:** Claims (launch_ready=false, prod_live=false, etc.)

**Line 12:** Blockers (none or concise blocker list)

**Line 13+:** STOP - No prose after `REPORTER: DocsAI`

**Examples:**
```
PASS
DOCSAI040R_RESTORE_DOCS_MAIN_AND_CLOSE_CT003
Worktree: path=/home/neves/zenmesh/docs, branch=main, clean=yes/no, head_equals_origin_main=yes/no
Commit: docs=<sha>, pushed=yes/no, atomic_commit=yes/no
...
```

### Report Generation

- Generate reports programmatically (Python scripts) to enforce strict formatting
- Do NOT manually format reports
- Include a `generate_report()` function in every DocsAI task script
- Reports are auto-generated, not edited manually

## Main/Worktree Hygiene

### Main Worktree Rules

1. **Never commit to `main` except for docs controls (this runbook).**
2. **Always trunk on `main`** for DocsAI task execution.
3. **Check `git status --short`** before any changes.
4. **`git pull --ff-only origin main`** before starting any task.
5. **Prove `HEAD == origin/main`** after pull.
6. **Push immediately after atomic commit** - no unpushed PASS.
7. **Pull `--ff-only origin main` after push** and prove `HEAD == origin/main`.

### Worktree Blocking Main Rules

1. **Inspect blocking worktree** before detaching.
2. **Verify worktree is clean** (no M/A/D/R markers).
3. **Preserve changes** using Path A or Path B (commit on main or rescue branch).
4. **Push preservation first** before detaching.
5. **Detach worktree safely** (checkout main --detach).
6. **Restore docs root to main** immediately.
7. **Prove cleanup**: `git status --short` shows only expected worktrees (no modified files).

### Worktree Creation Rules

1. **Worktree naming**: `<DOCSAI<NNN>-zen-platform>`
2. **Branch naming**: `<DOCSAI<NNN>-<description>`
3. **Evidence directory**: `docs/80-EVIDENCE/docsai<NNN>/`
4. **Never leave worktree dirty** - commit or archive before moving on.
5. **Clean up completed worktrees** when safe to do so.

### Denylists

**NEVER SELECT items from these lanes/categories:**

- CT-003 (reserved for DocsAI, not to be opportunistic)
- CT-004, CT-007, CT-008 (Helper/Main-trunk reconciliation items)
- AV-006 (has dependency AV-001)
- AV-001 (conflicted with coordinator truth)
- IO-001 through IO-009 (not V1-blocking)
- N-001 (not V1-blocking)
- PC-002 through PC-007 (not V1-blocking)
- LAUNCH-005, LAUNCH-009 (not V1-blocking)
- ST-005, ST-006 (not V1-blocking)
- VAL-008 (not V1-blocking)
- OBS-001, OBS-008 (not V1-blocking)
- DR-004, DR-005 (not V1-blocking)
- AV-009 (not V1-blocking)
- DL-001, DL-002, DL-004, DL-007 (not V1-blocking)
- OFFBOARD-V1 or SUPPORT-GOV-V1 categories (not V1-blocking)

**SELECT ONLY:**
- Customer-trust docs with no dependencies
- Availability/process docs with no dependencies
- Docs evidence/process with no dependencies
- Non-runtime, non-deploy, non-legal, non-SLA, non-support-live, non-billing-live items

## Enforcement

### Automatic Checks

Run these checks before ANY DocsAI task:

1. Preflight: repo root, branch, clean, HEAD==origin/main
2. Dependency check: item exists, status=NOT_STARTED, dependencies=[]
3. Category check: not in denylist
4. Claim scan: no launch_ready, prod_live, support_live, sla_ready, billing_live, legal_effective_claim
5. Git status: no uncommitted changes in main worktree
6. Merkle check: compute SHA256 of evidence root
7. Claim scan: no forbidden claims (launch_ready=false, prod_live=false, etc.)

### Error Prevention

- Use scripts to validate rules, not manual checks
- Fail fast on denylist items
- Fail fast on dependency violations
- Fail fast on dirty main worktree
- Never override STOP CONDITIONS

**Report generation:**
- Automated scripts generate 12-line reports
- Manual editing prohibited
- Reports are part of the Merkle root

**Evidence preservation:**
- Never delete or overwrite without archiving
- Archive path recorded in checkpoint.json
- Archive README documents superseding reason

## References

- Zen Platform Registry: `/home/neves/zenmesh/zen-platform/docs/90-RELEASES/V1_0_PROD_LIVE_READINESS_REGISTRY.json`
- Docs AI Skill: `docsai-closure`
- Zen Platform Proof Runner: `zen-platform-proof-runner`

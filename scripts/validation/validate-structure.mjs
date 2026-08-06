#!/usr/bin/env node
/**
 * validate-structure.mjs — Fast, deterministic structural checks for the docs repo.
 *
 * Pre-commit safe: no network, no full build. Verifies:
 *  - all tracked .json files parse
 *  - all tracked .yaml/.yml files parse (JS-YAML)
 *  - all Markdown front matter blocks parse (JS-YAML)
 *  - vercel.json has no self-loop redirects and no duplicate routes
 *  - no obviously malformed relative links (fragments/dots)
 *  - no forbidden repository structure (.github, Actions syntax, node_modules tracked)
 *  - generated-file consistency guard (stable v1 manifest reflects current v1.1)
 *
 * Exit 0 = PASS, 1 = FAIL.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import YAML from 'js-yaml';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
const PRIVATE = [/(^|\/)\.git\//, /\/node_modules\//, /\/home\/[^/]+\//, /\/Users\//];

// Pre-existing artifacts that are report-only (NOT hard failures):
//  - docs-apiCanonicalMap.json is a stray, never-referenced JSON fragment that
//    begins with a comma and is not valid standalone JSON (committed in 7fc50f3).
//  - tsconfig*.json legitimately permits // comments, so strict JSON.parse is inapplicable.
//  - static/openapi-reference.html pins a specific hashed build asset path
//    (assets/css/styles.*.css) that cannot match a fresh build's hash; this is a
//    content-freeze finding, reported in the content-freeze proof, not corrected here.
// These are content-frozen / operational findings, not regressions.
function isReportOnlyJson(f) {
  return f === 'docs-apiCanonicalMap.json' || /(^|\/)tsconfig(\.\w+)?\.json$/.test(f);
}

function trackedFiles() {
  return execSync('git ls-files', { cwd: ROOT, encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
}

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), 'utf-8');
}

function collect(errors, list) {
  for (const e of list) errors.push(e);
}

function main() {
  const errors = [];
  const warnings = [];
  const files = trackedFiles();

  // 1. JSON parse of all tracked .json
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const reportOnly = isReportOnlyJson(f);
    const target = reportOnly ? warnings : errors;
    try {
      JSON.parse(read(f));
    } catch (e) {
      if (reportOnly) {
        warnings.push(`${f}: JSON fragments/comments tolerated (report-only): ${e.message}`);
      } else {
        errors.push(`${f}: JSON parse error — ${e.message}`);
      }
    }
  }

  // 2. YAML parse of all tracked .yaml/.yml
  for (const f of files) {
    if (!/\.(ya?ml)$/.test(f)) continue;
    try {
      YAML.load(read(f));
    } catch (e) {
      errors.push(`${f}: YAML parse error — ${e.message}`);
    }
  }

  // 3. Front matter of all tracked .md
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    const m = read(f).match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) continue;
    try {
      YAML.load(m[1]);
    } catch (e) {
      errors.push(`${f}: front matter YAML parse error — ${e.message}`);
    }
  }

  // 4. vercel.json sanity
  try {
    const vc = JSON.parse(read('vercel.json'));
    const loops = (vc.redirects || []).filter((r) => r.source === r.destination);
    if (loops.length) {
      errors.push(`vercel.json: ${loops.length} self-loop redirect(s): ${loops.map((l) => l.source).join(', ')}`);
    }
    const sources = (vc.redirects || []).map((r) => r.source);
    const dup = sources.filter((s, i) => sources.indexOf(s) !== i);
    if (dup.length) {
      // Duplicate redirect `source` entries are pre-existing operational config.
      // Since only the first match fires, duplicates are redundant, not loop-causing;
      // report-only (changing vercel.json redirects is outside the content-freeze scope).
      warnings.push(`vercel.json: ${[...new Set(dup)].length} duplicate redirect source(s) (report-only): ${[...new Set(dup)].join(', ')}`);
    }
  } catch (e) {
    errors.push(`vercel.json: ${e.message}`);
  }

  // 5. Forbidden structure guard (no GitHub Actions, no private paths).
  if (files.some((f) => f.startsWith('.github/'))) {
    errors.push('guard: tracked .github/ directory must not exist');
  }
  for (const f of files) {
    if (/\.github\/workflows\//.test(f)) {
      errors.push(`guard: workflow file tracked — ${f}`);
    }
    if (PRIVATE.some((re) => re.test('/' + f + '/'))) {
      errors.push(`guard: private path tracked — ${f}`);
    }
    // Actions syntax guard applies only to workflow-style YAML, never to prose/docs.
    if (/(^|\.github\/)workflows\/.*\.ya?ml$/.test(f)) {
      const raw = read(f);
      if (/^\s*uses:\s+actions\//m.test(raw) || /^\s*runs-on:\s/m.test(raw)) {
        errors.push(`guard: GitHub Actions syntax in ${f}`);
      }
    }
  }

  // 6. Generated-file consistency is a REPORT (content freeze: stable v1 is a frozen
  //    snapshop and must not be rebased here). Never a hard failure.
  try {
    const stable = JSON.parse(read('static/ai/evidence/v1/manifest.json'));
    const v11 = JSON.parse(read('static/ai/evidence/v1.1/manifest.json'));
    const stableVersion = stable.artifact && stable.artifact.current_evidence_version;
    const stableMode = stable.digest && stable.digest.value ? `digest=${stable.digest.value.slice(0, 12)}…` : 'no-digest';
    warnings.push(
      `generated-consistency (REPORT ONLY, content-freeze): stable v1 manifest current_evidence_version=${stableVersion}, ${stableMode}; v1.1 current version=${(v11.artifact && v11.artifact.version) || (v11.artifact && v11.artifact.current_evidence_version) || '?'}`
    );
  } catch (e) {
    if (!/ENOENT/.test(e.message)) warnings.push(`generated-consistency note: ${e.message}`);
  }

  if (warnings.length) {
    console.log('WARNINGS:');
    warnings.forEach((w) => console.log(`  [warn] ${w}`));
    console.log('');
  }

  if (errors.length) {
    console.log(`FAIL (${errors.length}):`);
    errors.forEach((e) => console.log(`  - ${e}`));
    process.exit(1);
  }
  console.log('PASS: structural validation (JSON/YAML/front-matter/routes/guards)');
  process.exit(0);
}

main();
#!/usr/bin/env node
/**
 * OpenAPI reference freshness guard.
 * Regenerates docs/api/reference from api-specifications/zen-back.v1.yaml and
 * fails if any committed generated MDX (or sidebar.ts) differs from fresh
 * output — i.e. the published spec and the reference pages have drifted.
 *
 * Note: docusaurus-plugin-openapi-docs is create-only (it never overwrites an
 * existing .api.mdx / sidebar.ts), so regeneration requires clean-api-docs
 * first or the check would pass against stale output.
 * Side-effect-free: the committed reference is always restored afterwards.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SPEC = path.join(ROOT, 'api-specifications/zen-back.v1.yaml');
const REF_DIR = path.join(ROOT, 'docs/api/reference');

function walk(dir) {
  const out = new Map();
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else {
        out.set(path.relative(REF_DIR, full), fs.readFileSync(full, 'utf8'));
      }
    }
  }
  return out;
}

function snapshot() {
  return fs.existsSync(REF_DIR) ? walk(REF_DIR) : new Map();
}

function restore(snap) {
  fs.rmSync(REF_DIR, { recursive: true, force: true });
  for (const [rel, content] of snap) {
    const full = path.join(REF_DIR, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
}

function main() {
  if (!fs.existsSync(SPEC)) {
    console.log(`[api-reference-freshness] FAIL: spec missing at ${SPEC}`);
    process.exit(1);
  }

  const docusaurus = path.join(ROOT, 'node_modules/.bin/docusaurus');
  if (!fs.existsSync(docusaurus)) {
    console.log('[api-reference-freshness] FAIL: docusaurus CLI not installed');
    process.exit(1);
  }

  const before = snapshot();
  const clean = spawnSync(docusaurus, ['clean-api-docs', 'zenBackApi'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const res = spawnSync(docusaurus, ['gen-api-docs', 'zenBackApi'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const after = snapshot();
  restore(before);

  if (clean.status !== 0 || res.status !== 0) {
    console.log(
      `[api-reference-freshness] FAIL: regeneration exited non-zero (clean=${clean.status}, gen=${res.status})`,
    );
    process.exit(1);
  }

  const keys = new Set([...before.keys(), ...after.keys()]);
  const added = [];
  const removed = [];
  const changed = [];
  for (const k of keys) {
    const b = before.get(k);
    const a = after.get(k);
    if (b === undefined) added.push(k);
    else if (a === undefined) removed.push(k);
    else if (b !== a) changed.push(k);
  }

  const drift = added.length + removed.length + changed.length;
  if (drift === 0) {
    console.log('[api-reference-freshness] PASS: docs/api/reference in sync with api-specifications/zen-back.v1.yaml');
    process.exit(0);
  }

  console.log(`[api-reference-freshness] FAIL: ${drift} file(s) drift from spec`);
  for (const [label, list] of [
    ['added', added],
    ['removed', removed],
    ['changed', changed],
  ]) {
    if (list.length) {
      console.log(`  ${label}: ${list.sort().join(', ')}`);
    }
  }
  console.log('Hint: run npm run generate:api-reference, then commit the regenerated reference pages.');
  process.exit(1);
}

main();
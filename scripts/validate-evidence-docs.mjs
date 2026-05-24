#!/usr/bin/env node
/**
 * validate-evidence-docs.mjs — Validate public docs claims against evidence.
 *
 * Checks:
 * - No exactly-once claim without explicit non-claim.
 * - No zero-loss claim without explicit non-claim.
 * - No Merkle as auth/replay/identity/delivery.
 * - No generic zero-trust claim without matrix/scoping.
 * - No "all proven" language without proof scope.
 * - Rotation/revocation claims must be classified.
 * - Does not reject accurate implementation-present claims.
 * - Does not reject local/mock proof claims if scoped.
 * - Does not reject planned/blocked statements.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const RULES = [
  {
    regex: /\b(?:exactly[- ]once)\b.*(?:delivery|guarantee|ensure)/i,
    context: 'exactly-once delivery claim without negation',
    allowedInNonClaim: true,
  },
  {
    regex: /\bzero[- ]loss\b.*(?:delivery|guarantee|ensure)/i,
    context: 'zero-loss claim without negation',
    allowedInNonClaim: true,
  },
  {
    regex: /Merkle.*(?:auth|replay|identity|delivery)/i,
    context: 'Merkle auth/replay/identity/delivery claim',
    allowedInSection: ['non-claims'],
  },
  {
    regex: /generic zero[- ]trust/i,
    context: 'generic zero-trust without matrix/scoping',
    allowedInSection: ['non-claims', 'proof matrix', 'evidence map'],
  },
  {
    regex: /production zero[- ]trust/i,
    context: 'production zero-trust without live evidence',
    allowedInSection: ['non-claims'],
  },
  {
    regex: /(?:all|every).*(?:proven|proved|verified|secured)/i,
    context: '"all proven" language without proof scope',
    allowedInSection: ['non-claims'],
  },
  {
    regex: /(?:rotation|revocation).*(?:supported|implemented|available)/i,
    context: 'rotation/revocation claim without classification',
    allowedInNonClaim: true,
  },
];

const NON_CLAIM_PATTERNS = [
  /not.+claim/i, /no +claim/i, /does not/i, /never claim/i,
  /not implemented/i, /blocked/i, /planned/i, /local\.mock/i,
  /implementation\.present/i,
];

function hasNegation(text) {
  return NON_CLAIM_PATTERNS.some(p => p.test(text));
}

function run() {
  const errors = [];
  const docsDir = path.join(ROOT, 'docs');
  const files = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('.')) walk(full);
      else if (e.isFile() && e.name.endsWith('.md')) files.push(full);
    }
  }
  walk(docsDir);

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (rel.includes('/evidence/')) continue;
    if (rel.includes('node_modules')) continue;

    const content = fs.readFileSync(file, 'utf-8');

    for (const rule of RULES) {
      const match = content.match(rule.regex);
      if (!match) continue;

      const idx = match.index;
      const context = content.slice(Math.max(0, idx - 120), idx + match[0].length + 60);
      if (hasNegation(context)) continue;

      const section = content.slice(idx, idx + 200);
      if (rule.allowedInSection?.some(s => section.toLowerCase().includes(s))) continue;

      errors.push(`${rel}: ${rule.context} — found "${match[0].slice(0, 60)}..."`);
    }
  }

  if (errors.length === 0) {
    console.log('PASS: Docs evidence validation — no issues found');
    process.exit(0);
  } else {
    console.log(`FAIL (${errors.length}):`);
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }
}

run();

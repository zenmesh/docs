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
 *
 * Narrow false-positive guards (do not weaken the claim rules themselves):
 * - Claim patterns use word boundaries ("intentionally ... approved" is not
 *   an "all ... proven" claim).
 * - Non-claim negation forms: "Not exactly-once delivery", "No ... claim",
 *   "not available", "not supported", markdown table "| ... | No |" rows.
 * - Historical quotation: text inside a quoted "old" → "new" replacement
 *   (executor reports) is historical record, not a live claim.
 *
 * `--self-test` runs embedded positive/negative fixtures and exits non-zero
 * on any misbehavior.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const RULES = [
  {
    id: 'EXACTLY_ONCE',
    regex: /\b(?:exactly[- ]once)\b.*\b(?:delivery|guarantee|ensure)\b/i,
    context: 'exactly-once delivery claim without negation',
    allowedInNonClaim: true,
  },
  {
    id: 'ZERO_LOSS',
    regex: /\bzero[- ]loss\b.*\b(?:delivery|guarantee|ensure)\b/i,
    context: 'zero-loss claim without negation',
    allowedInNonClaim: true,
  },
  {
    id: 'MERKLE',
    regex: /\bMerkle\b.*\b(?:auth|replay|identity|delivery)\b/i,
    context: 'Merkle auth/replay/identity/delivery claim',
    allowedInSection: ['non-claims'],
  },
  {
    id: 'GENERIC_ZERO_TRUST',
    regex: /\bgeneric zero[- ]trust\b/i,
    context: 'generic zero-trust without matrix/scoping',
    allowedInSection: ['non-claims', 'proof matrix', 'evidence map'],
  },
  {
    id: 'PRODUCTION_ZERO_TRUST',
    regex: /\bproduction zero[- ]trust\b/i,
    context: 'production zero-trust without live evidence',
    allowedInSection: ['non-claims'],
  },
  {
    id: 'ALL_PROVEN',
    regex: /\b(?:all|every)\b.*\b(?:proven|proved|verified|secured)\b/i,
    context: '"all proven" language without proof scope',
    allowedInSection: ['non-claims'],
  },
  {
    id: 'ROTATION',
    regex: /\b(?:rotation|revocation)\b.*\b(?:supported|implemented|available)\b/i,
    context: 'rotation/revocation claim without classification',
    allowedInNonClaim: true,
  },
];

const NON_CLAIM_PATTERNS = [
  /not.+claim/i,
  /no +claim/i,
  /\bno\b[^.\n|]{0,60}\bclaim\b/i,
  /does not/i,
  /never claim/i,
  /not implemented/i,
  /blocked/i,
  /planned/i,
  /local\.mock/i,
  /local[-\\/]mock/i,
  /implementation\.present/i,
  // Explicit bounded non-claim phrasings (negative regressions for the
  // delivery-guarantee and FAQ languages).
  /\bno\s+(?:exactly[- ]once|zero[- ]loss|guaranteed?)\b/i,
  /\bnot\s+(?:exactly[- ]once|zero[- ]loss)\b/i,
  /\bnot\s+available\b/i,
  /\bnot\s+supported\b/i,
  /\bnot\s+proven\b/i,
  // Markdown "is it X? | No |" table rows state a non-claim.
  /\|\s*no\s*\|/i,
];

// Historical executor reports quote the pre-fix claim text when documenting a
// replacement ("bad phrasing" → "fixed phrasing"). The quotation is historical
// record, not a live claim.
const HISTORICAL_QUOTATION = /["'`][^"'`]{10,}["'`]\s*(?:→|->)\s*["'`]/;

function hasNegation(text) {
  return NON_CLAIM_PATTERNS.some((p) => p.test(text));
}

function findLineStart(content, idx) {
  const nl = content.lastIndexOf('\n', idx - 1);
  return nl === -1 ? 0 : nl + 1;
}

function findLineEnd(content, idx) {
  const nl = content.indexOf('\n', idx);
  return nl === -1 ? content.length : nl;
}

export function scanContent(content, relLabel = 'fixture.md') {
  const errors = [];

  for (const rule of RULES) {
    const re = new RegExp(rule.regex.source, rule.regex.flags.includes('g') ? rule.regex.flags : rule.regex.flags + 'g');
    let m;
    while ((m = re.exec(content)) !== null) {
      const idx = m.index;
      const context = content.slice(Math.max(0, idx - 120), idx + m[0].length + 60);
      if (hasNegation(context)) continue;

      const lineStart = findLineStart(content, idx);
      const lineEnd = findLineEnd(content, idx);
      const line = content.slice(lineStart, lineEnd);
      if (HISTORICAL_QUOTATION.test(line)) continue;

      const section = content.slice(idx, idx + 200);
      if (rule.allowedInSection?.some((s) => section.toLowerCase().includes(s))) continue;

      // A rotation/revocation statement accompanied by its classification
      // ("classified WIRED_SANDBOX", "local/mock proven") satisfies the
      // classification requirement of the ROTATION rule.
      if (rule.id === 'ROTATION' && /classif|local[-\\/]mock|local\.mock/i.test(context)) continue;

      errors.push(`${relLabel}: ${rule.id}: ${rule.context} — found "${m[0].slice(0, 60)}..."`);
      break; // one report per rule per file is enough
    }
  }
  return errors;
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
    if (rel.includes('node_modules')) continue;

    const content = fs.readFileSync(file, 'utf-8');
    errors.push(...scanContent(content, rel));
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

// ---------------------------------------------------------------------------
// Self-test: negative fixtures (must FAIL) and positive fixtures (must PASS).
// ---------------------------------------------------------------------------

export function selfTest() {
  let failures = 0;
  const expect = (name, content, shouldFail) => {
    const errs = scanContent(content);
    const failed = errs.length > 0;
    if (failed === shouldFail) {
      console.log(`  [self-test ok] ${name} -> ${shouldFail ? 'FAIL' : 'PASS'} as required`);
    } else {
      failures += 1;
      console.log(
        `  [self-test FAIL] ${name}: expected ${shouldFail ? 'FAIL' : 'PASS'}, got ${failed ? errs.join(' | ') : 'clean pass'}`
      );
    }
  };

  // TRUE positives — must FAIL.
  expect('NEG exactly-once delivery claim', 'Zen Mesh provides exactly-once delivery for your events.', true);
  expect('NEG zero-loss delivery claim', 'The pipeline guarantees zero-loss delivery across regions.', true);
  expect('NEG Merkle delivery claim', 'Merkle proofs verify delivery at the target.', true);
  expect('NEG all paths proven claim', 'All delivery paths are proven in production.', true);
  expect('NEG unclassified rotation claim', 'Key rotation is supported out of the box.', true);

  // FALSE_POSITIVE regression fixtures — must PASS (this is the narrowing).
  expect(
    'POS word-boundary: intentionally/approved',
    'This page is intentionally limited in scope. Detailed configuration contract information will be published when approved for public release.',
    false
  );
  expect(
    'POS word-boundary: caller/Verified IDs',
    '| Event generation | Verified caller ID that can send SMS to the Twilio number | Twilio Console > Verified Caller IDs |',
    false
  );
  expect(
    'POS negation: No exactly-once or zero-loss guarantee',
    '- **No exactly-once or zero-loss delivery guarantee**',
    false
  );
  expect(
    'POS negation: Not exactly-once / Not zero-loss rows',
    '- Not exactly-once delivery for any path.\n- Not zero-loss delivery for any path.',
    false
  );
  expect(
    'POS negation: table "No" row',
    '| Exactly-once delivery | No | At-least-once with idempotency support |',
    false
  );
  expect(
    'POS negation: rotation not supported',
    'Automatic certificate rotation is not supported in v1.1.',
    false
  );
  expect(
    'POS negation: rotation not available',
    '**Automatic certificate rotation**: Not available — manual rotation required.',
    false
  );
  expect(
    'POS historical quotation in executor report',
    '| docs/api/examples.md | "Merkle proof for cryptographic verification of delivery" → "Merkle proof for evidence integrity verification". |',
    false
  );
  expect(
    'POS scoped negative claim sentence',
    'No guaranteed or exactly-once delivery claim (standard retry/recovery, not exact-once guarantee)',
    false
  );
  expect(
    'POS rotation with explicit classification',
    '| Rotation | Supported via dashboard — classified WIRED_SANDBOX, not a production claim |',
    false
  );
  expect(
    'POS rotation with local/mock proof classification',
    '| HMAC Key Rotation | **Implemented** — local/mock proven | HMACKeyRotationController |',
    false
  );

  console.log(
    failures === 0
      ? 'PASS: evidence-docs self-test — all fixtures behaved as required'
      : `FAIL: evidence-docs self-test — ${failures} fixture(s) misbehaved`
  );
  process.exit(failures === 0 ? 0 : 1);
}

const arg = process.argv[2] || '';
if (arg === '--self-test') {
  selfTest();
} else {
  run();
}

#!/usr/bin/env node
/**
 * HELPER050/051: AI security posture claim-maturity and boundary guard.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SECURITY_DIR = path.join(ROOT, 'static/ai/security/v1');

const FILES = [
  'claim-maturity.json',
  'attack-model.json',
  'primitives.json',
  'gaps.json',
];

const MATURITY = new Set([
  'WIRED',
  'AUTOMATED_TESTED',
  'E2E_VALIDATED',
  'NOT_E2E_VALIDATED',
  'BACKLOG',
  'NOT_CLAIMED',
]);

const FORBIDDEN_ID = /\b(ST-003|N086|FLOW-0[123]|HELPER\d{3}|H\d{3}|BLK-|CHECKPOINT-|zen-platform:|docs\/80-EVIDENCE)\b/i;

const VAGUE_CLAIM =
  /\b(eliminates?|fully prevents?|replay-proof|SSRF-safe|SSRF-proof|prevents SSRF|(?<!not )production[- ]live|(?<!not )customer[- ]ready|(?<!not )demo[- ]ready)\b/i;

const BANNED_VAGUE = /\b(?:^|\s)(?:secure|safe)\b(?!-)/i;

const MERKLE_BAD =
  /\b(?:merkle|hash[- ]?chain).{0,50}\b(?:auth|identity|encrypt|replay prevention|replay-proof)\b/i;

let passed = 0;
let failed = 0;

function ok(name, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log(`  OK: ${name}`);
  } else {
    failed += 1;
    console.log(`  FAIL: ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(SECURITY_DIR, name), 'utf-8'));
}

function publicFields(e) {
  return [
    e.public_safe_summary,
    e.mechanism,
    e.validation_level,
    e.current_limitation,
    ...(e.helps_prevent || []),
    ...(e.helps_detect || []),
  ]
    .filter(Boolean)
    .join(' ');
}

function merkleBoundaryOk(e) {
  const blob = JSON.stringify(e);
  if (!/merkle|hash-chain/i.test(blob)) return true;
  if (/does_not_prevent|not authentication|integrity only|not replay prevention/i.test(blob)) {
    return true;
  }
  return !MERKLE_BAD.test(blob);
}

function main() {
  console.log('[ai-security-posture] HELPER051 claim-maturity guard...');

  const llms = fs.readFileSync(path.join(ROOT, 'static/llms.txt'), 'utf-8');
  const overview = fs.readFileSync(path.join(ROOT, 'docs/ai/security-posture.md'), 'utf-8');

  ok('llms links claim-maturity.json', llms.includes('/ai/security/v1/claim-maturity.json'));
  ok('security-posture documents maturity', overview.includes('WIRED'));

  const maturity = load('claim-maturity.json');
  const primitives = load('primitives.json');
  const maturityById = new Map(maturity.items.map((i) => [i.id, i]));

  ok('claim-maturity has 24+ items', maturity.items.length >= 24);

  for (const f of FILES) {
    const raw = fs.readFileSync(path.join(SECURITY_DIR, f), 'utf-8');
    ok(`${f} no internal paths/IDs`, !FORBIDDEN_ID.test(raw));
  }

  for (const e of primitives.entries) {
    const label = `primitives:${e.id}`;
    ok(`${label} claim_maturity`, MATURITY.has(e.claim_maturity), e.claim_maturity);
    const m = maturityById.get(e.id);
    ok(`${label} synced with claim-maturity`, m && m.claim_maturity === e.claim_maturity);

    const pub = publicFields(e);
    if (VAGUE_CLAIM.test(pub) && !/not |until|backlog|do not/i.test(pub)) {
      ok(`${label} no vague overclaim`, false, pub.slice(0, 90));
    }
    if (BANNED_VAGUE.test(pub) && !/not safe|not secure|SSRF-safe/i.test(pub)) {
      ok(`${label} no bare secure/safe`, false);
    }
    if (e.claim_maturity === 'E2E_VALIDATED' && !e.public_evidence_ref) {
      ok(`${label} E2E has public_evidence_ref`, false);
    }
    if (
      (e.claim_maturity === 'BACKLOG' || e.claim_maturity === 'NOT_CLAIMED') &&
      (e.helps_prevent || []).length > 0
    ) {
      ok(`${label} backlog helps_prevent empty`, false);
    }
    if (e.claim_maturity === 'AUTOMATED_TESTED' && !e.validation_level) {
      ok(`${label} tested has validation_level`, false);
    }
    if (!merkleBoundaryOk(e)) {
      ok(`${label} merkle boundary`, false);
    }
  }

  const attack = load('attack-model.json');
  for (const e of attack.entries) {
    ok(`attack:${e.id} claim_maturity`, MATURITY.has(e.claim_maturity));
    if (e.claim_maturity === 'BACKLOG' && (e.helps_prevent || []).length > 0) {
      ok(`attack:${e.id} backlog helps_prevent empty`, false);
    }
    if (e.id === 'ATK-REPLAY-DUPLICATE-DELIVERY') {
      ok('replay uses helps_detect', (e.helps_detect || []).length > 0);
      ok('replay helps_prevent empty', (e.helps_prevent || []).length === 0);
    }
  }

  const gaps = load('gaps.json');
  ok('gaps remain visible', gaps.entries.length >= 10);
  for (const g of gaps.entries) {
    ok(`gap:${g.id} claim_maturity`, MATURITY.has(g.claim_maturity));
    if ((g.must_not_claim || []).length < 1) {
      ok(`gap:${g.id} has must_not_claim`, false);
    }
  }

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

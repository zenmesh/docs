#!/usr/bin/env node
/**
 * HELPER058: Local trust / air-gap / zen-lock survival public copy guard.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SEC = path.join(ROOT, 'static/ai/security/v1');

const REQUIRED_PRIMITIVES = [
  'PRIM-ZEN-LOCAL-TRUST-AUTHORITY',
  'PRIM-ZEN-LOCK-SURVIVAL-STORE',
  'PRIM-KEY-MATERIAL-ROTATION',
  'PRIM-AIR-GAPPED-ADAPTER-HANDOFF',
  'PRIM-SPIFFE-SPIRE-NATIVE-INTERNAL',
  'PRIM-LOCAL-MATERIAL-EXPIRY-FAIL-CLOSED',
];

const FORBIDDEN_ID = /\b(FLOW-0[123]|HELPER\d{3}|H\d{3}|zen-platform:|docs\/80-EVIDENCE)\b/i;

function deliveryPolicyPassOverclaim(text) {
  const re = /\bDeliveryPolicy\b[^.\n]{0,60}\bPASS\b/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const window = text.slice(Math.max(0, m.index - 25), m.index + m[0].length + 15);
    if (
      /not\s+PASS|not PASS|PASS without|deferred|without evidence|must_not_claim|not claimed|as PASS without/i.test(
        window,
      )
    ) {
      continue;
    }
    return true;
  }
  return false;
}

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
  return JSON.parse(fs.readFileSync(path.join(SEC, name), 'utf-8'));
}

function bad24hValidated(text) {
  return /\b24\s*h(?:our)?s?\b/i.test(text) && /\bvalidat/i.test(text) && !/\bnot\s+24|not_24h|not 24h/i.test(text);
}

function main() {
  console.log('[ai-local-trust-posture] HELPER058...');

  const llms = fs.readFileSync(path.join(ROOT, 'static/llms.txt'), 'utf-8');
  const posture = fs.readFileSync(path.join(ROOT, 'docs/ai/security-posture.md'), 'utf-8');
  const local = load('local-trust-posture.json');
  const maturity = load('claim-maturity.json');
  const primitives = load('primitives.json');
  const gaps = load('gaps.json');

  const pub = [JSON.stringify(local), llms, posture].join('\n');
  ok('local-trust-posture.json exists', true);
  ok('no forbidden IDs in local-trust JSON', !FORBIDDEN_ID.test(JSON.stringify(local)));
  ok('llms links local-trust-posture', llms.includes('/ai/security/v1/local-trust-posture.json'));
  ok('posture documents local trust', posture.includes('local-trust-posture') || posture.includes('Local trust'));

  ok('architecture mentions zen-agent authority', /zen-agent/i.test(JSON.stringify(local)));
  ok('architecture customers do not operate SPIRE', /customers do not.*SPIRE|do not install or operate SPIRE/i.test(JSON.stringify(local)));
  ok('architecture mentions zen-lock', /zen-lock/i.test(JSON.stringify(local)));
  ok('architecture fail closed', /fail[- ]closed/i.test(JSON.stringify(local)));
  ok('does_not_claim 24h', (local.does_not_claim || []).some((s) => /24/i.test(s)));
  ok('does_not_claim customer SPIRE', (local.does_not_claim || []).some((s) => /customer.*SPIRE/i.test(s)));

  const maturityIds = new Set(maturity.items.map((i) => i.id));
  const primIds = new Set(primitives.entries.map((e) => e.id));
  for (const id of REQUIRED_PRIMITIVES) {
    ok(`claim-maturity has ${id}`, maturityIds.has(id));
    ok(`primitives has ${id}`, primIds.has(id));
    const item = maturity.items.find((i) => i.id === id);
    ok(`${id} has current_validation_level`, Boolean(item?.current_validation_level));
    const stages = item?.current_validation_level;
    if (stages && typeof stages === 'object') {
      ok(`${id} not_24h_validated true`, stages.not_24h_validated === true);
    }
  }

  ok('gap 24h survival visible', gaps.entries.some((g) => g.id === 'GAP-LOCAL-TRUST-24H-SURVIVAL'));
  ok('gap customer SPIRE visible', gaps.entries.some((g) => g.id === 'GAP-CUSTOMER-SPIRE-V1'));

  ok('no marketed 24h validated survival', !bad24hValidated(pub));
  ok('no customers manage SPIRE claim', !/\bcustomers manage SPIRE\b/i.test(pub));
  ok('no No SPIRE for V1 phrase', !/\bNo SPIRE for V1\b/i.test(pub));
  ok(
    'ST-003/N086 only in must_not_claim context',
    !/\bST-003\b/i.test(pub.replace(/must_not_claim[\s\S]*?does_not_claim/gi, '')) || (local.does_not_claim || []).some((s) => /ST-003/.test(s)),
  );
  ok('DeliveryPolicy PASS not claimed', !deliveryPolicyPassOverclaim(pub));

  const survival = primitives.entries.find((e) => e.id === 'PRIM-ZEN-LOCK-SURVIVAL-STORE');
  ok('survival store mentions zen-lock', /zen-lock/i.test(JSON.stringify(survival || {})));
  const expiry = primitives.entries.find((e) => e.id === 'PRIM-LOCAL-MATERIAL-EXPIRY-FAIL-CLOSED');
  ok('expiry primitive fail-closed', /fail[- ]closed/i.test(JSON.stringify(expiry || {})));

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

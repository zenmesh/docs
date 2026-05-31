#!/usr/bin/env node
/**
 * HELPER053: Public architecture/article evidence CTA guard.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const EVIDENCE_CTA_ARTICLES = ['docs/architecture/three-plane-model.md'];

const REQUIRED_CTA_PATHS = [
  '/llms.txt',
  '/ai/ai-discovery-registry.json',
  '/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json',
  '/ai/evidence/v1/manifest.json',
  '/ai/evidence/v1/non-claims.json',
];

const PATH_TO_STATIC = {
  '/llms.txt': 'static/llms.txt',
  '/ai/ai-discovery-registry.json': 'static/ai/ai-discovery-registry.json',
  '/ai/security/v1/claim-maturity.json': 'static/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/primitives.json': 'static/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json': 'static/ai/security/v1/gaps.json',
  '/ai/evidence/v1/manifest.json': 'static/ai/evidence/v1/manifest.json',
  '/ai/evidence/v1/non-claims.json': 'static/ai/evidence/v1/non-claims.json',
};

const FORBIDDEN_ID =
  /\b(ST-003|N086|FLOW-0[123]|HELPER\d{3}|H\d{3}|BLK-|CHECKPOINT-|zen-platform:|docs\/80-EVIDENCE)\b/i;

const READINESS_CLAIM = /\b(?:production[- ]live|customer[- ]ready|penetration[- ]test|certified)\b/i;

function ctaHasUnsupportedReadiness(section) {
  const plain = section.replace(/\*\*/g, '');
  if (READINESS_CLAIM.test(plain)) return true;
  if (/\breplay-proof\b/i.test(plain) && !/\bnot\s+replay-proof\b/i.test(plain)) return true;
  return false;
}

const FORBIDDEN_PHRASE = /\bcontrol-plane isolation\b/i;

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

function extractEvidenceSection(markdown) {
  const idx = markdown.indexOf('## Evidence');
  if (idx === -1) return '';
  const rest = markdown.slice(idx);
  const next = rest.search(/\n## (?!#)/);
  return next === -1 ? rest : rest.slice(0, next);
}

function extractMarkdownLinks(section) {
  const links = [];
  const re = /\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    let href = m[1].trim();
    if (href.startsWith('http')) continue;
    if (href.includes('#')) href = href.split('#')[0];
    links.push(href);
  }
  return links;
}

function main() {
  console.log('[public-evidence-cta] HELPER053...');

  for (const rel of EVIDENCE_CTA_ARTICLES) {
    const abs = path.join(ROOT, rel);
    ok(`${rel} exists`, fs.existsSync(abs));
    const body = fs.readFileSync(abs, 'utf-8');
    const section = extractEvidenceSection(body);
    ok(`${rel} has ## Evidence section`, section.length > 0);

    ok('CTA states narrative not proof', /narrative.*not proof|not proof/i.test(section));
    ok('CTA no forbidden IDs/paths', !FORBIDDEN_ID.test(section));
    ok('CTA no /commitments link', !section.includes('/commitments'));
    ok('CTA no unsupported readiness claims', !ctaHasUnsupportedReadiness(section));
    ok(
      'CTA avoids unsupported control-plane isolation phrasing',
      !FORBIDDEN_PHRASE.test(section) && !FORBIDDEN_PHRASE.test(body),
    );
    ok('CTA documents Merkle/hash-chain boundary', /integrity|tamper/i.test(section));
    ok('CTA documents idempotency not replay-proof', /not.*replay-proof|replay-proof delivery/i.test(section));

    const links = extractMarkdownLinks(section);
    for (const required of REQUIRED_CTA_PATHS) {
      ok(`${rel} links ${required}`, links.includes(required));
    }

    for (const href of links) {
      if (href.startsWith('http')) {
        failed += 1;
        console.log(`  FAIL: ${rel} external link in Evidence CTA — ${href}`);
        continue;
      }
      const staticRel = PATH_TO_STATIC[href];
      ok(`${rel} CTA link allowed: ${href}`, Boolean(staticRel), href);
      if (staticRel) {
        ok(`${rel} CTA target on disk: ${href}`, fs.existsSync(path.join(ROOT, staticRel)));
      }
    }

    const extra = links.filter((h) => !REQUIRED_CTA_PATHS.includes(h));
    ok(`${rel} no extra CTA links`, extra.length === 0, extra.join(', '));
  }

  ok('/commitments page not assumed', !fs.existsSync(path.join(ROOT, 'static/commitments')));

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

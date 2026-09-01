#!/usr/bin/env node
/**
 * HELPER054: Root llms.txt and crawler-safe public discovery guard (docs build).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// CANONICAL DOCS LAW (tranche addendum): documentation and machine-readable
// registries canonicalize under https://www.zen-mesh.io/docs. The legacy
// docs.zen-mesh.io hostname is a redirect-compatibility surface only; new
// llms.txt content must use canonical URLs (a single legacy-redirect note is
// allowed).
const CANONICAL_DOCS_ORIGIN = 'https://www.zen-mesh.io/docs';
const LEGACY_DOCS_ORIGIN = 'https://docs.zen-mesh.io';
const REQUIRED_LLMS_LINKS = [
  `${CANONICAL_DOCS_ORIGIN}/ai/ai-discovery-registry.json`,
  `${CANONICAL_DOCS_ORIGIN}/ai/security/v1/claim-maturity.json`,
  `${CANONICAL_DOCS_ORIGIN}/ai/security/v1/primitives.json`,
  `${CANONICAL_DOCS_ORIGIN}/ai/security/v1/gaps.json`,
  `${CANONICAL_DOCS_ORIGIN}/ai/evidence/v1/non-claims.json`,
  `${CANONICAL_DOCS_ORIGIN}/ai/evidence/v1/manifest.json`,
];

const PATH_TO_STATIC = {
  '/ai/ai-discovery-registry.json': 'static/ai/ai-discovery-registry.json',
  '/ai/security/v1/claim-maturity.json': 'static/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/primitives.json': 'static/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json': 'static/ai/security/v1/gaps.json',
  '/ai/evidence/v1/non-claims.json': 'static/ai/evidence/v1/non-claims.json',
  '/ai/evidence/v1/manifest.json': 'static/ai/evidence/v1/manifest.json',
};

const FORBIDDEN_ID =
  /\b(ST-003|N086|FLOW-0[123]|HELPER\d{3}|H\d{3}|BLK-|CHECKPOINT-|zen-platform:|docs\/80-EVIDENCE)\b/i;

// New llms.txt content must not advertise the legacy hostname except in the
// explicit redirect note.
const FORBIDDEN_HOST_PATH = /https:\/\/docs\.zen-mesh\.io\/(?!now permanently redirects)/i;

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

function main() {
  console.log('[root-llms-crawler] HELPER054...');

  const llmsPath = path.join(ROOT, 'static/llms.txt');
  const vercelPath = path.join(ROOT, 'vercel.json');
  const smokePath = path.join(ROOT, 'static/ai/discovery-crawler-smoke-v1.json');

  ok('static/llms.txt exists', fs.existsSync(llmsPath));
  const llms = fs.readFileSync(llmsPath, 'utf-8');
  ok('llms starts with H1', llms.startsWith('# '));
  ok('llms not HTML', !/<html|<!DOCTYPE/i.test(llms));
  ok('llms canonical discovery section', llms.includes('## Canonical discovery'));
  ok('llms states canonical docs base for /ai JSON', llms.includes(CANONICAL_DOCS_ORIGIN) && /\/ai\//.test(llms));
  ok('llms no legacy-host links (redirect note excepted)', !FORBIDDEN_HOST_PATH.test(llms));
  ok('llms no forbidden IDs', !FORBIDDEN_ID.test(llms));
  ok('llms no bare /commitments', !/(?<!https:\/\/www\.zen-mesh\.io)\/commitments/.test(llms));
  ok('llms narrative not proof', /not proof/i.test(llms));

  for (const url of REQUIRED_LLMS_LINKS) {
    ok(`llms links ${url}`, llms.includes(url));
  }

  for (const [urlPath, staticRel] of Object.entries(PATH_TO_STATIC)) {
    ok(`static file for ${urlPath}`, fs.existsSync(path.join(ROOT, staticRel)));
  }

  ok('vercel.json exists', fs.existsSync(vercelPath));
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
  const headers = JSON.stringify(vercel.headers || []);
  ok('vercel sets llms.txt content-type', headers.includes('/llms.txt') && headers.includes('text/plain'));
  ok('vercel sets /ai json content-type', headers.includes('application/json'));

  ok('build will copy llms to root', fs.existsSync(llmsPath));
  const buildLlms = path.join(ROOT, 'build/llms.txt');
  if (fs.existsSync(buildLlms)) {
    ok('build/llms.txt present after build', true);
    const built = fs.readFileSync(buildLlms, 'utf-8');
    ok('build/llms.txt matches static', built === llms);
  }

  ok('smoke artifact exists', fs.existsSync(smokePath));
  if (fs.existsSync(smokePath)) {
    const smoke = JSON.parse(fs.readFileSync(smokePath, 'utf-8'));
    ok('smoke has checked_at', Boolean(smoke.checked_at));
    ok('smoke canonical_origin docs', smoke.canonical_origin === CANONICAL_DOCS_ORIGIN || smoke.canonical_origin === LEGACY_DOCS_ORIGIN);
    const docsHost = smoke.hosts?.['docs.zen-mesh.io'];
    ok('smoke records docs /llms.txt 200', docsHost?.endpoints?.['/llms.txt']?.final_status === 200);
    ok('smoke records docs discovery registry 200', docsHost?.endpoints?.['/ai/ai-discovery-registry.json']?.final_status === 200);
    ok('smoke documents www /ai not hosted', Boolean(smoke.hosts?.['www.zen-mesh.io']?.notes));
  }

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

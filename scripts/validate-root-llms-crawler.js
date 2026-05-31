#!/usr/bin/env node
/**
 * HELPER054: Root llms.txt and crawler-safe public discovery guard (docs build).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DOCS_ORIGIN = 'https://docs.zen-mesh.io';
const REQUIRED_LLMS_LINKS = [
  `${DOCS_ORIGIN}/ai/ai-discovery-registry.json`,
  `${DOCS_ORIGIN}/ai/security/v1/claim-maturity.json`,
  `${DOCS_ORIGIN}/ai/security/v1/primitives.json`,
  `${DOCS_ORIGIN}/ai/security/v1/gaps.json`,
  `${DOCS_ORIGIN}/ai/evidence/v1/non-claims.json`,
  `${DOCS_ORIGIN}/ai/evidence/v1/manifest.json`,
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

const FORBIDDEN_HOST_PATH =
  /https:\/\/www\.zen-mesh\.io\/ai\/(?:security|evidence|ai-discovery-registry)/i;

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
  ok('llms states docs host for /ai JSON', llms.includes('docs.zen-mesh.io') && /\/ai\//.test(llms));
  ok('llms no www /ai/ JSON links', !FORBIDDEN_HOST_PATH.test(llms));
  ok('llms no forbidden IDs', !FORBIDDEN_ID.test(llms));
  ok('llms no /commitments', !llms.includes('/commitments'));
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
    ok('smoke canonical_origin docs', smoke.canonical_origin === DOCS_ORIGIN);
    const docsHost = smoke.hosts?.['docs.zen-mesh.io'];
    ok('smoke records docs /llms.txt 200', docsHost?.endpoints?.['/llms.txt']?.final_status === 200);
    ok('smoke records docs discovery registry 200', docsHost?.endpoints?.['/ai/ai-discovery-registry.json']?.final_status === 200);
    ok('smoke documents www /ai not hosted', Boolean(smoke.hosts?.['www.zen-mesh.io']?.notes));
  }

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

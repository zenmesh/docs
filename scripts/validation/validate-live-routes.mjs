#!/usr/bin/env node
/**
 * validate-live-routes.mjs — Bounded live validator (requirement A6).
 *
 * Checks the approved production route inventory against the LIVE site. Uses
 * GET (HEAD is unreliable), follows redirects with a strict maximum, records
 * final URL/status/content-type/size, rejects redirect loops and same-site
 * 404/410/5xx. Uses bounded timeouts and retries. Does not crawl the internet.
 *
 * Same-site production routes are HARD FAILURES.
 * Third-party hosts may appear only in `external_allowlist` and are reported
 * separately (never hard-fail — their availability is outside our control).
 *
 * Usage: node scripts/validation/validate-live-routes.mjs [--allowlist <file>]
 * Exit 0 = PASS, 1 = FAIL (only same-site failures cause FAIL).
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);

const SITE = 'https://docs.zen-mesh.io';

const SAME_SITE_ROUTES = [
  '/',
  '/docs/payload-locality-invariant',
  '/docs/china-market-architecture',
  '/ai/evidence/v1/manifest.json',
  '/ai/evidence/v1.1/manifest.json',
  '/ai/evidence/v1/non-claims.json',
  '/ai/evidence/v1.1/non-regression-matrix.json',
  '/ai/evidence/v1.1/public-claim-gate.json',
  '/ai/evidence/v1.1/supersession-map.json',
  '/ai/discovery-crawler-smoke-v1.json',
  '/ai/ai-discovery-registry.json',
  '/robots.txt',
  '/sitemap.xml',
];

const EXTERNAL_ALLOWLIST = [];
const MAX_REDIRECTS = 5;
const TIMEOUT = 30;
const RETRIES = 2;

function curl(url) {
  // return { status, finalUrl, ctype, size, chain }
  const fmt = '%{http_code}|%{url_effective}|%{content_type}|%{size_download}|%{num_redirects}';
  const args = [
    'curl', '-s', '-o', '/dev/null', '-w', fmt,
    '-L', '--max-redirs', String(MAX_REDIRECTS), '--max-time', String(TIMEOUT),
    url,
  ];
  try {
    const out = execFileSync('curl', args, {
      encoding: 'utf-8',
      timeout: TIMEOUT * 1000 * 3,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const [code, finalUrl, ctype, size, redirects] = out.split('|');
    return { code: parseInt(code, 10), finalUrl, ctype, size: parseInt(size, 10), redirects: parseInt(redirects, 10) };
  } catch (e) {
    return { error: String(e.message) };
  }
}

function check(url, hard) {
  let last = null;
  for (let i = 0; i <= RETRIES; i++) {
    last = curl(url);
    if (!last.error) break;
    // transient: retry
  }
  const rec = { url, ...last, requestedAt: new Date().toISOString() };
  if (rec.error) {
    if (hard) hardFailures.push(rec);
    else externalNotes.push(rec);
    return rec;
  }
  if (hard) {
    if (rec.code >= 400 && rec.code <= 410) hardFailures.push(rec);
    else if (rec.code >= 500) hardFailures.push(rec);
    else if (rec.redirects >= MAX_REDIRECTS && rec.code >= 300) hardFailures.push({ ...rec, note: 'redirect max exceeded' });
    else results.push(rec);
  } else {
    externalNotes.push(rec);
  }
  return rec;
}

const results = [];
const hardFailures = [];
const externalNotes = [];

const allow = [...SAME_SITE_ROUTES, ...EXTERNAL_ALLOWLIST];
for (const r of allow) {
  const hard = r.startsWith('/');
  check(SITE + r, hard);
}

if (hardFailures.length) {
  console.log('HARD FAILURES (same-site):');
  hardFailures.forEach((r) => console.log(`  - ${r.url} -> status ${r.code}${r.note ? ' (' + r.note + ')' : ''}`));
  console.log(`SAME-SITE: ${results.length} ok / ${hardFailures.length} failed`);
  process.exit(1);
}
console.log(`PASS: live same-site validation (${results.length} routes ok)`);
if (externalNotes.length) {
  console.log('EXTERNAL (non-blocking):');
  externalNotes.forEach((r) => console.log(`  - ${r.url} -> ${r.code || r.error}`));
}
process.exit(0);
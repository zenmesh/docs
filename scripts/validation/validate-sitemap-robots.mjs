#!/usr/bin/env node
/**
 * validate-sitemap-robots.mjs — Sitemap + robots + llms.txt validation (A5).
 *
 * Operates on generated build/. Verifies:
 *   - sitemap.xml exists and is well-formed XML with <url><loc> entries
 *   - every sitemap <loc> maps to a generated file (no 404 candidates)
 *   - robots.txt exists, references sitemap, and allows the site
 *   - llms.txt exists and references the expected AI discovery files
 *
 * Exit 0 = PASS, 1 = FAIL.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
const BUILD = path.join(ROOT, 'build');

const errors = [];

function hasFile(p) {
  return fs.existsSync(path.join(BUILD, p));
}

// sitemap
const smPath = path.join(BUILD, 'sitemap.xml');
if (!hasFile('sitemap.xml')) {
  errors.push('missing sitemap.xml');
} else {
  const sm = fs.readFileSync(smPath, 'utf-8');
  if (!sm.includes('<urlset') || !sm.includes('<loc>')) {
    errors.push('sitemap.xml is not a valid urlset with <loc> entries');
  } else {
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) errors.push('sitemap.xml has zero <loc> entries');
    for (const loc of locs) {
      const u = new URL(loc);
      // Sitemap locs are public URLs served under baseUrl ('/docs'); the
      // build file lives at the baseUrl-stripped path (route /docs/X -> build/X).
      let pathname = u.pathname;
      const BASE = '/docs';
      if (pathname === BASE || pathname.startsWith(BASE + '/')) {
        pathname = pathname === BASE ? '/' : pathname.slice(BASE.length);
      }
      const rel = pathname.replace(/^\/+/, '');
      const cand = path.join(BUILD, rel);
      const candIdx = path.join(BUILD, rel, 'index.html');
      if (!fs.existsSync(cand) && !fs.existsSync(candIdx) && !fs.existsSync(cand + '.html')) {
        errors.push(`sitemap <loc> unresolved in build: ${loc}`);
      }
    }
  }
}

// robots
if (!hasFile('robots.txt')) {
  errors.push('missing robots.txt');
} else {
  const rb = fs.readFileSync(path.join(BUILD, 'robots.txt'), 'utf-8');
  if (!/sitemap:\s*\S+/i.test(rb)) errors.push('robots.txt does not reference a sitemap');
  if (!/allow:\s*\//i.test(rb) && !/user-agent:\s*\*/i.test(rb)) errors.push('robots.txt missing user-agent/allow');
}

// llms.txt
if (!hasFile('llms.txt')) {
  errors.push('missing llms.txt');
} else {
  const ll = fs.readFileSync(path.join(BUILD, 'llms.txt'), 'utf-8');
  for (const expected of ['ai/discovery-crawler-smoke-v1.json', 'ai/ai-discovery-registry.json']) {
    if (!ll.includes(expected)) errors.push(`llms.txt does not reference ${expected}`);
  }
}

if (errors.length) {
  const dedup = [...new Set(errors)];
  console.log(`FAIL (${dedup.length}):`);
  dedup.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}
console.log('PASS: sitemap.xml + robots.txt + llms.txt validation');
process.exit(0);
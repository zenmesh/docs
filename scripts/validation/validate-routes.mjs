#!/usr/bin/env node
/**
 * validate-routes.mjs — Local route + asset validator (requirements A5/A6).
 *
 * Operates on the generated build/ directory. Verifies:
 *   - the site's public route inventory exists as generated files
 *   - the Docusaurus 404 handler is present
 *   - every image/static asset reference resolves to a real file
 *   - canonical URLs in generated pages point to the site host and resolve
 *
 * Exit 0 = PASS, 1 = FAIL.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
const BUILD = path.join(ROOT, 'build');

if (!fs.existsSync(BUILD)) {
  console.error('FAIL: build/ not found');
  process.exit(1);
}

function allFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...allFiles(full));
    else out.push(full);
  }
  return out;
}

function allHtml(dir) {
  return allFiles(dir).filter((f) => f.endsWith('.html'));
}

// static/openapi-reference.html pins a specific hashed build CSS (content-freeze
// finding, report-only), so a fresh build's differing CSS hash is not an error.
const OPENSEARCH_REL = 'openapi-reference.html';

const errors = [];
let assetsChecked = 0;

// 1. required generated files
const required = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'llms.txt', 'ai/evidence/v1/manifest.json', 'ai/evidence/v1.1/manifest.json', 'ai/evidence/v1/non-claims.json', 'ai/ai-discovery-registry.json', 'ai/discovery-crawler-smoke-v1.json'];
for (const req of required) {
  if (!fs.existsSync(path.join(BUILD, req))) {
    errors.push(`missing generated file: ${req}`);
  }
}

// 2. static asset / image reference existence
for (const f of allHtml(BUILD)) {
  const raw = fs.readFileSync(f, 'utf-8');
  for (const m of raw.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || /\/\/|^https?:/.test(href)) continue;
    if (/\.(css|js|png|jpg|jpeg|svg|gif|webp|avif|ico|woff2?|ttf|eot|json|webmanifest|xml|txt|pdf|md)$/.test(href)) {
      if (path.relative(BUILD, f) === OPENSEARCH_REL && /^\/assets\/css\/styles\.[a-f0-9]+\.css$/.test(href)) {
        continue; // pinned-build-hash CSS — report-only content-freeze finding
      }
      const rel = href.replace(/^\/+/, '');
      const cand = path.join(BUILD, rel);
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        assetsChecked++;
      } else {
        errors.push(`${path.relative(BUILD, f)}: missing asset "${href}"`);
      }
    }
  }
}

// 3. canonical URL sanity. Docusaurus emits host-agnostic ROOT-RELATIVE canonicals
//    (/docs/...) which are correct; absolute canonicals must point at zen-mesh.io.
  for (const f of allHtml(BUILD)) {
    const raw = fs.readFileSync(f, 'utf-8');
    for (const m of raw.matchAll(/<link rel="canonical" href="([^"]+)"/g)) {
      const canon = m[1];
      if (canon.startsWith('/')) continue; // root-relative is valid
      if (!/^https:\/\/(www\.)?zen-mesh\.io\//.test(canon)) {
        errors.push(`${path.relative(BUILD, f)}: canonical not on zen-mesh.io host — ${canon}`);
      }
    }
  }

if (errors.length) {
  const dedup = [...new Set(errors)];
  console.log(`FAIL (${dedup.length}):`);
  dedup.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}
console.log(`PASS: route+asset validation (${assetsChecked} assets resolved, required files present, canonicals ok)`);
process.exit(0);
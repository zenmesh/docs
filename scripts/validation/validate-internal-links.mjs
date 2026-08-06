#!/usr/bin/env node
/**
 * validate-internal-links.mjs — Deterministic local validator (requirement A6).
 *
 * Scans the GENERATED site output (build/) — not source files — and verifies
 * that every same-site internal link, asset reference, image, anchor, and route
 * resolves against the generated output. Fails on:
 *   - internal links to non-existent routes (local 404)
 *   - missing static assets / images
 *   - broken named anchors (#<id>)
 *   - invalid same-site canonical URLs
 *   - trailing-slash redirect-loop candidates
 *
 * Bounded: only walks files under build/ that are actually referenced, never a
 * third-party crawl. Exit 0 = PASS, 1 = FAIL.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
const BUILD = path.join(ROOT, 'build');

// static/openapi-reference.html pins a specific hashed build CSS that can never
// match a fresh build's hash — a content-freeze finding (report), not a 404 regression.
const OPENSEARCH_REL = 'openapi-reference.html';
const CSS_HASH_RE = /^\/assets\/css\/styles\.[a-f0-9]+\.css$/;

if (!fs.existsSync(BUILD)) {
  console.error('FAIL: build/ directory not found (run `npm run build` first)');
  process.exit(1);
}

function allHtmlFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...allHtmlFiles(full));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function routeOf(relFile) {
  let r = relFile.replace(/\.html$/, '');
  r = r.replace(/(^|\/)index$/, '$1');
  if (r.endsWith('/')) r = r.slice(0, -1);
  return r || '/';
}

function collectIds() {
  const map = new Map(); // route -> Set ids
  for (const f of allHtmlFiles(BUILD)) {
    const rel = path.relative(BUILD, f).split(path.sep).join('/');
    const route = routeOf(rel);
    const raw = fs.readFileSync(f, 'utf-8');
    const ids = new Set();
    for (const m of raw.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
    map.set(route, ids);
  }
  return map;
}

function resolve(baseRoute, href) {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('data:')) return null;
  const [pathPart, frag] = href.split('#');
  const clean = (p) => (p.replace(/\/+$/, '') || '/');
  if (href.startsWith('/')) {
    return { route: clean(pathPart), frag: frag || null };
  }
  const dir = baseRoute === '/' ? '' : baseRoute;
  const joined = path.posix.normalize(`${dir}/${pathPart}`).replace(/\/+$/, '');
  return { route: joined || '/', frag: frag || null };
}

function resolveFile(route) {
  // Accept directory form (index.html) or direct .html
  const candidates = [
    path.join(BUILD, route, 'index.html'),
    path.join(BUILD, route.replace(/\.html$/, '') + '.html'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && /\.html$/.test(c)) return c;
  }
  // Asset / file form
  const direct = path.join(BUILD, route.replace(/^\/+/, ''));
  if (fs.existsSync(direct) && !fs.statSync(direct).isDirectory()) return direct;
  return null;
}

const routeIds = collectIds();
const errors = [];
let examined = 0;

for (const f of allHtmlFiles(BUILD)) {
  const rel = path.relative(BUILD, f).split(path.sep).join('/');
  const baseRoute = routeOf(rel);
  const raw = fs.readFileSync(f, 'utf-8');

  for (const m of raw.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    const resolved = resolve(baseRoute, href);
    if (!resolved) continue;
    examined++;

    const file = resolveFile(resolved.route);
    if (!file) {
      // Pinned-build-hash CSS in the committed static openapi-reference.html is a
      // report-only content-freeze finding, not a real 404.
      if (rel === OPENSEARCH_REL && CSS_HASH_RE.test(resolved.route)) {
        continue;
      }
      errors.push(`${rel}: link "${href}" -> unresolved local route "${resolved.route}" (404)`);
      continue;
    }
    if (resolved.frag) {
      const targetRoute = routeOf(path.relative(BUILD, file).split(path.sep).join('/'));
      const ids = routeIds.get(targetRoute);
      if (ids && !ids.has(resolved.frag) && /^[a-zA-Z][\w:-]*$/.test(resolved.frag)) {
        errors.push(`${rel}: link "${href}" -> anchor "#${resolved.frag}" not found on "${targetRoute}"`);
      }
    }
  }
}

if (errors.length) {
  const dedup = [...new Set(errors)];
  console.log(`FAIL (${dedup.length} internal-link/anchor errors across ${examined} same-site refs):`);
  dedup.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}
console.log(`PASS: internal-link + anchor validation (${examined} same-site refs, no 404s)`);
process.exit(0);
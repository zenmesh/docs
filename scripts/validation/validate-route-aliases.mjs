#!/usr/bin/env node
/**
 * validate-route-aliases.mjs — Route-alias and redirect validator.
 *
 * Prevents the recurring "link 404s without /docs/ in the path" class of
 * incident. The site serves docs under /docs/<section>/<page>, while many
 * external links, search indexes, and AI crawlers use the legacy prefix-less
 * form /<section>/<page>. That mapping is maintained in THREE places
 * (vercel.json redirects, public/_redirects, and the
 * plugin-client-redirects stubs generated from docusaurus.config.ts). Any of
 * them drifting from the actual page set produces live 404s.
 *
 * Full mode (default, requires build/ — runs in pre-push after the build):
 *   A1. Every redirect destination resolves to a real page or static file
 *       (wildcards must match at least one real route; expanded destinations
 *       must exist).
 *   A2. Every /docs/<page> has a working legacy alias /<page>: a real route,
 *       a generated redirect stub, or an explicit/wildcard redirect rule.
 *       A page that fails this check is a guaranteed live 404 for the
 *       prefix-less URL.
 *   A3. No redirect stub points at a non-existent page.
 *   A4. No redirect rule shadows a real page or static file
 *       (e.g. a /ai/(.*) wildcard would shadow /ai/*.json evidence files;
 *       a redirect whose source is an existing page is a loop/shadow hazard —
 *       only intra-/docs renames are allowed).
 *   A5. Every absolute https://docs.zen-mesh.io/... URL in llms.txt resolves
 *       against the built site.
 *
 * Fast mode (--fast, no build needed — runs in pre-commit):
 *   B1. vercel.json and public/_redirects parse, have no duplicate sources,
 *       and destinations are well-formed.
 *   B2. Redirect sources do not shadow files in public/ or static/.
 *
 * Exit 0 = PASS, 1 = FAIL.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
const FAST = process.argv.includes('--fast');
const errors = [];
const notes = [];

function fail(msg) {
  errors.push(msg);
}

// ---------------------------------------------------------------------------
// Build-output inventory (full mode only)
// ---------------------------------------------------------------------------

/** @type {Set<string>} real (non-stub) page routes */
let realPages = new Set();
/** @type {Map<string, string>} stub route -> redirect target route */
const stubs = new Map();
/** @type {Set<string>} static (non-HTML) file routes */
let staticFiles = new Set();

function walkFiles(dir, rel, out) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const r = rel + '/' + e.name;
    if (e.isDirectory()) walkFiles(full, r, out);
    else out.push({ route: r, file: full });
  }
}

function routeOfIndex(rel) {
  let r = rel.replace(/\.html$/, '').replace(/\/index$/, '');
  return r || '/';
}

function inventory() {
  const files = [];
  walkFiles(path.join(ROOT, 'build'), '', files);
  for (const { route, file } of files) {
    if (route === '/404.html') continue;
    if (route.endsWith('.html') && route.endsWith('/index.html')) {
      const r = routeOfIndex(route);
      const raw = fs.readFileSync(file, 'utf-8');
      const stub = raw.match(/http-equiv="refresh" content="0; url=([^"]+)"/);
      if (stub) stubs.set(r, stub[1]);
      else realPages.add(r);
    } else if (route.endsWith('.html')) {
      // flat .html asset pages (e.g. openapi-reference.html)
      realPages.add(route);
    } else {
      staticFiles.add(route);
    }
  }
}

function resolvesToContent(route) {
  return realPages.has(route) || staticFiles.has(route);
}

// ---------------------------------------------------------------------------
// Redirect config loading
// ---------------------------------------------------------------------------

function loadVercel() {
  const v = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  return (v.redirects || []).map((r) => ({ source: r.source, dest: r.destination, kind: 'vercel.json' }));
}

function loadUnderscoreRedirects() {
  const raw = fs.readFileSync(path.join(ROOT, 'public/_redirects'), 'utf8');
  const rules = [];
  for (const line of raw.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const m = line.match(/^(\S+)\s+(\S+)(?:\s+\d+!)?$/);
    if (!m) {
      fail(`public/_redirects: unparseable line: ${JSON.stringify(line)}`);
      continue;
    }
    rules.push({ source: m[1], dest: m[2], kind: 'public/_redirects' });
  }
  return rules;
}

/** /sec/(.*) (vercel) and /sec/* (_redirects) -> {prefix, template} */
function parseRule(rule) {
  const vx = rule.source.match(/^\/(.+)\/\(\.\*\)$/);
  if (vx) {
    const dt = rule.dest.match(/^(.*)\$\d$/);
    return { wildcard: true, prefix: '/' + vx[1] + '/', destPrefix: dt ? dt[1] : rule.dest };
  }
  const nx = rule.source.match(/^(.*)\/\*$/);
  if (nx) {
    const dt = rule.dest.match(/^(.*)\/\*$/);
    return { wildcard: true, prefix: nx[1] + '/', destPrefix: dt ? dt[1] : rule.dest };
  }
  return { wildcard: false, source: normalize(rule.source), dest: normalize(rule.dest) };
}

function normalize(p) {
  let r = p.replace(/\/+$/, '');
  return r || '/';
}

/** Apply a rule to a concrete request path; returns destination or null. */
function applyRule(parsed, reqPath) {
  if (!parsed.wildcard) return normalize(parsed.source) === normalize(reqPath) ? normalize(parsed.dest) : null;
  if (!reqPath.startsWith(parsed.prefix)) return null;
  const tail = reqPath.slice(parsed.prefix.length);
  return parsed.destPrefix + tail;
}

// ---------------------------------------------------------------------------
// Shared config-level checks (fast + full)
// ---------------------------------------------------------------------------

function checkConfigBasics(rules) {
  // The same source may legitimately appear in both vercel.json and
  // public/_redirects; only duplicates within one file are a problem.
  const seen = new Set();
  for (const r of rules) {
    const key = `${r.kind}\t${r.source}`;
    if (seen.has(key)) {
      fail(`${r.kind}: duplicate redirect source "${r.source}" (also defined earlier) — remove the stale entry`);
    }
    seen.add(key);
    if (!r.source.startsWith('/')) {
      fail(`${r.kind}: source "${r.source}" must be a site-absolute path`);
    }
    if (!/^(https?:\/\/|\/)/.test(r.dest)) {
      fail(`${r.kind}: destination "${r.dest}" for "${r.source}" is neither absolute URL nor site path`);
    }
    const hasCapture = /\(\.\*\)|\/\*$/.test(r.source);
    const destHasRef = /\$\d$/.test(r.dest) || /\/\*$/.test(r.dest);
    if (hasCapture !== destHasRef) {
      fail(`${r.kind}: "${r.source}" -> "${r.dest}" capture/ref mismatch (wildcard source needs $1/* in destination and vice versa)`);
    }
  }
}

/** Fast-mode shadow check against files in public/ and static/. */
function checkNoStaticShadowFast(rules) {
  const files = [];
  walkFiles(path.join(ROOT, 'public'), '', files);
  walkFiles(path.join(ROOT, 'static'), '', files);
  const fileRoutes = new Set(files.map((f) => f.route));
  for (const r of rules) {
    const parsed = parseRule(r);
    if (parsed.wildcard) {
      for (const fr of fileRoutes) {
        if (fr.startsWith(parsed.prefix) && applyRule(parsed, fr) !== fr) {
          fail(`${r.kind}: wildcard "${r.source}" would shadow existing static file "${fr}" (redirected to ${applyRule(parsed, fr)}) — public/ and static/ files must keep their canonical URLs`);
        }
      }
    } else if (fileRoutes.has(parsed.source) && parsed.dest !== parsed.source) {
      fail(`${r.kind}: redirect "${r.source}" -> "${r.dest}" shadows an existing public/static file`);
    }
  }
}

// ---------------------------------------------------------------------------
// Full-mode checks against the build
// ---------------------------------------------------------------------------

function checkDestinations(rules) {
  for (const r of rules) {
    const parsed = parseRule(r);
    if (/^https?:\/\//.test(r.dest)) continue;
    if (!parsed.wildcard) {
      if (!resolvesToContent(parsed.dest)) {
        fail(`${r.kind}: "${r.source}" -> "${parsed.dest}" — destination is not a built page or file (redirects to a 404)`);
      }
      continue;
    }
    // Wildcard: at least one real page must sit under the destination prefix,
    // and every source side that has a matching destination page is covered by
    // design; the alias-coverage check (A2) catches the per-page gaps.
    const matches = [...realPages].filter((p) => p.startsWith(parsed.destPrefix));
    if (matches.length === 0) {
      fail(`${r.kind}: wildcard "${r.source}" -> "${r.dest}" matches no built page under "${parsed.destPrefix}" (every hit on this rule lands on a 404)`);
    }
  }
}

function checkAliasCoverage(rules) {
  const parsedRules = rules.map(parseRule);
  const missing = [];
  for (const page of realPages) {
    if (!page.startsWith('/docs/')) continue;
    const legacy = page.slice('/docs'.length);
    if (legacy === '/') continue;
    if (realPages.has(legacy) || stubs.has(legacy)) continue;
    const viaRule = parsedRules.some((p) => {
      const dest = applyRule(p, legacy);
      return dest !== null && resolvesToContent(dest);
    });
    if (!viaRule) missing.push(legacy);
  }
  for (const m of missing) {
    fail(`alias coverage: page "/docs${m}" has no working legacy URL "${m}" — it will 404 for prefix-less links. Add it to the redirect stubs (docusaurus.config.ts) or vercel.json.`);
  }
  if (missing.length === 0) {
    notes.push(`alias coverage: all ${[...realPages].filter((p) => p.startsWith('/docs/')).length} /docs pages have a resolvable legacy URL`);
  }
}

function checkStubTargets() {
  for (const [from, to] of stubs) {
    const target = normalize(to.split('#')[0].split('?')[0]);
    if (!realPages.has(target)) {
      fail(`redirect stub "${from}" points at "${target}" which is not a built page`);
    }
  }
}

function checkNoShadowBuilt(rules) {
  for (const r of rules) {
    const parsed = parseRule(r);
    if (parsed.wildcard) continue; // wildcard shadowing of statics checked in fast mode; page shadowing below via explicit
    if (realPages.has(parsed.source) && !parsed.source.startsWith('/docs/')) {
      fail(`${r.kind}: redirect source "${r.source}" is itself a real page outside /docs — this rule shadows live content`);
    }
  }
}

function checkLlmsTxt() {
  const llms = fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8');
  const urls = new Set(
    [...llms.matchAll(/https:\/\/docs\.zen-mesh\.io(\/[^\s)`",\]]*)/g)].map((m) => m[1]),
  );
  for (const u of urls) {
    const p = normalize(u);
    if (!resolvesToContent(p) && !stubs.has(p)) {
      fail(`llms.txt: URL https://docs.zen-mesh.io${u} does not resolve to a built page/file`);
    }
  }
  if (urls.size) notes.push(`llms.txt: ${urls.size} canonical site URLs resolve`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const vercel = loadVercel();
const underscore = loadUnderscoreRedirects();
const allRules = [...vercel, ...underscore];

checkConfigBasics(allRules);

if (FAST) {
  checkNoStaticShadowFast(allRules);
} else {
  if (!fs.existsSync(path.join(ROOT, 'build'))) {
    console.error('FAIL: build/ directory not found (run `npm run build` first, or use --fast)');
    process.exit(1);
  }
  inventory();
  if (realPages.size === 0) fail('build/ contains no pages — did the build complete?');
  checkDestinations(allRules);
  checkAliasCoverage(allRules);
  checkStubTargets();
  checkNoShadowBuilt(allRules);
  checkNoStaticShadowFast(allRules);
  checkLlmsTxt();
  notes.push(`inventory: ${realPages.size} pages, ${stubs.size} redirect stubs, ${staticFiles.size} static files`);
}

if (errors.length) {
  console.error(`FAIL: route-alias validation (${errors.length} problem${errors.length === 1 ? '' : 's'}):`);
  for (const e of [...new Set(errors)]) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `PASS: route-alias validation (${FAST ? 'fast/config' : 'full/build'} mode)` +
    (notes.length ? '\n  ' + notes.join('\n  ') : ''),
);
process.exit(0);

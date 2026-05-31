#!/usr/bin/env node
/**
 * HELPER054: Record live crawler smoke for discovery endpoints (run before commit).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOSTS = ['docs.zen-mesh.io', 'www.zen-mesh.io', 'zen-mesh.io'];
const PATHS = [
  '/llms.txt',
  '/llms-full.txt',
  '/ai/ai-discovery-registry.json',
  '/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json',
  '/ai/security/v1/local-trust-posture.json',
  '/ai/evidence/v1/non-claims.json',
  '/ai/evidence/v1/manifest.json',
];

function probe(host, urlPath) {
  const url = `https://${host}${urlPath}`;
  try {
    const out = execSync(
      `curl -sSIL -o /dev/null -w '%{http_code}|%{content_type}|%{url_effective}|%{num_redirects}' '${url}'`,
      { encoding: 'utf-8', timeout: 20000 },
    ).trim();
    const [final_status, content_type, url_effective, num_redirects] = out.split('|');
    const first_status = parseInt(
      execSync(`curl -sI -o /dev/null -w '%{http_code}' '${url}'`, { encoding: 'utf-8', timeout: 15000 }).trim(),
      10,
    );
    const head = execSync(`curl -sI '${url}' 2>/dev/null | tr -d '\\r'`, { encoding: 'utf-8', timeout: 15000 });
    const location = (head.match(/^location:\s*(.+)$/im) || [])[1] || null;
    let body_sample = '';
    if (final_status === '200' && urlPath.endsWith('.txt')) {
      body_sample = execSync(`curl -sL '${url_effective}' | head -c 80`, { encoding: 'utf-8', timeout: 15000 })
        .replace(/\s+/g, ' ')
        .trim();
    }
    return {
      url,
      first_status,
      final_status: parseInt(final_status, 10),
      content_type,
      redirect_count: parseInt(num_redirects, 10),
      location,
      url_effective,
      body_starts_with_html: body_sample.toLowerCase().includes('<html'),
      body_sample: body_sample ? `${body_sample.slice(0, 60)}…` : undefined,
    };
  } catch (e) {
    return { url, error: String(e.message || e) };
  }
}

function main() {
  const hosts = {};
  for (const host of HOSTS) {
    const endpoints = {};
    for (const p of PATHS) {
      endpoints[p] = probe(host, p);
    }
    hosts[host] = {
      notes:
        host === 'docs.zen-mesh.io'
          ? 'Canonical host for machine-readable /ai/* JSON and llms.txt.'
          : host === 'www.zen-mesh.io'
            ? 'Marketing host: /llms.txt and /llms-full.txt served; /ai/* 308 → docs.zen-mesh.io.'
            : 'Apex: permanent redirect to www for site paths; use docs for JSON registries.',
      endpoints,
    };
  }

  const doc = {
    schema_version: '1.0.0',
    document: 'discovery-crawler-smoke',
    task_ref: 'HELPER054',
    checked_at: new Date().toISOString(),
    canonical_origin: 'https://docs.zen-mesh.io',
    probe_method: 'curl -sSIL (no JS); records first/final status, content-type, redirect chain',
    hosts,
    claim_boundaries:
      'Smoke checks transport only — not proof of security maturity or production readiness.',
  };

  const out = path.join(ROOT, 'static/ai/discovery-crawler-smoke-v1.json');
  fs.writeFileSync(out, `${JSON.stringify(doc, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, out)}`);
}

main();

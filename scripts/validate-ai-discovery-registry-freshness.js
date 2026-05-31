#!/usr/bin/env node
/**
 * HELPER052: AI discovery registry freshness and parity guard.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const REQUIRED_SECURITY_PATHS = [
  '/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/attack-model.json',
  '/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json',
  '/ai/security/v1/local-trust-posture.json',
];

const REQUIRED_EVIDENCE_PATHS = [
  '/ai/evidence/v1/manifest.json',
  '/ai/evidence/v1/non-claims.json',
];

const FORBIDDEN_ID = /\b(ST-003|N086|FLOW-0[123]|HELPER\d{3}|H\d{3}|zen-platform:|docs\/80-EVIDENCE)\b/i;

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

function parseMs(iso) {
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? 0 : ms;
}

function main() {
  console.log('[ai-discovery-registry-freshness] HELPER052...');

  const registryPath = path.join(ROOT, 'static/ai/ai-discovery-registry.json');
  const manifestPath = path.join(ROOT, 'static/ai/evidence/v1/manifest.json');
  const llms = fs.readFileSync(path.join(ROOT, 'static/llms.txt'), 'utf-8');

  ok('registry exists', fs.existsSync(registryPath));
  ok('manifest exists', fs.existsSync(manifestPath));

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  ok('registry no forbidden paths', !FORBIDDEN_ID.test(JSON.stringify(registry)));
  ok('registry has registry_updated_at', Boolean(registry.registry_updated_at));
  ok('manifest has ai_discovery', Boolean(manifest.ai_discovery));
  ok(
    'manifest ai_discovery.registry_updated_at matches registry',
    manifest.ai_discovery?.registry_updated_at === registry.registry_updated_at,
  );

  const paths = new Set((registry.surfaces || []).map((s) => s.url_path));
  for (const p of [...REQUIRED_SECURITY_PATHS, ...REQUIRED_EVIDENCE_PATHS]) {
    ok(`registry lists ${p}`, paths.has(p));
  }

  ok('security bundle date present', Boolean(registry.security_posture_bundle_last_updated));
  const secMs = parseMs(registry.security_posture_bundle_last_updated);
  const regMs = parseMs(registry.registry_updated_at);
  ok('security bundle <= registry_updated_at', secMs <= regMs);

  const aliases = registry.www_root_aliases || [];
  ok('registry lists www_root_aliases', aliases.length >= 2);
  const aliasPaths = new Set(aliases.map((a) => a.alias_path));
  ok('alias /manifest.json', aliasPaths.has('/manifest.json'));
  ok('alias /non-claims.json', aliasPaths.has('/non-claims.json'));
  for (const a of aliases) {
    ok(
      `alias ${a.alias_path} points to docs`,
      typeof a.canonical_url === 'string' && a.canonical_url.startsWith('https://docs.zen-mesh.io/ai/'),
    );
  }

  for (const surface of registry.surfaces || []) {
    const sMs = parseMs(surface.last_updated);
    ok(
      `surface ${surface.id} covered by registry_updated_at`,
      sMs <= regMs,
      `${surface.last_updated} > ${registry.registry_updated_at}`,
    );
  }

  const capMs = parseMs(manifest.generated_at);
  const secBundleMs = parseMs(registry.security_posture_bundle_last_updated);
  if (secBundleMs > capMs) {
    ok('security newer than capabilities manifest (documented)', Boolean(registry.capabilities_manifest_generated_at));
    ok('freshness_note in manifest', Boolean(manifest.ai_discovery?.freshness_note));
  } else {
    ok('capability manifest date coherent', true);
  }

  ok('llms links claim-maturity', llms.includes('/ai/security/v1/claim-maturity.json'));
  ok(
    'llms links discovery registry',
    llms.includes('/ai/ai-discovery-registry.json') || llms.includes('ai-discovery-registry'),
  );

  const secFiles = [
    'static/ai/security/v1/claim-maturity.json',
    'static/ai/security/v1/attack-model.json',
    'static/ai/security/v1/primitives.json',
    'static/ai/security/v1/gaps.json',
  ];
  let newestSec = 0;
  for (const f of secFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf-8'));
    const d = data.last_updated ? parseMs(data.last_updated.length === 10 ? `${data.last_updated}T23:59:59.000Z` : data.last_updated) : 0;
    newestSec = Math.max(newestSec, d, fs.statSync(path.join(ROOT, f)).mtimeMs);
  }
  ok('registry_updated_at covers security content', regMs >= newestSec - 1000);

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  if (failed) {
    console.log('Hint: run npm run generate:ai-discovery-registry');
    process.exit(1);
  }
  process.exit(0);
}

main();

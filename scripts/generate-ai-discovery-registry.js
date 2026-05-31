#!/usr/bin/env node
/**
 * HELPER052: Canonical AI public-surface discovery registry generator.
 * Sets registry_updated_at from max(per-surface content dates and file mtimes) — not cosmetic now().
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SURFACES = [
  {
    id: 'evidence-manifest',
    url_path: '/ai/evidence/v1/manifest.json',
    file: 'static/ai/evidence/v1/manifest.json',
    date_fields: ['generated_at'],
    kind: 'capabilities',
  },
  {
    id: 'evidence-non-claims',
    url_path: '/ai/evidence/v1/non-claims.json',
    file: 'static/ai/evidence/v1/non-claims.json',
    date_fields: [],
    kind: 'non_claims',
  },
  {
    id: 'evidence-compliance-map',
    url_path: '/ai/evidence/v1/compliance-map.json',
    file: 'static/ai/evidence/v1/compliance-map.json',
    date_fields: ['generated_at'],
    kind: 'compliance',
  },
  {
    id: 'evidence-wedge-claim-map',
    url_path: '/ai/evidence/v1/wedge-claim-map.json',
    file: 'static/ai/evidence/v1/wedge-claim-map.json',
    date_fields: ['last_updated'],
    kind: 'wedge',
  },
  {
    id: 'security-claim-maturity',
    url_path: '/ai/security/v1/claim-maturity.json',
    file: 'static/ai/security/v1/claim-maturity.json',
    date_fields: ['last_updated'],
    kind: 'security_posture',
  },
  {
    id: 'security-attack-model',
    url_path: '/ai/security/v1/attack-model.json',
    file: 'static/ai/security/v1/attack-model.json',
    date_fields: ['last_updated'],
    kind: 'security_posture',
  },
  {
    id: 'security-primitives',
    url_path: '/ai/security/v1/primitives.json',
    file: 'static/ai/security/v1/primitives.json',
    date_fields: ['last_updated'],
    kind: 'security_posture',
  },
  {
    id: 'security-gaps',
    url_path: '/ai/security/v1/gaps.json',
    file: 'static/ai/security/v1/gaps.json',
    date_fields: ['last_updated'],
    kind: 'security_posture',
  },
  {
    id: 'security-local-trust-posture',
    url_path: '/ai/security/v1/local-trust-posture.json',
    file: 'static/ai/security/v1/local-trust-posture.json',
    date_fields: ['last_updated'],
    kind: 'security_posture',
  },
  {
    id: 'security-capability-validation',
    url_path: '/ai/security/v1/security-capability-validation.json',
    file: 'static/ai/security/v1/security-capability-validation.json',
    date_fields: ['generated_at'],
    kind: 'security_reference',
  },
  {
    id: 'security-credential-lifecycle',
    url_path: '/ai/security/v1/credential-lifecycle-ownership.json',
    file: 'static/ai/security/v1/credential-lifecycle-ownership.json',
    date_fields: ['generated_at'],
    kind: 'security_reference',
  },
  {
    id: 'llms-txt',
    url_path: '/llms.txt',
    file: 'static/llms.txt',
    date_fields: [],
    kind: 'discovery',
  },
];

function parseDateValue(value) {
  if (!value || typeof value !== 'string') return 0;
  const normalized = value.length === 10 ? `${value}T23:59:59.000Z` : value;
  const ms = Date.parse(normalized);
  return Number.isNaN(ms) ? 0 : ms;
}

function extractContentDates(obj, fields) {
  let max = 0;
  for (const field of fields) {
    if (obj && obj[field]) {
      max = Math.max(max, parseDateValue(obj[field]));
    }
  }
  return max;
}

function surfaceFreshness(spec) {
  const abs = path.join(ROOT, spec.file);
  if (!fs.existsSync(abs)) {
    throw new Error(`missing surface file: ${spec.file}`);
  }
  const mtimeMs = fs.statSync(abs).mtimeMs;
  let contentMs = 0;
  if (spec.file.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(abs, 'utf-8'));
    contentMs = extractContentDates(data, spec.date_fields);
    if (spec.date_fields.includes('last_updated') && Array.isArray(data.entries)) {
      for (const entry of data.entries) {
        contentMs = Math.max(contentMs, parseDateValue(entry.last_updated));
      }
    }
  }
  const effectiveMs = Math.max(contentMs, mtimeMs);
  return {
    last_updated: new Date(effectiveMs).toISOString(),
    source: contentMs >= mtimeMs ? 'content' : 'mtime',
  };
}

function main() {
  const surfaces = SURFACES.map((spec) => {
    const fresh = surfaceFreshness(spec);
    return {
      id: spec.id,
      url_path: spec.url_path,
      kind: spec.kind,
      last_updated: fresh.last_updated,
      freshness_source: fresh.source,
    };
  });

  const maxMs = Math.max(...surfaces.map((s) => Date.parse(s.last_updated)));
  const registryUpdatedAt = new Date(maxMs).toISOString();

  const manifestPath = path.join(ROOT, 'static/ai/evidence/v1/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const registry = {
    schema_version: '1.0.0',
    document: 'ai-discovery-registry',
    generated_by: 'scripts/generate-ai-discovery-registry.js',
    registry_updated_at: registryUpdatedAt,
    site_origin: 'https://docs.zen-mesh.io',
    readiness_scope:
      'Per-surface last_updated reflects file content dates and mtimes. Capability manifest generated_at may be older than security posture surfaces.',
    capabilities_manifest_generated_at: manifest.generated_at,
    security_posture_bundle_last_updated: (() => {
      const sec = surfaces.filter((s) => s.kind === 'security_posture');
      if (!sec.length) return '';
      return sec.reduce((best, s) =>
        Date.parse(s.last_updated) > Date.parse(best.last_updated) ? s : best,
      ).last_updated;
    })(),
    surfaces,
    claim_boundaries: [
      'Hash-chain/Merkle = integrity/tamper evidence only — not auth, identity, encryption, or replay prevention',
      'Idempotency helps detect/limit duplicates — not replay-proof delivery',
      'Narrative and blogs are not runtime proof',
      'Security gaps remain visible — do not convert backlog to product claims',
    ],
  };

  const registryOut = path.join(ROOT, 'static/ai/ai-discovery-registry.json');
  fs.writeFileSync(registryOut, `${JSON.stringify(registry, null, 2)}\n`);

  manifest.ai_discovery = {
    registry_ref: 'https://docs.zen-mesh.io/ai/ai-discovery-registry.json',
    registry_updated_at: registryUpdatedAt,
    capabilities_manifest_generated_at: manifest.generated_at,
    security_posture_surfaces: [
      '/ai/security/v1/claim-maturity.json',
      '/ai/security/v1/attack-model.json',
      '/ai/security/v1/primitives.json',
      '/ai/security/v1/gaps.json',
    ],
    freshness_note:
      'Use ai-discovery-registry.json per-surface last_updated for security posture; manifest.generated_at is capability inventory sync time.',
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`Wrote ${path.relative(ROOT, registryOut)}`);
  console.log(`registry_updated_at=${registryUpdatedAt}`);
  console.log(`Updated manifest ai_discovery (capabilities generated_at unchanged: ${manifest.generated_at})`);
}

main();

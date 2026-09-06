#!/usr/bin/env node
/**
 * generate-stable-evidence-manifest.mjs — Deterministically emit the stable
 * `/ai/evidence/v1/manifest.json` artifact for the AI evidence system.
 *
 * The stable v1 route is a channel, not a frozen file. It must always reflect
 * the CURRENT state of evidence (today v1.1), while explicitly classifying
 * prior v1.0 evidence as historical/superseded. This keeps the long-lived
 * `/ai/evidence/v1/manifest.json` URL truthful and never stale.
 *
 * It reads the authoritative v1.1 manifest from
 * `static/ai/evidence/v1.1/manifest.json` and renders a stable v1 artifact
 * that points at the current version, embeds a content digest, states a
 * freshness policy, and never contains local paths or unresolved refs.
 *
 * renderStableManifest() is exported so scripts/validate-ai-evidence.js can
 * enforce mechanical freshness: the committed stable artifact MUST equal
 * renderStableManifest(current v1.1 manifest) — any manual edit or stale
 * digest is a validation failure.
 *
 * Exit 0 on success, 1 on failure.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const V11_MANIFEST = path.join(ROOT, 'static/ai/evidence/v1.1/manifest.json');
const OUT_MANIFEST = path.join(ROOT, 'static/ai/evidence/v1/manifest.json');

// Canonical public docs origin (docs.zen-mesh.io is legacy redirect-only).
const DOCS_ORIGIN = 'https://www.zen-mesh.io/docs';

const CURRENT_EVIDENCE_VERSION = '1.1.0';

function sha256(buffer) {
  return execSync(`sha256sum`, { input: buffer }).toString().trim().split(/\s+/)[0];
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

export const SECURITY_POSTURE_SURFACES = [
  '/ai/security/v1/claim-maturity.json',
  '/ai/security/v1/attack-model.json',
  '/ai/security/v1/primitives.json',
  '/ai/security/v1/gaps.json',
];

// ai_discovery mirrors static/ai/ai-discovery-registry.json freshness into the
// stable channel. The registry generator owns that file; this generator owns
// the stable manifest (single writer per file).
export function renderAiDiscovery(registry, v11) {
  if (!registry || !registry.registry_updated_at) return undefined;
  return {
    registry_ref: `${DOCS_ORIGIN}/ai/ai-discovery-registry.json`,
    registry_updated_at: registry.registry_updated_at,
    capabilities_manifest_generated_at: v11.generated_at,
    security_posture_surfaces: SECURITY_POSTURE_SURFACES,
    freshness_note:
      'Use ai-discovery-registry.json per-surface last_updated for security posture; manifest.generated_at is capability inventory sync time.',
  };
}

export function renderStableManifest(v11, digest, aiDiscovery) {
  const generated_at = v11.generated_at;
  const scope = v11.evidence_scope || 'unknown';
  return {
    '@context': {
      schema: 'http://schema.org/',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
    },
    '@type': ['http://schema.org/DataSet'],
    schema_version: '1.0.0',
    artifact: {
      kind: 'stable_evidence_manifest',
      note: 'Stable evidence manifest channel. Reflects the current state of evidence and classifies prior versions as historical/superseded.',
      current_evidence_version: CURRENT_EVIDENCE_VERSION,
      current_manifest_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/manifest.json`,
    },
    generated_at: generated_at,
    evidence_scope: scope,
    current_state: {
      evidence_version: CURRENT_EVIDENCE_VERSION,
      current_manifest_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/manifest.json`,
      supersession_map_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/supersession-map.json`,
      non_regression_matrix_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/non-regression-matrix.json`,
      public_claim_gate_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/public-claim-gate.json`,
    },
    superseded_versions: {
      '1.0.0': {
        classification: 'historical_superseded',
        note: 'Prior evidence revision (scope local_mock_harness_plus_gke_cloud_demo). Retained for reference; not current truth.',
        manifest_url: `${DOCS_ORIGIN}/ai/evidence/v1/manifest.json`,
      },
    },
    digest: {
      algorithm: 'sha256',
      reference: 'current_version_manifest',
      value: digest,
    },
    freshness: {
      policy:
        'Regenerate whenever the current v1.1 evidence manifest advances. This artifact must not outlive its digest reference. scripts/validate-ai-evidence.js fails when this file diverges from the generator output for the current v1.1 manifest.',
      as_of_generated_at: generated_at,
    },
    capabilities: (v11.capabilities || []).map((c) => ({
      capability_id: c.id,
      name: c.name,
      status: c.proof_status,
      evidence_links: c.evidence_refs || [],
    })),
    non_claims: {
      note: 'Authoritative non-claims live in the versioned manifest and v1.1/non-claims.json.',
      non_claims_url: `${DOCS_ORIGIN}/ai/evidence/v1.1/non-claims.json`,
    },
    ...(aiDiscovery ? { ai_discovery: aiDiscovery } : {}),
  };
}

export function stableSourceDigest(v11RawBuffer) {
  // Digest over the canonical re-serialization of the parsed v1.1 manifest —
  // identical to the computation the validator performs.
  return sha256(Buffer.from(JSON.stringify(JSON.parse(v11RawBuffer.toString('utf-8')))));
}

const REGISTRY_FILE = path.join(ROOT, 'static/ai/ai-discovery-registry.json');

function readRegistry() {
  try {
    return JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

function main() {
  const v11Raw = fs.readFileSync(V11_MANIFEST);
  const v11 = JSON.parse(v11Raw.toString('utf-8'));
  const digest = stableSourceDigest(v11Raw);
  const stable = renderStableManifest(v11, digest, renderAiDiscovery(readRegistry(), v11));

  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(stable, null, 2) + '\n');
  console.log(`wrote ${path.relative(ROOT, OUT_MANIFEST)}`);
  console.log(
    `stable manifest reflects current evidence v1.1.0 (generated_at ${stable.generated_at}, source digest ${digest}); v1.0 classified historical.`
  );
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main();
}

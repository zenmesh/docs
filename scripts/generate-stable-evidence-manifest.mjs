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
 * Exit 0 on success, 1 on failure.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const V11_MANIFEST = path.join(ROOT, 'static/ai/evidence/v1.1/manifest.json');
const OUT_MANIFEST = path.join(ROOT, 'static/ai/evidence/v1/manifest.json');

function sha256(buffer) {
  return execSync(`sha256sum`, { input: buffer }).toString().trim().split(/\s+/)[0];
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function currentSourceCommit() {
  try {
    return execSync(`git -C ${JSON.stringify(ROOT)} rev-parse HEAD`, {
      encoding: 'utf-8',
    }).trim();
  } catch {
    return 'unknown';
  }
}

function main() {
  const v11 = readJSON(V11_MANIFEST);
  const generated_at = v11.generated_at;
  const scope = v11.evidence_scope || 'unknown';
  const digest = sha256(JSON.stringify(v11));

  const stable = {
    '@context': {
      schema: 'http://schema.org/',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
    },
    '@type': ['http://schema.org/DataSet'],
    schema_version: '1.0.0',
    artifact: {
      kind: 'stable_evidence_manifest',
      note: 'Stable evidence manifest channel. Reflects the current state of evidence and classifies prior versions as historical/superseded.',
      current_evidence_version: '1.1.0',
      current_manifest_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/manifest.json',
    },
    generated_at: generated_at,
    evidence_scope: scope,
    current_state: {
      evidence_version: '1.1.0',
      current_manifest_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/manifest.json',
      supersession_map_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/supersession-map.json',
      non_regression_matrix_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/non-regression-matrix.json',
      public_claim_gate_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/public-claim-gate.json',
    },
    superseded_versions: {
      '1.0.0': {
        classification: 'historical_superseded',
        note: 'Prior evidence revision (scope local_mock_harness_plus_gke_cloud_demo). Retained for reference; not current truth.',
        manifest_url: 'https://docs.zen-mesh.io/ai/evidence/v1/manifest.json',
      },
    },
    digest: {
      algorithm: 'sha256',
      reference: 'current_version_manifest',
      value: digest,
    },
    freshness: {
      policy: 'Regenerate whenever the current v1.1 evidence manifest advances. This artifact must not outlive its digest reference.',
      as_of_generated_at: generated_at,
    },
    capabilities: (v11.capabilities || []).map((c) => ({
      capability_id: c.capability_id,
      name: c.name,
      status: c.status,
      evidence_links: c.evidence_links || [],
    })),
    non_claims: {
      note: 'Authoritative non-claims live in the versioned manifest and v1.1/non-claims.json.',
      non_claims_url: 'https://docs.zen-mesh.io/ai/evidence/v1.1/non-claims.json',
    },
  };

  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(stable, null, 2) + '\n');
  console.log(`wrote ${path.relative(ROOT, OUT_MANIFEST)}`);
  console.log(
    `stable manifest reflects current evidence v1.1.0 (generated_at ${generated_at}); v1.0 classified historical.`
  );
}

main();
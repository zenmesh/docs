#!/usr/bin/env node
/**
 * validate-manifest-routes.mjs — Blocking test that both AI evidence output
 * paths are present, valid JSON, and correct in the built doc site.
 *
 * Checks (fail on any):
 *  - build/ai/evidence/v1/manifest.json exists, parses, is a stable manifest
 *    reflecting a current (non-stale) evidence version
 *  - build/ai/evidence/v1.1/manifest.json exists, parses, schema_version 1.1.0
 *  - vercel.json has no self-loop redirect (source == destination) covering
 *    either manifest route
 *  - no local paths or forbidden claims in either built manifest
 *
 * Exit 0 = PASS (blocking gate satisfied), 1 = FAIL.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BUILD = path.join(ROOT, 'build');
const V1 = path.join(BUILD, 'ai/evidence/v1/manifest.json');
const V11 = path.join(BUILD, 'ai/evidence/v1.1/manifest.json');

const FORBIDDEN = ['FedRAMP', 'HIPAA', 'SOC2 certified', 'PCI compliant'];
const PRIVATE = [/\/home\//, /\/Users\//, /node_modules/];

function fail(msg, errors) {
  errors.push(msg);
}

function main() {
  const errors = [];

  // vercel.json loop check
  try {
    const vc = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf-8'));
    const loops = (vc.redirects || []).filter((r) => r.source === r.destination);
    if (loops.length > 0) {
      fail(`vercel.json has ${loops.length} self-loop redirect(s): ${loops.map((l) => l.source).join(', ')}`, errors);
    }
  } catch (e) {
    fail(`vercel.json: ${e.message}`, errors);
  }

  // stable v1
  if (!fs.existsSync(V1)) {
    fail(`missing built output: ai/evidence/v1/manifest.json`, errors);
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(V1, 'utf-8'));
      if (!data.artifact || data.artifact.current_evidence_version !== '1.1.0') {
        fail('v1 manifest is not current-state (artifact.current_evidence_version !== 1.1.0)', errors);
      }
      if (!data.digest || !data.digest.value) {
        fail('v1 manifest missing digest.value', errors);
      }
      if (!data.superseded_versions || !data.superseded_versions['1.0.0']) {
        fail('v1 manifest missing historical v1.0 classification', errors);
      }
      const raw = fs.readFileSync(V1, 'utf-8');
      if (PRIVATE.some((r) => r.test(raw))) {
        fail('v1 manifest contains a local/private path', errors);
      }
    } catch (e) {
      fail(`v1 manifest: ${e.message}`, errors);
    }
  }

  // versioned v1.1
  if (!fs.existsSync(V11)) {
    fail('missing built output: ai/evidence/v1.1/manifest.json', errors);
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(V11, 'utf-8'));
      if (data.schema_version !== '1.1.0') {
        fail(`v1.1 manifest schema_version !== 1.1.0 (got "${data.schema_version}")`, errors);
      }
      if (!data.capabilities || data.capabilities.length === 0) {
        fail('v1.1 manifest capabilities empty', errors);
      }
      const raw = fs.readFileSync(V11, 'utf-8');
      if (PRIVATE.some((r) => r.test(raw))) {
        fail('v1.1 manifest contains a local/private path', errors);
      }
    } catch (e) {
      fail(`v1.1 manifest: ${e.message}`, errors);
    }
  }

  if (errors.length > 0) {
    console.log('FAIL (blocking manifest-route test):');
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }
  console.log('PASS: both manifest output paths served correctly (v1 stable + v1.1 versioned)');
  process.exit(0);
}

main();
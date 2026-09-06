#!/usr/bin/env node
/**
 * validate-ai-evidence.js — Validate AI evidence JSON files (stable v1 channel
 * and versioned v1.1).
 *
 * Checks:
 * - JSON is parseable
 * - v1.1 manifest validates against v1.1/manifest.schema.json (ajv, draft-07,
 *   with format assertions)
 * - Stable v1 manifest reflects a current evidence version (never stale)
 * - STABLE-CHANNEL CONVERGENCE: the committed stable artifact must equal the
 *   generator output (scripts/generate-stable-evidence-manifest.mjs) for the
 *   current v1.1 manifest — source digest, embedded pointer, capability
 *   projection, generated_at relation, and supersession linkage are all
 *   covered by the byte-level render comparison. Manual edits and stale
 *   digests FAIL.
 * - Supersession authority audit: a SUPERSEDED / HISTORICAL_ONLY /
 *   INVALIDATED record must never be marked as current authority
 *   (SUPERSEDED_AS_CURRENT / INVALIDATED_AS_CURRENT -> FAIL).
 * - Versioned manifest capabilities have valid status / maturity vocabulary
 * - No forbidden statuses: certified, authorized, compliant, satisfied, guaranteed
 * - No forbidden claims: FedRAMP authorized, HIPAA compliance/BAA, SOC2 certified,
 *   PCI compliant, Merkle auth/replay/identity/delivery
 * - No secret-looking values, internal employee names, or local private paths
 * - Every evidence reference (www.zen-mesh.io/docs and legacy
 *   docs.zen-mesh.io) resolves to an artifact present in static/ai/evidence/
 * - Exit code 0 = PASS, else 1
 *
 * `--self-test` runs the embedded negative/positive regression fixtures and
 * exits non-zero if any negative fixture unexpectedly passes or any positive
 * fixture unexpectedly fails.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { renderStableManifest, renderAiDiscovery, stableSourceDigest } from './generate-stable-evidence-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FORBIDDEN_STATUS_WORDS = [
  'certified',
  'authorized',
  'compliant',
  'satisfied',
  'guaranteed',
];

const FORBIDDEN_CLAIM_PATTERNS = [
  { pattern: /FedRAMP\s+authorized/i, label: 'FedRAMP authorized' },
  { pattern: /HIPAA\s+(compliant|BAA|compliance)/i, label: 'HIPAA compliance/BAA' },
  { pattern: /SOC2\s+certified/i, label: 'SOC2 certified' },
  { pattern: /PCI\s+(compliant|certified)/i, label: 'PCI compliant' },
  { pattern: /Merkle.*(?:auth|replay|identity|delivery)/i, label: 'Merkle auth/replay/identity/delivery' },
];

const SECRET_PATTERNS = [
  /(?<=^|[^a-zA-Z0-9])sk_[a-zA-Z0-9]{20,}(?=$|[^a-zA-Z0-9])/,
  /(?<=^|[^a-zA-Z0-9])AKIA[0-9A-Z]{16}(?=$|[^a-zA-Z0-9])/,
  /-----BEGIN\s+(RSA|EC|PRIVATE|OPENSSH)\s+KEY-----/,
  /(?:ghp|gho|ghu|ghs)_[a-zA-Z0-9]{36,}/,
  /(?:xox[baprs]-)[a-zA-Z0-9\-]{40,}/,
  /password\s*[:=]\s*['"][^'"]+['"]/i,
  /secret\s*[:=]\s*['"][^'"]+['"]/i,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i,
];

const EMPLOYEE_NAMES = [
  'andrew', 'bob', 'carol', 'charlie', 'dave', 'eve', 'frank', 'grace',
  'heidi', 'ivan', 'judy', 'leonardo', 'mallory', 'nancy', 'oscar',
  'peggy', 'sybil', 'trent', 'victor', 'walter', 'wendy',
  'alice', 'brent', 'cathy', 'dan', 'erin', 'fiona',
];

const PRIVATE_PATH_PATTERNS = [
  /\/home\/[^/]+\//,
  /\/Users\/[^/]+\//,
  /\b\.zen\//,
  /\bnode_modules\//,
];

const ALLOWED_CAPABILITY_STATUS = new Set([
  'victory_locked',
  'proven_sandbox',
  'proven_staging',
  'proven_production',
  'implementation_present',
  'architectural_commitment',
  'planned',
  'blocked',
  'not_claimed',
  'under_evaluation',
  'in_development',
]);

const HISTORICAL_SUPSESSION_STATES = new Set(['HISTORICAL_ONLY', 'INVALIDATED']);
const SUPERSEDED_STATES = new Set(['SUPERSEDED', ...HISTORICAL_SUPSESSION_STATES]);

function readJSON(filePath) {
  const fullPath = path.resolve(ROOT, filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return { data: JSON.parse(raw), raw };
}

function containsForbiddenWord(text) {
  const lower = text.toLowerCase();
  return FORBIDDEN_STATUS_WORDS.some((w) => lower.includes(w));
}

function scanForSecrets(text, filePath) {
  const found = [];
  for (const pattern of SECRET_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      found.push(`${filePath}: potential secret pattern "${match[0].slice(0, 20)}..."`);
    }
  }
  return found;
}

function scanForEmployeeNames(text, filePath) {
  const found = [];
  const words = text.toLowerCase().split(/[^a-z]/);
  for (const word of words) {
    if (EMPLOYEE_NAMES.includes(word) && word.length >= 4) {
      found.push(`${filePath}: possible employee/placeholder name "${word}"`);
    }
  }
  return found;
}

function scanForPrivatePaths(text, filePath) {
  const found = [];
  for (const pattern of PRIVATE_PATH_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      found.push(`${filePath}: possible internal-only path "${match[0]}"`);
    }
  }
  return found;
}

function scanForForbiddenClaims(text, filePath) {
  const found = [];
  for (const { pattern, label } of FORBIDDEN_CLAIM_PATTERNS) {
    if (pattern.test(text)) {
      found.push(`${filePath}: forbidden claim pattern "${label}"`);
    }
  }
  return found;
}

function validateAgainstSchema(data, errors, filePath) {
  const schemaPath = path.join(ROOT, 'static/ai/evidence/v1.1/manifest.schema.json');
  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  } catch (e) {
    errors.push(`${filePath}: cannot load manifest.schema.json — ${e.message}`);
    return;
  }
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  let validate;
  try {
    validate = ajv.compile(schema);
  } catch (e) {
    errors.push(`${filePath}: manifest.schema.json failed to compile — ${e.message}`);
    return;
  }
  const ok = validate(data);
  if (!ok) {
    for (const err of validate.errors.slice(0, 20)) {
      errors.push(`${filePath}: schema violation at ${err.instancePath} — ${err.message}`);
    }
  }
}

function stableChannelErrors(stableData, v11RawBuffer, v11Data, registry) {
  const errors = [];
  const expectedDigest = stableSourceDigest(v11RawBuffer);
  const expected = renderStableManifest(v11Data, expectedDigest, renderAiDiscovery(registry, v11Data));

  if (stableData.digest && stableData.digest.value !== expectedDigest) {
    errors.push(
      `STALE_STABLE_MANIFEST: v1/manifest.json digest ${stableData.digest.value} does not match current v1.1 manifest digest ${expectedDigest}`
    );
  }
  if (stableData.artifact && stableData.artifact.current_manifest_url !== expected.artifact.current_manifest_url) {
    errors.push(
      `STALE_STABLE_MANIFEST: embedded current-version pointer ${stableData.artifact.current_manifest_url} differs from generator output ${expected.artifact.current_manifest_url}`
    );
  }
  if (stableData.generated_at !== v11Data.generated_at) {
    errors.push(
      `STALE_STABLE_MANIFEST: generated_at ${stableData.generated_at} differs from source v1.1 manifest generated_at ${v11Data.generated_at}`
    );
  }
  const actualJson = JSON.stringify(stableData);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    errors.push(
      'STALE_STABLE_MANIFEST: committed v1/manifest.json differs from deterministic generator output for the current v1.1 manifest (manual edit or stale projection). Run: npm run generate:stable-evidence-manifest'
    );
  }
  return errors;
}

// Frozen (victory_locked) claims are immutable and therefore must carry
// explicit public boundaries. Absence of evidence must never become an
// inferred PASS.
function frozenBoundaryErrors(v11Data) {
  const errors = [];
  const caps = Array.isArray(v11Data?.capabilities) ? v11Data.capabilities : [];
  for (const cap of caps) {
    if (cap.proof_status !== 'victory_locked') continue;
    const prefix = `v1.1/manifest.json: capability ${cap.id || cap.capability_id}`;
    if (!Array.isArray(cap.non_claims) || cap.non_claims.length === 0) {
      errors.push(`${prefix}: victory_locked evidence requires explicit non_claims boundaries`);
      continue;
    }
    if (cap.id === 'traffic-v11-engine-freeze') {
      const required = [
        'Exactly-once delivery semantics are NOT claimed',
        'Global loss-free delivery is NOT claimed',
        'Production deployment is NOT proven',
        'Arbitrary topology equivalence is NOT claimed',
      ];
      for (const needle of required) {
        if (!cap.non_claims.some((n) => n.includes(needle))) {
          errors.push(`${prefix}: Traffic frozen evidence missing required non-claim "${needle}"`);
        }
      }
    }
  }
  return errors;
}

function validateStableManifest(data, raw, errors) {
  const required = ['@context', '@type', 'schema_version', 'artifact', 'generated_at', 'current_state', 'digest', 'freshness'];
  for (const field of required) {
    if (!(field in data)) {
      errors.push(`v1/manifest.json: missing required field "${field}"`);
    }
  }
  if (data.artifact && data.artifact.current_evidence_version !== '1.1.0') {
    errors.push(`v1/manifest.json: artifact.current_evidence_version must be "1.1.0" (got "${data.artifact.current_evidence_version}")`);
  }
  if (data.digest && !data.digest.value) {
    errors.push('v1/manifest.json: digest.value is required');
  }
  if (data.freshness && !data.freshness.policy) {
    errors.push('v1/manifest.json: freshness.policy is required');
  }
  if (data.superseded_versions && data.superseded_versions['1.0.0']) {
    const cls = data.superseded_versions['1.0.0'].classification;
    if (cls !== 'historical_superseded') {
      errors.push(`v1/manifest.json: v1.0 must be classified historical_superseded (got "${cls}")`);
    }
  }
}

function validateVersionedManifest(data, raw, errors) {
  const required = ['@context', '@type', 'schema_version', 'generated_at', 'product', 'repository', 'evidence_scope', 'proof_levels', 'supersession_context', 'capabilities', 'compliance_mappings', 'validation'];
  for (const field of required) {
    if (!(field in data)) {
      errors.push(`v1.1/manifest.json: missing required field "${field}"`);
    }
  }
  if (data.schema_version !== '1.1.0') {
    errors.push(`v1.1/manifest.json: schema_version must be "1.1.0" (got "${data.schema_version}")`);
  }
  if (!Array.isArray(data.capabilities)) {
    errors.push('v1.1/manifest.json: capabilities must be an array');
    return;
  }
  for (let i = 0; i < data.capabilities.length; i++) {
    const cap = data.capabilities[i];
    const prefix = `v1.1/manifest.json: capabilities[${i}]`;
    if (!cap.capability_id && !cap.id) {
      errors.push(`${prefix}: missing capability id`);
    }
    if (!cap.name) {
      errors.push(`${prefix}: missing name`);
    }
    const status = cap.status || cap.proof_status;
    if (status && !ALLOWED_CAPABILITY_STATUS.has(status)) {
      errors.push(`${prefix}: invalid status "${status}"`);
    }
    if (cap.proof_status === 'victory_locked' && cap.victory_locked !== true) {
      errors.push(`${prefix}: proof_status victory_locked requires victory_locked=true`);
    }
    if (cap.provider_pack_status) {
      const allowedPack = ['in_development', 'planned', 'not_claimed', 'blocked'];
      for (const [pack, pv] of Object.entries(cap.provider_pack_status)) {
        if (!allowedPack.includes(pv.status)) {
          errors.push(`${prefix}.provider_pack_status.${pack}: invalid status "${pv.status}"`);
        }
      }
    }
  }
}

function validateSupersessionMap(data, raw, errors) {
  const states = data.supersession_states || {};
  const entries = Array.isArray(data.entries) ? data.entries : [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const prefix = `v1.1/supersession-map.json: entries[${i}] (${entry.v1_id || 'unnamed'})`;
    const state = entry['v1.1_supersession_state'];
    if (state && !states[state]) {
      errors.push(`${prefix}: unknown supersession state "${state}"`);
    }
    if (state && SUPERSEDED_STATES.has(state) && entry.current_authority === true) {
      errors.push(
        `${prefix}: ${state} artifact marked current_authority=true — ${state}_AS_CURRENT`
      );
    }
    if (state && HISTORICAL_SUPSESSION_STATES.has(state) && entry.current_authority !== false) {
      errors.push(`${prefix}: ${state} artifact must declare current_authority=false`);
    }
    if (state && SUPERSEDED_STATES.has(state) && !entry.superseded_by && !entry['v1.1_reason']) {
      errors.push(`${prefix}: ${state} artifact must record superseded_by or a reason`);
    }
  }
  const baselines = data.current_baseline && Array.isArray(data.current_baseline.baselines)
    ? data.current_baseline.baselines
    : [];
  const frozenIds = new Set(baselines.map((b) => b.evidence_id));
  for (const cap of readVersionedCapabilities()) {
    if (cap.proof_status === 'victory_locked' && cap.proof_id && !frozenIds.has(cap.proof_id)) {
      errors.push(
        `v1.1/supersession-map.json: victory_locked capability ${cap.id} (${cap.proof_id}) is not registered in current_baseline.baselines`
      );
    }
  }
}

let versionedCapabilitiesCache = null;
function readVersionedCapabilities() {
  if (versionedCapabilitiesCache) return versionedCapabilitiesCache;
  try {
    const { data } = readJSON('static/ai/evidence/v1.1/manifest.json');
    versionedCapabilitiesCache = Array.isArray(data.capabilities) ? data.capabilities : [];
  } catch {
    versionedCapabilitiesCache = [];
  }
  return versionedCapabilitiesCache;
}

function validateNonClaimsArray(data, raw, errors, filePath) {
  if (!Array.isArray(data)) {
    errors.push(`${filePath}: must be an array`);
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const prefix = `${filePath}[${i}]`;
    if (!entry.claim_id && !entry.id) {
      errors.push(`${prefix}: missing claim id`);
    }
    if (containsForbiddenWord(JSON.stringify(entry))) {
      for (const word of FORBIDDEN_STATUS_WORDS) {
        if (JSON.stringify(entry).toLowerCase().includes(word)) {
          errors.push(`${prefix}: contains forbidden status word "${word}"`);
        }
      }
    }
  }
}

// Forbidden-status words are only allowed to appear in governance text that
// prohibits them (e.g., "no certified claim"). This inspects only declared
// status-like field values, never prose.
function inspectStatusLikeValues(node, pathStr, errors, filePath) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      inspectStatusFields(node[i], pathStr ? `${pathStr}[${i}]` : `[${i}]`, errors, filePath);
    }
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (/status|_status|classification|proof_status/i.test(k) && typeof v === 'string') {
        for (const word of FORBIDDEN_STATUS_WORDS) {
          if (v.toLowerCase().includes(word)) {
            errors.push(`${filePath}:${pathStr}.${k}: forbidden status word "${word}"`);
          }
        }
      } else {
        inspectStatusFields(v, pathStr ? `${pathStr}.${k}` : k, errors, filePath);
      }
    }
  }
}

function inspectStatusFields(node, pathStr, errors, filePath) {
  inspectStatusValues(node, pathStr, errors, filePath);
}

function validateArtifactObject(data, raw, errors, filePath) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push(`${filePath}: must be a JSON object`);
    return;
  }
  inspectStatusValues(data, '', errors, filePath);
}

function inspectStatusValues(node, pathStr, errors, filePath) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      inspectStatusFields(node[i], pathStr ? `${pathStr}[${i}]` : `[${i}]`, errors, filePath);
    }
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (/^(status|status_label|_level|classification|proof|state)$/i.test(k) && typeof v === 'string') {
        for (const word of FORBIDDEN_STATUS_WORDS) {
          if (v.toLowerCase().includes(word)) {
            errors.push(`${filePath}:${pathStr}.${k}: forbidden status word "${word}"`);
          }
        }
      } else {
        inspectStatusFields(v, pathStr ? `${pathStr}.${k}` : k, errors, filePath);
      }
    }
  }
}

function collectEvidenceUrls(text, errors) {
  const hosts = ['https://www.zen-mesh.io/docs/', 'https://docs.zen-mesh.io/'];
  const urls = [];
  for (const host of hosts) {
    for (const m of text.matchAll(new RegExp(host.replace(/\./g, '\\.') + 'ai\\/evidence\\/[^"\\\\\\s]+', 'g'))) {
      urls.push(m[0]);
    }
  }
  for (const url of urls) {
    const rel = url
      .replace('https://www.zen-mesh.io/docs/', '')
      .replace('https://docs.zen-mesh.io/', '');
    const candidate = path.join(ROOT, 'static', rel);
    const candidateIndex = path.join(ROOT, 'static', rel, 'index.json');
    if (rel.endsWith('/')) {
      if (!fs.existsSync(candidateIndex)) {
        errors.push(`unresolved evidence URL: ${url}`);
      }
    } else if (!fs.existsSync(candidate) && !fs.existsSync(candidateIndex)) {
      errors.push(`unresolved evidence URL: ${url}`);
    }
  }
}

function indexMustListAllArtifacts(indexData, errors) {
  const dir = path.join(ROOT, 'static/ai/evidence/v1.1');
  const onDisk = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
    : [];
  const listed = new Set(indexData?.['v1.1_evidence_namespace']?.files || []);
  for (const f of onDisk) {
    if (!listed.has(f)) {
      errors.push(`v1.1/index.json: artifact ${f} exists on disk but is not listed in files[]`);
    }
  }
  for (const f of listed) {
    if (!onDisk.includes(f)) {
      errors.push(`v1.1/index.json: listed artifact ${f} does not exist on disk`);
    }
  }
}

function readRegistry() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'static/ai/ai-discovery-registry.json'), 'utf-8'));
  } catch {
    return null;
  }
}

function run() {
  const errors = [];
  const warnings = [];

  const files = [
    { relPath: 'static/ai/evidence/v1/manifest.json', validate: validateStableManifest },
    { relPath: 'static/ai/evidence/v1.1/manifest.json', validate: validateVersionedManifest },
    { relPath: 'static/ai/evidence/v1.1/non-claims.json', validate: (d, r, e) => validateNonClaimsArray(d, r, e, 'v1.1/non-claims.json') },
    { relPath: 'static/ai/evidence/v1.1/public-claim-gate.json', validate: validateArtifactObject },
    { relPath: 'static/ai/evidence/v1.1/non-regression-matrix.json', validate: validateArtifactObject },
    { relPath: 'static/ai/evidence/v1.1/supersession-map.json', validate: validateSupersessionMap },
    { relPath: 'static/ai/evidence/v1.1/index.json', validate: (d, r, e) => indexMustListAllArtifacts(d, e) },
  ];

  const allText = [];

  for (const { relPath, validate } of files) {
    try {
      const { data, raw } = readJSON(relPath);
      validate(data, raw, errors);

      const forbiddenClaims = scanForForbiddenClaims(raw, relPath);
      errors.push(...forbiddenClaims);

      const secrets = scanForSecrets(raw, relPath);
      errors.push(...secrets);

      const names = scanForEmployeeNames(raw, relPath);
      for (const n of names) {
        warnings.push(n);
      }

      const privatePaths = scanForPrivatePaths(raw, relPath);
      errors.push(...privatePaths);

      allText.push(raw);
      collectEvidenceUrls(raw, errors);
    } catch (e) {
      if (e instanceof SyntaxError) {
        errors.push(`${relPath}: JSON parse error — ${e.message}`);
      } else {
        errors.push(`${relPath}: ${e.message}`);
      }
    }
  }

  // Full-schema validation of the v1.1 manifest (ajv draft-07 + formats).
  try {
    const { data } = readJSON('static/ai/evidence/v1.1/manifest.json');
    validateAgainstSchema(data, errors, 'v1.1/manifest.json');
    errors.push(...frozenBoundaryErrors(data));
  } catch {
    // read failure already reported above
  }

  // STABLE-CHANNEL CONVERGENCE: committed stable artifact must equal the
  // deterministic generator output for the CURRENT v1.1 manifest.
  try {
    const { data: stable } = readJSON('static/ai/evidence/v1/manifest.json');
    const { data: v11 } = readJSON('static/ai/evidence/v1.1/manifest.json');
    const v11Raw = fs.readFileSync(path.join(ROOT, 'static/ai/evidence/v1.1/manifest.json'));
    const registry = readRegistry();
    errors.push(...stableChannelErrors(stable, v11Raw, v11, registry));
    // Discovery freshness must be mirrored, not drifted: the embedded
    // ai_discovery.registry_updated_at must equal the registry file's value.
    if (registry?.registry_updated_at && stable.ai_discovery && stable.ai_discovery.registry_updated_at !== registry.registry_updated_at) {
      errors.push('STALE_STABLE_MANIFEST: embedded ai_discovery.registry_updated_at differs from ai-discovery-registry.json — regenerate the registry and the stable manifest together');
    }
  } catch {
    // read failures already reported above
  }

  if (warnings.length > 0) {
    console.log('WARNINGS:');
    for (const w of warnings) {
      console.log(`  [warn] ${w}`);
    }
    console.log('');
  }

  if (errors.length === 0) {
    console.log('PASS: AI evidence validation — no issues found');
    process.exit(0);
  } else {
    console.log(`FAIL (${errors.length}):`);
    for (const e of errors) {
      console.log(`  - ${e}`);
    }
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Self-test: negative + positive regression fixtures. Each NEGATIVE fixture
// must produce at least one validator error (stale/tampered evidence must
// never pass); each POSITIVE fixture must produce none.
// ---------------------------------------------------------------------------

function selfTest() {
  const { readJSON: _unused } = {};
  let failures = 0;
  const cases = [];
  const actualErrors = [];

  // Build the current-truth inputs.
  const v11Raw = fs.readFileSync(path.join(ROOT, 'static/ai/evidence/v1.1/manifest.json'));
  const v11 = JSON.parse(v11Raw.toString('utf-8'));
  const digest = stableSourceDigest(v11Raw);

  const expectFail = (name, errs, needle) => {
    cases.push({ name, expect: 'FAIL', ok: errs.length > 0 && (!needle || errs.some((e) => e.includes(needle))) });
    if (errs.length === 0 || (needle && !errs.some((e) => e.includes(needle)))) {
      failures += 1;
      console.log(`  [self-test FAIL] ${name}: expected validator error${needle ? ` containing "${needle}"` : ''}`);
    } else {
      console.log(`  [self-test ok] ${name} -> FAIL as required`);
    }
  };
  const expectPass = (name, errs) => {
    cases.push({ name, expect: 'PASS', ok: errs.length === 0 });
    if (errs.length !== 0) {
      failures += 1;
      console.log(`  [self-test FAIL] ${name}: expected clean pass, got: ${errs.join(' | ')}`);
    } else {
      console.log(`  [self-test ok] ${name} -> PASS as required`);
    }
  };

  // 01 STALE_STABLE_MANIFEST — digest drift.
  {
    const stale = JSON.parse(JSON.stringify(renderStableManifest(v11, digest)));
    stale.digest.value = '0'.repeat(64);
    const errs = [];
    validateStableManifest(stale, '', errs);
    errs.push(...stableChannelErrors(stale, v11Raw, v11, readRegistry()));
    expectFail('01 stale stable manifest digest vs v1.1', errs, 'STALE_STABLE_MANIFEST');
  }

  // 01b STALE_STABLE_MANIFEST — capability projection drift (manual edit).
  {
    const tampered = JSON.parse(JSON.stringify(renderStableManifest(v11, digest)));
    if (tampered.capabilities?.[0]) tampered.capabilities[0].status = 'proven_production';
    const errs = [];
    errs.push(...stableChannelErrors(tampered, v11Raw, v11, readRegistry()));
    expectFail('01b manually edited stable projection vs generator output', errs, 'STALE_STABLE_MANIFEST');
  }

  // 01c STALE_STABLE_MANIFEST — current-version pointer drift.
  {
    const stale = JSON.parse(JSON.stringify(renderStableManifest(v11, digest)));
    stale.artifact.current_manifest_url = 'https://www.zen-mesh.io/docs/ai/evidence/v1.0/manifest.json';
    const errs = [];
    errs.push(...stableChannelErrors(stale, v11Raw, v11, readRegistry()));
    expectFail('01c stale embedded current-version pointer', errs, 'STALE_STABLE_MANIFEST');
  }

  // 02 SUPERSEDED_AS_CURRENT.
  {
    const map = {
      supersession_states: { HISTORICAL_ONLY: 'historical' },
      entries: [
        { v1_id: 'OLD-PROOF-1', 'v1.1_supersession_state': 'HISTORICAL_ONLY', current_authority: true },
      ],
    };
    const errs = [];
    validateSupersessionMap(map, '', errs);
    expectFail('02 superseded evidence selected as current', errs, '_AS_CURRENT');
  }

  // 03 INVALIDATED_AS_CURRENT.
  {
    const map = {
      supersession_states: { INVALIDATED: 'invalid' },
      entries: [
        { v1_id: 'BAD-PROOF-1', 'v1.1_supersession_state': 'INVALIDATED', current_authority: true },
      ],
    };
    const errs = [];
    validateSupersessionMap(map, '', errs);
    expectFail('03 invalidated evidence selected as current', errs, 'INVALIDATED_AS_CURRENT');
  }

  // 04 forbidden production/compliance claim pattern in public evidence text.
  {
    const errs = scanForForbiddenClaims('FedRAMP authorized delivery pipeline', 'fixture');
    expectFail('04 forbidden production/compliance claim pattern', errs, 'FedRAMP');
  }

  // 05 private path / secret in public evidence.
  {
    const errs = [
      ...scanForPrivatePaths('see /home/neves/notes/evidence.md', 'fixture'),
      ...scanForSecrets('api_key = "sk_live_abcdefabcdefabcdef1234"', 'fixture'),
    ];
    expectFail('05 private path or secret in public evidence', errs);
  }

  // 11 Traffic frozen evidence translated into global exactly-once / zero
  // loss — a frozen Traffic capability stripped of its bounded non-claims
  // must FAIL.
  {
    const mutated = JSON.parse(JSON.stringify(v11));
    const cap = mutated.capabilities.find((c) => c.id === 'traffic-v11-engine-freeze');
    cap.non_claims = [];
    const errs = frozenBoundaryErrors(mutated);
    expectFail('11 Traffic frozen evidence without exact-once/zero-loss non-claims', errs, 'non_claims');
    // The live manifest itself must carry the boundaries (positive control).
    const liveErrs = frozenBoundaryErrors(v11);
    expectPass('11b live Traffic frozen evidence carries bounded non-claims', liveErrs);
  }

  // 13 absent evidence becomes SATISFIED/PASS — a non-claims entry whose
  // vocabulary asserts inferred satisfaction must FAIL the scanner.
  {
    const errs = [];
    validateNonClaimsArray(
      [{ id: 'bad-entry', claim: 'delivery is satisfied under all failures' }],
      '',
      errs,
      'fixture/non-claims.json'
    );
    expectFail('13 absent evidence marked satisfied', errs, 'forbidden status word');
  }

  // Positive: current stable channel must converge cleanly.
  {
    try {
      const { data: stable } = readJSON('static/ai/evidence/v1/manifest.json');
      const errs = stableChannelErrors(stable, v11Raw, v11, readRegistry());
      expectPass('15 committed stable manifest equals generator output', errs);
    } catch (e) {
      expectPass('15 committed stable manifest equals generator output', [`read error: ${e.message}`]);
    }
  }
  // Positive: victory_locked capability WITH its freeze artifacts passes the
  // supersession authority audit.
  {
    try {
      const { data: map } = readJSON('static/ai/evidence/v1.1/supersession-map.json');
      const errs = [];
      validateSupersessionMap(map, '', errs);
      expectPass('16 supersession map current_baseline covers all frozen capabilities', errs);
    } catch (e) {
      expectPass('16 supersession map current_baseline covers all frozen capabilities', [`read error: ${e.message}`]);
    }
  }

  console.log(
    failures === 0
      ? `PASS: evidence self-test — ${cases.length} fixtures behaved as required`
      : `FAIL: evidence self-test — ${failures}/${cases.length} fixtures misbehaved`
  );
  process.exit(failures === 0 ? 0 : 1);
}

const arg = process.argv[2] || '';
if (arg === '--self-test') {
  selfTest();
} else {
  run();
}

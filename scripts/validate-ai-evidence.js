#!/usr/bin/env node
/**
 * validate-ai-evidence.js — Validate AI evidence JSON files (stable v1 channel
 * and versioned v1.1).
 *
 * Checks:
 * - JSON is parseable
 * - Stable v1 manifest reflects a current evidence version (never stale)
 * - Versioned manifest capabilities have valid status / maturity vocabulary
 * - No forbidden statuses: certified, authorized, compliant, satisfied, guaranteed
 * - No forbidden claims: FedRAMP authorized, HIPAA compliance/BAA, SOC2 certified,
 *   PCI compliant, Merkle auth/replay/identity/delivery
 * - No secret-looking values, internal employee names, or local private paths
 * - Every https://docs.zen-mesh.io/ai/evidence/... reference resolves to an
 *   artifact present in static/ai/evidence/
 * - Exit code 0 = PASS, else 1
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    if (!cap.capability_id) {
      errors.push(`${prefix}: missing capability_id`);
    }
    if (!cap.name) {
      errors.push(`${prefix}: missing name`);
    }
    if (cap.status && !ALLOWED_CAPABILITY_STATUS.has(cap.status)) {
      errors.push(`${prefix}: invalid status "${cap.status}"`);
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
  const urls = [...text.matchAll(/https:\/\/docs\.zen-mesh\.io\/ai\/evidence\/[^"\\\s]+/g)].map((m) => m[0]);
  for (const url of urls) {
    const rel = url.replace('https://docs.zen-mesh.io/', '');
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

function run() {
  const errors = [];
  const warnings = [];

  const files = [
    { relPath: 'static/ai/evidence/v1/manifest.json', validate: validateStableManifest },
    { relPath: 'static/ai/evidence/v1.1/manifest.json', validate: validateVersionedManifest },
    { relPath: 'static/ai/evidence/v1.1/non-claims.json', validate: (d, r, e) => validateNonClaimsArray(d, r, e, 'v1.1/non-claims.json') },
    { relPath: 'static/ai/evidence/v1.1/public-claim-gate.json', validate: validateArtifactObject },
    { relPath: 'static/ai/evidence/v1.1/non-regression-matrix.json', validate: validateArtifactObject },
    { relPath: 'static/ai/evidence/v1.1/supersession-map.json', validate: validateArtifactObject },
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

run();
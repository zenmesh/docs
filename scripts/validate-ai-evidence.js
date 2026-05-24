#!/usr/bin/env node
/**
 * validate-ai-evidence.js — Validate AI evidence JSON files.
 *
 * Checks:
 * - JSON is parseable
 * - All capabilities have id and valid proof_status
 * - No forbidden statuses: certified, authorized, compliant, satisfied, guaranteed
 * - No forbidden claims: FedRAMP authorized, HIPAA compliance/BAA, SOC2 certified, PCI compliant
 * - No Merkle auth/replay/identity/delivery claims
 * - No secret-looking values
 * - No internal employee names or local private paths
 * - proof_status is one of allowed values
 * - For victory_locked/proven_local_mock status: non_claims array must be non-empty
 * - Exit code 0 = PASS, else 1
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ALLOWED_PROOF_STATUSES = new Set([
  'victory_locked',
  'proven_local_mock',
  'implementation_present',
  'planned',
  'blocked',
  'not_claimed',
]);

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

// Common given names — not exhaustive, catches obvious ones
const EMPLOYEE_NAMES = [
  'andrew', 'bob', 'carol', 'charlie', 'dave', 'eve', 'frank', 'grace',
  'heidi', 'ivan', 'judy', 'leonardo', 'mallory', 'nancy', 'oscar',
  'peggy', 'sybil', 'trent', 'victor', 'walter', 'wendy',
  'alice', 'brent', 'cathy', 'dan', 'erin', 'fiona',
];

// Internal-only path patterns
const PRIVATE_PATH_PATTERNS = [
  /\/home\/[^/]+\//,
  /\/Users\/[^/]+\//,
  /\b\.zen\//,
  /\bnode_modules\//,
];

function readJSON(filePath) {
  const fullPath = path.resolve(ROOT, filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return { data: JSON.parse(raw), raw };
}

function containsForbiddenWord(text) {
  const lower = text.toLowerCase();
  return FORBIDDEN_STATUS_WORDS.some(w => lower.includes(w));
}

function scanForSecrets(text, path) {
  const found = [];
  for (const pattern of SECRET_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      found.push(`${path}: potential secret pattern "${match[0].slice(0, 20)}..."`);
    }
  }
  return found;
}

function scanForEmployeeNames(text, path) {
  const found = [];
  const words = text.toLowerCase().split(/[^a-z]/);
  for (const word of words) {
    if (EMPLOYEE_NAMES.includes(word) && word.length >= 4) {
      found.push(`${path}: possible employee/placeholder name "${word}"`);
    }
  }
  return found;
}

function scanForPrivatePaths(text, path) {
  const found = [];
  for (const pattern of PRIVATE_PATH_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      found.push(`${path}: possible internal-only path "${match[0]}"`);
    }
  }
  return found;
}

function scanForForbiddenClaims(text, path) {
  const found = [];
  for (const { pattern, label } of FORBIDDEN_CLAIM_PATTERNS) {
    if (pattern.test(text)) {
      found.push(`${path}: forbidden claim pattern "${label}"`);
    }
  }
  return found;
}

function validateManifest(data, raw, errors) {
  // Check required fields
  const required = ['@context', '@type', 'schema_version', 'generated_at', 'product', 'evidence_scope', 'proof_levels', 'capabilities', 'compliance_mappings', 'validation'];
  for (const field of required) {
    if (!(field in data)) {
      errors.push(`manifest.json: missing required field "${field}"`);
    }
  }

  if (!Array.isArray(data.capabilities)) {
    errors.push('manifest.json: capabilities must be an array');
    return;
  }

  // Check each capability
  for (let i = 0; i < data.capabilities.length; i++) {
    const cap = data.capabilities[i];
    const prefix = `manifest.json: capabilities[${i}]`;

    if (!cap.id) {
      errors.push(`${prefix}: missing required field "id"`);
    }

    if (!cap.proof_status) {
      errors.push(`${prefix}: missing required field "proof_status"`);
    } else if (!ALLOWED_PROOF_STATUSES.has(cap.proof_status)) {
      errors.push(`${prefix}: invalid proof_status "${cap.proof_status}". Must be one of: ${[...ALLOWED_PROOF_STATUSES].join(', ')}`);
    }

    // Check non_claims is present and non-empty for proven/victory statuses
    const statusesRequiringNonClaims = ['victory_locked', 'proven_local_mock'];
    if (statusesRequiringNonClaims.includes(cap.proof_status)) {
      if (!Array.isArray(cap.non_claims) || cap.non_claims.length === 0) {
        errors.push(`${prefix}: proof_status "${cap.proof_status}" requires non-empty non_claims array`);
      }
    }

    // Check every field string for forbidden words
    const serialized = JSON.stringify(cap);
    if (containsForbiddenWord(serialized)) {
      for (const word of FORBIDDEN_STATUS_WORDS) {
        if (serialized.toLowerCase().includes(word)) {
          errors.push(`${prefix}: contains forbidden status word "${word}"`);
        }
      }
    }

    // Check evidence refs use zen-platform: prefix
    if (Array.isArray(cap.evidence_refs)) {
      for (let j = 0; j < cap.evidence_refs.length; j++) {
        const ref = cap.evidence_refs[j];
        if (!ref.startsWith('zen-platform:')) {
          errors.push(`${prefix}.evidence_refs[${j}]: must use "zen-platform:" prefix (got "${ref.slice(0, 60)}")`);
        }
      }
    }

    // Check validator refs use zen-platform: prefix
    if (Array.isArray(cap.validator_refs)) {
      for (let j = 0; j < cap.validator_refs.length; j++) {
        const ref = cap.validator_refs[j];
        if (!ref.startsWith('zen-platform:')) {
          errors.push(`${prefix}.validator_refs[${j}]: must use "zen-platform:" prefix (got "${ref.slice(0, 60)}")`);
        }
      }
    }

    // Check merkle ref uses mock: prefix
    if (cap.merkle_ref && !cap.merkle_ref.startsWith('mock:')) {
      errors.push(`${prefix}.merkle_ref: must use "mock:" prefix (got "${cap.merkle_ref.slice(0, 60)}")`);
    }
  }

  // Check evidence_scope
  if (data.evidence_scope !== 'local_mock_harness_only') {
    errors.push(`manifest.json: evidence_scope must be "local_mock_harness_only" (is "${data.evidence_scope}")`);
  }

  // Check compliance relationships in compliance_mappings
  if (data.compliance_mappings) {
    if (data.compliance_mappings.ref && !data.compliance_mappings.ref.startsWith('https://')) {
      errors.push(`manifest.json: compliance_mappings.ref must be an https URL`);
    }
  }
}

function validateComplianceMap(data, raw, errors) {
  if (!Array.isArray(data.entries)) {
    errors.push('compliance-map.json: entries must be an array');
    return;
  }

  for (let i = 0; i < data.entries.length; i++) {
    const entry = data.entries[i];
    const prefix = `compliance-map.json: entries[${i}]`;

    if (!entry.compliance_id) {
      errors.push(`${prefix}: missing compliance_id`);
    }

    // Check relationship is one of allowed values
    const allowedRelationships = ['supports', 'maps_to'];
    if (!allowedRelationships.includes(entry.relationship)) {
      errors.push(`${prefix}: relationship must be one of [${allowedRelationships.join(', ')}] — found "${entry.relationship}"`);
    }

    // Check claim_status matches relationship
    if (entry.claim_status && !allowedRelationships.includes(entry.claim_status)) {
      errors.push(`${prefix}: claim_status must be one of [${allowedRelationships.join(', ')}] — found "${entry.claim_status}"`);
    }

    // Check disclaimer exists
    if (!entry.disclaimer) {
      errors.push(`${prefix}: missing disclaimer`);
    }

    // Check no forbidden status words in entry
    const serialized = JSON.stringify(entry);
    if (containsForbiddenWord(serialized)) {
      for (const word of FORBIDDEN_STATUS_WORDS) {
        if (serialized.toLowerCase().includes(word)) {
          errors.push(`${prefix}: contains forbidden status word "${word}"`);
        }
      }
    }

    // Check evidence refs use zen-platform:
    if (Array.isArray(entry.evidence_refs)) {
      for (let j = 0; j < entry.evidence_refs.length; j++) {
        if (!entry.evidence_refs[j].startsWith('zen-platform:')) {
          errors.push(`${prefix}.evidence_refs[${j}]: must use "zen-platform:" prefix`);
        }
      }
    }
  }
}

function validateNonClaims(data, raw, errors) {
  if (!Array.isArray(data)) {
    errors.push('non-claims.json: must be an array');
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const prefix = `non-claims.json[${i}]`;

    if (!entry.id) {
      errors.push(`${prefix}: missing id`);
    }

    if (!entry.category) {
      errors.push(`${prefix}: missing category`);
    }

    if (!entry.claim) {
      errors.push(`${prefix}: missing claim`);
    }

    // Check no forbidden status words
    const serialized = JSON.stringify(entry);
    if (containsForbiddenWord(serialized)) {
      for (const word of FORBIDDEN_STATUS_WORDS) {
        if (serialized.toLowerCase().includes(word)) {
          errors.push(`${prefix}: contains forbidden status word "${word}"`);
        }
      }
    }
  }
}

function run() {
  const errors = [];
  const warnings = [];

  const files = [
    { relPath: 'static/ai/evidence/v1/manifest.json', validate: validateManifest },
    { relPath: 'static/ai/evidence/v1/compliance-map.json', validate: validateComplianceMap },
    { relPath: 'static/ai/evidence/v1/non-claims.json', validate: validateNonClaims },
  ];

  for (const { relPath, validate } of files) {
    try {
      const { data, raw } = readJSON(relPath);

      // Structural validation
      validate(data, raw, errors);

      // Forbidden claim patterns across entire file
      const forbiddenClaims = scanForForbiddenClaims(raw, relPath);
      errors.push(...forbiddenClaims);

      // Secret detection
      const secrets = scanForSecrets(raw, relPath);
      errors.push(...secrets);

      // Employee name detection
      const names = scanForEmployeeNames(raw, relPath);
      for (const n of names) {
        warnings.push(n); // Employee names might be false positives
      }

      // Private path detection
      const privatePaths = scanForPrivatePaths(raw, relPath);
      errors.push(...privatePaths);

    } catch (e) {
      if (e instanceof SyntaxError) {
        errors.push(`${relPath}: JSON parse error — ${e.message}`);
      } else {
        errors.push(`${relPath}: ${e.message}`);
      }
    }
  }

  // Emit warnings
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

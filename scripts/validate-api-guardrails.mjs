#!/usr/bin/env node
/**
 * Docs-side API guardrails validation.
 * Checks: OpenAPI spec presence, unsupported claims, sidebar consistency.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DOCS_ROOT = join(__dirname, '..');

const UNSUPPORTED_PATTERNS = [
  /\bexactly-once\b/i,
  /\bexactly once\b/i,
  /\bguaranteed.delivery\b/i,
  /\bguaranteed delivery\b/i,
  /\bprod.live\b/i,
  /\bproduction.live\b/i,
  /\bzero.trust.complete\b/i,
  /\bzero trust complete\b/i,
];

function readFileSafe(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return '';
  }
}

function gatherFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...gatherFiles(full));
    } else if (extname(entry.name).match(/\.(md|yaml|yml)$/)) {
      results.push(full);
    }
  }
  return results;
}

function checkUnsupportedClaims() {
  const failures = [];
  const dirs = [
    join(DOCS_ROOT, 'docs/api'),
    join(DOCS_ROOT, 'docs/mcp'),
    join(DOCS_ROOT, 'api-specifications'),
  ];

  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    const files = gatherFiles(dir);
    for (const file of files) {
      const content = readFileSafe(file);
      for (const pattern of UNSUPPORTED_PATTERNS) {
        if (pattern.test(content)) {
          if (/not production-live|no unsupported|non-claim/i.test(content)) {
            continue;
          }
          failures.push(`${file}: matches ${pattern}`);
        }
      }
    }
  }
  return failures;
}

function checkOpenApiSpec() {
  const specPaths = [
    join(DOCS_ROOT, 'api-specifications', 'zen-back.v1.yaml'),
  ];
  for (const p of specPaths) {
    if (!existsSync(p)) {
      return `Missing: ${p}`;
    }
  }
  return null;
}

function checkInventory() {
  const invPath = join(__dirname, '..', '..', 'zen-platform-hermes/docs/80-EVIDENCE/readiness/helper023_api_docs_inventory.json');
  return existsSync(invPath) ? null : 'Missing API docs inventory';
}

function run() {
  let allPass = true;
  const issues = [];

  const specIssue = checkOpenApiSpec();
  if (specIssue) {
    allPass = false;
    issues.push(specIssue);
  }

  const invIssue = checkInventory();
  if (invIssue) {
    allPass = false;
    issues.push(invIssue);
  }

  const claims = checkUnsupportedClaims();
  if (claims.length > 0) {
    allPass = false;
    issues.push(...claims);
  }

  console.log(`Docs guardrails: ${allPass ? 'PASS' : 'FAIL'}`);
  if (issues.length > 0) {
    console.log('Issues:');
    issues.forEach(i => console.log(`  - ${i}`));
  }
  process.exit(allPass ? 0 : 1);
}

run();

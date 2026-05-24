import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FORBIDDEN_CLAIMS = [
  /PCI\s+compliant/i, /HIPAA\s+compliant/i, /FedRAMP\s+authorized/i,
  /SOC\s*2\s+certified/i, /ISO\s+certified/i,
  /\bexactly.once\b.*(?:delivery|guarantee)/i,
  /\bzero.loss\b.*(?:delivery|guarantee)/i,
  /\bguaranteed\s+delivery\b/i,
  /\bproduction\s+zero.trust\b/i,
  /Merkle.*(?:auth|identity|delivery)/i,
  /app\.zen-mesh\.io/i,
];

const SAFE_CONTEXTS = [
  /not claimed/i, /non.claim/i, /not.*claim/i,
  /no +claim/i, /does not/i, /never claim/i,
  /\bno\b/i, /\bnot\b/i,
  /supports/, /maps.to/, /local.mock/, /blocked/, /planned/,
  /not.*authorized/, /not.*certified/,
  /not.*compliant/, /not.*guaranteed/,
];

function checkDir(dir, label) {
  const errors = [];
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') walk(full);
      else if (e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.ts') || e.name.endsWith('.json'))) {
        const rel = path.relative(ROOT, full);
        if (rel.includes('node_modules')) continue;
        const content = fs.readFileSync(full, 'utf-8');
        for (const p of FORBIDDEN_CLAIMS) {
          const match = content.match(p);
          if (!match) continue;
          const ctx = content.slice(Math.max(0, match.index - 80), match.index + 80);
          if (SAFE_CONTEXTS.some(s => s.test(ctx))) continue;
          errors.push(`${rel}: forbidden "${match[0].slice(0, 50)}..."`);
        }
      }
    }
  }
  walk(dir);
  return errors;
}

function run() {
  const errors = [];

  // Check docs directory
  errors.push(...checkDir(path.join(ROOT, 'docs'), 'docs'));

  // Check homepage has required evidence links
  const home = fs.readFileSync(path.join(ROOT, 'docs', 'index.md'), 'utf-8');
  const homepageChecks = [
    ['AI Evidence or Manifest', ['manifest.json', 'AI Evidence', 'AI Manifest']],
    ['Runtime Evidence', ['Runtime Evidence', 'Runtime', 'runtime']],
    ['Trust Evidence', ['Trust Evidence', 'Trust Lifecycle', 'trust']],
    ['Non-Claims', ['non-claims', 'Non-Claims']],
    ['Validation Map', ['validation', 'verification']],
    ['Start Here', ['start-here/what-is-zen-mesh']],
  ];
  for (const [label, terms] of homepageChecks) {
    if (!terms.some(t => home.includes(t))) {
      errors.push(`docs/index.md: missing ${label} link`);
    }
  }

  // Check sidebar has required sections
  const sidebar = fs.readFileSync(path.join(ROOT, 'sidebars.ts'), 'utf-8');
  if (!sidebar.includes("Evidence")) errors.push('sidebars.ts: missing Evidence section');
  if (!sidebar.includes("AI Agents")) errors.push('sidebars.ts: missing AI Agents section');
  if (!sidebar.includes("Start Here")) errors.push('sidebars.ts: missing Start Here section');
  if (!sidebar.includes("Reference")) errors.push('sidebars.ts: missing Reference section');

  // Check AI manifest endpoint
  const aiOverview = path.join(ROOT, 'docs', 'ai', 'overview.md');
  if (fs.existsSync(aiOverview)) {
    const content = fs.readFileSync(aiOverview, 'utf-8');
    if (!content.includes('manifest.json')) errors.push('docs/ai/overview.md: missing manifest reference');
    if (!content.includes('compliance-map.json')) errors.push('docs/ai/overview.md: missing compliance map reference');
    if (!content.includes('non-claims.json')) errors.push('docs/ai/overview.md: missing non-claims reference');
  }

  // Check no personal identifiers
  const anonPatterns = [/leonardo/i, /neves/i, /Telna/i, /\/home\/neves/, /172\.16\b|10\.0\b|192\.168\b/];
  for (const dir of ['docs', 'static']) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const full2 = path.join(d, e.name);
        if (e.isDirectory() && !e.name.startsWith('.')) walk(full2);
        else if (e.isFile()) {
          const content = fs.readFileSync(full2, 'utf-8');
          for (const ap of anonPatterns) {
            if (ap.test(content)) {
              errors.push(`${path.relative(ROOT, full2)}: possible anonymity leak`);
            }
          }
        }
      }
    }
    walk(full);
  }

  if (errors.length === 0) {
    console.log('PASS: Docs experience validation — no issues found');
    process.exit(0);
  } else {
    console.log(`FAIL (${errors.length}):`);
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  }
}

run();

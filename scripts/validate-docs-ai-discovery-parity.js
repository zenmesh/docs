#!/usr/bin/env node
/**
 * HELPER046: docs.zen-mesh.io AI discovery and structured metadata parity checks.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FORBIDDEN_ID = /\b(ST-003|N086|FLOW-0[123]|FLOW123|HELPER\d{3}|H\d{3}|BLK-|CHECKPOINT-)\b/i;

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

function read(rel) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : '';
}

function parseJsonLdFromConfig(text) {
  const blocks = [];
  const re = /innerHTML:\s*JSON\.stringify\(([\s\S]*?)\)\s*,?\s*\n/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    try {
      // eslint-disable-next-line no-eval
      blocks.push(eval(`(${m[1]})`));
    } catch {
      /* headTags may import blocks — handled separately */
    }
  }
  return blocks;
}

function main() {
  console.log('[docs-ai-discovery-parity] HELPER046 docs site audit...');
  const config = read('docusaurus.config.ts');
  const llms = read('static/llms.txt');
  const robots = read('static/robots.txt');
  const structuredLib = read('src/lib/docsPublicStructuredData.ts');

  ok('docusaurus.config.ts exists', Boolean(config));
  ok('docsPublicStructuredData.ts exists', Boolean(structuredLib));
  ok('config imports structured data lib', config.includes('docsStructuredDataBlocks'));
  ok('rel llms hint', config.includes("rel: 'llms'") || config.includes('rel: "llms"'));
  ok('rel llms-full to www', config.includes('llms-full') && config.includes('www.zen-mesh.io'));
  ok('meta llms-enabled', config.includes('llms-enabled'));
  ok('alternate llms.txt', config.includes("href: '/llms.txt'") || config.includes('href: "/llms.txt"'));

  ok('structured lib Organization', structuredLib.includes("'@type': 'Organization'"));
  ok('structured lib WebSite', structuredLib.includes("'@type': 'WebSite'"));
  ok('structured lib Dataset', structuredLib.includes("'@type': 'Dataset'"));
  ok('structured lib CreativeWork', structuredLib.includes("'@type': 'CreativeWork'"));
  ok('structured lib federated runtime', structuredLib.includes('federated operational runtime'));
  ok('structured lib hash-chain', structuredLib.toLowerCase().includes('hash-chain'));
  ok('structured lib narrative not proof', structuredLib.includes('narrative_context'));
  ok('structured lib no internal ids', !FORBIDDEN_ID.test(structuredLib));

  ok('robots allows llms.txt', robots.includes('Allow: /llms.txt'));
  ok('robots allows /ai/', robots.includes('Allow: /ai/'));
  ok('robots allows /docs/ai/', robots.includes('Allow: /docs/ai/'));

  ok('llms links manifest', llms.includes('manifest.json'));
  ok('llms links www evidence', llms.includes('zen-mesh.io/evidence'));
  ok('llms links taxonomy', llms.includes('public-terminology-taxonomy.json'));
  ok('llms links traceability', llms.includes('public-surface-traceability.json'));
  ok('llms narrative not proof', llms.toLowerCase().includes('not proof') || llms.includes('narrative_context'));
  ok('llms no internal ids', !FORBIDDEN_ID.test(llms));
  ok('llms governance public terms', llms.includes('Runtime workload identity') && llms.includes('DeliveryPolicy'));

  ok('navbar AI Context', config.includes("label: 'AI Context'") || config.includes('AI Context'));
  ok(
    'navbar links llms.txt',
    config.includes("href: '/llms.txt'") || config.includes('pathname:///llms.txt'),
  );

  const manifestPath = path.join(ROOT, 'static/ai/evidence/v1/manifest.json');
  ok('manifest.json on disk', fs.existsSync(manifestPath));
  if (fs.existsSync(manifestPath)) {
    JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    ok('manifest.json parses', true);
  }

  const overview = read('docs/ai/overview.md');
  ok('overview links manifest', overview.includes('manifest.json'));
  ok('overview links www narrative registry', overview.includes('narrative-context.json'));
  ok('llms links attack-model.json', llms.includes('/ai/security/v1/attack-model.json'));
  ok('attack-model.json on disk', fs.existsSync(path.join(ROOT, 'static/ai/security/v1/attack-model.json')));
  ok('primitives.json on disk', fs.existsSync(path.join(ROOT, 'static/ai/security/v1/primitives.json')));
  ok('gaps.json on disk', fs.existsSync(path.join(ROOT, 'static/ai/security/v1/gaps.json')));
  ok('claim-maturity.json on disk', fs.existsSync(path.join(ROOT, 'static/ai/security/v1/claim-maturity.json')));
  ok('llms links ai-discovery-registry', llms.includes('/ai/ai-discovery-registry.json'));
  ok('llms links claim-maturity.json', llms.includes('/ai/security/v1/claim-maturity.json'));

  console.log(`\nRESULTS: ${passed} PASS, ${failed} FAIL`);
  process.exit(failed ? 1 : 0);
}

main();

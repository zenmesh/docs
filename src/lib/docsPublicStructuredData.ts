/** Docs site JSON-LD — public capability language only. */

const DOCS_ORIGIN = 'https://docs.zen-mesh.io';
const WWW_ORIGIN = 'https://www.zen-mesh.io';
const EVIDENCE_V1 = `${DOCS_ORIGIN}/ai/evidence/v1`;

const DEMO_NOTE =
  'DEMO scope only; not production-live, not customer-ready, not demo-ready as global platform readiness.';

export const docsStructuredDataBlocks = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zen Mesh',
    url: WWW_ORIGIN,
    description:
      'Evidence-first federated operational runtime and trust platform with a webhook delivery wedge. ' +
      DEMO_NOTE,
    sameAs: ['https://github.com/zenmesh/zen-platform'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zen Mesh Documentation',
    url: DOCS_ORIGIN,
    description:
      'Technical documentation, AI evidence manifests, and verification guides. ' + DEMO_NOTE,
    publisher: { '@type': 'Organization', name: 'Zen Mesh', url: WWW_ORIGIN },
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Docs AI context (llms.txt)',
        url: `${DOCS_ORIGIN}/llms.txt`,
      },
      {
        '@type': 'WebPage',
        name: 'Marketing AI Context',
        url: `${WWW_ORIGIN}/llms.txt`,
      },
      {
        '@type': 'WebPage',
        name: 'AI-readable evidence index',
        url: `${WWW_ORIGIN}/evidence`,
      },
      {
        '@type': 'WebPage',
        name: 'AI & Evidence overview',
        url: `${DOCS_ORIGIN}/docs/ai/overview`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Zen Mesh public AI evidence manifests',
    description:
      'Capability manifest, non-claims registry, wedge claim maps, and compliance mapping for reviewers and LLMs. ' +
      'Hash-chain receipts are integrity/tamper-evidence only — not authentication, identity, encryption, or replay prevention. ' +
      'Blogs are narrative_context only — not manifest proof. ' +
      DEMO_NOTE,
    url: `${DOCS_ORIGIN}/docs/ai/overview`,
    creator: { '@type': 'Organization', name: 'Zen Mesh', url: WWW_ORIGIN },
    isAccessibleForFree: true,
    distribution: [
      {
        '@type': 'DataDownload',
        name: 'Capability manifest',
        contentUrl: `${EVIDENCE_V1}/manifest.json`,
        encodingFormat: 'application/json',
      },
      {
        '@type': 'DataDownload',
        name: 'Non-claims registry',
        contentUrl: `${EVIDENCE_V1}/non-claims.json`,
        encodingFormat: 'application/json',
      },
      {
        '@type': 'DataDownload',
        name: 'Wedge claim map',
        contentUrl: `${EVIDENCE_V1}/wedge-claim-map.json`,
        encodingFormat: 'application/json',
      },
      {
        '@type': 'DataDownload',
        name: 'Public terminology taxonomy (www)',
        contentUrl: `${WWW_ORIGIN}/ai/public-terminology-taxonomy.json`,
        encodingFormat: 'application/json',
      },
      {
        '@type': 'DataDownload',
        name: 'Narrative context registry (www)',
        contentUrl: `${WWW_ORIGIN}/ai/narrative-context.json`,
        encodingFormat: 'application/json',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'AI and evidence documentation',
    url: `${DOCS_ORIGIN}/docs/ai/overview`,
    description:
      'How to read capability manifests, proof_status, and non-claims. Editorial blogs are not accepted_evidence.',
    about: {
      '@type': 'Thing',
      name: 'Webhook delivery wedge and sandbox delivery validation evidence',
    },
    isAccessibleForFree: true,
  },
];

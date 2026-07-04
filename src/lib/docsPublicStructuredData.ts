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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Zen Mesh FAQ',
    description:
      'Frequently asked questions about Zen Mesh webhook delivery to private networks.',
    url: DOCS_ORIGIN,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Zen Mesh deliver webhooks to private networks without opening inbound ports?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zen Mesh uses an outbound-only Edge Plane. The zen-agent in your network establishes an outbound connection to Zen Mesh, then receives delivery over that persistent tunnel. No inbound firewall rules, no VPN, no reverse proxy.',
        },
      },
      {
        '@type': 'Question',
        name: 'What security controls protect webhook delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'mTLS, SPIFFE/SPIRE workload identity, and HMAC payload verification on every data-plane path. External provider webhooks use provider-specific signature verification at ingress. See the security documentation for the full model.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use Zen Mesh with Kubernetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Deploy the zen-agent as a Helm chart on your cluster. The Edge Plane integrates with Kubernetes and supports zen-egress for delivering to services behind NAT or firewall.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which webhook sources does Zen Mesh support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe, GitHub, Twilio, Shopify, and any custom HTTP webhook source. Zen Mesh validates signatures from supported providers and provides signature verification guidance for custom sources.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Zen Mesh production-ready?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Individual capabilities carry per-item status (WIRED, AUTOMATED_TESTED, etc.) documented in the evidence system. Review the Current Status page for per-capability maturity. Zen Mesh does not claim production-live availability as a global platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the pricing model?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free Forever tier available. Pro Early Bird with 6-month free trial. See zen-mesh.io/pricing for details.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zen Mesh',
    url: WWW_ORIGIN,
    description:
      'Webhook delivery platform for private networks. Outbound-only Edge Plane. Three-plane architecture with mTLS, SPIFFE/SPIRE, and HMAC on every data-plane path. ' +
      DEMO_NOTE,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Forever tier available. Pro Early Bird with 6-month free trial.',
    },
  },
];

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redirect from '@docusaurus/plugin-client-redirects';
import {docsStructuredDataBlocks} from './src/lib/docsPublicStructuredData';

const config: Config = {
  title: 'Zen Mesh Docs',
  tagline: 'Secure webhook delivery to private networks',
  favicon: 'img/favicon.ico',

  url: 'https://docs.zen-mesh.io',
  baseUrl: '/',

  organizationName: 'zenmesh',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'default',
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/zenmesh/docs/tree/main/',
          breadcrumbs: true,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    'docusaurus-theme-openapi-docs',
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zen-lock',
        path: 'docs-zen-lock',
        routeBasePath: 'zen-lock',
        sidebarPath: './sidebars-zen-lock.ts',
        editUrl: 'https://github.com/zenmesh/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'helm-charts',
        path: 'docs-helm-charts',
        routeBasePath: 'helm-charts',
        sidebarPath: './sidebars-helm-charts.ts',
        editUrl: 'https://github.com/zenmesh/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zen-gc',
        path: 'docs-zen-gc',
        routeBasePath: 'zen-gc',
        sidebarPath: './sidebars-zen-gc.ts',
        editUrl: 'https://github.com/zenmesh/docs/tree/main/',
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'apiReference',
        docsPluginId: 'default',
        config: {
          zenBackApi: {
            specPath: 'api-specifications/zen-back.v1.yaml',
            outputDir: 'docs/api/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/getting-started/customer-journey', to: '/docs/getting-started/customer-journey'},
          {from: '/getting-started/first-15-minutes', to: '/docs/getting-started/first-15-minutes'},
          {from: '/getting-started/quick-start', to: '/docs/getting-started/quick-start'},
          {from: '/getting-started/first-webhook', to: '/docs/getting-started/first-webhook'},
          {from: '/getting-started/installation', to: '/docs/getting-started/installation'},
          {from: '/concepts/zen-mesh-concepts', to: '/docs/concepts/zen-mesh-concepts'},
          {from: '/concepts/control-surfaces', to: '/docs/concepts/control-surfaces'},
          {from: '/concepts/glossary', to: '/docs/concepts/glossary'},
          {from: '/guides/traffic-lifecycle', to: '/docs/guides/traffic-lifecycle'},
          {from: '/guides/evidence-and-trust', to: '/docs/guides/evidence-and-trust'},
          {from: '/guides/troubleshooting-first-delivery', to: '/docs/guides/troubleshooting-first-delivery'},
          {from: '/reference/ui-api-map', to: '/docs/reference/ui-api-map'},
          {from: '/reference/current-status', to: '/docs/reference/current-status'},
          {from: '/reference/customer-api', to: '/docs/reference/customer-api'},
          {from: '/reference/api', to: '/docs/reference/api'},
          {from: '/reference/mcp', to: '/docs/reference/mcp'},
          {from: '/reference/helm-chart', to: '/docs/reference/helm-chart'},
          {from: '/reference/cli', to: '/docs/reference/cli'},
          {from: '/reference/configuration', to: '/docs/reference/configuration'},
          {from: '/reference/webhook-delivery-evidence', to: '/docs/reference/webhook-delivery-evidence'},
          {from: '/reference/webhook-observability-and-evidence', to: '/docs/reference/webhook-observability-and-evidence'},
          {from: '/reference/delivery-status', to: '/docs/reference/delivery-status'},
          {from: '/reference/webhook-faq', to: '/docs/reference/webhook-faq'},
          {from: '/api/overview', to: '/docs/api/overview'},
          {from: '/api/status', to: '/docs/api/status'},
          {from: '/api/write-safety', to: '/docs/api/write-safety'},
          {from: '/api/openapi', to: '/docs/api/openapi'},
          {from: '/api/authentication', to: '/docs/api/authentication'},
          {from: '/api/targets', to: '/docs/api/targets'},
          {from: '/api/endpoints', to: '/docs/api/endpoints'},
          {from: '/api/flows', to: '/docs/api/flows'},
          {from: '/api/delivery-attempts', to: '/docs/api/delivery-attempts'},
          {from: '/api/dlq', to: '/docs/api/dlq'},
          {from: '/api/retry', to: '/docs/api/retry'},
          {from: '/api/replay', to: '/docs/api/replay'},
          {from: '/api/traces', to: '/docs/api/traces'},
          {from: '/api/saved-payloads', to: '/docs/api/saved-payloads'},
          {from: '/api/evidence', to: '/docs/api/evidence'},
          {from: '/api/logs', to: '/docs/api/logs'},
          {from: '/api/rate-limits', to: '/docs/api/rate-limits'},
          {from: '/api/errors', to: '/docs/api/errors'},
          {from: '/api/pagination', to: '/docs/api/pagination'},
          {from: '/api/versioning', to: '/docs/api/versioning'},
          {from: '/api/idempotency', to: '/docs/api/idempotency'},
          {from: '/api/changelog', to: '/docs/api/changelog'},
          {from: '/api/examples', to: '/docs/api/examples'},
          {from: '/api/quickstart', to: '/docs/api/quickstart'},
          {from: '/api/webhooks', to: '/docs/api/webhooks'},
          {from: '/api/events', to: '/docs/api/events'},
          {from: '/api/fabric-adapters', to: '/docs/api/fabric-adapters'},
          {from: '/mcp/overview', to: '/docs/mcp/overview'},
          {from: '/mcp/read-only-v1-policy', to: '/docs/mcp/read-only-v1-policy'},
          {from: '/mcp/tools', to: '/docs/mcp/tools'},
          {from: '/mcp/examples', to: '/docs/mcp/examples'},
          {from: '/mcp/authentication-and-mtls', to: '/docs/mcp/authentication-and-mtls'},
          {from: '/mcp/safety-and-boundaries', to: '/docs/mcp/safety-and-boundaries'},
          {from: '/mcp/draft-system', to: '/docs/mcp/draft-system'},
          {from: '/start-here/what-is-zen-mesh', to: '/docs/start-here/what-is-zen-mesh'},
          {from: '/start-here/who-should-use-zen-mesh', to: '/docs/start-here/who-should-use-zen-mesh'},
          {from: '/start-here/current-status', to: '/docs/start-here/current-status'},
          {from: '/start-here/plans-and-limits', to: '/docs/start-here/plans-and-limits'},
          {from: '/start-here/concepts', to: '/docs/start-here/concepts'},
          {from: '/start-here/support', to: '/docs/start-here/support'},
          {from: '/delivery/webhook-reliability', to: '/docs/delivery/webhook-reliability'},
          {from: '/delivery/dead-letter-queue', to: '/docs/delivery/dead-letter-queue'},
          {from: '/delivery/replay', to: '/docs/delivery/replay'},
          {from: '/delivery/replay-and-recovery', to: '/docs/delivery/replay-and-recovery'},
          {from: '/delivery/deduplication', to: '/docs/delivery/deduplication'},
          {from: '/delivery/filtering', to: '/docs/delivery/filtering'},
          {from: '/delivery/fan-out', to: '/docs/delivery/fan-out'},
          {from: '/delivery/idempotency', to: '/docs/delivery/idempotency'},
          {from: '/delivery/jsonpath-routing', to: '/docs/delivery/jsonpath-routing'},
          {from: '/delivery/jsonpath-transforms', to: '/docs/delivery/jsonpath-transforms'},
          {from: '/delivery/delivery-failures', to: '/docs/delivery/delivery-failures'},
          {from: '/delivery/replay-vs-retry', to: '/docs/delivery/replay-vs-retry'},
          {from: '/delivery/event-routing', to: '/docs/delivery/event-routing'},
          {from: '/delivery/deduplication-vs-idempotency', to: '/docs/delivery/deduplication-vs-idempotency'},
        ],
      } satisfies Redirect.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'llms',
        href: '/llms.txt',
        title: 'Docs AI context index',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'llms-full',
        href: 'https://www.zen-mesh.io/llms-full.txt',
        title: 'Full AI context (www)',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'llms-enabled',
        content: 'true',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'text/plain',
        href: '/llms.txt',
        title: 'AI-readable documentation',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'text/plain',
        href: 'https://www.zen-mesh.io/llms.txt',
        title: 'Marketing site AI context',
      },
    },
    ...docsStructuredDataBlocks.map((block) => ({
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(block),
    })),
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Zen Mesh',
      logo: {
        alt: 'Zen Mesh',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'zenLockSidebar',
          position: 'left',
          label: 'zen-lock',
          docsPluginId: 'zen-lock',
        },
        {
          type: 'docSidebar',
          sidebarId: 'helmChartsSidebar',
          position: 'left',
          label: 'Helm Charts',
          docsPluginId: 'helm-charts',
        },
        {
          type: 'docSidebar',
          sidebarId: 'zenGcSidebar',
          position: 'left',
          label: 'Zen-GC',
          docsPluginId: 'zen-gc',
        },
        {
          href: 'https://zen-mesh.io/pricing',
          label: 'Pricing',
          position: 'right',
        },
        {
          href: 'pathname:///llms.txt',
          label: 'AI Context',
          position: 'right',
        },
        {
          href: 'https://www.zen-mesh.io',
          label: 'zen-mesh.io',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'Why Zen Mesh',
              href: 'https://zen-mesh.io',
            },
            {
              label: 'Pricing',
              href: 'https://zen-mesh.io/pricing',
            },
            {
              label: 'Docs',
              to: '/docs',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://zen-mesh.io',
            },
            {
              label: 'Security',
              href: 'https://zen-mesh.io/security',
            },
            {
              label: 'Terms of Service',
              href: 'https://zen-mesh.io/commitments/legal/terms/',
            },
            {
              label: 'Privacy Policy',
              href: 'https://zen-mesh.io/commitments/legal/privacy/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'AI Context (llms.txt)',
              href: 'pathname:///llms.txt',
            },
            {
              label: 'Evidence manifests',
              to: '/docs/ai/overview',
            },
            {
              label: 'Helm Charts',
              href: 'https://github.com/zenmesh/helm-charts',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zenmesh',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/clawd',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Zen Mesh Inc. Toronto, Ontario, Canada. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'go', 'yaml', 'json', 'hcl'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

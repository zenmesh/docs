import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redirect from '@docusaurus/plugin-client-redirects';
import {docsStructuredDataBlocks} from './src/lib/docsPublicStructuredData';

// Hand-maintained redirects for renamed or moved pages (from != to). Kept in
// sync with vercel.json and public/_redirects — enforced by
// scripts/validation/validate-route-aliases.mjs.
const LEGACY_REDIRECTS = []

const LEGACY_REDIRECT_FROMS = new Set(
  LEGACY_REDIRECTS.flatMap((r) => (typeof r.from === 'string' ? [r.from] : r.from)),
);

const config: Config = {
  title: 'Zen Mesh',
  tagline: 'Secure webhook delivery to private networks',
  favicon: 'img/favicon.ico',

  url: 'https://www.zen-mesh.io',
  baseUrl: '/docs/',

  organizationName: 'zenmesh',
  projectName: 'docs',

  onBrokenLinks: 'warn',

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
          routeBasePath: 'zen-mesh',
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
        redirects: LEGACY_REDIRECTS,
        // Auto-generate the legacy alias (URL without the /docs prefix) for
        // every docs page, so a new page can never ship without its prefix-less
        // URL resolving. Explicit LEGACY_REDIRECTS entries take precedence.
        // Sibling docs instances mounted at the site root (zen-lock, zen-gc,
        // helm-charts) own those top-level namespaces — never alias onto them.
        createRedirects(route) {
          if (!route.startsWith('/docs/')) return [];
          const legacy = route.slice('/docs'.length);
          if (legacy === '/') return [];
          const segment = legacy.split('/')[1];
          if (['zen-lock', 'zen-gc', 'helm-charts'].includes(segment)) return [];
          if (LEGACY_REDIRECT_FROMS.has(legacy)) return [];
          return [legacy];
        },
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
          href: 'https://www.zen-mesh.io/pricing',
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
              href: 'https://www.zen-mesh.io',
            },
            {
              label: 'Pricing',
              href: 'https://www.zen-mesh.io/pricing',
            },
            {
              label: 'Docs',
              to: '/zen-mesh',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://www.zen-mesh.io',
            },
            {
              label: 'Security',
              href: 'https://www.zen-mesh.io/security',
            },
            {
              label: 'Terms of Service',
              href: 'https://www.zen-mesh.io/commitments/legal/terms/',
            },
            {
              label: 'Privacy Policy',
              href: 'https://www.zen-mesh.io/commitments/legal/privacy/',
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

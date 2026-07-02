import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
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

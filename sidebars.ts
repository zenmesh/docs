import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  defaultSidebar: [
    {
      type: 'category',
      label: 'Start Here',
      items: [
        'start-here/what-is-zen-mesh',
        'start-here/who-should-use-zen-mesh',
        'start-here/current-status',
        'start-here/concepts',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
        'getting-started/installation',
        'getting-started/first-webhook',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/three-plane-model',
        'architecture/delivery-modes',
        'architecture/security-model',
        'concepts/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/security-capability-validation',
        'security/agent-saas-mtls',
        'security/zenlock-credential-lifecycle',
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      items: [
        'networking/gateway-api-migration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/cluster-enrollment',
        'guides/adapters',
        'guides/destinations',
        'guides/monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/upgrades',
        'operations/backups',
        'operations/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Evidence',
      items: [
        'evidence/overview',
        'evidence/runtime-convergence',
        'evidence/trust-lifecycle',
        'ai/capability-evidence',
        'ai/compliance-evidence',
        'evidence/validation-map',
        'evidence/merkle-integrity',
        'evidence/completion-evidence',
        'evidence/non-claims',
        'ai/verification',
      ],
    },
    {
      type: 'category',
      label: 'AI Agents',
      items: [
        'ai/overview',
        'ai/wedge-overview',
        'ai/evidence-schema',
        'ai/non-claims',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/helm-chart',
        'reference/cli',
        'reference/api',
        'reference/customer-api',
        'reference/mcp',
        'reference/configuration',
      ],
    },
  ],
};

export default sidebars;

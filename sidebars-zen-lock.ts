import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  zenLockSidebar: [
    'index',
    'how-it-works',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'using-secrets'],
    },
    {
      type: 'category',
      label: 'Delivery Modes',
      items: ['csi-driver'],
    },
    {
      type: 'category',
      label: 'Operating zen-lock',
      items: ['high-availability', 'key-rotation', 'operations'],
    },
    'security-properties',
    'enrollment-and-secrets',
  ],
};

export default sidebars;

export const pagePathByFile = {
  'index.html': '/',
  'objectives.html': '/objectives',
  'assets.html': '/deploy',
  'deploy.html': '/deploy',
  'diagrams.html': '/deploy',
  'segmentation.html': '/deploy',
  'voip.html': '/voip',
  'cloud.html': '/deploy',
  'programming.html': '/voip',
  'cybersecurity.html': '/hippa',
  'hippa.html': '/hippa',
  'strategies.html': '/objectives',
};

export const pages = [
  {
    slug: 'index',
    route: '/',
    fileName: 'index.html',
    title: 'Centralized Identity & Hybrid Network Architecture | Summit Care Medical Clinic',
  },
  {
    slug: 'objectives',
    route: '/objectives',
    fileName: 'objectives.html',
    title: 'Overview, Purpose & Master-Leaf Strategy | Summit Care Architecture',
  },
  {
    slug: 'deploy',
    route: '/deploy',
    fileName: 'deploy.html',
    title: 'Architecture, IP Scheme, VPNs & Entra Sync | Summit Care Architecture',
  },
  {
    slug: 'voip',
    route: '/voip',
    fileName: 'voip.html',
    title: 'Operations, GPO Isolation & Hybrid Identity Runbooks | Summit Care Architecture',
  },
  {
    slug: 'hippa',
    route: '/hippa',
    fileName: 'hippa.html',
    title: 'HIPAA, Risk, Governance & Final Recommendations | Summit Care Architecture',
  },
];

export default function sitemap() {
  const base = 'https://stepupcalculator.com';
  const now = new Date();

  // Define the core paths (excluding blog)
  const corePaths = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/target-amount-calculator', priority: 0.9, freq: 'weekly' },
    { path: '/cagr-calculator', priority: 0.9, freq: 'weekly' },
    { path: '/lumpsum-calculator', priority: 0.9, freq: 'weekly' },
    { path: '/swp-calculator', priority: 0.9, freq: 'weekly' },
    { path: '/about', priority: 0.6, freq: 'monthly' },
    { path: '/disclaimer', priority: 0.5, freq: 'monthly' },
    { path: '/blog', priority: 0.8, freq: 'weekly' },
  ];

  // Define US core paths (note that US root is /us/dca-calculator)
  const usCorePaths = [
    { path: '/us/dca-calculator', priority: 0.9, freq: 'weekly' },
    { path: '/us/target-amount-calculator', priority: 0.8, freq: 'weekly' },
    { path: '/us/cagr-calculator', priority: 0.8, freq: 'weekly' },
    { path: '/us/lumpsum-calculator', priority: 0.8, freq: 'weekly' },
    { path: '/us/swp-calculator', priority: 0.8, freq: 'weekly' },
    { path: '/us/about', priority: 0.5, freq: 'monthly' },
    { path: '/us/disclaimer', priority: 0.4, freq: 'monthly' },
    { path: '/us/blog', priority: 0.7, freq: 'weekly' },
  ];

  // Indian Guides
  const inGuides = [
    '/blog/cost-of-delay-calculator',
    '/blog/sip-vs-fd-ppf-rd',
    '/blog/sip-to-reach-1-crore',
    '/blog/cagr-vs-xirr-vs-absolute-return',
    '/blog/sip-based-on-salary',
    '/blog/retirement-sip-calculator',
    '/blog/sip-vs-lumpsum',
    '/blog/sip-to-beat-inflation',
    '/blog/sip-for-child-education',
    '/blog/sip-for-house-down-payment',
    '/blog/sip-during-market-crash',
    '/blog/swp-vs-sip',
    '/blog/sip-vs-stp',
    '/blog/flexi-sip',
    '/blog/step-up-sip',
    '/blog/trigger-sip',
    '/blog/dynamic-sip',
    '/blog/common-sip-mistakes',
    '/blog/types-of-sip',
    '/blog/sip-for-nris',
    '/blog/sip-vs-ulip'
  ];

  // US Guides
  const usGuides = [
    '/us/blog/cost-of-delay-calculator',
    '/us/blog/dca-vs-fd-ppf-rd',
    '/us/blog/dca-to-reach-1-million',
    '/us/blog/cagr-vs-xirr-vs-absolute-return',
    '/us/blog/dca-based-on-salary',
    '/us/blog/retirement-dca-calculator',
    '/us/blog/dca-vs-lumpsum',
    '/us/blog/dca-to-beat-inflation',
    '/us/blog/dca-for-child-education',
    '/us/blog/dca-for-house-down-payment',
    '/us/blog/dca-during-market-crash',
    '/us/blog/swp-vs-dca',
    '/us/blog/dca-vs-stp',
    '/us/blog/flexi-dca',
    '/us/blog/step-up-dca',
    '/us/blog/trigger-dca',
    '/us/blog/dynamic-dca',
    '/us/blog/common-dca-mistakes',
    '/us/blog/types-of-dca',
    '/us/blog/dca-for-expats',
    '/us/blog/dca-vs-ulip'
  ];

  const mapCore = (paths) => paths.map(p => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority
  }));

  const mapGuides = (paths, priority) => paths.map(p => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: priority
  }));

  return [
    ...mapCore(corePaths),
    ...mapCore(usCorePaths),
    ...mapGuides(inGuides, 0.8),
    ...mapGuides(usGuides, 0.7),
  ];
}

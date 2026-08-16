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

  // Interactive Tools (India)
  const inTools = [
    '/tools/cost-of-delay-calculator',
    '/tools/sip-based-on-salary',
    '/tools/retirement-sip-calculator',
    '/tools/sip-vs-lumpsum',
    '/tools/sip-to-beat-inflation',
    '/tools/sip-for-child-education',
    '/tools/sip-for-house-down-payment',
    '/tools/sip-during-market-crash',
    '/tools/sip-to-reach-1-crore',
    '/tools/fd-vs-sip-calculator',
    '/tools/fire-calculator',
    '/tools/xirr-calculator',
    '/tools/nps-calculator',
    '/tools/ppf-calculator',
    '/tools/buy-vs-rent-calculator'
  ];

  // Interactive Tools (US)
  const usTools = [
    '/us/tools/cost-of-delay-calculator',
    '/us/tools/dca-based-on-salary',
    '/us/tools/retirement-account-calculator',
    '/us/tools/dca-vs-lumpsum',
    '/us/tools/dca-to-beat-inflation',
    '/us/tools/dca-for-child-education',
    '/us/tools/dca-for-house-down-payment',
    '/us/tools/dca-during-market-crash',
    '/us/tools/dca-to-reach-1-million',
    '/us/tools/savings-vs-dca-calculator',
    '/us/tools/fire-calculator',
    '/us/tools/xirr-calculator',
    '/us/tools/roth-ira-calculator',
    '/us/tools/buy-vs-rent-calculator'
  ];

  // Indian Guides
  const inGuides = [
    '/blog/sip-vs-fd-ppf-rd',
    '/blog/cagr-vs-xirr-vs-absolute-return',
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
    '/us/blog/dca-vs-fd-ppf-rd',
    '/us/blog/cagr-vs-xirr-vs-absolute-return',
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

  const mapItems = (paths, priority) => paths.map(p => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: priority
  }));

  return [
    ...mapCore(corePaths),
    ...mapCore(usCorePaths),
    ...mapItems(inTools, 0.85),
    ...mapItems(usTools, 0.75),
    ...mapItems(inGuides, 0.8),
    ...mapItems(usGuides, 0.7),
  ];
}

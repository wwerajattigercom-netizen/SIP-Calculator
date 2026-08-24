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
    '/tools/buy-vs-rent-calculator',
    '/tools/car-loan-calculator',
    '/tools/goal-planner',
    '/tools/net-worth-calculator',
    '/tools/cost-of-delay-calculator',
    '/tools/emi-calculator',
    '/tools/fd-vs-sip-calculator',
    '/tools/fire-calculator',
    '/tools/home-loan-calculator',
    '/tools/income-tax-calculator',
    '/tools/nps-calculator',
    '/tools/ppf-calculator',
    '/tools/retirement-sip-calculator',
    '/tools/sip-based-on-salary',
    '/tools/sip-during-market-crash',
    '/tools/sip-for-child-education',
    '/tools/sip-for-house-down-payment',
    '/tools/sip-to-beat-inflation',
    '/tools/sip-to-reach-1-crore',
    '/tools/sip-vs-lumpsum',
    '/tools/xirr-calculator'
  ];

  // Interactive Tools (US)
  const usTools = [
    '/us/tools/auto-loan-calculator',
    '/us/tools/buy-vs-rent-calculator',
    '/us/tools/goal-planner',
    '/us/tools/net-worth-calculator',
    '/us/tools/cost-of-delay-calculator',
    '/us/tools/dca-based-on-salary',
    '/us/tools/dca-during-market-crash',
    '/us/tools/dca-for-child-education',
    '/us/tools/dca-for-house-down-payment',
    '/us/tools/dca-to-beat-inflation',
    '/us/tools/dca-to-reach-1-million',
    '/us/tools/dca-vs-lumpsum',
    '/us/tools/emi-calculator',
    '/us/tools/fire-calculator',
    '/us/tools/income-tax-calculator',
    '/us/tools/mortgage-calculator',
    '/us/tools/retirement-account-calculator',
    '/us/tools/retirement-dca-calculator',
    '/us/tools/roth-ira-calculator',
    '/us/tools/savings-vs-dca-calculator',
    '/us/tools/xirr-calculator'
  ];

  // Indian Guides
  const inGuides = [
    '/blog/cagr-vs-xirr-vs-absolute-return',
    '/blog/common-sip-mistakes',
    '/blog/dynamic-sip',
    '/blog/flexi-sip',
    '/blog/home-loan-with-low-cibil-score',
    '/blog/sip-for-nris',
    '/blog/sip-vs-fd-ppf-rd',
    '/blog/sip-vs-stp',
    '/blog/sip-vs-ulip',
    '/blog/step-up-sip',
    '/blog/where-to-park-emergency-fund',
    '/blog/why-net-worth-explodes-after-1-crore',
    '/blog/swp-vs-sip',
    '/blog/trigger-sip',
    '/blog/types-of-sip'
  ];

  // US Guides
  const usGuides = [
    '/us/blog/cagr-vs-xirr-vs-absolute-return',
    '/us/blog/common-dca-mistakes',
    '/us/blog/dca-for-expats',
    '/us/blog/dca-vs-fd-ppf-rd',
    '/us/blog/dca-vs-stp',
    '/us/blog/dca-vs-ulip',
    '/us/blog/dynamic-dca',
    '/us/blog/flexi-dca',
    '/us/blog/step-up-dca',
    '/us/blog/home-loan-with-low-credit-score',
    '/us/blog/where-to-park-emergency-fund',
    '/us/blog/why-wealth-explodes-after-100k',
    '/us/blog/swp-vs-dca',
    '/us/blog/trigger-dca',
    '/us/blog/types-of-dca'
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

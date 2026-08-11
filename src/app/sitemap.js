export default function sitemap() {
  const base = 'https://stepupcalculator.com';
  const now = new Date();

  return [
    { url: base,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/target-amount-calculator`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/cagr-calculator`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/lumpsum-calculator`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/swp-calculator`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/blog/cost-of-delay-calculator`,lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${base}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/disclaimer`,              lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog`,                    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/blog/sip-to-reach-1-crore`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/cagr-vs-xirr-vs-absolute-return`,lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-based-on-salary`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/retirement-sip-calculator`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-vs-lumpsum`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-to-beat-inflation`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-for-child-education`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-for-house-down-payment`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/sip-during-market-crash`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}

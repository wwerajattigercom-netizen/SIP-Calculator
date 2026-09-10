export const metadata = {
  title: 'NPS Calculator India 2024 — Estimate Your Pension Corpus & Monthly Pension',
  description: 'Calculate your National Pension System (NPS) corpus at retirement. Enter your age, monthly contribution, and expected return to estimate your pension wealth and monthly annuity payout.',
  keywords: [
    'nps calculator', 'national pension system calculator', 'nps corpus calculator',
    'nps pension calculator india', 'nps maturity calculator', 'nps monthly pension calculator',
    'how much nps pension will i get', 'nps tier 1 calculator'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'NPS Calculator India — Estimate Your Pension Corpus',
    description: 'Calculate your NPS corpus and monthly pension payout at retirement. Free interactive tool for Indian investors.',
    url: 'https://stepupcalculator.com/tools/nps-calculator',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/tools/nps-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/nps-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/retirement-account-calculator',
      'x-default': 'https://stepupcalculator.com/tools/nps-calculator',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

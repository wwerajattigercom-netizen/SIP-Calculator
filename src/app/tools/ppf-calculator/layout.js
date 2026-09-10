export const metadata = {
  title: 'PPF Calculator India 2024 — Public Provident Fund Maturity & Interest',
  description: 'Calculate your PPF maturity amount, year-by-year interest earned, and total corpus after 15 years. Plan your tax-free savings with India\'s most trusted government-backed scheme.',
  keywords: [
    'ppf calculator', 'public provident fund calculator', 'ppf maturity calculator',
    'ppf interest calculator 2024', 'ppf 15 year calculator', 'ppf returns calculator',
    'ppf investment calculator india', 'ppf tax saving calculator'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'PPF Calculator India — Maturity Amount & Year-by-Year Growth',
    description: 'Calculate your PPF corpus after 15 years. See how your tax-free savings compound under the Public Provident Fund scheme.',
    url: 'https://stepupcalculator.com/tools/ppf-calculator',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/tools/ppf-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/ppf-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/retirement-account-calculator',
      'x-default': 'https://stepupcalculator.com/tools/ppf-calculator',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

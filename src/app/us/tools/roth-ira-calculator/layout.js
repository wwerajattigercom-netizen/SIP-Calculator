export const metadata = {
  title: 'Roth IRA Calculator — Tax-Free Retirement Growth & Contribution Estimator',
  description: 'Calculate the future value of your Roth IRA contributions. See how tax-free compounding grows your wealth by retirement age and compare it to a Traditional IRA.',
  keywords: [
    'roth ira calculator', 'roth ira growth calculator', 'tax free retirement calculator',
    'roth vs traditional ira', 'ira contribution calculator', 'roth ira future value',
    'roth ira compound interest', 'max roth ira contribution calculator'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Roth IRA Calculator — Tax-Free Retirement Growth',
    description: 'See how Roth IRA tax-free compounding builds your retirement wealth. Compare contribution scenarios side by side.',
    url: 'https://stepupcalculator.com/us/tools/roth-ira-calculator',
    type: 'article',
    locale: 'en_US',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/us/tools/roth-ira-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/ppf-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/roth-ira-calculator',
      'x-default': 'https://stepupcalculator.com/us/tools/roth-ira-calculator',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

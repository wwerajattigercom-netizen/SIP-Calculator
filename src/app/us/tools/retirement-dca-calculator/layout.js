export const metadata = {
  title: 'Retirement DCA Calculator: How Much to Invest?',
  description: 'Calculate the exact DCA amount needed for your retirement globally. Factor in inflation, current expenses, and expected returns to find your retirement corpus.',
  keywords: [
    'dca for retirement', 'how much to invest for retirement', 'retirement corpus calculator', 'retirement planning dca', 'dca calculator for retirement'
  ],
  authors: [{ name: 'StepupCalculator' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Retirement DCA Calculator',
    description: 'Find out exactly how much you need to invest monthly for a comfortable retirement. Interactive calculator accounting for inflation.',
    url: 'https://stepupcalculator.com/us/tools/retirement-dca-calculator',
    type: 'article',
    locale: 'en_US',
  },
  alternates: { canonical: 'https://stepupcalculator.com/us/tools/retirement-dca-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/retirement-sip-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/retirement-dca-calculator',
      'x-default': 'https://stepupcalculator.com/tools/retirement-sip-calculator'
    } },
};
export default function Layout({ children }) { return children; }

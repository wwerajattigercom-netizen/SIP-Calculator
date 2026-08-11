export const metadata = {
  title: 'About StepupCalculator — Free Financial Calculators for Global Investors',
  description:
    'Learn about StepupCalculator.com — who built it, why, and how the DCA, CAGR and goal calculators work. Built by Rajat, a financial tools developer focused on Global investors.',
  alternates: { 
    canonical: 'https://stepupcalculator.com/us/about',
    languages: {
      'en-IN': 'https://stepupcalculator.com/about',
      'en-US': 'https://stepupcalculator.com/us/about',
      'x-default': 'https://stepupcalculator.com/about'
    } },
  openGraph: {
    title: 'About StepupCalculator',
    description: 'Free financial calculators for Global investors — DCA, CAGR, Goal Planning. Built by Rajat.',
    url: 'https://stepupcalculator.com/about',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }) {
  return children;
}

export const metadata = {
  title: 'About StepupCalculator — Free Financial Calculators for Indian Investors',
  description:
    'Learn about StepupCalculator.com — who built it, why, and how the SIP, CAGR and goal calculators work. Built by Rajat, a financial tools developer focused on Indian investors.',
  alternates: { canonical: 'https://stepupcalculator.com/about' },
  openGraph: {
    title: 'About StepupCalculator',
    description: 'Free financial calculators for Indian investors — SIP, CAGR, Goal Planning. Built by Rajat.',
    url: 'https://stepupcalculator.com/about',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }) {
  return children;
}

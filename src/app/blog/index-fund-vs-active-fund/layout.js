import Script from 'next/script';

export const metadata = {
  title: 'Index Fund vs Actively Managed Fund in India | Which is Better?',
  description: 'Understand the difference between index funds and actively managed funds in India. Learn about the SPIVA report, expense ratios, NIFTY 50, and which mutual fund is right for you.',
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/index-fund-vs-active-fund',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/index-fund-vs-active-fund',
      'en-US': 'https://stepupcalculator.com/us/blog/index-fund-vs-actively-managed',
    },
  },
  openGraph: {
    title: 'Index Fund vs Actively Managed Fund in India',
    description: 'Understand the difference between index funds and actively managed funds in India. Learn about the SPIVA report, expense ratios, NIFTY 50, and which mutual fund is right for you.',
    url: 'https://stepupcalculator.com/blog/index-fund-vs-active-fund',
    siteName: 'StepupCalculator',
    type: 'article',
  },
};

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}

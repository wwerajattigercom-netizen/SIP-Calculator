import Script from 'next/script';

export const metadata = {
  title: 'S&P 500 Index Funds vs Active Mutual Funds | Which is Better?',
  description: 'Understand the difference between S&P 500 index funds and actively managed funds. Learn about Warren Buffett\'s million-dollar bet, fee drag, and the best choice for your 401(k).',
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/index-fund-vs-actively-managed',
    languages: {
      'en-US': 'https://stepupcalculator.com/us/blog/index-fund-vs-actively-managed',
      'en-IN': 'https://stepupcalculator.com/blog/index-fund-vs-active-fund',
    },
  },
  openGraph: {
    title: 'S&P 500 Index Funds vs Active Mutual Funds',
    description: 'Understand the difference between S&P 500 index funds and actively managed funds. Learn about Warren Buffett\'s million-dollar bet, fee drag, and the best choice for your 401(k).',
    url: 'https://stepupcalculator.com/us/blog/index-fund-vs-actively-managed',
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

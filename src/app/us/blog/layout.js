export const metadata = {
  title: 'Investment Guides & Articles — DCA, CAGR, Mutual Funds | StepupCalculator',
  description:
    'Free investment guides for Indian investors. Learn how much DCA you need for $1 Million, difference between CAGR vs XIRR, step-up DCA benefits, and more — explained simply.',
  keywords: [
    'dca guide india', 'mutual fund guide', 'how to invest dca',
    'cagr explained', 'investment articles india', 'dca tips india',
    'how to reach 1 million', 'mutual fund returns explained',
  ],
  alternates: { canonical: 'https://stepupcalculator.com/us/blog',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog',
      'en-US': 'https://stepupcalculator.com/us/blog',
      'x-default': 'https://stepupcalculator.com/blog'
    } },
  openGraph: {
    title: 'Investment Guides — StepupCalculator',
    description: 'Free investment guides for Indian investors — DCA, CAGR, mutual funds explained simply.',
    url: 'https://stepupcalculator.com/us/blog',
    images: [{ url: 'https://stepupcalculator.com/us/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function BlogIndexLayout({ children }) {
  return children;
}

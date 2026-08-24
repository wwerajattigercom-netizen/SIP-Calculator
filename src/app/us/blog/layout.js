export const metadata = {
  title: 'Investment Guides & Articles — DCA, CAGR, ETFs | StepupCalculator',
  description:
    'Free investment guides for US investors. Learn how much DCA you need for $1 Million, difference between CAGR vs XIRR, step-up DCA benefits, and more — explained simply.',
  keywords: [
    'dca guide', 'etf investing guide', 'how to invest dca',
    'cagr explained', 'investment articles us', 'dollar cost averaging tips',
    'how to reach 1 million', 'mutual fund returns explained',
  ],
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog',
      'en-US': 'https://stepupcalculator.com/us/blog',
      'x-default': 'https://stepupcalculator.com/blog',
    },
  },
  openGraph: {
    title: 'Investment Guides — StepupCalculator',
    description: 'Free investment guides for US investors — DCA, CAGR, ETFs explained simply.',
    url: 'https://stepupcalculator.com/us/blog',
    type: 'website',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function BlogIndexLayout({ children }) {
  return children;
}

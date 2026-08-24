export const metadata = {
  title: 'Investment Guides & Articles — SIP, CAGR, Mutual Funds | StepupCalculator',
  description:
    'Free investment guides for Indian investors. Learn how much SIP you need for 1 Crore, difference between CAGR vs XIRR, step-up SIP benefits, and more — explained simply.',
  keywords: [
    'sip guide india', 'mutual fund guide', 'how to invest sip',
    'cagr explained', 'investment articles india', 'sip tips india',
    'how to reach 1 crore', 'mutual fund returns explained',
  ],
  alternates: {
    canonical: 'https://stepupcalculator.com/blog',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog',
      'en-US': 'https://stepupcalculator.com/us/blog',
      'x-default': 'https://stepupcalculator.com/blog',
    },
  },
  openGraph: {
    title: 'Investment Guides — StepupCalculator',
    description: 'Free investment guides for Indian investors — SIP, CAGR, mutual funds explained simply.',
    url: 'https://stepupcalculator.com/blog',
    type: 'website',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function BlogIndexLayout({ children }) {
  return children;
}

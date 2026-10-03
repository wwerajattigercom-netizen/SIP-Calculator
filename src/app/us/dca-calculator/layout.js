export const metadata = {
  title: 'DCA Calculator with Step Up, Inflation & Lump Sum | Free Online Tool',
  description: 'Free Dollar-Cost Averaging (DCA) calculator with step-up & inflation adjustment. Calculate monthly DCA returns, add lump sum, apply annual step-up — all in real time. For US investors.',
  keywords: [
    'DCA calculator', 'dollar cost averaging calculator', 'DCA calculator with step up',
    'DCA calculator with inflation', 'DCA calculator with lump sum',
    'dollar cost averaging tool', 'DCA investment calculator',
    'best DCA calculator USA', 'DCA return calculator', 'monthly DCA calculator',
    'DCA to reach 1 million', 'how much DCA for 1 million', 'step up DCA calculator',
    'DCA calculator with step up and inflation', 'inflation adjusted DCA calculator',
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'DCA Calculator with Step Up, Inflation & Lump Sum | Free Online Tool',
    description: 'Free DCA calculator with step-up, lump sum, inflation adjustment — all in one page, real-time sliders. For US investors using DCA / RSP / AIP strategies.',
    type: 'website',
    url: 'https://stepupcalculator.com/us/dca-calculator',
    locale: 'en_US',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630, alt: 'StepupCalculator — Free DCA Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCA Calculator with Step Up, Inflation & Lump Sum',
    description: 'Free online DCA calculator with step-up, lump sum & inflation. For US investors.',
    images: ['https://stepupcalculator.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/us/dca-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com',
      'en-US': 'https://stepupcalculator.com/us/dca-calculator',
      'x-default': 'https://stepupcalculator.com',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

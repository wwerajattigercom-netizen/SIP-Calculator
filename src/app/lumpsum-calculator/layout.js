export const metadata = {
  title: 'Lumpsum Calculator — Calculate Lump Sum Investment Returns Online Free | StepupCalculator',
  description:
    'Free Lumpsum Calculator — calculate the future value of a one-time lump sum investment. Enter investment amount, expected return rate & duration. See year-by-year growth, gain, and wealth multiple. Ideal for mutual fund, FD & stock investment planning.',
  keywords: [
    'lumpsum calculator', 'lump sum calculator India', 'lumpsum investment calculator',
    'lumpsum calculator online free', 'lumpsum mutual fund calculator',
    'lumpsum calculator with returns', 'one time investment calculator',
    'lumpsum vs SIP calculator', 'future value calculator India',
    'lumpsum calculator for mutual funds', 'lumpsum return calculator',
    'lump sum investment return calculator online', 'lumpsum calculator 10 years',
    'lumpsum calculator 20 years', 'lumpsum 1 crore calculator',
    'compound interest calculator India', 'lumpsum calculator with inflation',
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Lumpsum Calculator — Calculate Lump Sum Returns Online Free',
    description:
      'Free online lumpsum calculator. Enter your one-time investment, return rate & years. See future value, absolute gain, CAGR & year-by-year compounding table.',
    url: 'https://stepupcalculator.com/lumpsum-calculator',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StepupCalculator',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumpsum Calculator — Free Online Tool | StepupCalculator',
    description: 'Calculate future value of any lump sum investment. Free, real-time, no sign-up.',
    images: ['https://stepupcalculator.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://stepupcalculator.com/lumpsum-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/lumpsum-calculator',
      'en-US': 'https://stepupcalculator.com/us/lumpsum-calculator',
      'x-default': 'https://stepupcalculator.com/lumpsum-calculator'
    } },
};

export default function LumpsumLayout({ children }) {
  return children;
}

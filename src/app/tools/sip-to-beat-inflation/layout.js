export const metadata = {
  title: 'SIP Inflation Calculator: Real Return on Your Investment',
  description: 'Calculate the real return on your SIP after accounting for inflation. Understand how inflation erodes purchasing power and how to beat it.',
  keywords: [
    'sip to beat inflation', 'real return sip', 'inflation adjusted sip calculator', 'sip after inflation'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'SIP Inflation Calculator: Real Return on Your Investment',
    description: 'Calculate the real return on your SIP after accounting for inflation. Understand how inflation erodes purchasing power and how to beat it.',
    url: 'https://stepupcalculator.com/tools/sip-to-beat-inflation',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://stepupcalculator.com/tools/sip-to-beat-inflation',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/sip-to-beat-inflation',
      'en-US': 'https://stepupcalculator.com/us/tools/dca-to-beat-inflation',
      'x-default': 'https://stepupcalculator.com/tools/sip-to-beat-inflation'
    } },
};

export default function Layout({ children }) {
  return children;
}

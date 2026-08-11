export const metadata = {
  title: 'SIP for Child Education Calculator — Plan Your Child\'s Future in India',
  description: 'Calculate exactly how much monthly SIP you need to fund your child\'s college education in India. Accounts for education inflation, years to goal, and step-up SIP strategy.',
  keywords: ['sip for child education', 'child education planning sip', 'education goal calculator', 'child education fund calculator india', 'sip for college fees india', 'education inflation sip'],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'SIP for Child Education — Education Goal Calculator',
    description: 'Find the exact SIP to fund your child\'s education. Accounts for 10% education inflation and years to goal.',
    url: 'https://stepupcalculator.com/blog/sip-for-child-education',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://stepupcalculator.com/blog/sip-for-child-education',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/sip-for-child-education',
      'en-US': 'https://stepupcalculator.com/us/blog/dca-for-child-education',
      'x-default': 'https://stepupcalculator.com/blog/sip-for-child-education'
    } },
};
export default function Layout({ children }) { return children; }

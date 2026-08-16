export const metadata = {
  title: 'DCA for Child Education Calculator — Plan Your Child\'s Future',
  description: 'Calculate exactly how much monthly DCA you need to fund your child\'s college education globally. Accounts for education inflation, years to goal, and step-up DCA strategy.',
  keywords: ['dca for child education', 'child education planning dca', 'education goal calculator', 'child education fund calculator', 'dca for college fees', 'education inflation dca'],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'DCA for Child Education — Education Goal Calculator',
    description: 'Find the exact DCA to fund your child\'s education. Accounts for 10% education inflation and years to goal.',
    url: 'https://stepupcalculator.com/us/tools/dca-for-child-education',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://stepupcalculator.com/us/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://stepupcalculator.com/us/tools/dca-for-child-education',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/dca-for-child-education',
      'en-US': 'https://stepupcalculator.com/us/blog/dca-for-child-education',
      'x-default': 'https://stepupcalculator.com/blog/dca-for-child-education'
    } },
};
export default function Layout({ children }) { return children; }

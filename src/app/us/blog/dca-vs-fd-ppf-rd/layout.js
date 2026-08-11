export const metadata = {
  title: 'DCA vs CD vs 401(k) Comparison Tool — Which is Better?',
  description: 'Compare Mutual Fund DCAs against CD, HYSA, and 401(k). Calculate and visualize the wealth generation difference using our interactive comparison tool.',
  keywords: ['DCA vs CD', 'DCA vs 401(k)', 'mutual fund vs fd', 'DCA vs HYSA', 'investment comparison calculator'],
  openGraph: {
    title: 'DCA vs CD vs 401(k) Comparison Tool',
    description: 'See the real difference in wealth creation between DCAs, CDs, and 401(k) over 10-20 years.',
    url: 'https://stepupcalculator.com/us/blog/dca-vs-fd-ppf-rd',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://stepupcalculator.com/us/blog/dca-vs-fd-ppf-rd',
    languages: {
      'en-IN': 'https://stepupcalculator.com/blog/dca-vs-fd-ppf-rd',
      'en-US': 'https://stepupcalculator.com/us/blog/dca-vs-fd-ppf-rd',
      'x-default': 'https://stepupcalculator.com/blog/dca-vs-fd-ppf-rd'
    } },
};

export default function Layout({ children }) {
  return children;
}

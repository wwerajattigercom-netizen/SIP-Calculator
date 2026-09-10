export const metadata = {
  title: 'EMI Calculator — Monthly Loan Installment, Total Interest & Amortization',
  description: 'Calculate your Equated Monthly Installment (EMI) for any loan. Enter principal, interest rate, and tenure to get your exact monthly payment, total interest, and a full amortization schedule.',
  keywords: [
    'emi calculator', 'loan emi calculator', 'monthly installment calculator',
    'loan payment calculator', 'emi formula calculator', 'home loan emi calculator',
    'personal loan emi calculator', 'loan amortization calculator'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'EMI Calculator — Monthly Payment & Amortization Schedule',
    description: 'Calculate your exact EMI for any loan. Get full amortization breakdown instantly.',
    url: 'https://stepupcalculator.com/us/tools/emi-calculator',
    type: 'article',
    locale: 'en_US',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/us/tools/emi-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/emi-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/emi-calculator',
      'x-default': 'https://stepupcalculator.com/us/tools/emi-calculator',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

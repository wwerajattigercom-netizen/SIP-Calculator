export const metadata = {
  title: 'Auto Loan Calculator — Monthly Payment, Total Interest & Amortization Schedule',
  description: 'Calculate your monthly auto loan payment, total interest paid, and view a full year-by-year amortization schedule. Compare loan terms and down payment scenarios instantly.',
  keywords: [
    'auto loan calculator', 'car loan payment calculator', 'auto loan monthly payment',
    'car loan amortization schedule', 'car loan interest calculator', 'vehicle financing calculator',
    'how much car can i afford', 'auto loan payoff calculator'
  ],
  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Auto Loan Calculator — Monthly Payment & Amortization',
    description: 'Calculate your exact monthly car payment, total interest cost, and full amortization schedule. Free tool for US car buyers.',
    url: 'https://stepupcalculator.com/us/tools/auto-loan-calculator',
    type: 'article',
    locale: 'en_US',
    images: [{ url: 'https://stepupcalculator.com/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://stepupcalculator.com/us/tools/auto-loan-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/tools/car-loan-calculator',
      'en-US': 'https://stepupcalculator.com/us/tools/auto-loan-calculator',
      'x-default': 'https://stepupcalculator.com/us/tools/auto-loan-calculator',
    },
  },
};

export default function Layout({ children }) {
  return children;
}

export const metadata = {
  // ── Title: Primary keyword first + brand (matches Groww's pattern) ──
  title: 'CAGR Calculator - Calculate Compound Annual Growth Rate Online | StepupCalculator',
  description:
    'Free CAGR Calculator — calculate Compound Annual Growth Rate of any investment instantly. Enter initial value, final value & duration. See year-by-year growth, Rule of 72, and absolute returns. Works for mutual funds, stocks, FDs & SIPs.',

  keywords: [
    // ── Tier 1: High-volume primary (10k–50k/mo) ──
    'CAGR calculator',
    'CAGR calculator online',
    'CAGR calculator online free',
    'compound annual growth rate calculator',
    'CAGR calculator India',

    // ── Tier 2: Intent variants (5k–15k/mo) ──
    'CAGR formula calculator',
    'how to calculate CAGR',
    'mutual fund CAGR calculator',
    'investment CAGR calculator',
    'annualised return calculator',
    'investment return calculator',
    'CAGR calculator for stocks',
    'CAGR calculator for mutual funds',
    'calculate CAGR online',
    'CAGR percentage calculator',

    // ── Tier 3: Long-tail low-competition (1k–5k/mo) ──
    'CAGR calculator with SIP',
    'CAGR vs absolute return calculator',
    'CAGR calculator for FD',
    'what is a good CAGR for mutual funds India',
    'how to calculate CAGR for SIP',
    'lump sum investment CAGR calculator',
    'CAGR calculator year by year',
    'CAGR to future value calculator',
    'Rule of 72 calculator India',
    'investment doubling time calculator',
    'XIRR CAGR calculator India',
    'portfolio CAGR calculator',

    // ── Cross-linking / cluster ──
    'step up SIP calculator',
    'SIP goal calculator',
    'SIP return calculator India',
  ],

  authors: [{ name: 'Rajat' }],
  robots: 'index, follow',

  openGraph: {
    title: 'CAGR Calculator - Calculate Compound Annual Growth Rate Online Free',
    description:
      'Calculate CAGR of any investment in seconds. Free online tool — enter initial value, final value & duration. Includes Rule of 72, year-by-year growth, SIP + lump sum support.',
    url: 'https://stepupcalculator.com/cagr-calculator',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StepupCalculator',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'CAGR Calculator — Free Online Tool | StepupCalculator',
    description:
      'Instantly calculate Compound Annual Growth Rate of any investment. Free, no sign-up. Includes year-by-year compounding table and Rule of 72.',
    site: '@stepupcalculator',
  },

  alternates: {
    canonical: 'https://stepupcalculator.com/cagr-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/cagr-calculator',
      'en-US': 'https://stepupcalculator.com/us/cagr-calculator',
      'x-default': 'https://stepupcalculator.com/cagr-calculator'
    },
  },
};

export default function CAGRLayout({ children }) {
  return children;
}

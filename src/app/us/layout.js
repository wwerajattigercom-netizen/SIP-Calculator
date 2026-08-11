export const metadata = {
  metadataBase: new URL("https://stepupcalculator.com"),
  title: "DCA Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
  description: "Free DCA calculator with step-up & inflation. Calculate monthly DCA returns, add lump sum, apply annual step-up and inflation adjustment — all in real time. Optimized for the US market.",
  keywords: [
    "DCA calculator", "step up DCA calculator", "DCA calculator with step up",
    "DCA calculator with inflation", "DCA calculator with lump sum",
    "DCA calculator online free", "dollar cost averaging calculator",
    "best DCA calculator US", "DCA return calculator", "monthly DCA calculator",
    "DCA to reach 1 million", "how much DCA for 1 million", "1 million DCA calculator",
    "DCA amount for 1 million in 10 years", "DCA amount for 1 million in 20 years",
    "DCA calculator with step up and inflation", "inflation adjusted DCA calculator",
    "step up DCA returns calculator", "dollar cost averaging calculator",
    "CAGR calculator", "compound annual growth rate calculator",
    "goal based DCA calculator", "time to reach 1 million DCA"
  ],
  openGraph: {
    title: "DCA Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
    description: "Free DCA calculator with step-up, lump sum, inflation adjustment — all in one page, real-time sliders. Designed for US investors.",
    type: "website",
    url: "https://stepupcalculator.com/us/dca-calculator",
    locale: "en_US",
    siteName: "StepupCalculator US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCA Calculator with Step Up, Inflation & Lump Sum",
    description: "Free online DCA calculator with step-up, lump sum & inflation. Designed for US investors.",
  },
  alternates: { 
    canonical: 'https://stepupcalculator.com/us/dca-calculator',
    languages: {
      'en-IN': 'https://stepupcalculator.com/dca-calculator',
      'en-US': 'https://stepupcalculator.com/us/dca-calculator',
      'x-default': 'https://stepupcalculator.com/dca-calculator'
    },
  },
};

export default function USLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}

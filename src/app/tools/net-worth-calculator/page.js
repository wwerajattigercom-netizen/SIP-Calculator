import NetWorthCalculator from '@/components/NetWorthCalculator';
import { Info } from 'lucide-react';

export const metadata = {
  title: "Net Worth Calculator India | Track Your Assets & Liabilities",
  description: "Calculate your true net worth with our free online tracker. Enter your real estate, investments, cash, home loans, and credit card debt to see your financial standing.",
  keywords: [
    "net worth calculator", "net worth tracker", "calculate net worth india",
    "assets and liabilities calculator", "personal wealth tracker",
    "how to calculate net worth", "wealth calculator", "financial health check"
  ],
  alternates: {
    canonical: 'https://stepupcalculator.com/tools/net-worth-calculator',
  }
};

export default function NetWorthCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Net Worth Calculator India",
    "description": "Calculate your true net worth by tracking your assets and liabilities.",
    "url": "https://stepupcalculator.com/tools/net-worth-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-4 md:p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Net Worth Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
          Your net worth is the ultimate measure of your financial health. Find out exactly where you stand by entering your assets (what you own) and liabilities (what you owe).
        </p>
      </div>

      <NetWorthCalculator />

      {/* ── HOW TO USE ── */}
      <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
            <Info className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              1
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Enter Your Assets</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Input the current market value of your real estate, mutual funds, stocks, and bank balances.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              2
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Enter Your Liabilities</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Input the outstanding principal amounts of your home loan, car loan, and credit card debts.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
              3
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1 text-sm">Review Your Net Worth</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The calculator subtracts your liabilities from your assets to show your true wealth, along with a visual breakdown.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { TrendingUp, Calculator, Zap } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Step-Up DCA (Top-Up DCA): How to Beat Inflation Automatically",
  description: "A Step-Up DCA automatically increases your investment every year in line with your salary hikes. Learn the math behind how a simple 10% step-up can double your final wealth.",
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/step-up-dca',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Step-Up DCA (Top-Up DCA): How to Beat Inflation Automatically",
  description: "A Step-Up DCA automatically increases your investment every year in line with your salary hikes. Learn the math behind how a simple 10% step-up can double your final wealth.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/us/blog/step-up-dca',
};

export default function StepUpSipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'Step-Up DCA Guide' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#059669] font-bold mb-4 block">Wealth Acceleration</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                What is a <span className="text-[#059669]">Step-Up DCA</span>? (The 10% Rule)
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Most investors start a $1,000 DCA and forget about it for 20 years. That is a massive mistake. As your salary grows, your investments must grow too. A Step-Up DCA (or Top-Up DCA) automates this, ensuring you don't fall behind inflation.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Financial Tool Architect · 6 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Concept */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">What is a Step-Up DCA?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              A Step-Up DCA (often called a Top-Up DCA by brokerages) is an automated facility where your monthly investment amount increases by a fixed percentage or a fixed flat amount every year.
            </p>
            <div className="bg-[rgba(27,58,92,0.02)] border border-[rgba(27,58,92,0.1)] p-5 rounded-xl mb-6">
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                <strong className="text-[var(--color-accent)]">Example (10% Annual Step-Up):</strong><br/><br/>
                <strong>Year 1:</strong> You invest $1,000 every month.<br/>
                <strong>Year 2:</strong> It automatically increases by 10%. You now invest $1,100 every month.<br/>
                <strong>Year 3:</strong> It increases by another 10%. You now invest $1,210 every month.<br/>
                ...and so on.
              </p>
            </div>
          </div>

          {/* Why Question */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why Must You Use a Step-Up DCA?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 border-t-4 border-t-[#059669]">
                <h3 className="font-bold text-[#059669] flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5" /> The Inflation Trap
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  $1,000 today has decent purchasing power. But due to 6-7% inflation, $1,000 twenty years from now will barely buy you a week's worth of groceries. If you lock your DCA at $1k for 20 years, your wealth accumulation is actually <em>shrinking</em> in real terms every year.
                </p>
              </div>
              
              <div className="glass-panel p-6 border-t-4 border-t-[var(--color-accent)]">
                <h3 className="font-bold text-[var(--color-accent)] flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5" /> Matching Salary Hikes
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you are a salaried employee, you likely get an annual appraisal of 8% to 15%. As your income increases, your lifestyle expenses (lifestyle creep) naturally increase. A Step-Up DCA forces your <em>investments</em> to scale alongside your income, maintaining financial discipline automatically.
                </p>
              </div>
            </div>
          </div>

          {/* The Mathematical Proof */}
          <div className="glass-panel p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border border-[rgba(27,58,92,0.1)]">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Mathematical Proof: Regular vs Step-Up</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Let's look at the staggering difference a simple 10% annual step-up makes over a 20-year horizon, assuming a 12% CAGR.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4 rounded-tl-lg">Strategy</th>
                    <th scope="col" className="px-6 py-4">Total Invested</th>
                    <th scope="col" className="px-6 py-4 rounded-tr-lg">Final Corpus (Wealth)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-black/20 border-b dark:border-gray-800">
                    <td className="px-6 py-4 font-bold text-foreground">Regular $1,000 DCA</td>
                    <td className="px-6 py-4 font-mono">$240,000</td>
                    <td className="px-6 py-4 font-mono font-bold text-[var(--color-accent)]">$999,000</td>
                  </tr>
                  <tr className="bg-[rgba(5,150,105,0.05)] dark:bg-[rgba(5,150,105,0.1)]">
                    <td className="px-6 py-4 font-bold text-[#059669]">$1,000 DCA + 10% Annual Step-Up</td>
                    <td className="px-6 py-4 font-mono text-gray-800 dark:text-gray-200">$687,300</td>
                    <td className="px-6 py-4 font-mono font-bold text-[#059669]">$1.97 Million (Double!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 italic">
              *Notice how the Step-Up strategy literally doubles your final net worth, simply by increasing your contribution by a few thousand dollars each year as your salary grows.
            </p>
          </div>

          {/* How Question */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Set Up a Step-Up DCA</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Setting up a Step-Up DCA is incredibly easy on modern brokerage platforms. Here is the exact process:
            </p>
            
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Select "Top-Up" during setup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    When you start a new DCA on platforms like Fidelity, Vanguard, or Schwab, look for a checkbox that says "Step-Up DCA" or "Top-Up DCA". You usually cannot add a Step-Up to an already active regular DCA; you must start a new one.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Choose Flat Amount vs Percentage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    You must decide how it increases. <br/><br/>
                    <strong>Flat Amount:</strong> "Increase my DCA by $200 every year." <br/>
                    <strong>Percentage:</strong> "Increase my DCA by 10% every year." (Recommended, as it scales exponentially with your income).
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Set the "Maximum Cap" (Crucial Step)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    If you step-up $1k by 10% every year for 30 years, in year 30 your monthly deduction will be over $15,000! To prevent the DCA from draining your bank account later in life, you must set a <strong>Cap Amount</strong>. For example, "Step-up by 10% every year, but stop stepping-up once the monthly DCA reaches $5,000."
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(5,150,105,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Calculate Your Step-Up Wealth</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Don't take our word for it. Open the calculator, input your expected salary hike percentage, and see how much faster you will reach your goals.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/us/dca-calculator" className="inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Calculator className="w-5 h-5" /> Open Step-Up Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

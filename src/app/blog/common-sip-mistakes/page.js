import Link from 'next/link';
import { AlertOctagon, TrendingUp, ShieldAlert, Target, Scissors, RefreshCcw, Percent, Calculator } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "7 Common SIP Mistakes That Destroy Your Wealth (And How to Fix Them)",
  description: "Are you making these fatal SIP mistakes? Learn why stopping SIPs during a crash, over-diversifying, and ignoring expense ratios can cost you lakhs of rupees in lost returns.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/common-sip-mistakes',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "7 Common SIP Mistakes That Destroy Your Wealth (And How to Fix Them)",
  description: "Are you making these fatal SIP mistakes? Learn why stopping SIPs during a crash, over-diversifying, and ignoring expense ratios can cost you lakhs of rupees in lost returns.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/common-sip-mistakes',
};

export default function CommonSipMistakesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: '7 Common SIP Mistakes' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(153,27,27,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,27,27,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold mb-4 block">Wealth Protection</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                7 Fatal <span className="text-[#991B1B]">SIP Mistakes</span> You Must Avoid
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Starting a SIP is easy, but holding it correctly for 20 years is incredibly hard. Over 70% of retail investors sabotage their own returns by falling for these seven common psychological and mathematical traps.
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

          <div className="space-y-8">
            
            {/* Mistake 1 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#991B1B]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <AlertOctagon className="w-6 h-6 text-[#991B1B]" />
                1. Stopping SIPs During a Market Crash
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This is the deadliest mistake. When the market drops 20%, panic sets in and investors pause their SIPs, thinking they are "protecting" their cash.
              </p>
              <div className="bg-[rgba(153,27,27,0.02)] p-4 rounded-lg border border-[rgba(153,27,27,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> The entire mathematical foundation of a SIP is <em>Rupee Cost Averaging</em>. You are supposed to accumulate more units when the NAV is cheap. By stopping your SIP during a crash, you are literally refusing to buy items when they are on a 20% discount. 
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#C4993C]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-[#C4993C]" />
                2. Never Stepping-Up Your Contribution
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                You started a ₹10,000 SIP five years ago when your salary was ₹50,000. Today your salary is ₹1 Lakh, but your SIP is still ₹10,000.
              </p>
              <div className="bg-[rgba(196,153,60,0.05)] p-4 rounded-lg border border-[rgba(196,153,60,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> Inflation destroys purchasing power. If your investments don't scale with your income (the 50-30-20 rule), you will experience lifestyle creep today but face poverty in retirement. <strong>Fix:</strong> Use a <Link href="/blog/step-up-sip" className="text-[#1B3A5C] font-semibold underline">Step-Up SIP</Link> to automatically increase it by 10% every year.
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#991B1B]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <Scissors className="w-6 h-6 text-[#991B1B]" />
                3. Early Withdrawals for Non-Emergencies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Treating your mutual fund portfolio like a savings account to buy a new car, fund a vacation, or buy the latest iPhone.
              </p>
              <div className="bg-[rgba(153,27,27,0.02)] p-4 rounded-lg border border-[rgba(153,27,27,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> Compounding is heavily back-loaded. The majority of your wealth is generated in the last 5 years of a 20-year SIP. If you break the compounding chain in year 7 to buy a car, you reset the compounding clock back to zero.
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#1B3A5C]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <ShieldAlert className="w-6 h-6 text-[#1B3A5C]" />
                4. Over-Diversification (Owning 10+ Funds)
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                "Don't put all your eggs in one basket." Investors take this too far and start 10 different SIPs of ₹1,000 each across different AMCs.
              </p>
              <div className="bg-[rgba(27,58,92,0.02)] p-4 rounded-lg border border-[rgba(27,58,92,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> This creates <em>portfolio overlap</em>. Fund A, Fund B, and Fund C are probably all buying HDFC Bank and Reliance. You aren't diversifying; you're just paying management fees to 10 different managers for the exact same index. <strong>Fix:</strong> 2-3 funds (e.g. 1 Index Fund, 1 Mid-Cap, 1 Small-Cap) is more than enough.
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#991B1B]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <RefreshCcw className="w-6 h-6 text-[#991B1B]" />
                5. Chasing Past Returns (Fund Switching)
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Every year, you look at a website that shows "Top Performing Funds of 2025", stop your current SIP, and start a new one in the fund that returned 40% last year.
              </p>
              <div className="bg-[rgba(153,27,27,0.02)] p-4 rounded-lg border border-[rgba(153,27,27,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> Mean reversion guarantees that last year's top performer will likely underperform this year. You are systematically buying at the top. Furthermore, constant switching triggers massive Short-Term Capital Gains (STCG) taxes and exit loads.
              </div>
            </div>

            {/* Mistake 6 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#C4993C]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-[#C4993C]" />
                6. Blind Investing Without a Goal
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Investing without knowing <em>why</em> you are investing, or exactly how much corpus you need to retire.
              </p>
              <div className="bg-[rgba(196,153,60,0.05)] p-4 rounded-lg border border-[rgba(196,153,60,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> Without a target, you won't know when to shift your portfolio from risky Equities to safe Debt. Imagine accumulating ₹2 Crores for your daughter's education, but leaving it all in Small-Caps a month before her admission, only for a market crash to wipe out 40%. 
              </div>
            </div>

            {/* Mistake 7 */}
            <div className="glass-panel p-6 border-l-4 border-l-[#1B3A5C]">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                <Percent className="w-6 h-6 text-[#1B3A5C]" />
                7. Ignoring the "Regular" vs "Direct" Trap
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Buying mutual funds through a local bank agent or broker who sells you "Regular" plans instead of "Direct" plans.
              </p>
              <div className="bg-[rgba(27,58,92,0.02)] p-4 rounded-lg border border-[rgba(27,58,92,0.1)] text-sm text-gray-700 dark:text-gray-300">
                <strong>Why it's fatal:</strong> Regular plans have a higher expense ratio (often 1% to 1.5% higher) because that money is paid as a hidden commission to the agent. Over a 20-year period, a 1% higher expense ratio will easily eat away ₹15-20 Lakhs of your final wealth. Always use zero-commission direct platforms.
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Fix Mistake #6: Set a Target</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Stop investing blindly. Figure out exactly how much you need to invest per month to reach your financial goals using our Target Amount Calculator.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/target-amount-calculator" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Calculator className="w-5 h-5" /> Open Target Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

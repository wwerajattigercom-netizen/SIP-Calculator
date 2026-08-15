import Link from 'next/link';
import { ArrowRight, ArrowDownRight, ArrowUpRight, CheckCircle, ShieldAlert, Coins, Banknote, HelpCircle, TrendingUp, Briefcase, Calculator } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "SWP vs SIP: What's the Difference & Who Should Use Each?",
  description: "SIP builds your wealth during your working years. SWP pays you a monthly salary when you retire. Understand the critical differences, taxation rules, and strategies.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/swp-vs-sip',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "SWP vs SIP: What's the Difference & Who Should Use Each?",
  description: "SIP builds your wealth during your working years. SWP pays you a monthly salary when you retire. Understand the critical differences, taxation rules, and strategies.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/swp-vs-sip',
};

export default function SwpVsSipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'SWP vs SIP' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#059669] font-bold mb-4 block">Retirement Strategy</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                <span className="text-[#059669]">SWP</span> vs <span className="text-[var(--color-accent)]">SIP</span>: The Two Halves of Your Financial Life
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                SIP and SWP are two sides of the exact same coin. One builds your wealth over time, and the other pays you a monthly salary when you retire. If you want to retire comfortably, you must master both.
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

          {/* BLUF */}
          <div className="glass-panel p-6 border-l-4 border-l-[#059669] bg-[rgba(5,150,105,0.03)]">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#059669]" /> 
              The Core Difference in 10 Seconds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[var(--color-accent)] flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-5 h-5" /> SIP (Systematic Investment Plan)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">You put money <strong>INTO</strong> a mutual fund every month.</p>
                <p className="text-xs text-gray-500 mt-2"><strong>Phase:</strong> Working years (Age 25-60)</p>
              </div>
              <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[#059669] flex items-center gap-2 mb-2">
                  <ArrowDownRight className="w-5 h-5" /> SWP (Systematic Withdrawal Plan)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">You take money <strong>OUT OF</strong> a mutual fund every month.</p>
                <p className="text-xs text-gray-500 mt-2"><strong>Phase:</strong> Retirement years (Age 60+)</p>
              </div>
            </div>
          </div>

          {/* The Lifecycle Example */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">The Lifecycle of an Investor: A Case Study</h2>
            <p className="text-gray-600 dark:text-gray-400">To understand how these two strategies work together, let's look at the financial lifecycle of Rahul, a 30-year-old software engineer.</p>
            
            <div className="glass-panel p-0 overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)]">
              {/* Phase 1 */}
              <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800 relative bg-[rgba(27,58,92,0.02)]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Briefcase className="w-24 h-24 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-accent)] mb-2 relative z-10">Phase 1: The Wealth Creation Phase (Age 30 to 55)</h3>
                <p className="text-sm font-semibold text-gray-500 mb-4 relative z-10">Tool Used: SIP</p>
                <div className="space-y-3 text-gray-600 dark:text-gray-300 relative z-10">
                  <p>Rahul earns a monthly salary. He wants to retire at 55. He starts a <strong>SIP</strong> of ₹20,000 per month in a Nifty 50 Index Fund.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Monthly Cash Flow:</strong> -₹20,000 (Leaves his bank account)</li>
                    <li><strong>Duration:</strong> 25 years</li>
                    <li><strong>Total Invested:</strong> ₹60,00,000</li>
                    <li><strong>Final Corpus:</strong> ~₹3.8 Crores (assuming 12% CAGR)</li>
                  </ul>
                  <p className="font-semibold text-foreground mt-2">At age 55, Rahul stops his SIP. He now has a massive corpus of ₹3.8 Crores.</p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-6 md:p-8 relative bg-[rgba(5,150,105,0.02)]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Banknote className="w-24 h-24 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#059669] mb-2 relative z-10">Phase 2: The Income Generation Phase (Age 55+)</h3>
                <p className="text-sm font-semibold text-gray-500 mb-4 relative z-10">Tool Used: SWP</p>
                <div className="space-y-3 text-gray-600 dark:text-gray-300 relative z-10">
                  <p>Rahul has retired and his salary has stopped. To pay for his groceries, bills, and travel, he needs regular income. He starts an <strong>SWP</strong> on his ₹3.8 Crore corpus.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Monthly Cash Flow:</strong> +₹1,50,000 (Enters his bank account)</li>
                    <li><strong>Action:</strong> The mutual fund company automatically sells a tiny fraction of his units on the 1st of every month to generate exactly ₹1.5 Lakhs.</li>
                    <li><strong>The Magic:</strong> Because the remaining ₹3.65+ Crores is still invested and growing at 10-12%, his corpus likely continues to grow even while he withdraws money!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Taxation Deep Dive */}
          <div className="glass-panel p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl font-bold text-foreground mb-4">Taxation: Why SWP Crushes Fixed Deposits (FDs)</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Historically, retirees in India moved their entire retirement corpus into a Fixed Deposit (FD) to earn monthly interest. This is a massive tax trap. Here is why SWP is mathematically superior.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(153,27,27,0.05)] border border-[rgba(153,27,27,0.2)] p-5 rounded-xl">
                <h3 className="font-bold text-[#991B1B] mb-3">The FD Tax Trap</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Interest earned from a Fixed Deposit is added directly to your taxable income.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If you earn ₹12 Lakhs a year in FD interest, you will be taxed according to your income tax slab. This means you could lose up to <strong>30%</strong> of your income just to taxes every year.
                </p>
              </div>
              
              <div className="bg-[rgba(5,150,105,0.05)] border border-[rgba(5,150,105,0.2)] p-5 rounded-xl">
                <h3 className="font-bold text-[#059669] mb-3">The SWP Tax Shield</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  When you withdraw via SWP, you are withdrawing both your principal <em>and</em> your profit. <strong>Principal is never taxed!</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You only pay Long Term Capital Gains (LTCG) tax of 12.5% on the profit portion of the withdrawal. Furthermore, the first ₹1.25 Lakhs of equity gains every year are completely tax-free in India.
                </p>
              </div>
            </div>
          </div>

          {/* Sequence of Returns Risk */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Advanced Concept: Sequence of Returns Risk</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              While SIPs use market volatility to your advantage (you buy more units when the market crashes), SWPs have a hidden danger known as the <strong>Sequence of Returns Risk</strong>.
            </p>
            
            <div className="bg-[rgba(196,153,60,0.1)] border-l-4 border-[#C4993C] p-5 mb-4">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                If the stock market crashes by 30% exactly in the year you retire, and you continue to withdraw a fixed high amount via SWP, you will permanently deplete your corpus by selling a massive number of units at bottom-of-the-barrel prices.
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">How to mitigate this:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
              <li><strong>The Bucket Strategy:</strong> Keep 3 years of expenses in safe Debt/Liquid funds. Keep the rest in Equity. Run your SWP from the Debt fund.</li>
              <li><strong>The 4% Rule:</strong> Never set your initial SWP withdrawal rate to more than 4-5% of your total corpus per year.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(5,150,105,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Simulate Your Strategy</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Stop reading and start calculating. Use our interactive simulators to see exactly how much you can withdraw safely in retirement, or how much you need to invest today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/swp-calculator" className="inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <TrendingUp className="w-5 h-5" /> Open SWP Calculator
              </Link>
              <Link href="/" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                <Calculator className="w-5 h-5" /> Open SIP Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

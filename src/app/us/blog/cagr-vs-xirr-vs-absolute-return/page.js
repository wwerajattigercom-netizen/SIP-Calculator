import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, HelpCircle, BarChart3, Calculator, Calendar } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "CAGR vs XIRR vs Absolute Return | The Ultimate Guide",
  description: "Stop getting confused by mutual fund returns. Learn exactly when to use CAGR (Lumpsum), XIRR (DCA), and Absolute Return to measure your true wealth growth.",
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/cagr-vs-xirr-vs-absolute-return',
  }
};

const COMPARISON = [
  {
    metric: 'Absolute Return',
    formula: '(Final Value − Initial Value) ÷ Initial Value × 100',
    useFor: 'Quick check — how much profit did I make in total?',
    bestFor: 'Short-term lumpsum investments (<1 year) or simple P&L checks.',
    limitation: 'Ignores time entirely. Making 50% in 1 year looks mathematically identical to making 50% in 10 years, which is highly misleading.',
    example: 'You invest $100,000 and it becomes $150,000. Your absolute return is exactly 50%.',
    color: 'text-[var(--color-returns)]',
    border: 'border-emerald-400/20 bg-emerald-500/5',
  },
  {
    metric: 'CAGR (Compound Annual Growth Rate)',
    formula: '[(Final Value ÷ Initial Value) ^ (1 ÷ Years)] − 1',
    useFor: 'Annualised return for a single, one-time lump sum investment.',
    bestFor: 'Comparing the historical performance of two mutual funds over 3, 5, or 10 years.',
    limitation: 'Cannot handle multiple investments at different times (like a DCA). Assumes you invested once and never added or withdrew money.',
    example: 'You invest $100,000 once. After 5 years, it is $201,135. Your CAGR is exactly 15% p.a.',
    color: 'text-[var(--color-accent)]',
    border: 'border-blue-400/20 bg-blue-500/5',
  },
  {
    metric: 'XIRR (Extended Internal Rate of Return)',
    formula: 'Iterative calculation (IRR) mapping irregular cash flows to specific dates.',
    useFor: 'The true annualised return for DCAs, partial withdrawals, or any irregular investing.',
    bestFor: 'Tracking your actual portfolio performance on apps like your brokerage platform.',
    limitation: 'Requires complex computation (Excel, Google Sheets, or our calculators) — impossible to do manually.',
    example: 'You invest $1,000 every month for 5 years. Total invested is $60,000. Current value is $82,486. Your XIRR is ~12.5% p.a.',
    color: 'text-[#C4993C]',
    border: 'border-amber-400/20 bg-amber-500/5',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CAGR vs XIRR vs Absolute Return — Complete Guide for Global Investors',
  description: 'Understand the difference between CAGR, XIRR, and Absolute Return. Which metric should you use for DCAs vs Lumpsum? A deep-dive guide with examples.',
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/us/blog/cagr-vs-xirr-vs-absolute-return',
};

export default function CAGRvsXIRRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">

          <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'CAGR vs XIRR vs Absolute Return' }]} />

          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#C4993C] font-bold mb-4 block">Return Metrics Masterclass</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                <span className="text-[var(--color-accent)]">CAGR</span> vs <span className="text-[#C4993C]">XIRR</span> vs <span className="text-[var(--color-returns)]">Absolute Return</span>: Which Should You Trust?
              </h1>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                When you open your mutual fund portfolio on platforms like Vanguard, Fidelity, or Charles Schwab, you are bombarded with different percentage numbers. Which one actually represents how much money you made? This guide demystifies financial jargon and shows you exactly how to measure your wealth. Navigating the world of investment metrics can be incredibly daunting, especially for those just starting to build their retirement portfolios. The difference between looking at a 15% Absolute Return and a 10% CAGR could mean the difference between thinking you are on track for a comfortable retirement and realizing you might come up short. Many investors falsely assume that any positive percentage is a good sign, without understanding the time value of money. Over decades of investing through Dollar Cost Averaging (DCA) into your 401(k) or brokerage accounts, the compounding effect makes it absolutely critical to measure performance accurately. By the end of this guide, you will have a crystal-clear understanding of when to use CAGR, when XIRR is your best friend, and why Absolute Return should be used sparingly. You will learn to see past the marketing fluff used by mutual funds and focus on the metrics that dictate the true trajectory of your financial freedom. To build a multi-million dollar portfolio, you must first speak the language of wealth.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Founder, StepupCalculator · 5 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLUF (Bottom Line Up Front) */}
          <div className="glass-panel p-6 border-l-4 border-l-[var(--color-accent)] bg-[rgba(27,58,92,0.02)]">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" /> 
              The 30-Second Summary (TL;DR)
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-2 flex-shrink-0" />
                <span><strong className="text-[var(--color-returns)]">Absolute Return:</strong> Shows raw profit percentage. Use it for investments held for <strong>less than 1 year</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                <span><strong className="text-[var(--color-accent)]">CAGR (Compound Annual Growth Rate):</strong> The standard for comparing funds. Use it ONLY for <strong>one-time lumpsum investments</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C4993C] mt-2 flex-shrink-0" />
                <span><strong className="text-[#C4993C]">XIRR (Extended Internal Rate of Return):</strong> The true metric for your portfolio. Use it for <strong>DCAs (Systematic Investment Plans)</strong> and irregular investments.</span>
              </li>
            </ul>
          </div>

          {/* Deep comparison cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Deep Dive: Understanding Each Metric</h2>
            <p className="text-gray-600 dark:text-gray-400">Let's break down how the math works and why using the wrong metric can trick you into making terrible financial decisions.</p>
            
            {COMPARISON.map(({ metric, formula, useFor, bestFor, limitation, example, color, border }) => (
              <div key={metric} className={`glass-panel p-6 border ${border} rounded-2xl`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${color}`}>
                  {metric.includes('CAGR') ? <TrendingUp className="w-6 h-6" /> : metric.includes('XIRR') ? <Calendar className="w-6 h-6" /> : <BarChart3 className="w-6 h-6" />}
                  {metric}
                </h3>
                
                <div className="bg-white/50 dark:bg-black/20 rounded-xl px-4 py-3 font-mono text-sm text-gray-800 dark:text-gray-200 mb-5 border border-black/5 dark:border-white/5 shadow-inner overflow-x-auto">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider block mb-1">Mathematical Formula:</span>
                  {formula}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">What is it used for?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{useFor}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">When is it best?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{bestFor}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-loss)] mb-1">The Critical Flaw</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{limitation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Real-World Example</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why CAGR can't be used for DCA */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why CAGR Fails Miserably for DCAs</h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-6 leading-relaxed">
              The most common mistake amateur investors make is comparing the XIRR of their 2-year old DCA against the 10-year CAGR of a mutual fund shown on Google. This is like comparing your marathon pace to a sprinter's 100m dash.
            </p>
            
            <div className="bg-[rgba(27,58,92,0.05)] border-l-4 border-[#1B3A5C] p-5 rounded-r-xl mb-6">
              <h3 className="font-bold text-[var(--color-accent)] dark:text-white mb-2">The Timing Problem</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">
                CAGR assumes your entire capital was invested on Day 1. But in a DCA, you invest in monthly tranches. 
                If you run a 5-year DCA, your very first $1,000 instalment compounds for a full 60 months. However, your <em>last</em> $1,000 instalment only compounds for 1 month!
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">
              Because a large portion of your DCA capital spends very little time in the market, calculating a raw CAGR on the final amount will make your returns look artificially terrible. <strong>XIRR fixes this</strong> by applying a separate CAGR calculation to every single monthly instalment based on exactly how many days it stayed in the market.
            </p>
          </div>

          {/* Brokerage platform context */}
          <div className="glass-panel p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl font-bold text-foreground mb-4">What Do Brokers Platforms Show?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C4993C]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C4993C] font-bold">XIRR</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Your Personal Dashboard = XIRR</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    When you look at your own portfolio dashboard, the annualised return percentage shown is almost always XIRR. This is because you likely have a mix of DCAs, lump sums, and partial withdrawals. Only XIRR can handle this messy reality.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">CAGR</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Fund Factsheets = CAGR</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    When you are researching a mutual fund (e.g., looking at "Parag Parikh Flexi Cap 5-Year Return"), the platform displays CAGR. They do this to standardize comparisons, assuming a hypothetical investor who put in a lumpsum 5 years ago and did nothing else.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass-panel p-5 border border-amber-400/20 bg-amber-50 dark:bg-amber-900/10">
            <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-amber-700 dark:text-amber-500">Wealth Warning:</strong> Metrics are backward-looking. A fund with a 25% 3-year CAGR will likely regress to the mean. Do not chase historical returns without understanding the fund's strategy.
                <Link href="/us/disclaimer" className="text-[var(--color-accent)] hover:underline ml-1">Read our full disclaimer →</Link>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Calculate True Returns on Your Portfolio</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Stop guessing your actual wealth growth. Use our free advanced calculators to measure exact CAGR and project future DCA wealth.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/us/cagr-calculator" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <TrendingUp className="w-5 h-5" /> Calculate CAGR
              </Link>
              <Link href="/us/dca-calculator" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                <Calculator className="w-5 h-5" /> Calculate DCA Future Value
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { ChevronDown, Info, ShieldCheck, TrendingUp, DollarSign, PieChart, Layers, RefreshCw, BarChart3, AlertCircle } from 'lucide-react';

export default function HowToBuildThreeFundPortfolio() {
  const breadcrumbs = [
    { label: 'Blog', href: '/us/blog' },
    { label: 'How to Build a 3-Fund Portfolio' },
  ];

  const faqs = [
    {
      question: "What exactly is the Bogleheads 3-Fund Portfolio?",
      answer: "The Bogleheads 3-Fund Portfolio is a beautifully simple, low-cost investment strategy championed by John Bogle, founder of Vanguard. It consists of just three broad-market index funds: a Total US Stock Market Index Fund, a Total International Stock Market Index Fund, and a Total US Bond Market Index Fund."
    },
    {
      question: "How do I determine my asset allocation by age?",
      answer: "A common rule of thumb is the '120 minus age' rule. For example, if you are 30 years old, you subtract 30 from 120, which equals 90. This means you should allocate 90% of your portfolio to stocks (US and International combined) and the remaining 10% to bonds. Adjust this based on your personal risk tolerance."
    },
    {
      question: "Should I place my bonds in a Taxable or Tax-Advantaged account?",
      answer: "Bonds generate regular interest payments, which are taxed at your ordinary income tax rate. Therefore, it is highly tax-efficient to place your bond funds inside tax-advantaged accounts like a Traditional 401(k) or Traditional IRA. Keep your highly tax-efficient stock index funds in your taxable brokerage accounts."
    },
    {
      question: "How often should I rebalance my 3-Fund Portfolio?",
      answer: "Most investors rebalance their portfolio once a year, or whenever their target asset allocation drifts by more than 5%. Rebalancing forces you to sell high-performing assets and buy underperforming ones, keeping your risk profile exactly where it belongs."
    },
    {
      question: "Do I really need international stocks in my portfolio?",
      answer: "While US stocks have outperformed international stocks in recent decades, historically there have been prolonged periods where international stocks outperformed the US market. Holding international stocks provides critical global diversification and reduces your reliance on a single country's economy."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbs} />
      
      <article>
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] dark:text-white mb-4 leading-tight">
            How to Build a 3-Fund Portfolio: The Ultimate Bogleheads Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the beauty of simplicity. Learn how to construct a robust, tax-efficient, low-cost investment portfolio using just three broad-market index funds to secure your financial independence.
          </p>
        </header>

        {/* Intro */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Wall Street wants you to believe that investing is impossibly complex. They design exotic financial products, actively managed mutual funds, and intricate trading strategies, all designed to justify charging you exorbitant fees. But what if the absolute best strategy for long-term wealth accumulation was also the simplest?
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Enter the <strong>Bogleheads 3-Fund Portfolio</strong>. Championed by the late John Bogle, founder of Vanguard and pioneer of the index fund, this strategy proves that you do not need to beat the market; you just need to own the market. By holding just three widely diversified index funds, you capture global economic growth while paying virtually nothing in fees.
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            This comprehensive guide will break down the mechanics of the 3-Fund Portfolio. We will explore exactly which assets to hold, how to determine your asset allocation based on your age, how to place your funds for maximum tax efficiency, and how to maintain your portfolio through automated rebalancing. Let&apos;s build a portfolio that guarantees you your fair share of market returns.
          </p>
        </section>

        {/* The Three Funds */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <PieChart className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">The Core Anatomy: What is the 3-Fund Portfolio?</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            The brilliance of this portfolio lies in its unparalleled diversification. With just three mutual funds (or ETFs), you effectively own a slice of every publicly traded company in the world, backed by the stability of the US government and corporate bond market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">1. Total US Stock Market</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                This fund tracks the entire US equity market, holding thousands of large, mid, and small-cap American companies. It is the engine of your portfolio&apos;s growth, historically delivering <span className="text-[#059669] font-semibold">10% annualized returns</span> over the long haul.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-xs border border-gray-200 dark:border-gray-700">
                <strong>Examples:</strong> VTSAX (Mutual Fund) or VTI (ETF)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">2. Total International Stock</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                This fund provides exposure to developed and emerging markets outside the US (Europe, Asia, etc.). It acts as a critical diversifier, ensuring that if the US economy underperforms for a decade, your global assets can pick up the slack.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-xs border border-gray-200 dark:border-gray-700">
                <strong>Examples:</strong> VTIAX (Mutual Fund) or VXUS (ETF)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">3. Total US Bond Market</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                The shock absorber of your portfolio. Comprising US Treasury bonds and high-quality corporate bonds, this fund provides steady interest income and prevents your portfolio from suffering catastrophic <span className="text-[#991B1B] font-semibold">losses</span> during brutal stock market crashes.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-xs border border-gray-200 dark:border-gray-700">
                <strong>Examples:</strong> VBTLX (Mutual Fund) or BND (ETF)
              </div>
            </div>
          </div>
        </section>

        {/* Asset Allocation by Age */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Asset Allocation by Age</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Now that you know <em>what</em> to buy, the next crucial step is determining <em>how much</em> of each to hold. Your asset allocation defines your risk profile. A 25-year-old with decades until retirement can afford massive stock market volatility, whereas a 65-year-old retiree needs the safety of bonds to preserve their wealth.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-6">
            <h4 className="font-semibold flex items-center gap-2 text-blue-800 dark:text-blue-400 mb-2">
              <Info className="w-5 h-5" />
              The &quot;120 Minus Age&quot; Rule
            </h4>
            <p className="text-blue-900/80 dark:text-blue-200/80 text-sm leading-relaxed">
              A modern adaptation of classic allocation theory states that you should subtract your age from 120 to find your target stock percentage. If you are 40 years old: 120 - 40 = 80. Therefore, hold 80% in stocks (split between US and International) and 20% in bonds.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-4">Common Allocation Profiles:</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Aggressive (Age 20-35):</strong> 90% Stocks (60% US / 30% Int) / 10% Bonds. Expect massive growth, but endure <span className="text-[#991B1B]">deep 40%+ drawdowns</span> during recessions.</li>
            <li><strong>Moderate (Age 35-50):</strong> 75% Stocks (50% US / 25% Int) / 25% Bonds. A balanced approach offering solid growth with decent downside protection.</li>
            <li><strong>Conservative (Age 50+ / Retirees):</strong> 50% Stocks / 50% Bonds. Focuses heavily on capital preservation and steady income generation.</li>
          </ul>
        </section>

        {/* Tax Efficiency */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#059669] dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Tax Efficiency &amp; Asset Placement</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Where you place your three funds is almost as important as owning them. Different funds generate different types of taxes, and the US tax code treats different accounts (401k, Roth IRA, Taxable Brokerage) differently. Proper asset placement can save you hundreds of thousands of dollars over a lifetime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#1B3A5C] dark:text-[#3B82F6] mb-3">Bond Funds (Tax-Advantaged)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Bonds pay regular interest dividends, which are taxed unfavorably at your ordinary income tax rate. To shield these payouts from the IRS, always try to place your <strong>Total Bond Market Fund</strong> inside tax-advantaged accounts like a <strong>Traditional 401(k)</strong> or <strong>Traditional IRA</strong>.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#059669] mb-3">Stock Funds (Taxable &amp; Roth)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Broad-market stock index funds are highly tax-efficient. They generate qualified dividends and long-term capital gains, which are taxed at lower rates. They are perfect for <strong>Taxable Brokerage Accounts</strong>. Additionally, place your highest-growth assets (US Stocks) in your <strong>Roth IRA</strong> for 100% tax-free growth.
              </p>
            </div>
          </div>
        </section>

        {/* Rebalancing */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <RefreshCw className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">The Art of Rebalancing</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Over time, market movements will skew your portfolio. If stocks undergo a massive multi-year bull run, your 80/20 allocation might drift into a 90/10 allocation, making you far more vulnerable to a market crash. Rebalancing fixes this.
          </p>

          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed font-semibold">
            To rebalance efficiently without triggering taxable events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Use New Contributions:</strong> Direct your monthly DCA (Dollar Cost Averaging) deposits exclusively into the underperforming asset class until the original balance is restored.</li>
            <li><strong>Reinvest Dividends Manually:</strong> Turn off automatic dividend reinvestment and manually use the accumulated cash to buy whichever fund is currently trailing its target percentage.</li>
            <li><strong>Rebalance Inside Tax-Advantaged Accounts:</strong> If you must sell an outperforming asset to buy an underperforming one, do it inside your 401(k) or IRA. Buying and selling within these accounts generates zero immediate tax liability.</li>
          </ul>
        </section>

        {/* Conclusion / Summary */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-4">Final Thoughts: The Ultimate Edge</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            The Bogleheads 3-Fund Portfolio is the antithesis of modern, hyper-active Wall Street trading. It is boring, and that is precisely why it works. By relentlessly driving down fees to near zero, maintaining broad global diversification, and sticking to your chosen asset allocation through thick and thin, you mathematically guarantee that you will capture the entire market&apos;s return.
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Investing does not require a finance degree or a 10-screen trading desk. It requires discipline, consistent savings, and the wisdom to realize that when it comes to investing, simplicity is the ultimate sophistication. Set up your three funds, automate your contributions, and go enjoy your life.
          </p>
        </section>

        
        {/* Calculator CTA */}
        <section className="max-w-6xl w-full mx-auto mt-12 mb-12">
          <div className="glass-panel p-8 rounded-3xl bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent border border-[rgba(27,58,92,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Run the Numbers Yourself</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ready to see how compounding works in real life? Use our free calculators to project your wealth, account for inflation, and plan your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/us/dca-calculator" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[#152e4d] transition-all shadow-md text-center">
                DCA Calculator
              </Link>
              <Link href="/us/lumpsum-calculator" className="px-6 py-3 bg-white dark:bg-gray-800 text-[var(--color-accent)] font-semibold rounded-xl border border-[var(--color-accent)] hover:bg-gray-50 transition-all text-center">
                Lumpsum Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 w-full glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-2 rounded-xl">
              <AlertCircle className="w-5 h-5 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:-rotate-180 flex-shrink-0" />
                </summary>
                <div className="p-5 sm:p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 mt-2">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </section>

      </article>
    </main>
  );
}

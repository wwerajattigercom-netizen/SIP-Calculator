"use client";

import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { ChevronDown, AlertTriangle, TrendingUp, ShieldCheck, PieChart, Layers, RefreshCw, BarChart3, AlertCircle, Target } from 'lucide-react';

export default function HowToBuildMutualFundPortfolio() {
  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: 'How to Build a Mutual Fund Portfolio' },
  ];

  const faqs = [
    {
      question: "How many mutual funds should I own?",
      answer: "Ideally, a well-diversified portfolio requires only 3 to 5 mutual funds. Holding more than 5 often leads to fund overlap, where multiple funds own the same underlying stocks, offering no extra diversification but increasing your overall expense ratio and complexity."
    },
    {
      question: "What is the Core and Satellite strategy?",
      answer: "The Core and Satellite strategy involves building a strong, stable foundation (the 'Core') using broad-market index funds or flexi-cap funds, representing 60-70% of your portfolio. The remaining 30-40% (the 'Satellite') is allocated to higher-risk, higher-reward funds like small-cap, mid-cap, or sectoral funds to boost overall returns."
    },
    {
      question: "How frequently should I rebalance my mutual fund portfolio?",
      answer: "It is generally recommended to review and rebalance your portfolio once a year, or when your asset allocation deviates by more than 5-10% from your target. Frequent rebalancing can lead to unnecessary exit loads and short-term capital gains tax."
    },
    {
      question: "How do I avoid mutual fund overlap?",
      answer: "To avoid mutual fund overlap, do not invest in multiple funds of the same category (e.g., holding three different Large Cap funds). Use free online portfolio overlap tools to check if your chosen funds share a high percentage of the same underlying stocks."
    },
    {
      question: "Is it better to invest via SIP or lumpsum?",
      answer: "For equity mutual funds, Systematic Investment Plans (SIPs) are usually preferred as they average out market volatility (Rupee Cost Averaging) and instill financial discipline. Lumpsum investments are better suited for debt funds or when the equity market has seen a significant crash."
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
            How to Build a Winning Mutual Fund Portfolio in India
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the Core &amp; Satellite strategy, avoid the trap of over-diversification, and learn exactly how to balance risk and reward for long-term wealth creation.
          </p>
        </header>

        {/* Intro */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Investing in mutual funds is one of the most effective ways for retail investors in India to build immense wealth over time. However, a common mistake many beginners make is mindlessly collecting mutual funds like trading cards. They end up with 15 different funds in their portfolio, assuming that more funds mean better diversification and higher safety.
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            In reality, excessive diversification (often called &quot;diworsification&quot;) merely dilutes your returns while making your portfolio incredibly difficult to track and manage. Building a successful mutual fund portfolio requires a structured, intentional approach. 
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            This comprehensive guide will walk you through the renowned <strong>Core &amp; Satellite Strategy</strong>, explain how to achieve optimal asset allocation, teach you how to avoid costly fund overlap, and provide actionable rebalancing techniques to keep your financial goals on track. Let&apos;s dive deep into constructing a portfolio that is robust enough to withstand market crashes and agile enough to beat inflation.
          </p>
        </section>

        {/* Asset Allocation */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <PieChart className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">The Foundation: Asset Allocation</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Before selecting specific mutual funds, you must decide your asset allocation—the mix of equity (stocks) and debt (bonds/fixed income) in your portfolio. Asset allocation is the primary driver of your portfolio&apos;s overall risk and return. It dictates how your investments will behave during extreme market volatility.
          </p>

          <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-4">Equity vs. Debt: Finding the Balance</h3>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <TrendingUp className="w-6 h-6 text-[#059669] flex-shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] dark:text-white">Equity Funds:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">These funds invest in shares of companies. They offer <span className="text-[#059669] font-semibold">high potential returns (12-15% historically)</span> but come with high short-term volatility. Equity is essential for beating inflation over periods longer than 5-7 years.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1B3A5C] flex-shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] dark:text-white">Debt Funds:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">These funds invest in government bonds, corporate debentures, and money market instruments. They provide stability and predictable, steady returns (typically 6-8%), acting as a cushion when the stock market faces a severe downturn.</p>
              </div>
            </li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5">
            <h4 className="font-semibold flex items-center gap-2 text-yellow-800 dark:text-yellow-400 mb-2">
              <Target className="w-5 h-5" />
              The &quot;100 Minus Age&quot; Rule
            </h4>
            <p className="text-yellow-900/80 dark:text-yellow-200/80 text-sm leading-relaxed">
              A popular rule of thumb for asset allocation is to subtract your age from 100 to determine your equity exposure percentage. If you are 30 years old, 100 - 30 = 70. This implies you should allocate 70% of your portfolio to equity mutual funds and 30% to debt. While this is a useful starting point, always adjust it based on your actual risk tolerance and the time horizon of your financial goals.
            </p>
          </div>
        </section>

        {/* Core and Satellite */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <Layers className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">The Core &amp; Satellite Strategy</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            The Core and Satellite strategy is an institutional-grade portfolio design that blends stability with the opportunity for alpha (market-beating returns). It structurally divides your mutual fund investments into two distinct compartments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1B3A5C] dark:text-[#3B82F6] mb-3">The Core (60% - 70%)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                The Core constitutes the bulk of your portfolio. Its primary objective is consistent, steady growth with lower volatility. This section should be boring, reliable, and heavily diversified across top companies.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Index Funds:</strong> Nifty 50 or Sensex funds that passively mirror the market. Extremely low cost and historically reliable.</li>
                <li><strong>Flexi-Cap Funds:</strong> Actively managed funds that can dynamically invest across large, mid, and small-cap companies based on the fund manager&apos;s discretion.</li>
                <li><strong>Large-Cap Funds:</strong> Funds investing strictly in the top 100 companies in India, ensuring high stability.</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#059669] mb-3">The Satellite (30% - 40%)</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                The Satellite is designed to boost overall portfolio returns by taking on calculated, higher risks. It requires a slightly more aggressive mindset and a longer holding period to ride out severe volatility.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Mid-Cap Funds:</strong> Companies ranked 101-250. Higher growth potential than large caps, with moderate risk.</li>
                <li><strong>Small-Cap Funds:</strong> Companies ranked 251 and beyond. Can generate <span className="text-[#059669] font-bold">explosive returns</span>, but also susceptible to <span className="text-[#991B1B] font-bold">deep losses</span> during downturns.</li>
                <li><strong>Sectoral/Thematic Funds:</strong> Funds focused on specific industries (e.g., IT, Pharma, Infrastructure). High risk, high reward.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fund Overlap */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-[#991B1B] dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Avoiding the Trap of Fund Overlap</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            One of the most dangerous illusions in investing is believing that buying 10 different mutual funds gives you superior diversification. If you buy three different Large-Cap equity funds (e.g., an SBI Large Cap, an HDFC Large Cap, and an ICICI Large Cap), you are likely buying the exact same underlying stocks—Reliance, HDFC Bank, Infosys, TCS, etc.
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            This phenomenon is known as <strong>Mutual Fund Overlap</strong>. When your funds overlap significantly (e.g., above 30-40%), you are not reducing risk; you are merely duplicating your holdings, cluttering your portfolio, and paying multiple fund managers to do the exact same job, thereby increasing your total expense ratio.
          </p>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-4 font-semibold text-gray-900 dark:text-white">The Cluttered Portfolio (Poor)</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-white">The Optimized Portfolio (Excellent)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">1. Nifty 50 Index Fund<br/>2. Active Large Cap Fund<br/>3. Bluechip Fund<br/><span className="text-[#991B1B] text-xs font-semibold">*Massive overlap, same stocks</span></td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">1. Nifty 50 Index Fund (Core)<br/><br/><span className="text-[#059669] text-xs font-semibold">*Clean, efficient, low cost</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">4. Flexi Cap Fund A<br/>5. Flexi Cap Fund B<br/><span className="text-[#991B1B] text-xs font-semibold">*Redundant strategies</span></td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">2. Parag Parikh Flexi Cap Fund (Core)<br/><span className="text-[#059669] text-xs font-semibold">*Global exposure + flexible strategy</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-300">6. Mid Cap Fund<br/>7. Small Cap Fund A<br/>8. Small Cap Fund B</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">3. High-Quality Mid Cap Fund (Satellite)<br/>4. High-Quality Small Cap Fund (Satellite)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            The Golden Rule: You rarely need more than 3 to 5 mutual funds to build a perfectly diversified portfolio.
          </p>
        </section>

        {/* Rebalancing */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <RefreshCw className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Portfolio Rebalancing</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Asset allocation is not a &quot;set it and forget it&quot; exercise. As markets move, your portfolio&apos;s weights will drift. For example, if you start with a 70% Equity and 30% Debt allocation, a massive bull run in the stock market might push your equity portion up to 85%. Suddenly, your portfolio is far riskier than you originally intended. If a crash happens, you will experience severe <span className="text-[#991B1B] font-bold">drawdowns and losses</span>.
          </p>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Rebalancing is the process of realigning your portfolio back to its target asset allocation. It inherently forces you to follow the golden rule of investing: &quot;Buy Low, Sell High.&quot;
          </p>

          <h3 className="text-xl font-semibold text-[#1F2937] dark:text-white mb-4">How to Rebalance effectively:</h3>
          <ol className="list-decimal list-outside ml-6 space-y-4 text-gray-700 dark:text-gray-300">
            <li><strong>Time-Based Rebalancing:</strong> Check your portfolio once a year (e.g., every April). If the allocation has drifted by more than 5%, shift funds. Sell the outperforming asset and buy the underperforming asset.</li>
            <li><strong>Threshold-Based Rebalancing:</strong> Ignore the calendar. Only rebalance when an asset class deviates by a specific threshold, say 10%. If equity hits 80% (target 70%), you sell 10% equity and move it to debt.</li>
            <li><strong>Cash Flow Rebalancing:</strong> Instead of selling assets (which triggers capital gains tax), simply direct all your new monthly SIPs into the underperforming asset class until the target balance is restored.</li>
          </ol>
        </section>

        {/* Historical Scenarios */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-[#1B3A5C] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white">Historical Return Scenarios &amp; Risk Profiles</h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            Understanding how different portfolios have performed historically helps set realistic expectations. Here is a breakdown of typical portfolio structures and their theoretical behavior based on historical Indian market data over 10+ year horizons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conservative */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">Conservative</h3>
              <p className="text-sm text-gray-500 mb-4">40% Equity / 60% Debt</p>
              <ul className="text-sm space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                <li>• Highly stable</li>
                <li>• Ideal for retirees</li>
                <li>• Protects capital</li>
              </ul>
              <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Expected Return:</span>
                  <span className="font-bold text-[#059669]">8% - 10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Max Drawdown:</span>
                  <span className="font-bold text-[#991B1B]">-10% to -15%</span>
                </div>
              </div>
            </div>

            {/* Balanced */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 ring-2 ring-[#1B3A5C] dark:ring-[#3B82F6] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1B3A5C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">Balanced (Growth)</h3>
              <p className="text-sm text-gray-500 mb-4">70% Equity / 30% Debt</p>
              <ul className="text-sm space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                <li>• Best for wealth creation</li>
                <li>• Moderate volatility</li>
                <li>• Ideal for 30s - 40s</li>
              </ul>
              <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Expected Return:</span>
                  <span className="font-bold text-[#059669]">10% - 12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Max Drawdown:</span>
                  <span className="font-bold text-[#991B1B]">-20% to -25%</span>
                </div>
              </div>
            </div>

            {/* Aggressive */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-2">Aggressive</h3>
              <p className="text-sm text-gray-500 mb-4">90% Equity / 10% Debt</p>
              <ul className="text-sm space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                <li>• Extreme wealth focus</li>
                <li>• High volatility</li>
                <li>• Ideal for 20s (15+ yrs)</li>
              </ul>
              <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Expected Return:</span>
                  <span className="font-bold text-[#059669]">12% - 15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Max Drawdown:</span>
                  <span className="font-bold text-[#991B1B]">-30% to -40%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion / Summary */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-4">Final Thoughts</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Building a mutual fund portfolio does not need to be an overwhelmingly complex task. By adhering to the Core and Satellite strategy, you ensure that the bulk of your hard-earned money grows steadily via broad-market index funds, while a smaller portion aggressively chases higher yields in the mid and small-cap segments.
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            Remember to keep your fund count low (3 to 5 funds max) to prevent overlapping portfolios and inflated expenses. Establish a strict asset allocation based on your goals and risk tolerance, and rebalance methodically to lock in profits and buy into underperforming assets at a discount. Discipline, patience, and simplicity are the true secrets to massive long-term wealth creation.
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
              <Link href="/" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[#152e4d] transition-all shadow-md text-center">
                Step-Up SIP Calculator
              </Link>
              <Link href="/lumpsum-calculator" className="px-6 py-3 bg-white dark:bg-gray-800 text-[var(--color-accent)] font-semibold rounded-xl border border-[var(--color-accent)] hover:bg-gray-50 transition-all text-center">
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

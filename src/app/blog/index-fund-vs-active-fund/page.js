"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, BarChart2, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function IndexVsActiveIndia() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Are index funds risk-free in India?",
      answer: "No, index funds are not risk-free. They are subject to market risks just like any equity mutual fund. If the NIFTY 50 drops by 10%, an index fund tracking it will also drop by approximately 10%. However, they eliminate 'fund manager risk' (the risk of a human making bad stock picks)."
    },
    {
      question: "Why do actively managed funds charge higher expense ratios?",
      answer: "Actively managed funds have higher expense ratios (often 1.0% to 2.0% for regular plans) because you are paying for the fund management team, their research analysts, trading costs, and sometimes distributor commissions. Index funds run on autopilot, simply copying an index, resulting in fees as low as 0.1%."
    },
    {
      question: "Is it true that active funds beat the market in Indian mid and small-cap segments?",
      answer: "Historically, yes. In less efficient markets like Indian mid-cap and small-cap segments, skilled fund managers have historically been able to find undervalued stocks and generate 'alpha' (excess returns over the index). However, this gap is closing as markets mature and information becomes more widely available."
    },
    {
      question: "What is the SPIVA India scorecard?",
      answer: "The SPIVA (S&P Indices Versus Active) scorecard is a semi-annual research report that compares the performance of actively managed mutual funds against their respective benchmark indices. Recent reports have shown that over a 5-year and 10-year horizon, a large majority of Indian large-cap active funds fail to beat the benchmark."
    },
    {
      question: "Should a beginner choose an index fund or an active fund?",
      answer: "For most beginners, a NIFTY 50 Index Fund is highly recommended. It offers instant diversification across India's top 50 companies, operates with very low costs, and requires zero monitoring of fund manager performance. It is a simple, 'buy and forget' wealth creation tool."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] py-10">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb (Visual) */}
        <nav className="text-sm mb-6 text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-foreground">Home</Link> &gt;{' '}
          <Link href="/blog" className="hover:text-foreground">Blog</Link> &gt;{' '}
          <span className="text-foreground font-medium">Index Funds vs Actively Managed Funds in India</span>
        </nav>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Index Funds vs Actively Managed Funds in India: The Ultimate Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you are starting your investment journey in India, one of the most critical decisions you will face is choosing between an Index Fund (Passive) and an Actively Managed Mutual Fund. For decades, active funds dominated the Indian mutual fund landscape. However, the rise of financial literacy, digital platforms, and raw performance data has sparked a massive shift towards passive investing.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            In this comprehensive 2000-word guide, we dive deep into the mechanics, costs, historical performance, and hidden edge cases of both strategies. Whether you are eyeing the NIFTY 50 or searching for the next multi-bagger small-cap fund, understanding this debate is the key to unlocking long-term wealth creation. Let&apos;s settle the active vs passive debate for the Indian market.
          </p>
        </header>

        {/* Content Block 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="text-[#059669] w-7 h-7" />
            What is an Actively Managed Mutual Fund?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              An actively managed mutual fund is a pool of money managed by professional fund managers and a team of research analysts. Their primary goal is simple yet daunting: to beat the market benchmark (like the NIFTY 50 or BSE Sensex) and generate <strong>Alpha</strong> (excess returns).
            </p>
            <p>
              To achieve this, fund managers actively buy and sell stocks based on fundamental analysis, economic indicators, and market timing. If they believe the IT sector will underperform, they will reduce their holdings in TCS or Infosys. If they foresee a banking boom, they will overweight HDFC Bank or ICICI Bank.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Promise and the Price</h3>
            <p>
              The allure of active funds is the promise of superior returns. However, this expertise comes at a premium. Active funds charge a higher <strong>Total Expense Ratio (TER)</strong> to cover the costs of research, trading, and fund manager salaries. In India, equity active funds typically charge anywhere from 1.0% to 2.0% annually, especially in regular plans where distributor commissions are involved.
            </p>
            <p>
              While this 1-2% fee might seem negligible, it severely drags down your compounding over a 20 or 30-year horizon. Furthermore, despite the high fees, outperforming the market consistently is exceptionally difficult, even for seasoned professionals.
            </p>
          </div>
        </section>

        {/* Content Block 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <BarChart2 className="text-[var(--color-accent)] w-7 h-7" />
            What is an Index Fund (Passive Investing)?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              An Index Fund operates on a radically different philosophy: <em>&quot;Don&apos;t look for the needle in the haystack; just buy the haystack.&quot;</em> Instead of hiring expensive fund managers to pick winning stocks, an index fund simply mimics a specific market index, such as the NIFTY 50 or Sensex, in the exact same proportion.
            </p>
            <p>
              If Reliance Industries constitutes 10% of the NIFTY 50, a NIFTY 50 Index Fund will allocate exactly 10% of its corpus to Reliance. There is no human judgment, no market timing, and no speculation. The fund runs on autopilot.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Cost Advantage</h3>
            <p>
              Because there is no active stock picking, the operating costs of index funds are incredibly low. In India, you can find NIFTY 50 Index Funds with direct plan expense ratios ranging from <strong>0.10% to 0.30%</strong>. This massive cost advantage acts as an automatic tailwind for your returns over the long term.
            </p>
            <p>
              Index funds are designed not to beat the market, but to deliver the exact market return (minus tracking error and fees). While this sounds boring to some, mathematics and historical data suggest that "boring" often leads to vastly superior long-term wealth accumulation.
            </p>
          </div>
        </section>

        {/* The Fee Drag Example */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 bg-opacity-40 dark:bg-opacity-10 border-l-4 border-l-[var(--color-accent)]">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Mathematical Reality: The Fee Drag</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Let us visualize the destructive power of a high expense ratio over 30 years. Assume you invest ₹10,000 via SIP every month for 30 years. Both the Active Fund and the Index Fund generate a gross return of 13% CAGR.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-foreground font-semibold">Factor</th>
                  <th className="py-3 px-4 text-foreground font-semibold">Active Fund</th>
                  <th className="py-3 px-4 text-foreground font-semibold">Index Fund</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20">
                  <td className="py-3 px-4">Expense Ratio</td>
                  <td className="py-3 px-4 text-[#991B1B] font-medium">1.50%</td>
                  <td className="py-3 px-4 text-[#059669] font-medium">0.20%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4">Net CAGR</td>
                  <td className="py-3 px-4">11.50%</td>
                  <td className="py-3 px-4">12.80%</td>
                </tr>
                <tr className="bg-white/50 dark:bg-black/20 font-bold">
                  <td className="py-3 px-4">Final Corpus (After 30 Yrs)</td>
                  <td className="py-3 px-4 text-foreground">₹ 3.12 Crores</td>
                  <td className="py-3 px-4 text-[#059669]">₹ 4.31 Crores</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>Insight:</strong> For doing absolutely nothing except charging a higher fee, the active fund manager siphoned off nearly ₹1.2 Crores from your potential wealth. This is the hidden "Cost of Delay" and fee drag.
          </p>
        </section>

        {/* The SPIVA Report */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="text-[#991B1B] w-7 h-7" />
            The Data Speaks: The SPIVA India Scorecard
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              If active managers routinely beat the market, paying a 1.5% fee would be entirely justified. But do they? The definitive answer lies in the <strong>SPIVA (S&P Indices Versus Active) Scorecard</strong>, a rigorous, unbiased report published semi-annually.
            </p>
            <p>
              Historically, the Indian market was considered "inefficient," meaning a smart manager could easily find mispriced stocks and beat the benchmark. However, the data from recent SPIVA India reports shows a stark reality. Over a 5-year and 10-year horizon, an overwhelming majority of Indian Large-Cap Active Funds fail to beat their benchmark (the S&P BSE 100 or NIFTY 100).
            </p>
            <p>
              In many SPIVA reports, it has been noted that upwards of 70% to 80% of active large-cap funds underperformed the index over a 5-year period. As the Indian stock market becomes more institutionalized, formalized, and tracked by algorithmic trading, the "alpha" is rapidly shrinking. Beating the market consistently year after year is becoming statistically improbable for most funds.
            </p>
            <p>
              Furthermore, active funds suffer from <strong>Survivorship Bias</strong>. Many poorly performing active funds are quietly merged or shut down by Asset Management Companies (AMCs) to hide their bad track record. Index funds, by nature, simply track the benchmark indefinitely.
            </p>
          </div>
        </section>

        
        {/* Taxation Block */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="text-[#059669] w-7 h-7" />
            Understanding the Taxation of Mutual Funds in India
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              When choosing between active and passive funds, you must also understand how they are taxed. In India, equity mutual funds (both active and index funds) are taxed identically if they hold more than 65% in domestic equities. 
            </p>
            <p>
              <strong>Short-Term Capital Gains (STCG):</strong> If you sell your units before completing 1 year, the profit is taxed at 20% (as per the latest union budget changes). 
            </p>
            <p>
              <strong>Long-Term Capital Gains (LTCG):</strong> If you sell after 1 year, profits up to ₹1.25 Lakh per financial year are completely tax-free. Any profit above ₹1.25 Lakh is taxed at a flat 12.5% without indexation benefits. 
            </p>
            <p>
              However, active funds inherently generate more hidden taxes <em>within</em> the fund due to high portfolio turnover. When a fund manager constantly buys and sells stocks to generate alpha, those transactions incur Securities Transaction Tax (STT), brokerage fees, and impact costs. All of these are quietly deducted from your Net Asset Value (NAV), further dragging down performance. Index funds have a very low turnover ratio (often below 5%), making them much more tax-efficient at the fund level.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Direct vs Regular Plans</h3>
            <p>
              A critical mistake beginners make is buying &quot;Regular&quot; plans of active funds through a bank relationship manager or local distributor. Regular plans pay a hidden commission to the distributor, pushing the Expense Ratio even higher (often around 1.5% to 2.25%).
            </p>
            <p>
              Always invest in &quot;Direct&quot; plans. Direct plans bypass the middleman, offering you a lower expense ratio and higher compounding over time. For index funds, direct plans can have expense ratios as low as 0.10%, making them the ultimate vehicle for long-term wealth creation.
            </p>
          </div>
        </section>
  
        {/* Edge Cases Section */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-[var(--color-accent)]/20">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <ShieldCheck className="text-[var(--color-accent)] w-7 h-7" />
            Edge Cases: Where Active Funds Still Shine in India
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Despite the overwhelming evidence in favor of index funds in the Large-Cap space, the Indian market still has pockets of inefficiency where Active Management can add genuine value. We must look at the <strong>Mid-Cap</strong> and <strong>Small-Cap</strong> segments.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Mid & Small Cap Inefficiency:</strong> India has over 4,000 listed companies. While the top 100 (Large Cap) are heavily researched by thousands of analysts globally, the companies ranked 251st to 500th (Small Caps) are often under-researched. A skilled fund manager doing ground-level research can identify high-growth businesses early, generating massive alpha that easily covers their 1.5% fee.
              </li>
              <li>
                <strong>Downside Protection:</strong> During severe market crashes (like March 2020), index funds fall exactly in line with the market. An active fund manager has the flexibility to move to cash, increase allocation to defensive sectors (like FMCG or Pharma), and protect the portfolio from maximum drawdown.
              </li>
              <li>
                <strong>Flexi-Cap Funds:</strong> These funds allow managers to shift allocations dynamically between Large, Mid, and Small caps based on valuations. An index fund is rigid. A skilled Flexi-Cap manager can maneuver through changing market cycles more effectively.
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion / Verdict */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Verdict: How to Build Your Portfolio</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For the vast majority of retail investors in India, a <strong>Core and Satellite Portfolio</strong> is the most optimal strategy. 
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>The Core (60-70%):</strong> Dedicate the majority of your portfolio to a low-cost NIFTY 50 or NIFTY Next 50 Index Fund. This forms a stable, low-fee, high-reliability foundation for your wealth.</li>
            <li><strong>The Satellite (30-40%):</strong> Use Actively Managed Funds specifically for the Mid-Cap and Small-Cap segments where fund managers can still consistently beat the benchmark.</li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
            Remember, in investing, you get what you don&apos;t pay for. Keep your fees low, stay consistent with your SIPs, and let compounding do the heavy lifting over the next two decades.
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
        <section className="max-w-6xl w-full mx-auto mt-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="glass-panel rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-left font-semibold text-foreground text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'pb-5 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
      </div>
    </main>
  );
}

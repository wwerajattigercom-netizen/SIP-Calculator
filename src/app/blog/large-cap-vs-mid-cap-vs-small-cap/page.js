"use client";

import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { ChevronDown, TrendingUp, ShieldAlert, BarChart3, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function LargeCapVsMidCapVsSmallCap() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between Large, Mid, and Small Cap funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to SEBI rules, Large Cap funds invest in the top 100 companies by market capitalization. Mid Cap funds invest in companies ranked 101st to 250th, and Small Cap funds invest in companies ranked 251st and below."
        }
      },
      {
        "@type": "Question",
        "name": "Are Small Cap funds too risky for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Small Cap funds have high volatility and can experience significant drawdowns during market corrections. Beginners are generally advised to start with Large Cap or Flexi Cap funds before exploring small caps."
        }
      },
      {
        "@type": "Question",
        "name": "Can a mid-cap company become a large-cap company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. As companies grow their revenue, profits, and market share, their market capitalization increases. A mid-cap company that performs exceptionally well over years will eventually enter the top 100 list and become a large-cap company."
        }
      },
      {
        "@type": "Question",
        "name": "Should I stop my Small Cap SIP during a market crash?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Stopping your SIP during a crash defeats the purpose of Systematic Investment Plans. Market crashes allow you to accumulate small-cap units at cheaper valuations, which will significantly boost your returns when the market eventually recovers."
        }
      }
    ]
  };

  return (
    <div className="max-w-6xl w-full mx-auto pb-16 pt-8 px-4 sm:px-6 lg:px-8">
      {/* Script for FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Large Cap vs Mid Cap vs Small Cap", href: "/blog/large-cap-vs-mid-cap-vs-small-cap" }
        ]}
      /><div className="mt-6 mb-10">
        <h1
          className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 mt-6">Large Cap vs Mid Cap vs Small Cap Mutual Funds in India: A Comprehensive Guide
                  </h1>
        <p
          className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">When you start investing in mutual funds in India, one of the first categorizations you encounter is market capitalization. Mutual funds are typically divided into Large Cap, Mid Cap, and Small Cap funds. But what do these terms mean, and more importantly, which one is right for your investment portfolio? Navigating the Indian stock market requires a clear understanding of these categories, as they directly dictate the volatility and potential returns of your investments over the long term.
                  </p>
        <div className="flex items-center gap-3 mb-8"><div
            className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold text-sm">R
                        </div><div><p className="text-sm font-semibold text-foreground">Written by Rajat</p><p className="text-xs text-gray-500 dark:text-gray-400">Personal Finance Expert • 8 min read</p></div></div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 mt-6">


        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
          The Securities and Exchange Board of India (SEBI) has clearly defined these categories to ensure transparency and consistency across all mutual fund houses. Before 2017, AMCs had varied definitions, creating confusion for retail investors. Today, the rules are uniform and standardized. Understanding these definitions is crucial because market capitalization directly impacts the risk and return profile of your investments. 
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          In this comprehensive guide, we will dive deep into SEBI&apos;s definitions, compare the risk-reward ratios of each category, analyze historical return scenarios, evaluate taxation implications, and help you construct a balanced portfolio that aligns with your financial goals and risk tolerance. Whether you are planning for retirement, your child&apos;s education, or wealth creation, selecting the right market cap category is the foundation of a successful investment strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#1B3A5C]/10 p-3 rounded-2xl mb-4">
            <ShieldAlert className="w-8 h-8 text-[#1B3A5C]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Large Cap: Stability</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Top 100 companies by market capitalization. Established market leaders with steady but moderate growth potential. Ideal for conservative equity investors seeking stability and lower drawdown risks during bear markets.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#1B3A5C]">
            Lower Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#C4993C]/10 p-3 rounded-2xl mb-4">
            <BarChart3 className="w-8 h-8 text-[#C4993C]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Mid Cap: Growth</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Companies ranked 101-250. Emerging leaders with high growth potential but higher volatility than large caps. They represent the sweet spot between risk and reward, offering significant upside potential as they transition into large caps.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#C4993C]">
            Moderate Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#059669]/10 p-3 rounded-2xl mb-4">
            <AlertTriangle className="w-8 h-8 text-[#059669]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Small Cap: High Reward</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Companies ranked 251st onwards. High growth opportunities with significant volatility and severe drawdown risks. These are niche players or early-stage growing businesses capable of delivering multi-bagger returns over a decade.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#059669]">
            High Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">SEBI&apos;s Classification of Market Capitalization</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Before 2017, different asset management companies (AMCs) defined market caps differently. A company considered a mid-cap by one fund house might have been classified as a small-cap by another. To remove this ambiguity, SEBI introduced a uniform classification system in October 2017. The Association of Mutual Funds in India (AMFI) releases a half-yearly list of stocks categorized into large, mid, and small caps based on their average market capitalization over the previous six months. Mutual funds are mandated to rebalance their portfolios in alignment with this updated list.
        </p>

        <div className="overflow-x-auto mb-8 border border-gray-200 dark:border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <th className="p-4 font-semibold text-foreground">Category</th>
                <th className="p-4 font-semibold text-foreground">SEBI Definition</th>
                <th className="p-4 font-semibold text-foreground">Characteristics</th>
                <th className="p-4 font-semibold text-foreground">Examples (Indicative)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Large Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Top 100 companies by market capitalization</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Market leaders, established business models, robust balance sheets, strong corporate governance.</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Reliance, TCS, HDFC Bank, Infosys</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Mid Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">101st to 250th companies by market cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Challengers, growing rapidly, higher risk of business failure compared to large caps, potential future large caps.</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Trent, TVS Motor, Federal Bank, MRF</td>
              </tr>
              <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Small Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">251st company onwards by market cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Niche businesses, high growth potential, highly sensitive to economic cycles, lower liquidity.</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">BSE, CDSL, Cyient, Suzlon Energy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-4">The Large Cap Advantage: Stability and Resilience</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Large-cap companies are the stalwarts of the Indian economy. They are well-established entities that have survived multiple economic cycles, regulatory changes, and global crises. Because of their sheer size, their growth rates might not be as explosive as mid or small caps. For instance, doubling a market cap of ₹10 Lakh Crores is significantly harder than doubling a market cap of ₹5,000 Crores.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          However, they offer a high degree of stability. When the stock market crashes or enters a bear phase, large-cap stocks generally fall less compared to the broader market. Their robust balance sheets, strong cash flows, pricing power, and access to capital help them weather economic downturns effectively. For a retail investor, this means fewer sleepless nights and a more predictable wealth compounding journey.
        </p>
        
        <h3 className="text-xl font-bold text-foreground mb-4 mt-8">The Mid Cap Sweet Spot: Growth meets Scale</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Mid-cap companies are often considered the &quot;sweet spot&quot; of investing in India. They are large enough to have proven business models, experienced management teams, and a considerable market presence, yet small enough to grow rapidly. A successful mid-cap company today could be a large-cap company tomorrow. This transition from mid to large cap often results in significant wealth creation for investors.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          However, they are more susceptible to economic shocks than large caps. During periods of high inflation or rising interest rates, mid-sized companies might struggle with margin pressures more acutely than industry leaders. Their stock prices can be highly volatile, requiring investors to have a holding period of at least 5 to 7 years to smooth out the bumps.
        </p>

        <h3 className="text-xl font-bold text-foreground mb-4 mt-8">The Small Cap Thrill: High Risk, High Reward</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Small-cap companies operate in niche segments, emerging industries, or are early-stage growing businesses looking to expand their footprint. They offer the highest potential for multi-bagger returns. A small cap that successfully scales its operations, dominates a niche market, or benefits from favorable government policies can deliver exponential, non-linear growth.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          The catch? The mortality rate is high. Many small caps fail to scale, face corporate governance issues, or get wiped out during severe recessions. Furthermore, liquidity is a significant concern; during a market panic, it can be difficult to sell small-cap stocks without taking a massive hit on the price. The volatility here is extreme, and portfolios can easily see 50% to 60% temporary drawdowns during severe bear markets.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Risk vs. Reward: Analyzing Historical Return Scenarios</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          To truly understand the difference between these three categories, we must look at how they perform across different market cycles. It is a well-established fact in finance that higher risk should theoretically compensate the investor with higher returns over the long term. Let&apos;s analyze how these funds behave in bull markets, bear markets, and over a multi-decade horizon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#059669]" /> Bull Market Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              When the economy is booming, interest rates are favorable, and liquidity is abundant, smaller companies tend to outperform significantly. They can rapidly expand capacities and capture market share.
            </p>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Large Cap:</span> Delivers steady 12-15% returns, acting as the anchor of the portfolio.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Mid Cap:</span> Accelerates to aggressive 18-25% returns, riding on expansion and earnings growth.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Small Cap:</span> Explosive <span className="text-[#059669] font-bold">30%+ to 50%+ returns</span> in a single year during peak exuberance.</div></li>
            </ul>
          </div>

          <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#991B1B] transform rotate-180" /> Bear Market Drawdowns
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              During a crisis (like the 2008 global financial crisis or 2020 COVID-19 crash), the scenario flips dramatically. Investors flee to safety, indiscriminately dumping riskier, less liquid assets.
            </p>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Large Cap:</span> Corrections are relatively contained at 20-30%. These stocks are usually the first to recover when the dust settles.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Mid Cap:</span> Severe corrections of 40-50%, testing investor patience.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Small Cap:</span> Brutal, wealth-destroying drawdowns of <span className="text-[#991B1B] font-bold">60-70%</span>. Recovery can take multiple years, requiring extreme conviction.</div></li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Over a 10+ year horizon, a well-managed Small Cap fund will generally outperform a Large Cap fund by a significant margin. This outperformance is known as the &quot;small-cap premium.&quot; However, the journey is incredibly volatile. If you panic and sell your small-cap investments during a 50% drawdown, you will crystallize massive losses and never realize those long-term compounding gains. This is why small caps are strictly for investors with an iron stomach, emotional discipline, and a very long time horizon.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Who Should Invest in Which Category?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Asset allocation is personal and should be based on your age, financial goals, risk appetite, and investment horizon. Let&apos;s look at three typical investor profiles and the recommended portfolio structures.
        </p>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#1B3A5C] mb-3 flex items-center">
              1. The Conservative Investor (Focus on Large Caps)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you are a beginner stepping into equity for the first time, approaching retirement within 3-5 years, or simply cannot tolerate seeing your portfolio value drop significantly, you need stability. Your core portfolio should consist of Large Cap funds or passive Nifty 50 Index Funds. They provide steady compounding without extreme volatility, acting as shock absorbers during market turmoil.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Recommended Asset Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[75%] h-full" title="Large Cap 75%"></div>
                <div className="bg-[#C4993C] w-[15%] h-full" title="Mid Cap 15%"></div>
                <div className="bg-[#059669] w-[10%] h-full" title="Small Cap 10%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>75% Large Cap</span>
                <span>15% Mid Cap</span>
                <span>10% Small Cap</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#C4993C] mb-3 flex items-center">
              2. The Balanced Investor (Mix of Large and Mid Caps)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you have an investment horizon of 5 to 10 years, are in your 30s or 40s, and can stomach moderate volatility for better inflation-beating returns, you should maintain a healthy mix. Flexi Cap funds often serve this purpose well, as the fund manager dynamically shifts between market caps based on valuations. Alternatively, you can manually build a core-and-satellite portfolio.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Recommended Asset Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[50%] h-full" title="Large Cap 50%"></div>
                <div className="bg-[#C4993C] w-[35%] h-full" title="Mid Cap 35%"></div>
                <div className="bg-[#059669] w-[15%] h-full" title="Small Cap 15%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>50% Large Cap</span>
                <span>35% Mid Cap</span>
                <span>15% Small Cap</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#059669] mb-3 flex items-center">
              3. The Aggressive Investor (Heavy on Mid and Small Caps)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you are young (in your 20s or early 30s), have a high-risk appetite, and an investment horizon exceeding 10-15 years, you can afford to allocate a significant portion of your portfolio to Mid and Small caps to maximize long-term wealth creation. However, discipline is non-negotiable. You must continue your SIPs persistently, especially during market crashes, to average out your costs.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Recommended Asset Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[30%] h-full" title="Large Cap 30%"></div>
                <div className="bg-[#C4993C] w-[40%] h-full" title="Mid Cap 40%"></div>
                <div className="bg-[#059669] w-[30%] h-full" title="Small Cap 30%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>30% Large Cap</span>
                <span>40% Mid Cap</span>
                <span>30% Small Cap</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Taxation Implications</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Regardless of whether you invest in a Large Cap, Mid Cap, or Small Cap mutual fund, as long as the fund invests at least 65% of its assets in domestic equities, it is treated as an Equity-Oriented Fund for taxation purposes. 
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400 space-y-2">
          <li><strong>Short-Term Capital Gains (STCG):</strong> If you sell your mutual fund units within 12 months of purchase, the gains are taxed at a flat rate of 15% (plus applicable surcharge and cess).</li>
          <li><strong>Long-Term Capital Gains (LTCG):</strong> If you sell units after holding them for more than 12 months, the gains are subject to LTCG tax. Currently, LTCG up to ₹1.25 Lakh per financial year is completely tax-free. Any gains exceeding this limit are taxed at 12.5% (without indexation benefit).</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Keep in mind that taxation rules are subject to change based on Union Budget announcements. Always consult with a registered financial advisor or tax professional before making significant investment decisions based on tax implications.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What is the difference between Large, Mid, and Small Cap funds?",
              a: "According to SEBI rules, Large Cap funds invest in the top 100 companies by market capitalization. Mid Cap funds invest in companies ranked 101st to 250th, and Small Cap funds invest in companies ranked 251st and below."
            },
            {
              q: "Are Small Cap funds too risky for beginners?",
              a: "Yes, Small Cap funds have high volatility and can experience significant drawdowns during market corrections. Beginners are generally advised to start with Large Cap or Flexi Cap funds before exploring small caps."
            },
            {
              q: "Can a mid-cap company become a large-cap company?",
              a: "Absolutely. As companies grow their revenue, profits, and market share, their market capitalization increases. A mid-cap company that performs exceptionally well over years will eventually enter the top 100 list and become a large-cap company."
            },
            {
              q: "Should I stop my Small Cap SIP during a market crash?",
              a: "No. Stopping your SIP during a crash defeats the purpose of Systematic Investment Plans. Market crashes allow you to accumulate small-cap units at cheaper valuations, which will significantly boost your returns when the market eventually recovers."
            },
            {
              q: "Is it better to do SIP or Lumpsum in Small Cap funds?",
              a: "Due to their inherent high volatility, Systematic Investment Plans (SIPs) are strongly recommended for Small Cap funds over lump sum investments. SIPs help you navigate the extreme highs and lows by averaging your purchase cost over time, mitigating the risk of investing a large amount at a market peak."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-black/20">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-foreground focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

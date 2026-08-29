"use client";

import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import { ChevronDown, TrendingUp, ShieldAlert, BarChart3, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function LargeCapVsSmallCapFundsUS() {
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
        "name": "What is the difference between Large Cap and Small Cap stocks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Large Cap stocks typically have a market capitalization of $10 billion or more, representing established industry leaders like Apple or Microsoft. Small Cap stocks generally have market caps between $250 million and $2 billion, representing younger, growth-oriented companies with higher volatility."
        }
      },
      {
        "@type": "Question",
        "name": "Is the S&P 500 a Large Cap or Small Cap index?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The S&P 500 is a Large Cap index. It tracks 500 of the largest publicly traded companies in the United States and is considered a benchmark for large-cap equity performance."
        }
      },
      {
        "@type": "Question",
        "name": "What is the small-cap risk premium?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The small-cap risk premium refers to the historical tendency of small-cap stocks to generate higher returns than large-cap stocks over long periods, compensating investors for taking on additional risk and volatility."
        }
      },
      {
        "@type": "Question",
        "name": "Should I invest in Mid Cap funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mid Cap funds offer a balance between the stability of Large Caps and the explosive growth potential of Small Caps. They are ideal for investors seeking higher returns without the extreme volatility associated with the Russell 2000."
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
          { label: "Home", href: "/us" },
          { label: "Blog", href: "/us/blog" },
          { label: "Large Cap vs Small Cap Funds", href: "/us/blog/large-cap-vs-small-cap-funds" }
        ]}
      />

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 mt-6">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Large Cap vs Mid Cap vs Small Cap Funds: Navigating US Equity Markets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
          When constructing a robust investment portfolio in the United States, understanding market capitalization (market cap) is paramount. The US equity market is vast, comprising thousands of publicly traded companies, from global tech behemoths to niche regional manufacturers. To make sense of this massive ecosystem, Wall Street categorizes stocks primarily into three buckets: Large Cap, Mid Cap, and Small Cap. 
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
          Market cap is simply calculated by multiplying a company&apos;s current share price by its total number of outstanding shares. However, this metric represents much more than just size—it is fundamentally tied to a company&apos;s growth trajectory, its resilience during economic downturns, and the level of risk it brings to your investment portfolio. 
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          In this comprehensive guide, we will analyze the differences between these asset classes, dissect benchmark indexes like the S&P 500 and the Russell 2000, explore the concept of the small-cap risk premium, and provide actionable frameworks to help you optimize your 401(k), Roth IRA, or standard brokerage accounts based on your specific risk tolerance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#1B3A5C]/10 p-3 rounded-2xl mb-4">
            <ShieldAlert className="w-8 h-8 text-[#1B3A5C]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Large Cap: The Anchors</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Market cap $10 Billion+. The biggest household names. They offer steady dividends, strong balance sheets, and resilience during recessions, forming the core of conservative portfolios.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#1B3A5C]">
            Lower Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#C4993C]/10 p-3 rounded-2xl mb-4">
            <BarChart3 className="w-8 h-8 text-[#C4993C]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Mid Cap: The Challengers</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Market cap $2 Billion to $10 Billion. Rapidly expanding companies capturing new market share. They offer a strong balance of growth potential without the extreme risks of small caps.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#C4993C]">
            Moderate Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start">
          <div className="bg-[#059669]/10 p-3 rounded-2xl mb-4">
            <AlertTriangle className="w-8 h-8 text-[#059669]" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Small Cap: The Innovators</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Market cap $250 Million to $2 Billion. Agile, high-growth entities with massive upside. However, they are highly sensitive to interest rates and economic cycles, presenting significant drawdown risks.</p>
          <div className="mt-auto inline-flex items-center text-sm font-semibold text-[#059669]">
            High Risk <TrendingUp className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Understanding the Benchmarks: S&P 500 vs. Russell 2000</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          When discussing US equity performance, investors and financial media constantly reference specific stock indexes. These indexes serve as barometers for the health of different market segments. Let&apos;s break down the most prominent benchmarks used to track large, mid, and small-cap stocks.
        </p>

        <div className="overflow-x-auto mb-8 border border-gray-200 dark:border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <th className="p-4 font-semibold text-foreground">Category</th>
                <th className="p-4 font-semibold text-foreground">Primary Index</th>
                <th className="p-4 font-semibold text-foreground">General Definition</th>
                <th className="p-4 font-semibold text-foreground">Examples (Indicative)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Large Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400 font-semibold">S&P 500, Dow Jones</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">&gt; $10 Billion Market Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Apple, Microsoft, Amazon, J&J</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Mid Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400 font-semibold">S&P MidCap 400</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">$2 Billion - $10 Billion Market Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Williams-Sonoma, Deckers Outdoor</td>
              </tr>
              <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-foreground">Small Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400 font-semibold">Russell 2000</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">$250 Million - $2 Billion Market Cap</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">Abercrombie & Fitch, Super Micro</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-4">The Dominance of Large Caps (The S&P 500)</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          The S&P 500 index represents roughly 80% of the total value of the U.S. stock market. Companies in this bracket have global operations, diversified revenue streams, and formidable competitive moats. Because of their sheer size, doubling their revenues is incredibly difficult. Therefore, their growth is often slower but much steadier. They are also known for returning capital to shareholders through consistent dividend payouts and massive share buyback programs, providing a downside cushion during turbulent economic times.
        </p>
        
        <h3 className="text-xl font-bold text-foreground mb-4 mt-8">The Sweet Spot: Mid Caps</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Mid-cap stocks often offer the &quot;best of both worlds.&quot; They have moved past the highly vulnerable start-up phase, proving their business models are viable, but they still have a massive runway for growth before they reach market saturation. Historically, mid-cap indexes like the S&P MidCap 400 have often outperformed the S&P 500 over long stretches because these companies can scale operations quickly and are prime targets for acquisitions by larger conglomerates looking to expand their technological capabilities or market footprint.
        </p>

        <h3 className="text-xl font-bold text-foreground mb-4 mt-8">The Frontier: Small Caps (The Russell 2000)</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          The Russell 2000 is the quintessential gauge for small-cap stocks. These companies are generally more domestic-focused, making their revenue highly dependent on the health of the US economy rather than global macro trends. They are often pioneers in emerging sectors like biotech or clean energy. The potential for exponential growth is unparalleled—if a small cap innovates successfully, the stock price can skyrocket. However, they lack the deep financial reserves of large caps. They are heavily reliant on borrowing, making them highly vulnerable to rising interest rates and tightening credit conditions.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">The Small-Cap Risk Premium and Volatility</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          In academic finance, there is a concept known as the &quot;size premium&quot; or the small-cap premium. Historical data over nearly a century suggests that, over sufficiently long periods, small-cap stocks generate higher average returns than large-cap stocks. This outperformance is the market&apos;s way of compensating investors for the additional risk they are taking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#059669]" /> Economic Expansions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              During periods of low interest rates and robust economic growth, small caps often lead the charge.
            </p>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Nimble Operations:</span> They adapt faster to new consumer trends.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">M&A Targets:</span> Strong acquisition premiums push their stock prices upward.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#059669] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Explosive Returns:</span> It&apos;s not uncommon to see <span className="text-[#059669] font-bold">20-30%+ annual gains</span> during peak bull runs.</div></li>
            </ul>
          </div>

          <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#991B1B] transform rotate-180" /> Recessions & Rate Hikes
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              When the Federal Reserve hikes rates or a recession hits, small caps suffer disproportionately.
            </p>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Debt Burden:</span> Higher borrowing costs directly eat into their thin profit margins.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Illiquidity:</span> During market panics, investors rush to sell, causing prices to gap down severely.</div></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-2 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> <div><span className="font-semibold text-foreground">Severe Drawdowns:</span> Small caps frequently see <span className="text-[#991B1B] font-bold">40% to 50%</span> drops during bear markets.</div></li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          The takeaway? If you want to capture the small-cap premium, you must be prepared for violent volatility. You cannot panic-sell at the bottom of a cycle; otherwise, you completely negate the long-term benefits of the asset class.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">How to Allocate Your US Portfolio (401(k) / IRA Strategies)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Most investors use index funds or Exchange-Traded Funds (ETFs) to build their portfolios. The way you blend these market caps should reflect your time horizon until retirement and your personal ability to handle stress when looking at your brokerage account.
        </p>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#1B3A5C] mb-3 flex items-center">
              1. The Conservative Approach (Capital Preservation)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Best for investors nearing retirement or those with low risk tolerance. The focus is on steady growth and minimizing drawdowns. The portfolio relies heavily on the S&P 500 or Total Stock Market funds.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Sample Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[80%] h-full" title="Large Cap 80%"></div>
                <div className="bg-[#C4993C] w-[15%] h-full" title="Mid Cap 15%"></div>
                <div className="bg-[#059669] w-[5%] h-full" title="Small Cap 5%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>80% Large Cap</span>
                <span>15% Mid</span>
                <span>5% Small</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#C4993C] mb-3 flex items-center">
              2. The Balanced Approach (Growth & Stability)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Suitable for individuals in their 30s and 40s who want better returns than a pure S&P 500 portfolio but still want the anchor of large, established companies. This tilt increases exposure to the MidCap 400.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Sample Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[60%] h-full" title="Large Cap 60%"></div>
                <div className="bg-[#C4993C] w-[25%] h-full" title="Mid Cap 25%"></div>
                <div className="bg-[#059669] w-[15%] h-full" title="Small Cap 15%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>60% Large Cap</span>
                <span>25% Mid</span>
                <span>15% Small</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="text-xl font-bold text-[#059669] mb-3 flex items-center">
              3. The Aggressive Growth Approach (Maximum Return Potential)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Ideal for young investors in their 20s with decades until retirement. This portfolio intentionally overweights mid and small-cap stocks (often referred to as a &quot;small-cap tilt&quot;) to capture the long-term size premium, accepting massive short-term volatility in exchange.
            </p>
            <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p className="font-semibold text-foreground mb-2">Sample Allocation:</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-[#1B3A5C] w-[40%] h-full" title="Large Cap 40%"></div>
                <div className="bg-[#C4993C] w-[30%] h-full" title="Mid Cap 30%"></div>
                <div className="bg-[#059669] w-[30%] h-full" title="Small Cap 30%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>40% Large Cap</span>
                <span>30% Mid</span>
                <span>30% Small</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What is the difference between Large Cap and Small Cap stocks?",
              a: "Large Cap stocks typically have a market capitalization of $10 billion or more, representing established industry leaders like Apple or Microsoft. Small Cap stocks generally have market caps between $250 million and $2 billion, representing younger, growth-oriented companies with higher volatility."
            },
            {
              q: "Is the S&P 500 a Large Cap or Small Cap index?",
              a: "The S&P 500 is fundamentally a Large Cap index. It tracks 500 of the largest and most established publicly traded companies in the United States and serves as a primary benchmark for large-cap equity performance."
            },
            {
              q: "What is the small-cap risk premium?",
              a: "The small-cap risk premium refers to the historical tendency of small-cap stocks to generate higher returns than large-cap stocks over long periods, compensating investors for taking on additional risk and enduring higher volatility."
            },
            {
              q: "Should I invest in Mid Cap funds?",
              a: "Yes, for most investors, Mid Cap funds offer an excellent balance between the stability of Large Caps and the explosive growth potential of Small Caps. They are ideal for diversifying your portfolio and capturing growth before companies enter the S&P 500."
            },
            {
              q: "Are total stock market index funds sufficient for small-cap exposure?",
              a: "A Total Stock Market Index Fund (like VTSAX or VTI) is market-cap weighted. This means roughly 80% of your money goes to Large Caps, leaving very little exposure to Mid and Small caps. If you specifically want to capture the small-cap premium, you may need a dedicated Small Cap Index Fund alongside it."
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

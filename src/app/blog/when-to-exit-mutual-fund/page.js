import React from 'react';
import { ChevronDown, Info, AlertTriangle, TrendingUp, TrendingDown, Target, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function WhenToExitMutualFundIN() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Should I exit my mutual fund if it is underperforming for 6 months?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, a 6-month period is too short to judge an equity mutual fund's performance. You should wait for at least 18 to 24 months of consistent underperformance against its benchmark before deciding to exit."
        }
      },
      {
        "@type": "Question",
        "name": "What is the tax implication if I exit my mutual fund before 1 year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you exit an equity mutual fund before 1 year, your returns are subject to Short-Term Capital Gains (STCG) tax at 20% (as per latest rules). For debt funds, the gains are added to your income and taxed as per your income tax slab regardless of the holding period."
        }
      },
      {
        "@type": "Question",
        "name": "Should I sell my mutual funds during a market crash?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selling during a market crash converts your notional losses into actual losses. Unless you have an immediate financial emergency, it is highly recommended to stay invested and continue your SIPs to buy units at a lower NAV, which lowers your average cost."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'When to Exit a Mutual Fund', href: '/blog/when-to-exit-mutual-fund' },
            ]}
          />

          <article>
            <div className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                When Should You Exit a Mutual Fund in India? (Complete Guide)
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Knowing when to sell a mutual fund is often harder than knowing when to buy one. From consistent benchmark underperformance and fund manager changes to realizing your financial goals—learn the exact signals that indicate it&apos;s time to hit the &quot;sell&quot; button, and when you should simply hold on and avoid panic selling.
              </p>
            </div>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. The Myth of &quot;Buy and Forget&quot;</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  While long-term investing is the key to wealth creation in India, adopting a &quot;buy and forget&quot; strategy for your mutual funds can be dangerous. Mutual funds are managed by asset management companies (AMCs), and their performance depends heavily on the fund manager&apos;s decisions, the broader market conditions, and changes in the fund&apos;s investment mandate.
                </p>
                <p>
                  Many investors hold onto underperforming funds out of loyalty or simply because they don&apos;t want to book a loss. Conversely, other investors panic during market corrections and sell their best-performing funds at the worst possible time. Knowing the right time to exit requires a structured approach, keeping emotions at bay.
                </p>
                <p>
                  In this comprehensive guide, we will break down the valid reasons to exit a mutual fund, the factors you should ignore, and the tax implications of your exit strategy in the Indian context.
                </p>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Valid Reasons to Exit a Mutual Fund</h2>
              
              <div className="space-y-6">
                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingDown className="w-6 h-6 text-[#991B1B]" />
                    <h3 className="text-xl font-bold text-foreground">Consistent Underperformance Against the Benchmark</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Every mutual fund has a benchmark index (e.g., NIFTY 50, NIFTY Midcap 150). If your fund underperforms its benchmark for a quarter or two, it&apos;s not a cause for concern. However, if the fund consistently underperforms its benchmark and its category peers for <strong className="text-[#991B1B]">18 to 24 months</strong>, it&apos;s a red flag.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Active mutual funds charge a higher expense ratio precisely because they aim to beat the benchmark. If they fail to do so over a sustained period, you are better off moving your capital to a better-performing fund or a low-cost index fund.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-[#059669]" />
                    <h3 className="text-xl font-bold text-foreground">You Have Reached Your Financial Goal</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    If you started an SIP to accumulate ₹50 Lakhs for your child&apos;s higher education in 10 years, and you have reached that target in 9 years due to a bull run—it is time to exit.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    As you approach your goal (around 1 to 3 years before the target date), you should start shifting your corpus from highly volatile equity funds to safer debt funds or fixed deposits using a Systematic Transfer Plan (STP). This protects your accumulated wealth from a sudden market crash right before you need the money.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">Change in Fund Manager or Investment Mandate</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    A mutual fund&apos;s success is often tied to the expertise of its fund manager. If a star fund manager who delivered exceptional returns for years decides to leave the AMC, it warrants close monitoring. You don&apos;t need to exit immediately, but you should watch the fund&apos;s performance under the new manager for 3 to 4 quarters. 
                    <br/><br/>
                    Similarly, if a fund changes its fundamental attribute—for instance, a mid-cap fund changing its mandate to a large-cap fund due to SEBI reclassification—and this new mandate no longer aligns with your risk profile, you should consider exiting.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">Rebalancing Your Portfolio</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Asset allocation is the cornerstone of portfolio management. Suppose your target allocation is 70% equity and 30% debt. Following a massive bull market, your equity portion might swell to 85%. To bring your portfolio back to your target allocation, you will need to sell some of your equity mutual funds and reinvest the proceeds into debt funds. This disciplined approach ensures you book profits at market highs.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">Consolidating a Cluttered Portfolio</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Many investors end up accumulating 15 to 20 different mutual funds over the years, often holding overlapping portfolios (e.g., owning 4 different large-cap funds that invest in the exact same top 50 stocks). This is known as &quot;diworsification.&quot; If you find that your portfolio has become a cluttered mess that is difficult to track, it is a perfectly valid reason to exit redundant funds. Consolidating your investments into 4 to 5 well-chosen funds across different market caps (Large, Mid, Small) and asset classes makes tracking performance easier and avoids unnecessary duplication of expense ratios.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. When NOT to Exit Your Mutual Funds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#991B1B] mb-2">During Market Crashes (Panic Selling)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Markets are inherently volatile. Selling your equity funds when the NIFTY drops by 10% or 20% converts temporary, notional losses into permanent, real losses. Historically, the Indian market has always recovered and reached new highs after major crashes (like 2008 and 2020). Continue your SIPs to buy at lower NAVs.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Short-Term Underperformance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Do not exit a fund just because it delivered poor returns for 3 to 6 months. Even the best fund managers go through rough patches. Give the fund at least 1.5 to 2 years to prove its strategy before making an exit decision.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Chasing the &quot;Latest Topper&quot;</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Do not sell your consistent, steady-performing fund just to invest in last year&apos;s top-performing thematic fund. Yesterday&apos;s winners are rarely tomorrow&apos;s winners. Sectoral funds can show massive 50% returns one year and negative returns the next.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Just to Book Profits</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    If your fund has doubled your money and you don&apos;t need the funds, there is no need to exit just to &quot;book profits.&quot; Compounding works best when you let your money grow uninterrupted for decades.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Following News Headlines Blindly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Financial news channels and social media thrive on sensationalism. Exiting your mutual funds because a pundit predicted a massive global recession or because of short-term geopolitical tensions is generally a poor strategy. Markets price in news much faster than retail investors can react. If your fundamental reasons for investing haven&apos;t changed, ignore the noise and stick to your SIP schedule.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">4. The Cost of Exiting: Taxation & Exit Loads</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Before hitting the sell button, you must calculate the costs involved. Exiting at the wrong time can attract exit loads and short-term capital gains tax.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-accent)] bg-opacity-10">
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Fund Type</th>
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Holding Period</th>
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Tax Treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">Equity Funds</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Less than 1 Year</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">STCG at <strong className="text-[#991B1B]">20%</strong></td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5">
                      <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">Equity Funds</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">More than 1 Year</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">LTCG at <strong className="text-[#059669]">12.5%</strong> (Exemption up to ₹1.25 Lakhs)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">Debt Funds</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Any Period</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Added to income, taxed at slab rate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-1">Exit Loads</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Most equity mutual funds charge an exit load (usually 1%) if you redeem your units within 1 year of investment. For SIPs, remember that each installment is treated as a fresh investment. So, the 1-year period is calculated separately for every single SIP installment on a First-In-First-Out (FIFO) basis.
                </p>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Historical Return Scenarios: Holding vs Panic Selling</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Let&apos;s look at a hypothetical scenario illustrating the difference between staying invested during a crash and panic selling.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-foreground mb-2">Scenario A: Panic Seller</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Invests ₹10 Lakhs in a NIFTY 50 Index Fund.</li>
                    <li>Market crashes by 30% (e.g., March 2020).</li>
                    <li>Portfolio value drops to ₹7 Lakhs.</li>
                    <li><strong className="text-[#991B1B]">Action:</strong> Sells all units out of fear.</li>
                    <li><strong className="text-[#991B1B]">Result:</strong> Permanent loss of ₹3 Lakhs. Misses out on the subsequent 100% rally.</li>
                  </ul>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-foreground mb-2">Scenario B: Patient Investor</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Invests ₹10 Lakhs in a NIFTY 50 Index Fund.</li>
                    <li>Market crashes by 30%.</li>
                    <li>Portfolio value drops to ₹7 Lakhs.</li>
                    <li><strong className="text-[#059669]">Action:</strong> Holds the investment and continues SIPs.</li>
                    <li><strong className="text-[#059669]">Result:</strong> Portfolio recovers within 1.5 years and grows to ₹15 Lakhs as the market hits new highs.</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                *The above is a simplified illustration. Actual market recoveries can take longer, but historically, broad market indices have always recovered over long horizons.
              </p>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Who Should Invest and When to Exit?</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  <strong className="text-foreground">Young Professionals (20s - 30s):</strong> You have a long investment horizon. You should predominantly invest in Equity Funds (Small, Mid, and Flexi Cap). You should rarely exit, except for rebalancing or weeding out chronic underperformers. Market dips are accumulation opportunities.
                </p>
                <p>
                  <strong className="text-foreground">Middle-aged Investors (40s - 50s):</strong> Your goals (like children&apos;s education or retirement) are drawing closer. You should exit volatile equity funds 3-5 years before the goal date and move to safer debt funds.
                </p>
                <p>
                  <strong className="text-foreground">Retirees (60+):</strong> Capital preservation is key. You should exit aggressive equity funds and rely on Balanced Advantage Funds, Debt Funds, and Systematic Withdrawal Plans (SWPs) for regular income.
                </p>
              </div>
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

<section className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
                  <Info className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                <details className="group bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground">
                    Should I exit my mutual fund if it is underperforming for 6 months?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    No, a 6-month period is too short to judge an equity mutual fund&apos;s performance. You should wait for at least 18 to 24 months of consistent underperformance against its benchmark before deciding to exit.
                  </div>
                </details>

                <details className="group bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground">
                    What is the tax implication if I exit my mutual fund before 1 year?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    If you exit an equity mutual fund before 1 year, your returns are subject to Short-Term Capital Gains (STCG) tax at 20% (as per latest rules). For debt funds, the gains are added to your income and taxed as per your income tax slab regardless of the holding period.
                  </div>
                </details>

                <details className="group bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground">
                    Should I sell my mutual funds during a market crash?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    Selling during a market crash converts your notional losses into actual losses. Unless you have an immediate financial emergency, it is highly recommended to stay invested and continue your SIPs to buy units at a lower NAV, which lowers your average cost.
                  </div>
                </details>
              </div>
            </section>

          </article>
        </main>
      </div>
    </>
  );
}

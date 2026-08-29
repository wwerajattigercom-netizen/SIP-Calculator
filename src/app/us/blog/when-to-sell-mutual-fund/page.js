import React from 'react';
import { ChevronDown, Info, AlertTriangle, TrendingUp, TrendingDown, Target, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function WhenToSellMutualFundUS() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Wash-Sale Rule when selling mutual funds or ETFs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The IRS wash-sale rule prohibits you from claiming a tax deduction for a loss if you buy the same or a 'substantially identical' security within 30 days before or after the sale. To avoid this, you must wait at least 31 days to repurchase the same fund or ETF."
        }
      },
      {
        "@type": "Question",
        "name": "Should I sell my mutual fund if it underperforms for a few months?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Short-term underperformance is normal in investing. You should only consider selling an actively managed fund if it consistently underperforms its benchmark (like the S&P 500 or Russell 2000) over a 3- to 5-year period."
        }
      },
      {
        "@type": "Question",
        "name": "What is tax-loss harvesting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tax-loss harvesting is the strategy of selling securities at a loss to offset capital gains tax liabilities. You can use these losses to offset other capital gains, and up to $3,000 of ordinary income per year."
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
              { label: 'Home', href: '/us' },
              { label: 'Blog', href: '/us/blog' },
              { label: 'When to Sell a Mutual Fund or ETF', href: '/us/blog/when-to-sell-mutual-fund' },
            ]}
          /><div className="mt-6 mb-10">
            <h1
              className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 mt-6">When to Sell a Mutual Fund or ETF in the US (Complete Guide)
                            </h1>
            <p
              className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">Knowing exactly when to sell a mutual fund or ETF is critical for long-term wealth building in the US. Discover when to sell for tax-loss harvesting, how to spot style drift, managing retirement glide paths, and navigating IRS wash-sale rules without panic selling.
                            </p>
            <div className="flex items-center gap-3 mb-8"><div
                className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold text-sm">R
                            </div><div><p className="text-sm font-semibold text-foreground">Written by Rajat</p><p className="text-xs text-gray-500 dark:text-gray-400">Personal Finance Expert • 8 min read</p></div></div>
          </div>

          <article>
            <div className="mb-12">


            </div>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. The Art of Holding vs. Selling</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  In the United States, Vanguard and Fidelity index funds have popularized the &quot;buy and hold&quot; approach to investing. While index funds and ETFs are excellent for long-term compounding, holding onto an actively managed mutual fund or a poorly constructed ETF indefinitely can severely damage your portfolio returns.
                </p>
                <p>
                  Many retail investors hold onto chronic underperformers hoping they will &quot;bounce back,&quot; or worse, they panic sell their broad-market S&P 500 ETFs during temporary market corrections. Both mistakes can delay retirement by years. 
                </p>
                <p>
                  In this definitive guide, we will analyze valid reasons for selling a mutual fund or ETF, how to optimize your taxes when selling, and when you should simply stay the course.
                </p>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Valid Reasons to Sell Your Funds</h2>
              
              <div className="space-y-6">
                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingDown className="w-6 h-6 text-[#991B1B]" />
                    <h3 className="text-xl font-bold text-foreground">Tax-Loss Harvesting</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    In a taxable brokerage account, you can intentionally sell a mutual fund or ETF that has lost value to realize a capital loss. This strategy, known as Tax-Loss Harvesting, allows you to use those losses to offset capital gains realized elsewhere in your portfolio. If your losses exceed your gains, you can apply up to <strong className="text-[#059669]">$3,000</strong> per year against your ordinary income.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    After selling, you can buy a similar (but not identical) fund to maintain your market exposure. However, you must carefully navigate the IRS wash-sale rule to ensure the loss is deductible.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-[#059669]" />
                    <h3 className="text-xl font-bold text-foreground">Portfolio Rebalancing & Glide Paths</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    As you age and approach retirement, your risk tolerance naturally decreases. This transition is known as a &quot;glide path.&quot; If you are 30 years old, a portfolio of 90% equities and 10% bonds is appropriate. By the time you are 60, you might want 60% equities and 40% bonds.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    To maintain this glide path, you will periodically need to sell some of your equity mutual funds or ETFs (which have likely appreciated) and buy bond funds or fixed-income ETFs. This forces you to &quot;sell high&quot; and lock in gains.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">Style Drift and Manager Changes</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;Style Drift&quot; occurs when an actively managed mutual fund diverges from its stated investment objective. For example, if you bought a Small-Cap Value fund, but the manager starts buying Large-Cap Growth tech stocks to chase performance, the fund no longer serves its intended purpose in your diversified portfolio.
                    <br/><br/>
                    Additionally, if a star manager leaves a fund, or the fund company is acquired, the new management might underperform. If style drift or poor new management persists for over a year, it is a clear signal to sell.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">High Fees (Expense Ratios)</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you realize you are paying a 1.5% expense ratio for an actively managed mutual fund that consistently fails to beat its benchmark index, you should sell it. You can move the capital into a broad-market ETF (like VOO or VTI) that charges a fraction of a percent (e.g., 0.03%), saving you tens of thousands of dollars over a lifetime.
                  </p>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-[#1B3A5C]" />
                    <h3 className="text-xl font-bold text-foreground">Consolidating a Cluttered Portfolio</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Over time, many investors accumulate a hodgepodge of 10 to 20 different mutual funds and ETFs. Often, these funds have massive overlap—for instance, owning three different Large-Cap Growth funds that all have Apple and Microsoft as their top holdings. This does not reduce risk; it simply makes your portfolio impossible to track and increases your aggregate expense ratio. Selling redundant funds to consolidate your holdings into a streamlined, 3-Fund or 4-Fund Portfolio (e.g., a Total US Stock Market ETF, a Total International ETF, and a Bond ETF) is a highly recommended reason to exit.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. When NOT to Sell Your Mutual Funds or ETFs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#991B1B] mb-2">During Bear Markets (Panic Selling)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When the S&P 500 drops 20% or more, many investors panic and sell everything. This is a catastrophic mistake. Selling during a crash locks in your losses. Historically, the US stock market has always recovered and reached new all-time highs. Instead of selling, you should ideally be buying more at discounted prices.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">After a Few Months of Underperformance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Do not sell an actively managed fund or a thematic ETF just because it underperformed for two quarters. Different investment styles (Value vs. Growth) go in and out of favor. Give the fund 3 to 5 years to prove its merit against its specific benchmark.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Chasing Past Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Do not sell your diversified S&P 500 ETF to buy last year&apos;s hottest sector ETF. Mean reversion often ensures that last year&apos;s big winners become next year&apos;s losers. Stick to your long-term asset allocation plan.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Just Because It Hit a Target Price</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    If you bought an ETF at $100 and it hits $200, don&apos;t sell it just because &quot;it doubled.&quot; If the underlying index is strong and your retirement is decades away, let your winners run.
                  </p>
                </div>
                <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
                  <h3 className="font-bold text-[#1B3A5C] mb-2">Reacting to Geopolitical News</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Financial media constantly highlights political elections, inflation reports, or international conflicts as reasons the stock market will crash. Selling your broad-market ETFs based on news headlines is market timing, which study after study shows retail investors fail at. By the time the news is published, the market has usually already priced it in. Stick to your long-term plan and let the compounding engine run.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">4. Taxes and the IRS Wash-Sale Rule</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Selling in a taxable brokerage account triggers tax events. It is vital to understand the difference between Short-Term and Long-Term Capital Gains, and the dreaded Wash-Sale Rule.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-accent)] bg-opacity-10">
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Holding Period</th>
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Tax Classification</th>
                      <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-foreground">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-gray-600 dark:text-gray-300">1 Year or Less</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Short-Term Capital Gains</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Taxed at your ordinary income tax bracket (up to <strong className="text-[#991B1B]">37%</strong>)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5">
                      <td className="p-4 text-gray-600 dark:text-gray-300">More than 1 Year</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Long-Term Capital Gains</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Favorable rates: <strong className="text-[#059669]">0%, 15%, or 20%</strong> (depending on income)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-1">Beware of the Wash-Sale Rule</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  If you sell a mutual fund or ETF at a loss for tax purposes, you CANNOT buy a &quot;substantially identical&quot; security within 30 days before or after the sale. If you do, the IRS disallows the loss deduction. To stay safe, you can harvest a loss on an S&P 500 ETF and temporarily park the money in a Russell 1000 ETF for 31 days.
                </p>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Historical Return Scenarios: Holding vs Panic Selling</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Consider this scenario based on a major US market crash (like the 2008 Financial Crisis or 2020 COVID crash).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-foreground mb-2">Scenario A: The Panic Seller</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Invests $100,000 in an S&P 500 ETF.</li>
                    <li>Market crashes by 30%.</li>
                    <li>Portfolio value drops to $70,000.</li>
                    <li><strong className="text-[#991B1B]">Action:</strong> Sells to &quot;stop the bleeding&quot; and moves to cash.</li>
                    <li><strong className="text-[#991B1B]">Result:</strong> Locks in a $30,000 loss. Misses the massive V-shaped recovery in the following years.</li>
                  </ul>
                </div>

                <div className="bg-[var(--background)] p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold text-foreground mb-2">Scenario B: The Steadfast Investor</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Invests $100,000 in an S&P 500 ETF.</li>
                    <li>Market crashes by 30%.</li>
                    <li>Portfolio value drops to $70,000.</li>
                    <li><strong className="text-[#059669]">Action:</strong> Holds steady, ignores the noise, and continues 401(k) contributions.</li>
                    <li><strong className="text-[#059669]">Result:</strong> Portfolio fully recovers and grows to $200,000+ as the market hits new all-time highs over the next decade.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Who Should Invest and When to Sell?</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  <strong className="text-foreground">Young Investors (20s - 30s):</strong> Your timeline is massive. Focus on broad-market ETFs (like VOO or VTI). Do not sell during market corrections. Only sell to harvest tax losses or to get rid of high-fee mutual funds in favor of low-cost index funds.
                </p>
                <p>
                  <strong className="text-foreground">Pre-Retirees (50s):</strong> You are entering the &quot;wealth preservation&quot; phase. Start selling a portion of your equities to buy bonds or fixed-income ETFs to reduce portfolio volatility just before retirement.
                </p>
                <p>
                  <strong className="text-foreground">Retirees (60+):</strong> You are in the distribution phase. You will systematically sell funds to cover living expenses, ideally drawing from bonds during bear markets and equities during bull markets to avoid Sequence of Returns Risk.
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
              <Link href="/us/dca-calculator" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[#152e4d] transition-all shadow-md text-center">
                DCA Calculator
              </Link>
              <Link href="/us/lumpsum-calculator" className="px-6 py-3 bg-white dark:bg-gray-800 text-[var(--color-accent)] font-semibold rounded-xl border border-[var(--color-accent)] hover:bg-gray-50 transition-all text-center">
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
                    What is the Wash-Sale Rule when selling mutual funds or ETFs?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    The IRS wash-sale rule prohibits you from claiming a tax deduction for a loss if you buy the same or a &quot;substantially identical&quot; security within 30 days before or after the sale. To avoid this, you must wait at least 31 days to repurchase the same fund or ETF.
                  </div>
                </details>

                <details className="group bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground">
                    Should I sell my mutual fund if it underperforms for a few months?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    No. Short-term underperformance is normal in investing. You should only consider selling an actively managed fund if it consistently underperforms its benchmark (like the S&P 500 or Russell 2000) over a 3- to 5-year period.
                  </div>
                </details>

                <details className="group bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground">
                    What is tax-loss harvesting?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:-rotate-180 text-gray-500" />
                  </summary>
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    Tax-loss harvesting is the strategy of selling securities at a loss to offset capital gains tax liabilities. You can use these losses to offset other capital gains, and up to $3,000 of ordinary income per year.
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

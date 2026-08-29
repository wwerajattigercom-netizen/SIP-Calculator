import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Scale, IndianRupee, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function DirectVsRegularPlan() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between no-load and load mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No-load funds do not charge a sales commission when you buy or sell shares. Load funds charge a front-end load (when you buy, typically 3-6%) or a back-end load (when you sell). Both invest in the same types of assets, but load funds eat into your returns due to the commission."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a 1% expense ratio difference cost over 30 years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On a $500/month DCA over 30 years at 10% annual return, a 1% expense ratio difference results in approximately $165,000 less wealth. The higher-fee fund effectively takes money from your retirement to pay advisors and fund managers."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use a financial advisor or invest directly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you need personalized financial planning, tax optimization, or behavioral coaching during market crashes, a fee-only advisor (who charges a flat fee, not commissions) can be worth it. If you are comfortable picking low-cost index funds yourself, investing directly through Vanguard, Fidelity, or Schwab saves you thousands in fees."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good expense ratio for a mutual fund or ETF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For passively managed index funds and ETFs, an expense ratio below 0.10% is excellent (many S&P 500 index funds charge 0.03%). For actively managed funds, anything below 0.50% is reasonable. Avoid funds charging over 1.0% unless they consistently outperform their benchmark after fees."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'Direct vs Regular Plan' }]} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <header className="mb-10 mt-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            Low-Cost vs High-Fee Funds: The 1% That Costs You $165,000
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>By StepupCalculator</span>
            <span>&bull;</span>
            <span>7 min read</span>
          </div>
        </header>

        <article className="space-y-8">

          {/* Hook */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#991B1B]">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-[#991B1B] flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed m-0 font-medium">
                  Every year, millions of investors silently lose <strong>0.5% to 1.5%</strong> of their returns to fund management fees and advisor commissions. Over 30 years, this invisible fee can cost you <strong className="text-[#991B1B] dark:text-red-400">$100,000 to $200,000+</strong> on a simple $500/month investment.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-3 m-0">
                  The difference between a 0.03% S&amp;P 500 index fund and a 1.0% actively managed fund is staggering over a lifetime. Here is exactly how expense ratios destroy wealth and what to do about it.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              No-Load Index Fund vs Load/High-Fee Fund
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Think of expense ratios as a <strong>silent tax</strong> on your investments. Even a small percentage adds up dramatically over decades.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-3 font-semibold text-foreground">Feature</th>
                    <th className="py-3 font-semibold text-[#059669]">Low-Cost Index Fund</th>
                    <th className="py-3 font-semibold text-[#991B1B]">High-Fee Active Fund</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Expense Ratio</td>
                    <td className="py-3 font-bold text-[#059669]">0.03% - 0.20%</td>
                    <td className="py-3 font-bold text-[#991B1B]">0.80% - 2.00%</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Sales Load</td>
                    <td className="py-3 font-medium text-[#059669]">None (No-load)</td>
                    <td className="py-3 font-medium text-[#991B1B]">3% - 6% front-end load</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Example Funds</td>
                    <td className="py-3 font-medium">VTI, VOO, FXAIX (Vanguard, Fidelity)</td>
                    <td className="py-3 font-medium">Advisor-sold funds (e.g. Class A shares)</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 dark:text-gray-300">Beat the Market?</td>
                    <td className="py-3 font-medium">Matches the market</td>
                    <td className="py-3 font-medium">~90% fail to beat index after fees</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The Math */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-t-4 border-[#991B1B] shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">The True Cost: $500/Month Over 30 Years</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Let&apos;s say you invest <strong>$500/month via DCA</strong> for 30 years. The market returns 10% per year. But your fund charges 1% more in fees:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-5 rounded-xl text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-1">Low-Cost Fund (10% return)</p>
                <p className="text-3xl font-extrabold text-[#059669]">$1,130,244</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total corpus after 30 years</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-5 rounded-xl text-center">
                <p className="text-sm text-red-700 dark:text-red-400 font-semibold mb-1">High-Fee Fund (9% effective)</p>
                <p className="text-3xl font-extrabold text-[#991B1B]">$965,473</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total corpus after 30 years</p>
              </div>
            </div>

            <div className="bg-[#991B1B]/5 dark:bg-red-900/10 border border-[#991B1B]/20 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 m-0">
                You lost <strong className="text-[#991B1B] dark:text-red-400 text-xl">$164,771</strong> to fees &mdash; on the <em>same</em> market, with the <em>same</em> risk.
              </p>
            </div>
          </div>

          {/* When advisors are worth it */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#C4993C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#C4993C]" />
              When Paying for Advice is Worth It
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Not all financial advice is bad. A good <strong>fee-only fiduciary advisor</strong> (one who charges a flat fee, not commissions) can be worth it if:
            </p>
            <div className="grid gap-3">
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>Tax optimization</strong> &mdash; They help with Roth conversions, tax-loss harvesting, and asset location across 401(k)/IRA/taxable accounts.</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>Behavioral coaching</strong> &mdash; They stop you from selling during market crashes. Studies show the average DIY investor underperforms by 1-2% due to panic selling.</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>Estate and retirement planning</strong> &mdash; Complex situations involving Social Security timing, Medicare, and estate tax strategies genuinely require expertise.</p>
              </div>
            </div>
          </div>

          {/* How to switch */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              How to Switch to Low-Cost Funds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">1</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Open a Vanguard/Fidelity/Schwab account</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">These brokerages offer thousands of no-load index funds and ETFs with expense ratios as low as 0.03%.</p>
                </div>
              </div>
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">2</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Redirect new contributions</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Set up your 401(k) and IRA contributions to go into low-cost index funds. Check if your employer plan offers an S&amp;P 500 or total market index option.</p>
                </div>
              </div>
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">3</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Gradually sell high-fee holdings</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">In taxable accounts, sell in batches to manage capital gains tax. In IRAs/401(k)s, you can switch immediately with no tax impact.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  What is a good expense ratio?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  For index funds/ETFs: below 0.10% is excellent. Many S&amp;P 500 funds charge 0.03%. For actively managed funds: below 0.50% is reasonable. Anything above 1.0% should be heavily scrutinized.
                </div>
              </details>
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  Do actively managed funds beat index funds?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  According to the SPIVA scorecard, approximately 90% of actively managed large-cap funds fail to beat the S&amp;P 500 over a 15-year period after fees. The odds are overwhelmingly in favor of low-cost index investing.
                </div>
              </details>
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  Should I use a robo-advisor instead?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  Robo-advisors like Betterment or Wealthfront charge 0.25% and handle rebalancing and tax-loss harvesting automatically. They are a great middle ground between DIY investing and paying 1%+ to a human advisor. However, if you are comfortable managing a simple 3-fund portfolio yourself, you can save even that 0.25%.
                </div>
              </details>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 sm:p-12 text-center rounded-3xl border-t-4 border-[var(--color-accent)] shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">See the Exact Impact on Your DCA</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Use our DCA Calculator to compare how much more wealth you build at 10% (low-cost) vs 9% (high-fee) over your investment horizon.
            </p>
            <Link href="/us/dca-calculator" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Open DCA Calculator <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}

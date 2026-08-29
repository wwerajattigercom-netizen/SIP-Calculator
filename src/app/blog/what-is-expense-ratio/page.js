import React from 'react';
import Link from 'next/link';
import { Info, Calculator, TrendingUp, AlertTriangle, ShieldCheck, PieChart, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ExpenseRatioIndiaGuide() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often is the expense ratio deducted from my mutual fund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The expense ratio is deducted on a daily basis. The Asset Management Company (AMC) calculates the annual fee, divides it by 365 (or 366 in a leap year), and deducts this tiny fraction from the fund's total assets before declaring the daily Net Asset Value (NAV)."
        }
      },
      {
        "@type": "Question",
        "name": "Is the expense ratio deducted from my bank account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, the expense ratio is never deducted directly from your bank account or your invested capital. It is automatically adjusted within the Net Asset Value (NAV) of the mutual fund. The NAV you see and track already has the expense ratio accounted for."
        }
      },
      {
        "@type": "Question",
        "name": "What is the SEBI maximum limit for expense ratios in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEBI has mandated that the maximum Total Expense Ratio (TER) an equity mutual fund can charge is 2.25%, and for a debt mutual fund, it is 2.00%. However, as the Asset Under Management (AUM) of the fund increases, the maximum allowable limit decreases in a tiered manner."
        }
      },
      {
        "@type": "Question",
        "name": "Why do regular plans have higher expense ratios than direct plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular plans have a higher expense ratio because they include distributor commissions and broker fees. When you invest through a broker or a bank, the AMC pays them a trailing commission every year, which is recovered from your investment via the higher expense ratio. Direct plans bypass the middleman, hence they are cheaper."
        }
      },
      {
        "@type": "Question",
        "name": "Does a higher expense ratio mean better fund performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. There is no evidence suggesting that mutual funds with higher expense ratios generate better returns. In fact, a high expense ratio acts as a drag on your compounding over the long term. Many low-cost index funds often outperform expensive actively managed funds over a 10 to 15-year horizon."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'What is Expense Ratio', href: '/blog/what-is-expense-ratio' }]} />

        <div className="mt-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            What is Expense Ratio in Mutual Funds? SEBI Limits, Calculation, & Impact
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            When you invest in a mutual fund in India, the Asset Management Company (AMC) charges a fee for managing your money. This fee is known as the Total Expense Ratio (TER). While it might seem like a tiny percentage, a high expense ratio can silently eat away a massive chunk of your wealth over a 15 to 20-year investing journey.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">What Exactly is a Mutual Fund Expense Ratio?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Running a mutual fund requires significant resources. The AMC has to pay salaries to expert fund managers, research analysts, and administrative staff. They also incur costs for marketing, auditing, legal compliance, and distributor commissions. The Total Expense Ratio (TER) is the percentage of the fund&apos;s total assets that is used to cover these operational costs.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            For example, if you invest ₹1,00,000 in a mutual fund that has an expense ratio of 1.5%, it means you are paying ₹1,500 per year to the AMC to manage your money. This fee is charged regardless of whether the fund makes a profit or a loss during that year.
          </p>
          <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm mt-6 flex gap-4">
            <Info className="w-6 h-6 text-[#1B3A5C] flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">Important Note on NAV Calculation</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You never have to manually pay the expense ratio. The daily Net Asset Value (NAV) that you see on your mutual fund tracking apps is <strong>already net of the expense ratio</strong>. The AMC deducts a tiny fraction of the annual fee every single day before publishing the closing NAV.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Components of the Total Expense Ratio (TER)</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            The TER is not just the fund manager&apos;s salary. It is an umbrella term that includes several different operational costs required to keep the mutual fund compliant and functioning efficiently in the Indian market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#059669]" /> Management Fees
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is the fee paid to the investment experts who actively research companies, study market trends, and make decisions on buying or selling stocks. Actively managed equity funds have higher management fees compared to passive index funds because they require more human intervention and active research.
              </p>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#C4993C]" /> Administrative Costs
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A mutual fund serves lakhs of retail investors. Administrative costs cover customer service, maintaining records, sending out account statements, registrar and transfer agent (RTA) fees (like CAMS or KFintech), and legal and auditing expenses required by the Securities and Exchange Board of India (SEBI).
              </p>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#1B3A5C]" /> Distribution & Marketing Fees
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If you buy a &quot;Regular Plan&quot; mutual fund through a broker, agent, or bank, the AMC pays them a recurring commission for bringing in your business. This commission is strictly recovered from you via a higher expense ratio. Direct plans do not have this fee.
              </p>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#991B1B]" /> Goods & Services Tax (GST)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                In India, an 18% GST is levied on the management fee portion of the mutual fund. This tax is completely passed on to the investors and is included within the Total Expense Ratio that is declared by the AMC.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">SEBI Maximum Limits for Expense Ratios</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            To protect retail investors from being overcharged by greedy AMCs, the Securities and Exchange Board of India (SEBI) has set strict maximum limits on how much a mutual fund can charge. These limits follow a tiered structure: as the fund becomes larger (higher Assets Under Management or AUM), the maximum allowable expense ratio decreases. This allows investors to benefit from economies of scale.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Assets Under Management (AUM)</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Max TER for Equity Funds</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Max TER for Debt Funds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-[var(--background)]">
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">First ₹500 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">2.25%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">2.00%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Next ₹250 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">2.00%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.75%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Next ₹1,250 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.75%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.50%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Next ₹3,000 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.60%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.35%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Next ₹5,000 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.50%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.25%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Above ₹50,000 Crores</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">1.05%</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">0.80%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            *Note: Index Funds and Exchange Traded Funds (ETFs) have a flat maximum SEBI limit of 1.00%, though practically most Indian index funds operate between 0.10% and 0.40% TER.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Direct vs Regular Plans: The Hidden Wealth Killer</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Every mutual fund in India is available in two variants: a <strong>Direct Plan</strong> and a <strong>Regular Plan</strong>. The underlying portfolio of stocks, the fund manager, and the investment strategy are exactly the same. The only difference is the expense ratio.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#059669] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Direct Plans:</strong> You buy these directly from the AMC or via modern discount broking platforms (like Zerodha Coin, Groww, or Kuvera). Because there is no middleman broker involved, there are no commissions paid. Thus, the expense ratio is much lower (usually between 0.3% to 1.0%).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#991B1B] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Regular Plans:</strong> You buy these through a bank relationship manager, a local distributor, or an agent. The AMC pays this agent a trailing commission of roughly 0.5% to 1.0% every single year for as long as you stay invested. This cost is pushed onto you, pushing the TER up to 1.5% to 2.2%.
              </div>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mb-4">The Long-Term Impact of a 1% Difference</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Let&apos;s look at a mathematical scenario. Suppose you invest ₹10,000 per month via a Systematic Investment Plan (SIP) for 25 years. The underlying stocks generate a gross return of 13% per annum.
          </p>
          <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5">
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-300">Total Invested Amount over 25 Years</span>
                <span className="font-bold text-[#1F2937] dark:text-white">₹30,00,000</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-300">Regular Plan Final Value (Returns: 11.5% net of 1.5% TER)</span>
                <span className="font-bold text-[#1B3A5C]">₹1.59 Crores</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-300">Direct Plan Final Value (Returns: 12.5% net of 0.5% TER)</span>
                <span className="font-bold text-[#059669]">₹1.89 Crores</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 dark:text-gray-200">The Cost of Ignorance (Wealth Lost to Middleman)</span>
                <span className="font-extrabold text-[#991B1B]">₹30 Lakhs!</span>
              </li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Because of compounding, a seemingly harmless 1% extra fee ends up consuming over <strong>₹30 Lakhs</strong> of your hard-earned wealth. This is exactly why financially aware investors strictly choose Direct Mutual Funds over Regular ones.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">How is the Expense Ratio Deducted?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            One of the biggest misconceptions among new investors is expecting a yearly bill from the mutual fund asking them to pay the expense ratio. It doesn&apos;t work like that. The deduction is entirely automated, silent, and spread out across the year.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            The fee is calculated and deducted on a <strong>daily basis</strong> before the Net Asset Value (NAV) is published at the end of the market day. The formula used by AMCs looks like this:
          </p>
          <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 font-mono text-sm text-center mb-6">
            Daily Expense = (Total Assets * Annual Expense Ratio) / 365
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For instance, if a fund has an AUM of ₹1,000 crores and an annual expense ratio of 1.5%, the total yearly expense is ₹15 crores. Divided by 365 days, the AMC silently deducts roughly ₹4,10,958 from the total pool of assets every single day before finalizing the NAV per unit. Therefore, the return percentages you see on mutual fund tracking platforms are exactly what you get—the fees have already been taken out.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Does a High Expense Ratio Guarantee Higher Returns?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Many investors fall into the trap of thinking, &quot;If I pay a higher fee, I will get premium fund management and higher returns.&quot; However, historical data in the Indian stock market proves the exact opposite.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            In the large-cap segment (the top 100 companies in India), it has become incredibly difficult for highly-paid active fund managers to beat the benchmark Nifty 50 index consistently. According to SPIVA (S&amp;P Indices Versus Active) scorecards, over an extended 10-year period, more than 60% of active large-cap funds underperform their benchmark. 
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            In such scenarios, paying a 1.5% expense ratio for an active fund that fails to beat the index is wealth destruction. This is why <strong>Index Funds</strong> have become highly popular. A Nifty 50 Index fund simply copies the market without needing expensive analysts, keeping its expense ratio as low as 0.10% to 0.20%. You get market-matching returns with virtually no fee drag.
          </p>
        </div>

        {/* ── FAQ SECTION ── */}
        
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

<section id="faq" className="mt-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            
            <details className="glass-panel p-5 rounded-2xl group cursor-pointer">
              <summary className="text-lg font-semibold text-foreground list-none flex justify-between items-center">
                How often is the expense ratio deducted from my mutual fund?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                The expense ratio is deducted on a daily basis. The Asset Management Company (AMC) calculates the annual fee, divides it by 365 (or 366 in a leap year), and deducts this tiny fraction from the fund&apos;s total assets before declaring the daily Net Asset Value (NAV).
              </p>
            </details>

            <details className="glass-panel p-5 rounded-2xl group cursor-pointer">
              <summary className="text-lg font-semibold text-foreground list-none flex justify-between items-center">
                Is the expense ratio deducted from my bank account?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                No, the expense ratio is never deducted directly from your bank account or your invested capital. It is automatically adjusted within the Net Asset Value (NAV) of the mutual fund. The NAV you see and track already has the expense ratio accounted for.
              </p>
            </details>

            <details className="glass-panel p-5 rounded-2xl group cursor-pointer">
              <summary className="text-lg font-semibold text-foreground list-none flex justify-between items-center">
                What is the SEBI maximum limit for expense ratios in India?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                SEBI has mandated that the maximum Total Expense Ratio (TER) an equity mutual fund can charge is 2.25%, and for a debt mutual fund, it is 2.00%. However, as the Asset Under Management (AUM) of the fund increases, the maximum allowable limit decreases in a tiered manner.
              </p>
            </details>

            <details className="glass-panel p-5 rounded-2xl group cursor-pointer">
              <summary className="text-lg font-semibold text-foreground list-none flex justify-between items-center">
                Why do regular plans have higher expense ratios than direct plans?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Regular plans have a higher expense ratio because they include distributor commissions and broker fees. When you invest through a broker or a bank, the AMC pays them a trailing commission every year, which is recovered from your investment via the higher expense ratio. Direct plans bypass the middleman, hence they are cheaper.
              </p>
            </details>

            <details className="glass-panel p-5 rounded-2xl group cursor-pointer">
              <summary className="text-lg font-semibold text-foreground list-none flex justify-between items-center">
                Does a higher expense ratio mean better fund performance?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                No. There is no evidence suggesting that mutual funds with higher expense ratios generate better returns. In fact, a high expense ratio acts as a drag on your compounding over the long term. Many low-cost index funds often outperform expensive actively managed funds over a 10 to 15-year horizon.
              </p>
            </details>

          </div>
        </section>

      </div>
    </div>
  );
}

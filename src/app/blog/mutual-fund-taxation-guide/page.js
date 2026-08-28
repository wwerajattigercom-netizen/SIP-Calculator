import Breadcrumb from '@/components/Breadcrumb';
import { Info, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MutualFundTaxationIN() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the STCG and LTCG tax rate on equity mutual funds in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Short-Term Capital Gains (STCG) on equity mutual funds is taxed at a flat rate of 20%. Long-Term Capital Gains (LTCG) is taxed at 12.5% on gains exceeding ₹1.25 Lakhs per financial year.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are debt mutual funds taxed now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debt mutual funds (holding less than 35% domestic equity) are taxed entirely according to your income tax slab rate, regardless of the holding period. The distinction between short-term and long-term capital gains has been removed for these funds, and the indexation benefit is no longer available.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the holding period to qualify for LTCG in equity funds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For equity mutual funds, the holding period to qualify for Long-Term Capital Gains (LTCG) is 12 months (1 year). Any units sold before 12 months attract Short-Term Capital Gains (STCG) tax.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the ₹1.25 Lakh exemption available on debt funds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, the ₹1.25 Lakh exemption limit applies exclusively to Long-Term Capital Gains (LTCG) from equity-oriented mutual funds and direct equity shares. It does not apply to debt mutual funds.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: 'Mutual Fund Taxation Guide' },
          ]}
        />

        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            The Ultimate Guide to Mutual Fund Taxation in India (2026 Updated)
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive, deep-dive guide into the latest taxation rules for Equity, Debt, and Hybrid Mutual Funds. Learn exactly how your STCG and LTCG returns are taxed to maximize your take-home wealth.
          </p>
        </div>

        {/* Intro */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 text-foreground leading-relaxed">
          <p>
            When investing in mutual funds through a <Link href="/tools/sip-calculator" className="text-[var(--color-accent)] hover:underline">Systematic Investment Plan (SIP)</Link> or lumpsum, calculating your projected returns is only half the battle. The other half is understanding the complex landscape of mutual fund taxation. Your ultimate take-home corpus is heavily influenced by how the government taxes your gains.
          </p>
          <p>
            Recent Union Budgets introduced significant overhauls to the capital gains taxation structure in India, affecting millions of retail investors. The changes altered the dynamics of short-term capital gains (STCG), long-term capital gains (LTCG), and virtually eliminated the traditional tax benefits associated with debt mutual funds. This guide serves as an authoritative resource on how mutual fund taxation works in India in 2026.
          </p>
        </section>

        {/* Section 1: Equity Taxation */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Taxation of Equity Mutual Funds</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            Equity mutual funds are those that invest a minimum of 65% of their total assets in domestic equity shares of Indian companies. This includes Large-cap, Mid-cap, Small-cap, Flexi-cap, Multi-cap, and ELSS funds.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-semibold text-lg text-foreground mb-3">Short-Term Capital Gains (STCG)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Holding period: Less than 12 months</p>
              <div className="text-3xl font-bold text-[#991B1B] mb-2">20%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                If you sell your equity mutual fund units before completing one year from the date of purchase, the profits are classified as STCG and taxed at a flat rate of 20%, irrespective of your income tax slab.
              </p>
            </div>
            <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-semibold text-lg text-foreground mb-3">Long-Term Capital Gains (LTCG)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Holding period: 12 months or more</p>
              <div className="text-3xl font-bold text-[#059669] mb-2">12.5%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                If units are sold after 12 months, profits are LTCG. Gains up to ₹1.25 Lakhs per financial year are absolutely tax-free. Any gains exceeding ₹1.25 Lakhs are taxed at a flat rate of 12.5%.
              </p>
            </div>
          </div>

          <div className="bg-[#1B3A5C]/5 dark:bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-5 rounded-xl mt-6">
            <h4 className="font-semibold text-[#1B3A5C] dark:text-blue-300 mb-2">Example Calculation (LTCG)</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              Suppose you invested ₹5,00,000 in an equity mutual fund. After 3 years, the value grows to ₹8,00,000, and you decide to redeem the entire amount.<br/><br/>
              <strong>Total Profit:</strong> ₹8,00,000 - ₹5,00,000 = ₹3,00,000<br/>
              <strong>Tax-free Limit:</strong> ₹1,25,000<br/>
              <strong>Taxable Amount:</strong> ₹3,00,000 - ₹1,25,000 = ₹1,75,000<br/>
              <strong>Tax Payable:</strong> 12.5% of ₹1,75,000 = <span className="text-[#991B1B] font-bold">₹21,875</span>
            </p>
          </div>
        </section>

        {/* Section 2: Debt Taxation */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <AlertCircle className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Taxation of Debt Mutual Funds</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            Debt mutual funds primarily invest in fixed-income securities like government bonds, corporate bonds, treasury bills, and commercial papers. The taxation rules for these funds underwent a massive structural change recently.
          </p>
          
          <div className="bg-[#991B1B]/10 border border-[#991B1B]/20 p-5 rounded-xl mt-4">
            <h3 className="font-bold text-[#991B1B] mb-2">The End of Indexation Benefit</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              For investments made on or after April 1, 2023, in mutual funds that invest less than 35% of their assets in domestic equities, the traditional indexation benefit has been entirely abolished. Furthermore, the concept of STCG and LTCG no longer applies to these specific funds.
            </p>
          </div>

          <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>How it works now:</strong> Regardless of how long you hold your investment (whether it&apos;s 1 month, 3 years, or 10 years), all capital gains from debt funds are added directly to your taxable income and taxed according to your applicable income tax slab rate.
            </p>
            <p>
              If you fall into the highest 30% tax bracket, your debt fund gains will essentially be taxed at 30% (plus applicable surcharge and cess). This makes debt funds less attractive for HNIs (High Net-worth Individuals) looking for tax arbitrage, aligning debt fund taxation closely with traditional Fixed Deposits (FDs). 
            </p>
            <p>
              Despite this, debt funds still retain one major advantage over FDs: <strong>Tax Deferral</strong>. In an FD, interest is taxed every year on an accrual basis. In a debt fund, taxation only occurs when you actually sell (redeem) the units. This allows your money to compound faster without being interrupted by yearly tax deductions.
            </p>
          </div>
        </section>

        {/* Section 3: Hybrid & ELSS */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Hybrid Funds, ELSS, and International Funds</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Equity-Linked Savings Scheme (ELSS)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                ELSS funds are essentially equity mutual funds with a mandatory 3-year lock-in period. Investments in ELSS qualify for a tax deduction of up to ₹1.5 Lakhs under Section 80C of the Income Tax Act (applicable under the old tax regime). After the 3-year lock-in, since ELSS is an equity fund, the gains are classified as LTCG and taxed at 12.5% (above the ₹1.25 Lakh exemption limit).
              </p>
            </div>

            <hr className="border-gray-200 dark:border-gray-800" />

            <div>
              <h3 className="font-semibold text-lg text-foreground">Hybrid Funds (Balanced Advantage, Aggressive Hybrid)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                The taxation of a hybrid fund depends entirely on its equity exposure:<br/><br/>
                • <strong>More than 65% domestic equity:</strong> Taxed exactly like pure equity funds (20% STCG, 12.5% LTCG).<br/>
                • <strong>Between 35% and 65% domestic equity:</strong> Taxed as Short-Term Capital Gains (at slab rates) if sold before 3 years, and Long-Term Capital Gains (at 12.5% without indexation) if sold after 3 years.<br/>
                • <strong>Less than 35% domestic equity:</strong> Taxed exactly like debt funds (slab rate entirely).
              </p>
            </div>

            <hr className="border-gray-200 dark:border-gray-800" />

            <div>
              <h3 className="font-semibold text-lg text-foreground">International Mutual Funds & Gold ETFs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Funds that invest predominantly in foreign equities (like US tech funds) or gold do not meet the 65% domestic equity criteria. Therefore, they fall into the &quot;less than 35% domestic equity&quot; bucket. This means all gains from international mutual funds and Gold ETFs/Funds are now added to your income and taxed at your applicable slab rate, regardless of the holding period.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Tax-Loss Harvesting */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 bg-[#059669]/5 border-[#059669]/20">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-foreground">Pro Strategy: Tax-Loss Harvesting</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Tax-loss harvesting is a legal strategy used by sophisticated investors to reduce their capital gains tax liability. It involves intentionally selling mutual fund units that are experiencing a loss to offset the taxes generated by units that are sold at a profit.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
            <li><strong>Short-Term Capital Loss (STCL)</strong> can be set off against both Short-Term Capital Gains (STCG) and Long-Term Capital Gains (LTCG).</li>
            <li><strong>Long-Term Capital Loss (LTCL)</strong> can ONLY be set off against Long-Term Capital Gains (LTCG).</li>
            <li>If your capital losses exceed your capital gains for the year, you can carry forward the unadjusted losses for up to <strong>8 assessment years</strong> to offset against future gains.</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Additionally, investors often practice &quot;LTCG Harvesting.&quot; Since ₹1.25 Lakhs of LTCG is tax-free every year, investors can strategically redeem and reinvest units to book ₹1.25 Lakhs of profit annually, resetting their purchase price (grandfathering) and saving taxes in the long run.
          </p>
        </section>

        {/* Section 5: Dividends */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Taxation on Mutual Fund Dividends (IDCW)</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Many investors choose the IDCW (Income Distribution cum Capital Withdrawal) option, formerly known as the dividend option. 
            Before 2020, dividends were tax-free in the hands of the investor (though the fund house paid a Dividend Distribution Tax).
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Currently, all dividends received from any type of mutual fund (equity or debt) are added to your total taxable income and taxed according to your applicable income tax slab rate. Additionally, if the total dividend amount exceeds ₹5,000 in a financial year, the Mutual Fund House (AMC) will deduct a 10% TDS (Tax Deducted at Source) before paying out the dividend.
          </p>
        </section>

        {/* Section Extra: Deep Dive into Tax Planning */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Advanced Tax Planning &amp; Grandfathering Strategies</h2>
          <p className="text-gray-600 dark:text-gray-300">
            For investors with significant equity portfolios, minimizing the impact of the 12.5% Long-Term Capital Gains (LTCG) tax is a priority. One of the most effective ways to do this is by systematically realizing gains up to the ₹1.25 Lakhs tax-free limit every financial year. This process, often referred to as tax-gain harvesting, involves selling just enough units to book a profit of exactly ₹1.25 Lakhs and immediately reinvesting the proceeds into the same or a similar fund. This step artificially resets your purchase price (or cost basis) to a higher level, meaning future gains will be calculated from this new, higher amount, effectively saving you 12.5% on that ₹1.25 Lakhs every year. Over decades, this strategy can save lakhs in taxes and compound your net returns significantly.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Furthermore, the concept of &quot;grandfathering&quot; is crucial for older investments. When the LTCG tax on equity was reintroduced in 2018, the government allowed investors to protect gains made up to January 31, 2018. If you bought equity mutual funds before this date, your purchase price for tax calculation is considered to be either the actual purchase price or the Net Asset Value (NAV) as of January 31, 2018, whichever is higher (subject to the actual sale price). This means any growth that occurred before this cut-off date remains permanently tax-free. Understanding and applying this grandfathering clause is essential when calculating taxes on legacy portfolios that have been held for many years. Neglecting this could result in overpaying substantial amounts of tax.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Another important consideration is the taxation of Systematic Investment Plans (SIPs). Unlike lumpsum investments where a single date of purchase is recorded, every individual SIP installment is treated as a separate investment with its own unique purchase date. Therefore, when you redeem units from a fund you have been investing in via SIP, the holding period for each unit is calculated from the date that specific unit was allotted. The mutual fund follows the First-In-First-Out (FIFO) method for redemptions. This means the units bought first (oldest units) are assumed to be sold first. If you started an SIP 15 months ago, only the units purchased in the first 3 months would qualify for the Long-Term Capital Gains (LTCG) tax rate, while the units purchased in the last 12 months would attract the higher 20% Short-Term Capital Gains (STCG) tax rate. Keeping track of SIP purchase dates is vital before initiating large redemptions to avoid unexpected STCG tax liabilities.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Finally, it is worth discussing the taxation of index funds versus actively managed funds. While the fundamental tax rates (20% STCG and 12.5% LTCG) apply equally to both categories as long as they meet the 65% domestic equity criteria, index funds tend to be inherently more tax-efficient in the long run. This is because active fund managers frequently buy and sell stocks within the portfolio to beat the market, which can generate internal capital gains that the fund must distribute to investors. Index funds, however, simply track a benchmark and have much lower portfolio turnover, resulting in fewer taxable events. When compounded over a 20- or 30-year investment horizon, the lower tax drag of index funds can meaningfully enhance your final take-home wealth.
          </p>
        </section>

        {/* FAQ with Schema */}
        
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

<section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <div className="space-y-4 mt-6">
            <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-foreground">
                What is the STCG and LTCG tax rate on equity mutual funds in 2026?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Short-Term Capital Gains (STCG) on equity mutual funds is taxed at a flat rate of 20%. Long-Term Capital Gains (LTCG) is taxed at 12.5% on gains exceeding ₹1.25 Lakhs per financial year.
              </p>
            </details>
            <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-foreground">
                How are debt mutual funds taxed now?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Debt mutual funds (holding less than 35% domestic equity) are taxed entirely according to your income tax slab rate, regardless of the holding period. The distinction between short-term and long-term capital gains has been removed for these funds, and the indexation benefit is no longer available.
              </p>
            </details>
            <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-foreground">
                What is the holding period to qualify for LTCG in equity funds?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                For equity mutual funds, the holding period to qualify for Long-Term Capital Gains (LTCG) is 12 months (1 year). Any units sold before 12 months attract Short-Term Capital Gains (STCG) tax.
              </p>
            </details>
            <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-foreground">
                Is the ₹1.25 Lakh exemption available on debt funds?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                No, the ₹1.25 Lakh exemption limit applies exclusively to Long-Term Capital Gains (LTCG) from equity-oriented mutual funds and direct equity shares. It does not apply to debt mutual funds.
              </p>
            </details>
          </div>
        </section>

      </div>
    </div>
  );
}

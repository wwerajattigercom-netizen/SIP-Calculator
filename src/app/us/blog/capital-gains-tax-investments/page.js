import Breadcrumb from '@/components/Breadcrumb';
import { Info, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function USCapitalGainsTax() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between short-term and long-term capital gains tax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Short-term capital gains apply to assets held for one year or less and are taxed at your ordinary income tax rates (up to 37%). Long-term capital gains apply to assets held for more than one year and benefit from lower preferential tax rates of 0%, 15%, or 20%, depending on your taxable income.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does tax-loss harvesting work in the US?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tax-loss harvesting involves selling investments at a loss to offset capital gains realized in other investments. If your losses exceed your gains, you can use up to $3,000 of the excess loss to offset ordinary income per year, and carry forward any remaining losses to future tax years.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Wash-Sale Rule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The IRS Wash-Sale Rule prohibits you from claiming a tax deduction for a loss if you buy the same or a &quot;substantially identical&quot; investment within 30 days before or after the sale. Violating this rule disallows the loss deduction and adds the loss to the cost basis of the new purchase.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are mutual fund dividends taxed even if they are reinvested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. In a taxable brokerage account, dividends distributed by a mutual fund or ETF are taxable in the year they are distributed, even if you automatically reinvest them into more shares of the fund.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/us/blog' },
            { label: 'Capital Gains Tax Guide' },
          ]}
        /><div className="mt-6 mb-10">
          <h1
            className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 mt-6">The Complete Guide to Capital Gains Tax on Mutual Funds & ETFs (2026)
                      </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">A comprehensive, deep-dive guide into US taxation for retail investors. Learn how short-term rates, long-term rates, dividend taxes, and tax-loss harvesting impact your take-home returns.
                      </p>
          <div className="flex items-center gap-3 mb-8"><div
              className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold text-sm">R
                          </div><div><p className="text-sm font-semibold text-foreground">Written by Rajat</p><p className="text-xs text-gray-500 dark:text-gray-400">Personal Finance Expert • 8 min read</p></div></div>
        </div>

        <div className="text-center space-y-4 mb-10">


        </div>

        {/* Intro */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 text-foreground leading-relaxed">
          <p>
            When investing in mutual funds or ETFs through a <Link href="/us/tools/dca-calculator" className="text-[var(--color-accent)] hover:underline">Dollar Cost Averaging (DCA)</Link> strategy, your pre-tax returns look great on a chart. But the IRS takes a slice of your profits when you sell, and the size of that slice depends entirely on how long you held the asset and your overall income level.
          </p>
          <p>
            Understanding the distinction between Short-Term Capital Gains (STCG) and Long-Term Capital Gains (LTCG) is arguably the most important tax concept for an investor. Holding an asset for 365 days versus 366 days can drastically alter your tax liability. This guide serves as an authoritative resource on how mutual fund and ETF taxation works in the United States in 2026 for standard taxable brokerage accounts. (Note: These rules do not apply to tax-advantaged retirement accounts like a <Link href="/us/tools/roth-ira-calculator" className="text-[var(--color-accent)] hover:underline">Roth IRA</Link> or 401(k), which have their own unique tax structures).
          </p>
        </section>

        {/* Section 1: Capital Gains Taxation */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Short-Term vs Long-Term Capital Gains</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            Whenever you sell shares of a mutual fund or ETF for a profit, that profit is a capital gain. The tax rate applied to that gain is determined by your "holding period"—the exact amount of time you owned the shares.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-semibold text-lg text-foreground mb-3">Short-Term Capital Gains</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Holding period: 1 year or less (≤ 365 days)</p>
              <div className="text-3xl font-bold text-[#991B1B] mb-2">10% to 37%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Short-term gains do not receive preferential tax treatment. They are added to your gross income and taxed at your ordinary federal income tax bracket. This can take a massive chunk out of your profits if you are in a high income bracket.
              </p>
            </div>
            <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5">
              <h3 className="font-semibold text-lg text-foreground mb-3">Long-Term Capital Gains</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Holding period: More than 1 year (≥ 366 days)</p>
              <div className="text-3xl font-bold text-[#059669] mb-2">0%, 15%, or 20%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The IRS rewards long-term investing. Long-term gains are taxed at significantly lower, preferential rates. Depending on your taxable income and filing status, you will pay either 0%, 15%, or 20%. The vast majority of investors fall into the 15% bracket.
              </p>
            </div>
          </div>

          <div className="bg-[#1B3A5C]/5 dark:bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 p-5 rounded-xl mt-6">
            <h4 className="font-semibold text-[#1B3A5C] dark:text-blue-300 mb-2">The 366-Day Difference: An Example</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              Suppose you are a single filer earning $150,000 a year (putting you in the 24% ordinary tax bracket). You bought $10,000 worth of an S&P 500 ETF and the value surged to $15,000.<br/><br/>
              <strong>Total Profit:</strong> $5,000<br/><br/>
              <strong>Scenario A (Sold after 11 months):</strong> Taxed as short-term. You pay 24% on the $5,000 gain = <span className="text-[#991B1B] font-bold">$1,200 in taxes</span>.<br/>
              <strong>Scenario B (Sold after 13 months):</strong> Taxed as long-term. You pay the preferential 15% rate = <span className="text-[#059669] font-bold">$750 in taxes</span>.<br/><br/>
              Just by waiting a couple more months, you saved $450.
            </p>
          </div>
        </section>

        {/* Section 2: Dividends */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <AlertCircle className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Taxation of Mutual Fund Dividends</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300">
            Many mutual funds and ETFs pay out dividends (which are distributions of the fund&apos;s earnings). It is critical to understand that <strong>dividends are taxable in the year you receive them, even if you automatically reinvest them.</strong>
          </p>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300 mt-4">
            <p>
              Dividends fall into two tax categories:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Qualified Dividends:</strong> These are paid by US corporations (or qualifying foreign entities) and must meet specific holding period requirements. Qualified dividends are taxed at the favorable long-term capital gains rates (0%, 15%, or 20%). Broad market index funds mostly distribute qualified dividends.</li>
              <li><strong>Ordinary (Non-Qualified) Dividends:</strong> These are taxed as ordinary income, at your standard marginal tax bracket. Dividends from REITs (Real Estate Investment Trusts) and interest payments from bond mutual funds generally fall into this category.</li>
            </ul>
          </div>
          
          <div className="bg-[#991B1B]/10 border border-[#991B1B]/20 p-5 rounded-xl mt-4">
            <h3 className="font-bold text-[#991B1B] mb-2">Net Investment Income Tax (NIIT)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              High earners need to be aware of the NIIT. If your Modified Adjusted Gross Income (MAGI) exceeds $200,000 for single filers or $250,000 for married couples filing jointly, you will be hit with an additional <strong>3.8% surtax</strong> on your net investment income (which includes both capital gains and dividends). This means the highest possible federal tax rate on long-term gains could actually be 23.8% (20% + 3.8%).
            </p>
          </div>
        </section>

        {/* Section 3: Tax-Loss Harvesting */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 bg-[#059669]/5 border-[#059669]/20">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-foreground">Pro Strategy: Tax-Loss Harvesting</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Tax-loss harvesting is a powerful strategy to lower your tax bill. By deliberately selling investments that are down, you realize a capital loss. The IRS allows you to use these losses to offset your capital gains.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
            <li><strong>Offsetting Gains:</strong> Losses first offset gains of the same type (short-term losses offset short-term gains, long-term losses offset long-term gains). If you have excess losses, they cross over to offset the other type.</li>
            <li><strong>Offsetting Ordinary Income:</strong> If your total losses exceed your total gains, you can use up to <strong>$3,000</strong> of the remaining loss to offset your ordinary income (like your salary), reducing your overall tax burden.</li>
            <li><strong>Carryforward:</strong> Any losses beyond that $3,000 limit can be carried forward indefinitely to future tax years.</li>
          </ul>
          
          <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mt-4 border border-[#059669]/30">
            <h4 className="font-semibold text-foreground mb-1">Beware the Wash-Sale Rule</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              The IRS won&apos;t let you sell a fund for a loss just for the tax benefit and then immediately buy it right back. The <strong>Wash-Sale Rule</strong> states that if you buy a &quot;substantially identical&quot; security within 30 days before or after the sale, the tax loss is disallowed. To circumvent this, investors often sell one index fund and buy a different, but highly correlated one (e.g., selling an S&P 500 ETF and buying a Russell 1000 ETF).
            </p>
          </div>
        </section>

        {/* Section 4: State Taxes */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Don&apos;t Forget State Taxes</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything discussed so far applies to federal taxes. However, most US states also levy their own income tax on capital gains and dividends. 
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Unlike the federal government, most states do not have special, lower rates for long-term capital gains; they tax all investment income as ordinary state income. If you live in a high-tax state like California or New York, your combined federal and state tax rate on capital gains can be substantial. On the flip side, residents of states with no income tax (like Texas, Florida, or Nevada) pay 0% in state capital gains tax.
          </p>
        </section>

        {/* Section Extra: Deep Dive into US Tax Efficiency */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Advanced Strategies for Tax-Efficient Investing</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Achieving tax efficiency in a standard brokerage account requires meticulous asset location and strategic realization of capital gains. Asset location is the practice of strategically distributing your investments across taxable and tax-advantaged accounts to minimize your overall tax burden. For instance, tax-inefficient assets like actively managed mutual funds, Real Estate Investment Trusts (REITs), and taxable bond funds generate substantial ordinary income and short-term capital gains, which are heavily taxed. These assets are best placed inside tax-deferred or tax-free accounts like a Traditional IRA, 401(k), or Roth IRA. Conversely, tax-efficient investments, such as broad-market index ETFs and municipal bond funds, are ideal for taxable brokerage accounts because they generate primarily qualified dividends and long-term capital gains, which enjoy lower preferential tax rates.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Furthermore, the distinction between mutual funds and Exchange-Traded Funds (ETFs) plays a significant role in tax efficiency. Due to their unique creation and redemption process, ETFs are inherently more tax-efficient than traditional mutual funds. When investors sell shares of a mutual fund, the fund manager often has to sell underlying securities to raise cash for the redemption, potentially triggering capital gains distributions for all remaining shareholders in the fund. This means you could owe taxes on capital gains even if you didn&apos;t sell any of your own shares. ETFs, on the other hand, utilize &quot;in-kind&quot; transfers of securities with authorized participants, largely avoiding these internal capital gains distributions. Over a long investing horizon, this structural advantage of ETFs can result in substantially higher after-tax returns compared to equivalent mutual funds.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Another critical concept for high-net-worth investors is the strategic use of charitable giving to offset capital gains. Donating appreciated securities (like stocks, ETFs, or mutual funds held for more than a year) directly to a qualified 501(c)(3) charity or a Donor-Advised Fund (DAF) offers a double tax benefit. First, you avoid paying the long-term capital gains tax on the appreciation. Second, if you itemize deductions on your tax return, you can claim a charitable deduction for the full fair market value of the asset on the date of the transfer, up to 30% of your Adjusted Gross Income (AGI). This makes donating appreciated shares significantly more tax-efficient than selling the shares, paying the capital gains tax, and donating the cash proceeds. Planning charitable contributions around your portfolio&apos;s unrealized gains is a highly effective way to manage taxation while supporting philanthropic goals.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Lastly, the concept of a &quot;step-up in basis&quot; is a foundational element of generational wealth transfer. When an investor passes away, the tax basis of their investments is automatically adjusted (stepped up) to the current fair market value on the date of death. This means that if heirs decide to sell the inherited mutual funds or ETFs immediately, they will owe absolutely zero federal capital gains tax on the appreciation that occurred during the original owner&apos;s lifetime. Because of this rule, older investors often choose to hold onto highly appreciated taxable assets rather than selling them and paying a hefty tax bill, strategically passing them on to their beneficiaries tax-free.
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
              <Link href="/us/dca-calculator" className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[#152e4d] transition-all shadow-md text-center">
                DCA Calculator
              </Link>
              <Link href="/us/lumpsum-calculator" className="px-6 py-3 bg-white dark:bg-gray-800 text-[var(--color-accent)] font-semibold rounded-xl border border-[var(--color-accent)] hover:bg-gray-50 transition-all text-center">
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
                        What is the difference between short-term and long-term capital gains tax?
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Short-term capital gains apply to assets held for one year or less and are taxed at your ordinary income tax rates (up to 37%). Long-term capital gains apply to assets held for more than one year and benefit from lower preferential tax rates of 0%, 15%, or 20%, depending on your taxable income.
                      </p>
                    </details>
                    <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
                      <summary className="flex justify-between items-center font-medium text-foreground">
                        How does tax-loss harvesting work in the US?
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Tax-loss harvesting involves selling investments at a loss to offset capital gains realized in other investments. If your losses exceed your gains, you can use up to $3,000 of the excess loss to offset ordinary income per year, and carry forward any remaining losses to future tax years.
                      </p>
                    </details>
                    <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
                      <summary className="flex justify-between items-center font-medium text-foreground">
                        What is the Wash-Sale Rule?
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        The IRS Wash-Sale Rule prohibits you from claiming a tax deduction for a loss if you buy the same or a &quot;substantially identical&quot; investment within 30 days before or after the sale. Violating this rule disallows the loss deduction and adds the loss to the cost basis of the new purchase.
                      </p>
                    </details>
                    <details className="group bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer">
                      <summary className="flex justify-between items-center font-medium text-foreground">
                        Are mutual fund dividends taxed even if they are reinvested?
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Yes. In a taxable brokerage account, dividends distributed by a mutual fund or ETF are taxable in the year they are distributed, even if you automatically reinvest them into more shares of the fund.
                      </p>
                    </details>
                  </div>
                </section>

      </div>
    </div>
  );
}

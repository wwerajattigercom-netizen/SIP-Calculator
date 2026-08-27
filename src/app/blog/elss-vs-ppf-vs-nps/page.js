import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, HelpCircle, BarChart3, Calculator, Calendar, ShieldCheck, Wallet, IndianRupee, Landmark } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "ELSS vs PPF vs NPS | Ultimate Tax Saving Guide",
  description: "Stop getting confused by Section 80C tax saving options. Learn exactly when to use ELSS, PPF, or NPS to maximize returns and save tax.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/elss-vs-ppf-vs-nps',
  }
};

const COMPARISON = [
  {
    metric: 'ELSS (Equity Linked Savings Scheme)',
    formula: 'Market-Linked Equity Returns (Typically 12-15% p.a.)',
    useFor: 'Wealth creation and beating inflation while saving tax under Section 80C. ELSS funds invest a majority of their corpus in the stock market. Because they are equity mutual funds, they carry market risk, but they have historically delivered the highest returns among all 80C options.',
    bestFor: 'Aggressive investors who have an investment horizon of 5+ years and want maximum growth. If you want your tax-saving investments to genuinely create wealth, ELSS is the only instrument that gives you high exposure to equities.',
    limitation: 'High volatility and market risk. There is no guaranteed return. If the market crashes when your lock-in period ends, your portfolio value might be temporarily down. Also, gains over ₹1 Lakh in a financial year are taxed at 12.5% (LTCG).',
    example: 'You invest ₹1,50,000 every year in ELSS for 15 years. Assuming a conservative 12% return, your corpus grows to over ₹60 Lakhs, drastically outperforming safe instruments.',
    color: 'text-[var(--color-returns)]',
    border: 'border-emerald-400/20 bg-emerald-500/5',
  },
  {
    metric: 'PPF (Public Provident Fund)',
    formula: 'Fixed Government Declared Rate (Currently 7.1% p.a.)',
    useFor: 'Safe, guaranteed, and absolutely tax-free returns. PPF is backed by the Government of India, making it one of the safest investments in the country. It falls under the Exempt-Exempt-Exempt (EEE) category, meaning your investment, interest, and maturity amount are all 100% tax-free.',
    bestFor: 'Conservative investors who cannot stomach market volatility. It is also excellent for the debt portion of your asset allocation. If you want peace of mind and a guaranteed corpus for long-term goals like a child\'s education or marriage, PPF is ideal.',
    limitation: 'Extremely long lock-in period of 15 years. While partial withdrawals and loans are allowed under specific conditions, your money is largely illiquid. Furthermore, 7.1% returns barely beat inflation, meaning your real wealth growth is minimal.',
    example: 'You invest ₹1,50,000 every year in PPF for 15 years. At 7.1%, your guaranteed tax-free corpus will be approximately ₹40.68 Lakhs.',
    color: 'text-[var(--color-accent)]',
    border: 'border-blue-400/20 bg-blue-500/5',
  },
  {
    metric: 'NPS (National Pension System)',
    formula: 'Market-Linked Mix of Equity (E), Corporate Debt (C), and Govt Bonds (G)',
    useFor: 'Dedicated retirement planning with an additional ₹50,000 tax deduction under Section 80CCD(1B), over and above the ₹1.5 Lakhs of 80C. It is a long-term retirement vehicle that forces discipline by locking your money until age 60.',
    bestFor: 'Investors who want to build a massive retirement corpus and want an extra ₹50,000 tax deduction. It offers a great mix of equity and debt, automatically rebalancing as you age (if you choose the Auto Choice lifecycle fund).',
    limitation: 'You cannot withdraw freely before age 60. At retirement, you are forced to buy an annuity (regular pension) with at least 40% of your total corpus. This annuity income is fully taxable according to your income tax slab.',
    example: 'You invest ₹50,000 every year in NPS (Active choice, 75% Equity) for 30 years. Assuming a blended return of 10%, your corpus will be over ₹90 Lakhs at age 60.',
    color: 'text-[#C4993C]',
    border: 'border-amber-400/20 bg-amber-500/5',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ELSS vs PPF vs NPS: Ultimate Tax Saving Guide under 80C',
  description: 'Confused between ELSS, PPF, and NPS for Section 80C tax savings? Compare returns, lock-in periods, risk, and withdrawal rules to make the best investment decision.',
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/elss-vs-ppf-vs-nps',
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which has the shortest lock-in period: ELSS, PPF, or NPS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ELSS has the shortest lock-in period of just 3 years. PPF has a lock-in of 15 years, and NPS locks your money until you reach the age of 60.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is PPF completely tax-free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, PPF falls under the EEE (Exempt-Exempt-Exempt) category. Your investment is tax-deductible under 80C, the interest earned is tax-free, and the final maturity amount is completely tax-free.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I invest in both ELSS and PPF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Many smart investors use a combination. They use PPF for their safe debt allocation and ELSS for aggressive equity growth, ensuring their total combined investment does not exceed the ₹1.5 Lakh 80C limit for tax deduction purposes.'
        }
      }
    ]
  }
};

export default function ElssPpfNpsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">

          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'ELSS vs PPF vs NPS' }]} />

          {/* Hero Section */}
          <div className="glass-panel p-6 sm:p-8 relative overflow-hidden rounded-3xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#C4993C] font-bold mb-4 block">Section 80C Masterclass</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                <span className="text-[var(--color-accent)]">ELSS</span> vs <span className="text-[#C4993C]">PPF</span> vs <span className="text-[var(--color-returns)]">NPS</span>: The Ultimate Tax-Saving Showdown
              </h1>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Every year between January and March, Indian investors panic and rush to save tax under Section 80C. You have ₹1.5 Lakhs of tax deductions available. Where should you put it? Should you lock it up safely in PPF, chase high returns with ELSS, or secure your retirement with NPS? This exhaustive 1000+ word guide gives you the definitive answer.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Founder, StepupCalculator · 8 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLUF (Bottom Line Up Front) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-l-[var(--color-accent)] bg-[rgba(27,58,92,0.02)]">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" /> 
              The 30-Second Summary (TL;DR)
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-2 flex-shrink-0" />
                <span><strong className="text-[var(--color-returns)]">ELSS (Equity Mutual Funds):</strong> Best for high returns (12-15%), shortest lock-in (3 years), but carries market risk. Ideal for young investors.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                <span><strong className="text-[var(--color-accent)]">PPF (Public Provident Fund):</strong> Best for absolute safety (7.1% guaranteed), zero tax on maturity (EEE status), but has a massive 15-year lock-in.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C4993C] mt-2 flex-shrink-0" />
                <span><strong className="text-[#C4993C]">NPS (National Pension System):</strong> Best for securing retirement and claiming an <strong>additional ₹50,000</strong> tax deduction under 80CCD(1B). Locked until age 60.</span>
              </li>
            </ul>
          </div>

          {/* Deep comparison cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Deep Dive: Decoding Each Investment Option</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To make an informed decision, you must look beyond just the tax saving aspect. You need to evaluate returns, liquidity, taxation on maturity, and the fundamental purpose of the investment. Let us break down ELSS, PPF, and NPS in microscopic detail.
            </p>
            
            {COMPARISON.map(({ metric, formula, useFor, bestFor, limitation, example, color, border }) => (
              <div key={metric} className={`glass-panel p-6 sm:p-8 rounded-3xl border ${border} rounded-2xl`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${color}`}>
                  {metric.includes('ELSS') ? <TrendingUp className="w-6 h-6" /> : metric.includes('PPF') ? <ShieldCheck className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
                  {metric}
                </h3>
                
                <div className="bg-white/50 dark:bg-black/20 rounded-xl px-4 py-3 font-mono text-sm text-gray-800 dark:text-gray-200 mb-5 border border-black/5 dark:border-white/5 shadow-inner overflow-x-auto">
                  <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider block mb-1">Expected Return Profile:</span>
                  {formula}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">What is it used for?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{useFor}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">When is it best?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{bestFor}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-loss)] mb-1">The Critical Flaw</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{limitation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Real-World Example</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Analysis Table */}
          <div className="glass-panel p-6 sm:p-8 overflow-hidden rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Head-to-Head Comparison Table</h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-6 leading-relaxed">
              If you are short on time, use this matrix to quickly compare the three heavyweights of Indian tax planning.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-accent)] text-white">
                    <th className="p-4 font-semibold text-sm">Feature</th>
                    <th className="p-4 font-semibold text-sm">ELSS</th>
                    <th className="p-4 font-semibold text-sm">PPF</th>
                    <th className="p-4 font-semibold text-sm">NPS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white/50 dark:bg-black/20">
                  <tr>
                    <td className="p-4 font-medium text-foreground">Lock-in Period</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">3 Years</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">15 Years</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">Until Age 60</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-foreground">Historical Returns</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">12% - 15% (Market linked)</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">7.1% (Guaranteed)</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">9% - 11% (Market linked)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-foreground">Tax Status at Maturity</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">LTCG of 12.5% on gains &gt; ₹1 Lakh</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">100% Tax-Free (EEE)</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">60% lumpsum is tax-free. 40% annuity is taxed.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-foreground">Risk Level</td>
                    <td className="p-4 text-[var(--color-loss)] font-medium">High (Equity)</td>
                    <td className="p-4 text-[var(--color-returns)] font-medium">Zero (Sovereign Guarantee)</td>
                    <td className="p-4 text-[#C4993C] font-medium">Moderate (Equity + Debt)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Implementation */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Choose: The Asset Allocation Strategy</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              You do not have to pick just one. The smartest investors use a combination of these instruments to achieve the perfect balance of growth, safety, and liquidity. Here is how you should structure your ₹1.5 Lakh 80C limit based on your age and goals:
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">The Aggressive Wealth Builder (Age 20-35)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    If you are young, your biggest advantage is time. Inflation will eat away at safe investments like PPF. 
                    <strong>Strategy:</strong> Put ₹1,00,000 in ELSS for aggressive equity compounding. Put ₹50,000 in PPF for a debt cushion. Additionally, open an NPS account and put in ₹50,000 to claim the extra 80CCD(1B) deduction.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C4993C]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C4993C] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">The Balanced Planner (Age 35-50)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    You have responsibilities, perhaps a mortgage, and children&apos;s education approaching. You cannot afford massive market drawdowns, but you still need growth.
                    <strong>Strategy:</strong> Split it 50/50. ₹75,000 in ELSS and ₹75,000 in PPF. Keep funding NPS with ₹50,000 for retirement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#059669]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#059669] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">The Conservative Senior (Age 50+)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    Capital preservation is your primary goal. You do not have 10 years to wait for the market to recover from a crash.
                    <strong>Strategy:</strong> Maximize PPF with ₹1,50,000. It provides guaranteed, tax-free returns. Avoid new ELSS investments unless you have a high risk appetite.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal Rules Deep Dive */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Trap of Liquidity: Withdrawal Rules Explained</h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-6 leading-relaxed">
              Many investors blindly throw money into these accounts without understanding when they can get it back. Let&apos;s look at the harsh realities of liquidity.
            </p>
            
            <div className="bg-[rgba(27,58,92,0.05)] border-l-4 border-[var(--color-accent)] p-5 rounded-r-xl mb-6">
              <h3 className="font-bold text-[var(--color-accent)] dark:text-white mb-2">The ELSS SIP Trap</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">
                A common misconception is that if you start an ELSS SIP in 2020, the entire amount is unlocked in 2023. <strong>False.</strong> Every single SIP instalment has its own 3-year lock-in. The instalment you paid in Dec 2020 unlocks in Dec 2023. The instalment paid in Jan 2021 unlocks in Jan 2024.
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 mb-4 leading-relaxed">
              <strong>PPF Withdrawals:</strong> You can take a loan against your PPF balance from the 3rd to the 6th financial year. From the 7th year onwards, partial withdrawals are allowed, subject to strict limits (usually 50% of the balance at the end of the 4th preceding year).
            </p>

            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">
              <strong>NPS Withdrawals:</strong> NPS is extremely rigid. Before age 60, you can withdraw up to 25% of your <em>own</em> contributions (not employer&apos;s or returns) for specific reasons like children&apos;s marriage, higher education, or critical illness. At age 60, you can withdraw a maximum of 60% as a tax-free lumpsum. The remaining 40% MUST be used to buy a pension annuity.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-6xl w-full mx-auto mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="glass-panel p-5 rounded-xl group cursor-pointer">
                <summary className="font-bold text-foreground flex justify-between items-center">
                  Which has the shortest lock-in period: ELSS, PPF, or NPS?
                  <span className="group-open:rotate-180 transition-transform"><HelpCircle className="w-5 h-5 text-gray-400" /></span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  ELSS has the shortest lock-in period of just 3 years. PPF has a lock-in of 15 years, and NPS locks your money until you reach the age of 60. This makes ELSS the most liquid option among the three.
                </p>
              </details>
              
              <details className="glass-panel p-5 rounded-xl group cursor-pointer">
                <summary className="font-bold text-foreground flex justify-between items-center">
                  Is PPF completely tax-free?
                  <span className="group-open:rotate-180 transition-transform"><HelpCircle className="w-5 h-5 text-gray-400" /></span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Yes, PPF falls under the EEE (Exempt-Exempt-Exempt) category. Your investment up to ₹1.5 Lakhs is tax-deductible under 80C, the 7.1% interest earned annually is tax-free, and the final maturity amount after 15 years is completely tax-free.
                </p>
              </details>

              <details className="glass-panel p-5 rounded-xl group cursor-pointer">
                <summary className="font-bold text-foreground flex justify-between items-center">
                  Can I invest in both ELSS and PPF?
                  <span className="group-open:rotate-180 transition-transform"><HelpCircle className="w-5 h-5 text-gray-400" /></span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Absolutely. Many smart investors use a combination. They use PPF for their safe debt allocation and ELSS for aggressive equity growth, ensuring their total combined investment does not exceed the ₹1.5 Lakh 80C limit for tax deduction purposes.
                </p>
              </details>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass-panel p-5 border border-amber-400/20 bg-amber-50 dark:bg-amber-900/10 mt-8">
            <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-amber-700 dark:text-amber-500">Tax & Wealth Warning:</strong> Mutual fund investments are subject to market risks. Tax laws are subject to change by the government. This guide is for educational purposes and does not constitute financial advice.
                <Link href="/disclaimer" className="text-[var(--color-accent)] hover:underline ml-1">Read our full disclaimer →</Link>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">Calculate Your Wealth Growth</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Stop guessing your final corpus. Use our advanced calculators to simulate PPF maturity, NPS retirement corpus, and ELSS returns.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tools/ppf-calculator" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <ShieldCheck className="w-5 h-5" /> Calculate PPF Returns
              </Link>
              <Link href="/tools/nps-calculator" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                <Landmark className="w-5 h-5" /> Estimate NPS Pension
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

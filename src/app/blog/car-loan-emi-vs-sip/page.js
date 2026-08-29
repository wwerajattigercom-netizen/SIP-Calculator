import Link from 'next/link';
import { Car, TrendingUp, AlertTriangle, CheckCircle, Calculator, ChevronDown, ArrowRight, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Is it better to buy a car on EMI or do a SIP?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Mathematically, doing a SIP is far superior. A car is a depreciating asset, and a car loan charges you interest on something that loses value every day. By doing a SIP instead, you earn compound interest and grow your wealth. However, if a car is an absolute necessity, try to keep the loan tenure short and the EMI under 10% of your income.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is the opportunity cost of a car loan EMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'The opportunity cost of a car loan EMI is the future wealth you could have built if you had invested that exact same EMI amount into an equity SIP over the loan tenure. For a ₹15,000 EMI over 5 years, the opportunity cost can easily exceed ₹12 Lakhs when you account for the lost compounding.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How much does a new car depreciate in the first year?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A new car typically depreciates by 15% to 20% the moment you drive it off the lot and up to 25% by the end of the first year. Over 5 years, it can lose up to 60% of its original value.'
      }
    }
  ]
};

export default function CarLoanEmiVsSipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Car Loan EMI vs SIP' }]} />

          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-3xl border border-[rgba(27,58,92,0.15)] shadow-sm mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[var(--color-loss)] font-bold mb-4 block">The Lifestyle Trap</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                Car Loan EMI vs SIP: The <span className="text-[var(--color-loss)]">Hidden Opportunity Cost</span> That Keeps You Poor
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                Buying a new car feels like an achievement, but financing it through a 5-to-7 year EMI might be the single biggest wealth-destroying decision of your 20s and 30s. Discover the brutal mathematics behind car depreciation and the explosive opportunity cost of choosing a loan over an equity SIP.
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
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 border-l-4 border-l-[var(--color-loss)] bg-[rgba(153,27,27,0.03)] dark:bg-[rgba(153,27,27,0.1)]">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-[var(--color-loss)]" /> 
              The Brutal Reality Check
            </h2>
            <ul className="space-y-4 text-base text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-loss)] mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">Double Whammy Effect:</strong> When you take a car loan, you are paying interest on an asset that is rapidly losing its value. You lose money on the loan, and you lose money on the car.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">The 10% Rule:</strong> If your car EMI is more than 10% of your monthly take-home salary, you are buying a car you cannot actually afford.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-returns)] mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">The SIP Alternative:</strong> Redirecting a ₹15,000 EMI into a mutual fund SIP for 5 years won&apos;t just buy you a car in cash later; it will build a massive corpus that compounds for decades.</span>
              </li>
            </ul>
          </div>

          {/* Section 1 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">The Psychology of the Car Loan Trap</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We live in a society that normalizes debt. The moment a young professional gets a pay hike, the first instinct is to upgrade their lifestyle. Car dealerships take advantage of this by focusing entirely on the <strong>&quot;affordable monthly EMI&quot;</strong> rather than the total cost of ownership.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Salesmen will stretch a 3-year loan to a 7-year loan just to make the EMI look small enough to fit your budget. But a smaller EMI on a longer tenure means you are paying significantly more in interest, while the car depreciates into oblivion.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 p-5 rounded-2xl mt-6">
              <p className="text-amber-800 dark:text-amber-400 font-semibold italic text-center text-lg">
                &quot;If you have to stretch the loan to 7 years to afford the EMI, you cannot afford the car.&quot;
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Depreciation: The Silent Wealth Killer</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Unlike real estate or gold, a car is a depreciating liability. Let&apos;s look at the standard depreciation curve for a new car in India:
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(27,58,92,0.05)] dark:bg-white/5 text-foreground">
                    <th className="p-4 rounded-tl-xl font-bold">Timeframe</th>
                    <th className="p-4 font-bold">Value Lost</th>
                    <th className="p-4 rounded-tr-xl font-bold">Remaining Value of ₹10 Lakh Car</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <td className="p-4">The moment you drive it out</td>
                    <td className="p-4 text-[var(--color-loss)] font-semibold">-10%</td>
                    <td className="p-4">₹9,00,000</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <td className="p-4">End of Year 1</td>
                    <td className="p-4 text-[var(--color-loss)] font-semibold">-20%</td>
                    <td className="p-4">₹8,00,000</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <td className="p-4">End of Year 3</td>
                    <td className="p-4 text-[var(--color-loss)] font-semibold">-40%</td>
                    <td className="p-4">₹6,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 rounded-bl-xl">End of Year 5</td>
                    <td className="p-4 text-[var(--color-loss)] font-semibold rounded-br-xl">-50% to -60%</td>
                    <td className="p-4 font-bold text-[var(--color-loss)]">₹4,50,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you finance this depreciation with a loan at 9% interest, you are burning cash at both ends. You are paying ₹12 Lakhs total (principal + interest) for a machine that will be worth only ₹4.5 Lakhs when the loan is finally paid off.
            </p>
          </div>

          {/* Section 3 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 border-t-8 border-t-[var(--color-accent)]">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">The Math: Car EMI vs Mutual Fund SIP</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Let&apos;s assume you have ₹20,000 of disposable income every month. You have two choices: use it to pay an EMI for a new car, or invest it in a Nifty 50 Index Fund SIP.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[rgba(153,27,27,0.03)] dark:bg-[rgba(153,27,27,0.1)] p-6 rounded-2xl border border-[var(--color-loss)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-6 h-6 text-[var(--color-loss)]" />
                  <h3 className="text-xl font-bold text-foreground">Scenario A: The Car Loan</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Monthly EMI:</span> <strong className="text-foreground">₹20,000</strong></li>
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Tenure:</span> <strong className="text-foreground">5 Years (60 months)</strong></li>
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Total Paid to Bank:</span> <strong className="text-foreground">₹12,00,000</strong></li>
                  <li className="flex justify-between pt-2"><span>Value of Car after 5 Yrs:</span> <strong className="text-[var(--color-loss)]">₹4,50,000</strong></li>
                </ul>
                <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                  <p className="text-center font-bold text-[var(--color-loss)]">Net Worth Impact: -₹7,50,000</p>
                </div>
              </div>

              <div className="bg-[rgba(5,150,105,0.03)] dark:bg-[rgba(5,150,105,0.1)] p-6 rounded-2xl border border-[var(--color-returns)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-[var(--color-returns)]" />
                  <h3 className="text-xl font-bold text-foreground">Scenario B: The SIP Route</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Monthly SIP:</span> <strong className="text-foreground">₹20,000</strong></li>
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Tenure:</span> <strong className="text-foreground">5 Years (60 months)</strong></li>
                  <li className="flex justify-between border-b border-black/5 pb-2"><span>Total Invested:</span> <strong className="text-foreground">₹12,00,000</strong></li>
                  <li className="flex justify-between pt-2"><span>Corpus Value (12% CAGR):</span> <strong className="text-[var(--color-returns)]">₹16,49,727</strong></li>
                </ul>
                <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                  <p className="text-center font-bold text-[var(--color-returns)]">Net Worth Impact: +₹4,49,727</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              The true opportunity cost is not just the ₹4.5 Lakh value of the old car versus the ₹16.5 Lakh SIP corpus. The difference in your net worth between taking the loan and investing the SIP is a staggering <span className="text-[var(--color-accent)] font-bold text-xl">₹12,00,000</span> in just 5 years. That is the true price of the &quot;new car smell.&quot;
            </p>
          </div>

          {/* Section: Deep Mathematical Case Study */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Deep Mathematical Case Study: The 10-Year Horizon</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              To truly understand the devastation a car loan wreaks on your wealth, we need to look beyond the 5-year loan tenure. Let&apos;s project the numbers over a 10-year horizon, encompassing the typical ownership lifecycle of a modern vehicle in India.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Imagine two friends, Aman and Vikram. Both are 28 years old and have ₹25,000 in monthly disposable income.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[var(--color-loss)] mt-2 flex-shrink-0" />
                <span><strong>Aman (The Borrower):</strong> Aman buys a brand new SUV worth ₹15 Lakhs. He makes a ₹3 Lakh down payment and takes a ₹12 Lakh car loan at 9% interest for 5 years. His EMI is exactly ₹24,910. After 5 years, the car is fully paid off, and he keeps driving it for another 5 years.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[var(--color-returns)] mt-2 flex-shrink-0" />
                <span><strong>Vikram (The Investor):</strong> Vikram decides to buy a reliable 3-year-old used hatchback for ₹4 Lakhs in cash (using his savings). He then takes the exact same ₹24,910 that Aman pays as an EMI and invests it into a Nifty 50 Index Fund SIP every month for the next 10 years.</span>
              </li>
            </ul>
            <h3 className="text-xl font-bold text-foreground mb-4">The 10-Year Result</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Fast forward 10 years to when both are 38 years old. Aman&apos;s 10-year-old SUV is now heavily depreciated. According to the Indian blue book values, a 10-year-old car retains only about 15-20% of its original value. His SUV is worth perhaps ₹2.5 Lakhs to ₹3 Lakhs. That is his entire net worth from this automotive decision.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Vikram, on the other hand, diligently invested ₹24,910 every month. Assuming a historically realistic 12% annualized return in the Indian equity markets, Vikram&apos;s SIP has ballooned into a massive corpus. His total investment of ₹29,89,200 has grown to a staggering <strong>₹57,38,000</strong>. You can verify this math using our <Link href="/tools/sip-calculator" className="text-[var(--color-accent)] hover:underline font-semibold">SIP Calculator</Link>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              The difference in their net worth is nearly ₹54 Lakhs. Aman bought a depreciating metal box; Vikram bought financial freedom. This is the compound interest engine working in reverse when you take a car loan, and working in overdrive when you choose a SIP.
            </p>
          </div>

          {/* Section: Historical Depreciation Curves */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Historical Car Depreciation Curves in India</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The Indian automotive market is brutal when it comes to resale value. While certain brands like Maruti Suzuki or Toyota might hold their value slightly better than average, the fundamental laws of depreciation apply to all vehicles.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Why do cars depreciate so fast? It&apos;s a combination of physical wear and tear, technological obsolescence (new models having better features, safety standards, or fuel efficiency), and market perception. The moment a car moves from &quot;new&quot; to &quot;first-owner,&quot; it instantly loses 10% to 15% of its monetary value simply because the next buyer is getting a &quot;used&quot; vehicle.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Historically, luxury cars depreciate even faster than budget hatchbacks. A ₹50 Lakh luxury sedan might lose 60% of its value in just 4 years, meaning a loss of ₹30 Lakhs in pure depreciation. That&apos;s ₹7.5 Lakhs vanishing into thin air every single year, regardless of how meticulously the car is maintained. When you add loan interest on top of this depreciation, you are funding a financial black hole.
            </p>
          </div>

          {/* Section: The Psychological Factors */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Psychological Factors: Why We Buy Cars We Can&apos;t Afford</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If the math is so overwhelmingly against car loans, why do millions of intelligent professionals sign up for them every year? The answer lies in behavioral psychology and marketing.
            </p>
            <ol className="space-y-4 text-gray-700 dark:text-gray-300 list-decimal pl-5">
              <li className="pl-2">
                <strong className="text-foreground">The Status Signaling Effect:</strong> In modern society, a car is rarely just a mode of transportation; it is a status symbol. It signals to peers, family, and neighbors that you have &quot;arrived.&quot; We are biologically wired to seek social status, and car manufacturers exploit this by marketing vehicles as an extension of your identity.
              </li>
              <li className="pl-2">
                <strong className="text-foreground">Temporal Discounting:</strong> Human brains struggle to intuitively grasp exponential compounding. We highly value the immediate reward (driving a shiny new car today) and heavily discount the future penalty (having less retirement money in 20 years). The pain of the EMI is spread out into small, manageable monthly chunks, masking the colossal total cost.
              </li>
              <li className="pl-2">
                <strong className="text-foreground">The &quot;Monthly Payment&quot; Illusion:</strong> Dealerships are masters of negotiation. They rarely discuss the total price of the car. Instead, they ask, &quot;What monthly payment are you looking for?&quot; Once they know your budget, they manipulate the loan tenure—stretching it from 3 years to 5, or even 7 years—to fit a much more expensive car into your monthly limit. You feel like you won, but the bank is laughing all the way to the vault.
              </li>
            </ol>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-6">
              Breaking free from this cycle requires immense discipline. It means redefining success. True wealth is what you don&apos;t see—it&apos;s the mutual fund portfolio growing silently in the background, not the depreciating metal box parked in the driveway. Try using our <Link href="/tools/goal-planner" className="text-[var(--color-accent)] hover:underline font-semibold">Goal Planner</Link> to visualize how much faster you could reach financial independence by avoiding bad debt.
            </p>
          </div>

          {/* Section 4 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">How to Avoid the Trap: Smart Car Buying Rules</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[var(--color-accent)]">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">The 20/4/10 Rule</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    If you must finance a car, put down at least <strong className="text-foreground">20%</strong> as a down payment. Limit the loan tenure to a maximum of <strong className="text-foreground">4 years</strong>. Ensure the total transportation costs (EMI + fuel + insurance) are less than <strong className="text-foreground">10%</strong> of your gross monthly income.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[var(--color-accent)]">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Buy Pre-Owned</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Let someone else take the massive 40% depreciation hit. Buying a 3-year-old reliable car allows you to get 80% of the car&apos;s lifespan for 60% of the price. You can buy it in cash or take a much smaller loan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[var(--color-accent)]">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Delay Gratification with a Goal SIP</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Instead of taking a loan today, start a SIP for the car&apos;s value. By investing for just 3-4 years, your money will grow, and you can buy the car entirely in cash. You earn the interest instead of paying it to the bank.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent rounded-3xl mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">Run the Numbers Yourself</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              Don&apos;t just take our word for it. Compare the exact cost of your potential car loan against the wealth you could generate with a SIP using our free calculators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tools/car-loan-calculator" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Car className="w-5 h-5" /> Calculate Car EMI
              </Link>
              <Link href="/" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                <Calculator className="w-5 h-5" /> Calculate SIP Returns
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-6xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="glass-panel rounded-2xl group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-foreground text-lg">
                  Is it better to buy a car on EMI or do a SIP?
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  Mathematically, doing a SIP is far superior. A car is a depreciating asset, and a car loan charges you interest on something that loses value every day. By doing a SIP instead, you earn compound interest and grow your wealth. However, if a car is an absolute necessity, try to keep the loan tenure short and the EMI under 10% of your income.
                </div>
              </details>

              <details className="glass-panel rounded-2xl group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-foreground text-lg">
                  What is the opportunity cost of a car loan EMI?
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  The opportunity cost of a car loan EMI is the future wealth you could have built if you had invested that exact same EMI amount into an equity SIP over the loan tenure. For a ₹15,000 EMI over 5 years, the opportunity cost can easily exceed ₹12 Lakhs when you account for the lost compounding.
                </div>
              </details>

              <details className="glass-panel rounded-2xl group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-foreground text-lg">
                  How much does a new car depreciate in the first year?
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  A new car typically depreciates by 15% to 20% the moment you drive it off the lot and up to 25% by the end of the first year. Over 5 years, it can lose up to 60% of its original value.
                </div>
              </details>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

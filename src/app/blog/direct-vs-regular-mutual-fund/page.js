import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Calculator, Percent, Scale, Clock, IndianRupee, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function DirectVsRegularMutualFund() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between Direct and Regular mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both Direct and Regular plans invest in the same portfolio managed by the same fund manager. The only difference is the expense ratio. Regular plans include a distributor commission (0.5% to 1.5% annually), which is deducted from your returns. Direct plans eliminate this middleman cost, giving you higher returns over time."
        }
      },
      {
        "@type": "Question",
        "name": "How much more money do you make with Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 1% expense ratio difference compounding over 20 years on a monthly SIP of Rs 10,000 at 12% returns results in approximately Rs 12-15 Lakhs more wealth in the Direct plan. Over 30 years, this gap widens to Rs 50+ Lakhs. The longer your investment horizon, the more devastating the Regular plan commission becomes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I switch from Regular to Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can switch by placing a 'switch' request through your AMC website, MF Central, or platforms like Kuvera/Groww. Note that switching is treated as a redemption from the Regular plan and a fresh purchase in the Direct plan, which may trigger capital gains tax and exit load if applicable."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to invest in Direct mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Direct plans are equally safe as Regular plans. Both are regulated by SEBI and managed by the same AMC. The underlying portfolio is identical. The only difference is you are not paying a distributor commission, which makes Direct plans strictly better in terms of returns."
        }
      },
      {
        "@type": "Question",
        "name": "Who should choose Regular mutual funds over Direct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular plans may be suitable for investors who want personalized advisory services, portfolio monitoring, and hand-holding from a financial advisor or distributor. If you are a complete beginner who needs someone to select funds, rebalance your portfolio, and guide you during market crashes, the advisory fee embedded in Regular plans could be worth it."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Direct vs Regular Mutual Fund' }]} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* HEADER */}
        <header className="mb-10 mt-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            Direct vs Regular Mutual Fund: The 1% That Costs You Lakhs
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>By StepupCalculator</span>
            <span>&bull;</span>
            <span>4 min read</span>
          </div>
        </header>

        <article className="space-y-8">

          {/* BOX 1: Hook */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#991B1B]">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-[#991B1B] flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed m-0 font-medium">
                  Every year, millions of Indian mutual fund investors silently lose <strong>0.5% to 1.5%</strong> of their returns to distributor commissions — without even knowing it. Over 20 years, this invisible fee can cost you <strong className="text-[#991B1B] dark:text-red-400">&#8377;15 to 50 Lakhs</strong> on a simple &#8377;10,000/month SIP.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-3 m-0">
                  The culprit? Investing in a <strong>Regular Plan</strong> instead of a <strong>Direct Plan</strong>. Here is exactly what the difference is, why it matters, and how to switch.
                </p>
              </div>
            </div>
          </div>

          {/* BOX 2: What Are They */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              What is the Actual Difference?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Both Direct and Regular plans invest in the <strong>exact same portfolio</strong>, managed by the <strong>same fund manager</strong>, with the <strong>same risk</strong>. The only difference is how you buy them and how much you pay in fees.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-3 font-semibold text-foreground">Feature</th>
                    <th className="py-3 font-semibold text-[#059669]">Direct Plan</th>
                    <th className="py-3 font-semibold text-[#991B1B]">Regular Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">How you buy</td>
                    <td className="py-3 font-medium">Directly from AMC / Kuvera / Groww</td>
                    <td className="py-3 font-medium">Through a bank / broker / advisor</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Expense Ratio (TER)</td>
                    <td className="py-3 font-bold text-[#059669]">Lower (e.g. 0.3% - 0.8%)</td>
                    <td className="py-3 font-bold text-[#991B1B]">Higher (e.g. 1.0% - 2.0%)</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">Distributor Commission</td>
                    <td className="py-3 font-medium text-[#059669]">Zero</td>
                    <td className="py-3 font-medium text-[#991B1B]">0.5% to 1.5% annually</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-3 text-gray-700 dark:text-gray-300">NAV</td>
                    <td className="py-3 font-medium text-[#059669]">Higher (you keep more)</td>
                    <td className="py-3 font-medium text-[#991B1B]">Lower (fees eat NAV)</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 dark:text-gray-300">Advisory Support</td>
                    <td className="py-3 font-medium">None (DIY)</td>
                    <td className="py-3 font-medium">Included (from distributor)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BOX 3: The Math */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-t-4 border-[#991B1B] shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <IndianRupee className="w-6 h-6 text-[#991B1B] dark:text-red-400" />
              The True Cost: How 1% Destroys Your Wealth
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Let&apos;s say you invest <strong>&#8377;10,000/month via SIP</strong> for 20 years. The market returns 12% per year. But your Regular plan charges 1% more in expense ratio than the Direct plan. Here&apos;s what happens:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-5 rounded-xl text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-1">Direct Plan (12% return)</p>
                <p className="text-3xl font-extrabold text-[#059669]">&#8377;99.9 L</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total corpus after 20 years</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-5 rounded-xl text-center">
                <p className="text-sm text-red-700 dark:text-red-400 font-semibold mb-1">Regular Plan (11% effective return)</p>
                <p className="text-3xl font-extrabold text-[#991B1B]">&#8377;86.5 L</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total corpus after 20 years</p>
              </div>
            </div>

            <div className="bg-[#991B1B]/5 dark:bg-red-900/10 border border-[#991B1B]/20 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 m-0">
                You lost <strong className="text-[#991B1B] dark:text-red-400 text-xl">&#8377;13.4 Lakhs</strong> to commissions — on the <em>same</em> fund, with the <em>same</em> manager, taking the <em>same</em> risk.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-2 font-semibold text-foreground">SIP Duration</th>
                    <th className="py-2 font-semibold text-[#059669]">Direct (12%)</th>
                    <th className="py-2 font-semibold text-[#991B1B]">Regular (11%)</th>
                    <th className="py-2 font-semibold text-[#991B1B]">You Lost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2 text-gray-700 dark:text-gray-300">10 Years</td>
                    <td className="py-2 font-medium">&#8377;23.2 L</td>
                    <td className="py-2 font-medium">&#8377;21.8 L</td>
                    <td className="py-2 font-bold text-[#991B1B]">&#8377;1.4 L</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2 text-gray-700 dark:text-gray-300">20 Years</td>
                    <td className="py-2 font-medium">&#8377;99.9 L</td>
                    <td className="py-2 font-medium">&#8377;86.5 L</td>
                    <td className="py-2 font-bold text-[#991B1B]">&#8377;13.4 L</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700 dark:text-gray-300">30 Years</td>
                    <td className="py-2 font-medium">&#8377;3.53 Cr</td>
                    <td className="py-2 font-medium">&#8377;2.80 Cr</td>
                    <td className="py-2 font-bold text-[#991B1B]">&#8377;73.0 L</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 m-0">
              *Over 30 years, the 1% commission compounds into a staggering &#8377;73 Lakh wealth gap. This is money taken from your retirement to pay a distributor.
            </p>
          </div>

          {/* BOX 4: When Regular Makes Sense */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#C4993C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#C4993C]" />
              When Regular Plans Are Actually Worth It
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Regular plans are not <em>always</em> bad. They include advisory services from a distributor. If your advisor genuinely helps you in these situations, the 1% fee may be justified:
            </p>
            <div className="grid gap-3">
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>You are a complete beginner</strong> who needs someone to select the right funds, set up SIPs, and guide you through market crashes without panicking.</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>You need portfolio rebalancing</strong> — a good advisor will move your money between equity and debt based on your age, goals, and market conditions.</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-gray-100 dark:border-white/5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4993C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 m-0"><strong>You have complex financial needs</strong> — multiple goals, tax planning (ELSS, LTCG harvesting), or NRI/FEMA considerations that require expert guidance.</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 m-0">
              However, if your &quot;advisor&quot; just sold you the highest-commission fund and never calls you again, you are paying 1% per year for nothing. Switch to Direct immediately.
            </p>
          </div>

          {/* BOX 5: How to Switch */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#1B3A5C]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#1B3A5C] dark:text-blue-400" />
              How to Switch from Regular to Direct
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Switching is simple, but be aware of the tax implications. A switch is treated as a redemption (sell) from the Regular plan and a fresh purchase in the Direct plan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">1</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Start new SIPs in Direct</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Stop your Regular SIPs and start new ones in the Direct plan of the same fund via Kuvera, Groww, or the AMC website.</p>
                </div>
              </div>
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">2</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Gradually switch existing units</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Switch Regular units to Direct in batches. Units held over 1 year qualify for lower LTCG tax (12.5% above &#8377;1.25L exemption).</p>
                </div>
              </div>
              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">3</div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">Use MF Central or AMC</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Visit mfcentral.com or your AMC&apos;s website to initiate a switch. You can also use CAMS/KFintech portals for a consolidated switch.</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOX 6: FAQ */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  Is NAV higher in Direct or Regular?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  NAV is always higher in Direct plans because less money is deducted as fees. Over time, the NAV gap between Direct and Regular versions of the same fund keeps widening due to the compounding effect of the expense ratio difference.
                </div>
              </details>
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  Can I invest in Direct mutual funds without a Demat account?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  Yes! You do NOT need a Demat account to invest in Direct mutual funds. You can invest directly through the AMC website, or through Direct-only platforms like Kuvera, Groww, or MF Central. A Demat account is only needed for ETFs.
                </div>
              </details>
              <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5">
                <summary className="cursor-pointer p-4 flex items-center justify-between font-semibold text-foreground text-sm">
                  Does switching from Regular to Direct trigger taxes?
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  Yes. A switch is treated as a redemption and fresh purchase. If your Regular plan units have gains, you may owe STCG (20% if held &lt; 1 year) or LTCG (12.5% on gains above &#8377;1.25 Lakh if held &gt; 1 year). Plan your switch in batches to stay within the &#8377;1.25L LTCG exemption each year.
                </div>
              </details>
            </div>
          </div>

          {/* BOX 7: CTA */}
          <div className="glass-panel p-8 sm:p-12 text-center rounded-3xl border-t-4 border-[var(--color-accent)] shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">See the Exact Impact on Your SIP</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Use our SIP Calculator to compare how much more wealth you build at 12% (Direct) vs 11% (Regular) over your investment horizon.
            </p>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Open SIP Calculator <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}

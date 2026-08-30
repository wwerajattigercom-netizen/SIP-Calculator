import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { Landmark, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight, Percent, PiggyBank, HandCoins } from 'lucide-react';

const FUNDING_STRATEGIES = [
  {
    type: 'The Panic Seller',
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    action: 'Liquidates their portfolio to generate cash for an emergency or large purchase.',
    result: 'Triggers heavy Capital Gains Tax (up to 20%) and completely kills the future compounding potential of those assets.',
    verdict: 'Wealth Destroyer. High Opportunity Cost.',
    color: 'text-red-600 dark:text-red-400',
    border: 'border-red-400/20 bg-red-500/5',
  },
  {
    type: 'The Personal Loan Victim',
    icon: <Percent className="w-6 h-6 text-amber-500" />,
    action: 'Takes an unsecured personal loan or uses credit cards at 15% to 36% interest.',
    result: 'Keeps investments intact, but bleeds cash monthly due to exorbitant interest rates, slowing down future investing capacity.',
    verdict: 'Expensive & Stressful.',
    color: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-400/20 bg-amber-500/5',
  },
  {
    type: 'The PLOC Strategist',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    action: 'Pledges their portfolio to take a secured line of credit at a much lower interest rate.',
    result: 'Avoids taxes, keeps the portfolio compounding at 12%+, and secures cheap capital instantly.',
    verdict: 'The Billionaire Playbook.',
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-400/20 bg-emerald-500/5',
  }
];

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a PLOC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Portfolio Line of Credit (PLOC) allows you to pledge your investment portfolio as collateral to borrow money at lower interest rates without actually selling your assets."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to my returns when I pledge my investments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your investments continue to generate returns and compound exactly as they would normally. The only restriction is that you cannot sell the pledged units until the loan is repaid."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Margin Call?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If the stock market crashes and your portfolio value drops below the required Loan-to-Value (LTV) ratio, the lender will issue a margin call. You must either deposit cash, pledge more assets, or the lender will liquidate a portion of your portfolio to cover the deficit."
        }
      }
    ]
  };

  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl w-full mx-auto space-y-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/us/dca-calculator' },
            { label: 'Blog', href: '/us/blog' },
            { label: 'PLOC Guide', href: '#' },
          ]} 
        />

        {/* HERO SECTION */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Landmark className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-semibold text-sm mb-6">
              Advanced Wealth Strategies
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              Portfolio Line of Credit (PLOC): The "Buy, Borrow, Die" Wealth Strategy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
              Discover how the ultra-wealthy use their portfolios to access cheap capital without triggering devastating taxes or stopping their compound growth.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-foreground">Written by Rajat - Founder, StepupCalculator</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>

        {/* VISUAL COMPARISON GRID */}
        <div className="mb-12 mt-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Emergency Funding Strategies Compared</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FUNDING_STRATEGIES.map((strat, i) => (
              <div key={i} className={`glass-panel rounded-3xl p-6 border ${strat.border} hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    {strat.icon}
                  </div>
                  <h3 className={`font-bold ${strat.color}`}>{strat.type}</h3>
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">The Approach</p>
                    <p className="text-sm text-foreground font-medium">{strat.action}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">The Reality</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{strat.result}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Verdict</p>
                    <p className={`text-sm font-bold ${strat.color}`}>
                      {strat.verdict}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-[#1B3A5C] dark:text-[#60a5fa] mb-4 flex items-center gap-2">
            <HandCoins className="w-6 h-6 text-[#1B3A5C] dark:text-[#60a5fa]" />
            The Billionaire Math: Why Selling is a Mistake
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed text-lg">
            <p>
              Whether you are an ordinary retail investor or a multi-billionaire, there comes a time when you need to make a large purchase—be it a down payment on a house, a medical emergency, or funding a business venture. The instinct for most people is to liquidate their investments. However, wealthy individuals rarely sell their assets. They understand two critical wealth destroyers: <strong>Taxes and Opportunity Cost.</strong>
            </p>
            <p>
              If you sell your equity portfolio, you immediately trigger a taxable event. In many jurisdictions, this means surrendering a significant portion of your hard-earned gains to the government. But more importantly, you permanently remove that capital from the compounding machine.
            </p>
            <p>
              Instead, wealthy investors utilize a strategy often dubbed <em>"Buy, Borrow, Die."</em> They buy appreciating assets (like index funds), borrow money against those assets using a PLOC when they need cash, and hold the assets until they die, at which point their heirs inherit the assets with a stepped-up cost basis (eliminating the capital gains tax entirely in many tax codes).
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-[#1B3A5C] dark:text-[#60a5fa] mb-4 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-[#1B3A5C] dark:text-[#60a5fa]" />
            How a PLOC Works
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed text-lg">
            <p>
              A Portfolio Line of Credit (PLOC) is essentially a secured overdraft facility or revolving credit line. You pledge a portion of your portfolio to the lender. In return, the lender grants you a credit limit—usually up to 50% for equities. 
            </p>
            <p>
              <strong>The beauty of this setup lies in three distinct advantages:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Retained Returns:</strong> Your pledged funds continue to stay invested in the market. If the S&P 500 goes up by 15% that year, your pledged assets capture the entirety of that return.</li>
              <li><strong>Interest-Only Payments:</strong> Unlike a standard amortizing loan (where your EMI is heavily front-loaded with interest and principal), a PLOC usually only requires you to service the interest monthly. The principal can be repaid whenever you want.</li>
              <li><strong>Zero Prepayment Penalties:</strong> You can pay back the principal in chunks or clear the entire loan in a single day without incurring massive foreclosure fees typically associated with personal loans.</li>
            </ul>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#991B1B]" />
            The Danger: Understanding the Margin Call
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed text-lg">
            <p>
              While this strategy sounds flawless, it carries a very real risk that bankrupts over-leveraged investors: <strong>The Margin Call.</strong>
            </p>
            <p>
              Because your loan is secured by equity markets, the collateral's value fluctuates daily. Suppose you pledge $100,000 worth of equity and borrow the absolute maximum limit of 50%. You now have a loan. 
            </p>
            <p>
              Suddenly, a black swan event causes the stock market to crash by 20%. Your portfolio value plummets to $80,000. Now, the loan you hold exceeds the bank's maximum allowable Loan-To-Value (LTV) limit against your new portfolio value. The lender will issue a margin call, demanding that you immediately deposit cash to fix the ratio.
            </p>
            <p>
              If you cannot provide the cash within a few days, the bank will unilaterally sell your investments at the absolute bottom of the market crash to recover their funds. To prevent this, <strong>never borrow the maximum allowable amount.</strong> Keeping a healthy buffer ensures you can weather severe market corrections without losing sleep.
            </p>
          </div>
        </div>

        {/* CTA BLOCK */}
        <div className="mt-12 bg-gradient-to-br from-[#1B3A5C] to-[#112740] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Plan Your Investments Wisely</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Before executing advanced leveraging strategies, ensure your baseline compounding is on track. Use our calculators to forecast your portfolio's growth over the next decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/us/dca-calculator"
              className="px-8 py-4 bg-white text-[#1B3A5C] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              Open DCA Calculator
            </Link>
            <Link 
              href="/us/tools/dca-vs-lumpsum"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Compare Strategies
            </Link>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-6xl w-full mx-auto mt-16 glass-panel p-6 sm:p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5 open:shadow-md transition-all">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-foreground">
                What is a PLOC?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                A Portfolio Line of Credit (PLOC) allows you to pledge your investment portfolio as collateral to borrow money at lower interest rates without actually selling your assets.
              </div>
            </details>
  
            <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5 open:shadow-md transition-all">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-foreground">
                What happens to my returns when I pledge my investments?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Your investments continue to generate returns and compound exactly as they would normally. The only restriction is that you cannot sell the pledged units until the loan is repaid.
              </div>
            </details>
  
            <details className="group bg-[var(--background)] rounded-xl border border-gray-100 dark:border-white/5 open:shadow-md transition-all">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-foreground">
                What is a Margin Call?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                If the stock market crashes and your portfolio value drops below the required Loan-to-Value (LTV) ratio, the lender will issue a margin call. You must either deposit cash, pledge more assets, or the lender will liquidate a portion of your portfolio to cover the deficit.
              </div>
            </details>

          </div>
        </div>
      </article>
    </main>
  );
}

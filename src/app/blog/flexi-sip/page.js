import Link from 'next/link';
import { Settings2, ArrowRight, CheckCircle, ShieldAlert, Zap, TrendingDown, Briefcase, Calculator } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "What is a Flexi SIP? (And Who Should Use It)",
  description: "Regular SIPs force you to pay the exact same amount every month. But what if your income fluctuates? Learn how a Flexi SIP works and how to use it to buy the dip.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/flexi-sip',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "What is a Flexi SIP? (And Who Should Use It)",
  description: "Regular SIPs force you to pay the exact same amount every month. But what if your income fluctuates? Learn how a Flexi SIP works and how to use it to buy the dip.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/flexi-sip',
};

export default function FlexiSipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Flexi SIP Guide' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold mb-4 block">Advanced Strategy</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                What is a <span className="text-[var(--color-accent)]">Flexi SIP?</span> (And Who Should Use It)
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Regular SIPs force you to pay the exact same amount every single month, no matter what. But what if you are a freelancer with variable income? Or what if you want to invest *more* when the stock market crashes? Enter the Flexi SIP.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Founder, StepupCalculator · 5 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* What is it */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">What is a Flexi SIP?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              A Flexible SIP (or Flexi SIP) allows you to change your investment amount every month without canceling your mandate. Instead of setting a rigid ₹10,000 per month, you define a <strong>Minimum Amount</strong> and a <strong>Maximum Amount</strong>. If you are aiming for a corpus of ₹5 Crores over 15 years, a Flexi SIP helps you inject lump sums into the market when you receive a massive bonus, without breaking the discipline of a monthly SIP. It allows you to navigate the volatility of the Indian market seamlessly, ensuring that you invest ₹20,000 in a bear market and only ₹5,000 in a bull market, optimizing your journey towards your financial goals.
            </p>
            <div className="bg-[rgba(27,58,92,0.02)] border border-[rgba(27,58,92,0.1)] p-5 rounded-xl">
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                <strong className="text-[var(--color-accent)]">Example:</strong> You set your regular installment at ₹10,000, your minimum at ₹5,000, and your maximum at ₹25,000. Each month, depending on a formula or your choice, the AMC will deduct an amount within this exact range.
              </p>
            </div>
          </div>

          {/* Why use it */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why Do Investors Use Flexi SIPs?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 border-t-4 border-t-[#059669]">
                <h3 className="font-bold text-[#059669] flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5" /> Use Case 1: Freelancers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you run a business or freelance, your income isn't fixed. In a great month, you might earn ₹2 Lakhs and want to invest ₹50,000. In a slow month, you might only afford ₹5,000. Flexi SIP allows you to maintain investing discipline without bouncing your bank mandate during tough months.
                </p>
              </div>
              
              <div className="glass-panel p-6 border-t-4 border-t-[var(--color-accent)]">
                <h3 className="font-bold text-[var(--color-accent)] flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5" /> Use Case 2: Buying the Dip
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Advanced investors hate buying units when the stock market is at an all-time high. A Flexi SIP allows you to invest your "Minimum Amount" when markets are expensive, and automatically invest your "Maximum Amount" when markets crash, scoring cheap NAV units.
                </p>
              </div>
            </div>
          </div>

          {/* How does it work */}
          <div className="glass-panel p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl font-bold text-foreground mb-4">How Do You Set It Up?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Most major AMCs (Asset Management Companies) and broker platforms offer this feature, though they sometimes call it a "Smart SIP" or "Value SIP". Here is the exact mechanics of how it is executed:
            </p>
            
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[var(--color-accent)] font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Create a Flexi Mandate</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">You must approve a bank mandate (e.g. NACH or e-Mandate) for the <strong>Maximum</strong> amount. This authorizes the fund house to deduct up to that limit, even if your normal SIP is much lower.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[var(--color-accent)] font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Choose the Trigger Formula</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">You link the investment amount to a market metric. The most common metric is the <strong>P/E (Price to Earnings) Ratio</strong> of an index (like Nifty 50). If P/E is high, invest min. If P/E is low, invest max.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[var(--color-accent)] font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Automated Execution</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Once set, you do absolutely nothing. The algorithm evaluates the market exactly 2 days before your SIP date and pulls the calculated amount from your bank automatically.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">See the Math Behind the Strategy</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Want to know exactly how much wealth you could build by buying the dip during a market crash? Use our crash simulator.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/blog/sip-during-market-crash" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <TrendingDown className="w-5 h-5" /> Open Market Crash Simulator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

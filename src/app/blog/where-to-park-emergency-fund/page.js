import Link from 'next/link';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, PiggyBank, Landmark, Percent } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Where to Park Your Emergency Fund: Liquid Funds vs FDs",
  description: "Stop keeping your emergency fund in a 3% savings account. Compare Liquid Funds, Fixed Deposits, and Arbitrage Funds to maximize returns while keeping your money safe.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/where-to-park-emergency-fund',
  }
};

const OPTIONS = [
  {
    title: 'Regular Savings Account',
    returns: '2.5% - 3.5%',
    liquidity: 'Instant (24/7 ATM/UPI)',
    risk: 'Zero Risk (DICGC insured up to ₹5 Lakhs)',
    tax: 'Interest up to ₹10,000 tax-free under Section 80TTA. Above that, taxed at slab rate.',
    verdict: 'Keep only 1 month of expenses here.',
    icon: PiggyBank,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10'
  },
  {
    title: 'Fixed Deposits (FDs)',
    returns: '6.5% - 7.5%',
    liquidity: 'High, but breaking FDs attracts a ~1% penalty.',
    risk: 'Zero Risk (DICGC insured up to ₹5 Lakhs)',
    tax: 'Taxed entirely at your income tax slab rate. TDS applies if interest > ₹40,000.',
    verdict: 'Good for 2-3 months of expenses. Look for Auto-Sweep FDs to avoid manual breaking.',
    icon: Landmark,
    color: 'text-[#1B3A5C] dark:text-[#1A73E8]',
    bg: 'bg-[#1B3A5C] dark:bg-[#1A73E8]/10'
  },
  {
    title: 'Liquid Mutual Funds',
    returns: '6.5% - 7.0%',
    liquidity: 'High (T+1 working days). Some offer instant ₹50,000 withdrawal via Insta-Redemption.',
    risk: 'Extremely Low (Invests in 91-day Govt/Corporate debt).',
    tax: 'Taxed entirely at your income tax slab rate (New Debt Taxation rules applied from April 2023).',
    verdict: 'Best for parking 3-6 months of expenses. Better compounding than FDs with no pre-mature withdrawal penalties.',
    icon: TrendingUp,
    color: 'text-[var(--color-returns)]',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Arbitrage Mutual Funds',
    returns: '6.0% - 7.5%',
    liquidity: 'High (T+2 working days).',
    risk: 'Low (Leverages price differences in cash and futures markets, inherently market-neutral).',
    tax: 'Treated as Equity. 12.5% LTCG after 1 year (up to ₹1.25L tax-free). 20% STCG if sold within 1 year.',
    verdict: 'Excellent tax-efficient alternative for those in the 30% tax bracket willing to hold for >1 year.',
    icon: Percent,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-blue-500/10'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Where to Park Your Emergency Fund: Liquid Funds vs FDs',
  description: 'Compare Liquid Funds, Fixed Deposits, and Arbitrage Funds to maximize returns while keeping your emergency fund safe.',
  author: {
    '@type': 'Organization',
    name: 'StepupCalculator'
  },
  publisher: {
    '@type': 'Organization',
    name: 'StepupCalculator',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stepupcalculator.com/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://stepupcalculator.com/blog/where-to-park-emergency-fund'
  }
};

export default function EmergencyFundGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl w-full mx-auto px-4">

          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Where to Park Emergency Fund' }]} /><div className="mt-6 mb-10">
            <h1
              className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 mt-6">Where to Park Your Emergency Fund in India?
                          </h1>
            <p
              className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">An emergency fund isn't an investment to make you rich—it is insurance to keep you from going broke. However, leaving 6 months of your salary in a 3% savings account is financial suicide due to inflation. Here is the ultimate breakdown of where you should park your emergency cash.
                          </p>
            <div className="flex items-center gap-3 mb-8"><div
                className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold text-sm">R
                            </div><div><p className="text-sm font-semibold text-foreground">Written by Rajat</p><p className="text-xs text-gray-500 dark:text-gray-400">Personal Finance Expert • 8 min read</p></div></div>
          </div>

          {/* Header */}
          <div className="mb-10 mt-6">
            <div className="inline-block bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] font-semibold px-3 py-1 rounded-full text-xs mb-4">
              Financial Planning
            </div>


          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            
            <div className="glass-panel p-6 rounded-2xl mb-10 border-l-4 border-[#991B1B]">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-[var(--color-loss)] flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground m-0 mb-2">The Two Golden Rules of Emergency Funds</h3>
                  <ul className="m-0 pl-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li><strong>1. Liquidity over Returns:</strong> You must be able to access the money within 24-48 hours. Never lock an emergency fund in real estate, smallcase, or aggressive equity mutual funds.</li>
                    <li><strong>2. Safety over Returns:</strong> The principal amount must not drop. If the stock market crashes 40% tomorrow, your emergency fund must remain untouched.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-4">
              <ShieldCheck className="w-6 h-6 text-[var(--color-accent)]" />
              The Contenders: FDs vs Liquid Funds vs Arbitrage
            </h2>
            <p>
              In India, investors primarily choose between four instruments to park their contingency reserve. Let's break down the exact numbers, tax implications, and liquidity of each.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {OPTIONS.map((opt, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col h-full border border-black/5 dark:border-white/5 hover:border-[var(--color-accent)]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${opt.bg}`}>
                      <opt.icon className={`w-5 h-5 ${opt.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground m-0">{opt.title}</h3>
                  </div>
                  
                  <div className="space-y-3 flex-1 text-sm">
                    <div className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 font-medium w-1/3">Returns:</span>
                      <span className="text-foreground font-semibold text-right w-2/3">{opt.returns}</span>
                    </div>
                    <div className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 font-medium w-1/3">Liquidity:</span>
                      <span className="text-foreground text-right w-2/3">{opt.liquidity}</span>
                    </div>
                    <div className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-2">
                      <span className="text-gray-500 font-medium w-1/3">Taxation:</span>
                      <span className="text-foreground text-right w-2/3">{opt.tax}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--color-returns)] flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 m-0 leading-snug">
                        {opt.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">The Optimal "3-Bucket" Strategy</h2>
            <p>
              Rather than dumping 6 months of expenses into one instrument, smart investors use a tiered bucket strategy to balance instant liquidity with decent returns.
            </p>

            <div className="space-y-4 my-8">
              <div className="glass-panel p-5 rounded-xl border-l-4 border-gray-400">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Bucket 1: The "Immediate" Fund (1 Month)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> High-interest Savings Account or Auto-Sweep FD.<br/>
                  <strong>Why:</strong> You need this cash at 2 AM for a medical emergency. It must be accessible via UPI, ATM, or net banking instantly.
                </p>
              </div>
              
              <div className="glass-panel p-5 rounded-xl border-l-4 border-[var(--color-accent)]">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Bucket 2: The "Short-Term" Fund (2-3 Months)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> Liquid Mutual Funds.<br/>
                  <strong>Why:</strong> Can be withdrawn in 1 working day. Gives better returns than a savings account and has zero exit load after 7 days.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-[#059669]">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Bucket 3: The "Deep" Fund (3-6 Months)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> Arbitrage Funds or traditional FDs.<br/>
                  <strong>Why:</strong> This is for major life events (job loss). If you are in the 30% tax bracket, Arbitrage funds held for &gt;1 year are taxed at just 12.5% LTCG, heavily outperforming FDs post-tax.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-4">
              <AlertTriangle className="w-6 h-6 text-[var(--color-loss)]" />
              Potential Improvements & Blind Spots
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              While the proposed "3-Bucket Strategy" is theoretically excellent, it overlooks a few practical realities that an investor needs to know:
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="glass-panel p-5 rounded-xl border border-black/5 dark:border-white/5 bg-[#991B1B]/5">
                <h4 className="font-bold text-[var(--color-loss)] text-lg m-0 mb-2">1. Insta-Redemption Constraints</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                  The guide mentions instant ₹50,000 withdrawals for Liquid Funds but omits that the rule is strictly <strong>₹50,000 or 90% of the invested amount</strong>, whichever is lower, per day. For a severe medical emergency requiring a large upfront hospital deposit at 2 AM, this daily cap can be a severe bottleneck. Always keep Bucket 1 properly funded.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-black/5 dark:border-white/5 bg-[var(--color-accent)]/5">
                <h4 className="font-bold text-[var(--color-accent)] text-lg m-0 mb-2">2. Arbitrage Short-Term Volatility</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                  Arbitrage funds are technically equity funds. While they are very low-risk over a 12-month period, they can occasionally deliver flat or mildly negative returns over a 1-to-3-month horizon depending on market futures premiums. They must strictly remain in the final "Deep" bucket and should not be relied upon for next-week cash needs.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-black/5 dark:border-white/5 bg-gray-500/5">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 text-lg m-0 mb-2">3. Auto-Sweep LIFO Mechanics</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                  Many banks process auto-sweep FD withdrawals using a Last-In-First-Out (LIFO) method. If your account sweeps ₹20,000 into an FD today, and you break it via ATM withdrawal next week, it earns negligible interest and may still incur a small premature penalty, effectively acting just like a 0% savings account.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-4">
              <TrendingUp className="w-6 h-6 text-[var(--color-returns)]" />
              Hypothetical Implementation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Assuming a baseline monthly expense of ₹50,000 and an investor in the 30% tax bracket, here is how the math for this strategy plays out in reality:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="glass-panel p-5 rounded-xl border-t-4 border-t-gray-500 flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Bucket 1 (1 Month)</div>
                <h4 className="font-bold text-foreground text-xl m-0 mb-3">₹50,000</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0 flex-1">
                  Kept in a standard Savings Account. It sacrifices yield for absolute 24/7 liquidity.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-t-4 border-t-[var(--color-accent)] flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1">Bucket 2 (2 Months)</div>
                <h4 className="font-bold text-foreground text-xl m-0 mb-3">₹1,00,000</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0 flex-1">
                  Parked in a Liquid Mutual Fund. Assuming a 6.5% return taxed at the 30% slab rate, the effective post-tax return drops to roughly 4.5%.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-t-4 border-t-[#059669] flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-returns)] mb-1">Bucket 3 (3 Months)</div>
                <h4 className="font-bold text-foreground text-xl m-0 mb-3">₹1,50,000</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0 flex-1">
                  Parked in an Arbitrage Fund. Assuming a 6.5% return held for over one year, the ₹9,750 gain falls under the ₹1.25L tax-free equity threshold, yielding a true 6.5% post-tax return.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl mt-12 mb-6 border border-black/5 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1B3A5C] dark:bg-[#1A73E8]"></div>
              <h2 className="text-2xl font-bold text-foreground mt-0 mb-4">
                Debt Mutual Fund Taxation Update (2023)
              </h2>
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-4">
                <p className="m-0">
                  Prior to April 1, 2023, Liquid Funds enjoyed indexation benefits, making them significantly better than FDs for long-term holding. However, <strong>under the new tax rules, all gains from debt mutual funds (including Liquid Funds) are taxed at your income tax slab rate</strong>, irrespective of the holding period.
                </p>
                <p className="m-0">
                  Does this mean Liquid funds are useless? No. They still offer two massive advantages over FDs:
                </p>
                <ul className="m-0 pl-5 space-y-2">
                  <li><strong>No Tax Deducted at Source (TDS):</strong> FDs deduct 10% TDS every year if interest exceeds ₹40k, severely reducing the power of compounding. Liquid funds only tax you upon withdrawal.</li>
                  <li><strong>No Premature Penalty:</strong> Breaking an FD early incurs a 0.5% to 1% penalty. Liquid funds have zero exit load after 7 days.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 p-8 glass-panel rounded-3xl text-center bg-gradient-to-br from-[var(--color-accent)] to-[#112740] text-white border-0 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4 mt-0">Ready to start planning your finances?</h2>
                <p className="text-white/80 mb-6">
                  Now that your emergency fund is sorted, calculate how much you need to invest for your actual financial goals.
                </p>
                <Link href="/tools/goal-planner" className="inline-flex items-center gap-2 bg-white text-[var(--color-accent)] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                  Go to Goal Planner Hub <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <ShieldCheck className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10" />
            </div>

          </article>
        </div>
      </main>
    </>
  );
}

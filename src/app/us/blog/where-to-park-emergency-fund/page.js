import Link from 'next/link';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, PiggyBank, Landmark, Percent } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Where to Park Your Emergency Fund: HYSA vs CDs vs Money Market",
  description: "Stop keeping your emergency fund in a 0.01% checking account. Compare High-Yield Savings Accounts (HYSA), CDs, and Money Market Accounts to maximize yield.",
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/where-to-park-emergency-fund',
  }
};

const OPTIONS = [
  {
    title: 'High-Yield Savings Account (HYSA)',
    returns: '4.0% - 5.0% APY',
    liquidity: 'High (Usually 1-3 days transfer to checking)',
    risk: 'Zero Risk (FDIC insured up to $250k)',
    tax: 'Interest is taxed as ordinary income at your marginal tax rate.',
    verdict: 'The absolute best place for the core of your emergency fund.',
    icon: PiggyBank,
    color: 'text-[var(--color-returns)]',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Certificates of Deposit (CDs)',
    returns: '4.5% - 5.5% APY',
    liquidity: 'Low. Withdrawing early incurs a penalty (usually 3-6 months of interest).',
    risk: 'Zero Risk (FDIC insured up to $250k)',
    tax: 'Interest is taxed as ordinary income.',
    verdict: 'Good for building a "CD Ladder" for months 3-6 of your emergency fund to lock in rates.',
    icon: Landmark,
    color: 'text-[#1B3A5C] dark:text-[#1A73E8]',
    bg: 'bg-[#1B3A5C] dark:bg-[#1A73E8]/10'
  },
  {
    title: 'Money Market Account (MMA)',
    returns: '4.0% - 5.2% APY',
    liquidity: 'Very High (Comes with debit cards and check-writing privileges).',
    risk: 'Zero Risk (FDIC insured).',
    tax: 'Interest is taxed as ordinary income.',
    verdict: 'Excellent alternative to HYSA if you need instant access via check or debit.',
    icon: Wallet,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10'
  },
  {
    title: 'Treasury Bills (T-Bills)',
    returns: '4.5% - 5.3% APY',
    liquidity: 'Medium (Can be sold on secondary market, but best held to maturity: 4, 8, 13, 26 weeks).',
    risk: 'Zero Risk (Backed by the US Government).',
    tax: 'Exempt from State and Local taxes. Subject to Federal tax only.',
    verdict: 'Highly tax-efficient for high-income earners in states with high income tax (like CA or NY).',
    icon: Percent,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-blue-500/10'
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Where to Park Your Emergency Fund: HYSA vs CDs vs Money Market',
  description: 'Compare HYSA, CDs, T-Bills, and Money Market Accounts to maximize APY while keeping your emergency fund safe.',
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
    '@id': 'https://stepupcalculator.com/us/blog/where-to-park-emergency-fund'
  }
};

export default function EmergencyFundGuideUS() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl w-full mx-auto px-4">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'Where to Park Emergency Fund' }]} />

          {/* Header */}
          <div className="mb-10 mt-6">
            <div className="inline-block bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] font-semibold px-3 py-1 rounded-full text-xs mb-4">
              Financial Planning
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Where to Park Your Emergency Fund in the US?
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              An emergency fund isn't an investment to make you rich—it is insurance to keep you from going into credit card debt. However, leaving 6 months of your salary in a traditional checking account earning 0.01% APY is throwing money away to inflation. Here is the ultimate breakdown of where you should park your emergency cash in the US.
            </p>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            
            <div className="glass-panel p-6 rounded-2xl mb-10 border-l-4 border-[#991B1B]">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-[#991B1B] flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground m-0 mb-2">The Two Golden Rules of Emergency Funds</h3>
                  <ul className="m-0 pl-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li><strong>1. Liquidity over Yield:</strong> You must be able to access the money without a massive penalty. Never lock an emergency fund in real estate, crypto, or volatile index funds.</li>
                    <li><strong>2. Safety over Yield:</strong> The principal amount must not drop. If the stock market crashes 40% tomorrow, your emergency fund must remain untouched. It should ideally be FDIC or NCUA insured.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-4">
              <ShieldCheck className="w-6 h-6 text-[var(--color-accent)]" />
              The Contenders: HYSA vs CDs vs MMA vs T-Bills
            </h2>
            <p>
              In the US, investors primarily choose between four instruments to park their contingency reserve. Let's break down the exact APY estimates, tax implications, and liquidity of each.
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
                      <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 m-0 leading-snug">
                        {opt.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">The Optimal "Tiered" Strategy</h2>
            <p>
              Rather than dumping 6 months of expenses into one single account, smart investors use a tiered bucket strategy to balance instant liquidity with high yield.
            </p>

            <div className="space-y-4 my-8">
              <div className="glass-panel p-5 rounded-xl border-l-4 border-gray-400">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Tier 1: The "Immediate" Fund (1 Month)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> Traditional Checking Account or Money Market Account.<br/>
                  <strong>Why:</strong> You need this cash immediately for a sudden medical bill or car repair. It must be accessible via debit card instantly.
                </p>
              </div>
              
              <div className="glass-panel p-5 rounded-xl border-l-4 border-[var(--color-accent)]">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Tier 2: The "Short-Term" Fund (2-3 Months)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> High-Yield Savings Account (HYSA).<br/>
                  <strong>Why:</strong> Can be transferred to your checking account in 1-3 business days. Offers 10-20x more interest than traditional banks.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-[#059669]">
                <h4 className="font-bold text-foreground text-lg m-0 mb-1">Tier 3: The "Deep" Fund (3-6 Months)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  <strong>Where:</strong> CD Ladder or T-Bills.<br/>
                  <strong>Why:</strong> This is for major life events like sudden job loss. By creating a CD ladder (buying 3-month, 6-month, and 12-month CDs), you lock in high APY rates while ensuring one CD matures every few months just in case you need it. If you live in a high-tax state, T-Bills are strictly superior due to state-tax exemption.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 glass-panel rounded-3xl text-center bg-gradient-to-br from-[var(--color-accent)] to-[#112740] text-white border-0 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4 mt-0">Ready to start planning your finances?</h2>
                <p className="text-white/80 mb-6">
                  Now that your emergency fund is sorted, calculate how much you need to invest for your actual financial goals.
                </p>
                <Link href="/us/tools/goal-planner" className="inline-flex items-center gap-2 bg-white text-[var(--color-accent)] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
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

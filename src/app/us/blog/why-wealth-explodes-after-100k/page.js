import Link from 'next/link';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, Zap, Clock, ShieldCheck, ArrowUpCircle, PlusCircle, Lightbulb } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "Why the First $100k is the Hardest (Charlie Munger's Wealth Secret)",
  description: "Charlie Munger famously said the first $100k is a b*tch. Discover the math behind why wealth explodes after $100k and how compounding takes over.",
  alternates: {
    canonical: 'https://stepupcalculator.com/us/blog/why-wealth-explodes-after-100k',
  }
};

const STAGES = [
  {
    target: '$0 to $100k',
    time: '7.5 Years',
    driver: 'Your Savings & Discipline',
    effort: 'The Grind Phase. You are pushing a heavy snowball uphill.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    target: '$100k to $200k',
    time: '3.5 Years',
    driver: '50% Savings, 50% Compounding',
    effort: 'The Momentum Phase. The snowball is moving itself.',
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    target: '$200k to $300k',
    time: '2.5 Years',
    driver: 'Mostly Compounding',
    effort: 'The Explosion Phase. Your money earns more than you do.',
    icon: Zap,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-[var(--color-accent)]/10'
  },
  {
    target: '$300k to $400k',
    time: '1.8 Years',
    driver: 'Pure Compounding',
    effort: 'The Effortless Phase. Compounding does the heavy lifting.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  }
];

export default function WhyWealthExplodesUS() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Guides', href: '/us/blog' }, { label: 'The $100k Milestone' }]} />
        
        {/* HEADER SECTION - NO BOX, DIRECTLY ON CREAM BACKGROUND */}
        <header className="mb-10 mt-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            Why the First $100k is the Hardest (And Why Wealth Explodes After)
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>By StepupCalculator</span>
            <span>•</span>
            <span>4 min read</span>
          </div>
        </header>

        <article className="space-y-8">
          
          {/* BOX 1: Introduction Quote */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed m-0 italic">
                  &quot;The first $100,000 is a b*tch, but you gotta do it.&quot;
                </p>
                <p className="text-sm font-bold mt-3 text-gray-500">— Charlie Munger, Billionaire Investor</p>
              </div>
            </div>
          </div>

          {/* BOX 2: The Invisible Phase */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. The &quot;Invisible&quot; Phase of Wealth Building</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              When you first start investing, the magic of compounding is practically invisible. Let&apos;s say you aggressively save and invest your first $10,000 in an S&P 500 index fund, and it earns a solid 10% return in one year.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Congratulations, you made <strong>$1,000</strong>. That&apos;s barely $83 a month. While nice, it doesn&apos;t change your life. It doesn&apos;t pay your rent. If you worked a few extra shifts, got a minor promotion, or started a weekend side hustle, you could likely generate that extra $1,000 much faster than waiting for the stock market.
            </p>
            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 mt-4">
              <p className="text-red-800 dark:text-red-400 text-sm font-medium m-0">
                This is exactly why the first $100k is so brutal. <strong>Your portfolio is simply too small to do the heavy lifting.</strong> The vast majority of your net worth growth in the first 5 to 7 years comes from your brute-force savings and frugality, not investment returns. You are pushing a massive snowball up a steep hill entirely on your own strength.
              </p>
            </div>
          </div>

          {/* BOX 3: Myth vs Reality */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Myth vs. Reality: The Mathematical Explosion</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              There is a common myth that $100,000 is a &quot;magic number&quot; where the mathematical laws of compounding suddenly change. They don&apos;t. Compounding works at the exact same percentage rate whether you have $10,000 or $100,000. A 10% return is a 10% return.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              <strong>So why does it feel like an explosion?</strong> Because human psychology notices absolute numbers, not percentages. 
            </p>

            <div className="bg-[#1B3A5C]/5 border border-[#1B3A5C]/20 p-5 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-[#1B3A5C] dark:text-blue-400 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                The Tipping Point
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-0 text-sm leading-relaxed">
                Imagine you finally grind your way to a $100,000 portfolio. That exact same 10% annual return now generates <strong>$10,000 per year</strong>. Suddenly, your portfolio is earning enough to cover several months of living expenses, completely passively. Even if you stop contributing entirely, your money is now working just as hard as you do.
              </p>
            </div>
          </div>

          {/* BOX 4: The Time Collapse */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. The Time Collapse (Visualizing the Explosion)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Because your money is now making its own money, the time it takes to reach your next financial milestones literally collapses. Assuming you invest $1,000 every month via DCA at a 10% annual return, look at how the timeline shrinks:
            </p>

            <div className="grid gap-4 mb-6">
              {STAGES.map((stage, idx) => (
                <div key={idx} className="bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stage.bg} flex items-center justify-center flex-shrink-0`}>
                    <stage.icon className={`w-6 h-6 ${stage.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-foreground m-0">{stage.target}</h3>
                      <span className="inline-flex items-center text-xs font-bold text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        ~{stage.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 m-0"><strong>Driver:</strong> {stage.driver} — {stage.effort}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-0 font-medium bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/20 text-sm">
              By the time you aim for a $1 Million retirement corpus, you will realize a profound truth: Reaching your first $100k means you are actually <strong>almost 40% of the way to $1 Million</strong> in terms of time, not 10%!
            </p>
          </div>

          {/* BOX 5: The Mindset Shift */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-[#991B1B]">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#991B1B]" />
              4. The Mindset Shift: Protection over Accumulation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              As you approach and cross the $100k mark, a critical psychological shift must happen. In the beginning, your goal was purely aggressive accumulation. But once you have $100k, your primary job shifts to <strong>protecting your compounding engine.</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
              Many investors fall into the trap of treating a portion of their newly accumulated wealth as &quot;play money.&quot; They start taking high-risk bets in penny stocks, options trading, or speculative crypto in hopes of doubling their money quickly. A 30% loss on a $10,000 portfolio is a $3,000 setback—you can recover that with a few paychecks. But a 30% loss on a $100,000 portfolio is a $30,000 setback. That can wipe out 2 to 3 years of hard compounding. <strong>Once you reach the $100k mark, boring is beautiful.</strong>
            </p>
          </div>

          {/* BOX 6: The 7-Step Blueprint */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. The 7-Step Blueprint to Reach Your First $100k Faster</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              If you want to accelerate the brutal &quot;Grind Phase,&quot; you need to maximize the gap between your income and your expenses. Here is a 7-step blueprint to get there faster:
            </p>

            <ul className="space-y-4 m-0 p-0 list-none">
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 1: Increase Your Primary Income (The Best ROI)</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">There is a limit to how much you can cut expenses, but no limit to how much you can earn. Upskill yourself, switch jobs, or aggressively pursue promotions.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 2: Better Control Over Finances</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your income minus your spending equals your investable savings. Prioritize saving at the beginning of the month, not at the end.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <ArrowUpCircle className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 3: Step-Up Your Investments</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">When you get a 10% salary hike, immediately step-up your investments by 10%. Using a &quot;Step-Up DCA&quot; strategy can shave years off your journey to $100k.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 4: Optimize Your Taxes</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Max out your tax-advantaged accounts like your 401(k) match, Roth IRA, and HSA. These shield your compounding engine from the IRS.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 5: Crush Expensive Debt</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Aggressively pay off credit card debt. A credit card charging 22% interest is essentially reverse-compounding.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <PlusCircle className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Step 6: Build a Second Income Stream</strong>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Start a side hustle—freelance writing, consulting, or selling online. This active income can eventually turn into passive income.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* BOX 7: Call to Action */}
          <div className="glass-panel p-8 sm:p-12 text-center rounded-3xl border-t-4 border-[var(--color-accent)] shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">Want to know exactly when you&apos;ll hit $1 Million?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Use our dedicated calculator to find out exactly how much you need to invest monthly, and the exact year you will cross the $1 Million milestone.
            </p>
            <Link href="/us/tools/dca-to-reach-1-million" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Calculate Time to $1 Million <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </article>
      </div>
    </main>
  );
}

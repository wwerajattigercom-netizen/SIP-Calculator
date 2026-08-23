import Link from 'next/link';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Wallet, ArrowRight, Zap, Clock } from 'lucide-react';
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
    time: '6 - 8 Years',
    driver: 'Your Savings & Discipline',
    effort: 'Brutal. You are pushing a heavy snowball uphill.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    target: '$100k to $200k',
    time: '3 - 4 Years',
    driver: '50% Savings, 50% Compounding',
    effort: 'Noticeably easier. The snowball is moving itself.',
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    target: '$200k to $300k',
    time: '2 - 2.5 Years',
    driver: 'Mostly Compounding',
    effort: 'Effortless. Your money earns more than you do.',
    icon: Zap,
    color: 'text-[var(--color-accent)]',
    bg: 'bg-[var(--color-accent)]/10'
  }
];

export default function WhyWealthExplodesUS() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb 
          items={[
            { label: 'Guides', href: '/us/blog' },
            { label: 'The $100k Milestone', href: '#' }
          ]} 
        />
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-6 font-serif">
            Why the First $100k is the Hardest (And Why Wealth Explodes After)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Billionaire investor Charlie Munger famously said: <span className="italic">"The first $100,000 is a b*tch, but you gotta do it."</span> Here is the exact mathematical reason why the beginning is so brutal, and why the journey from $100k to $200k feels effortless.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>By StepupCalculator</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">The "Invisible" Phase of Wealth Building</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            When you first start investing, compounding is basically invisible. Let's say you invest your first $10,000 in an S&P 500 index fund and it earns a solid 10% return in one year.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Congratulations, you made <strong>$1,000</strong>. That's barely $83 a month. It doesn't change your life. It won't pay your rent. If you worked a few extra shifts or started a side hustle, you could make that extra $1,000 much faster. 
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            This is why the first $100k is so hard. <strong>Your portfolio is too small to do the heavy lifting.</strong> Almost 100% of your net worth growth in the first few years comes from your brute-force savings, not investment returns.
          </p>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl mb-12 border-l-4 border-[var(--color-accent)]">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[var(--color-accent)]" />
              The Tipping Point: $100,000
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-0">
              Now, imagine you finally grind your way to a $100,000 portfolio. That exact same 10% annual return now generates <strong>$10,000 per year</strong>. Suddenly, your portfolio is earning enough to cover several months of living expenses, completely passively. Your money is now working just as hard as you do.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">The Time Collapse (Visualizing the Explosion)</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Assuming you invest $1,000 every month and earn 10% annually, look at how the time required to hit each subsequent $100k milestone collapses:
          </p>

          <div className="grid gap-6 mb-12">
            {STAGES.map((stage, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${stage.bg} flex items-center justify-center flex-shrink-0`}>
                  <stage.icon className={`w-8 h-8 ${stage.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold text-foreground">{stage.target}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-white/10 text-foreground">
                      <Clock className="w-4 h-4 mr-1.5" />
                      Takes {stage.time}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">Driver: {stage.driver}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{stage.effort}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">How to Survive the First $100k</h2>
          <ul className="space-y-4 mb-12">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Automate Everything:</strong> Don't rely on willpower. Set up Dollar Cost Averaging (DCA) so your contributions are automatically deducted on payday. Treat it like a tax.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Step-Up Your DCA:</strong> The fastest way to accelerate the "brutal" phase is to increase your monthly contribution by 10% every year when you get a raise.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Ignore the Noise:</strong> During the first 5 years, stock market crashes don't matter much because your portfolio is small. In fact, a market crash is a blessing because your monthly investments buy more shares at cheaper prices.
              </div>
            </li>
          </ul>

          <div className="bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Want to know when you'll hit $1 Million?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Use our dedicated calculator to find out exactly how much you need to invest monthly, and the exact year you will cross the $1 Million milestone.
            </p>
            <Link href="/us/tools/dca-to-reach-1-million" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all gap-2">
              Calculate Time to $1 Million <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

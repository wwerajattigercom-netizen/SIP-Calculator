import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight, Info, AlertTriangle, TrendingUp, CheckCircle, HelpCircle } from 'lucide-react';

export default function StepUpSipLateStarters() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it too late to start investing at age 35 or 40?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is never too late, but you have less time for compounding compared to someone in their 20s. To bridge this gap, a Step-Up SIP is highly recommended as it allows you to aggressively increase your investments as your income grows, helping you reach your target retirement corpus faster."
        }
      },
      {
        "@type": "Question",
        "name": "How much should I step-up my SIP annually?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard recommendation is to step up your SIP by 10% every year. However, if you are starting late, aiming for a 15% to 20% annual step-up will significantly accelerate your wealth creation and compensate for the lost time."
        }
      },
      {
        "@type": "Question",
        "name": "Can a Step-Up SIP make up for 10 lost years of investing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, to a large extent. While compounding early is mathematically superior, aggressively stepping up your SIPs (e.g., by 20% annually) alongside salary hikes can help you catch up and build a massive corpus by the time you retire."
        }
      }
    ]
  };

  return (
    <main className="max-w-4xl w-full mx-auto py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Step-Up SIP for Late Starters' }]} />
      
      <header className="mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium text-sm mb-4">
          <TrendingUp className="w-4 h-4" />
          Retirement Planning
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
          Step-Up SIP vs Regular SIP for Late Starters (Age 35+)
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Starting your investment journey in your late 30s or 40s? Discover why a Step-Up SIP is the ultimate wealth-building strategy to catch up on retirement and close the gap on lost compounding years.
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none w-full">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[var(--color-loss)]" />
            The &quot;Late Starter&quot; Dilemma
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            One of the most common anxieties in personal finance is the feeling of having started too late. You hear the stories of people who started investing in their early 20s and marvel at the magic of compounding over 40 years. But what if you are 35, 40, or even 45? What if life—student loans, building a career, starting a family, or buying a home—delayed your wealth-creation journey?
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            The reality is that time is the most critical factor in compounding. When you have fewer years until retirement, a standard, flat-rate investment strategy (like a Regular SIP) might not be enough to build your desired retirement corpus of ₹5 Crore or ₹10 Crore. You need a strategy that aggressively scales with your income and aggressively tackles the shortfall. Enter the <strong>Step-Up SIP</strong>.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-[var(--color-accent)]" />
            What is a Step-Up SIP?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A Systematic Investment Plan (SIP) involves investing a fixed amount regularly (usually monthly) into mutual funds. A <strong>Step-Up SIP</strong> (also known as a Top-Up SIP) is a variation where you increase your monthly investment amount by a fixed percentage or fixed amount every year.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For example, if you start with a ₹10,000 monthly SIP and opt for a 10% annual step-up, your investment schedule will look like this:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li><strong>Year 1:</strong> ₹10,000 per month</li>
            <li><strong>Year 2:</strong> ₹11,000 per month</li>
            <li><strong>Year 3:</strong> ₹12,100 per month</li>
            <li><strong>Year 4:</strong> ₹13,310 per month</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            By automatically increasing your investment in line with your annual salary increments, you continuously raise your savings rate without feeling a pinch in your current lifestyle.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Regular SIP vs. Step-Up SIP: The Numbers for Late Starters
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Let&apos;s look at a practical scenario. Rahul is 35 years old and wants to retire at 55. He has 20 years left to build his retirement corpus. He decides to start investing ₹20,000 per month in an equity mutual fund that delivers an expected return of 12% p.a.
          </p>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">Scenario A: Regular SIP (Flat ₹20,000/month)</h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-1">
            <li><strong>Total Investment over 20 years:</strong> ₹48,00,000</li>
            <li><strong>Expected Wealth Gained:</strong> ₹1,51,82,958</li>
            <li><strong>Total Corpus at Age 55:</strong> ₹1.99 Crore</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">Scenario B: Step-Up SIP (10% Annual Increase)</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Now, suppose Rahul decides to increase his SIP amount by 10% every year. He still starts with ₹20,000/month, but in year two he invests ₹22,000, and so on.
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-1">
            <li><strong>Total Investment over 20 years:</strong> ₹1,37,45,999</li>
            <li><strong>Expected Wealth Gained:</strong> ₹2,61,64,316</li>
            <li><strong>Total Corpus at Age 55:</strong> ₹3.99 Crore</li>
          </ul>
          
          <div className="bg-[var(--color-returns)]/10 border border-[var(--color-returns)] p-4 rounded-xl mt-4">
            <p className="text-[var(--color-returns)] font-semibold m-0">
              The Verdict: By simply stepping up his SIP by 10% annually, Rahul doubles his final retirement corpus from ₹2 Crore to nearly ₹4 Crore! This massive difference is what makes the Step-Up strategy mandatory for late starters.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why Step-Up SIPs Work Better for Late Starters
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[var(--color-returns)]" />
                Catching up on Lost Time
              </h3>
              <p>
                When you start in your late 30s or 40s, you miss out on the initial 10-15 years of compounding. To compensate, you need to inject more capital into the market. A Step-Up SIP automates this capital injection, rapidly increasing your principal base.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[var(--color-returns)]" />
                Aligns with Peak Earning Years
              </h3>
              <p>
                People in their late 30s and 40s are usually entering their peak earning years. Your salary is higher, and potentially, some early liabilities (like a car loan) might be paid off. You can afford to increase your savings rate aggressively.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[var(--color-returns)]" />
                Beating Lifestyle Inflation
              </h3>
              <p>
                As income grows, expenses tend to grow with it (lifestyle inflation). By committing to an automatic 10% to 15% increase in your investments every year, you force yourself to save your raises rather than spend them.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Implement a Step-Up Strategy
          </h2>
          <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-400 space-y-4">
            <li>
              <strong>Determine Your Baseline:</strong> Calculate how much you can comfortably invest right now. Do not overcommit initially. If you can afford ₹25,000 comfortably, start there.
            </li>
            <li>
              <strong>Choose an Aggressive Step-Up Percentage:</strong> While 10% is standard, late starters should consider 15% or even 20% if their career growth allows it. A 15% step-up dramatically shifts the compounding curve.
            </li>
            <li>
              <strong>Automate the Increase:</strong> Use the &quot;Top-Up SIP&quot; feature provided by your mutual fund platform or broker. Set it to trigger in the month you usually receive your annual appraisal or bonus.
            </li>
            <li>
              <strong>Stay Disciplined During Downturns:</strong> The market will inevitably crash during your 15-20 year journey. Keep the Step-Up active. Buying more units when the market is down is exactly how wealth is multiplied.
            </li>
          </ol>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#1B3A5C] to-[#112740] rounded-3xl p-8 sm:p-12 text-center shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Run the Numbers Yourself</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Don&apos;t just guess your retirement corpus. Use our Step-Up SIP Calculator to see exactly how an annual increase can completely transform your financial future.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/tools/step-up-sip-calculator"
              className="inline-flex items-center gap-2 bg-[var(--color-returns)] hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20"
            >
              Step-Up SIP Calculator
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl w-full mx-auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--color-accent)]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
              <details key={index} className="glass-panel rounded-xl group">
                <summary className="p-5 font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                  {faq.name}
                  <span className="text-[var(--color-accent)] group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-5 pt-0 text-gray-600 dark:text-gray-400">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>

      </article>
    </main>
  );
}

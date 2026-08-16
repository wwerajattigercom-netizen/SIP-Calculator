"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, CheckCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-0 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-foreground font-medium text-sm md:text-base">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function SipBasedOnSalaryPage() {
  const [salary, setSalary] = useState(50000);

  // DCA amounts
  const conservativeSip = salary * 0.10;
  const moderateSip = salary * 0.20;
  const aggressiveSip = salary * 0.30;

  const calculateCorpus = (dca, years, rate) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const futureValue = dca * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return futureValue;
  };

  const conservativeCorpus = calculateCorpus(conservativeSip, 20, 12);
  const moderateCorpus = calculateCorpus(moderateSip, 20, 12);
  const aggressiveCorpus = calculateCorpus(aggressiveSip, 20, 12);

  const formatToShortWords = (value) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)} M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(0)} K`;
    return `$${value.toFixed(0)}`;
  };

  const getTopPercentile = (dca) => {
    if (dca > 50000) return 'Top 5%';
    if (dca > 25000) return 'Top 10%';
    if (dca > 10000) return 'Top 25%';
    if (dca > 5000) return 'Top 40%';
    return 'Top 60%';
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DCA Based on Salary: How Much DCA Should I Do?',
    description: 'Calculate how much DCA you should do based on your salary using the 50-30-20 rule.',
    author: { '@type': 'Person', name: 'StepupCalculator' },
    publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com/us' },
    url: 'https://stepupcalculator.com/us/tools/dca-based-on-salary',
    mainEntityOfPage: 'https://stepupcalculator.com/us/blog/dca-based-on-salary',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much DCA should I do if my salary is $50,000?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Following the 50-30-20 rule, you should save 20% of your salary. For a $50,000 salary, this means a monthly DCA of $10,000. If you have other investments (like EPF), you can adjust this amount accordingly, but $10,000 is a great starting point for wealth creation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What percentage of salary should go to DCA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Financial experts generally recommend investing at least 20% of your take-home salary into investments like SIPs. If you can afford it, pushing this to 30% (Aggressive investing) can significantly accelerate your path to financial freedom.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is 20% of salary enough for DCA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 20% is an excellent and sustainable target for most people. Consistent investing of 20% over 15-20 years benefits massively from compounding and is usually sufficient to build a substantial retirement corpus or achieve major financial goals.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I increase DCA when I get a raise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. This is called a Step-up DCA. Increasing your DCA amount by 5-10% every year in line with your salary increments can help you reach your goals much faster and beat inflation more effectively.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I do DCA with $1,000 salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many mutual funds globally allow you to start an DCA with as little as $500 or $1,000 per month. Starting early, even with a small amount, helps build financial discipline and takes advantage of the power of compounding over time.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA Based on Salary' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Interactive Guide</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                How Much DCA  Should You Do Based on Your Salary?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Discover the ideal DCA amount for your income level using the famous 50-30-20 rule. 
                Use our interactive calculator to see how much wealth you can build over 20 years.
              </p>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Salary to DCA Calculator</h2>
            
            <div className="mb-8">
              <InputSlider
                label="Monthly Take-Home Salary"
                value={salary}
                min={10000}
                max={1000000}
                step={1000}
                onChange={setSalary}
                formatFn={(v) => formatToShortWords(v)}
              />
            </div>

            <div className="bg-[rgba(27,58,92,0.08)] border border-[rgba(27,58,92,0.2)] rounded-xl p-5 mb-6 text-center">
              <h3 className="text-[var(--color-accent)] font-semibold text-sm mb-1">Personalised Recommendation (50-30-20 Rule)</h3>
              <div className="text-3xl font-bold text-foreground mb-2">{formatToShortWords(moderateSip)}<span className="text-lg text-gray-500 dark:text-gray-400">/mo</span></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Based on allocating 20% of your income to savings and investments.</p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-[rgba(0,0,0,0.03)] px-4 py-2 rounded-full text-sm">
                <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
                <span className="text-gray-600 dark:text-gray-400">Your DCA is in the <strong className="text-foreground">{getTopPercentile(moderateSip)}</strong> of Global investors</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-4">Investment Strategies & 20-Year Projections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Conservative (10%)</div>
                <div className="text-xl font-bold text-foreground mb-1">${conservativeSip.toLocaleString('en-US')}</div>
                <div className="h-px bg-black/5 my-3"></div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Corpus after 20 yrs @12%</div>
                <div className="text-lg font-bold text-foreground">{formatToShortWords(conservativeCorpus)}</div>
              </div>
              
              <div className="bg-[rgba(27,58,92,0.1)] border border-[var(--color-accent)]/30 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase">Recommended</div>
                <div className="text-xs text-[var(--color-accent)] uppercase tracking-wide font-semibold mb-1">Moderate (20%)</div>
                <div className="text-xl font-bold text-foreground mb-1">${moderateSip.toLocaleString('en-US')}</div>
                <div className="h-px bg-black/5 my-3"></div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Corpus after 20 yrs @12%</div>
                <div className="text-lg font-bold text-foreground">{formatToShortWords(moderateCorpus)}</div>
              </div>

              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Aggressive (30%)</div>
                <div className="text-xl font-bold text-foreground mb-1">${aggressiveSip.toLocaleString('en-US')}</div>
                <div className="h-px bg-black/5 my-3"></div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Corpus after 20 yrs @12%</div>
                <div className="text-lg font-bold text-foreground">{formatToShortWords(aggressiveCorpus)}</div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">The 50-30-20 Rule Explained for DCA</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Popularized by Senator Elizabeth Warren, the 50-30-20 rule is a simple and effective budgeting method to manage your finances:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="mt-0.5 bg-[var(--color-accent)]/20 p-1 rounded"><CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /></div>
                <div><strong className="text-foreground">50% Needs:</strong> Essential living expenses (rent, groceries, utilities, EMIs).</div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="mt-0.5 bg-[var(--color-accent)]/20 p-1 rounded"><CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /></div>
                <div><strong className="text-foreground">30% Wants:</strong> Discretionary spending (dining out, entertainment, shopping).</div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="mt-0.5 bg-[var(--color-accent)]/20 p-1 rounded"><CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /></div>
                <div><strong className="text-foreground">20% Savings & Investments:</strong> Your SIPs, emergency fund, and debt repayment.</div>
              </li>
            </ul>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Dedicating 20% of your salary specifically to investments like equity mutual funds through DCA ensures you are consistently building wealth without compromising your current lifestyle.
            </p>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">How Much DCA by Salary Bracket</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[var(--color-accent)] border-b border-black/5 text-xs uppercase tracking-wider">
                    <th className="text-left py-2 pr-4">Monthly Salary</th>
                    <th className="text-right py-2 pr-4">Conservative (10%)</th>
                    <th className="text-right py-2 pr-4">Recommended (20%)</th>
                    <th className="text-right py-2">Aggressive (30%)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  {[
                    { s: 30000, c: 3000, r: 6000, a: 9000 },
                    { s: 50000, c: 5000, r: 10000, a: 15000 },
                    { s: 75000, c: 7500, r: 15000, a: 22500 },
                    { s: 100000, c: 10000, r: 20000, a: 30000 },
                    { s: 200000, c: 20000, r: 40000, a: 60000 },
                  ].map(({ s, c, r, a }) => (
                    <tr key={s} className="border-b border-[#E8E4DF]">
                      <td className="py-2.5 pr-4 font-medium">${s.toLocaleString('en-US')}</td>
                      <td className="py-2.5 pr-4 text-right">${c.toLocaleString('en-US')}</td>
                      <td className="py-2.5 pr-4 text-right text-[var(--color-accent)] font-semibold">${r.toLocaleString('en-US')}</td>
                      <td className="py-2.5 text-right text-[var(--color-accent)]">${a.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Why You Should Increase DCA Every Year</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              As your salary grows, your investments should grow too. A <strong>Step-up DCA</strong> involves increasing your investment amount annually by a fixed percentage (e.g., 5% or 10%).
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              By aligning your DCA increments with your annual salary appraisals, you can reach your financial goals significantly faster and build a much larger corpus to combat inflation, all without feeling a pinch in your monthly budget.
            </p>
          </div>

          {/* FAQ */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" /> Frequently Asked Questions
            </h2>
            <div className="flex flex-col">
              {faqSchema.mainEntity.map((item, index) => (
                <FAQItem key={index} question={item.name} answer={item.acceptedAnswer.text} />
              ))}
            </div>
          </div>

          {/* CTA & Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-2">Plan Your Investments</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Use our advanced calculators to project your wealth with step-up options.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                <Calculator className="w-4 h-4" /> Full DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/blog/dca-to-reach-1-million" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                DCA to reach $1 Million Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>For educational purposes only. Consult a financial advisor before investing.</p>
            <Link href="/us/disclaimer" className="text-[var(--color-accent)] hover:underline">Read Disclaimer</Link>
          </div>

        </article>
      </main>
    </>
  );
}

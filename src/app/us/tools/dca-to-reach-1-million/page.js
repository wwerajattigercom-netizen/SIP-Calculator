"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const TABLE_DATA = [
  { years: 10, r10: 48200, r12: 43000, r15: 36200 },
  { years: 15, r10: 20200, r12: 16800, r15: 12800 },
  { years: 20, r10: 10400, r12: 8000,  r15: 5600  },
  { years: 25, r10: 5800,  r12: 4100,  r15: 2700  },
  { years: 30, r10: 3300,  r12: 2200,  r15: 1300  },
];

const STEPUP_DATA = [
  { label: 'Regular DCA (no step-up)', dca: 43000, total: '1.03 Cr', invested: '51.6 L', gain: '51.4 L' },
  { label: '5% annual step-up DCA',    dca: 32000, total: '1.01 Cr', invested: '48.3 L', gain: '52.7 L' },
  { label: '10% annual step-up DCA',   dca: 24000, total: '1.01 Cr', invested: '45.8 L', gain: '55.2 L' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Much DCA to Reach $1 Million in 10, 15, 20 Years? Complete Guide 2024',
  description: 'Exact DCA amounts needed to reach $1 Million at different return rates and tenures, with step-up DCA comparison and free calculator.',
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com/us' },
  url: 'https://stepupcalculator.com/us/tools/dca-to-reach-1-crore',
  mainEntityOfPage: 'https://stepupcalculator.com/us/blog/dca-to-reach-1-crore',
};

function fmt(v) { return `$${v.toLocaleString('en-US')}`; }

export default function SipTo1CrorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA to $1 Million' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Guide · DCA Planning</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                How Much DCA to Reach $1 Million  in 10, 15 &amp; 20 Years?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                $1 Million is the most common wealth goal for global investors.
                This guide gives you the exact monthly DCA amount needed at 10%, 12%, and 15%
                annual returns — and shows how a step-up DCA can cut that amount significantly.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">By <span className="text-gray-600 dark:text-gray-400">Rajat</span> · Updated 2024</p>
            </div>
          </div>

          {/* Quick Answer Box */}
          <div className="glass-panel p-5 border border-[rgba(27,58,92,0.3)]">
            <h2 className="text-foreground font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" /> Quick Answer — DCA for $1 Million at 12% p.a.
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: '10 Years', dca: '$43,000/mo' },
                { label: '15 Years', dca: '$16,800/mo' },
                { label: '20 Years', dca: '$8,000/mo'  },
              ].map(({ label, dca }) => (
                <div key={label} className="bg-[rgba(27,58,92,0.1)] rounded-xl p-3">
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{label}</p>
                  <p className="text-foreground font-bold text-sm">{dca}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-3 text-center">Assuming 12% p.a. annualised return. No step-up. Regular monthly DCA.</p>
          </div>

          {/* Main Table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Monthly DCA Required for $1 Million</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">All figures assume no step-up, lump sum $0, DCA invested at the start of each month.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#6B7280] border-b border-black/5 text-xs uppercase tracking-wider">
                    <th className="text-left py-2 pr-4">Duration</th>
                    <th className="text-right py-2 pr-4">At 10% p.a.</th>
                    <th className="text-right py-2 pr-4">At 12% p.a.</th>
                    <th className="text-right py-2">At 15% p.a.</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  {TABLE_DATA.map(({ years, r10, r12, r15 }) => (
                    <tr key={years} className="border-b border-[#E8E4DF]">
                      <td className="py-2.5 pr-4 font-medium">{years} Years</td>
                      <td className="py-2.5 pr-4 text-right">{fmt(r10)}</td>
                      <td className="py-2.5 pr-4 text-right text-[var(--color-accent)] font-semibold">{fmt(r12)}</td>
                      <td className="py-2.5 text-right text-[var(--color-accent)]">{fmt(r15)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-3">Values are approximate. Use our calculator for precise results.</p>
          </div>

          {/* Step-Up DCA Section */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Step-Up DCA: Lower Starting DCA, Same $1 Million Goal</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              A <strong className="text-foreground">step-up DCA</strong> increases your monthly DCA by a fixed percentage each year —
              matching your salary hikes. The result: you start with a lower DCA but still reach the same goal.
              Below is a comparison for a <strong className="text-foreground">12% return, 10-year</strong> target of $1 Million:
            </p>
            <div className="space-y-3">
              {STEPUP_DATA.map(({ label, dca, total, invested, gain }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 rounded-xl bg-white border border-[#E8E4DF]">
                  <p className="text-foreground text-sm font-medium sm:w-52 flex-shrink-0">{label}</p>
                  <div className="flex gap-4 text-xs flex-wrap">
                    <span className="text-gray-500 dark:text-gray-400">Starting DCA: <span className="text-[var(--color-accent)] font-bold">{fmt(dca)}/mo</span></span>
                    <span className="text-gray-500 dark:text-gray-400">Final corpus: <span className="text-foreground font-bold">{total}</span></span>
                    <span className="text-gray-500 dark:text-gray-400">Total invested: <span className="text-[var(--color-accent)]">{invested}</span></span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 leading-relaxed">
              A 10% annual step-up allows you to start with just $24,000/month instead of $43,000 — 
              a 44% reduction in starting DCA amount, while still reaching $1 Million in 10 years.
            </p>
          </div>

          {/* The power of time */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">The Biggest Factor: Time</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              The table above shows that extending your DCA from 10 to 20 years at 12% reduces
              your required DCA from <strong className="text-foreground">$43,000 to just $8,000/month</strong> — a 5x reduction.
              This is the power of compounding. The longer you invest, the less you need to invest each month.
            </p>
            <div className="bg-[rgba(27,58,92,0.08)] border border-[rgba(27,58,92,0.2)] rounded-xl p-4 text-sm text-gray-500 dark:text-gray-400">
              <p className="text-foreground font-semibold mb-1">💡 Key insight</p>
              <p>Starting a $8,000/month DCA at age 25 will reach $1 Million by age 45.
              Waiting until 35 requires $43,000/month for the same goal. <strong className="text-foreground">15 years of delay costs $35,000/month extra.</strong></p>
            </div>
          </div>

          {/* Warning */}
          <div className="glass-panel p-5 border border-amber-400/20">
            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <AlertTriangle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#059669]">Disclaimer:</strong> These figures assume a constant annual return rate,
                which real markets do not provide. Actual DCA returns vary year to year. Consult a SEBI-registered
                financial adviser before making investment decisions.
                <Link href="/us/disclaimer" className="text-[var(--color-accent)] hover:underline ml-1">Read our full methodology →</Link>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-2">Calculate Your Exact DCA Amount</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Use our free interactive calculators to get precise projections with step-up, inflation, and lump sum.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                <Calculator className="w-4 h-4" /> Step-Up DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/target-amount-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Time-to-$1Crore Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

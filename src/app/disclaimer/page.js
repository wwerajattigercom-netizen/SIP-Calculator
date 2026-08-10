"use client";
import Link from 'next/link';
import { Shield, Calculator, TrendingUp, Target, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const METHODOLOGY = [
  {
    tool: 'SIP Calculator (Step-Up)',
    convention: 'APR ÷ 12 = monthly rate',
    timing: 'SIP added at beginning of month, then compounded',
    standard: 'SEBI / AMFI India standard',
    note: 'Matches projections used by Indian mutual fund industry for SIP illustrations.',
  },
  {
    tool: 'Time-to-Goal / Target Calculator',
    convention: 'APR ÷ 12 = monthly rate',
    timing: 'Same as SIP Calculator — consistent across tools',
    standard: 'SEBI / AMFI India standard',
    note: 'Binary search used to solve for duration when SIP and target are known inputs.',
  },
  {
    tool: 'CAGR Calculator (Lump Sum)',
    convention: 'Standard CAGR formula: (FV÷PV)^(1÷n) − 1',
    timing: 'Single lump sum — no monthly timing',
    standard: 'Universal financial standard',
    note: 'Displayed as annualised rate. For SIP+lumpsum mode, IRR/binary-search gives effective annual APR.',
  },
  {
    tool: 'Lumpsum Calculator',
    convention: 'FV = PV × (1 + r)^n  where r = annual rate',
    timing: 'Annual compounding',
    standard: 'Standard compound interest',
    note: 'No monthly contributions. Simple future value of a single deposit.',
  },
];

export default function DisclaimerPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto space-y-8">

        <Breadcrumb items={[{ label: 'Disclaimer & Methodology' }]} />

        {/* Hero */}
        <div className="glass-panel p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.08)] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[rgba(27,58,92,0.2)] border border-[#1B3A5C] p-2.5 rounded-xl">
                <Shield className="w-6 h-6 text-[#1B3A5C]" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#1F2937]">Disclaimer &amp; Formula Methodology</h1>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              StepupCalculator is committed to transparency. This page documents exactly which
              mathematical formulas each calculator uses, the industry standard they follow,
              and the financial disclaimer that applies to all results.
            </p>
          </div>
        </div>

        {/* Financial Disclaimer */}
        <div className="glass-panel p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
            <h2 className="text-xl font-bold text-[#1F2937]">Financial Disclaimer</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
            <p>
              All calculators on StepupCalculator.com are provided for <strong className="text-[#1F2937]">
              educational and illustrative purposes only</strong>. They do not constitute financial
              advice, investment recommendations, or any form of professional financial consultation.
            </p>
            <p>
              Mutual fund investments are subject to market risks. Past performance is not indicative
              of future returns. The return rates used in these calculators are hypothetical assumptions
              chosen by the user — they do not represent guaranteed returns from any investment product.
            </p>
            <p>
              Before making any investment decision, please consult a SEBI-registered investment
              adviser or certified financial planner who can assess your individual financial situation,
              risk tolerance, and goals.
            </p>
            <p className="text-gray-500 text-xs">
              StepupCalculator.com is not affiliated with SEBI, AMFI, any mutual fund house, bank,
              brokerage, or financial institution.
            </p>
          </div>
        </div>

        {/* Formula Methodology Table */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-2">Formula Methodology</h2>
          <p className="text-gray-500 text-xs mb-5 leading-relaxed">
            Different calculators across the internet (Groww, SBI Securities, ET Money) may produce
            slightly different results for the same inputs. This is because they use different
            formula conventions — APR vs EAR, beginning-of-month vs end-of-month SIP timing.
            Here is exactly what each StepupCalculator tool uses:
          </p>
          <div className="space-y-4">
            {METHODOLOGY.map(({ tool, convention, timing, standard, note }) => (
              <div key={tool} className="p-4 rounded-xl bg-white border border-[#E8E4DF]">
                <p className="text-[#1F2937] font-semibold text-sm mb-2">{tool}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 flex-shrink-0">Rate convention:</span>
                    <span className="text-gray-600">{convention}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 flex-shrink-0">SIP timing:</span>
                    <span className="text-gray-600">{timing}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 flex-shrink-0">Standard:</span>
                    <span className="text-[#0D9488]">{standard}</span>
                  </div>
                  <div className="flex gap-2 pt-1 border-t border-[#E8E4DF] mt-1">
                    <span className="text-gray-600">{note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why results differ from other calculators */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-3">Why Do Results Differ Across Calculators?</h2>
          <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
            <p>
              If you enter the same inputs on Groww, SBI Securities, and StepupCalculator, you may
              get slightly different final values. This is <strong className="text-[#1F2937]">not an error</strong> —
              it is a consequence of different mathematical conventions:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'APR vs EAR: Some calculators divide the annual rate by 12 (APR). Others convert it to a true monthly equivalent using (1+r)^(1/12)−1 (EAR). This produces a small but real difference.',
                'SIP timing: Some add your SIP at the start of the month (before compounding) — this is an annuity-due and produces slightly higher returns. Others add at the end of the month (ordinary annuity).',
                'Rounding: Monthly rounding of intermediate values accumulates over 10–30 years.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1B3A5C] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              StepupCalculator uses <strong className="text-[#1F2937]">APR + beginning-of-month SIP</strong>,
              which is the convention used by SEBI/AMFI for Indian mutual fund SIP illustrations and
              is the most common standard in the Indian financial industry.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="glass-panel p-5 bg-gradient-to-r from-[rgba(27,58,92,0.08)] to-transparent">
          <p className="text-gray-500 text-sm mb-3 text-center">Try our free calculators</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/', label: 'SIP Calculator', icon: <Calculator className="w-3.5 h-3.5" /> },
              { href: '/cagr-calculator', label: 'CAGR Calculator', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { href: '/target-amount-calculator', label: 'Goal Calculator', icon: <Target className="w-3.5 h-3.5" /> },
            ].map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 text-[#1B3A5C] hover:text-[#1F2937] border border-[#1B3A5C]/30 hover:border-[#1B3A5C] px-4 py-2 rounded-lg text-xs font-medium transition-all"
              >
                {icon}{label}<ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

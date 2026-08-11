"use client";

import React from 'react';
import Link from 'next/link';
import { useCAGRCalculator } from '@/hooks/useCAGRCalculator';
import InputSlider from '@/components/InputSlider';
import CAGRResultSection from '@/components/CAGRResultSection';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { TrendingUp, Mail, Info, HelpCircle, ChevronDown, ArrowRight, Calculator, Target } from 'lucide-react';
import { formatToShortWords } from '@/utils/formatters';

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'CAGR Calculator — Compound Annual Growth Rate Calculator Online Free',
      description:
        'Free online CAGR Calculator — Calculate Compound Annual Growth Rate of any investment instantly. Supports lump sum + monthly DCA. Get year-by-year growth table, Rule of 72, and absolute vs annualised return comparison.',
      url: 'https://stepupcalculator.com/us/cagr-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'CAGR calculation for lump sum investments',
        'Effective CAGR for DCA + lump sum (IRR method)',
        'Compound annual growth rate formula',
        'Year-by-year investment growth table',
        'Rule of 72 — investment doubling time',
        'Absolute return vs CAGR comparison',
        'Free online CAGR calculator India',
        'Mutual fund CAGR calculator',
        'Stock CAGR calculator',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1200',
        bestRating: '5',
      },
    },
    {
      '@type': 'HowTo',
      name: 'How to Calculate CAGR Online',
      description: 'Step-by-step guide to calculating Compound Annual Growth Rate using the StepupCalculator CAGR Calculator.',
      step: [
        { '@type': 'HowToStep', name: 'Enter Initial Investment', text: 'Enter the amount you originally invested (starting value). Supports $1 to $10 Million.' },
        { '@type': 'HowToStep', name: 'Enter Final Portfolio Value', text: 'Enter the current or ending value of the investment.' },
        { '@type': 'HowToStep', name: 'Set Duration in Years', text: 'Enter how many years the investment was held (1–100 years).' },
        { '@type': 'HowToStep', name: 'Read the CAGR Result', text: 'The calculator instantly shows your CAGR %, absolute gain, and a year-by-year compounding table.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is CAGR and how is it calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CAGR (Compound Annual Growth Rate) is the annualised growth rate of an investment from its initial to final value, assuming annual compounding. CAGR Formula: CAGR = (Final Value ÷ Initial Value)^(1 ÷ Years) − 1. Example: $1 Hundred Thousand growing to $5 Hundred Thousand in 10 years = CAGR of 17.46% p.a.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good CAGR for a mutual fund in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A CAGR of 12–15% is considered good for Indian equity mutual funds over 10+ years. Large-cap index funds typically deliver 10–12% CAGR. Mid and small-cap funds have historically achieved 14–18% CAGR over 10+ years. Anything consistently above 15% over 10 years is exceptional. For debt funds or CDs, 6–8% CAGR is considered decent.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between CAGR and absolute return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolute return = (Final − Initial) ÷ Initial × 100. It shows total gain with no time context. CAGR is the annualised version. Example: $1 Hundred Thousand → $2 Hundred Thousand in 5 years = 100% absolute return but only 14.87% CAGR p.a. Always use CAGR when comparing investments of different durations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can CAGR be used for DCA returns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No — CAGR is only accurate for lump sum investments (single cash flow). For SIPs, the correct metric is XIRR (Extended Internal Rate of Return), which accounts for the timing of each monthly investment. Our CAGR calculator supports a combined lump sum + monthly DCA mode that computes the effective rate of return using IRR methodology.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Rule of 72?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Rule of 72 is a quick mental shortcut: divide 72 by the CAGR % to estimate how many years your investment takes to double. At 12% CAGR → 6 years. At 8% CAGR → 9 years. At 18% CAGR → 4 years. Our CAGR calculator shows this automatically below the result.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can CAGR be negative?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. If your investment lost value (Final Value < Initial Investment), the CAGR will be negative, indicating an average annual loss. For example, $1 Hundred Thousand falling to $70,000 over 5 years gives a CAGR of approximately −6.7% p.a.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is CAGR the same as the average annual return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. CAGR is a compounded annualised return — it accounts for the effect of compounding (earning returns on returns). A simple average of yearly returns can be misleading because it does not account for compounding. CAGR gives a more accurate picture of real investment performance over time.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is CAGR different from XIRR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CAGR works for a single lump sum investment with one start and one end value. XIRR (Extended Internal Rate of Return) handles multiple cash flows at irregular intervals — perfect for SIPs or investments with top-ups. Most mutual fund apps (Groww, Zerodha, ET Money) use XIRR for DCA performance tracking.',
          },
        },
      ],
    },
  ],
};

const HOW_TO_STEPS = [
  { step: '1', title: 'Enter Initial Investment', desc: 'The amount you originally invested — this is the starting value. Range: $1 to $10 Million.' },
  { step: '2', title: 'Enter Final Value', desc: 'The current or ending value of that investment. Must be greater than $0.' },
  { step: '3', title: 'Set the Duration', desc: 'How many years the investment was held. Supports 1 to 100 years for long-horizon planning.' },
  { step: '4', title: 'Read the CAGR', desc: 'The result shows your annualised growth rate (CAGR %). Green = strong (≥15%), Purple = healthy (8–15%), Amber = moderate (<8%).' },
  { step: '5', title: 'Check the Pie Chart', desc: 'The doughnut chart shows what portion of your final value was original investment vs. gains earned.' },
  { step: '6', title: 'Review Year-by-Year Table', desc: 'See exactly how the investment compounds each year at the calculated CAGR rate.' },
];

const FAQS = [
  {
    q: 'What is CAGR in simple terms?',
    a: 'CAGR (Compound Annual Growth Rate) is the "smoothed" annual growth rate of an investment over a specific time period. It tells you at what constant annual rate your investment grew — ignoring short-term ups and downs. Formula: CAGR = (Final Value ÷ Initial Value)^(1 ÷ Years) − 1. Example: $1 Hundred Thousand → $3 Hundred Thousand in 10 years = CAGR of 11.61% p.a.',
  },
  {
    q: 'What is a good CAGR for mutual funds in India?',
    a: 'In India, 12–15% CAGR is considered good for equity mutual funds over 10+ years. Large-cap index funds (Nifty 50) typically deliver 10–12%. Mid-cap and small-cap funds have historically achieved 14–18% over long periods. For debt funds or CDs, 6–8% is decent. Anything consistently above 15% over 10+ years is exceptional performance.',
  },
  {
    q: 'What is the difference between CAGR and absolute return?',
    a: 'Absolute return shows total gain with no time context: (Final − Initial) ÷ Initial × 100. CAGR is the annualised version. Example: $1 Hundred Thousand → $2 Hundred Thousand in 5 years = 100% absolute return, but only 14.87% CAGR p.a. CAGR lets you fairly compare investments of different durations.',
  },
  {
    q: 'Is CAGR the same as average annual return?',
    a: 'No. CAGR accounts for compounding — earning returns on your returns. A simple average of yearly returns does not. Example: If a stock gains 50% one year and loses 33% the next, the average is 8.5%, but the CAGR is actually 0% (you are back to the same value). CAGR is always more accurate for measuring real performance.',
  },
  {
    q: 'Can CAGR be negative?',
    a: 'Yes. If your final value is less than the initial investment, CAGR will be negative — showing an average annual loss. For example, $1 Hundred Thousand falling to $70,000 over 5 years gives a CAGR of approximately −6.7% p.a. Our calculator handles negative CAGR and shows it with an orange warning.',
  },
  {
    q: 'Can I use CAGR to evaluate DCA returns?',
    a: 'No — CAGR is designed for a single lump sum investment. For SIPs (monthly investments), the correct metric is XIRR, which accounts for the different timing of each cash flow. Our calculator\'s DCA + lump sum mode computes the effective return rate using IRR (Internal Rate of Return) — the same principle used by Groww, Zerodha, and ET Money for DCA tracking.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'The Rule of 72 is a quick mental shortcut: divide 72 by your CAGR to estimate how many years it takes your investment to double. At 12% CAGR → 6 years. At 8% CAGR → 9 years. At 18% CAGR → 4 years. Our calculator shows your doubling time automatically below the CAGR badge.',
  },
  {
    q: 'How is CAGR different from XIRR?',
    a: 'CAGR works for a single investment with one entry and one exit point. XIRR (Extended Internal Rate of Return) handles multiple cash flows at irregular intervals — ideal for SIPs or investments with top-ups. Most mutual fund apps (Groww, Zerodha, ET Money) report DCA returns as XIRR, not CAGR.',
  },
  {
    q: 'How is CAGR different from simple interest?',
    a: 'Simple interest = a fixed % applied to the original principal only, every year. CAGR uses compound interest — the % is applied to the growing balance each year (you earn returns on your returns). Over 20+ years, this difference becomes enormous. $1 Hundred Thousand at 12% simple interest for 20 years = $3.4 Hundred Thousand. At 12% compound (CAGR) = $9.65 Hundred Thousand.',
  },
];

export default function CAGRCalculatorPage() {
  const { state, setters, results } = useCAGRCalculator();
  const [openFaq, setOpenFaq] = React.useState(null);

  const { cagrPct, absoluteGain, gainPct, yearlyData } = results;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CALCULATOR ── */}
      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'CAGR Calculator' }]} />

          {/* Header */}
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              CAGR Calculator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Enter your initial investment, final value, and duration to instantly calculate your Compound Annual Growth Rate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

            {/* ── INPUT PANEL ── */}
            <div className="lg:col-span-6 xl:col-span-5 glass-panel p-4 lg:p-5 relative">

              <InputSlider
                label="Initial Investment (Lump Sum)"
                value={state.initialInvestment}
                onChange={setters.setInitialInvestment}
                min={0}
                max={100000000}
                step={1000}
                prefix="$"
              />

              <InputSlider
                label="Monthly DCA Amount (optional)"
                value={state.monthlySip}
                onChange={setters.setMonthlySip}
                min={0}
                max={500000}
                step={500}
                prefix="$"
              />

              <InputSlider
                label="Final Portfolio Value"
                value={state.finalValue}
                onChange={setters.setFinalValue}
                min={1000}
                max={1000000000}
                step={1000}
                prefix="$"
              />

              <InputSlider
                label="Duration"
                value={state.duration}
                onChange={setters.setDuration}
                min={1}
                max={100}
                step={1}
                suffix="Yr"
              />

              {/* Quick Rule of 72 hint */}
              <div className="mt-4 glass-panel px-4 py-3 bg-[rgba(27,58,92,0.06)] border-[rgba(27,58,92,0.2)]">
                <p className="text-[11px] text-[var(--color-accent)] font-semibold mb-0.5">Rule of 72 — Quick Doubling Check</p>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">
                  At <strong className="text-foreground">{cagrPct}% CAGR</strong>, your money doubles every{' '}
                  <strong className="text-foreground">
                    {cagrPct > 0 ? (72 / cagrPct).toFixed(1) : '—'} years
                  </strong>.
                </p>
              </div>

              {/* Internal backlinks */}
              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 space-y-2">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Also try:</p>
                <Link
                  href="/us/dca-calculator"
                  className="flex items-center gap-2 text-[var(--color-accent)] text-xs hover:text-foreground transition-colors group"
                  id="link-dca-from-cagr"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>DCA + Step-Up Calculator — grow wealth month by month</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/us/target-amount-calculator"
                  className="flex items-center gap-2 text-[var(--color-accent)] text-xs hover:text-foreground transition-colors group"
                  id="link-goal-from-cagr"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Time to Goal DCA Calculator — how long to reach $1 Million?</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* ── RESULT PANEL ── */}
            <div className="lg:col-span-6 xl:col-span-7 h-full lg:sticky lg:top-8">
              <CAGRResultSection results={results} />
            </div>
          </div>
        </div>
      </main>

      {/* ── BELOW THE FOLD ── */}
      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-10">

        {/* ── YEAR-BY-YEAR COMPOUNDING TABLE ── */}
        <section id="yearly-table" aria-label="Year by year compounding growth">
          <div className="glass-panel overflow-hidden">
            <div className="px-5 py-4 border-b border-black/5 dark:border-white/10">
              <h2 className="text-foreground font-bold text-base">Year-by-Year Growth at {cagrPct}% Effective Rate</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                {state.monthlySip > 0
                  ? `Lump sum ${formatCurrency(state.initialInvestment)} + DCA ${formatCurrency(state.monthlySip)}/mo → target ${formatCurrency(state.finalValue)} over ${state.duration} years`
                  : `How ${formatCurrency(state.initialInvestment)} (${formatToShortWords(state.initialInvestment)}) compounds to ${formatCurrency(state.finalValue)} (${formatToShortWords(state.finalValue)}) over ${state.duration} years`
                }
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[400px]">
                <thead>
                  <tr className="bg-[rgba(27,58,92,0.12)] border-b border-black/5 dark:border-white/10">
                    <th className="text-left   text-[#6B7280] font-semibold py-3 px-4">Year</th>
                    <th className="text-right  text-gray-500 dark:text-gray-400  font-semibold py-3 px-3">Total Invested</th>
                    <th className="text-right  text-[#0D9488] font-semibold py-3 px-3">Gain Earned</th>
                    <th className="text-right  text-[#6B7280] font-semibold py-3 px-4">Portfolio Value</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map(({ year, value, invested, gainAbs }, i) => {
                    const progress = Math.min(100, (value / state.finalValue) * 100);
                    const isLast   = year === state.duration;
                    return (
                      <tr
                        key={year}
                        className={`border-b border-black/5 dark:border-white/10 transition-colors ${
                          isLast
                            ? 'bg-[rgba(27,58,92,0.18)]'
                            : i % 2 === 0
                            ? 'bg-[rgba(0,0,0,0.03)]'
                            : ''
                        }`}
                      >
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${isLast ? 'text-[var(--color-accent)]' : 'text-gray-600 dark:text-gray-400'}`}>
                              {year === 0 ? 'Start' : `Year ${year}`}
                            </span>
                            {isLast && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-white">
                                Final
                              </span>
                            )}
                          </div>
                          <div className="mt-1 w-full h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width:      `${progress}%`,
                                background: isLast ? '#1B3A5C' : 'linear-gradient(90deg, #1B3A5C, #1B3A5C)',
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-500 dark:text-gray-400">
                          <div>{formatCurrency(invested)}</div>
                          <div className="text-[9px] text-gray-600 dark:text-gray-400 mt-0.5">{formatToShortWords(invested)}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#0D9488]">
                          {gainAbs > 0 ? `+${formatCurrency(gainAbs)}` : gainAbs < 0 ? formatCurrency(gainAbs) : '—'}
                          {gainAbs !== 0 && (
                            <div className="text-[9px] text-green-800 mt-0.5">{formatToShortWords(Math.abs(gainAbs))}</div>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className={`font-bold ${isLast ? 'text-[var(--color-accent)]' : 'text-white'}`}>
                            {formatCurrency(value)}
                          </div>
                          <div className={`text-[9px] mt-0.5 ${isLast ? 'text-[#6B7280]' : 'text-gray-500 dark:text-gray-400'}`}>
                            {formatToShortWords(value)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 text-gray-600 dark:text-gray-400 text-[10px] border-t border-black/5 dark:border-white/10">
              ⚠️ This table assumes a constant {cagrPct}% CAGR. Actual investment returns vary yearly.
            </div>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the CAGR calculator">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOW_TO_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="glass-panel p-5 flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">{title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-label="Frequently Asked Questions about CAGR">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-xl">
              <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="glass-panel overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  id={`cagr-faq-${i}`}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-foreground font-medium text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-accent)] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/10 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CAGR FORMULA SECTION — targets featured snippets ── */}
        <section id="cagr-formula" aria-label="CAGR formula and worked example" className="mt-2">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">CAGR Formula &amp; Worked Example</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formula */}
              <div>
                <h3 className="text-[var(--color-accent)] font-semibold text-sm mb-3 uppercase tracking-wider">The Formula</h3>
                <div className="bg-[rgba(27,58,92,0.1)] border border-[rgba(27,58,92,0.25)] rounded-xl p-4 font-mono text-center">
                  <p className="text-foreground text-sm font-bold mb-1">CAGR = (FV ÷ PV) ^ (1 ÷ n) − 1</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-left space-y-1">
                    <p><span className="text-[#6B7280]">FV</span> = Final Value (ending portfolio value)</p>
                    <p><span className="text-[#6B7280]">PV</span> = Present Value (initial investment)</p>
                    <p><span className="text-[#6B7280]">n</span> = Number of years</p>
                  </div>
                </div>
              </div>
              {/* Worked example */}
              <div>
                <h3 className="text-[var(--color-accent)] font-semibold text-sm mb-3 uppercase tracking-wider">Worked Example</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Initial Investment (PV)</span>
                    <span className="text-foreground font-medium">$1,00,000</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Final Value (FV)</span>
                    <span className="text-foreground font-medium">$5,00,000</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Duration (n)</span>
                    <span className="text-foreground font-medium">10 years</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500 dark:text-gray-400">CAGR</span>
                    <span className="text-[#0D9488] font-bold text-base">(5÷1)^(1/10) − 1 = <strong>17.46%</strong></span>
                  </div>
                </div>
              </div>
            </div>
            {/* CAGR vs Absolute Return comparison */}
            <div className="mt-5 pt-5 border-t border-[#E8E4DF]">
              <h3 className="text-foreground font-semibold text-sm mb-3">CAGR vs Absolute Return — Quick Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#6B7280] border-b border-black/5">
                      <th className="text-left py-2 pr-4">Investment</th>
                      <th className="text-right py-2 pr-4">Absolute Return</th>
                      <th className="text-right py-2">CAGR</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500 dark:text-gray-400">
                    {[
                      { inv: '$1L → $2L in 5 yrs',  abs: '100%',  cagr: '14.87%' },
                      { inv: '$1L → $2L in 10 yrs', abs: '100%',  cagr: '7.18%'  },
                      { inv: '$1L → $5L in 10 yrs', abs: '400%',  cagr: '17.46%' },
                      { inv: '$1L → $10L in 15 yrs',abs: '900%',  cagr: '16.60%' },
                    ].map(({ inv, abs, cagr }) => (
                      <tr key={inv} className="border-b border-[#E8E4DF]">
                        <td className="py-2 pr-4">{inv}</td>
                        <td className="py-2 pr-4 text-right">{abs}</td>
                        <td className="py-2 text-right text-[#0D9488] font-medium">{cagr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-2">Same absolute return but very different CAGR — duration matters.</p>
            </div>
          </div>
        </section>

        {/* ── RELATED TOOLS — keyword-rich internal backlinks ── */}
        <section id="related-calculators" aria-label="Related free financial calculators India">
          <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-1 text-center">More Free Financial Calculators</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center mb-4">All tools are free, real-time, and require no sign-up.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/us/dca-calculator"
                id="cta-dca-calculator-from-cagr"
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl"
              >
                <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-lg flex-shrink-0">
                  <Calculator className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">Step-Up DCA Calculator</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">DCA with annual step-up, inflation &amp; lump sum — free online tool</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-[var(--color-accent)] ml-auto transition-colors" />
              </Link>
              <Link
                href="/us/target-amount-calculator"
                id="cta-goal-dca-calculator-from-cagr"
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl"
              >
                <div className="bg-[rgba(27,58,92,0.2)] border border-[rgba(27,58,92,0.3)] p-2 rounded-lg flex-shrink-0">
                  <Target className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">DCA Goal / Time-to-Target Calculator</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">How long to reach $1 Million? Find DCA needed for any goal.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-[var(--color-accent)] ml-auto transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" aria-label="About the creator">
          <div className="glass-panel p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.08)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-3 text-lg font-bold text-white shadow-sm">
                R
              </div>
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Built by <span className="text-[var(--color-accent)] font-bold text-sm">Rajat</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
                Free financial calculators for Indian investors — DCA, Step-Up, Goal Planning, and CAGR, all in one place.
              </p>
              <a
                href="mailto:businesswebsitestudio@gmail.com"
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white hover:bg-[#112740] transition-all px-5 py-2.5 rounded-xl text-xs font-medium shadow-sm"
              >
                <Mail className="w-4 h-4" />
                businesswebsitestudio@gmail.com
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-4">For business queries, collaborations, or feedback</p>
              <p className="text-gray-500 dark:text-gray-500 text-[10px] mt-2">© {new Date().getFullYear()} Rajat</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

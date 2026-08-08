"use client";

import React from 'react';
import Link from 'next/link';
import { useCAGRCalculator } from '@/hooks/useCAGRCalculator';
import InputSlider from '@/components/InputSlider';
import CAGRResultSection from '@/components/CAGRResultSection';
import CalculatorTabs from '@/components/CalculatorTabs';
import { TrendingUp, Mail, Info, HelpCircle, ChevronDown, ArrowRight, Calculator, Target } from 'lucide-react';
import { formatToShortWords } from '@/utils/formatters';

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'CAGR Calculator — Compound Annual Growth Rate Calculator',
      description:
        'Calculate CAGR (Compound Annual Growth Rate) of any investment. Enter initial value, final value, and duration — get CAGR %, absolute gain, and year-by-year growth. Free online CAGR calculator.',
      url: 'https://stepupcalculator.com/cagr-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      featureList: [
        'CAGR calculation',
        'Compound annual growth rate formula',
        'Year-by-year investment growth table',
        'Absolute gain & gain % calculation',
        'Free online CAGR calculator India',
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
            text: 'CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from its initial value to its final value over a period of time, assuming growth is compounded annually. Formula: CAGR = (Final Value / Initial Value)^(1/Years) − 1. For example, ₹1 Lakh growing to ₹5 Lakh in 10 years gives a CAGR of 17.46% p.a.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good CAGR for a mutual fund in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A CAGR of 12–15% is considered good for Indian equity mutual funds over long periods (10+ years). Large-cap index funds typically deliver 10–12% CAGR. Mid and small-cap funds have historically achieved 14–18% CAGR over 10+ year periods. Any CAGR above 15% consistently over 10+ years is exceptional.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between CAGR and absolute return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolute return is the total percentage gain/loss: (Final − Initial) / Initial × 100. CAGR is the annualised version — it tells you the year-on-year rate of growth. For example, an investment doubling in 5 years has a 100% absolute return but a CAGR of 14.87% p.a. CAGR is more useful for comparing investments of different durations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use CAGR to evaluate SIP returns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CAGR is strictly for lump sum investments where you invest once and measure the final value. For SIP (Systematic Investment Plan) returns where you invest monthly, the correct metric is XIRR (Extended Internal Rate of Return), which accounts for the timing of each cash flow. Use CAGR for one-time investments; use XIRR for SIP returns.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Rule of 72?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Rule of 72 is a quick mental math shortcut: divide 72 by the CAGR to estimate how many years it takes for an investment to double. For example, at 12% CAGR, 72 ÷ 12 = 6 years to double. At 8% CAGR, 72 ÷ 8 = 9 years. This is an approximation; the actual formula is more precise.',
          },
        },
      ],
    },
  ],
};

const HOW_TO_STEPS = [
  { step: '1', title: 'Enter Initial Investment', desc: 'The amount you originally invested — this is the starting value. Range: ₹1 to ₹10 Crore.' },
  { step: '2', title: 'Enter Final Value', desc: 'The current or ending value of that investment. Must be greater than ₹0.' },
  { step: '3', title: 'Set the Duration', desc: 'How many years the investment was held. Supports 1 to 100 years for long-horizon planning.' },
  { step: '4', title: 'Read the CAGR', desc: 'The result shows your annualised growth rate (CAGR %). Green = strong (≥15%), Purple = healthy (8–15%), Amber = moderate (<8%).' },
  { step: '5', title: 'Check the Pie Chart', desc: 'The doughnut chart shows what portion of your final value was original investment vs. gains earned.' },
  { step: '6', title: 'Review Year-by-Year Table', desc: 'See exactly how the investment compounds each year at the calculated CAGR rate.' },
];

const FAQS = [
  {
    q: 'What is CAGR?',
    a: 'CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from its initial to final value, assuming annual compounding. Formula: CAGR = (Final Value / Initial Value)^(1/Years) − 1. It smooths out volatility and gives a single comparable number.',
  },
  {
    q: 'What is a good CAGR for mutual funds?',
    a: 'In India, 12–15% CAGR is considered good for equity mutual funds over 10+ years. Large-cap index funds typically deliver 10–12%. Mid/small-cap funds have historically hit 14–18% over long periods. Anything consistently above 15% over 10+ years is exceptional.',
  },
  {
    q: 'What is the difference between CAGR and absolute return?',
    a: 'Absolute return = (Final − Initial) / Initial × 100 — total percentage gain with no time context. CAGR = annualised version. Example: ₹1 Lakh → ₹2 Lakh in 5 years = 100% absolute return, but only 14.87% CAGR p.a. Always compare investments using CAGR for a fair comparison.',
  },
  {
    q: 'Can CAGR be used for SIP returns?',
    a: 'No — CAGR is only accurate for lump sum investments (one-time investment). For SIPs, use XIRR which accounts for the timing of each monthly cash flow. Using CAGR on SIP would be misleading since each instalment is invested at a different point.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'Divide 72 by your CAGR to estimate the years needed for your investment to double. At 12% CAGR → 6 years to double. At 8% CAGR → 9 years. At 18% CAGR → 4 years. A quick mental check before you use the full calculator.',
  },
  {
    q: 'How is CAGR different from simple interest?',
    a: 'Simple interest = fixed % applied to the original principal only, every year. CAGR (compound) = % applied to the growing balance each year (interest on interest). Over long periods, compounding creates exponentially larger returns than simple interest.',
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

          {/* Header */}
          <div className="flex items-center justify-center mb-2 lg:mb-3">
            <div className="bg-[#8b5cf6] p-2 rounded-xl mr-3 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
              <span className="text-gradient">CAGR</span> Calculator
            </h1>
          </div>

          <p className="text-center text-gray-400 text-sm mb-5 max-w-xl mx-auto">
            Enter your initial investment, final value, and duration to instantly calculate the{' '}
            <strong className="text-white">Compound Annual Growth Rate</strong>.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

            {/* ── INPUT PANEL ── */}
            <div className="lg:col-span-6 xl:col-span-5 glass-panel p-5 lg:p-6 relative">

              <InputSlider
                label="Initial Investment (Lump Sum)"
                value={state.initialInvestment}
                onChange={setters.setInitialInvestment}
                min={0}
                max={100000000}
                step={1000}
                prefix="₹"
              />

              <InputSlider
                label="Monthly SIP Amount (optional)"
                value={state.monthlySip}
                onChange={setters.setMonthlySip}
                min={0}
                max={500000}
                step={500}
                prefix="₹"
              />

              <InputSlider
                label="Final Portfolio Value"
                value={state.finalValue}
                onChange={setters.setFinalValue}
                min={1000}
                max={1000000000}
                step={1000}
                prefix="₹"
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
              <div className="mt-4 glass-panel px-4 py-3 bg-[rgba(139,92,246,0.06)] border-[rgba(139,92,246,0.2)]">
                <p className="text-[11px] text-[#a78bfa] font-semibold mb-0.5">Rule of 72 — Quick Doubling Check</p>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  At <strong className="text-white">{cagrPct}% CAGR</strong>, your money doubles every{' '}
                  <strong className="text-white">
                    {cagrPct > 0 ? (72 / cagrPct).toFixed(1) : '—'} years
                  </strong>.
                </p>
              </div>

              {/* Internal backlinks */}
              <div className="mt-4 pt-4 border-t border-white border-opacity-10 space-y-2">
                <p className="text-gray-500 text-xs mb-1">Also try:</p>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#a78bfa] text-xs hover:text-white transition-colors group"
                  id="link-sip-from-cagr"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>SIP + Step-Up Calculator — grow wealth month by month</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/target-amount-calculator"
                  className="flex items-center gap-2 text-[#a78bfa] text-xs hover:text-white transition-colors group"
                  id="link-goal-from-cagr"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Time to Goal SIP Calculator — how long to reach ₹1 Crore?</span>
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
            <div className="px-5 py-4 border-b border-white border-opacity-10">
              <h2 className="text-white font-bold text-base">Year-by-Year Growth at {cagrPct}% Effective Rate</h2>
              <p className="text-gray-500 text-xs mt-0.5">
                {state.monthlySip > 0
                  ? `Lump sum ${formatCurrency(state.initialInvestment)} + SIP ${formatCurrency(state.monthlySip)}/mo → target ${formatCurrency(state.finalValue)} over ${state.duration} years`
                  : `How ${formatCurrency(state.initialInvestment)} (${formatToShortWords(state.initialInvestment)}) compounds to ${formatCurrency(state.finalValue)} (${formatToShortWords(state.finalValue)}) over ${state.duration} years`
                }
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[400px]">
                <thead>
                  <tr className="bg-[rgba(139,92,246,0.12)] border-b border-white border-opacity-10">
                    <th className="text-left   text-[#c4b5fd] font-semibold py-3 px-4">Year</th>
                    <th className="text-right  text-gray-400  font-semibold py-3 px-3">Total Invested</th>
                    <th className="text-right  text-green-400 font-semibold py-3 px-3">Gain Earned</th>
                    <th className="text-right  text-[#c4b5fd] font-semibold py-3 px-4">Portfolio Value</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map(({ year, value, invested, gainAbs }, i) => {
                    const progress = Math.min(100, (value / state.finalValue) * 100);
                    const isLast   = year === state.duration;
                    return (
                      <tr
                        key={year}
                        className={`border-b border-white border-opacity-5 transition-colors ${
                          isLast
                            ? 'bg-[rgba(139,92,246,0.18)]'
                            : i % 2 === 0
                            ? 'bg-[rgba(255,255,255,0.015)]'
                            : ''
                        }`}
                      >
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${isLast ? 'text-[#a78bfa]' : 'text-gray-300'}`}>
                              {year === 0 ? 'Start' : `Year ${year}`}
                            </span>
                            {isLast && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8b5cf6] text-white">
                                Final
                              </span>
                            )}
                          </div>
                          <div className="mt-1 w-full h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width:      `${progress}%`,
                                background: isLast ? '#8b5cf6' : 'linear-gradient(90deg, #3B82F6, #8b5cf6)',
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-400">
                          <div>{formatCurrency(invested)}</div>
                          <div className="text-[9px] text-gray-600 mt-0.5">{formatToShortWords(invested)}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-green-400">
                          {gainAbs > 0 ? `+${formatCurrency(gainAbs)}` : gainAbs < 0 ? formatCurrency(gainAbs) : '—'}
                          {gainAbs !== 0 && (
                            <div className="text-[9px] text-green-800 mt-0.5">{formatToShortWords(Math.abs(gainAbs))}</div>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className={`font-bold ${isLast ? 'text-[#a78bfa]' : 'text-white'}`}>
                            {formatCurrency(value)}
                          </div>
                          <div className={`text-[9px] mt-0.5 ${isLast ? 'text-[#c4b5fd]' : 'text-gray-500'}`}>
                            {formatToShortWords(value)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 text-gray-600 text-[10px] border-t border-white border-opacity-5">
              ⚠️ This table assumes a constant {cagrPct}% CAGR. Actual investment returns vary yearly.
            </div>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the CAGR calculator">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[#a78bfa]" />
            </div>
            <h2 className="text-2xl font-bold text-white">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOW_TO_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="glass-panel p-5 flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#8b5cf6] bg-opacity-30 border border-[#8b5cf6] flex items-center justify-center text-[#c4b5fd] font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-white font-semibold mb-1 text-sm">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-label="Frequently Asked Questions about CAGR">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-xl">
              <HelpCircle className="w-5 h-5 text-[#a78bfa]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
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
                  <span className="text-white font-medium text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a78bfa] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white border-opacity-10 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED TOOLS ── */}
        <section id="related-calculators" aria-label="Related financial calculators">
          <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(59,130,246,0.08)]">
            <h2 className="text-lg font-bold text-white mb-4 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/"
                id="cta-sip-from-cagr"
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(139,92,246,0.15)] transition-all group rounded-xl"
              >
                <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-lg flex-shrink-0">
                  <Calculator className="w-4 h-4 text-[#a78bfa]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">Step-Up SIP Calculator</p>
                  <p className="text-gray-500 text-xs">Monthly SIP with annual step-up + inflation</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] ml-auto transition-colors" />
              </Link>
              <Link
                href="/target-amount-calculator"
                id="cta-goal-from-cagr"
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(139,92,246,0.15)] transition-all group rounded-xl"
              >
                <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] p-2 rounded-lg flex-shrink-0">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">Time to Goal SIP Calculator</p>
                  <p className="text-gray-500 text-xs">How long to reach ₹1 Crore with SIP?</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] ml-auto transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" aria-label="About the creator">
          <div className="glass-panel p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,92,246,0.08)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#8b5cf6] bg-opacity-20 border-2 border-[#8b5cf6] flex items-center justify-center mx-auto mb-3 text-lg font-bold text-[#c4b5fd]">
                R
              </div>
              <h2 className="text-xs font-semibold text-gray-400 mb-1">
                Built by <span className="text-gradient font-bold text-sm">Rajat</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
                Free financial calculators for Indian investors — SIP, Step-Up, Goal Planning, and CAGR, all in one place.
              </p>
              <a
                href="mailto:businesswebsitestudio@gmail.com"
                className="inline-flex items-center gap-2 bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] hover:bg-opacity-30 transition-all text-[#c4b5fd] px-5 py-2.5 rounded-xl text-xs font-medium"
              >
                <Mail className="w-4 h-4" />
                businesswebsitestudio@gmail.com
              </a>
              <p className="text-gray-600 text-[10px] mt-4">For business queries, collaborations, or feedback</p>
              <p className="text-gray-700 text-[10px] mt-2">© {new Date().getFullYear()} Rajat</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

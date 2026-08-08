"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, Info, HelpCircle, ChevronDown, ArrowRight, Calculator, Target, Layers } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// ─── helpers ────────────────────────────────────────────────
const fmt = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

function toLabel(v) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return fmt(v);
}

// ─── JSON-LD ─────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Lumpsum Calculator — One-Time Investment Returns Calculator Online Free',
      description: 'Free lumpsum calculator to calculate future value of a one-time investment. Annual compounding, year-by-year table, CAGR, wealth multiple.',
      url: 'https://stepupcalculator.com/lumpsum-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      featureList: [
        'Lumpsum future value calculation',
        'Year-by-year compounding growth table',
        'CAGR & wealth multiple display',
        'Absolute gain calculation',
        'Inflation-adjusted real returns',
        'Free lumpsum mutual fund calculator India',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a lumpsum investment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A lumpsum investment is a one-time, single investment made at once — as opposed to a SIP (Systematic Investment Plan) where you invest a fixed amount monthly. Lumpsum investing is common for windfalls like bonuses, inheritances, or proceeds from selling an asset.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is lumpsum return calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Lumpsum future value = P × (1 + r)^n, where P = initial investment, r = annual return rate, n = number of years. For example: ₹1 Lakh at 12% for 10 years = ₹1,00,000 × (1.12)^10 = ₹3,10,585.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is lumpsum better than SIP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Neither is universally better. Lumpsum investing is better when markets are at a low point, as 100% of your capital compounds from day one. SIP is better when markets are volatile or at highs, as it spreads purchase price over time (rupee cost averaging). Most financial advisers recommend SIP for salaried investors and lumpsum for windfall amounts.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good return for a lumpsum investment in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nifty 50 index has delivered approximately 12–14% CAGR over 15–20 year periods. Large-cap equity mutual funds typically deliver 10–13% CAGR. Mid and small-cap funds have historically provided 14–18% over long periods. FDs and debt funds offer 6–8% CAGR.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does ₹1 Lakh grow in 10 years at 12%?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '₹1 Lakh invested as a lumpsum at 12% annual return for 10 years grows to approximately ₹3,10,585. This is a 3.1x wealth multiple with an absolute gain of ₹2,10,585 (210% absolute return).',
          },
        },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is a lumpsum investment?',
    a: 'A lumpsum investment is a single one-time investment — unlike SIP where you invest monthly. It\'s ideal for windfalls like bonuses, property sale proceeds, or inheritances. 100% of the capital starts compounding immediately from day one.',
  },
  {
    q: 'How is lumpsum return calculated?',
    a: 'Future Value = P × (1 + r)^n. Where P = principal, r = annual rate, n = years. Example: ₹1 Lakh at 12% p.a. for 10 years = ₹1,00,000 × (1.12)^10 = ₹3,10,585. Simple annual compounding.',
  },
  {
    q: 'Is lumpsum better than SIP?',
    a: 'Lumpsum beats SIP when you invest at market lows — since 100% of capital compounds immediately. SIP wins when markets are volatile or at peaks — rupee cost averaging reduces risk. Practically: use SIP for salary savings, lumpsum for windfalls.',
  },
  {
    q: 'What is a good return on lumpsum investment in India?',
    a: 'Nifty 50 index has delivered ~12–14% CAGR over 15–20 year periods. Large-cap equity funds: 10–13%. Mid/small-cap: 14–18% historically. Debt funds: 6–8%. FDs: 6–7.5%. Use 10–12% as a conservative assumption for equity lumpsum in India.',
  },
  {
    q: 'How much does ₹1 Lakh grow in 10 years at 12%?',
    a: '₹1 Lakh at 12% p.a. for 10 years = ₹3,10,585. That\'s a 3.1x wealth multiple, 210% absolute return, and a CAGR of 12%. At 15% it becomes ₹4,04,556 — showing how even 3% extra rate compounds significantly over time.',
  },
  {
    q: 'What is the Rule of 72 for lumpsum investments?',
    a: 'Divide 72 by the annual return rate to estimate how many years it takes for your lumpsum to double. At 12% → 6 years. At 8% → 9 years. At 18% → 4 years. Quick mental check before you calculate the full projection.',
  },
];

// ─── Main Page ───────────────────────────────────────────────
export default function LumpsumCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate]           = useState(12);
  const [years, setYears]         = useState(10);
  const [openFaq, setOpenFaq]     = useState(null);

  // Calculate
  const { futureValue, gain, gainPct, wealthMultiple, yearlyData, rule72 } = useMemo(() => {
    const r = rate / 100;
    const fv = principal * Math.pow(1 + r, years);
    const g  = fv - principal;
    const gp = (g / principal) * 100;
    const wm = fv / principal;
    const r72 = r > 0 ? (72 / rate).toFixed(1) : '∞';
    const data = Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      value: principal * Math.pow(1 + r, i + 1),
    }));
    return { futureValue: fv, gain: g, gainPct: gp, wealthMultiple: wm, yearlyData: data, rule72: r72 };
  }, [principal, rate, years]);

  // Chart
  const chartData = {
    labels: ['Principal', 'Gains'],
    datasets: [{
      data: [principal, gain],
      backgroundColor: ['rgba(59,130,246,0.85)', 'rgba(34,197,94,0.85)'],
      borderColor: ['rgba(59,130,246,0.3)', 'rgba(34,197,94,0.3)'],
      borderWidth: 2,
      hoverOffset: 6,
    }],
  };

  const cagrBadgeColor = rate >= 15 ? 'text-[#22C55E]' : rate >= 8 ? 'text-[#a78bfa]' : 'text-amber-400';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Lumpsum Calculator' }]} />

          {/* Page heading */}
          <div className="flex items-center justify-center mb-4 lg:mb-6">
            <div className="bg-[#8b5cf6] p-2 rounded-xl mr-3 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
              <span className="text-gradient">Lumpsum Calculator</span>{' '}— One-Time Investment Returns
            </h1>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

            {/* Inputs */}
            <div className="lg:col-span-5 glass-panel p-5 lg:p-6">
              <InputSlider label="Lumpsum Investment Amount" value={principal} onChange={setPrincipal} min={1000} max={100000000} step={1000} prefix="₹" />
              <InputSlider label="Expected Annual Return Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
              <InputSlider label="Investment Duration" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yr" />

              {/* Labels */}
              <div className="mt-5 space-y-2 text-xs text-gray-500">
                {[
                  { label: 'Investment', val: toLabel(principal) },
                  { label: 'Duration', val: `${years} years` },
                  { label: 'Return rate', val: `${rate}% p.a.` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between border-b border-white/5 pb-1">
                    <span>{label}</span>
                    <span className="text-gray-300 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-7 space-y-4">

              {/* Summary cards */}
              <div className="glass-panel p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Future Value', value: toLabel(futureValue), color: 'text-white' },
                    { label: 'Total Gain', value: toLabel(gain), color: 'text-[#22C55E]' },
                    { label: 'Absolute Return', value: `${gainPct.toFixed(1)}%`, color: 'text-[#22C55E]' },
                    { label: 'Wealth Multiple', value: `${wealthMultiple.toFixed(2)}x`, color: cagrBadgeColor },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-xl p-3 text-center">
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{label}</p>
                      <p className={`font-bold text-base ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Rule of 72 */}
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.15)] rounded-lg px-3 py-2 mb-5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>At <strong className="text-white">{rate}%</strong>, your investment doubles every <strong className="text-[#a78bfa]">{rule72} years</strong> (Rule of 72)</span>
                </div>

                {/* Chart */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-40 h-40 flex-shrink-0 mx-auto">
                    <Doughnut data={chartData} options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ` ${toLabel(ctx.raw)}` } } } }} />
                  </div>
                  <div className="flex flex-col gap-2 text-sm w-full">
                    {[
                      { dot: 'bg-[#3B82F6]', label: 'Principal Invested', val: toLabel(principal) },
                      { dot: 'bg-[#22C55E]', label: 'Total Gains', val: toLabel(gain) },
                    ].map(({ dot, label, val }) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-gray-400">
                          <span className={`w-2.5 h-2.5 rounded-full ${dot} flex-shrink-0`} />
                          {label}
                        </span>
                        <span className="text-white font-semibold">{val}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/5 pt-2 flex justify-between">
                      <span className="text-gray-400">Future Value</span>
                      <span className="text-white font-bold">{toLabel(futureValue)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year table */}
              <div className="glass-panel p-5">
                <h2 className="text-base font-bold text-white mb-3">Year-by-Year Growth</h2>
                <div className="overflow-x-auto max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-[#0f111a]">
                      <tr className="text-[#c4b5fd] border-b border-white/10">
                        <th className="text-left py-2 pr-3">Year</th>
                        <th className="text-right py-2 pr-3">Value</th>
                        <th className="text-right py-2 pr-3">Gain</th>
                        <th className="text-right py-2">× Multiple</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      {yearlyData.map(({ year, value }) => (
                        <tr key={year} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-1.5 pr-3">{year}</td>
                          <td className="py-1.5 pr-3 text-right text-white">{toLabel(value)}</td>
                          <td className="py-1.5 pr-3 text-right text-[#22C55E]">{toLabel(value - principal)}</td>
                          <td className="py-1.5 text-right text-[#a78bfa]">{(value / principal).toFixed(2)}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          {/* ── FAQ ── */}
          <section id="faq" aria-label="Lumpsum calculator frequently asked questions" className="mt-8">
            <div className="flex items-center gap-3 mb-4">
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
                    id={`lumpsum-faq-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white font-medium text-sm pr-4">{q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#a78bfa] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white border-opacity-10 pt-3">{a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Related Tools ── */}
          <section id="related-calculators" aria-label="Related free financial calculators" className="mt-8 mb-6">
            <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(59,130,246,0.08)]">
              <h2 className="text-lg font-bold text-white mb-1 text-center">More Free Financial Calculators</h2>
              <p className="text-gray-500 text-xs text-center mb-4">All tools free, real-time, no sign-up.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: '/', icon: <Calculator className="w-4 h-4 text-[#a78bfa]" />, label: 'Step-Up SIP Calculator', desc: 'Monthly SIP with step-up & inflation' },
                  { href: '/target-amount-calculator', icon: <Target className="w-4 h-4 text-blue-400" />, label: 'SIP Goal Calculator', desc: 'Time to reach ₹1 Crore with SIP' },
                  { href: '/cagr-calculator', icon: <TrendingUp className="w-4 h-4 text-green-400" />, label: 'CAGR Calculator', desc: 'Compound annual growth rate calculator' },
                ].map(({ href, icon, label, desc }) => (
                  <Link key={href} href={href} className="flex items-start gap-3 glass-panel p-4 hover:bg-[rgba(139,92,246,0.15)] transition-all group rounded-xl">
                    <div className="bg-[rgba(139,92,246,0.15)] p-2 rounded-lg flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">{label}</p>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] ml-auto transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

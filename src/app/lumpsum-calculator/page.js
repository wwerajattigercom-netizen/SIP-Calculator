"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, HelpCircle, ChevronDown, ArrowRight, Calculator, Target, Layers, Coins } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

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
  const [chartTab, setChartTab]   = useState('pie');

  const fmtINR = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  // Calculate
  const { futureValue, gain, yearlyData, rule72 } = useMemo(() => {
    const r = rate / 100;
    const fv = principal * Math.pow(1 + r, years);
    const g  = fv - principal;
    const r72 = r > 0 ? (72 / rate).toFixed(1) : '∞';
    const data = Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      invested: principal,
      value: principal * Math.pow(1 + r, i + 1),
    }));
    return { futureValue: fv, gain: g, yearlyData: data, rule72: r72 };
  }, [principal, rate, years]);

  // ── Pie chart (same colours as SIP tab) ──
  const pieData = {
    labels: ['Invested Amount', 'Est. Returns'],
    datasets: [{
      data: [principal, gain],
      backgroundColor: ['#3B82F6', '#22C55E'],
      borderColor: ['#0f111a', '#0f111a'],
      borderWidth: 4,
      hoverOffset: 4,
    }],
  };
  const pieOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${fmtINR(ctx.raw)}` } },
    },
  };

  // ── Line chart ──
  const lineData = {
    labels: yearlyData.map(d => `Yr ${d.year}`),
    datasets: [
      { label: 'Invested', data: yearlyData.map(d => d.invested), borderColor: '#3B82F6', backgroundColor: '#3B82F6', tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
      { label: 'Wealth Value', data: yearlyData.map(d => d.value), borderColor: '#22C55E', backgroundColor: '#22C55E', tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
    ],
  };
  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}` } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#e2e8f0', maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#e2e8f0', callback: (v) => `₹${(v/100000).toFixed(1)}L` } },
    },
  };

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

            {/* Results — same design as SIP tab */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-5 lg:p-6 flex flex-col h-full relative overflow-hidden">

                {/* Decorative glow — matches SIP tab */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />

                {/* Chart tab strip */}
                <div className="flex bg-[rgba(255,255,255,0.05)] p-1 rounded-lg mb-3 w-full max-w-[240px] mx-auto relative z-10">
                  {[{ key: 'pie', label: 'Pie Chart' }, { key: 'line', label: 'Line Chart' }].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setChartTab(key)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                        chartTab === key ? 'bg-[#8b5cf6] text-white shadow-lg' : 'text-gray-400 hover:text-white'
                      }`}
                    >{label}</button>
                  ))}
                </div>

                {/* Chart area */}
                <div className="relative flex-1 min-h-[220px] flex justify-center items-center overflow-hidden relative z-10 mb-4">
                  {chartTab === 'pie' && (
                    <>
                      <Doughnut data={pieData} options={pieOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-gray-400">Future Value</span>
                        <span className="text-lg md:text-xl font-bold text-white">{fmtINR(futureValue)}</span>
                        <span className="text-[10px] text-[#c4b5fd]">{toLabel(futureValue)}</span>
                      </div>
                    </>
                  )}
                  {chartTab === 'line' && (
                    <Line data={lineData} options={lineOptions} />
                  )}
                </div>

                {/* Breakdown cards — same as SIP tab */}
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] rounded-lg p-2 flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <div className="flex items-center text-[#d8b4fe] text-[10px] mb-0.5 font-medium">
                      <Coins className="w-3 h-3 mr-1" />Future Value
                    </div>
                    <div className="text-sm font-extrabold text-white">{fmtINR(futureValue)}</div>
                    <div className="text-[9px] text-[#c4b5fd] mt-0.5 tracking-wide">{toLabel(futureValue)}</div>
                  </div>

                  <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1.5" />Invested
                    </div>
                    <div className="text-sm font-bold text-white">{fmtINR(principal)}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{toLabel(principal)}</div>
                  </div>

                  <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E] mr-1.5" />Earned
                    </div>
                    <div className="text-sm font-bold text-white">+{fmtINR(gain)}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">{toLabel(gain)}</div>
                  </div>

                  {/* Rule of 72 — full width strip */}
                  <div className="col-span-3 mt-1 bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.25)] rounded-lg px-3 py-2 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#a78bfa] flex-shrink-0" />
                    <span className="text-[10px] text-gray-400">At <strong className="text-white">{rate}%</strong>, doubles every <strong className="text-[#a78bfa]">{rule72} yrs</strong> · Wealth multiple: <strong className="text-white">{(futureValue/principal).toFixed(2)}×</strong></span>
                  </div>
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

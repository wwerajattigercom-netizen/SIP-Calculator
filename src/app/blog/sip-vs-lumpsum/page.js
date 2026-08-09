"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, CheckCircle, TrendingUp, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function formatToShortWords(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)} K`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is SIP better than lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'SIP is generally better for salaried individuals and in volatile markets due to rupee cost averaging. Lump sum can be better if you have a large corpus and invest during market dips.' } },
    { '@type': 'Question', name: 'Should I invest lump sum during a market crash?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, investing a lump sum during a significant market crash often yields higher returns than SIP, as you buy more units at lower prices.' } },
    { '@type': 'Question', name: 'What is rupee cost averaging in SIP?', acceptedAnswer: { '@type': 'Answer', text: 'Rupee cost averaging means you buy more units when prices are low and fewer units when prices are high, averaging out your cost per unit over time.' } },
    { '@type': 'Question', name: 'Can I do both SIP and lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! You can maintain a regular SIP from your salary and deploy lump sums (like bonuses) during market corrections.' } },
    { '@type': 'Question', name: 'Which is better for long-term — SIP or lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'For 10+ years, both perform well. Lump sum slightly edges out in a purely upward market, while SIP provides peace of mind and discipline.' } }
  ]
};

export default function SipVsLumpsumPage() {
  const [totalAmount, setTotalAmount] = useState(500000);
  const [returnRate, setReturnRate] = useState(12);
  const [duration, setDuration] = useState(10);
  const [scenario, setScenario] = useState('bull'); // bull, bear, volatile

  const chartData = useMemo(() => {
    let lumpsumVal = totalAmount;
    let sipVal = 0;
    const monthlySip = totalAmount / (duration * 12);
    
    const labels = [];
    const lumpsumData = [];
    const sipData = [];
    
    for (let year = 1; year <= duration; year++) {
      let currentRate = returnRate;
      
      if (scenario === 'bear') {
        if (year <= duration * 0.4) currentRate = returnRate * 0.5;
        else currentRate = returnRate * 1.35;
      } else if (scenario === 'volatile') {
        currentRate = year % 2 !== 0 ? returnRate * 1.5 : returnRate * 0.5;
      }
      
      // Lumpsum calculation (Annual compound for simplicity on graph)
      lumpsumVal = lumpsumVal * (1 + currentRate / 100);
      
      // SIP calculation (Monthly compound)
      const monthlyRate = currentRate / 100 / 12;
      for (let m = 0; m < 12; m++) {
        sipVal = (sipVal + monthlySip) * (1 + monthlyRate);
      }
      
      labels.push(`Year ${year}`);
      lumpsumData.push(lumpsumVal);
      sipData.push(sipVal);
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Lumpsum Value',
          data: lumpsumData,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59,130,246,0.1)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'SIP Value',
          data: sipData,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139,92,246,0.1)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          tension: 0.4,
        }
      ],
      finalLumpsum: lumpsumData[lumpsumData.length - 1],
      finalSip: sipData[sipData.length - 1],
    };
  }, [totalAmount, returnRate, duration, scenario]);

  const winner = chartData.finalLumpsum > chartData.finalSip ? 'Lumpsum' : 'SIP';
  const diff = Math.abs(chartData.finalLumpsum - chartData.finalSip);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SIP vs Lumpsum' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-semibold mb-3 block">Comparison · Investing Strategy</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
                <span className="text-gradient">SIP vs Lumpsum:</span> Which Investment Strategy is Better?
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Should you invest your money all at once (Lumpsum) or spread it over time (SIP)? 
                Use our interactive calculator below to test both strategies across Bull, Bear, and Volatile market scenarios.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-white font-bold mb-4">Calculator Inputs</h3>
                
                <div className="space-y-5">
                  <InputSlider
                    label="Total Investment Amount"
                    value={totalAmount}
                    min={10000}
                    max={10000000}
                    step={10000}
                    onChange={setTotalAmount}
                    formatFn={(v) => `₹${v.toLocaleString('en-IN')}`}
                  />
                  <InputSlider
                    label="Expected Return Rate"
                    value={returnRate}
                    min={1}
                    max={30}
                    step={0.1}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Duration (Years)"
                    value={duration}
                    min={1}
                    max={30}
                    step={1}
                    onChange={setDuration}
                    formatFn={(v) => `${v} Yr`}
                  />
                </div>

                <div className="mt-6">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Market Scenario</label>
                  <div className="flex gap-2 bg-[rgba(255,255,255,0.03)] p-1.5 rounded-xl border border-white/5">
                    {['bull', 'bear', 'volatile'].map(s => (
                      <button
                        key={s}
                        onClick={() => setScenario(s)}
                        className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg capitalize transition-all ${scenario === s ? 'bg-[#3B82F6] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    {scenario === 'bull' && 'Consistent positive returns year after year.'}
                    {scenario === 'bear' && 'Market crashes initially, then recovers strongly later.'}
                    {scenario === 'volatile' && 'Wild swings alternating between high and low returns.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden h-full">
                {/* Result Cards */}
                <div className="flex w-full gap-4 mb-6 relative z-10">
                  <div className={`flex-1 p-5 rounded-2xl border ${winner === 'SIP' ? 'border-[#22C55E] bg-[rgba(34,197,94,0.05)] shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/10 bg-white/5'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">SIP Value</span>
                      {winner === 'SIP' && <span className="text-[#22C55E] text-[10px] font-bold px-2 py-1 bg-[#22C55E]/10 rounded-full">WINNER</span>}
                    </div>
                    <div className="text-2xl font-bold text-white">{formatToShortWords(chartData.finalSip)}</div>
                    <div className="text-xs text-gray-500 mt-1">Invested: {formatToShortWords(totalAmount)}</div>
                  </div>
                  <div className={`flex-1 p-5 rounded-2xl border ${winner === 'Lumpsum' ? 'border-[#22C55E] bg-[rgba(34,197,94,0.05)] shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/10 bg-white/5'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Lumpsum Value</span>
                      {winner === 'Lumpsum' && <span className="text-[#22C55E] text-[10px] font-bold px-2 py-1 bg-[#22C55E]/10 rounded-full">WINNER</span>}
                    </div>
                    <div className="text-2xl font-bold text-white">{formatToShortWords(chartData.finalLumpsum)}</div>
                    <div className="text-xs text-gray-500 mt-1">Invested: {formatToShortWords(totalAmount)}</div>
                  </div>
                </div>

                {/* Verdict text */}
                <div className="w-full bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-xl p-4 mb-6 text-center z-10">
                  <p className="text-sm text-gray-300">
                    In a <strong className="text-white capitalize">{scenario}</strong> market, <strong className="text-white">{winner}</strong> beats the alternative by <strong className="text-[#22C55E]">{formatToShortWords(diff)}</strong>.
                  </p>
                </div>

                {/* Chart */}
                <div className="w-full h-[250px] relative z-10">
                  <Line 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: 'index', intersect: false },
                      scales: {
                        y: { border: { display: false }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9CA3AF', callback: (v) => formatToShortWords(v) } },
                        x: { border: { display: false }, grid: { display: false }, ticks: { color: '#9CA3AF' } }
                      },
                      plugins: {
                        legend: { labels: { color: '#D1D5DB', usePointStyle: true, boxWidth: 6 } },
                        tooltip: { backgroundColor: '#1F2937', titleColor: '#F3F4F6', bodyColor: '#D1D5DB', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">When Lumpsum Beats SIP (and vice versa)</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong>Lumpsum</strong> usually wins in a consistent bull market because your entire capital gets more time to compound. 
                However, <strong>SIP</strong> performs exceptionally well in volatile or bearish markets because it naturally applies 
                <em> Rupee Cost Averaging</em>—buying more units when prices dip.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Rupee Cost Averaging — SIP's Hidden Advantage</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                When the market falls, your fixed monthly SIP amount buys more mutual fund units. When the market recovers, 
                those extra units multiply in value. This makes SIP less risky than Lumpsum if you are worried about timing the market.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">What Historical Data Shows</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Backtesting on the Nifty 50 over 20-year periods shows that Lumpsum investments generally deliver slightly higher 
                absolute returns (due to more time in the market). However, SIPs significantly reduce the anxiety of investing right 
                before a crash. Most retail investors prefer SIP for discipline, and use Lumpsum during market dips.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-white font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.08)]">
            <h2 className="text-lg font-bold text-white mb-4">Explore More Calculators</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lumpsum-calculator" className="inline-flex items-center gap-2 border border-[#3B82F6]/40 text-[#60A5FA] hover:border-[#3B82F6] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Lumpsum Calculator
              </Link>
              <Link href="/cagr-calculator" className="inline-flex items-center gap-2 border border-[#3B82F6]/40 text-[#60A5FA] hover:border-[#3B82F6] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                CAGR Calculator
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-6">Disclaimer: Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
          </div>

        </article>
      </main>
    </>
  );
}

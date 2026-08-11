"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle, GraduationCap, AlertTriangle, TrendingUp } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function fmt(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)} K`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much SIP do I need for my child\'s education?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the current cost, years to college, and inflation. For a ₹20 Lakh course in 15 years at 10% inflation, you need about ₹22,700/month at 12% returns.' } },
    { '@type': 'Question', name: 'What is education inflation in India?', acceptedAnswer: { '@type': 'Answer', text: 'Education inflation in India is typically 10-12%, significantly higher than regular retail inflation (CPI) which hovers around 5-6%.' } },
    { '@type': 'Question', name: 'Should I buy a child plan or do SIP for education?', acceptedAnswer: { '@type': 'Answer', text: 'Equity Mutual Fund SIPs are generally better than traditional child plans as they offer higher returns (10-14%) to beat education inflation, whereas child plans often yield only 5-6%.' } },
    { '@type': 'Question', name: 'How much should I save for IIT/NIT education?', acceptedAnswer: { '@type': 'Answer', text: 'A 4-year B.Tech at an IIT currently costs ₹10-12 Lakhs. In 15 years, at 10% inflation, it will cost around ₹40-50 Lakhs. Plan your SIPs accordingly.' } },
    { '@type': 'Question', name: 'Can I use PPF instead of SIP for child education?', acceptedAnswer: { '@type': 'Answer', text: 'PPF is safe and tax-free but offers ~7.1% returns, which fails to beat 10% education inflation. It is best used for the debt portion of your portfolio, not the primary growth engine.' } },
  ],
};

function getStepUpFvFactor(years, monthlyRate, stepUpRate) {
  let fvFactor = 0;
  for (let y = 1; y <= years; y++) {
    const monthlyContribution = Math.pow(1 + stepUpRate, y - 1);
    const yearFv = monthlyContribution * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
    fvFactor += yearFv * Math.pow(1 + monthlyRate, (years - y) * 12);
  }
  return fvFactor;
}

export default function SipForChildEducationPage() {
  const [currentAge, setCurrentAge] = useState(3);
  const [targetAge, setTargetAge] = useState(18);
  const [todayCost, setTodayCost] = useState(2000000);
  const [educationInflation, setEducationInflation] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const results = useMemo(() => {
    const years = Math.max(1, targetAge - currentAge);
    const months = years * 12;
    const monthlyRate = returnRate / 100 / 12;
    
    // Future cost based on inflation
    const futureCost = todayCost * Math.pow(1 + educationInflation / 100, years);
    
    // Regular SIP needed
    const fvFactorRegular = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const requiredSip = futureCost / fvFactorRegular;
    
    const totalInvested = requiredSip * months;
    const estimatedGains = futureCost - totalInvested;

    // Step-up SIP (10% annual increase)
    const fvFactorStepUp = getStepUpFvFactor(years, monthlyRate, 0.10);
    const initialStepUpSip = futureCost / fvFactorStepUp;

    // Chart Data (Yearly progression)
    const labels = [];
    const investedData = [];
    const gainsData = [];
    let cumInvested = 0;

    for (let y = 1; y <= years; y++) {
      labels.push(`Year ${y}`);
      cumInvested += requiredSip * 12;
      const fvAtY = requiredSip * ((Math.pow(1 + monthlyRate, y * 12) - 1) / monthlyRate) * (1 + monthlyRate);
      investedData.push(cumInvested);
      gainsData.push(fvAtY - cumInvested);
    }

    return {
      years,
      futureCost,
      requiredSip,
      totalInvested,
      estimatedGains,
      initialStepUpSip,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Total Invested',
            data: investedData,
            backgroundColor: '#1B3A5C',
          },
          {
            label: 'Estimated Gains',
            data: gainsData,
            backgroundColor: '#C4993C',
          }
        ]
      }
    };
  }, [currentAge, targetAge, todayCost, educationInflation, returnRate]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">

          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SIP for Child Education' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#1B3A5C] font-semibold mb-3 block">Goal Planning · Education</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] leading-tight mb-3">
                SIP for Child Education  Calculator
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Education costs in India are rising at 10-12% every year. Use this calculator to find out exactly how much monthly SIP you need to secure your child&apos;s college fund.
              </p>
            </div>
          </div>

          {/* Shock Callout */}
          <div className="bg-[rgba(196,153,60,0.1)] border border-amber-500/30 rounded-xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="text-amber-500 font-bold text-lg mb-1">The Reality of Education Inflation</h3>
              <p className="text-[#1F2937] text-sm leading-relaxed">
                A course that costs <strong className="text-[#059669]">{fmt(todayCost)}</strong> today will cost <strong className="text-[#059669] text-lg">{fmt(results.futureCost)}</strong> in {results.years} years (assuming {educationInflation}% inflation). Start planning now.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-[#1F2937] font-bold mb-4">Goal Details</h3>
                <div className="space-y-5">
                  <InputSlider
                    label="Child's Current Age"
                    value={currentAge}
                    min={0}
                    max={15}
                    step={1}
                    onChange={(val) => {
                      setCurrentAge(val);
                      if (val >= targetAge) setTargetAge(val + 1);
                    }}
                    formatFn={(v) => `${v} Yr`}
                  />
                  <InputSlider
                    label="Target College Age"
                    value={targetAge}
                    min={16}
                    max={22}
                    step={1}
                    onChange={(val) => {
                      setTargetAge(val);
                      if (val <= currentAge) setCurrentAge(val - 1);
                    }}
                    formatFn={(v) => `${v} Yr`}
                  />
                  <InputSlider
                    label="Today's Cost of Education"
                    value={todayCost}
                    min={200000}
                    max={10000000}
                    step={50000}
                    onChange={setTodayCost}
                    formatFn={(v) => fmt(v)}
                  />
                  <InputSlider
                    label="Education Inflation Rate"
                    value={educationInflation}
                    min={6}
                    max={15}
                    step={0.1}
                    onChange={setEducationInflation}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Expected SIP Return"
                    value={returnRate}
                    min={8}
                    max={20}
                    step={0.1}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 space-y-4">
              <div className="glass-panel p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#f8f2ea] border border-black/5 rounded-xl p-4 text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Target Corpus (Future Cost)</p>
                    <p className="text-[#1F2937] font-bold text-xl">{fmt(results.futureCost)}</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.15)] border border-[#1B3A5C]/40 rounded-xl p-4 text-center shadow-[0_0_20px_rgba(27,58,92,0.1)]">
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1 font-semibold">Monthly SIP Needed</p>
                    <p className="text-[#1B3A5C] font-extrabold text-2xl">{fmt(results.requiredSip)}</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.05)] border border-[#1B3A5C]/20 rounded-xl p-4 text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Total Invested</p>
                    <p className="text-[#1B3A5C] font-bold text-xl">{fmt(results.totalInvested)}</p>
                    <p className="text-[10px] text-[#059669] mt-1">Gains: {fmt(results.estimatedGains)}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6 relative pt-4 pb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Now (Age {currentAge})</span>
                    <span className="font-semibold text-[#1F2937]">{results.years} Years to Grow</span>
                    <span>College (Age {targetAge})</span>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-[#1B3A5C] to-[#C4993C] w-full relative">
                       <div className="absolute top-0 right-0 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Step-up Alternative */}
                <div className="bg-white border border-[#E8E4DF] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-[#1F2937] text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#1B3A5C]" /> Too high? Use 10% Step-Up SIP</h4>
                    <p className="text-gray-500 text-xs mt-1">Start lower and increase your SIP by 10% every year.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#1B3A5C]">{fmt(results.initialStepUpSip)}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Starting SIP</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="glass-panel p-6 h-[280px]">
                <Bar
                  data={results.chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: { stacked: true, grid: { display: false }, ticks: { color: '#6B7280' } },
                      y: { stacked: true, grid: { color: 'rgba(0,0,0,0.03)' }, ticks: { color: '#6B7280', callback: (v) => fmt(v) }, border: { display: false } },
                    },
                    plugins: {
                      legend: { labels: { color: '#1F2937', usePointStyle: true, boxWidth: 6 } },
                      tooltip: { backgroundColor: '#1F2937', titleColor: '#F3F4F6', bodyColor: '#D1D5DB', borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1 },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Approximate SIP Needed for Different Courses</h2>
            <p className="text-sm text-gray-500 mb-4">Assuming 15 years to goal, 10% education inflation, and 12% expected SIP returns.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-3 pr-4 text-gray-500 font-semibold">Course</th>
                    <th className="py-3 pr-4 text-gray-500 font-semibold">Today's Cost</th>
                    <th className="py-3 pr-4 text-[#1F2937] font-semibold">In 15 Years (10% Infl)</th>
                    <th className="py-3 text-[#1B3A5C] font-semibold">SIP Needed (12% return)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-[#1F2937]">Engineering (Govt)</td>
                    <td className="py-3 pr-4">₹5 Lakhs</td>
                    <td className="py-3 pr-4">₹20.9 Lakhs</td>
                    <td className="py-3 font-semibold text-[#1B3A5C]">₹5,700/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-[#1F2937]">Engineering (Private)</td>
                    <td className="py-3 pr-4">₹20 Lakhs</td>
                    <td className="py-3 pr-4">₹83.5 Lakhs</td>
                    <td className="py-3 font-semibold text-[#1B3A5C]">₹22,700/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-[#1F2937]">Medical (MBBS)</td>
                    <td className="py-3 pr-4">₹50 Lakhs</td>
                    <td className="py-3 pr-4">₹2.09 Crores</td>
                    <td className="py-3 font-semibold text-[#1B3A5C]">₹56,700/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-[#1F2937]">MBA (Top IIM)</td>
                    <td className="py-3 pr-4">₹30 Lakhs</td>
                    <td className="py-3 pr-4">₹1.25 Crores</td>
                    <td className="py-3 font-semibold text-[#1B3A5C]">₹34,000/mo</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-[#1F2937]">B.Tech + MBA Abroad</td>
                    <td className="py-3 pr-4">₹80 Lakhs</td>
                    <td className="py-3 pr-4">₹3.34 Crores</td>
                    <td className="py-3 font-semibold text-[#1B3A5C]">₹90,800/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3">1. Why Education Inflation in India is 10%+</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                While standard consumer inflation (CPI) in India fluctuates around 5-6%, education costs rise much faster. Increased infrastructure costs, faculty salaries, and demand for premium education push fees up by 10-12% annually. A ₹10 Lakh degree today will likely cost over ₹40 Lakhs in 15 years.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3">2. When to Start? The Cost of Delay</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Starting early is the single most important factor. If your target is ₹1 Crore for college at age 18:
                <br/><br/>
                • Start at age 0 (18 yrs to invest): ~₹13,000/month<br/>
                • Start at age 5 (13 yrs to invest): ~₹25,000/month<br/>
                • Start at age 10 (8 yrs to invest): ~₹63,000/month<br/>
                <br/>
                Delaying by just 5 years nearly doubles the required SIP.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3">3. Best Mutual Fund Categories for Education</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                • <strong>10+ Years Away:</strong> Flexi-cap or Large & Mid-cap funds for high growth.<br/>
                • <strong>5-10 Years Away:</strong> Aggressive Hybrid funds for balanced risk.<br/>
                • <strong>Less than 3 Years Away:</strong> Move money to Debt funds or FDs to protect the capital from market crashes right before fees are due.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-[#1F2937] font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)]">
            <h2 className="text-lg font-bold text-[#1F2937] mb-4">Explore More Tools</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Main SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog/retirement-sip-calculator" className="inline-flex items-center gap-2 border border-[#1B3A5C]/40 text-[#1B3A5C] hover:border-[#1B3A5C] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Retirement Guide
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

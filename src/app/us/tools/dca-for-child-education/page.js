"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ArrowRight, HelpCircle, GraduationCap, AlertTriangle, TrendingUp, Info } from 'lucide-react';
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
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)} M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)} K`;
  return `$${Math.round(val).toLocaleString('en-US')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much do I need to save for my child\'s college education?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the college type, years until enrollment, and tuition inflation. For a $100,000 program in 15 years at 6% education inflation, you need approximately $1,200/month invested at 10% annual returns.' } },
    { '@type': 'Question', name: 'What is education inflation?', acceptedAnswer: { '@type': 'Answer', text: 'College tuition in the US has historically risen at about 6-8% annually, roughly double the consumer price index (CPI). This outpaces general inflation and makes starting early critical.' } },
    { '@type': 'Question', name: 'Should I use a 529 plan or a brokerage DCA for education savings?', acceptedAnswer: { '@type': 'Answer', text: 'A 529 plan offers tax-free growth for education expenses and should be the first priority. A taxable brokerage account via DCA into index funds is a great complement for flexibility if the child does not attend college.' } },
    { '@type': 'Question', name: 'How much does a 4-year US university degree cost?', acceptedAnswer: { '@type': 'Answer', text: 'A 4-year degree at a public in-state university averages $110,000 total today. Private universities average $240,000. With education inflation, these costs roughly double every 10-12 years, making early saving essential.' } },
    { '@type': 'Question', name: 'Can I use a Roth IRA for child education savings?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Roth IRA contributions (not earnings) can be withdrawn penalty-free for qualified education expenses. However, withdrawals may affect financial aid calculations. It is best used as a secondary education savings vehicle after maximizing a 529.' } },
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
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'));

  const [currentAge, setCurrentAge] = useState(3);
  const [targetAge, setTargetAge] = useState(18);
  const [todayCost, setTodayCost] = useState(80000);
  const [educationInflation, setEducationInflation] = useState(3);
  const [returnRate, setReturnRate] = useState(10);

  const results = useMemo(() => {
    const years = Math.max(1, targetAge - currentAge);
    const months = years * 12;
    const monthlyRate = returnRate / 100 / 12;
    
    // Future cost based on inflation
    const futureCost = todayCost * Math.pow(1 + educationInflation / 100, years);
    
    // Regular DCA needed
    const fvFactorRegular = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const requiredSip = futureCost / fvFactorRegular;
    
    const totalInvested = requiredSip * months;
    const estimatedGains = futureCost - totalInvested;

    // Step-up DCA (10% annual increase)
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
            backgroundColor: (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C'),
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
        <article className="max-w-6xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Tools', href: '/us' }, { label: 'DCA for Child Education' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Goal Planning · Education</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                DCA for Child Education  Calculator
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Education costs globally are rising at 10-12% every year. Use this calculator to find out exactly how much monthly DCA you need to secure your child&apos;s college fund.
              </p>
            </div>
          </div>

          {/* Shock Callout */}
          <div className="bg-[rgba(196,153,60,0.1)] border border-amber-500/30 rounded-xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="text-amber-500 font-bold text-lg mb-1">The Reality of Education Inflation</h3>
              <p className="text-foreground text-sm leading-relaxed">
                A course that costs <strong className="text-[var(--color-returns)]">{fmt(todayCost)}</strong> today will cost <strong className="text-[var(--color-returns)] text-lg">{fmt(results.futureCost)}</strong> in {results.years} years (assuming {educationInflation}% inflation). Start planning now.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-foreground font-bold mb-4">Goal Details</h3>
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
                    min={10000}
                    max={500000}
                    step={5000}
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
                    label="Expected DCA Return"
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
                  <div className="bg-black/5 dark:bg-white/5 border border-black/5 rounded-xl p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1">Target Corpus (Future Cost)</p>
                    <p className="text-foreground font-bold text-xl">{fmt(results.futureCost)}</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.15)] border border-[var(--color-accent)]/40 rounded-xl p-4 text-center shadow-[0_0_20px_rgba(27,58,92,0.1)]">
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Monthly DCA Needed</p>
                    <p className="text-[var(--color-accent)] font-extrabold text-2xl">{fmt(results.requiredSip)}</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.05)] border border-[var(--color-accent)]/20 rounded-xl p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total Invested</p>
                    <p className="text-[var(--color-accent)] font-bold text-xl">{fmt(results.totalInvested)}</p>
                    <p className="text-[10px] text-[var(--color-returns)] mt-1">Gains: {fmt(results.estimatedGains)}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6 relative pt-4 pb-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>Now (Age {currentAge})</span>
                    <span className="font-semibold text-foreground">{results.years} Years to Grow</span>
                    <span>College (Age {targetAge})</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--panel-bg)] rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-[#1B3A5C] dark:from-[#1A73E8] to-[#C4993C] w-full relative">
                       <div className="absolute top-0 right-0 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Step-up Alternative */}
                <div className="bg-[var(--panel-bg)] border border-[#E8E4DF] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-foreground text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[var(--color-accent)]" /> Too high? Use 10% Step-Up DCA</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Start lower and increase your DCA by 10% every year.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--color-accent)]">{fmt(results.initialStepUpSip)}</p>
                    <p className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">Starting DCA</p>
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
                      x: { stacked: true, grid: { display: false }, ticks: { color: '#8B95A5' } },
                      y: { stacked: true, grid: { color: 'rgba(0,0,0,0.03)' }, ticks: { color: '#8B95A5', callback: (v) => fmt(v) }, border: { display: false } },
                    },
                    plugins: {
                      legend: { labels: { color: '#8B95A5', usePointStyle: true, boxWidth: 6 } },
                      tooltip: { backgroundColor: '#1F2937', titleColor: '#F3F4F6', bodyColor: '#D1D5DB', borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1 },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Approximate DCA Needed for Different Courses</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Assuming 15 years to goal, 10% education inflation, and 12% expected DCA returns.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-3 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Course</th>
                    <th className="py-3 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Today's Cost</th>
                    <th className="py-3 pr-4 text-foreground font-semibold">In 15 Years (10% Infl)</th>
                    <th className="py-3 text-[var(--color-accent)] font-semibold">DCA Needed (12% return)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-foreground">Public University (In-State)</td>
                    <td className="py-3 pr-4">$28,000/yr</td>
                    <td className="py-3 pr-4">$67,000/yr</td>
                    <td className="py-3 font-semibold text-[var(--color-accent)]">$800/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-foreground">Public University (Out-of-State)</td>
                    <td className="py-3 pr-4">$45,000/yr</td>
                    <td className="py-3 pr-4">$108,000/yr</td>
                    <td className="py-3 font-semibold text-[var(--color-accent)]">$1,300/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-foreground">Private University</td>
                    <td className="py-3 pr-4">$60,000/yr</td>
                    <td className="py-3 pr-4">$144,000/yr</td>
                    <td className="py-3 font-semibold text-[var(--color-accent)]">$1,700/mo</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 font-medium text-foreground">Ivy League / Top 20</td>
                    <td className="py-3 pr-4">$80,000/yr</td>
                    <td className="py-3 pr-4">$192,000/yr</td>
                    <td className="py-3 font-semibold text-[var(--color-accent)]">$2,300/mo</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">MBA (Top 10 Program)</td>
                    <td className="py-3 pr-4">$100,000/yr</td>
                    <td className="py-3 pr-4">$240,000/yr</td>
                    <td className="py-3 font-semibold text-[var(--color-accent)]">$2,900/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          
        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Adjust the inputs</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Use the sliders or text boxes to enter your specific financial numbers.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Review the charts</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Analyze the results</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</p>
              </div>
            </div>
          </div>
        </section>

          {/* FAQ Section */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-foreground font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)]">
            <h2 className="text-lg font-bold text-foreground mb-4">Explore More Tools</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Main DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/tools/retirement-dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Retirement Guide
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

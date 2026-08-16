"use client";

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InputSlider from '@/components/InputSlider';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between a 401(k) and an IRA?', acceptedAnswer: { '@type': 'Answer', text: 'A 401(k) is an employer-sponsored retirement plan, meaning you can only get one if your employer offers it, and contributions are deducted directly from your paycheck. An IRA (Individual Retirement Account) is an account you open yourself at a brokerage firm.' } },
    { '@type': 'Question', name: 'What is the contribution limit for a 401(k) in 2024?', acceptedAnswer: { '@type': 'Answer', text: 'For 2024, the employee contribution limit for a 401(k) is $23,000. If you are age 50 or older, you can make an additional catch-up contribution of $7,500.' } },
    { '@type': 'Question', name: 'What does "employer match" mean?', acceptedAnswer: { '@type': 'Answer', text: 'Many employers offer a match on 401(k) contributions as an employee benefit. For example, they might match 100% of your contributions up to 4% of your salary. This is essentially free money and you should always try to contribute at least enough to get the full match.' } },
    { '@type': 'Question', name: 'Can I have both a 401(k) and a Traditional IRA?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, you can contribute to both in the same year. However, if you (or your spouse) are covered by a retirement plan at work, your ability to deduct your Traditional IRA contributions on your tax return may be limited based on your income.' } }
  ]
};

export default function RetirementAccountCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [expectedReturn, setExpectedReturn] = useState(10);

  // Results
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCorpus, setTotalCorpus] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [monthlyIncome4Pct, setMonthlyIncome4Pct] = useState(0);
  const [monthlyIncome6Pct, setMonthlyIncome6Pct] = useState(0);

  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyContribution, currentAge, retirementAge, expectedReturn]);

  const calculate = () => {
    const years = Math.max(0, retirementAge - currentAge);
    const monthsToInvest = years * 12;
    const monthlyRate = expectedReturn / 12 / 100;

    let futureValue = 0;
    if (monthsToInvest > 0) {
      if (expectedReturn === 0) {
        futureValue = monthlyContribution * monthsToInvest;
      } else {
        // Standard DCA/annuity-due future value formula
        futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate);
      }
    }

    const invested = monthlyContribution * (monthsToInvest > 0 ? monthsToInvest : 0);
    const gains = futureValue - invested;

    // 4% Rule (Trinity Study): sustainable withdrawal = corpus * 4% / 12
    const income4 = (futureValue * 0.04) / 12;
    // 6% aggressive withdrawal
    const income6 = (futureValue * 0.06) / 12;

    setTotalInvested(Math.round(invested));
    setTotalCorpus(Math.round(futureValue));
    setTotalGains(Math.round(gains));
    setMonthlyIncome4Pct(Math.round(income4));
    setMonthlyIncome6Pct(Math.round(income6));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Math.round(value));
  };

  const chartData = {
    labels: ['Total Invested', 'Estimated Returns'],
    datasets: [
      {
        data: [totalInvested, totalGains > 0 ? totalGains : 0],
        backgroundColor: ['#1B3A5C', '#C4993C'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#1F2937',
          padding: 16,
          font: { family: "'Inter', sans-serif", size: 13 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) label += ': ';
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency', currency: 'USD', maximumFractionDigits: 0
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f2ea] p-4 md:p-8 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">401(k) / IRA Retirement Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Project your retirement nest egg. See how monthly contributions to a 401(k) or IRA compound over time, and estimate your monthly income in retirement using the 4% Rule.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Section */}
          <div className="w-full lg:w-7/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full">
              <div className="space-y-8">
                <InputSlider
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  min={50}
                  max={3000}
                  step={50}
                  onChange={setMonthlyContribution}
                  prefix="$"
                  id="monthly-contribution"
                />

                <InputSlider
                  label="Your Current Age"
                  value={currentAge}
                  min={18}
                  max={64}
                  step={1}
                  onChange={setCurrentAge}
                  suffix=" Yrs"
                  id="current-age"
                />

                <InputSlider
                  label="Target Retirement Age"
                  value={retirementAge}
                  min={Math.min(currentAge + 1, 70)}
                  max={70}
                  step={1}
                  onChange={setRetirementAge}
                  suffix=" Yrs"
                  id="retirement-age"
                />

                <InputSlider
                  label="Expected Annual Return"
                  value={expectedReturn}
                  min={1}
                  max={15}
                  step={0.5}
                  onChange={setExpectedReturn}
                  suffix="%"
                  id="expected-return"
                />

                <div className="bg-[#f8f2ea] p-4 rounded-xl text-xs text-gray-500 leading-relaxed">
                  <strong className="text-[#1B3A5C]">2024 IRS Contribution Limits:</strong> 401(k): $23,000/yr ($1,917/mo). With catch-up (50+): $30,500/yr. IRA: $7,000/yr. These limits are not enforced by this calculator — it is for illustrative purposes only.
                </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="w-full lg:w-5/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#1F2937] mb-6">Retirement Projection (Age {retirementAge})</h2>

              <div className="flex flex-col gap-6 flex-grow">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8f2ea] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Total Contributed</p>
                    <p className="text-lg font-bold text-[#1B3A5C]">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div className="bg-[#f8f2ea] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Est. Returns</p>
                    <p className="text-lg font-bold text-[#059669]">{formatCurrency(totalGains)}</p>
                  </div>
                  <div className="bg-[#f8f2ea] p-4 rounded-xl col-span-2 text-center border border-[#1B3A5C]/10">
                    <p className="text-sm text-gray-500 mb-1">Total Nest Egg</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{formatCurrency(totalCorpus)}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-56 w-full flex items-center justify-center my-2">
                  <Pie data={chartData} options={chartOptions} />
                </div>

                {/* Withdrawal Estimates */}
                <div className="mt-auto space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-[#1F2937] text-base">Estimated Monthly Income in Retirement</h3>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-[#1F2937]">4% Rule (Conservative)</p>
                      <p className="text-xs text-gray-500">Sustainable withdrawal rate</p>
                    </div>
                    <p className="font-bold text-[#059669] text-lg">{formatCurrency(monthlyIncome4Pct)}<span className="text-xs text-gray-400">/mo</span></p>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-l-4 border-l-[#1B3A5C]">
                    <div>
                      <p className="text-sm font-medium text-[#1B3A5C]">6% Withdrawal (Aggressive)</p>
                      <p className="text-xs text-gray-500">Higher income, faster depletion</p>
                    </div>
                    <p className="font-bold text-[#1B3A5C] text-lg">{formatCurrency(monthlyIncome6Pct)}<span className="text-xs text-gray-400">/mo</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Educational Content Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Planning Your Retirement (401k & IRA)</h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                    Building a secure retirement requires consistent saving and taking advantage of tax-advantaged accounts like <strong>401(k)s and IRAs</strong>. These accounts allow your money to grow either tax-deferred (Traditional) or tax-free (Roth), saving you significant amounts of money over a lifetime of investing.
                </p>

                <h3 className="text-xl font-semibold text-[#1F2937] mt-8 mb-4">The Power of the 4% Rule</h3>
                <p>
                    The <strong>4% Rule</strong> (based on the Trinity Study) states that withdrawing 4% of your retirement portfolio annually has historically lasted 30+ years without depleting the principal, assuming a balanced stock/bond portfolio. For a $1 Million nest egg, that means $40,000/year (or ~$3,333/month) in sustainable income. 
                </p>

                <h3 className="text-xl font-semibold text-[#1F2937] mt-8 mb-4">401(k) vs IRA: Which should you fund first?</h3>
                <p>
                    A common and highly effective strategy is the <strong>Match-Roth-Max</strong> strategy:
                </p>
                <ol className="list-decimal ml-6 space-y-2 mt-2">
                    <li><strong>Match:</strong> First, contribute enough to your 401(k) to get the full employer match. This is free money and offers a 100% immediate return on investment.</li>
                    <li><strong>Roth:</strong> Next, max out a Roth IRA (up to the $7,000 limit in 2024). Roth IRAs offer superior flexibility and tax-free growth, and you have access to a wider range of investment options than a typical 401(k).</li>
                    <li><strong>Max:</strong> Finally, if you still have money to save, go back and max out the rest of your 401(k) up to the $23,000 limit.</li>
                </ol>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {jsonLd.mainEntity.map((faq, i) => (
                    <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                        <h3 className="text-foreground font-medium text-base flex items-start gap-2">
                            <HelpCircle className="w-5 h-5 text-[#1B3A5C] flex-shrink-0 mt-0.5" /> {faq.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Cross Links */}
        <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] max-w-4xl mx-auto rounded-3xl border border-[#1B3A5C]/10">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Explore More Tools</h2>
            <div className="flex flex-wrap justify-center gap-3">
                <Link href="/us/tools/roth-ira-calculator" className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    Roth IRA Calculator <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/us/tools/savings-vs-dca-calculator" className="inline-flex items-center gap-2 border border-[#1B3A5C]/40 text-[#1B3A5C] hover:border-[#1B3A5C] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                    Savings vs Investing
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is it always better to buy a house than to rent?', acceptedAnswer: { '@type': 'Answer', text: 'No. The decision depends heavily on how long you plan to stay in the home, the local housing market, and interest rates. Buying involves significant sunk costs (closing costs, maintenance, property taxes, interest) that can outweigh the equity gained if you move within 5-7 years.' } },
    { '@type': 'Question', name: 'What is the opportunity cost of a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'When you put 20% down on a house, that money is tied up in the home. If you had rented instead and invested that same 20% down payment into an S&P 500 index fund, it would likely compound at 8-10% annually. This lost investment growth is the opportunity cost of buying.' } },
    { '@type': 'Question', name: 'How do property taxes and maintenance affect the Buy vs Rent calculation?', acceptedAnswer: { '@type': 'Answer', text: 'Property taxes and maintenance are ongoing, unrecoverable costs of homeownership. They typically average 1-2% of the home\'s value annually. In a Buy vs Rent calculation, these costs must be subtracted from the total equity gained to find your true net worth.' } },
    { '@type': 'Question', name: 'What is the 5% Rule in real estate?', acceptedAnswer: { '@type': 'Answer', text: 'The 5% Rule is a quick rule of thumb for estimating the unrecoverable costs of homeownership. It estimates that property tax (1%), maintenance (1%), and cost of capital/interest (3%) will cost about 5% of the home\'s value each year. If your annual rent is less than 5% of the home\'s value, renting may be better financially.' } }
  ]
};

export default function BuyVsRentPage() {
  const [propertyValue, setPropertyValue] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.8);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyAppreciation, setPropertyAppreciation] = useState(4);
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [rentEscalation, setRentEscalation] = useState(3);
  const [equityReturns, setEquityReturns] = useState(10);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [finalBuyNetWorth, setFinalBuyNetWorth] = useState(0);
  const [finalRentNetWorth, setFinalRentNetWorth] = useState(0);
  const [emi, setEmi] = useState(0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Math.round(value));
  };

  useEffect(() => {
    calculateBuyVsRent();
  }, [
    propertyValue,
    downPaymentPercent,
    mortgageRate,
    loanTerm,
    propertyAppreciation,
    monthlyRent,
    rentEscalation,
    equityReturns
  ]);

  const calculateBuyVsRent = () => {
    const downPayment = (propertyValue * downPaymentPercent) / 100;
    const loanAmount = propertyValue - downPayment;
    const r = mortgageRate / 12 / 100;
    const n = loanTerm * 12;
    
    const monthlyEmi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    setEmi(monthlyEmi);

    const labels = [];
    const buyData = [];
    const rentData = [];

    let currentRentCorpus = downPayment;
    let currentRent = monthlyRent;
    const equityMonthlyRate = equityReturns / 12 / 100;

    for (let year = 1; year <= loanTerm; year++) {
      labels.push(`Year ${year}`);
      
      // Buy calculation for the year
      const propertyValueAtYear = propertyValue * Math.pow(1 + propertyAppreciation / 100, year);
      const monthsPaid = year * 12;
      const remainingLoan = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, monthsPaid)) / (Math.pow(1 + r, n) - 1);
      const buyNetWorth = propertyValueAtYear - remainingLoan;
      buyData.push(buyNetWorth);

      // Rent calculation for the year
      for (let month = 1; month <= 12; month++) {
        if (month === 1 && year > 1) {
          currentRent *= (1 + rentEscalation / 100);
        }
        const monthlyInvestment = monthlyEmi - currentRent;
        currentRentCorpus = currentRentCorpus * (1 + equityMonthlyRate) + monthlyInvestment;
      }
      rentData.push(currentRentCorpus);
    }

    setFinalBuyNetWorth(buyData[buyData.length - 1]);
    setFinalRentNetWorth(rentData[rentData.length - 1]);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Net Worth (Buying)',
          data: buyData,
          borderColor: 'var(--color-accent)',
          backgroundColor: 'var(--color-accent)',
          fill: false,
          tension: 0.1,
          pointRadius: 2,
        },
        {
          label: 'Net Worth (Renting)',
          data: rentData,
          borderColor: '#C4993C',
          backgroundColor: '#C4993C',
          fill: false,
          tension: 0.1,
          pointRadius: 2,
        }
      ]
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#8B95A5',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#8B95A5',
          callback: function(value) {
            if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K';
            return '$' + value;
          }
        },
        grid: {
          color: 'rgba(139,149,165,0.1)'
        }
      },
      x: {
        ticks: {
          color: '#8B95A5',
          maxTicksLimit: 10
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
          Buy vs Rent Calculator
        </h1>
        <p className="text-[#6B7280] max-w-2xl mx-auto">
          Compare the true financial impact of buying a home (mortgage) versus renting and investing the difference in the S&P 500. See which builds more wealth over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Property Details</h2>
            <div className="space-y-5">
              <InputSlider
                label="Home Price"
                value={propertyValue}
                min={100000}
                max={2000000}
                step={5000}
                onChange={setPropertyValue}
                formatValue={formatCurrency}
              />
              <InputSlider
                label="Down Payment (%)"
                value={downPaymentPercent}
                min={10}
                max={90}
                step={1}
                onChange={setDownPaymentPercent}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Mortgage Rate (%)"
                value={mortgageRate}
                min={3}
                max={12}
                step={0.1}
                onChange={setMortgageRate}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Loan Term (Years)"
                value={loanTerm}
                min={10}
                max={30}
                step={1}
                onChange={setLoanTerm}
                formatValue={(v) => `${v} Yrs`}
              />
              <InputSlider
                label="Property Appreciation (Yearly %)"
                value={propertyAppreciation}
                min={1}
                max={15}
                step={0.5}
                onChange={setPropertyAppreciation}
                formatValue={(v) => `${v}%`}
              />
            </div>
          </div>

          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Rent & Investment Details</h2>
            <div className="space-y-5">
              <InputSlider
                label="Current Monthly Rent"
                value={monthlyRent}
                min={500}
                max={10000}
                step={100}
                onChange={setMonthlyRent}
                formatValue={formatCurrency}
              />
              <InputSlider
                label="Rent Escalation (Yearly %)"
                value={rentEscalation}
                min={0}
                max={15}
                step={1}
                onChange={setRentEscalation}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Equity Investment Returns (%)"
                value={equityReturns}
                min={5}
                max={20}
                step={0.5}
                onChange={setEquityReturns}
                formatValue={(v) => `${v}%`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Results & Chart */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Financial Comparison (After {loanTerm} Years)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--panel-border)]">
                <p className="text-sm text-[#6B7280] mb-1">Net Worth (Buying)</p>
                <p className="text-2xl font-bold text-[var(--color-accent)]">{formatCurrency(finalBuyNetWorth)}</p>
                <p className="text-xs text-[#6B7280] mt-2">Monthly Mortgage: {formatCurrency(emi)}</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-[#C4993C]/30">
                <p className="text-sm text-[#6B7280] mb-1">Net Worth (Renting)</p>
                <p className="text-2xl font-bold text-[#C4993C]">{formatCurrency(finalRentNetWorth)}</p>
                <p className="text-xs text-[#6B7280] mt-2">Initial DCA: {formatCurrency(emi - monthlyRent)}</p>
              </div>
            </div>

            <div className="mb-4">
              {finalBuyNetWorth > finalRentNetWorth ? (
                <div className="bg-[var(--color-accent)]/5 p-4 rounded-xl border-l-4 border-[var(--color-accent)]">
                  <p className="text-[var(--foreground)] font-medium">
                    Buying is more profitable by <span className="text-[var(--color-returns)] font-bold">{formatCurrency(finalBuyNetWorth - finalRentNetWorth)}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-[#C4993C]/5 p-4 rounded-xl border-l-4 border-[#C4993C]">
                  <p className="text-[var(--foreground)] font-medium">
                    Renting is more profitable by <span className="text-[var(--color-returns)] font-bold">{formatCurrency(finalRentNetWorth - finalBuyNetWorth)}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="h-[400px] w-full mt-8 relative">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Educational Content Section */}
      <div className="mt-16 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">The Buy vs. Rent Dilemma</h2>
          
          <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                  The phrase <em>&quot;renting is throwing money away&quot;</em> is one of the most pervasive myths in personal finance. In reality, both buying and renting involve throwing money away on <strong>unrecoverable costs</strong>. For renters, the unrecoverable cost is rent. For buyers, the unrecoverable costs are mortgage interest, property taxes, maintenance, HOA fees, and closing costs.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Opportunity Cost of Buying</h3>
              <p>
                  When you buy a house, you tie up a significant amount of cash in a down payment and closing costs. If you had rented instead, you could have invested that money in the stock market (e.g., an S&P 500 index fund) and earned a historical average return of roughly 10% annually. 
              </p>
              <p>
                  Furthermore, if your monthly mortgage payment (including taxes and insurance) is higher than your monthly rent would have been, a disciplined renter can invest that difference every single month. Over 20 or 30 years, this invested difference can grow into a massive portfolio that rivals or beats the equity built in a home.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">When Buying Makes Sense</h3>
              <p>
                  Buying a home generally becomes the superior financial choice if you plan to stay in the home for a long time (typically 7-10 years or more). The longer you stay, the more the amortization schedule shifts in your favor (you pay more principal and less interest), and the more time your home&apos;s value has to appreciate and offset the initial closing costs.
              </p>
          </div>
      </div>

      {/* How to Use Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use This Calculator</h2>
      <div className="space-y-4 text-[#6B7280] leading-relaxed">
      <ol className="list-decimal ml-5 space-y-3">
      <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
      <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
      <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
      </ol>
      </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                  <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                      <h3 className="text-foreground font-medium text-base flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Cross Links */}
      <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] max-w-4xl mx-auto rounded-3xl border border-[var(--color-accent)]/10">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/tools/dca-for-house-down-payment" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                  Down Payment Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/tools/savings-vs-dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                  Savings vs Investing
              </Link>
          </div>
      </div>

    </div>
    </div>
  );
}


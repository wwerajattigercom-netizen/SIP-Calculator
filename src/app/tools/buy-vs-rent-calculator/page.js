"use client";

import React, { useState, useEffect, useMemo } from 'react';
import InputSlider from '@/components/InputSlider';
import Link from 'next/link';
import { ArrowRight, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
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
import { useTheme } from 'next-themes';

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
    { '@type': 'Question', name: 'What is the opportunity cost of a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'When you put 20% down on a house, that money is tied up in the home. If you had rented instead and invested that same 20% down payment into a NIFTY 50 index fund, it would likely compound at 10-12% annually. This lost investment growth is the opportunity cost of buying.' } },
    { '@type': 'Question', name: 'How do property taxes and maintenance affect the Buy vs Rent calculation?', acceptedAnswer: { '@type': 'Answer', text: 'Property taxes and maintenance are ongoing, unrecoverable costs of homeownership. They typically average 1-2% of the home\'s value annually. In a Buy vs Rent calculation, these costs must be subtracted from the total equity gained to find your true net worth.' } },
    { '@type': 'Question', name: 'What is the 5% Rule in real estate?', acceptedAnswer: { '@type': 'Answer', text: 'The 5% Rule is a quick rule of thumb for estimating the unrecoverable costs of homeownership. It estimates that property tax (1%), maintenance (1%), and cost of capital/interest (3%) will cost about 5% of the home\'s value each year. If your annual rent is less than 5% of the home\'s value, renting may be better financially.' } }
  ]
};

export default function BuyVsRentPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : '#1B3A5C';

  // State
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [homeLoanRate, setHomeLoanRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [propertyAppreciation, setPropertyAppreciation] = useState(5);
  
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(0.5);
  const [maintenancePercent, setMaintenancePercent] = useState(1.0);
  const [buyingClosingCostsPercent, setBuyingClosingCostsPercent] = useState(6.0); // Stamp duty, registration
  const [sellingClosingCostsPercent, setSellingClosingCostsPercent] = useState(2.0); // Brokerage

  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [rentEscalation, setRentEscalation] = useState(5);
  const [equityReturns, setEquityReturns] = useState(12);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(value));
  };

  const results = useMemo(() => {
    const downPayment = (propertyValue * downPaymentPercent) / 100;
    const buyingClosingCosts = (propertyValue * buyingClosingCostsPercent) / 100;
    const totalInitialOutlay = downPayment + buyingClosingCosts;
    const loanAmount = propertyValue - downPayment;
    
    const r = homeLoanRate / 12 / 100;
    const n = loanTenure * 12;
    const monthlyEmi = loanAmount > 0 ? (loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)) : 0;

    const labels = [];
    const buyData = [];
    const rentData = [];
    
    // Tracking Sunk Costs
    let totalRentPaid = 0;
    let totalInterestPaid = 0;
    let totalPropertyTaxes = 0;
    let totalMaintenance = 0;

    let currentRentCorpus = totalInitialOutlay; // Renter invests the exact same initial amount
    let currentBuyCorpus = 0; // If buyer has excess cash flow, they invest it too

    let currentRent = monthlyRent;
    const equityMonthlyRate = equityReturns / 12 / 100;
    
    let breakEvenYear = null;

    for (let year = 1; year <= loanTenure; year++) {
      labels.push(`Year ${year}`);
      
      const currentPropertyValue = propertyValue * Math.pow(1 + propertyAppreciation / 100, year);
      const monthlyPropertyTax = (currentPropertyValue * (propertyTaxPercent / 100)) / 12;
      const monthlyMaintenance = (currentPropertyValue * (maintenancePercent / 100)) / 12;

      // Calculate the year's cash flows month-by-month
      for (let month = 1; month <= 12; month++) {
        if (month === 1 && year > 1) {
          currentRent *= (1 + rentEscalation / 100);
        }
        
        const totalBuyerMonthlyCost = monthlyEmi + monthlyPropertyTax + monthlyMaintenance;
        const totalRenterMonthlyCost = currentRent;
        
        totalRentPaid += currentRent;
        totalPropertyTaxes += monthlyPropertyTax;
        totalMaintenance += monthlyMaintenance;
        
        // Calculate Interest Paid this month
        const monthsPaid = ((year - 1) * 12) + month;
        if (monthsPaid <= n) {
          const remainingLoanCurrent = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, monthsPaid - 1)) / (Math.pow(1 + r, n) - 1);
          const interestPortion = remainingLoanCurrent * r;
          totalInterestPaid += interestPortion;
        }

        // Difference in cash flow gets invested by whoever spent less
        const cashFlowDifference = totalBuyerMonthlyCost - totalRenterMonthlyCost;
        
        // Compound existing portfolios
        currentRentCorpus *= (1 + equityMonthlyRate);
        currentBuyCorpus *= (1 + equityMonthlyRate);

        if (cashFlowDifference > 0) {
          // Renter saves the difference
          currentRentCorpus += cashFlowDifference;
        } else if (cashFlowDifference < 0) {
          // Buyer saves the difference
          currentBuyCorpus += Math.abs(cashFlowDifference);
        }
      }

      // End of year Net Worth Snapshot
      const monthsPaidTotal = year * 12;
      const remainingLoan = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, monthsPaidTotal)) / (Math.pow(1 + r, n) - 1);
      const sellingCosts = currentPropertyValue * (sellingClosingCostsPercent / 100);
      
      const buyNetWorth = (currentPropertyValue - remainingLoan) + currentBuyCorpus - sellingCosts;
      const rentNetWorth = currentRentCorpus;
      
      buyData.push(buyNetWorth);
      rentData.push(rentNetWorth);
      
      if (breakEvenYear === null && buyNetWorth > rentNetWorth) {
        breakEvenYear = year;
      }
    }

    const finalBuyNW = buyData[buyData.length - 1];
    const finalRentNW = rentData[rentData.length - 1];
    
    // Sunk costs at the end
    const totalBuyerSunkCosts = totalInterestPaid + totalPropertyTaxes + totalMaintenance + buyingClosingCosts + (propertyValue * Math.pow(1 + propertyAppreciation / 100, loanTenure) * (sellingClosingCostsPercent / 100));

    return {
      labels,
      buyData,
      rentData,
      finalBuyNW,
      finalRentNW,
      breakEvenYear,
      monthlyEmi,
      totalBuyerSunkCosts,
      totalRentPaid,
      totalInterestPaid,
      totalPropertyTaxes,
      totalMaintenance,
      buyingClosingCosts,
      sellingCostsFinal: propertyValue * Math.pow(1 + propertyAppreciation / 100, loanTenure) * (sellingClosingCostsPercent / 100)
    };
  }, [propertyValue, downPaymentPercent, homeLoanRate, loanTenure, propertyAppreciation, propertyTaxPercent, maintenancePercent, buyingClosingCostsPercent, sellingClosingCostsPercent, monthlyRent, rentEscalation, equityReturns]);

  const chartData = {
    labels: results.labels,
    datasets: [
      {
        label: 'Net Worth (Buying)',
        data: results.buyData,
        borderColor: accentColor,
        backgroundColor: accentColor,
        fill: false,
        tension: 0.1,
        pointRadius: 2,
      },
      {
        label: 'Net Worth (Renting)',
        data: results.rentData,
        borderColor: '#C4993C',
        backgroundColor: '#C4993C',
        fill: false,
        tension: 0.1,
        pointRadius: 2,
      }
    ]
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
            if (value >= 10000000) return '₹' + (value / 10000000).toFixed(1) + 'Cr';
            if (value >= 100000) return '₹' + (value / 100000).toFixed(1) + 'L';
            return '₹' + value;
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
          Buy vs Rent Calculator (True Cost)
        </h1>
        <p className="text-[#6B7280] dark:text-[#8B95A5] max-w-2xl mx-auto">
          Compare the true financial impact of buying a home versus renting. We factor in <strong>property taxes, maintenance, stamp duty, and opportunity cost</strong> to give you a mathematically accurate comparison.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Property Details</h2>
            <div className="space-y-5">
              <InputSlider
                label="Property Value"
                value={propertyValue}
                min={1000000}
                max={50000000}
                step={100000}
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
                label="Home Loan Rate (%)"
                value={homeLoanRate}
                min={5}
                max={15}
                step={0.1}
                onChange={setHomeLoanRate}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Loan Tenure (Years)"
                value={loanTenure}
                min={5}
                max={30}
                step={1}
                onChange={setLoanTenure}
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
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Unrecoverable Buyer Costs</h2>
            <div className="space-y-5">
              <InputSlider
                label="Property Tax (Yearly %)"
                value={propertyTaxPercent}
                min={0}
                max={3}
                step={0.1}
                onChange={setPropertyTaxPercent}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Maintenance / Society Fees (Yearly %)"
                value={maintenancePercent}
                min={0}
                max={5}
                step={0.1}
                onChange={setMaintenancePercent}
                formatValue={(v) => `${v}%`}
              />
              <InputSlider
                label="Buying Closing Costs (Stamp Duty, etc. %)"
                value={buyingClosingCostsPercent}
                min={0}
                max={15}
                step={0.5}
                onChange={setBuyingClosingCostsPercent}
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
                min={5000}
                max={200000}
                step={1000}
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
          
          {/* Break Even Banner */}
          <div className={`p-5 rounded-2xl border flex items-center gap-4 ${results.breakEvenYear !== null ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30' : 'bg-[#C4993C]/10 border-[#C4993C]/30'}`}>
            <div className="hidden sm:block">
               {results.breakEvenYear !== null ? <CheckCircle2 className="w-10 h-10 text-[var(--color-accent)]" /> : <XCircle className="w-10 h-10 text-[#C4993C]" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">
                {results.breakEvenYear !== null ? `Buying becomes better in Year ${results.breakEvenYear}` : `Renting remains better for all ${loanTenure} years`}
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-[#8B95A5]">
                {results.breakEvenYear !== null 
                  ? "If you plan to sell the property before this year, you are mathematically better off renting."
                  : "Due to the high sunk costs of buying, renting and investing the difference yields a higher net worth."}
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Financial Comparison (After {loanTenure} Years)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--panel-border)]">
                <p className="text-sm text-[#6B7280] dark:text-[#8B95A5] mb-1">Final Net Worth (Buying)</p>
                <p className="text-2xl font-bold text-[var(--color-accent)]">{formatCurrency(results.finalBuyNW)}</p>
                <p className="text-xs text-[#6B7280] dark:text-[#8B95A5] mt-2">Initial Monthly EMI: {formatCurrency(results.monthlyEmi)}</p>
              </div>
              <div className="bg-[var(--background)] p-4 rounded-xl border border-[#C4993C]/30">
                <p className="text-sm text-[#6B7280] dark:text-[#8B95A5] mb-1">Final Net Worth (Renting)</p>
                <p className="text-2xl font-bold text-[#C4993C]">{formatCurrency(results.finalRentNW)}</p>
                <p className="text-xs text-[#6B7280] dark:text-[#8B95A5] mt-2">Initial SIP: {formatCurrency(results.monthlyEmi + ((propertyValue * (propertyTaxPercent/100))/12) + ((propertyValue * (maintenancePercent/100))/12) - monthlyRent)}</p>
              </div>
            </div>

            <div className="mb-4">
              {results.finalBuyNW > results.finalRentNW ? (
                <div className="bg-[var(--color-accent)]/5 p-4 rounded-xl border-l-4 border-[var(--color-accent)]">
                  <p className="text-[var(--foreground)] font-medium">
                    Buying is more profitable by <span className="text-[var(--color-returns)] font-bold">{formatCurrency(results.finalBuyNW - results.finalRentNW)}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-[#C4993C]/5 p-4 rounded-xl border-l-4 border-[#C4993C]">
                  <p className="text-[var(--foreground)] font-medium">
                    Renting is more profitable by <span className="text-[var(--color-returns)] font-bold">{formatCurrency(results.finalRentNW - results.finalBuyNW)}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="h-[400px] w-full mt-8 relative">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Sunk Costs Table */}
          <div className="glass-panel p-6 bg-[var(--background)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">The True "Throwing Money Away" Comparison</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#8B95A5] mb-6">A breakdown of the unrecoverable costs (sunk costs) over {loanTenure} years.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#6B7280] dark:text-[#8B95A5]">
                <thead className="text-xs text-[var(--foreground)] uppercase bg-[var(--panel-border)]/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Sunk Cost Category</th>
                    <th className="px-4 py-3">Buying Sunk Costs</th>
                    <th className="px-4 py-3 rounded-tr-lg">Renting Sunk Costs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--panel-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">Rent Paid</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                    <td className="px-4 py-3 text-[var(--color-loss)] font-medium">{formatCurrency(results.totalRentPaid)}</td>
                  </tr>
                  <tr className="border-b border-[var(--panel-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">Loan Interest Paid</td>
                    <td className="px-4 py-3 text-[var(--color-loss)] font-medium">{formatCurrency(results.totalInterestPaid)}</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-[var(--panel-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">Property Taxes</td>
                    <td className="px-4 py-3 text-[var(--color-loss)] font-medium">{formatCurrency(results.totalPropertyTaxes)}</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-[var(--panel-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">Maintenance & Repairs</td>
                    <td className="px-4 py-3 text-[var(--color-loss)] font-medium">{formatCurrency(results.totalMaintenance)}</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-[var(--panel-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">Closing Costs (Buy + Sell)</td>
                    <td className="px-4 py-3 text-[var(--color-loss)] font-medium">{formatCurrency(results.buyingClosingCosts + results.sellingCostsFinal)}</td>
                    <td className="px-4 py-3 text-gray-400">-</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="font-bold text-[var(--foreground)] bg-[var(--panel-border)]/20">
                    <td className="px-4 py-4 rounded-bl-lg">Total Sunk Costs</td>
                    <td className="px-4 py-4">{formatCurrency(results.totalBuyerSunkCosts)}</td>
                    <td className="px-4 py-4 rounded-br-lg">{formatCurrency(results.totalRentPaid)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* SEO Educational Content Section */}
      <div className="mt-16 glass-panel p-8 w-full rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">The Buy vs. Rent Dilemma (Math over Myth)</h2>
          
          <div className="space-y-6 text-[#6B7280] dark:text-[#8B95A5] leading-relaxed">
              <p>
                  The phrase <em>&quot;renting is throwing money away&quot;</em> is one of the most pervasive myths in personal finance. In reality, both buying and renting involve throwing money away on <strong>unrecoverable costs</strong>. 
              </p>
              <p>
                  For renters, the unrecoverable cost is rent. For buyers, the unrecoverable costs are mortgage interest, property taxes, maintenance, society fees, and closing costs (stamp duty, registration, brokerage). Our true-cost calculator factors in all these elements.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The 5% Rule of Thumb</h3>
              <p>
                  A great mental model for the Buy vs Rent decision is the <strong>5% Rule</strong>. This rule states that the unrecoverable costs of homeownership generally average out to 5% of the property's value every year.
              </p>
              <ul className="list-disc ml-5 space-y-2 mt-2">
                  <li><strong>1%</strong> for Property Taxes</li>
                  <li><strong>1%</strong> for Maintenance and Repairs</li>
                  <li><strong>3%</strong> for the Cost of Capital (Mortgage Interest + Opportunity Cost of Down Payment)</li>
              </ul>
              <p className="mt-4">
                  If your annual rent is strictly less than 5% of the home's value, renting is usually the superior financial decision. For a ₹{formatCurrency(propertyValue)} home, 5% is <strong>{formatCurrency(propertyValue * 0.05)}/year</strong> or roughly <strong>{formatCurrency((propertyValue * 0.05)/12)}/month</strong>. If you can rent a similar home for less than this amount, the math favors renting.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Opportunity Cost of Buying</h3>
              <p>
                  When you buy a house, you tie up a massive amount of cash in a down payment and closing costs. If you had rented instead, you could have invested that exact same initial capital in the stock market (e.g., via a NIFTY 50 index fund) and earned a historical average return of 10-12% annually. 
              </p>
              <p>
                  Furthermore, if your monthly EMI, taxes, and maintenance combined are higher than your monthly rent, a disciplined renter can invest that difference via an Equity SIP every single month. Over 20 or 30 years, this invested difference compounds exponentially.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">When Buying Makes Sense</h3>
              <p>
                  Buying a home generally becomes the superior financial choice if you plan to stay in the home for a long time (typically passing the "break-even" year calculated above). The longer you stay, the more the loan amortization shifts in your favor (you pay more principal and less interest), and the more time your home&apos;s value has to appreciate to offset the initial heavy sunk costs.
              </p>
          </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 glass-panel p-8 w-full rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                  <div key={i} className="border-b border-[var(--color-accent)]/10 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-[var(--foreground)] font-medium text-base flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                      </h3>
                      <p className="text-[#6B7280] dark:text-[#8B95A5] text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Cross Links */}
      <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] w-full rounded-3xl border border-[var(--color-accent)]/10">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/sip-for-house-down-payment" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                  Down Payment SIP <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tools/sip-vs-lumpsum" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                  SIP vs Lumpsum
              </Link>
          </div>
      </div>

    </div>
  );
}

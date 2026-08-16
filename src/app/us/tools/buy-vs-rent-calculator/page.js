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

export default function BuyVsRentPage() {
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [homeLoanRate, setHomeLoanRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [propertyAppreciation, setPropertyAppreciation] = useState(5);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [rentEscalation, setRentEscalation] = useState(5);
  const [equityReturns, setEquityReturns] = useState(12);

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
    homeLoanRate,
    loanTenure,
    propertyAppreciation,
    monthlyRent,
    rentEscalation,
    equityReturns
  ]);

  const calculateBuyVsRent = () => {
    const downPayment = (propertyValue * downPaymentPercent) / 100;
    const loanAmount = propertyValue - downPayment;
    const r = homeLoanRate / 12 / 100;
    const n = loanTenure * 12;
    
    const monthlyEmi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    setEmi(monthlyEmi);

    const labels = [];
    const buyData = [];
    const rentData = [];

    let currentRentCorpus = downPayment;
    let currentRent = monthlyRent;
    const equityMonthlyRate = equityReturns / 12 / 100;

    for (let year = 1; year <= loanTenure; year++) {
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
          borderColor: '#1B3A5C',
          backgroundColor: '#1B3A5C',
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
          color: '#1F2937',
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
          color: '#6B7280',
          callback: function(value) {
            if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'K';
            return '$' + value;
          }
        },
        grid: {
          color: 'rgba(27,58,92,0.05)'
        }
      },
      x: {
        ticks: {
          color: '#6B7280',
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
          Buy vs Rent Calculator
        </h1>
        <p className="text-[#6B7280] max-w-2xl mx-auto">
          Compare the financial impact of buying a home on EMI versus renting and investing the difference in an Equity DCA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 bg-[#f8f2ea] rounded-2xl">
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">Property Details</h2>
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

          <div className="glass-panel p-6 bg-[#f8f2ea] rounded-2xl">
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">Rent & Investment Details</h2>
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
          <div className="glass-panel p-6 bg-[#f8f2ea] rounded-2xl">
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">Financial Comparison (After {loanTenure} Years)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/50 p-4 rounded-xl border border-[#1B3A5C]/10">
                <p className="text-sm text-[#6B7280] mb-1">Net Worth (Buying)</p>
                <p className="text-2xl font-bold text-[#1B3A5C]">{formatCurrency(finalBuyNetWorth)}</p>
                <p className="text-xs text-[#6B7280] mt-2">Monthly EMI: {formatCurrency(emi)}</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl border border-[#C4993C]/20">
                <p className="text-sm text-[#6B7280] mb-1">Net Worth (Renting)</p>
                <p className="text-2xl font-bold text-[#C4993C]">{formatCurrency(finalRentNetWorth)}</p>
                <p className="text-xs text-[#6B7280] mt-2">Initial DCA: {formatCurrency(emi - monthlyRent)}</p>
              </div>
            </div>

            <div className="mb-4">
              {finalBuyNetWorth > finalRentNetWorth ? (
                <div className="bg-[#1B3A5C]/5 p-4 rounded-xl border-l-4 border-[#1B3A5C]">
                  <p className="text-[#1F2937] font-medium">
                    Buying is more profitable by <span className="text-[#059669] font-bold">{formatCurrency(finalBuyNetWorth - finalRentNetWorth)}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-[#C4993C]/5 p-4 rounded-xl border-l-4 border-[#C4993C]">
                  <p className="text-[#1F2937] font-medium">
                    Renting is more profitable by <span className="text-[#059669] font-bold">{formatCurrency(finalRentNetWorth - finalBuyNetWorth)}</span>
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
    </div>
  );
}


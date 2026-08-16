"use client";

import React, { useState, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PpfCalculatorPage() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [years, setYears] = useState(15);
  const interestRate = 7.1; // Fixed Roth IRA rate

  const [results, setResults] = useState({
    invested: 0,
    returns: 0,
    total: 0
  });

  useEffect(() => {
    let balance = 0;
    let invested = 0;
    for (let i = 0; i < years; i++) {
      balance += yearlyInvestment;
      invested += yearlyInvestment;
      balance += balance * (interestRate / 100);
    }
    setResults({
      invested: invested,
      returns: balance - invested,
      total: balance
    });
  }, [yearlyInvestment, years]);

  const chartData = {
    labels: ['Total Invested', 'Total Returns'],
    datasets: [
      {
        data: [results.invested, results.returns],
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
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '70%',
  };

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="min-h-screen bg-[#f8f2ea] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Roth IRA Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Calculate your maturity amount and returns on your Roth IRA (Roth IRA) investment.
          </p>
        </div>

        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-gray-200">
            
            {/* Input Section */}
            <div className="p-6 md:p-10 space-y-8">
              <InputSlider
                label="Yearly Investment"
                value={yearlyInvestment}
                onChange={setYearlyInvestment}
                min={500}
                max={150000}
                step={500}
                prefix="$"
                colorTheme="navy"
              />
              
              <InputSlider
                label="Time Period (Years)"
                value={years}
                onChange={setYears}
                min={15}
                max={30}
                step={1}
                suffix=" Yr"
                colorTheme="navy"
              />

              <div className="bg-[#f8f2ea] p-5 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Interest Rate (Fixed)</span>
                  <span className="text-[#1F2937] font-semibold text-lg">{interestRate}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Roth IRA interest rates are set by the government and are subject to change. Current rate is ~7.1%.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-6 md:p-10 bg-[#f8f2ea]/50 flex flex-col justify-between">
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Total Invested</p>
                    <p className="text-xl md:text-2xl font-bold text-[#1B3A5C]">
                      {formatCurrency(results.invested)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                    <span className="block w-3 h-3 rounded-full bg-[#1B3A5C]"></span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Est. Returns</p>
                    <p className="text-xl md:text-2xl font-bold text-[#059669]">
                      {formatCurrency(results.returns)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#C4993C]/10 flex items-center justify-center">
                    <span className="block w-3 h-3 rounded-full bg-[#C4993C]"></span>
                  </div>
                </div>

                <div className="bg-[#1B3A5C] p-6 rounded-xl shadow-md text-white">
                  <p className="text-white/80 font-medium mb-1">Total Maturity Value</p>
                  <p className="text-3xl md:text-4xl font-bold">
                    {formatCurrency(results.total)}
                  </p>
                </div>
              </div>

              <div className="relative h-[300px] w-full flex items-center justify-center">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


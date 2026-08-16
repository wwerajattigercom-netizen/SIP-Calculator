"use client";

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InputSlider from '@/components/InputSlider';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NpsCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [annuityReturn, setAnnuityReturn] = useState(6);
  
  // Results
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCorpus, setTotalCorpus] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [lumpSumAmount, setLumpSumAmount] = useState(0);
  const [annuityAmount, setAnnuityAmount] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);

  useEffect(() => {
    calculateNps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyContribution, currentAge, expectedReturn, annuityReturn]);

  const calculateNps = () => {
    const monthsToInvest = (60 - currentAge) * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    let futureValue = 0;
    if (monthsToInvest > 0) {
      if (expectedReturn === 0) {
        futureValue = monthlyContribution * monthsToInvest;
      } else {
        futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate);
      }
    }
    
    const invested = monthlyContribution * (monthsToInvest > 0 ? monthsToInvest : 0);
    const gains = futureValue - invested;
    const lumpSum = futureValue * 0.6;
    const annuity = futureValue * 0.4;
    const pension = (annuity * (annuityReturn / 100)) / 12;

    setTotalInvested(Math.round(invested));
    setTotalCorpus(Math.round(futureValue));
    setTotalGains(Math.round(gains));
    setLumpSumAmount(Math.round(lumpSum));
    setAnnuityAmount(Math.round(annuity));
    setMonthlyPension(Math.round(pension));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = {
    labels: ['Total Invested', 'Estimated Returns'],
    datasets: [
      {
        data: [totalInvested, totalGains],
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
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += formatCurrency(context.raw);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">401k/IRA Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Plan your retirement with the Retirement Account. Calculate your expected corpus, tax-free lump sum, and monthly pension at age 60.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Section */}
          <div className="w-full lg:w-7/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full">
              <div className="space-y-8">
                <InputSlider
                  label="Monthly Investment"
                  value={monthlyContribution}
                  min={500}
                  max={150000}
                  step={500}
                  onChange={setMonthlyContribution}
                  prefix="$"
                  id="monthly-investment"
                />

                <InputSlider
                  label="Your Current Age"
                  value={currentAge}
                  min={18}
                  max={55}
                  step={1}
                  onChange={setCurrentAge}
                  suffix=" Yrs"
                  id="current-age"
                />

                <InputSlider
                  label="Expected Return (p.a)"
                  value={expectedReturn}
                  min={1}
                  max={15}
                  step={0.5}
                  onChange={setExpectedReturn}
                  suffix="%"
                  id="expected-return"
                />

                <InputSlider
                  label="Expected Return on Annuity"
                  value={annuityReturn}
                  min={4}
                  max={12}
                  step={0.5}
                  onChange={setAnnuityReturn}
                  suffix="%"
                  id="annuity-return"
                />
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="w-full lg:w-5/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full flex flex-col">
              <h2 className="text-xl font-bold text-[#1F2937] mb-6">Retirement Corpus (Age 60)</h2>
              
              <div className="flex flex-col gap-6 flex-grow">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8f2ea] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Total Invested</p>
                    <p className="text-lg font-bold text-[#1B3A5C]">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div className="bg-[#f8f2ea] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Est. Returns</p>
                    <p className="text-lg font-bold text-[#059669]">{formatCurrency(totalGains)}</p>
                  </div>
                  <div className="bg-[#f8f2ea] p-4 rounded-xl col-span-2 text-center border border-[#1B3A5C]/10">
                    <p className="text-sm text-gray-500 mb-1">Total Corpus</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{formatCurrency(totalCorpus)}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-64 w-full flex items-center justify-center my-4">
                  <Pie data={chartData} options={chartOptions} />
                </div>

                {/* Withdrawal Details */}
                <div className="mt-auto space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-[#1F2937] text-lg">Withdrawal Plan</h3>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-[#1F2937]">Tax-free Lump Sum (60%)</p>
                      <p className="text-xs text-gray-500">Amount you can withdraw</p>
                    </div>
                    <p className="font-bold text-[#1F2937] text-lg">{formatCurrency(lumpSumAmount)}</p>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-l-4 border-l-[#1B3A5C]">
                    <div>
                      <p className="text-sm font-medium text-[#1B3A5C]">Monthly Pension</p>
                      <p className="text-xs text-gray-500">From 40% Annuity ({annuityReturn}%)</p>
                    </div>
                    <p className="font-bold text-[#059669] text-xl">{formatCurrency(monthlyPension)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


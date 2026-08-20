"use client";

import React, { useState, useMemo } from 'react';
import InputSlider from './InputSlider';
import { formatCurrency } from '../utils/formatters';
import { Wallet, Landmark, Home, Car, CreditCard, PieChart, ShieldAlert } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function USNetWorthCalculator() {
  // Assets
  const [realEstate, setRealEstate] = useState(400000);
  const [investments, setInvestments] = useState(250000);
  const [liquidCash, setLiquidCash] = useState(50000);
  const [otherAssets, setOtherAssets] = useState(50000);

  // Liabilities
  const [homeLoan, setHomeLoan] = useState(250000);
  const [carLoan, setCarLoan] = useState(30000);
  const [personalLoan, setPersonalLoan] = useState(20000);
  const [creditCard, setCreditCard] = useState(5000);

  const results = useMemo(() => {
    const totalAssets = realEstate + investments + liquidCash + otherAssets;
    const totalLiabilities = homeLoan + carLoan + personalLoan + creditCard;
    const netWorth = totalAssets - totalLiabilities;

    return { totalAssets, totalLiabilities, netWorth };
  }, [realEstate, investments, liquidCash, otherAssets, homeLoan, carLoan, personalLoan, creditCard]);

  const chartData = {
    labels: ['Real Estate', 'Investments (401k/IRA/Stocks)', 'Bank & Cash', 'Other Assets'],
    datasets: [
      {
        data: [realEstate, investments, liquidCash, otherAssets],
        backgroundColor: ['var(--color-accent)', '#059669', '#C4993C', '#6B7280'],
        borderWidth: 0,
        hoverOffset: 0,
      }
    ]
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
      
      {/* Input Section */}
      <div className="xl:col-span-7 flex flex-col gap-6">
        
        {/* Assets Panel */}
        <div className="glass-panel p-5 relative flex flex-col gap-3 rounded-2xl border-t-4 border-t-[#059669]">
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="w-5 h-5 text-[#059669]" />
            <h2 className="text-lg font-bold text-foreground">Your Assets (What you own)</h2>
          </div>
          <InputSlider label="Real Estate (Property value)" value={realEstate} onChange={setRealEstate} min={0} max={5000000} step={10000} prefix="$" />
          <InputSlider label="Investments (401k, IRA, Stocks)" value={investments} onChange={setInvestments} min={0} max={5000000} step={5000} prefix="$" />
          <InputSlider label="Bank Balance & Cash" value={liquidCash} onChange={setLiquidCash} min={0} max={1000000} step={1000} prefix="$" />
          <InputSlider label="Other Assets (Vehicles, Valuables)" value={otherAssets} onChange={setOtherAssets} min={0} max={1000000} step={1000} prefix="$" />
        </div>

        {/* Liabilities Panel */}
        <div className="glass-panel p-5 relative flex flex-col gap-3 rounded-2xl border-t-4 border-t-[#991B1B]">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-[#991B1B]" />
            <h2 className="text-lg font-bold text-foreground">Your Liabilities (What you owe)</h2>
          </div>
          <InputSlider label="Mortgage Outstanding" value={homeLoan} onChange={setHomeLoan} min={0} max={5000000} step={10000} prefix="$" />
          <InputSlider label="Auto Loan Outstanding" value={carLoan} onChange={setCarLoan} min={0} max={200000} step={1000} prefix="$" />
          <InputSlider label="Student / Personal Loans" value={personalLoan} onChange={setPersonalLoan} min={0} max={500000} step={1000} prefix="$" />
          <InputSlider label="Credit Card Debt" value={creditCard} onChange={setCreditCard} min={0} max={100000} step={500} prefix="$" />
        </div>

      </div>

      {/* Result Section */}
      <div className="xl:col-span-5 h-full flex flex-col gap-4">
        
        {/* Main Net Worth Card */}
        <div className={`glass-panel p-6 rounded-2xl text-white shadow-lg relative overflow-hidden ${results.netWorth >= 0 ? 'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)]' : 'bg-gradient-to-br from-[#991B1B] to-[#7f1d1d]'}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet className="w-24 h-24" />
            </div>
            <div className="relative z-10 flex flex-col">
                <span className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-1">Total Net Worth</span>
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                    {formatCurrency(results.netWorth, 'en-US', 'USD')}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-white/20">
                    <div>
                        <span className="text-white/70 text-xs font-medium block mb-1">Total Assets</span>
                        <span className="text-[#34d399] font-bold text-lg">{formatCurrency(results.totalAssets, 'en-US', 'USD')}</span>
                    </div>
                    <div>
                        <span className="text-white/70 text-xs font-medium block mb-1">Total Liabilities</span>
                        <span className="text-[#fca5a5] font-bold text-lg">{formatCurrency(results.totalLiabilities, 'en-US', 'USD')}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Chart Section */}
        {results.totalAssets > 0 && (
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
            <h3 className="text-sm font-bold text-foreground mb-6 self-start flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[var(--color-accent)]" /> Asset Breakdown
            </h3>
            <div className="w-48 h-48 relative">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]"></div>
                <div className="text-xs">
                  <p className="text-gray-500 dark:text-gray-400">Real Estate</p>
                  <p className="font-semibold text-foreground">{((realEstate / results.totalAssets) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#059669]"></div>
                <div className="text-xs">
                  <p className="text-gray-500 dark:text-gray-400">Investments</p>
                  <p className="font-semibold text-foreground">{((investments / results.totalAssets) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C4993C]"></div>
                <div className="text-xs">
                  <p className="text-gray-500 dark:text-gray-400">Liquid</p>
                  <p className="font-semibold text-foreground">{((liquidCash / results.totalAssets) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>
                <div className="text-xs">
                  <p className="text-gray-500 dark:text-gray-400">Other</p>
                  <p className="font-semibold text-foreground">{((otherAssets / results.totalAssets) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

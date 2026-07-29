"use client";

import React from 'react';
import ChartComponent from './ChartComponent';
import { TrendingUp, ShieldAlert, Coins } from 'lucide-react';
import { formatToShortWords } from '../utils/formatters';

export default function ResultSection({ results }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="glass-panel p-5 lg:p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[220px] mb-4 relative z-10 flex flex-col">
        <ChartComponent results={results} />
      </div>

      {/* Breakdown Data - Everything in one line */}
      <div className="grid grid-cols-3 gap-2 relative z-10">
        <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] rounded-lg p-2 flex flex-col justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <div className="flex items-center text-[#d8b4fe] text-[10px] mb-0.5 font-medium">
            <Coins className="w-3 h-3 mr-1" />
            Total Value
          </div>
          <div className="text-sm font-extrabold text-white">
            {formatCurrency(results.actualAmount)}
          </div>
          <div className="text-[9px] text-[#c4b5fd] mt-0.5 tracking-wide">
            {formatToShortWords(results.actualAmount)}
          </div>
        </div>

        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6] mr-1.5"></div>
            Invested
          </div>
          <div className="text-sm font-bold text-white">
            {formatCurrency(results.totalInvested)}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.totalInvested)}
          </div>
        </div>

        <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-lg p-2 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-[10px] mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] mr-1.5"></div>
            Earned
          </div>
          <div className="text-sm font-bold text-white">
            +{formatCurrency(results.amountEarned)}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 tracking-wide">
            {formatToShortWords(results.amountEarned)}
          </div>
        </div>

        {/* Inflation Adjusted Block — full width yellow strip */}
        {results.inflationAdjustedAmount < results.actualAmount && (
          <div className="col-span-3 mt-1 bg-[rgba(234,179,8,0.2)] border border-[rgba(234,179,8,0.5)] rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span className="text-white text-[10px] font-semibold tracking-wide">In Today's Value (Inflation Adjusted)</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-white">
                {formatCurrency(results.inflationAdjustedAmount)}
              </div>
              <div className="text-[9px] text-white opacity-70 tracking-wide">
                {formatToShortWords(results.inflationAdjustedAmount)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
